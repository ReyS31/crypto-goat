import { Container } from "react-bootstrap";
import BarChart from "./Charts/BarChart";
import { CoinGeckoMetadata } from "@/types";
type ChartContainerType = {
  theme: string;
  coin: CoinGeckoMetadata;
};

export default function ChartContainer({ theme, coin }: ChartContainerType) {
  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
  };
  return (
    <Container fluid style={containerClass} className="p-4">
      <BarChart theme={theme} coin={coin} />
    </Container>
  );
}
