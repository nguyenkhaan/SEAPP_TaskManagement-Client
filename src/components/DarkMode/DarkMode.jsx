import React, { useEffect, useState } from "react";
// import { ReactComponent as Sun } from "./Sun.svg";
import Moon from './Moon.svg?react'
import Sun from './Sun.svg?react'
import "./DarkMode.css";
import useSound from "use-sound";
import { PlayCircle } from "lucide-react";
const DarkMode = () => {
    const [isPlaying , setIsPlaying] = useState(false)  
    const soundUrl = 'sound/switch_on.mp3'
    const [play , {stop} ] = useSound(soundUrl , {
        volume: 0.5, 
    });
    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-app-theme' , 'dark')
        localStorage.setItem('theme' , 'dark')
    }
    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-app-theme' , 'light')
        localStorage.setItem('theme' , 'light')
    }
    const toggleTheme = (e) => {
        // if (isPlaying) stop() 
        //     else play() 
        // setIsPlaying(!isPlaying)
        play()
            
        if (e.target.checked) setDarkMode() 
        else setLightMode()  
    }
    useEffect(() => {
        const mode = localStorage.getItem('theme');
        if (mode === 'dark') {
            const toggle = document.getElementById('darkmode-toggle');
            
            if (toggle) {
                toggle.checked = true;
                document.querySelector('body').setAttribute('data-app-theme' , 'dark')
            }
        }
        else {
            const toggle = document.getElementById('darkmode-toggle');
            if (toggle) {
                toggle.checked = false;
                document.querySelector('body').setAttribute('data-app-theme' , 'light')
            }
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
