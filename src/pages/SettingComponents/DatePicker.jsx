import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function MyDatePicker() {
  const [value, onChange] = useState(new Date) 

  return (
    <div className="Sample">
      <div className="Sample__container">
        <main className="Sample__container__content">
          <DatePicker
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            onChange={onChange}
            value={value}
            yearAriaLabel="Year"
            className={'test-sm md:text-[18px] outline-0 h-10 md:h-12 w-full border border-[#757070] bg-[#f5f8ff] font-md rounded-[10px] py-3 px-3 md:px-5'}
            

          />
        </main>
      </div>
    </div>
  );
}