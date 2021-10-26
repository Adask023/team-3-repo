/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { DateCarousel } from "../../components/DatePicker/DateCarousel";
import { MaterialDatePicker } from "../../components/DatePicker/MaterialDatePicker";
import { Entries } from "../../components/Entries/Entries";
import useAllEntries from "../../queries/useAllEntries";

const now = new Date();
export const Calendar = () => {
  const ee = useAllEntries();
  const [date, setDate] = useState(now);
  const handleDateChange = (date) => {
    setDate(date);
    console.log("date from child mui");
  };
  console.log(ee);
  return (
    <>
      <MaterialDatePicker
        onDateChange={(newDate) => handleDateChange(newDate)}
        dateValue={date}
      />
      <DateCarousel
        onDateChange={(newDate) => handleDateChange(newDate)}
        dateValue={date}
      />
      <Entries></Entries>
    </>
  );
};
