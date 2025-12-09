import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { Link } from "react-router";
import AOS from "aos";
import Section1SmallBlock from "./Section1SmallBlock";
import TaskByGroupLanding from "./TaskByGroupLanding";
function HeroSection() {
    return (
        <div className=" bg-[--color-background-1] xl:pt-28 lg:pt-25 md:pt-20 pt-15 pb-8 landing__section relative before:bg-[--color-background-1] before:z-[-1] before:absolute before:top-0 before:h-full before:left-1/2 before:translate-x-[-50vw] before:w-screen">
            <div className="flex gap-3 lg:flex-row flex-col items-center lg:justify-between pt-8">
                <div
                    className="flex flex-col xl:gap-4 lg:gap-3 gap-2 flex-1 xl:ml-0 lg:ml-10"
                    data-aos="fade-right">
                    {/* heading */}
                    <button className="text-black lg:mx-0 mx-auto rounded-3xl xl:px-[22px] lg:px-[18px] md:px-3.5 px-3 py-[13px xl:w-[330px] md:w-[260px] w-45 xl:h-[55px] lg:h-[50px] h-[45px] xl:text-lg lg:text-[16px] text-[14px] bg-white shadow-lg">
                        <i class="fa-regular fa-lightbulb"></i> Boost your
                        productivity
                    </button>
                    <h2 className="xl:text-7xl lg:text-5xl md:text-6xl sm:text-[36px] text-[32px] lg:text-start text-center font-medium text-(--color-text)">
                        Manage your Task
                        <span className=" text-(--color-primary) lg:block mt-2">
                            {" "}
                            Efforlessly
                        </span>
                    </h2>
                    {/* paragraph */}
                    <p
                        className=" block xl:w-170 lg:w-100 max-sm:w-screen lg:px-0 md:px-3 px-5 text-(--color-text) xl:pt-6 lg:pt-5 md:pt-4 pt-1 lg:text-start text-center lg:text-2xl md:text-[22px] text-[20px] max-sm:mx-auto">
                        The ultimate task management solution for teams and
                        individuals. Stay organized, meet deadlines, and achieve
                        your goals with NoTask.
                    </p>

                    <div>
                        {/* button sign up */}
                        <Link to={"/register"}>
                            <motion.button
                                className="xl:px-5 lg:px-4 px-3 grow-0 text-white lg:mx-0 mx-auto xl:font-bold lg:font-semibold font-medium block xl:py-2 lg:py-1.5 md:py-1 py-0.5 xl:w-[450px] lg:w-[400px] md:w-[400px] w-[320px] xl:h-[90px] lg:h-20 md:h-[70px] h-[60px] mt-12 rounded-[158px] shadow-xl xl:text-2xl lg:text-[22px] md:text-xl text-lg cursor-pointer bg-(--color-primary)"
                                initial={{
                                    scale: 1,
                                }}
                                whileHover={{
                                    scale: 1.1,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}>
                                Sign Up Right Now
                            </motion.button>
                        </Link>
                        {/* Cac so lieu danh gia */}
                        <ul className="flex lg:mx-0 mx-auto text-black items-center w-100 justify-between grow-0 lg:mt-12 mt-10 divide-x-2 divide-gray-500">
                            <Section1SmallBlock
                                analysis={"10K+"}
                                title={"User Rating"}
                            />
                            <Section1SmallBlock
                                analysis={"10K+"}
                                title={"User Rating"}
                            />
                            <Section1SmallBlock
                                analysis={"10K+"}
                                title={"User Rating"}
                            />
                        </ul>
                    </div>
                </div>

                <div
                    className="flex-1 flex items-center xl:justify-center lg:justify-start"
                    data-aos="fade-left">
                    <TaskByGroupLanding />
                </div>
            </div>
        </div>
    );
}
export default HeroSection;
