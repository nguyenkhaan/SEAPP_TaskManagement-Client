import MyDatePicker from "./DatePicker"
function BirthdayInput() {
    return (
        <div>
            <label className='font-md text-lg md:text-xl text-(--color-text)'>{'Birthday'}</label>
            <MyDatePicker />
        </div>
    )
}
export default BirthdayInput