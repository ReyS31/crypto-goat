export type Coin = {
    symbol: string;
    name: string;
    changes: number;
    price: number;
};

export type CommonComponentProps = {
    coin: Coin;
    theme: string;
}

export type FontSize = "body" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "sub1" | "sub2";
export type ChartTimeRange = "1d" | "7d" | "14d" | "30d";