// Function to format date in "Monday, 02 Aug 2025"
function formatCustomDate(date,offset) {
  const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
  const parts = date.toLocaleDateString('en-GB', options).split(' ');
  
  // parts: [ 'Monday,', '12', 'Aug', '2025' ]
  const weekday = parts[0].replace(',', ''); // remove existing comma
  
  if(offset){
      return {date:`${weekday}, ${parts[1]} ${parts[2]} ${parts[3]}`,
              offset: offset 
      };
  }  
  else{
      return {date:`${weekday}, ${parts[1]} ${parts[2]} ${parts[3]}`};
  }
  
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

// Generate dates with +1,+2,+4 then +7 (626 times) approx 12 years
function generateDatesFromObj(dateObj) {
  const start = new Date(dateObj.year, dateObj.month - 1, dateObj.date);
  const offsets = [1, 2, 4,7];
  const dates = [];

  // First part: +1,+2,+4 from start date
  offsets.forEach(offset => {
    const d = new Date(start);
    d.setDate(d.getDate() + offset);
    dates.push(formatCustomDate(d,offset));
  });

  // Then +7 days 626 times from the +7 date
  let lastDate = new Date(start);
  lastDate.setDate(lastDate.getDate() + 7);
  for (let i = 0; i < 626; i++) {
    lastDate.setDate(lastDate.getDate() + 7);
    dates.push(formatCustomDate(lastDate));
  }

  return dates;
}

// Example usage
const todayObj = getTodayObject();
console.log("Today Object:", todayObj);

const futureDates = generateDatesFromObj(todayObj);
console.log("Generated Dates:", futureDates);

module.exports = { getTodayObject, generateDatesFromObj };
