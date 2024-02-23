import { prisma } from "@/lib/prisma";
import MarketCoinNoSsr from "@/pages/MarketCoinNoSsr";
import { CoinGeckoMetadata } from "@/types";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

async function getCoin(coin: string): Promise<CoinGeckoMetadata> {
  const cryptoDB = await prisma.coin.findFirst({
    where: {
      symbol: coin.toUpperCase(),
    },
  });

  const getCached = unstable_cache(
    async (cryptoDB) =>
      fetch(
        `https://api.coingecko.com/api/v3//coins/${cryptoDB?.coingecko_id}?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`,
        {
          headers: {
            Cookie:
              "__cf_bm=cpajWUgWQcx3K9VreswMZaRngA2bGTUThjcdvJpH99Y-1708666680-1.0-AS6znZBreKSV6i2rXXsxkaEvPS7baQXmHRz+qWBGYfAiWI11a/JKNt9qcoAqHfHFVXUZNfHFGEatiAJVzwUyA/4=",
          },
          next: {
            revalidate: 60,
          },
        }
      )
        .then((response) => {
          console.log("from main server");
          return response.json();
        })
        .catch((error) => console.error(error)),
    ["coin", cryptoDB?.id!]
  );

  const data = await getCached(cryptoDB);

  return data;
}

export default async function CoinMarket({
  params,
}: {
  params: { coin: string };
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  const coinMetadata: CoinGeckoMetadata = await getCoin(params.coin);

  return <MarketCoinNoSsr coin={coinMetadata} />;
}
