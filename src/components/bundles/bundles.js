import { gql } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import useAllBundles from "../../queries/useAllBundles";
import AddBundlePopUp from "./bundle/AddBundlePopUp";

const GET_ALL_BUNDLES = gql`
  query GetAllBundles {
    tagBundleMany {
      _id
      name
      creatorId
    }
  }
`;

const Bundles = () => {
  const { data, loading, error } = useAllBundles(GET_ALL_BUNDLES);
  const [isPopUpActive, setPopUpActive] = useState(false);
  // const [userId, setUserId] = useState("61671921b7efc009eaf79450");
  // console.log(data);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  // example data structure singleBundle._id
  return (
    <Container>
      <div>
        {!isPopUpActive && (
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            onClick={() => setPopUpActive(true)}
          >
            Add Bundle
          </Button>
        )}

        {isPopUpActive && <AddBundlePopUp setPopUpActive={setPopUpActive} />}
      </div>
      <Typography
        style={{ marginTop: "2rem" }}
        variant="h4"
        color="textPrimary"
        align="center"
      >
        Bundles list
      </Typography>
      <Grid container spacing={1} style={{ margin: "3rem 0" }}>
        {data.tagBundleMany.map(({ _id, name }) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={_id}
              container
              alignItems="center"
              justifyContent="center"
              style={{ marginBottom: "0.6rem" }}
            >
              <Button
                style={{ minWidth: "100%", minHeight: "100%" }}
                size="big"
                component={RouterLink}
                to={`/bundle/${_id}`}
              >
                {name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Bundles;
