import { semiboldFont } from "@/utils/fonts";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import WatchlistCard from "./WatchlistCard";
import { Coin } from "@/types";
import WatchlistCardShimmer from "./Shimmer/WatchListCardShimmer";

type WatchlistContainerProps = {
  theme: string;
};

const WatchlistContainer = ({ theme }: WatchlistContainerProps) => {
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
        <WatchlistRow theme={theme} />
      </Row>
    </>
  );
};

const WatchlistRow = ({ theme }: WatchlistContainerProps) => {
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
    <Row className="mt-2">
      {watchlistCoins.map((coin) => (
        <Col key={coin.symbol}>
          <WatchlistCard coin={coin} theme={theme} />
        </Col>
      ))}
    </Row>
  );
};

const WatchlistRowShimmer = ({ theme }: WatchlistContainerProps) => {
  const length = Array.from(Array(4).keys());

  return (
    <Row className="mt-2">
      {length.map((num) => (
        <Col key={num}>
          <WatchlistCardShimmer theme={theme} />
        </Col>
      ))}
    </Row>
  );
};

export default WatchlistContainer;
