/*eslint-disable*/
import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { GET_BUNDLE_BY_ID } from "../../../queries/Bundle-page/GetBundleById";
import BundleTagsPagination from "./BundleTagsPagination";
import Description from "./Description";

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
      <Button variant="outlined" color="error" component={Link} to="/bundle">
        back
      </Button>
      <Grid container sx={{ marginTop: "2rem" }}>
        <Grid item xs={6} alignItems="center" justifyContent="center">
          <Card sx={{ maxWidth: "80%", padding: "1rem" }}>
            <Typography gutterBottom variant="h4" component="div">
              {name}
            </Typography>
            {/* <br />
          bundle id: {_id}
          <br />
          Creator id: {creatorId}
          <br /> */}
            <Typography variant="body1" color="text.secondary">
              <Description
                _id={_id}
                creatorId={creatorId}
                description={description}
              />
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6} alignItems="center" justifyContent="center">
          <BundleTagsPagination _id={_id} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default BundleItem;
