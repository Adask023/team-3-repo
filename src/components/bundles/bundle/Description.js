/* eslint-disable */ 
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const UPDATE_DESCRIPTION = gql`
  mutation updateDescription(
    $id: MongoID!
    $record: UpdateByIdTagBundleInput!
  ) {
    tagBundleUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

function Description({ _id, creatorId, description }) {
  const [descriptionToChange, setDescriptionToChange] = useState(description);
  // { description: "To jest nowe descrtion" }

  const [updateDescription] = useMutation(UPDATE_DESCRIPTION, {
    variables: { description: "To jest nowe description" },
  });
  
  const userId = "61671921b7efc009eaf79450";

  const handleDescriptionChange = () => {
    console.log('updated')
    updateDescription({
      variables: {
        id: _id,
        record: {description: descriptionToChange},
      },
    });
  };

  return (
    <div>
      <p>Bundle ID: {_id}</p>
      <p>UserId: {userId}</p>
      <p>CreatorId: {creatorId}</p>
      <p>description: {description}</p>
      <textarea
        value={descriptionToChange}
        onChange={(e) => setDescriptionToChange(e.target.value)}
      />

      <button onClick={handleDescriptionChange}>Update</button>
    </div>
  );
}

export default Description;
