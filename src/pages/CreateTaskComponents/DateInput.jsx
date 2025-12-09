import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
function DateInput({ value, onChange }) {
  return (
    <div className="Sample">
      <div className="Sample__container">
        <main className="Sample__container__content">
          <label className="mr-2 text-(--color-text)">Due Time:</label>
          <DateTimePicker
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            onChange={onChange}
            value={value}
            yearAriaLabel="Year"
            className={
              "test-sm md:text-base outline-0 h-11 md:h-12 w-68 z-9999 border border-[#757070] bg-(--color-background-2) text-(--color-text) font-md rounded-[10px] py-3 px-4 md:px-6"
            }
            required={true}
            format="dd/MM/yyyy hh:mm:ss"
            isClockOpen = {false}
          />
        </main>
      </div>
    </div>
  );
}
export default DateInput;
/*
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function DateInput({
    value , onChange 
}) {

  return (
    <div className="Sample">
      <div className="Sample__container">
        
        <main className="Sample__container__content">
        <label className='mr-2'>Due Time:</label>
          <DatePicker
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            onChange={onChange}
            value={value}
            yearAriaLabel="Year"
            className={'test-sm md:text-base outline-0 h-11 md:h-12 w-50 z-9999 border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-4 md:px-8'}
            required={true}
            format='dd/MM/yyyy'
            
          />
        </main>
      </div>
    </div>
  );
}
export default DateInput
*/
