import { mediumFont, semiboldFont } from "@/utils/fonts";
import { Container, Stack } from "react-bootstrap";
import CoinBlock from "./CoinBlock";
import Link from "next/link";
import { getTopGainerCoin } from "@/lib/coinApi";

type TopGainerContainerProps = {
  theme: string;
};

const TopGainerContainer = async ({
  theme,
}: TopGainerContainerProps) => {
  const watchlistCoins = await getTopGainerCoin();

  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };

  return (
    <Container fluid style={containerClass} className={`p-4`}>
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
