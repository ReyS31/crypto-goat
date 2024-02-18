import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const MarketNoSsr = dynamic(() => import("@/pages/MarketNoSsr"), {
  ssr: false,
});

export default async function Market() {
  const session = await getServerSession();
  if(!session){
    redirect('/');
  }
  return <MarketNoSsr></MarketNoSsr>;
}
