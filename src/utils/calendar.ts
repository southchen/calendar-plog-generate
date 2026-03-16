export const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export interface CalendarCell {
  day: number | null;
  isToday: boolean;
}

export function generateMonthGrid(year: number, month: number): CalendarCell[][] {
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: CalendarCell[][] = [];
  let currentDay = 1;

  for (let week = 0; currentDay <= daysInMonth; week++) {
    const row: CalendarCell[] = [];
    for (let dow = 0; dow < 7; dow++) {
      if ((week === 0 && dow < firstDay) || currentDay > daysInMonth) {
        row.push({ day: null, isToday: false });
      } else {
        const isToday =
          year === today.getFullYear() &&
          month === today.getMonth() &&
          currentDay === today.getDate();
        row.push({ day: currentDay, isToday });
        currentDay++;
      }
    }
    weeks.push(row);
  }

  return weeks;
}
