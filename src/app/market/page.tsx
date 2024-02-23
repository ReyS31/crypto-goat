import MarketNoSsr from "@/pages/MarketNoSsr";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Market() {
  const session = await getServerSession();
  if(!session){
    redirect('/');
  }
  return <MarketNoSsr></MarketNoSsr>;
}
