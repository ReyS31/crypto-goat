import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  await Promise.all([
    prisma.coin.upsert({
      where: {
        symbol: "BNB",
      },
      update: {},
      create: {
        symbol: "BNB",
        name: "Binance",
        cmc_id: 1839,
        coingecko_id: "binancecoin",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "TRON",
      },
      update: {},
      create: {
        symbol: "TRX",
        name: "TRON",
        cmc_id: 1958,
        coingecko_id: "tron",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "DOGE",
      },
      update: {},
      create: {
        symbol: "DOGE",
        name: "DOGE",
        cmc_id: 74,
        coingecko_id: "dogecoin",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "ETH",
      },
      update: {},
      create: {
        symbol: "ETH",
        name: "Ethereum",
        cmc_id: 1027,
        coingecko_id: "ethereum",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "BCH",
      },
      update: {},
      create: {
        symbol: "BCH",
        name: "Bitcoin Cash",
        cmc_id: 1831,
        coingecko_id: "bitcoin-cash",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "XRP",
      },
      update: {},
      create: {
        symbol: "XRP",
        name: "XRP",
        cmc_id: 52,
        coingecko_id: "ripple",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "XLM",
      },
      update: {},
      create: {
        symbol: "XLM",
        name: "Stellar",
        cmc_id: 512,
        coingecko_id: "stellar",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "XMR",
      },
      update: {},
      create: {
        symbol: "XMR",
        name: "Monero",
        cmc_id: 328,
        coingecko_id: "monero",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "WAVES",
      },
      update: {},
      create: {
        symbol: "WAVES",
        name: "Waves",
        cmc_id: 1274,
        coingecko_id: "waves",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "DOT",
      },
      update: {},
      create: {
        symbol: "DOT",
        name: "Polkadot",
        cmc_id: 6636,
        coingecko_id: "polkadot",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "CRV",
      },
      update: {},
      create: {
        symbol: "CRV",
        name: "Curve DAO",
        cmc_id: 6538,
        coingecko_id: "curve-dao-token",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "SOL",
      },
      update: {},
      create: {
        symbol: "SOL",
        name: "Solana",
        cmc_id: 5426,
        coingecko_id: "solana",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "FTM",
      },
      update: {},
      create: {
        symbol: "FTM",
        name: "Fantom",
        cmc_id: 3513,
        coingecko_id: "fantom",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "FLM",
      },
      update: {},
      create: {
        symbol: "FLM",
        name: "Flamingo",
        cmc_id: 7150,
        coingecko_id: "flamingo-finance",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "ENJ",
      },
      update: {},
      create: {
        symbol: "ENJ",
        name: "Enjin Coin",
        cmc_id: 2130,
        coingecko_id: "enjincoin",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "RSR",
      },
      update: {},
      create: {
        symbol: "RSR",
        name: "Reserve Rights",
        cmc_id: 3964,
        coingecko_id: "reserve-rights-token",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "LRC",
      },
      update: {},
      create: {
        symbol: "LRC",
        name: "Loopring",
        cmc_id: 1934,
        coingecko_id: "loopring",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "MATIC",
      },
      update: {},
      create: {
        symbol: "MATIC",
        name: "Polygon",
        cmc_id: 3890,
        coingecko_id: "matic-network",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "OCEAN",
      },
      update: {},
      create: {
        symbol: "OCEAN",
        name: "Ocean Protocol",
        cmc_id: 3911,
        coingecko_id: "ocean-protocol",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "COTI",
      },
      update: {},
      create: {
        symbol: "COTI",
        name: "COTI",
        cmc_id: 3992,
        coingecko_id: "coti",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "MANA",
      },
      update: {},
      create: {
        symbol: "MANA",
        name: "Decentraland",
        cmc_id: 1966,
        coingecko_id: "decentraland",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "DGB",
      },
      update: {},
      create: {
        symbol: "DGB",
        name: "DigiByte",
        cmc_id: 109,
        coingecko_id: "digibyte",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "IOTX",
      },
      update: {},
      create: {
        symbol: "IOTX",
        name: "IoTeX",
        cmc_id: 2777,
        coingecko_id: "iotex",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "GALA",
      },
      update: {},
      create: {
        symbol: "GALA",
        name: "Gala",
        cmc_id: 7080,
        coingecko_id: "gala",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "AR",
      },
      update: {},
      create: {
        symbol: "AR",
        name: "Arweave",
        cmc_id: 5632,
        coingecko_id: "arweave",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "GMT",
      },
      update: {},
      create: {
        symbol: "GMT",
        name: "GMT",
        cmc_id: 18069,
        coingecko_id: "stepn",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "APE",
      },
      update: {},
      create: {
        symbol: "APE",
        name: "ApeCoin",
        cmc_id: 18876,
        coingecko_id: "apecoin",
      },
    }),
    prisma.coin.upsert({
      where: {
        symbol: "GAL",
      },
      update: {},
      create: {
        symbol: "GAL",
        name: "Galatasaray Fan Token",
        cmc_id: 5228,
        coingecko_id: "galatasaray-fan-token",
      },
    }),
  ]);

    const btc = await prisma.coin.upsert({
    where: {
      symbol: "BTC",
    },
    update: {},
    create: {
      symbol: "BTC",
      name: "Bitcoin",
      cmc_id: 1,
      coingecko_id: "bitcoin",
    },
  });


  const password = await hash("password", 12);
  const exampleUser = await prisma.user.upsert({
    where: { email: "example@example.com" },
    update: {},
    create: {
      email: "example@example.com",
      name: "example",
      password,
      watchList: {
        create: {
          title: "Example",
          coinOnWatchList: {
            create: {
              coinId: btc.id,
            },
          },
        },
      },
    },
  });
  console.log({ exampleUser });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
