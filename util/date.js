const getFormattedDate = (date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const getDatePlusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

const reverseDateFormat = (date) => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
}

export { getFormattedDate, getDatePlusDays, reverseDateFormat };
