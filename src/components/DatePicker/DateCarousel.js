import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";

import { isDateEqualYMD } from "../../utils/dateUtils";
import { MaterialDatePicker } from "./MaterialDatePicker";

export const DateCarousel = ({ onDateChange, dateValue }) => {
  const [value, setValue] = useState(dateValue);
  const [nextDisabled, setNextDisabled] = useState(false);

  const isMaxDate = useCallback(() => {
    return isDateEqualYMD(new Date(), value);
  }, [value]);

  const changeDate = (val) => {
    const dateNew = new Date(value);
    dateNew.setDate(dateNew.getDate() + val);
    setValue(new Date(dateNew));
    if (onDateChange) {
      onDateChange(dateNew);
    }
  };
  useEffect(() => {
    if (dateValue) setValue(dateValue);
    setNextDisabled(isMaxDate());
  }, [dateValue, isMaxDate]);

  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        display: "flex",
        width: "fit-content",
        border: "1px solid #cacaca",
        borderRadius: "1em",
      }}
    >
      <Button onClick={() => changeDate(-1)}>Prev</Button>
      <MaterialDatePicker
        onDateChange={(newDate) => onDateChange(newDate)}
        dateValue={dateValue}
        maxDate={new Date()}
      />
      <Button onClick={() => changeDate(1)} disabled={nextDisabled}>
        Next
      </Button>
    </Box>
  );
};
