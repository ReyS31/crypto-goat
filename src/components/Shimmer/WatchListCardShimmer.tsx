import { semiboldFont, mediumFont } from "@/utils/fonts";
import { Container, Row, Col } from "react-bootstrap";

const WatchlistCardShimmer = ({ theme }: { theme: string }) => {
  return (
    <Container
      className={`p-4 ${theme === "dark" ? "card-dark-custom" : "bg-white"}`}
      style={{ borderRadius: "10px" }}
    >
      <Row>
        <Col
          style={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <div
            className={`d-inline-block align-top ${theme === "dark" ? "bg-dark-custom" : "bg-light"}`}
            style={{ borderRadius: "50%", width: "40px", height: "40px" }}
          ></div>
          <h6
            className={`h6 ${semiboldFont.className}`}
            style={{ marginLeft: "12px" }}
          >
            Loading...
            <span
              className={`body ${mediumFont.className}`}
              style={{
                background: theme === "dark" ? "#000F3E" : "#DBE4FF",
                color: "#267CFD",
                padding: "4px 8px",
                borderRadius: "4px",
                marginLeft: "4px",
              }}
            >
                Loading...
            </span>
          </h6>
        </Col>
      </Row>
      <Row className="mt-3">
        <span
          className={`sub2 ${mediumFont.className}`}
          style={{ color: theme === "dark" ? "#C1CEED80" : "#121F3E80" }}
        >
          Coin Price
        </span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6 className={`h6 ${semiboldFont.className}`}>Loading...</h6>
          <h6
            className={`h6 ${semiboldFont.className}`}
            style={{
              color: true? "#479F76" : "#FF4F4F",
            }}
          >
            {`${true? "+" : ""} 1%`}
          </h6>
        </div>
      </Row>
    </Container>
  );
};

export default WatchlistCardShimmer;
