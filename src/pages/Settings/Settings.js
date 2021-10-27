import { gql, useMutation, useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import React, { useContext } from "react";
import UserInfoContext from "../../context/UserInfoContext";

export const Settings = () => {
  const GET_ALL_ENTRIES = gql`
    query GetAllEntries {
      tagBundleMany {
        _id
        name
        description
        creatorId
      }
    }
  `;
  const SHOW_USER_BUNDLES = gql`
    query ShowProfile {
      getProfile {
        oauthId
        tagBundles {
          _id
          name
          description
        }
      }
    }
  `;
  const ADD_USERS_BUNDLE = gql`
    mutation assignFilteredBundle($bundleId: ID) {
      assignBundleId(bundleId: $bundleId) {
        tagBundles {
          name
        }
      }
    }
  `;
  const DELETE_USER_BUNDLE = gql`
    mutation UnassignFilteredBundle($bundleId: ID) {
      unassignBundleId(bundleId: $bundleId) {
        tagBundles {
          name
        }
      }
    }
  `;
  const { data } = useQuery(GET_ALL_ENTRIES);
  const { data: dataUser } = useQuery(SHOW_USER_BUNDLES);
  const [assignBundleId] = useMutation(ADD_USERS_BUNDLE);
  const [deleteBundleId] = useMutation(DELETE_USER_BUNDLE);
  const { userInfo } = useContext(UserInfoContext);
  // if (error) return <div className="">Error: </div>;
  // if (loading) return <div className="">Loading...</div>;
  const handleChange = (e, item) => {
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
  };
  const handleFilter = (e) => {
    console.log(e.target.value);
    data?.tagBundleMany.map((item) => {
      let newItem = [...item.name]
      return console.log(newItem);
    });
  };
  // aktywny filtr wyszukiwania?
  // podzielić je na jakieś grupy?
  // Alfabetycznie pogrupować?
  console.log(data?.tagBundleMany);
  console.log(dataUser?.getProfile.oauthId);
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
