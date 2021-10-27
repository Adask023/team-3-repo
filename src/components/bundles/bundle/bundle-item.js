import { gql, useQuery } from "@apollo/client";
import { Container, Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import BundleTagsPagination from "./BundleTagsPagination";
import Description from "./Description";

const GET_BUNDLE_BY_ID = gql`
  query getBundle($bundleSetId: MongoID!) {
    tagBundleById(_id: $bundleSetId) {
      name
      description
      creatorId
      tags {
        name
        _id
      }
    }
  }
`;

function BundleItem() {
  let { _id } = useParams();

  const { data, loading, error } = useQuery(GET_BUNDLE_BY_ID, {
    variables: { bundleSetId: _id },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const { name, description, creatorId } = data.tagBundleById;

  return (
    <Container>
      <Grid container>
        <Grid item xs={4} alignItems="center" justifyContent="center">
          <Link to="/bundle">
            <button>Back</button>
          </Link>
          <h1>{name}</h1>
          <br />
          bundle id: {_id}
          <br />
          Creator id: {creatorId}
          <br />
          <h2>Description</h2>
          <div>{description}</div>
        </Grid>
        <Grid item xs={8} alignItems="center" justifyContent="center">
          <Description
            _id={_id}
            creatorId={creatorId}
            description={description}
          />
          <br />
          <BundleTagsPagination _id={_id} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default BundleItem;
