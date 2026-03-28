// header-meta GET Time Zone
const headerMeta = document.querySelector(".header-meta");

// ------------- TAKING DATE --------------
// Taking Local Time with Temporal()
const localTime = Temporal.Now.zonedDateTimeISO();

const dayNum = localTime.day;
const monthNum = localTime.month;
const yearNum = localTime.year;

// Convert monthName and dayName to string
const monthName = localTime.toLocaleString(undefined, { month: 'long'});
const dayName = localTime.toLocaleString(undefined, { weekday: 'long'});

// Appear on user's screen
headerMeta.innerHTML = `${dayName} · ${monthNum} ${monthName} ${yearNum}`;

