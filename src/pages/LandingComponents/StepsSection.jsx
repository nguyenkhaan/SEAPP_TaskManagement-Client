import React from 'react'
import ReactDOM from 'react-dom'
import HeaderPhase from '../../components/HeaderPhase'
import StepCard from '../../components/StepCard'
const stepCards = [
    {
        title: 'Create an account', 
        url: 'https://media.istockphoto.com/id/1174106492/photo/young-businesswoman-booking-tickets-online-using-smartphone-and-credit-card.jpg?s=612x612&w=0&k=20&c=e9jwAv72vqikTbFTpvXTFdTkSQy9kq0ril6sZX5FX0A=', 
        content: 'Sign up in seconds and set up your personalized workspace. No credit card required for the free trial.' 
    }, 
    {
        title: 'Add your tasks', 
        url: 'https://images.businessnewsdaily.com/app/uploads/2022/04/04074130/teamwork_g-stockstudio_getty.jpg', 
        content: 'Create tasks, set priorities, and organize them into categories. Invite team members to collaborate.' 
    }, 
    {
        title: 'Progress Tracking', 
        url: 'https://www.evinex.com/wp-content/uploads/2025/02/a-man-working-from-his-home-office.jpg', 
        content: 'Visualize your workflow, stay organized, and maintain consistent productivity across the entire website.' 
    }
    

]


function StepsSection() {
    return (

        <section className='landing__section bg-(--color-background-1) relative before:bg-(--color-background-1) before:z-[-1] before:absolute before:top-0 before:h-full before:left-1/2 before:translate-x-[-50vw] before:w-screen py-16'>
            <HeaderPhase title={'How It Works?'} />
            <h2 data-aos='zoom-in' className='mt-18 lg:text-7xl md:text-5xl text-3xl text-(--color-text) text-center w-full font-[Montserrat]'>
                Get Started In
            </h2>
            <h2 data-aos='zoom-in' className='mt-2 lg:text-7xl md:text-5xl text-3xl text-[#ff6766] text-center w-full font-[Montserrat]'>
                Three Simple Steps
            </h2>
            <div data-aos='zoom-out' className='mt-32 grid grid-cols-12 xl:w-full xl:gap-x-0 lg:gap-x-2 gap-y-6 lg:w-[1100px] mx-auto'>
                {stepCards.map((value, index) => {
                    return (
                        <div className='lg:col-span-4 col-span-12 flex justify-center'>
                            <StepCard index={index + 1} url={value.url} title={value.title} content={value.content}  />
                        </div>
                    )
                })}
            </div>
        </section>

    )
}
export default StepsSection