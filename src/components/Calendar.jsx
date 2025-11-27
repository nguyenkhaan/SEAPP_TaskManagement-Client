import { useState } from 'react';
import { useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function MyCalendar({
    getValue = null
}) {
    const [value, onChange] = useState(new Date) 
    useEffect(() => {
        if (getValue) {
            getValue(value) //Thuc hien thay doi de lay gia tri ra ben ngoai 
        }
    } , [value])
    return (
        <div className='absolute right-0 top-full'>
            <Calendar 
                onChange={onChange} 
                value={value} 
                className={'bg-white rounded-md p-4 shadow-lg text-base'}
            />
        </div>
    );
}
export default MyCalendar