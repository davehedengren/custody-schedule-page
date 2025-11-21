import React from 'react';
import { calculateStatistics, getTotalCounts } from '../utils/dateUtils';

export default function Statistics({ assignments, comparisonMode }) {
  const stats = calculateStatistics(assignments);
  const totals = getTotalCounts();
  
  // Calculate percentages for each category
  const momTotalPercent = Math.round((stats.mom.total / 365) * 100);
  const dadTotalPercent = Math.round((stats.dad.total / 365) * 100);
  
  const momSchoolPercent = totals.schoolDays > 0 
    ? Math.round((stats.mom.schoolDays / totals.schoolDays) * 100) 
    : 0;
  const dadSchoolPercent = totals.schoolDays > 0 
    ? Math.round((stats.dad.schoolDays / totals.schoolDays) * 100) 
    : 0;
  
  const momWeekendPercent = totals.weekends > 0 
    ? Math.round((stats.mom.weekends / totals.weekends) * 100) 
    : 0;
  const dadWeekendPercent = totals.weekends > 0 
    ? Math.round((stats.dad.weekends / totals.weekends) * 100) 
    : 0;
  
  const momSummerHolidayPercent = totals.summerHolidays > 0 
    ? Math.round((stats.mom.summerHolidays / totals.summerHolidays) * 100) 
    : 0;
  const dadSummerHolidayPercent = totals.summerHolidays > 0 
    ? Math.round((stats.dad.summerHolidays / totals.summerHolidays) * 100) 
    : 0;
  
  const momNonSummerHolidayPercent = totals.nonSummerHolidays > 0 
    ? Math.round((stats.mom.nonSummerHolidays / totals.nonSummerHolidays) * 100) 
    : 0;
  const dadNonSummerHolidayPercent = totals.nonSummerHolidays > 0 
    ? Math.round((stats.dad.nonSummerHolidays / totals.nonSummerHolidays) * 100) 
    : 0;

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-column mom-stats">
          <h3>Mom</h3>
          <div className="stat-item">
            <span className="stat-label">Total Nights:</span>
            <span className="stat-value">{stats.mom.total} <span className="stat-percent">({momTotalPercent}%)</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">School Days:</span>
            <span className="stat-value">{stats.mom.schoolDays} <span className="stat-percent">({momSchoolPercent}%)</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Weekends:</span>
            <span className="stat-value">{stats.mom.weekends} <span className="stat-percent">({momWeekendPercent}%)</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Summer Holidays:</span>
            <span className="stat-value">{stats.mom.summerHolidays} <span className="stat-percent">({momSummerHolidayPercent}%)</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">School Break Days:</span>
            <span className="stat-value">{stats.mom.nonSummerHolidays} <span className="stat-percent">({momNonSummerHolidayPercent}%)</span></span>
          </div>
        </div>

        <div className="stat-column dad-stats">
          <h3>Dad</h3>
          <div className="stat-item">
            <span className="stat-label">Total Nights:</span>
            <span className="stat-value">{stats.dad.total} <span className="stat-percent">({dadTotalPercent}%)</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">School Days:</span>
            <span className="stat-value">{stats.dad.schoolDays} <span className="stat-percent">({dadSchoolPercent}%)</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Weekends:</span>
            <span className="stat-value">{stats.dad.weekends} <span className="stat-percent">({dadWeekendPercent}%)</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Summer Holidays:</span>
            <span className="stat-value">{stats.dad.summerHolidays} <span className="stat-percent">({dadSummerHolidayPercent}%)</span></span>
          </div>
          <div className="stat-item">
            <span className="stat-label">School Break Days:</span>
            <span className="stat-value">{stats.dad.nonSummerHolidays} <span className="stat-percent">({dadNonSummerHolidayPercent}%)</span></span>
          </div>
        </div>
      </div>

      {comparisonMode && stats.disputed > 0 && (
        <div className="disputed-stats">
          <div className="stat-item">
            <span className="stat-label">Disputed Days:</span>
            <span className="stat-value disputed-value">{stats.disputed}</span>
          </div>
        </div>
      )}
    </div>
  );
}

