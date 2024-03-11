import ChartContainer from "@/components/ChartContainer";
import CoinInfoCointainer from "@/components/CoinInfoContainer";
import CoinInfoHeader from "@/components/CoinInfoHeader";
import MarketTable from "@/components/MarketTable";
import TopGainerContainer from "@/components/TopGainerContainer";
import TrendingContainer from "@/components/TrendingContainer";
import { addToWatchlist, getCoin } from "@/lib/coinApi";
import getTheme from "@/lib/getTheme";
import { CoinGeckoMetadata, Metadata } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Container, Alert, Row, Col, Stack } from "react-bootstrap";

export default async function CoinMarket({
  params,
}: {
  params: { coin: string };
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  const coin: Metadata = await getCoin(params.coin);
  const theme = await getTheme();
  return (
    <main
      className={`py-3 px-5 ${
        theme === "dark"
          ? "bg-dark-custom text-white"
          : "bg-white-custom text-custom"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <Container fluid>
        <nav aria-label="breadcrumb">
          <ol
            className="breadcrumb"
            style={{
              color: "#121F3E",
            }}
          >
            <li className="breadcrumb-item">
              <a
                href="/market"
                style={{
                  textDecoration: "none",
                  color: "#121F3E",
                }}
              >
                Market
              </a>
            </li>
            <li
              className="breadcrumb-item"
              aria-current="page"
              style={{
                color: "#121F3E80",
              }}
            >
              {coin.name ?? coin.symbol}
            </li>
          </ol>
        </nav>

        {coin.public_notice && (
          <Alert variant={theme}>
            <p dangerouslySetInnerHTML={{ __html: coin.public_notice }}></p>
          </Alert>
        )}
        <Row className="mt-4">
          <Col xs={12} md={9}>
            <CoinInfoHeader
              theme={theme}
              coin={coin}
              addToWatchlist={addToWatchlist}
            />
            <ChartContainer coin={coin} theme={theme ?? "light"} />
            <MarketTable
              theme={theme ?? "light"}
              symbol={coin.symbol.toUpperCase()}
              className="mt-4"
            />
          </Col>
          <Col md={3}>
            <Stack gap={3}>
              <CoinInfoCointainer theme={theme} coin={coin} />
              <TrendingContainer theme={theme ?? "light"} />
              <TopGainerContainer theme={theme ?? "light"} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
