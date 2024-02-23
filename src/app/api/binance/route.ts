import { NextRequest } from "next/server";

type LongShortRatioRes = {
  symbol: string;
  longAccount: string;
  longShortRatio: string;
  shortAccount: string;
  timestamp: number;
};

export async function GET(req: NextRequest) {
  function isTimevalid(value: string): boolean {
    return ["1d", "7d", "14d", "30d"].includes(value);
  }

  const coin = req.nextUrl.searchParams.get("coin");
  const timeRange = req.nextUrl.searchParams.get("time");

  if (!coin) {
    return Response.json({ error: "Coin is invalid" });
  }

  if (!timeRange || !isTimevalid(timeRange)) {
    return Response.json({ error: "Time is invalid " });
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let limit = 24;
  switch (timeRange) {
    case "1d":
      limit = 24;
      break;
    case "7d":
      limit = 7;
      break;
    case "14d":
      limit = 14;
      break;
    case "30d":
      limit = 30;
      break;
  }

  const period = timeRange === "1d" ? "1h" : "1d";

  const response: LongShortRatioRes[] = 
  await fetch(
    `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${coin}USDT&period=${period}&limit=${limit}`,
    requestOptions
  ).then((response) => response.json());

  const labels: string[] =
    timeRange === "1d"
      ? [
          "23",
          "22",
          "21",
          "20",
          "19",
          "18",
          "17",
          "16",
          "15",
          "14",
          "13",
          "12",
          "11",
          "10",
          "09",
          "08",
          "07",
          "06",
          "05",
          "04",
          "03",
          "02",
          "01",
          "Now",
        ]
      : [];
  const long: number[] = [];
  const short: number[] = [];

  response.forEach((item) => {
    long.push(Number(item.longAccount));
    short.push(Number(item.shortAccount));
    if (timeRange !== "1d") {
      const date = new Date(item.timestamp);
      labels.push((date.getMonth() + 1).toString() + "-" + date.getDate().toString());
    }
  });

  const res = {
    labels,
    datasets: [
      {
        label: "Long",
        data: long,
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Short",
        data: short,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return Response.json(res);
}
