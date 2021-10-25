import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import React, { useState } from "react";

import { DateCarousel } from "../../components/DateCarousel/DateCarousel";
import { Entries } from "../../components/Entries/Entries";
import useAllEntries from "../../queries/useAllEntries";

export const Calendar = () => {
  const ee = useAllEntries();
  const [value, setValue] = useState();
  console.log(ee);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Wybierz datę"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            console.log(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <DateCarousel onChange={setValue} />
      <Entries></Entries>
    </>
  );
};
