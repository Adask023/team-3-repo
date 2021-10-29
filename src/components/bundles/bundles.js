import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import UserInfoContext from "../../context/UserInfoContext";
import useAllBundles from "../../queries/useAllBundles";
import AddBundlePopUp from "./bundle/AddBundlePopUp";

const styles = {
  addBtn: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: "999",
  },
};

const Bundles = () => {
  const { data, loading, error } = useAllBundles();
  const [isPopUpActive, setPopUpActive] = useState(false);
  const { userInfo } = useContext(UserInfoContext);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  console.log(data.tagBundleMany);
  console.log(userInfo._id);

  // const myTags = data.tagBundleMany.map(({ creatorId, _id, name }) => {
  //   if (creatorId == userInfo._id) {
  //     return (
  //       <Grid
  //         item
  //         xs={12}
  //         sm={6}
  //         md={4}
  //         key={_id}
  //         container
  //         alignItems="center"
  //         justifyContent="center"
  //         style={{ marginBottom: "0.6rem" }}
  //       >
  //         <Button
  //           style={{ minWidth: "100%", minHeight: "100%" }}
  //           size="big"
  //           component={RouterLink}
  //           to={`/bundle/${_id}`}
  //         >
  //           {name}
  //         </Button>
  //       </Grid>
  //     );
  //   }
  // });

  return (
    <Container>
      <div>
        {!isPopUpActive && (
          <Button
            style={styles.addBtn}
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
        BUNDLES LIST
      </Typography>
      <Grid container spacing={1} style={{ margin: "3rem 0" }}>
        {data.tagBundleMany.map(({ creatorId, _id, name }) => {
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
                style={creatorId === userInfo._id ? { color: "green" } : {}}
                sx={{ minWidth: "100%", minHeight: "100%" }}
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
