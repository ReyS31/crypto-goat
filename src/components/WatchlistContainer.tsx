import { semiboldFont } from "@/utils/fonts";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import WatchlistCard from "./WatchlistCard";
import { Coin } from "@/types";

type WatchlistContainerProps = {
  theme: string;
};

const WatchlistContainer = ({ theme }: WatchlistContainerProps) => {
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
    <>
      <Row>
        <Col>
          <span className={`h5 ${semiboldFont.className}`}>Watchlist</span>
        </Col>
        <Col style={{ textAlign: "end" }}>
          <Link href={"#"} style={{ textDecoration: "none" }}>
            Watchlist Details
          </Link>
        </Col>
      </Row>
      <Row className="mt-2">
        {watchlistCoins.map((coin) => (
          <Col key={coin.symbol}>
            <WatchlistCard coin={coin} theme={theme ?? "light"} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default WatchlistContainer;
