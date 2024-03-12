"use client";

import { logoFont, regularFont } from "@/utils/fonts";
import Image from "next/image";
import { Navbar, Container, NavbarBrand, Nav, NavLink } from "react-bootstrap";
import AuthButton from "./Button/AuthButton";
import getTheme from "@/lib/getTheme";

export default function WebNavbar({ theme }: { theme: string }) {
  function changeTheme() {
    fetch(`/api/theme?theme=${theme === "dark" ? "light" : "dark"}`).then(
      (res) => window.location.reload()
    );
  }

  return (
    <header>
      <Navbar
        className={
          theme === "dark"
            ? "card-dark-custom justify-content-between"
            : "bg-white justify-content-between"
        }
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Container>
          <NavbarBrand href="/">
            <Image
              src={theme === "dark" ? "/dark_logo.svg" : "/logo.svg"}
              className="d-inline-block align-top"
              alt="Crypto Goat logo"
              width={30}
              height={30}
              priority
            />
            <span
              className={`h5 ${logoFont.className} px-1 ${
                theme === "dark" ? "text-white" : "text-custom"
              }`}
              style={{ lineHeight: "24px" }}
            >
              Coin Goat
            </span>
          </NavbarBrand>
        </Container>
        <Nav
          className="me-auto my-2 my-lg-0 gap-4"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <NavLink
            href="/market"
            className={`d-inline-block sub1 ${regularFont.className} ${
              theme === "dark" ? "text-white" : "text-custom"
            }`}
          >
            Market
          </NavLink>
          <NavLink
            href="/watchlist"
            className={`d-inline-block sub1 ${regularFont.className} ${
              theme === "dark" ? "text-white" : "text-custom"
            }`}
          >
            Watchlist
          </NavLink>

          <Image
            src={theme === "dark" ? "/sun_toggle.svg" : "/moon_toggle.svg"}
            style={{
              cursor: "pointer"
            }}
            alt="Theme Switcher"
            width={20}
            height={20}
            className="mt-2 mx-2"
            priority
            onClick={() => changeTheme()}
          />

          <AuthButton />
        </Nav>
      </Navbar>
    </header>
  );
}
