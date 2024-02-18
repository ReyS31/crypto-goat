"use client";

import { regularFont } from "@/utils/fonts";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function AuthButton() {
  const { data } = useSession();
  const { push } = useRouter();

  if (data === undefined) {
    return <></>;
  }

  if (data && data.authenticated) {
    return (
      <Button
        variant="danger"
        className={`d-inline-block h6 ${regularFont.className} px-4`}
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      >
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      className={`d-inline-block h6 ${regularFont.className} px-4`}
      onClick={() => push("/")}
    >
      Sign In
    </Button>
  );
}
