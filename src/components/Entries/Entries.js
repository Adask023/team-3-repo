/* eslint-disable */
//FIXME:: imports
import { Button, CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import useCreateNewEntry from "../../mutations/useCreateNewEntry";
import useAllEntriesFilterByDate from "../../queries/useAllEntriesFilterByDate";
import { zeroPad } from "../../utils/dateUtils";
import { MemoizedSingleEntry } from "./SingleEntry";
import React, { useContext, useEffect, useState } from "react";
import UserInfoContext from "../../context/UserInfoContext";

export const Entries = ({ date }) => {
  const { data, loading } = useAllEntriesFilterByDate(date);
  const [addEntry] = useCreateNewEntry();
  const [entries, setEntries] = useState(data);
  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    console.log(userInfo);
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
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ pt: 5, display: "flex" }}>
      {entries?.length === 0 ? (
        <Button onClick={addNewEntry}>Add new entry</Button>
      ) : null}
      <Stack spacing={4}>
        {entries?.map((e) => (
          <MemoizedSingleEntry
            key={e._id}
            id={e._id}
            startTime={e.startTime}
            endTime={e.endTime}
            tagBundle={"bundle"}
            tagBundleOptions={userInfo.tagBundles}
            tag={"tag"}
            tagOptions={["tag", "b", "c"]}
            newEntryHandler={addNewEntry}
          />
        ))}
      </Stack>
    </Box>
  );
};
