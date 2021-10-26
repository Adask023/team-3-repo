import { Box } from "@mui/system";
import React from "react";

import { Navbar } from "../../components/Navbar/Navbar";

export const AuthorizedLayout = ({ children }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Navbar />
      {children}
    </Box>
  );
};
