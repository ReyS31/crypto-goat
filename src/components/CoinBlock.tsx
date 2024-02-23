import { Coin } from "@/types";
import { semiboldFont, mediumFont } from "@/utils/fonts";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import PercentageTag from "./PercentageTag";
import Link from "next/link";

type CoinBlockProps = {
  coin: Coin;
  theme: string;
};
const CoinBlock = ({ coin, theme }: CoinBlockProps) => {
  return (
    <Row className="py-2">
      <Col
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Image
          src={`/coins/${coin.symbol}.svg`}
          className="d-inline-block align-top"
          alt={`${coin.name} logo`}
          width={32}
          height={32}
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
            className={`sub1 ${mediumFont.className}`}
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
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <span className={`sub1 ${semiboldFont.className}`}>${coin.price}</span>
        <PercentageTag size="sub1" changes={coin.changes} font={semiboldFont} />
      </Col>
    </Row>
  );
};

export default CoinBlock;
