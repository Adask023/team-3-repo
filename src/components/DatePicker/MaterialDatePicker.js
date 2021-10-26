/* eslint-disable react/react-in-jsx-scope */
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const MaterialDatePicker = ({ onDateChange, dateValue = null }) => {
  const [value, setValue] = useState();
  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue);
    }
  };
  useEffect(() => {
    setValue(dateValue);
  }, [dateValue]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Wybierz datę"
          value={value}
          onChange={(newValue) => handleChange(newValue)}
          allowSameDateSelection={false}
          maxDate={new Date()}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};
