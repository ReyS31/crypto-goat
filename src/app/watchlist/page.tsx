// import MarketNoSsr from "@/pages/MarketNoSsr";
import MarketTable from "@/components/MarketTable";
import TopGainerContainer from "@/components/TopGainerContainer";
import TrendingContainer from "@/components/TrendingContainer";
import WatchlistContainer from "@/components/WatchlistContainer";
import getTheme from "@/lib/getTheme";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";

export default async function Watchlist() {
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
            <TrendingContainer theme={theme ?? "light"} />
            <TopGainerContainer theme={theme ?? "light"} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
