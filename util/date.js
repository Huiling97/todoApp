const getFormattedDate = (date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const getDatePlusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export { getFormattedDate, getDatePlusDays };
