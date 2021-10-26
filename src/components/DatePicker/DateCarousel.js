/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

export const DateCarousel = ({ onDateChange, dateValue }) => {
  const now = useMemo(() => new Date(), []);
  const [value, setValue] = useState(now);

  useEffect(() => {
    console.log("received date from parent");
    if (dateValue) setValue(dateValue);
  }, [dateValue]);

  const handleDayChange = (e, val) => {
    if (val < 0) changeDate(val);
    else if (!isMaxDate()) {
      changeDate(val);
    }
  };

  const changeDate = (val) => {
    const dateNew = new Date(value);
    dateNew.setDate(dateNew.getDate() + val);
    setValue(new Date(dateNew));
    if (onDateChange) {
      onDateChange(dateNew);
    }
  };

  const isMaxDate = () => {
    if (value <= now) {
      return value.getDate() === now.getDate();
    }
    return false;
  };

  return (
    <>
      <Button onClick={(e) => handleDayChange(e, -1)}>Prev</Button>
      {value.toLocaleString()}
      <Button onClick={(e) => handleDayChange(e, 1)}>Next</Button>
    </>
  );
};
