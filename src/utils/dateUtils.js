export const formatDate = (date) => {
  return date.toISOString().replace(/T(.*)/, "T00:00:00.000Z");
};

export const zeroPad = (num, places) => String(num).padStart(places, "0");

export const currentTime = () => {
  const dateNow = new Date();
  return `${zeroPad(dateNow.getHours(), 2)}:${zeroPad(
    dateNow.getMinutes(),
    2
  )}`;
};

export const isDateEqualYMD = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getYear() === date2.getYear()
  );
};

export const getDateSkipTime = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
