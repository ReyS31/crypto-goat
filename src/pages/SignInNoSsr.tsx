"use client"

import getTheme from "@/lib/getTheme";
import { mediumFont, regularFont } from "@/utils/fonts";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Stack,
} from "react-bootstrap";

export default function SignInNoSsr({theme}: {theme:string}) {
  const containerClass = {
    borderRadius: "12px",
    background: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
    color: theme === "dark" ? "#FFFFFF" : "#121F3E",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main
      className={`py-3 px-5 ${
        theme === "dark"
          ? "bg-dark-custom text-white"
          : "bg-white-custom text-custom"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <Stack className="col-md-5 m-auto mt-5">
        <Container
          fluid
          style={{
            ...containerClass,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
          className="p-5"
        >
          <Row>
            <Col>
              <h6
                className={`h6 ${regularFont.className}`}
                style={{
                  color: theme === "dark" ? "#858EA4" : "#121F3E80",
                }}
              >
                Hi, Welcome
              </h6>
              <h3 className={`h3 ${mediumFont.className}`}>
                Sign in your account
              </h3>
            </Col>
          </Row>
          <Form className="mt-4">
            <FormGroup className="mb-3" controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  ...containerClass,
                  height: "48px",
                  border: "1px solid #303840",
                }}
              />
            </FormGroup>
            <FormGroup className="mb-4" controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...containerClass,
                  height: "48px",
                  border: "1px solid #303840",
                }}
              />
            </FormGroup>
            <Button
              style={{ width: "100%" }}
              variant="primary"
              onClick={() =>
                signIn("credentials", {
                  redirect: true,
                  email,
                  password,
                })
              }
            >
              Sign In
            </Button>
          </Form>
        </Container>
      </Stack>
    </main>
  );
}
