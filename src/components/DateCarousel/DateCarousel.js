/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const now = new Date();

export const DateCarousel = ({ onChange }) => {
    const [dateValue, setDateValue] = useState(now);

  useEffect(() => {
      console.log(dateValue);
      onChange(dateValue);
  }, [dateValue]);

  const dayBack = () => {
    const date = dateValue.setDate(dateValue.getDate() - 1);
    setDateValue(new Date(date));
  };

    const dayNext = () => {
    if (dateValue.getDate() < now.getDate()) {
      const date = dateValue.setDate(dateValue.getDate() + 1);
      setDateValue(new Date(date));
    }
  };

  const getDay = (date) => {
    return new Date(date).getDay();
  };

  return (
    <>
      <Button onClick={dayBack}>Prev</Button>
      {dateValue.toLocaleString()}
      <Button onClick={dayNext}>Next</Button>
    </>
  );
};
