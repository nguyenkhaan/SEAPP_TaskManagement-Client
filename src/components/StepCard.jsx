import React from "react";
import ReactDOM from "react-dom";
function StepCard({
  index = 1,
  title = "Progress Tracking",
  content = "Sign up in seconds and set up your personalized workspace. No credit card required for the free trial.",
  url = 'https://images.stockcake.com/public/d/0/f/d0f35ba5-c38c-4ed9-b689-56d9eef11a41_large/cloudy-blue-sky-stockcake.jpg' 
}) {
  return (
    <article className="xl:w-[431px] lg:w-[400px] md:w-[500px] w-[410px] relative h-150 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg">
      <div className="w-[70px] h-[70px] flex absolute text-2xl font-medium items-center justify-center text-center rounded-full top-[19px] left-[15px] bg-(--color-primary) text-white">
        {index}
      </div>
      <div 
        className="flex-1 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${url})`
        }}
      
      
      ></div>
      <div className="p-3 bg-white flex-1 flex items-start justify-start pt-15 gap-2 flex-col">
        <h2 className="text-[32px] font-medium w-full text-black text-left font-[Montserrat]">
          {title}
        </h2>
        <p className="text-left xl:w-[380px] lg:w-[320px] font-normal text-2xl text-gray-600 line-clamp-4">
          {content}
        </p>
      </div>
    </article>
  );
}
export default StepCard;
