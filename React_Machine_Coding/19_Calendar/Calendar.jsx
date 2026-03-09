import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="calendar-container">
      <h2>Calendar Component</h2>
      <p>Current Date: {date.toDateString()}</p>
      <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>Prev Day</button>
      <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>Next Day</button>
      <p><i>Full calendar grid logic typically goes here</i></p>
    </div>
  );
};
export default Calendar;
