import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";

import { MaterialDatePicker } from "./MaterialDatePicker";

export const DateCarousel = ({ onDateChange, dateValue }) => {
  const [value, setValue] = useState(dateValue);

  useEffect(() => {
    if (dateValue) setValue(dateValue);
  }, [dateValue]);

  const handleDayChange = (e, val) => {
    changeDate(val);
  };

  const changeDate = (val) => {
    const dateNew = new Date(value);
    dateNew.setDate(dateNew.getDate() + val);
    setValue(new Date(dateNew));
    if (onDateChange) {
      onDateChange(dateNew);
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        p: 1,
        m: 1,
        display: "flex",
      }}
    >
      <Button onClick={(e) => handleDayChange(e, -1)}>Prev</Button>
      <MaterialDatePicker
        onDateChange={(newDate) => onDateChange(newDate)}
        dateValue={dateValue}
      />
      <Button onClick={(e) => handleDayChange(e, 1)}>Next</Button>
    </Box>
  );
};
