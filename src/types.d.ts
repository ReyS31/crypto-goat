export type Coin = {
  symbol: string;
  name: string;
  changes: number | undefined;
  price: number | undefined;
};

export type CommonComponentProps = {
  coin: Coin;
  theme: string;
};

export type FontSize =
  | "body"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "sub1"
  | "sub2";
export type ChartTimeRange = "1d" | "7d" | "14d" | "30d";

export type CoinGeckoMetadata = {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: Platforms;
  detail_platforms: { [key: string]: DetailPlatform };
  block_time_in_minutes: number;
  hashing_algorithm: null | string;
  categories: string[];
  preview_listing: boolean;
  public_notice: null | string;
  additional_notices: any[];
  localization: Tion;
  description: Tion;
  links: CoinGeckoMetadatumLinks;
  image: Image;
  country_origin: string;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number | null;
  sentiment_votes_down_percentage: number | null;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: MarketData;
  status_updates: any[];
  last_updated: string;
  tickers: Ticker[];
  contract_address?: string;
  ico_data?: IcoData;
};

export type Metadata = CoinGeckoMetadata & {
  is_on_watchlist: boolean;
};

export type Tion = {
  en: string;
  de: string;
  es: string;
  fr: string;
  it: string;
  pl: string;
  ro: string;
  hu: string;
  nl: string;
  pt: string;
  sv: string;
  vi: string;
  tr: string;
  ru: string;
  ja: string;
  zh: string;
  "zh-tw": string;
  ko: string;
  ar: string;
  th: string;
  id: string;
  cs: string;
  da: string;
  el: string;
  hi: string;
  no: string;
  sk: string;
  uk: string;
  he: string;
  fi: string;
  bg: string;
  hr: string;
  lt: string;
  sl: string;
};

export type DetailPlatform = {
  decimal_place: number | null;
  contract_address: string;
};

export type IcoData = {
  ico_start_date: string | null;
  ico_end_date: string | null;
  short_desc: string;
  description: null;
  links: IcoDataLinks;
  softcap_currency: string;
  hardcap_currency: string;
  total_raised_currency: string;
  softcap_amount: null;
  hardcap_amount: null;
  total_raised: null;
  quote_pre_sale_currency: string;
  base_pre_sale_amount: string;
  quote_pre_sale_amount: string;
  quote_public_sale_currency: string;
  base_public_sale_amount: number;
  quote_public_sale_amount: number;
  accepting_currencies: string;
  country_origin: string;
  pre_sale_start_date: string | null;
  pre_sale_end_date: string | null;
  whitelist_url: string;
  whitelist_start_date: string | null;
  whitelist_end_date: string | null;
  bounty_detail_url: string;
  amount_for_sale: null;
  kyc_required: boolean;
  whitelist_available: boolean;
  pre_sale_available: null;
  pre_sale_ended: boolean;
};

export type IcoDataLinks = {};

export type Image = {
  thumb: string;
  small: string;
  large: string;
};

export type CoinGeckoMetadatumLinks = {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposURL;
};

export type ReposURL = {
  github: string[];
  bitbucket: any[];
};

export type MarketData = {
  current_price: { [key: string]: number };
  total_value_locked: { [key: string]: number } | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: Roi | null;
  ath: { [key: string]: number };
  ath_change_percentage: { [key: string]: number };
  ath_date: { [key: string]: string };
  atl: { [key: string]: number };
  atl_change_percentage: { [key: string]: number };
  atl_date: { [key: string]: string };
  market_cap: { [key: string]: number };
  market_cap_rank: number;
  fully_diluted_valuation: { [key: string]: number };
  market_cap_fdv_ratio: number;
  total_volume: { [key: string]: number };
  high_24h: { [key: string]: number };
  low_24h: { [key: string]: number };
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: { [key: string]: number };
  price_change_percentage_1h_in_currency: { [key: string]: number };
  price_change_percentage_24h_in_currency: { [key: string]: number };
  price_change_percentage_7d_in_currency: { [key: string]: number };
  price_change_percentage_14d_in_currency: { [key: string]: number };
  price_change_percentage_30d_in_currency: { [key: string]: number };
  price_change_percentage_60d_in_currency: { [key: string]: number };
  price_change_percentage_200d_in_currency: { [key: string]: number };
  price_change_percentage_1y_in_currency: { [key: string]: number };
  market_cap_change_24h_in_currency: { [key: string]: number };
  market_cap_change_percentage_24h_in_currency: { [key: string]: number };
  total_supply: number;
  max_supply: number | null;
  circulating_supply: number;
  sparkline_7d: Sparkline7D;
  last_updated: string;
};

export type Roi = {
  times: number;
  currency: string;
  percentage: number;
};

export type Sparkline7D = {
  price: number[];
};

export type Platforms = {
  ""?: string;
  ethereum?: string;
  energi?: string;
  "optimistic-ethereum"?: string;
  "polygon-pos"?: string;
  fantom?: string;
  "arbitrum-one"?: string;
  sora?: string;
  chiliz?: string;
  "harmony-shard-0"?: string;
  moonriver?: string;
  moonbeam?: string;
  "binance-smart-chain"?: string;
};

export type Ticker = {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: { [key: string]: number };
  converted_volume: { [key: string]: number };
  trust_score: TrustScore | null;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: null | string;
  token_info_url: null;
  coin_id: string;
  target_coin_id?: string;
};

export type Market = {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
};

export type TrustScore = "green" | "yellow";

export type CoinExchange = {
  symbol: string;
  name: string;
  price: number | undefined;
  percent_change_1h: number | undefined;
  percent_change_24h: number | undefined;
  percent_change_7d: number | undefined;
  volume_24h: number | undefined;
  market_cap: number | undefined;
  rank: number;
};
