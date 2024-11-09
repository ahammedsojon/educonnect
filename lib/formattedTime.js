const formattedTime = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-us", options).format(date);
};

export default formattedTime;
