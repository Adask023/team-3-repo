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

const SingleEntry = ({ entryData, tagBundleOptions, newEntryHandler }) => {
  const initialValues = {
    startTime: entryData.startTime,
    endTime: entryData.endTime,
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

  const handleChange = (e) => {
    const obj = {};
    obj[e.target.name] = e.target.value;
    setEntryValues({ ...entryValues, ...obj });
  };

  const handleSubmit = (e) => {
    const currentEntryEndTime = currentTime();
    let newEntryStartTime;
    const entryValObj = { ...entryValues };
    if (!entryValues.endTime) {
      entryValObj.endTime = currentEntryEndTime;
    }
    newEntryStartTime = entryValObj.endTime;
    setEntryValues(entryValObj);
    updateEntry({
      variables: { entryId: entryData._id, record: entryValObj },
    });
    newEntryHandler(e, entryData.order, newEntryStartTime);
  };

  return (
    <Stack
      p={2}
      spacing={2}
      direction="row"
      sx={{ border: "1px solid #cacaca", borderRadius: "1em" }}
    >
      <br></br>
      <TextField
        label="Czas rozpoczęcia"
        value={entryValues.startTime}
        name={"startTime"}
        onChange={handleChange}
      ></TextField>
      <TextField
        label="Czas zakończenia"
        value={entryValues.endTime}
        name={"endTime"}
        onChange={handleChange}
      ></TextField>
      <FormControl sx={{ minWidth: 150, maxWidth: 150 }}>
        <InputLabel id={`tag-bundle-select-label-${entryData._id}`}>
          Tag Bundle
        </InputLabel>
        <Select
          labelId={`tag-bundle-select-label-${entryData._id}`}
          id={`tag-bundle-select-${entryData._id}`}
          label="Tag Bundle"
          name={"tagBundle"}
          value={entryValues.tagBundleName}
          onChange={(e) => console.log(e.target.value)}
        >
          <MenuItem value="">Brak</MenuItem>
          {tagBundleOptions?.map((name, index) => (
            <MenuItem value={name} key={index}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        freeSolo
        disablePortal
        id={`tag-field-${entryData._id}`}
        options={["tagOptions"]}
        onInput={(e) => console.log(e.target.value)}
        name={"tag"}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Tag" />}
      />
      <Button onClick={handleSubmit}>
        <AddCircleIcon></AddCircleIcon>
      </Button>
      <Button onClick={deleteEntryHandler}>
        <DeleteForeverIcon></DeleteForeverIcon>
      </Button>
    </Stack>
  );
};

export const MemoizedSingleEntry = React.memo(SingleEntry);
