import WatchlistTable from "@/components/WatchlistTable";
import getTheme from "@/lib/getTheme";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Container } from "react-bootstrap";

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
        <WatchlistTable theme={theme ?? "light"} />
      </Container>
    </main>
  );
}
