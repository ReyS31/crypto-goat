"use client";

import { ThemeProvider as BsThemeProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return (
    <SessionProvider>
        <BsThemeProvider
          breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
          minBreakpoint="xxs"
        >
          {children}
        </BsThemeProvider>
    </SessionProvider>
  );
}
