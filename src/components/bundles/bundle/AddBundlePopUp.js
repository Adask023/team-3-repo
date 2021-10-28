import { gql, useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
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
        refetchQueries: ["GetAllBundles"],
      })
        .then(() => {
          setInputText("");
          setInputDescription("");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("fill both inputs before submitting");
    }
  };

  return (
    <div>
      <Container align="center" sx={{ width: "60%" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            fullWidth
            label="Bundle name"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />

          <TextField
            fullWidth
            label="Bundle description"
            multiline
            rows={4}
            maxRows={6}
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />

          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            sx={{ width: "60%" }}
            style={{ marginBottom: "0.5rem" }}
            type="submit"
          >
            Add
          </Button>
          <br />
        </form>
        <Button
          sx={{ width: "60%" }}
          variant="outlined"
          color="error"
          onClick={() => setPopUpActive(false)}
        >
          Close
        </Button>
      </Container>
    </div>
  );
}

export default AddBundlePopUp;
