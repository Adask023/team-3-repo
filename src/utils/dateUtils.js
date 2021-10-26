export const formatDate = (date) => {
  return date.toISOString().replace(/T(.*)/, "T00:00:00.000Z");
};
