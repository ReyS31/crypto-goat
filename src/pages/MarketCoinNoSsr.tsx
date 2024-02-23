import ChartContainer from "@/components/ChartContainer";
import CoinInfoCointainer from "@/components/CoinInfoContainer";
import TopGainerContainer from "@/components/TopGainerContainer";
import TrendingContainer from "@/components/TrendingContainer";
import getTheme from "@/lib/getTheme";
import { CoinGeckoMetadata } from "@/types";
import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";

export default function MarketCoinNoSsr({ coin }: { coin: CoinGeckoMetadata }) {
  const theme = getTheme();
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
        <Breadcrumb>
          <BreadcrumbItem href="/market">Market</BreadcrumbItem>
          <BreadcrumbItem active>{coin.name}</BreadcrumbItem>
        </Breadcrumb>

        {coin.public_notice && (
          <Alert variant={theme}>
            <p dangerouslySetInnerHTML={{ __html: coin.public_notice }}></p>
          </Alert>
        )}

        {/* <WatchlistContainer theme={theme ?? "light"} /> */}
        <Row className="mt-4">
          <Col xs={12} md={9}>
            <ChartContainer coin={coin} theme={theme ?? "light"} />
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
