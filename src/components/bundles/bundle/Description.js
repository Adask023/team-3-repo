// /* eslint-disable */
import { gql, useMutation } from "@apollo/client";
import { Button, CardActions, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";

import UserInfoContext from "../../../context/UserInfoContext";
import { UPDATE_DESCRIPTION } from "../../../mutations/Bundle-page/UpdateDescription";

// const UPDATE_DESCRIPTION = gql`
//   mutation updateDescription(
//     $id: MongoID!
//     $record: UpdateByIdTagBundleInput!
//   ) {
//     tagBundleUpdateById(_id: $id, record: $record) {
//       recordId
//     }
//   }
// `;

function Description({ _id, creatorId, description }) {
  const [descriptionToChange, setDescriptionToChange] = useState(description);
  const { userInfo } = useContext(UserInfoContext);

  const [updateDescription] = useMutation(UPDATE_DESCRIPTION, {
    variables: { record: { description: "To jest nowe description" } },
  });

  const userId = userInfo._id;
  const initDesc = description;

  const handleDescriptionChange = () => {
    updateDescription({
      variables: {
        id: _id,
        record: { description: descriptionToChange },
      },
      refetchQueries: ["getBundle"],
    });
    alert("Description updated");
  };

  // console.log(descriptionToChange);

  return (
    <div>
      {/* <p>Bundle ID: {_id}</p> */}
      {/* <p>UserId: {userId}</p>
      <p>CreatorId: {creatorId}</p> */}
      {userId == creatorId ? (
        <Typography variant="caption" color="green">
          You are the owner of that bundle
        </Typography>
      ) : (
        ""
      )}
      {/* <p>description: {description}</p> */}

      {userId == creatorId ? (
        <>
          <TextField
            multiline
            fullWidth
            rows={6}
            rowsMax={10}
            value={descriptionToChange}
            onChange={(e) => setDescriptionToChange(e.target.value)}
          />
          <br />

          {descriptionToChange !== initDesc ? (
            <CardActions>
              <Button variant="contained" onClick={handleDescriptionChange}>
                Update
              </Button>
            </CardActions>
          ) : null}
        </>
      ) : (
        <div>{description}</div>
      )}
    </div>
  );
}
{
  /* <TextField
  placeholder="MultiLine with rows: 2 and rowsMax: 4"
  multiline
  rows={2}
  rowsMax={4}
/>; */
}

export default Description;
