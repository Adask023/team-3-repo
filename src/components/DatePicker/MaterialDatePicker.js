import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import React from "react";

export const MaterialDatePicker = ({ onDateChange, dateValue = null }) => {
  const [value, setValue] = useState();
  const handleChange = (newValue) => {
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue);
    }
  };
  useEffect(() => {
    setValue(dateValue);
  }, [dateValue]);
  return (
    <Box
      sx={{
        m: 1,
      }}
    >
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
    </Box>
  );
};
