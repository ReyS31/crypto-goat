import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const MarketCoinNoSsr = dynamic(() => import("@/pages/MarketCoinNoSsr"), {
  ssr: false,
});

export default async function CoinMarket({
  params,
}: {
  params: { coin: string };
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return <MarketCoinNoSsr/>;
}
