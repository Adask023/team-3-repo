/*eslint-disable*/
//FIXME: importy...
import {
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";

import { ROUTES } from "../../constans/routes";
import UserInfoContext from "../../context/UserInfoContext";

export const Login = () => {
  const { setUserInfo } = useContext(UserInfoContext);
  const { push } = useHistory();

  const login = useCallback(
    ({ login }) => {
      setUserInfo({
        login,
      });
      push(ROUTES.CALENDAR);
    },
    [push, setUserInfo]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Formik
        initialValues={{ login: "" }}
        onSubmit={login}
        validationSchema={Yup.object().shape({
          login: Yup.string().trim().required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                error={errors.login && touched.login}
              >
                <OutlinedInput
                  id="login"
                  placeholder="Login"
                  type="text"
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  color={errors.login && touched.login ? "warning" : "success"}
                />
                <FormHelperText
                  sx={{
                    height: "25px",
                  }}
                  id="component-error-text"
                >
                  {errors.login}
                </FormHelperText>
                <Button
                  sx={{
                    width: "150px",
                  }}
                  type="submit"
                  variant="contained"
                >
                  LOGIN
                </Button>
              </FormControl>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};
