// Function to format date in "Monday, 02 Aug 2025"
function formatCustomDate(date) {
  const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
  const parts = date.toLocaleDateString('en-GB', options).split(' ');
  
  // parts: [ 'Monday,', '12', 'Aug', '2025' ]
  const weekday = parts[0].replace(',', ''); // remove existing comma
  return `${weekday}, ${parts[1]} ${parts[2]} ${parts[3]}`;
}
// Get today's date in your custom object format
function getTodayObject() {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1, // 1–12
    date: today.getDate(),
    dateString: formatCustomDate(today)
  };
}

// Generate dates with +1, +3, +6, +12, +24 then +25 (3 times)
function generateDatesFromObj(dateObj) {
  const start = new Date(dateObj.year, dateObj.month - 1, dateObj.date);
  const offsets = [1, 3, 6, 12, 24];
  const dates = [];

  // First part: +1, +3, +6, +12, +24 from start date
  offsets.forEach(offset => {
    const d = new Date(start);
    d.setDate(d.getDate() + offset);
    dates.push(formatCustomDate(d));
  });

  // Then +25 days 3 times from the +24 date
  let lastDate = new Date(start);
  lastDate.setDate(lastDate.getDate() + 24);
  for (let i = 0; i < 12; i++) {
    lastDate.setDate(lastDate.getDate() + 25);
    dates.push(formatCustomDate(lastDate));
  }

  return dates;
}

// Example usage
const todayObj = getTodayObject();
// console.log("Today Object:", todayObj);

const futureDates = generateDatesFromObj(todayObj);
// console.log("Generated Dates:", futureDates);


module.exports = {getTodayObject,generateDatesFromObj}