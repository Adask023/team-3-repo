/*eslint-disable*/
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { isDateEqualYMD } from "../../utils/dateUtils";

import { MaterialDatePicker } from "./MaterialDatePicker";

export const DateCarousel = ({ onDateChange, dateValue }) => {
  const now = useMemo(() => new Date(), []);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [value, setValue] = useState(dateValue);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    if (dateValue) setValue(dateValue);
    setNextDisabled(isMaxDate());
  }, [dateValue]);

  const handleDayChange = (e, val) => {
    changeDate(val);
  };

  const isMaxDate = () => {
    return isDateEqualYMD(now, value);
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
        width: "fit-content",
      }}
    >
      <Button onClick={(e) => handleDayChange(e, -1)}>Prev</Button>
      <MaterialDatePicker
        onDateChange={(newDate) => onDateChange(newDate)}
        dateValue={dateValue}
      />
      <Button onClick={(e) => handleDayChange(e, 1)} disabled={nextDisabled}>
        Next
      </Button>
    </Box>
  );
};
