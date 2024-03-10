"use client";

import { ChartTimeRange, CoinGeckoMetadata } from "@/types";
import { mediumFont } from "@/utils/fonts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Spinner,
  Stack,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({
  theme,
  coin,
}: {
  theme: string;
  coin: CoinGeckoMetadata;
}) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Long-Short Ratio Chart",
      },
    },
    responsive: true,
    scales: {
      x: {
        min:0,
        max:100,
        stacked: true,
      },
      y: {
        min:0,
        max:100,
        stacked: true,
      },
    },
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const [time, setTime] = useState<ChartTimeRange>("1d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChart = async () => {
      setLoading(true);
      await fetch(
        `${window.location.protocol}//${window.location.host}/api/binance?coin=${coin.symbol}&time=${time}`
      )
        .then((res) => res.json())
        .then((resData) => setData(resData))
        .then(() => setLoading(false));
    };
    getChart();
  }, [time, coin.symbol]);

  return (
    <>
      <Stack gap={3} direction="horizontal">
        <div className="p-2">{coin.name}</div>
        <div
          className="p-2 ms-auto"
        >
          <ButtonGroup>
            <Button variant={theme} disabled={loading} onClick={() => setTime("1d")} active={time==="1d"}>1d</Button>
            <Button variant={theme} disabled={loading} onClick={() => setTime("7d")} active={time==="7d"}>7d</Button>
            <Button variant={theme} disabled={loading} onClick={() => setTime("14d")} active={time==="14d"}>14d</Button>
            <Button variant={theme} disabled={loading} onClick={() => setTime("30d")} active={time==="30d"}>30d</Button>
          </ButtonGroup>
        </div>
      </Stack>
      <Stack gap={2} className="mx-auto">
        {loading ? (
          <div className="text-center">
            <Spinner
              animation="grow"
              style={{
                width: "5rem",
                height: "5rem",
              }}
            />
          </div>
        ) : (
          <Bar options={options} data={data} />
        )}
        <span
          className={`sub2 ${mediumFont.className} text-right`}
          style={{
            color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
          }}
        >
          By 
          {" "}
          <Link
            href="https://binance.com/"
            target="_blank"
            style={{
              color: theme === "dark" ? "#C1CEED80" : "#121F3E80",
            }}
          >
            Binance
          </Link>
        </span>
      </Stack>
    </>
  );
}
