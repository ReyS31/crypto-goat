import ChartContainer from "@/components/ChartContainer";
import CoinInfoCointainer from "@/components/CoinInfoContainer";
import CoinInfoHeader from "@/components/CoinInfoHeader";
import PercentageTag from "@/components/PercentageTag";
import TopGainerContainer from "@/components/TopGainerContainer";
import TrendingContainer from "@/components/TrendingContainer";
import { getCoin } from "@/lib/coinApi";
import getTheme from "@/lib/getTheme";
import { CoinGeckoMetadata } from "@/types";
import { semiboldFont } from "@/utils/fonts";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
  Row,
  Col,
  Stack,
} from "react-bootstrap";

export default async function CoinMarket({
  params,
}: {
  params: { coin: string };
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  const coin: CoinGeckoMetadata = await getCoin(params.coin);
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
        <Breadcrumb>
          <BreadcrumbItem href="/market">Market</BreadcrumbItem>
          <BreadcrumbItem active>{coin.name ?? coin.symbol}</BreadcrumbItem>
        </Breadcrumb>

        {coin.public_notice && (
          <Alert variant={theme}>
            <p dangerouslySetInnerHTML={{ __html: coin.public_notice }}></p>
          </Alert>
        )}
        <Row className="mt-4">
          <Col xs={12} md={9}>
            <CoinInfoHeader theme={theme} coin={coin} />
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
