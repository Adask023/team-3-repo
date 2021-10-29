import { useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Container,
  // FormControl,
  // FormHelperText,
  // Input,
  // InputLabel,
  TextField,
} from "@mui/material";
// import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

import { ADD_BUNDLE } from "../../../queries/Bundle-page/AddBundle";

const styles = {
  wrapper: {
    zIndex: "999",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(2px)",
  },
};

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
          alert("Bundle added");
          setPopUpActive(false);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      alert("fill both inputs before submitting");
    }
  };

  return (
    <div style={styles.wrapper}>
      <Container align="center" sx={{ width: "60%" }}>
        {/* <Formik
          initialValues={{
            bundleName: "",
            description: "",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Form>
            <TextField
              id="bundleName"
              fullWidth
              label="Bundle name"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              id="description"
              fullWidth
              label="description"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
              sx={{ width: "60%" }}
              style={{ marginBottom: "0.8rem" }}
              type="submit"
            >
              Add
            </Button>
          </Form>
        </Formik> */}
        <div></div>
        <form
          style={{
            padding: "2rem",
            backgroundColor: "white",
            border: "2px solid rgba(0, 0, 0, 0.05)",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
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
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />

          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            sx={{ width: "60%" }}
            style={{ marginBottom: "0.8rem" }}
            type="submit"
          >
            Add
          </Button>
          <Button
            sx={{ width: "60%" }}
            variant="outlined"
            color="error"
            onClick={() => setPopUpActive(false)}
          >
            Close
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AddBundlePopUp;
