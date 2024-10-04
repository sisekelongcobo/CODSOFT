import { Box, Typography } from "@mui/material";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#333", color: "white", py: 4, textAlign: "center" }}>
      <Typography variant="body2" sx={{ fontSize: "14px" }}>
        © 2024 JobBoard. All rights reserved. | Developed by Sisekelo Ngcobo
      </Typography>
    </Box>
  );
};
