import React from 'react';
import { 
  YEAR, 
  MONTH_NAMES, 
  DAY_NAMES, 
  getDaysInMonth, 
  getFirstDayOfMonth,
  formatDate 
} from '../utils/dateUtils';

function MonthCalendar({ month, assignments, onDayClick, comparisonMode }) {
  const daysInMonth = getDaysInMonth(YEAR, month);
  const firstDay = getFirstDayOfMonth(YEAR, month);
  
  const days = [];
  
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(YEAR, month, day);
    const assignment = assignments[dateStr];
    
    let className = 'day-cell';
    if (assignment === 'mom') {
      className += ' mom-day';
    } else if (assignment === 'dad') {
      className += ' dad-day';
    } else if (assignment === 'disputed') {
      className += ' disputed-day';
    }
    
    days.push(
      <div
        key={day}
        className={className}
        onClick={() => !comparisonMode && onDayClick(dateStr)}
      >
        {day}
      </div>
    );
  }
  
  return (
    <div className="month-calendar">
      <div className="month-header">{MONTH_NAMES[month]}</div>
      <div className="day-names">
        {DAY_NAMES.map((name, i) => (
          <div key={i} className="day-name">{name}</div>
        ))}
      </div>
      <div className="days-grid">
        {days}
      </div>
    </div>
  );
}

export default function Calendar({ assignments, onDayClick, comparisonMode }) {
  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {Array.from({ length: 12 }, (_, month) => (
          <MonthCalendar
            key={month}
            month={month}
            assignments={assignments}
            onDayClick={onDayClick}
            comparisonMode={comparisonMode}
          />
        ))}
      </div>
    </div>
  );
}

