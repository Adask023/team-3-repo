/* eslint-disable */
//FIXME:: imports
import { Button, CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useMemo, useState } from "react";
import useUpdateEntry from "../../mutations/useUpdateEntry";
import useCreateNewEntry from "../../mutations/useCreateNewEntry";
import useAllEntriesFilterByDate from "../../queries/useAllEntriesFilterByDate";
import { currentTime } from "../../utils/dateUtils";
import { MemoizedSingleEntry } from "./SingleEntry";
import { UserInfoContext } from "../../context/UserInfoContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StopIcon from "@mui/icons-material/Stop";

export const Entries = ({ date }) => {
  const { data, loading } = useAllEntriesFilterByDate(date);
  const [addEntry] = useCreateNewEntry();
  const [updateEntry] = useUpdateEntry();
  const [entries, setEntries] = useState(data);
  const { userInfo } = useContext(UserInfoContext);

  const orderNoArray = useMemo(() => {
    if (!entries) return [0];
    if (entries.length === 0) return [0];
    return entries.map((e) => e.order);
  }, [entries]);

  const minOrderNo = orderNoArray[0];
  const maxOrderNo = orderNoArray[orderNoArray.length - 1];

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((e1, e2) => e1.order - e2.order);
      setEntries(sorted);
    }
  }, [data]);

  const getTagBundleOptions = () => {
    const tagBundles = userInfo.tagBundles;
    if (!tagBundles) return [];
    return tagBundles.map((tb) => tb.name);
  };

  const addNewEntry = (e, order, startTime) => {
    let orderNo = 0;
    if (order === undefined) {
      entries.length > 0 ? (orderNo = minOrderNo - 1) : (orderNo = 0);
    } else if (maxOrderNo > order) {
      orderNo = order + 1;
      let entriesToUpdate = entriesAfterOrderNo(orderNo);
      entriesToUpdate = incrementEntryOrders(entriesToUpdate);
      entriesToUpdate.forEach((entry) => {
        let { entryId, ...rest } = entry;
        updateEntry({
          variables: { entryId: entryId, record: rest },
        });
      });
    } else {
      orderNo = maxOrderNo + 1;
    }
    let time = startTime;
    if (!startTime) time = currentTime();
    addEntry({
      variables: {
        record: { startTime: time, date: date, order: orderNo },
      },
    });
  };

  const entriesAfterOrderNo = (order) => {
    return entries.filter((e) => e.order >= order);
  };

  const incrementEntryOrders = (entryArr) => {
    return entryArr.map((entry) => {
      return {
        ...entry,
        order: entry.order + 1,
      };
    });
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
    <Box sx={{ pt: 5, display: "flex", flexDirection: "column" }}>
      {loading ? <CircularProgress /> : null}

      <Button onClick={addNewEntry}>Add new entry</Button>

      <Stack sx={{ pt: 5 }} spacing={4}>
        {entries?.map((entry) => (
          <MemoizedSingleEntry
            key={entry._id}
            entryData={entry}
            tagBundles={userInfo?.tagBundles}
            newEntryHandler={addNewEntry}
          />
        ))}
      </Stack>
      <Stack
        direction="row"
        sx={{
          position: "fixed",
          bottom: "10%",
          right: "10%",
          backgroundColor: "white",
          borderRadius: "1em",
          border: "1px solid lightgray",
        }}
      >
        <Button>
          <StopIcon />
        </Button>
        <Button>
          <ContentCopyIcon />
        </Button>
      </Stack>
    </Box>
  );
};
