/*eslint-disable*/
import { useMutation, useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import React, { useCallback, useContext, useEffect, useState } from "react";
import UserInfoContext from "../../context/UserInfoContext";
import {
  ADD_USERS_BUNDLE,
  DELETE_USER_BUNDLE,
  GET_ALL_ENTRIES,
  SHOW_USER_BUNDLES
} from "../../queries/SettingsQueries";

export const Settings = () => {
  const { data, loading } = useQuery(GET_ALL_ENTRIES);
  const { data: dataUser } = useQuery(SHOW_USER_BUNDLES);
  const [assignBundleId] = useMutation(ADD_USERS_BUNDLE);
  const [deleteBundleId] = useMutation(DELETE_USER_BUNDLE);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [ render, setRender ] = useState( )
  // if (error) return <div className="">Error: </div>;
  // if (loading) return <div className="">Loading...</div>;
  useEffect( () => {
    setRender(data?.tagBundleMany)
  },[data] )
  const handleChange = useCallback(
    (e, item) => {
      if (e.target.checked) {
        assignBundleId({
          variables: {
            bundleId: item._id,
          },
        });
        setUserInfo({...userInfo});
        //tutaj jest błąd, muszę zwrócić obiekt a potem dopiero zrwócić tablicę z nową wartością 
      }
      if (!e.target.checked) {
        deleteBundleId({
          variables: {
            bundleId: item._id,
          },
        });
        setUserInfo(userInfo.filter((itemNew) => itemNew !== item))
      }
    },
    [assignBundleId, deleteBundleId]
  );
  const handleFilter = (e) => {
    const filteredData = data?.tagBundleMany.map((item) => {
      let name = item.name.toLowerCase();
      let value = e.target.value.toLowerCase();
      if(name.includes(value)) {
        return item
      }
    }).filter((item) => item !== undefined)
    setRender(filteredData)
    return console.log(filteredData)
  };
  if (loading)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
  // console.log(data?.tagBundleMany);
  // console.log(dataUser?.getProfile.oauthId);
  console.log(userInfo)
  return (
    <Container>
      <h2>Witaj, {userInfo?.oauthId} !</h2>
      <Input style={{ marginTop: "5rem" }} onChange={handleFilter} />
      <h5>Find bundle</h5>
      <Grid container style={{ margin: "3rem 0" }}>
        {dataUser
          ? render?.map((item) => {
              let checked = userInfo.find(
                (bundle) => bundle._id === item._id
              );
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item._id}
                  container
                  alignItems="flex-start"
                  style={{ marginBottom: "0.6rem" }}
                >
                  <Switch
                    defaultChecked={checked !== undefined ? true : false}
                    onChange={(e) => ((item) => handleChange(e, item))(item)}
                    id={item._id}
                  />
                  <Stack>
                    <h3 style={{ margin: "0.3rem" }}>{item.name}</h3>
                    <p
                      style={{
                        padding: "0.3rem",
                        borderLeft: "1px solid #2e2e2e",
                      }}
                    >
                      {item.description}
                    </p>
                  </Stack>
                </Grid>
              );
            })
          : null}
      </Grid>
    </Container>
  );
};
