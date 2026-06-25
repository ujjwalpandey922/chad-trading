export const formatTime = (unixTime: number) => {
  const date = new Date(unixTime * 1000);

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};
