import React, { useEffect } from "react";
// import { ReactComponent as Sun } from "./Sun.svg";
import Moon from './Moon.svg?react'
import Sun from './Sun.svg?react'
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-app-theme' , 'dark')
        localStorage.setItem('theme' , 'light')
    }
    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-app-theme' , 'light')
        localStorage.setItem('theme' , 'dark')
    }
    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode() 
        else setLightMode()  
    }
    useEffect(() => {
        const mode = localStorage.getItem('theme');
        if (mode === 'dark') {
            const toggle = document.getElementById('darkmode-toggle');
            if (toggle) toggle.checked = true;
        }
    }, []);
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
