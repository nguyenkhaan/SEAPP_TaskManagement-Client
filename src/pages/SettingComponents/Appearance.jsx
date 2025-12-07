import React from 'react'
import SectionSetting from './SectionSettings'
import { motion } from 'framer-motion'

function Appearance() {
    const currentTheme = document.body.getAttribute("data-app-theme");

    const setDarkMode = () => {
        document.body.setAttribute('data-app-theme', 'dark');
    };

    const setLightMode = () => {
        document.body.setAttribute('data-app-theme', 'light');
    };

    const btnBase =
        "rounded-xl font-semibold text-lg md:text-xl cursor-pointer px-10 md:px-8 py-2 md:py-3 border transition-colors";

    return (
        <SectionSetting header='Appearance' description='Customize your website appearance by choosing between light, dark theme. Personalize your viewing experience to make the interface more comfortable, visually appealing, and perfectly aligned with your style.'>
            <div className="flex items-center justify-between md:justify-start gap-8">

                {/* LIGHT BUTTON */}
                <motion.button
                    onClick={setLightMode}
                    whileHover={{ scale: 1.08, boxShadow: "0 0 12px rgba(255,255,255,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    animate={
                        currentTheme === "light"
                            ? { scale: 1.05, boxShadow: "0 0 14px rgba(255,255,255,0.4)" }
                            : { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
                    }
                    transition={{ type: "spring", stiffness: 230, damping: 18 }}
                    className={`
                        ${btnBase}
                        ${
                            currentTheme === "light"
                                ? "bg-white text-(--color-primary) border-(--color-primary)"
                                : "bg-white text-gray-600 border-(--color-primary)"
                        }
                    `}
                >
                    Light
                </motion.button>

                {/* DARK BUTTON */}
                <motion.button
                    onClick={setDarkMode}
                    whileHover={{ scale: 1.08, boxShadow: "0 0 16px rgba(0,0,0,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    animate={
                        currentTheme === "dark"
                            ? { scale: 1.05, boxShadow: "0 0 20px rgba(0,0,0,0.7)" }
                            : { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
                    }
                    transition={{ type: "spring", stiffness: 230, damping: 18 }}
                    className={`
                        ${btnBase}
                        ${
                            currentTheme === "dark"
                                ? "bg-black text-white border-gray-600"
                                : "bg-black text-gray-300 border-gray-600"
                        }
                    `}
                >
                    Dark
                </motion.button>

            </div>
        </SectionSetting>
    );
}

export default Appearance;
