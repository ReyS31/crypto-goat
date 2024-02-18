import { Coin } from "@/types";
import { mediumFont, semiboldFont } from "@/utils/fonts";
import { Container } from "react-bootstrap";
import CoinBlock from "./CoinBlock";

type TrendingContainerProps = {
  theme: string;
};

const TrendingContainer = ({ theme }: TrendingContainerProps) => {
  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };

  const watchlistCoins: Coin[] = [
    {
      changes: 12,
      name: "Bitcoin",
      price: 20000,
      symbol: "BTC",
    },
    {
      changes: 0,
      name: "Ethereum",
      price: 29100,
      symbol: "ETH",
    },
    {
      changes: -8,
      name: "Binance",
      price: 20000,
      symbol: "BNB",
    },
    {
      changes: -2,
      name: "Flamingo",
      price: 20000,
      symbol: "FLM",
    },
    {
      changes: 12,
      name: "Solana",
      price: 20000,
      symbol: "SOL",
    },
  ];

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
    </Container>
  );
};

export default TrendingContainer;
