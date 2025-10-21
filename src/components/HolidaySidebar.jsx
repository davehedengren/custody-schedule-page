import React, { useState } from 'react';
import { HOLIDAYS } from '../utils/dateUtils';

export default function HolidaySidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const formatDay = (date) => {
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      const ordinal = getOrdinal(day);
      return `${month}. ${day}${ordinal}`;
    };

    if (start === end) {
      return formatDay(startDate);
    } else {
      return `${formatDay(startDate)} - ${formatDay(endDate)}`;
    }
  };

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return (
    <>
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : '☰'} School Calendar
      </button>
      
      <div className={`holiday-sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Provo School District 2026</h2>
        
        <div className="calendar-links">
          <h3>School Year Calendars:</h3>
          <a 
            href="https://provo.edu/wp-content/uploads/2025/05/2025-26-School-Year-Calendar-updated-05202025.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="calendar-link"
          >
            📅 2025-26 School Year
          </a>
          <a 
            href="https://provo.edu/wp-content/uploads/2024/12/26-2027-calendar-12-12-2024.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="calendar-link"
          >
            📅 2026-27 School Year
          </a>
        </div>

        <div className="holiday-list">
          {HOLIDAYS.map((holiday, index) => (
            <div key={index} className="holiday-item">
              <div className="holiday-date">{formatDateRange(holiday.start, holiday.end)}</div>
              <div className="holiday-name">{holiday.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

