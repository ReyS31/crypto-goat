import { Coin } from "@/types";
import { mediumFont, semiboldFont } from "@/utils/fonts";
import { Container, Stack } from "react-bootstrap";
import CoinBlock from "./CoinBlock";
import Link from "next/link";
import { getTrendingCoin } from "@/lib/coinApi";

type TrendingContainerProps = {
  theme: string;
};

const TrendingContainer = async ({ theme }: TrendingContainerProps) => {
  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };

  const watchlistCoins: Coin[] = await getTrendingCoin();

  return (
    <Container fluid style={containerClass} className="p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className={`h6 ${semiboldFont.className}`}>Trending Coins</h6>
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

export default TrendingContainer;
