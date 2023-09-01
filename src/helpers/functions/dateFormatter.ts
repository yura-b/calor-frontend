export function DateFormatter(timestamp) {
  // Convert the UTC timestamp to a Date object
  const date = new Date(timestamp);

  // Function to add leading zero for single-digit numbers
  const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

  // Get the hours and minutes in the local time zone (Kiev/EEST)
  const hours = addLeadingZero(date.getUTCHours() + 3); // Kiev is 3 hours ahead of UTC during EEST
  const minutes = addLeadingZero(date.getUTCMinutes());

  // Get the day, month, and year
  const day = addLeadingZero(date.getUTCDate());
  const month = addLeadingZero(date.getUTCMonth() + 1); // Month is zero-based (0 for January), so add 1
  const year = date.getUTCFullYear().toString().slice(2); // Get the last two digits of the year

  // Format the date and time in the desired format
  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
