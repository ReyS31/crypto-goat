import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import { CoinGeckoMetadata } from "@/types";

export async function getCoin(coin: string): Promise<CoinGeckoMetadata> {
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
