import { CoinGeckoMetadata } from "@/types";
import { mediumFont, regularFont, semiboldFont } from "@/utils/fonts";
import Link from "next/link";
import { Container, Stack } from "react-bootstrap";
type CoinInfoCointainerProps = {
  theme: string;
  coin: CoinGeckoMetadata;
};

const CoinInfoCointainer = ({ theme, coin }: CoinInfoCointainerProps) => {
  const containerStyle = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };

  const fontStyle = {
    color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
  };

  const linkStyle =
    theme === "dark"
      ? {
          width: "Hug (76px)",
          height: "Hug (23px)",
          padding: "4px, 8px, 4px, 8px",
          borderRadius: "4px",
          border: "1px solid #C1CEED1A",
          backgroundColor: "#1E1E1E",
          textDecoration: "none",
          color: "#ffffff",
        }
      : {
          width: "Hug (76px)",
          height: "Hug (23px)",
          padding: "4px, 8px, 4px, 8px",
          borderRadius: "4px",
          border: "1px solid #121F3E1A",
          backgroundColor: "#EDEDED",
          textDecoration: "none",
          color: "#121F3E",
        };

  return (
    <Container fluid style={containerStyle} className="p-4">
      <h6 className={`h6 ${semiboldFont.className}`}>About {coin.name}</h6>
      <p
        className={`sub2 ${regularFont.className}`}
        dangerouslySetInnerHTML={{ __html: coin.description.en }}
        style={{ ...fontStyle, textAlign: "justify" }}
      ></p>

      <Stack gap={2}>
        {/* Rank */}
        <Stack direction="horizontal">
          <span className={`sub2 ${mediumFont.className}`} style={fontStyle}>
            Rank
          </span>
          <span className={`sub2 ${mediumFont.className} ms-auto`}>
            #{coin.market_cap_rank}
          </span>
        </Stack>

        {/* Price */}
        <Stack direction="horizontal">
          <span className={`sub2 ${mediumFont.className}`} style={fontStyle}>
            Price
          </span>
          <span className={`sub2 ${mediumFont.className} ms-auto`}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.market_data.current_price["usd"])}
          </span>
        </Stack>

        {/* 24 High */}
        <Stack direction="horizontal">
          <span className={`sub2 ${mediumFont.className}`} style={fontStyle}>
            24 High
          </span>
          <span className={`sub2 ${mediumFont.className} ms-auto`}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.market_data.high_24h["usd"])}
          </span>
        </Stack>

        {/* 24 Low */}
        <Stack direction="horizontal">
          <span className={`sub2 ${mediumFont.className}`} style={fontStyle}>
            24 Low
          </span>
          <span className={`sub2 ${mediumFont.className} ms-auto`}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(coin.market_data.low_24h["usd"])}
          </span>
        </Stack>

        {/* Total Suppy */}
        <Stack direction="horizontal">
          <span className={`sub2 ${mediumFont.className}`} style={fontStyle}>
            Total Suppy
          </span>
          <span className={`sub2 ${mediumFont.className} ms-auto`}>
            {new Intl.NumberFormat("de-DE", {
              maximumSignificantDigits: 3,
            }).format(coin.market_data.total_supply)}{" "}
            {coin.symbol.toUpperCase()}
          </span>
        </Stack>

        {/* Max Suppy */}
        <Stack direction="horizontal">
          <span className={`sub2 ${mediumFont.className}`} style={fontStyle}>
            Max Suppy
          </span>
          <span className={`sub2 ${mediumFont.className} ms-auto`}>
            {coin.market_data.max_supply
              ? new Intl.NumberFormat("de-DE", {
                  maximumSignificantDigits: 3,
                }).format(coin.market_data.max_supply)
              : "~"}{" "}
            {coin.symbol.toUpperCase()}
          </span>
        </Stack>

        {/* Official Links */}
        <Stack>
          <span className={`sub2 ${mediumFont.className}`} style={fontStyle}>
            Official Links
          </span>

          <Stack direction="horizontal" gap={2} className="py-2">
            {coin.links.homepage.length > 0 && (
              <Link
                href={coin.links.homepage[0]}
                target="_blank"
                style={linkStyle}
              >
                <span className={`body ${mediumFont.className} px-2`}>
                  Website
                </span>
              </Link>
            )}
            {coin.links.whitepaper && (
              <Link
                href={coin.links.whitepaper}
                target="_blank"
                style={linkStyle}
              >
                <span className={`body ${mediumFont.className} px-2`}>
                  Whitepaper
                </span>
              </Link>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="horizontal" className="mt-3">
        <span
          className={`sub2 ${mediumFont.className} ms-auto`}
          style={{
            color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
          }}
        >
          By{" "}
          <Link
            href="https://www.coingecko.com/"
            target="_blank"
            style={{
              color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
            }}
          >
            CoinGecko
          </Link>
        </span>
      </Stack>
    </Container>
  );
};

export default CoinInfoCointainer;
