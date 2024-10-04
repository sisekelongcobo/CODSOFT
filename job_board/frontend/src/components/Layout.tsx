import { Box } from "@mui/material";
import React from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar />

      <Box sx={{ my: 1, minHeight: "calc(100vh - 64px)", paddingBottom: "1px" }}>{children}</Box>
      {/* @ts-ignore */}
      <Footer sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} />
    </>
  );
};
