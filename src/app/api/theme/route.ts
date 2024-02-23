import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const theme = req.nextUrl.searchParams.get("theme");
  console.log(theme);
  cookies().set("theme", theme ?? "light");
  console.log(cookies().get("theme"));

  return Response.json({ success: true });
}
