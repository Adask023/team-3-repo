import { useMutation, useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/system";
import React, { useCallback, useContext } from "react";
import UserInfoContext from "../../context/UserInfoContext";
import {
  ADD_USERS_BUNDLE,
  DELETE_USER_BUNDLE,
  GET_ALL_ENTRIES,
  SHOW_USER_BUNDLES,
} from "../../queries/SettingsQueries";

export const Settings = () => {
  const { data, loading } = useQuery(GET_ALL_ENTRIES);
  const { data: dataUser } = useQuery(SHOW_USER_BUNDLES);
  const [assignBundleId] = useMutation(ADD_USERS_BUNDLE);
  const [deleteBundleId] = useMutation(DELETE_USER_BUNDLE);
  const { userInfo } = useContext(UserInfoContext);

  const handleChange = useCallback(
    (e, item) => {
      if (e.target.checked) {
        assignBundleId({
          variables: {
            bundleId: item._id,
          },
        });
      }
      if (!e.target.checked) {
        deleteBundleId({
          variables: {
            bundleId: item._id,
          },
        });
      }
    },
    [assignBundleId, deleteBundleId]
  );

  const handleFilter = useCallback(
    (e) => {
      console.log(e.target.value);
      data?.tagBundleMany.map((item) => {
        let newItem = [...item.name];
        return console.log(newItem);
      });
    },
    [data?.tagBundleMany]
  );

  // aktywny filtr wyszukiwania?
  // podzielić je na jakieś grupy?
  // Alfabetycznie pogrupować?
  console.log(data?.tagBundleMany);
  console.log(dataUser?.getProfile.oauthId);

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

  return (
    <Container>
      <h2>{userInfo?.oauthId}</h2>
      <Input style={{ marginTop: "5rem" }} onChange={handleFilter} />
      <h5>Find bundle</h5>
      <Grid container style={{ margin: "3rem 0" }}>
        {dataUser
          ? data?.tagBundleMany.map((item) => {
              let checked = dataUser?.getProfile.tagBundles.find(
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
