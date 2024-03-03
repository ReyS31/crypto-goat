import { CommonComponentProps } from "@/types";
import { semiboldFont, mediumFont } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const WatchlistCard = ({ coin, theme }: CommonComponentProps) => {
  return (
    <Container
      className={`p-4 ${theme === "dark" ? "card-dark-custom" : "bg-white"}`}
      style={{ borderRadius: "10px" }}
    >
      <Row>
        <Col
          style={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Image
            src={`/coins/${coin.symbol}.svg`}
            className="d-inline-block align-top"
            alt="Crypto Goat logo"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
            priority
          />
          <Link
            href={`/market/${coin.symbol}`}
            className={`h6 ${semiboldFont.className}`}
            style={{ marginLeft: "12px", textDecoration: "none" }}
          >
            {coin.name}
            <span
              className={`body ${mediumFont.className}`}
              style={{
                background: theme === "dark" ? "#000F3E" : "#DBE4FF",
                color: "#267CFD",
                padding: "4px 8px",
                borderRadius: "4px",
                marginLeft: "4px",
              }}
            >
              {coin.symbol}
            </span>
          </Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <span
          className={`sub2 ${mediumFont.className}`}
          style={{ color: theme === "dark" ? "#C1CEED80" : "#121F3E80" }}
        >
          Coin Price
        </span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6 className={`h6 ${semiboldFont.className}`}>{new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.price)}</h6>
          <h6
            className={`h6 ${semiboldFont.className}`}
            style={{
              color: coin.changes >= 0 ? "#479F76" : "#FF4F4F",
            }}
          >
            {`${coin.changes > 0 ? "+" : ""} ${coin.changes}%`}
          </h6>
        </div>
      </Row>
    </Container>
  );
};

export default WatchlistCard;
