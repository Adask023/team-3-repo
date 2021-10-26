import { Button, CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

import useAllEntriesFilterByDate from "../../queries/useAllEntriesFilterByDate";
import { SingleEntry } from "./SingleEntry";

export const Entries = ({ date }) => {
  const { data, loading } = useAllEntriesFilterByDate(date);
  const [entries, setEntries] = useState(data);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.log(data);
    setEntries(data);
    setEditMode(false);
  }, [data]);

  const addNewEntry = () => {
    if (!editMode) {
      const entryList = [...entries, {}];
      setEntries(entryList);
      setEditMode(true);
    }
  };

  return (
    <Box sx={{ pt: 5, display: "flex" }}>
      {loading ? <CircularProgress /> : null}
      {entries?.length === 0 ? (
        <Button onClick={addNewEntry}>Add new entry</Button>
      ) : null}
      <Stack spacing={4}>
        {entries?.map((e) => (
          <SingleEntry
            key={e._id}
            id={e._id}
            startTime={e.startTime}
            endTime={e.endTime}
            tagBundle={"bundle"}
            tagBundleOptions={["bundle", "b", "c"]}
            tag={"tag"}
            tagOptions={["tag", "b", "c"]}
            newEntryHandler={addNewEntry}
          ></SingleEntry>
        ))}
      </Stack>
    </Box>
  );
};
