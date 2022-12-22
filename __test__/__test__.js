const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const prevMonthLastDay = new Date(year, month, 0).getDate();
const firstDay = new Date(year, month, 2);
const firstWeekDay = firstDay.getDay();
const lastDay = new Date(year, month + 1, 1);
console.log(prevMonthLastDay, firstWeekDay, lastDay);
