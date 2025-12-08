const date = new Date() 
const stringWeekDay = (weekDay) => {
    switch (weekDay) {
        case 0: return 'Sunday'
        case 1: return 'Monday' 
        case 2: return 'Tuesday' 
        case 3: return 'Wednesday' 
        case 4: return 'Thursday' 
        case 5: return 'Friday' 
        case 6: return 'Saturday'
    }
}
const getCurrentDate = () => {
    return {
        day: date.getDate(), 
        month: date.getMonth() + 1, 
        year: date.getFullYear(),  
        weekDay: stringWeekDay(date.getDay()) 
    }
} 
const getDate = (date) => {
    
}
export {getCurrentDate}