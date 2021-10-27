import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const ADD_BUNDLE = gql`
  mutation createClient($record: CreateOneTagBundleInput!) {
    tagBundleCreateOne(record: $record) {
      recordId
    }
  }
`;

function AddBundlePopUp({ setPopUpActive }) {
  const [createClient] = useMutation(ADD_BUNDLE);
  const [inputText, setInputText] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText.length > 0 && inputDescription.length > 0) {
      createClient({
        variables: {
          record: { name: inputText, description: inputDescription },
        },
      });

      setInputText("");
      setInputDescription("");
    } else {
      alert("fill both inputs before submitting");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <br />
        <br />
        <textarea
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </form>
      <button onClick={() => setPopUpActive(false)}>Close</button>
    </div>
  );
}

export default AddBundlePopUp;
