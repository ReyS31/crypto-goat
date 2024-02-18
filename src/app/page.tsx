import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const SignInNoSsr = dynamic(() => import("../pages/SignInNoSsr"), {
  ssr: false,
});

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/market");
  }
  return <SignInNoSsr></SignInNoSsr>;
}