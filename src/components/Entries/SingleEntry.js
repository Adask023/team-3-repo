/*eslint-disable*/
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
import { update } from "lodash";
import { useEffect, useState } from "react";

import useDeleteEntry from "../../mutations/useDeleteEntry";
import useUpdateEntry from "../../mutations/useUpdateEntry";
import { currentTime } from "../../utils/dateUtils";
import React from "react";

const SingleEntry = ({
  id,
  startTime = "",
  endTime = "",
  tagBundle = "",
  tagBundleOptions,
  tag = "",
  tagOptions,
  order,
  newEntryHandler,
}) => {
  const initialValues = {
    startTime: startTime,
    endTime: endTime,
  };
  const [entryValues, setEntryValues] = useState(initialValues);
  const [deleteEntry] = useDeleteEntry();
  const [updateEntry] = useUpdateEntry();

  const deleteEntryHandler = () => {
    deleteEntry({
      variables: {
        entryId: id,
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
      variables: { entryId: id, record: entryValObj },
    });
    newEntryHandler(e, order, newEntryStartTime);
  };

  return (
    <Stack spacing={2} direction="row">
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
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id={`tag-bundle-select-label-${id}`}>Tag Bundle</InputLabel>
        <Select
          labelId={`tag-bundle-select-label-${id}`}
          id={`tag-bundle-select-${id}`}
          label="Tag Bundle"
          value={entryValues.tagBundle}
          name={"tagBundle"}
        >
          {tagBundleOptions?.map(({ description, _id }) => (
            <MenuItem value={description} key={_id}>
              {description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        id={`tag-field-${id}`}
        options={tagOptions}
        inputValue={entryValues.tag}
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
