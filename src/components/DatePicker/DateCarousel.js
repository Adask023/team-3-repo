/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";



export const DateCarousel = () => {
  const now = useMemo(() => new Date(),[]);
  const [value, setValue] = useState(now);

  const dayBack = () => {
    const date = value.setDate(value.getDate() - 1);
    setValue(new Date(date));
  };

  const dayNext = () => {
    console.log(value.getDate() , now.getDate());
    if (value.getDate() < now.getDate()) {
      const date = value.setDate(value.getDate() + 1);
      setValue(new Date(date));
    }
  };

  return (
    <>
      <Button onClick={dayBack}>Prev</Button>
      {value.toLocaleString()}
      <Button onClick={dayNext}>Next</Button>
    </>
  );
};
