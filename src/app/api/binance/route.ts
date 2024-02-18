import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  function isTimevalid(value: string): boolean {
    return ["1d", "7d", "14d", "30d"].includes(value);
  }

  const coin = req.nextUrl.searchParams.get("coin");
  const timeRange = req.nextUrl.searchParams.get("time");

  if (!coin) {
    return Response.json({ error: "Coin is invalid" });
  }

  if (!timeRange) {
    return Response.json({ error: "TimeRange is invalid " });
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=FLMUSDT&period=1h&limit=24",
    requestOptions
  ).then((response) => response.json());

  return Response.json(response);
}
