import ChartContainer from "@/components/ChartContainer";
import CoinInfoCointainer from "@/components/CoinInfoContainer";
import TopGainerContainer from "@/components/TopGainerContainer";
import TrendingContainer from "@/components/TrendingContainer";
import getTheme from "@/lib/getTheme";
import { prisma } from "@/lib/prisma";
// import MarketCoinNoSsr from "@/pages/MarketCoinNoSsr";
import { CoinGeckoMetadata } from "@/types";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";
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

async function getCoin(coin: string): Promise<CoinGeckoMetadata> {
  const cryptoDB = await prisma.coin.findFirst({
    where: {
      symbol: coin.toUpperCase(),
    },
  });

  const getCached = unstable_cache(
    async (cryptoDB) =>
      fetch(
        `https://api.coingecko.com/api/v3//coins/${cryptoDB?.coingecko_id}?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`,
        {
          headers: {
            Cookie:
              "__cf_bm=cpajWUgWQcx3K9VreswMZaRngA2bGTUThjcdvJpH99Y-1708666680-1.0-AS6znZBreKSV6i2rXXsxkaEvPS7baQXmHRz+qWBGYfAiWI11a/JKNt9qcoAqHfHFVXUZNfHFGEatiAJVzwUyA/4=",
          },
          next: {
            revalidate: 60,
          },
        }
      )
        .then((response) => {
          console.log("from main server");
          return response.json();
        })
        .catch((error) => console.error(error)),
    ["coin", cryptoDB?.id!]
  );

  const data = await getCached(cryptoDB);

  return data;
}

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
