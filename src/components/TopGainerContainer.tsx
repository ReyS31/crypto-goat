import { Coin } from "@/types";
import { mediumFont, semiboldFont } from "@/utils/fonts";
import { Container } from "react-bootstrap";
import CoinBlock from "./CoinBlock";

type TopGainerContainerProps = {
  theme: string;
};

const TopGainerContainer = ({ theme }: TopGainerContainerProps) => {
  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };

  const watchlistCoins: Coin[] = [
    {
      changes: 60,
      name: "Doge",
      price: 20000,
      symbol: "DOGE",
    },
    {
      changes: 40,
      name: "Polygon",
      price: 29100,
      symbol: "MATIC",
    },
    {
      changes: 35,
      name: "Ripple",
      price: 20000,
      symbol: "XRP",
    },
    {
      changes: 30,
      name: "Decentraland",
      price: 20000,
      symbol: "MANA",
    },
    {
      changes: 28,
      name: "Tron",
      price: 20000,
      symbol: "TRX",
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
    </Container>
  );
};

export default TopGainerContainer;
