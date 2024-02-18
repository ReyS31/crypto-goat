import dynamic from "next/dynamic";

const SignInNoSsr = dynamic(() => import("@/pages/SignInNoSsr"), {
  ssr: false,
});

export default function SignIn() {

  return <SignInNoSsr></SignInNoSsr>;
}
