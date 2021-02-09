import React, { useState, useEffect, useRef } from "react";

const MONTH_FULL_ = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December"
}

function formatDateString(date) {
  return `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

function DateCell({ month, year, onClick, day }) {
  function handleDateSelect(event) {
    let temp = new Date();
    temp.setFullYear(year);
    temp.setMonth(month);
    temp.setDate(day);
    onClick(temp);
  }
  return (
    <span
      style={calendarGridCellStyle}
      tabIndex="-1"
      onClick={handleDateSelect}
    >
      {day}
    </span>
  );
}
function DateInput({ defaultValue, onChange = () => {} }) {
  const [dateStringValue, setDateStringValue] = useState("");
  const [viewYear, setViewYear] = useState(2020);
  const [viewMonth, setViewMonth] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const today = useRef();
  function onDateInputChange(event) {
    return;
    // setDateStringValue(event.target.value);
  }
  useEffect(() => {
    if (defaultValue) {
      setViewYear(defaultValue.getFullYear());
      setViewMonth(defaultValue.getUTCMonth());
      setDateStringValue(formatDateString(defaultValue));
    } else {
      const now = new Date();
      today.current = now;
      setViewYear(now.getFullYear());
      setViewMonth(now.getUTCMonth());
    }
  }, [defaultValue]);

  function handlePreviousMonthClick() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }
  function handleNextMonthClick() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }
  function handleInputFocus() {
    setShowCalendar(true);
  }

  function hideCalendar() {
    setShowCalendar(false);
  }
  useEffect(() => {
    if (showCalendar) {
      window.addEventListener("click", hideCalendar);
    } else {
      window.removeEventListener("click", hideCalendar);
    }
    // return window.removeEventListener("click", hideCalendar);
  }, [showCalendar]);
  const [gridData, setGridData] = useState({
    firstDay: 0,
    totalDay: 0
  });
  useEffect(() => {
    let temp = new Date();
    temp.setFullYear(viewYear);
    temp.setMonth(viewMonth);
    temp.setDate(1);
    const firstDay = temp.getDay();
    temp.setMonth(viewMonth + 1);
    temp.setDate(0);
    const totalDay = temp.getDate();
    setGridData({ firstDay, totalDay });
  }, [viewMonth, viewYear]);
  function handleDateSelect(date) {
    setDateStringValue(formatDateString(date));
    onChange(date);
  }
  function renderGrid(gridData, month, year) {
    let result = [];
    let day = 0;
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        if (day < gridData.firstDay) {
          row.push(<span style={calendarGridCellStyle} />);
        } else if (day - gridData.firstDay + 1 > gridData.totalDay) {
          row.push(<span style={calendarGridCellStyle} />);
        } else {
          row.push(
            <DateCell
              day={day - gridData.firstDay + 1}
              month={month}
              year={year}
              onClick={handleDateSelect}
            />
          );
        }
        day += 1;
      }
      result.push(<div>{row}</div>);
    }

    return (
      <div>
        <div className="calendar-grid-header">
          <span style={calendarGridCellStyle}>Sun</span>
          <span style={calendarGridCellStyle}>Mon</span>
          <span style={calendarGridCellStyle}>Tue</span>
          <span style={calendarGridCellStyle}>Wed</span>
          <span style={calendarGridCellStyle}>Thu</span>
          <span style={calendarGridCellStyle}>Fri</span>
          <span style={calendarGridCellStyle}>Sat</span>
        </div>
        {result}
      </div>
    );
  }

  function MonthInWord(m) {
    return MONTH_FULL_[m];
  }

  return (
    <div style={containerStyle} onClick={e => e.stopPropagation()}>
      <input
        type="text"
        value={dateStringValue}
        onChange={onDateInputChange}
        onFocus={handleInputFocus}
      />
      {showCalendar && (
        <div style={dropdownContainerstyle}>
          <div style={calendarContainerStyle}>
            <div style={calendarHeaderStyle}>
              <span>
                {MonthInWord(viewMonth + 1)} {viewYear}
              </span>
              <div>
                <button
                  style={calendarButtonStyle}
                  type="button"
                  onClick={handlePreviousMonthClick}
                >
                  {"<"}
                </button>
                <button
                  style={calendarButtonStyle}
                  type="button"
                  onClick={handleNextMonthClick}
                >
                  {">"}
                </button>
              </div>
            </div>
            <div style={calendarGridHeaderStyle}>
              {renderGrid(gridData, viewMonth, viewYear)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const containerStyle = {
  position: "relative",
  display: "inline-block",
}
const dropdownContainerstyle = {
  top: "100%",
  left: 0,
  zIndex: 2,
  marginTop: '0.5rem',
  position: 'absolute',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
}
const calendarContainerStyle = {
  background: '#fff',
  display: 'block',
  whiteSpace: 'nowrap',
  padding: '0.325rem'
}
const calendarHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 0.5rem',
  justifyContent: 'space-between',
}
const calendarButtonStyle = {
}
const calendarGridHeaderStyle = {
  margin: '0.25rem 0',
  fontSize: '0.875rem',
}
const calendarGridCellStyle = {
  display: 'inline-block',
  textAlign: 'center',
  width: '2rem',
  padding: '0.25rem',
}


export default DateInput