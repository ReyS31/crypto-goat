import { FontSize } from "@/types";
import { NextFont } from "next/dist/compiled/@next/font";

const PercentageTag = ({ changes, font, size }: { changes: number, font: NextFont, size: FontSize }) => {
  return (
    <span
      className={`${size} ${font.className}`}
      style={{
        color: changes >= 0 ? "#479F76" : "#FF4F4F",
      }}
    >
      {`${changes > 0 ? "+" : ""} ${changes}%`}
    </span>
  );
};

export default PercentageTag;
