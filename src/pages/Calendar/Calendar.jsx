import React from "react";

import useAllEntries from "../../queries/useAllEntries";

export const Calendar = () => {
  const ee = useAllEntries();
  console.log(ee);
  return <>CALENDAR</>;
};
