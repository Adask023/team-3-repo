import { gql } from "@apollo/client";
import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
          <button onClick={() => setPopUpActive(true)}>ADD NEW BUNDLE</button>
        )}

        {isPopUpActive && <AddBundlePopUp setPopUpActive={setPopUpActive} />}
      </div>
      <h1>Bundles list:</h1>
      <Grid container style={{ margin: "3rem 0" }}>
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
              <Link to={`/bundle/${_id}`}>{name}</Link>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Bundles;
