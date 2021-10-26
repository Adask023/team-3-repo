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

export const SingleEntry = ({
  id,
  startTime,
  endTime,
  tagBundle,
  tagBundleOptions,
  tag,
  tagOptions,
  newEntryHandler,
}) => {
  const deleteEntryHandler = (e, id) => {
    console.log(e, id);
  };

  return (
    <Stack spacing={2} direction="row">
      <br></br>
      <TextField label="Czas rozpoczęcia" defaultValue={startTime}></TextField>
      <TextField label="Czas zakończenia" defaultValue={endTime}></TextField>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id={`tag-bundle-select-label-${id}`}>Tag Bundle</InputLabel>
        <Select
          labelId={`tag-bundle-select-label-${id}`}
          id={`tag-bundle-select-${id}`}
          label="Tag Bundle"
          value={tagBundle}
          onChange={console.log}
        >
          {tagBundleOptions?.map((option, index) => (
            <MenuItem value={option} key={index}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        id={`tag-field-${id}`}
        options={tagOptions}
        value={tag}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Tag" />}
      />
      <Button onClick={newEntryHandler}>
        <AddCircleIcon></AddCircleIcon>
      </Button>
      <Button onClick={(e, id) => deleteEntryHandler(e, id)}>
        <DeleteForeverIcon></DeleteForeverIcon>
      </Button>
    </Stack>
  );
};
