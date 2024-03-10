import { semiboldFont } from "@/utils/fonts";
import { Col, Row, Stack } from "react-bootstrap";
import PercentageTag from "./PercentageTag";
import Image from "next/image";
import { CoinGeckoMetadata } from "@/types";

type CoinInfoHeaderProps = {
  coin: CoinGeckoMetadata;
  theme: string;
};

export default function CoinInfoHeader({ coin, theme }: CoinInfoHeaderProps) {
  return (
    <>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Stack direction="horizontal" gap={4}>
            <Image
              src={`/coins/${coin.symbol.toUpperCase()}.svg`}
              className="d-inline-block align-top"
              alt={`${coin.name ?? coin.symbol} logo`}
              width={64}
              height={64}
              style={{ borderRadius: "50%" }}
              priority
            />
            <h3 className="h3">
              {coin.name} / {coin.symbol.toUpperCase()}
            </h3>
          </Stack>
          <Stack
            direction="horizontal"
            gap={3}
            style={{
              marginLeft: "87px",
              alignContent: "center",
              alignItems: "start",
            }}
          >
            <h3 className="h3">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(coin.market_data.current_price["usd"])}
            </h3>
            <div
              style={{
                background: "#D6FCE3",
                color: "#479F76",
                borderRadius: "4px",
                marginTop: "4px",
              }}
              className="px-2"
            >
              <PercentageTag
                size="h6"
                changes={Number(
                  coin.market_data.price_change_percentage_24h_in_currency[
                    "usd"
                  ]
                )}
                font={semiboldFont}
              />
            </div>
          </Stack>
        </Col>
      </Row>
      <Stack
        direction="horizontal"
        className="mb-4"
        gap={20}
        style={{
          width: "100%",
          justifyContent: "space-between",
          background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
          borderRadius: "12px",
        }}
      >
        <Stack className="p-4">
          <h6
            className={`h6 ${semiboldFont.className} mb-4`}
            style={{
              color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
            }}
          >
            Market Cap
          </h6>
          <h5 className={`h5 ${semiboldFont.className}`}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.market_data.market_cap["usd"])}
          </h5>
          <PercentageTag
            changes={
              coin.market_data.market_cap_change_percentage_24h_in_currency[
                "usd"
              ]
            }
            font={semiboldFont}
            size="h6"
          />
        </Stack>
        <Stack className="p-4">
          <h6
            className={`h6 ${semiboldFont.className} mb-4`}
            style={{
              color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
            }}
          >
            Fully Diluted
          </h6>
          <h5 className={`h5 ${semiboldFont.className}`}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.market_data.fully_diluted_valuation["usd"])}
          </h5>
        </Stack>
        <Stack className="p-4">
          <h6
            className={`h6 ${semiboldFont.className} mb-4`}
            style={{
              color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
            }}
          >
            Volume
          </h6>
          <h5 className={`h5 ${semiboldFont.className}`}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.market_data.total_volume["usd"])}
          </h5>
        </Stack>
        <Stack className="p-4">
          <h6
            className={`h6 ${semiboldFont.className} mb-4`}
            style={{
              color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
            }}
          >
            Circullating Supply
          </h6>
          <h5 className={`h5 ${semiboldFont.className}`}>
            {new Intl.NumberFormat("de-DE").format(
              coin.market_data.circulating_supply
            )}{" "}
            {coin.symbol.toUpperCase()}
          </h5>
        </Stack>
      </Stack>
    </>
  );
}
