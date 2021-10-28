import {
  createTheme,
  ThemeProvider as MaterialThemeProvider,
} from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const theme = createTheme({
  palette: {
    action: {
      active: "#001E3C",
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
