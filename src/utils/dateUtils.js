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
