/* eslint-disable no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ROUTES } from "../../constans/routes";
import UserInfoContext from "../../context/UserInfoContext";

export const Navbar = () => {
  const { setUserInfo } = useContext(UserInfoContext);
  const { push } = useHistory();
  const { logout: oAuthLogout } = useAuth0();

  const logout = useCallback(() => {
    setUserInfo(null);
    oAuthLogout();
  }, [oAuthLogout, setUserInfo]);

  return (
    <Box
      sx={{
        height: " 60px",
        display: "flex",
        px: 2,
        py: 1,
        background: "#E7E5E5",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          ml: 3,
          "& a": {
            mr: 4,
          },
        }}
      >
        <Button
          size="large"
          variant="text"
          onClick={() => push(ROUTES.CALENDAR)}
        >
          Calendar
        </Button>
        <Button variant="text" onClick={() => push(ROUTES.BUNDLE)}>
          Bundle
        </Button>
        <Button variant="text" onClick={() => push(ROUTES.SETTINGS)}>
          Settings
        </Button>
      </Box>

      <Button
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
