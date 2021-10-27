export const formatDate = (date) => {
  return date.toISOString().replace(/T(.*)/, "T00:00:00.000Z");
};

export const zeroPad = (num, places) => String(num).padStart(places, "0");
