import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import { Coin, CoinExchange, CoinGeckoMetadata } from "@/types";
import coinList from "./coinList";

export async function getCoin(coin: string): Promise<CoinGeckoMetadata> {
  const cryptoDB = await prisma.coin.findFirst({
    where: {
      symbol: coin.toUpperCase(),
    },
  });

  const getCached = unstable_cache(
    async (coinGecokId: string) =>
      fetch(
        `https://api.coingecko.com/api/v3//coins/${coinGecokId}?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`,
        {
          headers: {
            Cookie:
              "__cf_bm=cpajWUgWQcx3K9VreswMZaRngA2bGTUThjcdvJpH99Y-1708666680-1.0-AS6znZBreKSV6i2rXXsxkaEvPS7baQXmHRz+qWBGYfAiWI11a/JKNt9qcoAqHfHFVXUZNfHFGEatiAJVzwUyA/4=",
          },
          next: {
            revalidate: 60,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => console.error(error)),
    ["coin", cryptoDB?.id!],
    {
      revalidate: 60,
    }
  );

  const data = await getCached(cryptoDB?.coingecko_id!);

  return data;
}

export async function getTopGainerCoin(): Promise<Coin[]> {
  const getCached = unstable_cache(
    async () =>
      fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=USD&sort=market_cap&sort_dir=desc&cryptocurrency_type=coins&tag=all`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "45594347-fe54-4e9d-8383-712853bc6f94",
            Accept: "*/*",
          },
          next: {
            revalidate: 60,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => console.error(error)),
    ["component", "top-gainer"],
    {
      revalidate: 60,
    }
  );
  const data = await getCached();

  const filtered = data.data
    .filter((raw: any) => coinList.includes(raw["symbol"]))
    .map((raw: any) => ({
      changes: raw["quote"]["USD"]["percent_change_24h"],
      name: raw["name"],
      price: raw["quote"]["USD"]["price"],
      symbol: raw["symbol"],
    }))
    .sort((a: Coin, b: Coin) => b.changes - a.changes)
    .slice(0, 5);

  return filtered;
}

export async function getTrendingCoin(): Promise<Coin[]> {
  const getCached = unstable_cache(
    async () =>
      fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=USD&sort=market_cap&sort_dir=desc&cryptocurrency_type=coins&tag=all`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "45594347-fe54-4e9d-8383-712853bc6f94",
            Accept: "*/*",
          },
          next: {
            revalidate: 60,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => console.error(error)),
    ["component", "top-gainer"],
    {
      revalidate: 60,
    }
  );
  const data = await getCached();

  const filtered = data.data
    .filter((raw: any) => coinList.includes(raw["symbol"]))
    .map((raw: any) => ({
      changes: raw["quote"]["USD"]["percent_change_24h"],
      name: raw["name"],
      price: raw["quote"]["USD"]["price"],
      symbol: raw["symbol"],
    }))
    .slice(0, 5);

  return filtered;
}

export async function getExchange(symbol: string): Promise<CoinExchange[]> {
  const getCached = unstable_cache(
    async (symbol: string) =>
      fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=${symbol}&sort=market_cap&sort_dir=desc&cryptocurrency_type=coins&tag=all`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "45594347-fe54-4e9d-8383-712853bc6f94",
            Accept: "*/*",
          },
          next: {
            revalidate: 60,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .catch((error) => console.error(error)),
    ["component", `exchange-${symbol}`],
    {
      revalidate: 60,
    }
  );
  const data = await getCached(symbol);

  const filtered: CoinExchange[] = data.data
    .filter((raw: any) => coinList.includes(raw["symbol"]))
    .map(
      (raw: any): CoinExchange => ({
        name: raw["name"],
        price: raw["quote"][symbol]["price"],
        symbol: raw["symbol"],
        market_cap: raw["quote"][symbol]["market_cap"],
        volume_24h: raw["quote"][symbol]["volume_24h"],
        percent_change_1h: raw["quote"][symbol]["percent_change_1h"],
        percent_change_24h: raw["quote"][symbol]["percent_change_24h"],
        percent_change_7d: raw["quote"][symbol]["percent_change_7d"],
      })
    );

  return filtered;
}
