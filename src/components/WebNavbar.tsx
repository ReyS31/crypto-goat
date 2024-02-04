"use client"
import Image from "next/image";
import { useState } from "react";
import { Navbar, Container, NavbarBrand, Nav, NavLink } from "react-bootstrap";

export default function WebNavbar() {
    const [isDark, setIsDark] = useState<boolean>(true);
    return <Navbar className="bg-white justify-content-between" style={{
        paddingTop: "10px",
        paddingBottom: "10px"
    }}>
        <Container>
            <NavbarBrand href="asdasd">
                <Image
                    src="/logo.svg"
                    className="d-inline-block align-top"
                    alt="Crypto Goat logo"
                    width={30}
                    height={30}
                    priority
                />
                {' '}
                Crypto Goat
            </NavbarBrand>
        </Container>
        <Nav className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
            <NavLink href="#action1">Home</NavLink>
            <NavLink href="#action2">Link</NavLink>
        </Nav>
    </Navbar>;
}