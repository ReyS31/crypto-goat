import { semiboldFont, mediumFont } from "@/utils/fonts";
import Image from "next/image";
import { Container, Row, Stack } from "react-bootstrap";
import PercentageTag from "./PercentageTag";
import { getExchange } from "@/lib/coinApi";
import Link from "next/link";
import NotApplicable from "./NotApplicable";

type MarketTableProps = {
  theme: string;
  symbol?: string;
  className?: string;
};

const MarketTable = async ({
  theme,
  symbol = "USD",
  className = "",
}: MarketTableProps) => {
  const exchangeList = await getExchange(symbol);
  const formatter =
    symbol !== "USD"
      ? new Intl.NumberFormat("de-DE", {
          minimumFractionDigits: ["BTC", "ETH"].includes(symbol) ? 10 : 4,
        })
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };
  return (
    <Container fluid style={containerClass} className={`p-4 ${className}`}>
      <Row>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h5 className={`h5 ${semiboldFont.className}`}>Market Coins</h5>
            <p
              className={`sub2 ${mediumFont.className}`}
              style={{
                color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
              }}
            >
              See whats happening in the market now
            </p>
          </div>
          <div></div>
        </div>
      </Row>
      <Row className="px-3">
        <table style={{ width: "100%" }}>
          <thead>
            <tr
              style={{
                borderWidth: " 1px, 0px, 1px, 0px",
                borderStyle: "solid",
                borderColor: " #C1CEED1A",
              }}
            >
              <th>No</th>
              <th>Coin Name</th>
              <th>Price</th>
              <th>1h%</th>
              <th>24h%</th>
              <th>7d%</th>
              <th>24h Vol</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {exchangeList.map((coin, index) => (
              <tr style={{ height: "50px" }} key={coin.symbol}>
                <td className="h6">{index + 1}</td>
                <td>
                  <Image
                    src={`/coins/${coin.symbol}.svg`}
                    className="d-inline-block align-top"
                    alt="Crypto Goat logo"
                    width={30}
                    height={30}
                    style={{ borderRadius: "50%" }}
                    priority
                  />
                  <Link
                    href={`/market/${coin.symbol}`}
                    className={`h6 ${semiboldFont.className}`}
                    style={{
                      marginLeft: "10px",
                      textDecoration: "none",
                    }}
                  >
                    {coin.name} / {coin.symbol.toUpperCase()}
                  </Link>
                </td>
                <td className={`h6 ${mediumFont.className}`}>
                  {coin.price ? (
                    symbol === "USD" ? (
                      formatter.format(coin.price)
                    ) : (
                      `${formatter.format(coin.price)} ${symbol.toUpperCase()}`
                    )
                  ) : (
                    <NotApplicable />
                  )}
                </td>
                <td>
                  {coin.percent_change_1h ? (
                    <PercentageTag
                      size="h6"
                      changes={coin.percent_change_1h}
                      font={mediumFont}
                    />
                  ) : (
                    <NotApplicable size="h6" font={mediumFont} />
                  )}
                </td>
                <td>
                  {coin.percent_change_24h ? (
                    <PercentageTag
                      size="h6"
                      changes={coin.percent_change_24h}
                      font={mediumFont}
                    />
                  ) : (
                    <NotApplicable size="h6" font={mediumFont} />
                  )}
                </td>
                <td>
                  {coin.percent_change_7d ? (
                    <PercentageTag
                      size="h6"
                      changes={coin.percent_change_7d}
                      font={mediumFont}
                    />
                  ) : (
                    <NotApplicable size="h6" font={mediumFont} />
                  )}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span className={`sub6 ${mediumFont.className}`}>
                      {coin.volume_24h ? (
                        symbol === "USD" ? (
                          formatter.format(coin.volume_24h)
                        ) : (
                          `${formatter.format(
                            coin.volume_24h
                          )} ${symbol.toUpperCase()}`
                        )
                      ) : (
                        <NotApplicable />
                      )}
                    </span>
                  </div>
                </td>
                <td className={`sub6 ${mediumFont.className}`}>
                  {coin.market_cap ? (
                    symbol === "USD" ? (
                      formatter.format(coin.market_cap)
                    ) : (
                      `${formatter.format(
                        coin.market_cap
                      )} ${symbol.toUpperCase()}`
                    )
                  ) : (
                    <NotApplicable />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>

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

export default MarketTable;
