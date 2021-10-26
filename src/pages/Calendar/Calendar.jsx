/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { DateCarousel } from "../../components/DatePicker/DateCarousel";
import { MaterialDatePicker } from "../../components/DatePicker/MaterialDatePicker";
import { Entries } from "../../components/Entries/Entries";
import { formatDate } from "../../utils/dateUtils";

const now = new Date();
export const Calendar = () => {
  const [date, setDate] = useState(now);
  const handleDateChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    console.log("hey");
  }, [date]);

  return (
    <>
      <DateCarousel
        onDateChange={(newDate) => handleDateChange(newDate)}
        dateValue={date}
      />
      <MaterialDatePicker
        onDateChange={(newDate) => handleDateChange(newDate)}
        dateValue={date}
      />
      <Entries date={formatDate(date)}></Entries>
    </>
  );
};
