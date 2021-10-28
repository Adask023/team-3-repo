import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constans/routes";
import UserInfoContext from "../../context/UserInfoContext";

export const Navbar = () => {
  const { setUserInfo } = useContext(UserInfoContext);

  const logout = useCallback(() => setUserInfo(null), [setUserInfo]);

  return (
    <Box
      sx={{
        height: " 60px",
        display: "flex",
        px: 2,
        py: 1,
        background: "#46505A",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          "& a": {
            mr: 3,
          },
        }}
      >
        <Link to={ROUTES.CALENDAR}>Calendar</Link>
        <Link to={ROUTES.BUNDLE}>Bundle</Link>
        <Link to={ROUTES.SETTINGS}>Settings</Link>
      </Box>

      <Button
        variant="contained"
        sx={{
          ml: "auto",
          height: "40px",
        }}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
};
