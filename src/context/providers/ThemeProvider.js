import {
  createTheme,
  ThemeProvider as MaterialThemeProvider,
} from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const theme = createTheme({
  palette: {
    background: {
      paper: "#173A5E",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
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
