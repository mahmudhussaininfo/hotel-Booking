export const formateDate = (value, type, inMS) => {
  if (!type) return value;
  if (!inMS) {
    value = value * 1000;
  }

  const date = new Date(value);

  let options;

  if (type === "date") {
    options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  } else if (type === "time") {
    options = {
      hour: "numeric",
      minute: "numeric",
    };
  }
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
