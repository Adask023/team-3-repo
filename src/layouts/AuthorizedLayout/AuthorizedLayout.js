import { Box } from "@mui/system";
import React from "react";

import { Navbar } from "../../components/Navbar/Navbar";

export const AuthorizedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </>
  );
};
