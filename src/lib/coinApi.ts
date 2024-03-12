import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import { Coin, CoinExchange, CoinGeckoMetadata, Metadata } from "@/types";
import coinList from "./coinList";
import { Session, getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function getCoin(coin: string): Promise<Metadata> {
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

  let is_on_watchlist = false;
  const watchListId = await getPrimaryWatchlistId((await getServerSession())!);
  if (watchListId) {
    const exists = await prisma.watchList.findFirst({
      where: {
        id: watchListId,
        coinOnWatchList: {
          some: {
            coin: {
              symbol: coin.toUpperCase(),
            },
          },
        },
      },
    });

    is_on_watchlist = !!exists;
  }

  const data = await getCached(cryptoDB?.coingecko_id!);

  return { ...data, is_on_watchlist };
}

const getCachedTopGainer = unstable_cache(
  async (symbol: string) =>
    fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=${symbol}&sort=market_cap&sort_dir=desc&cryptocurrency_type=all&tag=all`,
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
  ["component", `top-gainer`],
  {
    revalidate: 60,
  }
);

export async function getTopGainerCoin(): Promise<Coin[]> {
  const filtered = (await getCachedTopGainer("USD")).data
    .filter((raw: any) => coinList.includes(raw["symbol"]))
    .map((raw: any) => ({
      changes: raw["quote"]["USD"]["percent_change_24h"],
      name: raw["name"],
      price: raw["quote"]["USD"]["price"],
      symbol: raw["symbol"],
    }))
    .sort((a: Coin, b: Coin) => (b.changes ?? 0) - (a.changes ?? 0))
    .slice(0, 5);

  return filtered;
}

export async function getTrendingCoin(): Promise<Coin[]> {
  const filtered = (await getCachedTopGainer("USD")).data
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
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=200&convert=${symbol}&sort=market_cap&sort_dir=desc&cryptocurrency_type=all&tag=all`,
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

  const data = (await getCached(symbol)).data;
  const dbCoins = await getAllCoins();
  const filtered: CoinExchange[] = dbCoins
    .map((coin): CoinExchange => {
      const datum = data
        .filter((raw: any) => raw["symbol"] == coin.symbol)
        .at(0);
      if (datum) {
        return {
          rank: datum["cmc_rank"],
          name: coin.name,
          price: datum["quote"][symbol]["price"],
          symbol: coin.symbol,
          market_cap: datum["quote"][symbol]["market_cap"],
          volume_24h: datum["quote"][symbol]["volume_24h"],
          percent_change_1h: datum["quote"][symbol]["percent_change_1h"],
          percent_change_24h: datum["quote"][symbol]["percent_change_24h"],
          percent_change_7d: datum["quote"][symbol]["percent_change_7d"],
        };
      }

      return {
        name: coin.name,
        price: undefined,
        symbol: coin.symbol,
        market_cap: undefined,
        volume_24h: undefined,
        percent_change_1h: undefined,
        percent_change_24h: undefined,
        percent_change_7d: undefined,
        rank: 10000,
      };
    })
    .sort((a: CoinExchange, b: CoinExchange) => a.rank - b.rank);

  return filtered;
}

export async function getWatchlist(): Promise<Coin[]> {
  const session = await getServerSession();
  if (!session) {
    return [];
  }

  const getCachedSymbol = unstable_cache(async () => {
    const watchListId = await getPrimaryWatchlistId(session);

    if (!watchListId) {
      return [];
    }
    return (
      await prisma.coinsOnWatchLists.findMany({
        where: {
          watchListId: watchListId,
        },
        include: {
          coin: true,
        },
        orderBy: {
          coin: {
            name: "asc",
          },
        },
      })
    ).map((c) => c.coin);
  }, ["component", "watchlist"]);

  const coinSymbols = await getCachedSymbol();

  const data = await getCachedTopGainer("USD");
  const filtered = coinSymbols
    .map((coin): Coin => {
      const datum = data.data
        .filter((raw: any) => raw["symbol"] == coin.symbol)
        .at(0);
      if (datum) {
        return {
          changes: datum["quote"]["USD"]["percent_change_24h"],
          name: coin.name,
          price: datum["quote"]["USD"]["price"],
          symbol: coin.symbol,
        };
      }

      return {
        changes: undefined,
        name: coin.name,
        price: undefined,
        symbol: coin.symbol,
      };
    })
    .slice(0, 5);

  return filtered;
}

export async function getWatchlistTable(): Promise<CoinExchange[]> {
  const session = await getServerSession();
  if (!session) {
    return [];
  }

  const getCachedSymbol = unstable_cache(async () => {
    const watchListId = await getPrimaryWatchlistId(session);

    if (!watchListId) {
      return [];
    }
    return (
      await prisma.coinsOnWatchLists.findMany({
        where: {
          watchListId: watchListId,
        },
        include: {
          coin: true,
        },
        orderBy: {
          coin: {
            name: "asc",
          },
        },
      })
    ).map((c) => c.coin);
  }, ["component", "watchlist"]);

  const coinSymbols = await getCachedSymbol();

  const data = await getCachedTopGainer("USD");
  const filtered = coinSymbols
    .map((coin): CoinExchange => {
      const datum = data
        .filter((raw: any) => raw["symbol"] == coin.symbol)
        .at(0);
      if (datum) {
        return {
          rank: datum["cmc_rank"],
          name: coin.name,
          price: datum["quote"]["USD"]["price"],
          symbol: coin.symbol,
          market_cap: datum["quote"]["USD"]["market_cap"],
          volume_24h: datum["quote"]["USD"]["volume_24h"],
          percent_change_1h: datum["quote"]["USD"]["percent_change_1h"],
          percent_change_24h: datum["quote"]["USD"]["percent_change_24h"],
          percent_change_7d: datum["quote"]["USD"]["percent_change_7d"],
        };
      }

      return {
        name: coin.name,
        price: undefined,
        symbol: coin.symbol,
        market_cap: undefined,
        volume_24h: undefined,
        percent_change_1h: undefined,
        percent_change_24h: undefined,
        percent_change_7d: undefined,
        rank: 10000,
      };
    })
    .sort((a: CoinExchange, b: CoinExchange) => a.rank - b.rank);

  return filtered;
}

export const getPrimaryWatchlistId = unstable_cache(
  async (session: Session) => {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user!.email!,
      },
      include: {
        watchList: true,
      },
    });

    const watchlistRaw = user?.watchList;

    let watchlist = watchlistRaw?.find((wl) => wl.isPrimary);
    if (!watchlist) {
      watchlist = watchlistRaw![0];
    }

    if (!watchlist) {
      return null;
    }

    return watchlist.id;
  },
  ["primary-watchlist-id"]
);

export const getAllCoins = unstable_cache(async () => {
  return await prisma.coin.findMany({});
}, ["coins-db"]);
