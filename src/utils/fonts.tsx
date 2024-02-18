import { Lato, Poppins } from "next/font/google";

const regularFont = Poppins({
  weight: "400",
  subsets: ['latin']
});

const mediumFont = Poppins({
  weight: "500",
  subsets: ['latin']
});

const semiboldFont = Poppins({
  weight: "600",
  subsets: ['latin']
});

const boldFont = Poppins({
  weight: "700",
  subsets: ['latin']
});

const logoFont = Lato({
  weight: "900",
  subsets: ['latin']
});

export { regularFont, mediumFont, semiboldFont, boldFont, logoFont };
