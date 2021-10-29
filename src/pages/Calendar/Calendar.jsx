import React, { useCallback, useState } from "react";

import { DateCarousel } from "../../components/DatePicker/DateCarousel";
import { Entries } from "../../components/Entries/Entries";
import { formatDate } from "../../utils/dateUtils";

export const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = useCallback((date) => {
    setDate(date);
  }, []);

  return (
    <>
      <DateCarousel onDateChange={handleDateChange} dateValue={date} />

      <Entries date={formatDate(date)} />
    </>
  );
};
