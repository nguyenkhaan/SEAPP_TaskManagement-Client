import React from "react";
import ReactDOM from "react-dom";
import HeaderPhase from "../../components/HeaderPhase";
import FeatureCard from "../../components/FeatureCard";
import { div } from "framer-motion/client";
import AOS from 'aos'

function FeatureSection() {
  const featureItems = Array.from({ length: 6 }, (_, i) => ({ id: i }));

  return (
    <section className="landing__section bg-(--color-background-2) py-12">
      <HeaderPhase title={"Features"} />
      <h2 data-aos='zoom-in' className="mt-18 lg:text-7xl md:text-5xl text-3xl text-(--color-text) text-center w-full font-[Montserrat]">
        Every thing you need to
      </h2>
      <h2 data-aos='zoom-in' className="mt-2 lg:text-7xl md:text-5xl text-3xl text-(--color-primary) text-center w-full font-[Montserrat]">
        Stay Progress
      </h2>
      <span data-aos='zoom-in' className="block lg:w-full md:w-[600px] w-[400px] mx-auto text-center lg:text-2xl md:text-[18px] text-[12px] text-(--color-text) mt-6 mb-18">
        Powerful features designed to help you manage collaborate with teams and
        achieve more.
      </span>

      <div data-aos='flip-up' 
           className="mt-8 px-8 w-full grid items-start justify-center grid-cols-12 auto-rows-min gap-y-6 lg:gap-x-10 md:gap-x-15 text-center">
        {featureItems.map((item) => (
          <div
            key={item.id}
            className={`col-span-12 md:col-span-6 lg:col-span-4 flex justify-center lg:justify-center ${item.id % 2 == 1 ? 'md:justify-start' : 'md:justify-end'}`}
          >
            <div className="w-full lg:max-w-[404px] md:max-w-[300px] h-auto flex justify-center">
              <FeatureCard />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default FeatureSection;
