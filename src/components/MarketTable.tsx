import { semiboldFont, mediumFont } from "@/utils/fonts";
import Image from "next/image";
import { Container, Row } from "react-bootstrap";
import PercentageTag from "./PercentageTag";

type MarketTableProps = {
  theme: string;
};

const MarketTable = ({ theme }: MarketTableProps) => {
  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };
  return (
    <Container fluid style={containerClass} className="p-4">
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
              See whats happening in the market
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
            <tr style={{ height: "50px" }}>
              <td className="h6">1</td>
              <td>
                <Image
                  src={`/coins/BNB.svg`}
                  className="d-inline-block align-top"
                  alt="Crypto Goat logo"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                  priority
                />
                <span
                  className={`h6 ${semiboldFont.className}`}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Binance / BNB
                </span>
              </td>
              <td className={`h6 ${mediumFont.className}`}>$90.020</td>
              <td>
                <PercentageTag size="h6" changes={2} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={-8} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={12} font={mediumFont} />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span className={`sub6 ${mediumFont.className}`}>
                    $90,823,919,901
                  </span>
                  <span
                    className={`body ${mediumFont.className}`}
                    style={{
                      color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
                    }}
                  >
                    1,902,939 BTC
                  </span>
                </div>
              </td>
              <td className={`sub6 ${mediumFont.className}`}>
                $90,823,919,901
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td className="h6">1</td>
              <td>
                <Image
                  src={`/coins/BNB.svg`}
                  className="d-inline-block align-top"
                  alt="Crypto Goat logo"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                  priority
                />
                <span
                  className={`h6 ${semiboldFont.className}`}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Binance / BNB
                </span>
              </td>
              <td className={`h6 ${mediumFont.className}`}>$90.020</td>
              <td>
                <PercentageTag size="h6" changes={2} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={-8} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={12} font={mediumFont} />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span className={`sub6 ${mediumFont.className}`}>
                    $90,823,919,901
                  </span>
                  <span
                    className={`body ${mediumFont.className}`}
                    style={{
                      color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
                    }}
                  >
                    1,902,939 BTC
                  </span>
                </div>
              </td>
              <td className={`sub6 ${mediumFont.className}`}>
                $90,823,919,901
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td className="h6">1</td>
              <td>
                <Image
                  src={`/coins/BNB.svg`}
                  className="d-inline-block align-top"
                  alt="Crypto Goat logo"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                  priority
                />
                <span
                  className={`h6 ${semiboldFont.className}`}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Binance / BNB
                </span>
              </td>
              <td className={`h6 ${mediumFont.className}`}>$90.020</td>
              <td>
                <PercentageTag size="h6" changes={2} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={-8} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={12} font={mediumFont} />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span className={`sub6 ${mediumFont.className}`}>
                    $90,823,919,901
                  </span>
                  <span
                    className={`body ${mediumFont.className}`}
                    style={{
                      color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
                    }}
                  >
                    1,902,939 BTC
                  </span>
                </div>
              </td>
              <td className={`sub6 ${mediumFont.className}`}>
                $90,823,919,901
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td className="h6">1</td>
              <td>
                <Image
                  src={`/coins/BNB.svg`}
                  className="d-inline-block align-top"
                  alt="Crypto Goat logo"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                  priority
                />
                <span
                  className={`h6 ${semiboldFont.className}`}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Binance / BNB
                </span>
              </td>
              <td className={`h6 ${mediumFont.className}`}>$90.020</td>
              <td>
                <PercentageTag size="h6" changes={2} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={-8} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={12} font={mediumFont} />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span className={`sub6 ${mediumFont.className}`}>
                    $90,823,919,901
                  </span>
                  <span
                    className={`body ${mediumFont.className}`}
                    style={{
                      color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
                    }}
                  >
                    1,902,939 BTC
                  </span>
                </div>
              </td>
              <td className={`sub6 ${mediumFont.className}`}>
                $90,823,919,901
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td className="h6">1</td>
              <td>
                <Image
                  src={`/coins/BNB.svg`}
                  className="d-inline-block align-top"
                  alt="Crypto Goat logo"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                  priority
                />
                <span
                  className={`h6 ${semiboldFont.className}`}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Binance / BNB
                </span>
              </td>
              <td className={`h6 ${mediumFont.className}`}>$90.020</td>
              <td>
                <PercentageTag size="h6" changes={2} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={-8} font={mediumFont} />
              </td>
              <td>
                <PercentageTag size="h6" changes={12} font={mediumFont} />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span className={`sub6 ${mediumFont.className}`}>
                    $90,823,919,901
                  </span>
                  <span
                    className={`body ${mediumFont.className}`}
                    style={{
                      color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
                    }}
                  >
                    1,902,939 BTC
                  </span>
                </div>
              </td>
              <td className={`sub6 ${mediumFont.className}`}>
                $90,823,919,901
              </td>
            </tr>
          </tbody>
        </table>
      </Row>
    </Container>
  );
};

export default MarketTable;
