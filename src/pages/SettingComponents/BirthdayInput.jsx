import MyDatePicker from "./DatePicker"
function BirthdayInput() {
    return (
        <div>
            <label className='font-md text-lg md:text-xl'>{'Birthday'}</label>
            <MyDatePicker />
        </div>
    )
}
export default BirthdayInput