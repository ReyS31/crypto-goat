// import MarketNoSsr from "@/pages/MarketNoSsr";
import MarketTable from "@/components/MarketTable";
import TopGainerContainer from "@/components/TopGainerContainer";
import TrendingContainer from "@/components/TrendingContainer";
import WatchlistContainer from "@/components/WatchlistContainer";
import getTheme from "@/lib/getTheme";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Container, Row, Col, Stack } from "react-bootstrap";

export default async function Market() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
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
        <WatchlistContainer theme={theme ?? "light"} />
        <Row className="mt-4">
          <Col xs={12} md={9}>
            <MarketTable theme={theme ?? "light"} />
          </Col>
          <Col md={3}>
            <Stack gap={3}>
              <TrendingContainer theme={theme ?? "light"} />
              <TopGainerContainer theme={theme ?? "light"} />
            </Stack>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
