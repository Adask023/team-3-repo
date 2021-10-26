import { Button, CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useCreateNewEntry from "../../mutations/useCreateNewEntry";

import useAllEntriesFilterByDate from "../../queries/useAllEntriesFilterByDate";
import { zeroPad } from "../../utils/dateUtils";
import { SingleEntry } from "./SingleEntry";

export const Entries = ({ date }) => {
  const { data, loading } = useAllEntriesFilterByDate(date);
  const [addEntry] = useCreateNewEntry();
  const [entries, setEntries] = useState(data);

  useEffect(() => {
    console.log(data);
    setEntries(data);
  }, [data]);

  const addNewEntry = () => {
    const dateNow = new Date();
    const time = `${zeroPad(dateNow.getHours(), 2)}:${zeroPad(
      dateNow.getMinutes(),
      2
    )}`;
    addEntry({ variables: { record: { startTime: time } } });
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
