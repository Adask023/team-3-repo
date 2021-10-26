import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export const DateCarousel = ({ onDateChange, dateValue }) => {
  const now = useMemo(() => new Date(), []);
  const [value, setValue] = useState(now);

  useEffect(() => {
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
    <Box
      sx={{
        border: 1,
        p: 1,
        m: 1,
        width: "fit-content",
        borderColor: "primary.main",
      }}
    >
      <Button onClick={(e) => handleDayChange(e, -1)}>Prev</Button>
      <span spacing={1}>{format(value, "d MMMM yyyy (EEEE)")}</span>
      <Button onClick={(e) => handleDayChange(e, 1)}>Next</Button>
    </Box>
  );
};
