"use server";
import { semiboldFont } from "@/utils/fonts";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import WatchlistCard from "./WatchlistCard";
import { Coin } from "@/types";
import { getWatchlist } from "@/lib/coinApi";
import { cookies } from "next/headers";
import { cache } from "react";

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

const WatchlistRow = async ({ theme }: WatchlistContainerProps) => {
  const watchlistCoins: Coin[] = await getWatchlist();

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

export default WatchlistContainer;
