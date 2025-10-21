// Date utility functions for 2026 custody calendar

export const YEAR = 2026;

// Provo School District holidays for 2026
export const HOLIDAYS = [
  // Winter Break (Jan 1-2)
  { start: '2026-01-01', end: '2026-01-02', name: 'Winter Break' },
  // No School (Jan 5)
  { start: '2026-01-05', end: '2026-01-05', name: 'No School' },
  // No School MLK (Jan 19)
  { start: '2026-01-19', end: '2026-01-19', name: 'No School (MLK)' },
  // SEPs Elementary (Jan 28-30)
  { start: '2026-01-28', end: '2026-01-30', name: 'SEPs (Elementary)' },
  // SEPs Middle (Feb 10)
  { start: '2026-02-10', end: '2026-02-10', name: 'SEPs (Middle)' },
  // No School Presidents (Feb 16)
  { start: '2026-02-16', end: '2026-02-16', name: 'No School (Pres.)' },
  // No School (Mar 16-17)
  { start: '2026-03-16', end: '2026-03-17', name: 'No School' },
  // Spring Break (Apr 6-10)
  { start: '2026-04-06', end: '2026-04-10', name: 'Spring Break' },
  // Last Day of School (May 22)
  { start: '2026-05-22', end: '2026-05-22', name: 'Last Day of School' },
  // Summer Vacation (May 22 - Aug 19)
  { start: '2026-05-22', end: '2026-08-19', name: 'Summer Vacation' },
  // First Day of School (Aug 19)
  { start: '2026-08-19', end: '2026-08-19', name: 'First Day of School' },
  // No School Labor Day (Sept 7)
  { start: '2026-09-07', end: '2026-09-07', name: 'No School (Labor)' },
  // Fall Break (Oct 22-26)
  { start: '2026-10-22', end: '2026-10-26', name: 'Fall Break' },
  // Thanksgiving (Nov 26-27)
  { start: '2026-11-26', end: '2026-11-27', name: 'Thanksgiving' },
  // Winter Break (Dec 21-31)
  { start: '2026-12-21', end: '2026-12-31', name: 'Winter Break' },
];

// Get all days in a month
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Get the day of week for the first day of the month (0 = Sunday)
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// Format date as YYYY-MM-DD
export function formatDate(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

// Parse date string YYYY-MM-DD to components
export function parseDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, month: month - 1, day };
}

// Check if a date is a holiday
export function isHoliday(dateStr) {
  return HOLIDAYS.some(holiday => {
    return dateStr >= holiday.start && dateStr <= holiday.end;
  });
}

// Check if a date is a weekend (Saturday or Sunday)
export function isWeekend(year, month, day) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

// Check if a date is a school day
// School days are weekdays from Aug 19 to May 22, excluding holidays
// For 2026: Jan-May 22 is end of 2025-26 school year, Aug 19-Dec is start of 2026-27
export function isSchoolDay(dateStr) {
  const { year, month, day } = parseDate(dateStr);
  const date = new Date(year, month, day);
  
  // School year spans: Jan 1 - May 22, 2026 and Aug 19 - Dec 31, 2026
  const springEnd = new Date(2026, 4, 22); // May 22
  const fallStart = new Date(2026, 7, 19); // Aug 19
  
  // Check if within school year periods
  const inSchoolYear = (date <= springEnd) || (date >= fallStart);
  
  if (!inSchoolYear) return false;
  
  // Must be a weekday
  if (isWeekend(year, month, day)) return false;
  
  // Must not be a holiday (includes summer vacation, breaks, etc.)
  if (isHoliday(dateStr)) return false;
  
  return true;
}

// Get month names
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Get day names
export const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Get total counts for all days in the year (for percentage calculations)
export function getTotalCounts() {
  const totals = {
    schoolDays: 0,
    weekends: 0,
    holidays: 0
  };

  // Iterate through all days of 2026
  for (let month = 0; month < 12; month++) {
    const daysInMonth = getDaysInMonth(YEAR, month);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(YEAR, month, day);
      
      if (isSchoolDay(dateStr)) {
        totals.schoolDays++;
      }
      
      if (isWeekend(YEAR, month, day)) {
        totals.weekends++;
      }
      
      if (isHoliday(dateStr)) {
        totals.holidays++;
      }
    }
  }

  return totals;
}

// Calculate statistics for assignments
export function calculateStatistics(assignments) {
  const stats = {
    mom: { total: 0, schoolDays: 0, weekends: 0, holidays: 0 },
    dad: { total: 0, schoolDays: 0, weekends: 0, holidays: 0 },
    disputed: 0
  };

  Object.entries(assignments).forEach(([dateStr, assignment]) => {
    if (assignment === 'disputed') {
      stats.disputed++;
      return;
    }

    const parent = assignment;
    if (!stats[parent]) return;

    stats[parent].total++;

    if (isSchoolDay(dateStr)) {
      stats[parent].schoolDays++;
    }

    const { year, month, day } = parseDate(dateStr);
    if (isWeekend(year, month, day)) {
      stats[parent].weekends++;
    }

    if (isHoliday(dateStr)) {
      stats[parent].holidays++;
    }
  });

  return stats;
}

