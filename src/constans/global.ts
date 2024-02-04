const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = month.map((item) => ({
  label: item,
  value: item,
}));

const currentYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4]?.map((item) => ({
  label: String(currentYear + item),
  value: String(currentYear + item),
}));
