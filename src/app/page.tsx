import { authOptions } from "@/lib/auth";
import getTheme from "@/lib/getTheme";
import SignInNoSsr from "@/pages/SignInNoSsr";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/market");
  }

  const theme = await getTheme();

  return <SignInNoSsr theme={theme}></SignInNoSsr>;
}
