"use client";

import { ThemeProvider as BsThemeProvider } from "react-bootstrap";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider enableSystem={false}>
        <BsThemeProvider
          breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
          minBreakpoint="xxs"
        >
          {children}
        </BsThemeProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
