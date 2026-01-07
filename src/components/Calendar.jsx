import React from 'react';
import { 
  YEAR, 
  MONTH_NAMES, 
  DAY_NAMES, 
  getDaysInMonth, 
  getFirstDayOfMonth,
  formatDate,
  isSummerHoliday,
  isNonSummerHoliday
} from '../utils/dateUtils';

// Helper to parse disputed assignment and get what each track proposes
function parseDispute(assignment) {
  if (!assignment?.startsWith('disputed-')) return null;
  
  // Format: disputed-{momProposal}-to-{dadProposal}
  // e.g., disputed-mom-to-dad means Mom proposes Mom day, Dad proposes Dad day
  if (assignment === 'disputed-mom-to-dad') {
    return { momProposal: 'mom', dadProposal: 'dad' };
  } else if (assignment === 'disputed-dad-to-mom') {
    return { momProposal: 'dad', dadProposal: 'mom' };
  }
  return null;
}

// Helper to format proposal for display
function formatProposal(proposal) {
  return proposal === 'mom' ? 'Mom' : 'Dad';
}

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
    const dispute = parseDispute(assignment);
    
    if (assignment === 'mom') {
      className += ' mom-day';
    } else if (assignment === 'dad') {
      className += ' dad-day';
    } else if (dispute) {
      className += ' disputed-day';
    } else if (assignment === 'disputed-mom-to-mom' || assignment === 'disputed-dad-to-dad') {
      // Same to same (shouldn't happen but handle gracefully)
      className += assignment === 'disputed-mom-to-mom' ? ' mom-day' : ' dad-day';
    }
    
    // Add holiday border classes
    if (isSummerHoliday(dateStr)) {
      className += ' summer-holiday';
    } else if (isNonSummerHoliday(dateStr)) {
      className += ' non-summer-holiday';
    }
    
    // Build tooltip for disputed days
    const tooltip = dispute 
      ? `Disagreement: Mom proposes ${formatProposal(dispute.momProposal)} day, Dad proposes ${formatProposal(dispute.dadProposal)} day`
      : undefined;
    
    // Render disputed days with M/D labels
    if (dispute) {
      days.push(
        <div
          key={day}
          className={className}
          onClick={() => !comparisonMode && onDayClick(dateStr)}
          title={tooltip}
        >
          <div className="disputed-content">
            <span className={`dispute-label mom-label ${dispute.momProposal}-color`}>M</span>
            <span className="dispute-day-number">{day}</span>
            <span className={`dispute-label dad-label ${dispute.dadProposal}-color`}>D</span>
          </div>
        </div>
      );
    } else {
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

