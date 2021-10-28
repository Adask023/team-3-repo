import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

import useDeleteEntry from "../../mutations/useDeleteEntry";
import useUpdateEntry from "../../mutations/useUpdateEntry";
import { currentTime } from "../../utils/dateUtils";
import React from "react";
import { Form, Formik } from "formik";
import { singleEntrySchema } from "../../schemas/singleEntrySchema";

const SingleEntry = ({ entryData, tagBundleOptions, newEntryHandler }) => {
  const initialValues = {
    startTime: entryData.startTime,
    endTime: entryData.endTime ? entryData.endTime : "",
    tagBundleName: entryData.tag ? entryData.tag.tagBundle.name : "",
    tagName: entryData.tag ? entryData.tag.name : "",
  };
  const [entryValues, setEntryValues] = useState(initialValues);
  const [deleteEntry] = useDeleteEntry();
  const [updateEntry] = useUpdateEntry();

  const deleteEntryHandler = () => {
    deleteEntry({
      variables: {
        entryId: entryData._id,
      },
    });
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    const currentEntryEndTime = currentTime();
    let newEntryStartTime;
    const entryValObj = { ...formData };
    if (entryValObj.endTime === "") {
      entryValObj.endTime = currentEntryEndTime;
    }
    newEntryStartTime = entryValObj.endTime;
    setEntryValues(entryValObj);
    updateEntry({
      variables: { entryId: entryData._id, record: entryValObj },
    });
    newEntryHandler(null, entryData.order, newEntryStartTime);
  };

  return (
    <Formik
      validationSchema={singleEntrySchema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      isInitialValid={false}
    >
      {({
        handleChange,
        handleBlur,
        setValues,
        values,
        touched,
        isValid,
        errors,
      }) => {
        const handleAutocompleteChange = (e, v) => {
          setValues({ ...values, tagName: v });
        };
        return (
          <Form>
            <Stack
              p={2}
              spacing={2}
              direction="row"
              sx={{ border: "1px solid #cacaca", borderRadius: "1em" }}
            >
              <TextField
                type="text"
                label="Czas rozpoczęcia"
                name="startTime"
                onChange={handleChange}
                value={values.startTime}
              ></TextField>
              <TextField
                type="text"
                label="Czas zakończenia"
                name="endTime"
                onChange={handleChange}
                value={
                  values.endTime === "" ? entryValues.endTime : values.endTime
                }
              ></TextField>
              <FormControl sx={{ minWidth: 150, maxWidth: 150 }}>
                <InputLabel>Tag Bundle</InputLabel>
                <Select
                  label="Tag Bundle"
                  name="tagBundleName"
                  onChange={handleChange}
                  value={values.tagBundleName}
                >
                  <MenuItem value="">Brak</MenuItem>
                  {tagBundleOptions?.map((name, index) => (
                    <MenuItem value={name} key={index} name="tagBundleName">
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Autocomplete
                freeSolo
                disablePortal
                options={["tagOptions"]}
                sx={{ width: 300 }}
                name="tagName"
                disabled={values.tagBundleName === ""}
                value={values.tagName}
                onInputChange={(e, v) => handleAutocompleteChange(e, v)}
                renderInput={(params) => <TextField {...params} label="Tag" />}
              />
              <Button type="submit" disabled={false}>
                <AddCircleIcon></AddCircleIcon>
              </Button>
              <Button onClick={deleteEntryHandler}>
                <DeleteForeverIcon></DeleteForeverIcon>
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export const MemoizedSingleEntry = React.memo(SingleEntry);
