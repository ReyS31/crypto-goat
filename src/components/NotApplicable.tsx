import { FontSize } from "@/types";
import { NextFont } from "next/dist/compiled/@next/font";

const NotApplicable = ({
  font,
  size,
}: {
  font?: NextFont;
  size?: FontSize;
}) => {
  return <span className={`${size} ${font?.className}`}>N/A</span>;
};

export default NotApplicable;
