import { Coin } from "@/types";
import { mediumFont, semiboldFont } from "@/utils/fonts";
import { Container, Stack } from "react-bootstrap";
import CoinBlock from "./CoinBlock";
import { unstable_cache } from "next/cache";
import coinList from "@/lib/coinList";
import Link from "next/link";

async function getCoin(): Promise<Coin[]> {
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
            revalidate: 60 * 30,
          },
        }
      )
        .then((response) => {
          console.log("from main server");
          return response.json();
        })
        .catch((error) => console.error(error)),
    ["component", "top-gainer"]
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

type TopGainerContainerProps = {
  theme: string;
};

const TopGainerContainer = async ({ theme }: TopGainerContainerProps) => {
  const watchlistCoins = await getCoin();

  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };

  return (
    <Container fluid style={containerClass} className="p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className={`h6 ${semiboldFont.className}`}>Top Gainers</h6>
        <span
          className={`sub2 ${mediumFont.className}`}
          style={{
            color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
          }}
        >
          Top 5
        </span>
      </div>
      {watchlistCoins.map((coin) => (
        <CoinBlock coin={coin} theme={theme} key={coin.symbol} />
      ))}

      <Stack direction="horizontal" className="mt-3">
        <span
          className={`sub2 ${mediumFont.className} ms-auto`}
          style={{
            color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
          }}
        >
          By{" "}
          <Link
            href="https://coinmarketcap.com/"
            target="_blank"
            style={{
              color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
            }}
          >
            CoinMarketCap
          </Link>
        </span>
      </Stack>
    </Container>
  );
};

export default TopGainerContainer;
