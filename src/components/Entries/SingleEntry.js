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
import { useRef, useState } from "react";

import useDeleteEntry from "../../mutations/useDeleteEntry";
import useUpdateEntry from "../../mutations/useUpdateEntry";
import { currentTime } from "../../utils/dateUtils";
import React from "react";
import { Form, Formik } from "formik";
import { singleEntrySchema } from "../../schemas/singleEntrySchema";

const SingleEntry = ({ entryData, tagBundles, newEntryHandler }) => {
  const initialValues = {
    startTime: entryData.startTime,
    endTime: entryData.endTime ? entryData.endTime : "",
    tagBundleName: entryData.tag ? entryData.tag.tagBundle.name : "",
    tagName: entryData.tag ? entryData.tag.name : "",
  };
  const formRef = useRef();

  const [endTime, setEndTime] = useState("");
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
    const record = { ...formData };
    if (!(formData.tagBundleName && formData.tagName)) {
      record.tagBundleName = null;
      record.tagName = null;
    }
    updateEntry({
      variables: { entryId: entryData._id, record: record },
    });
  };

  const handleAddNewEntry = () => {
    const entryValObj = formRef.current.values;
    if (entryValObj.endTime === "") {
      entryValObj.endTime = currentTime();
    }
    const _id = entryData._id;
    newEntryHandler(null, entryData.order, entryValObj.endTime, {
      _id,
      ...entryValObj,
    });
  };

  return (
    <Formik
      validationSchema={singleEntrySchema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      isInitialValid={false}
      innerRef={formRef}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
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
          <Form onBlur={handleSubmit}>
            <Stack
              p={2}
              spacing={2}
              direction="row"
              sx={{ border: "1px solid #cacaca", borderRadius: "1em" }}
            >
              <TextField
                type="text"
                label="Czas rozpocz??cia"
                name="startTime"
                onChange={handleChange}
                value={values.startTime}
              />
              <TextField
                type="text"
                label="Czas zako??czenia"
                name="endTime"
                onChange={(e) => {
                  handleChange(e);
                  setEndTime(e.target.value);
                }}
                value={values.endTime}
              />
              <FormControl sx={{ minWidth: 150, maxWidth: 150 }}>
                <InputLabel>Tag Bundle</InputLabel>
                <Select
                  label="Tag Bundle"
                  name="tagBundleName"
                  onChange={handleChange}
                  value={values.tagBundleName}
                >
                  <MenuItem value="">Brak</MenuItem>
                  {tagBundles?.map(({ name }, index) => (
                    <MenuItem value={name} key={index} name="tagBundleName">
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Autocomplete
                disablePortal
                freeSolo
                options={
                  values.tagBundleName
                    ? tagBundles
                        ?.find((tB) => tB.name === values.tagBundleName)
                        ?.tags.map((t) => t.name) || []
                    : []
                }
                sx={{ width: 300 }}
                name="tagName"
                disabled={values.tagBundleName === ""}
                value={values.tagName}
                onInputChange={(e, v) => handleAutocompleteChange(e, v)}
                renderInput={(params) => <TextField {...params} label="Tag" />}
              />
              <Button onClick={handleAddNewEntry} name="add">
                <AddCircleIcon />
              </Button>
              <Button onClick={deleteEntryHandler}>
                <DeleteForeverIcon />
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export const MemoizedSingleEntry = React.memo(SingleEntry);
