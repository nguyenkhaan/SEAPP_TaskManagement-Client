import React from "react";
import { turnAudio, pauseAudio, stopAudio } from "../../services/music";
import { useState } from "react";

function Audio({ id, url = ""  , title}) {
    const audio = document.getElementById(id) 
    const [play , setPlay] = useState(false) 
    const handleClick = () => {
        if (play) 
            pauseAudio(audio) 
        else turnAudio(audio) 
        setPlay(!play) 
    } 
    const doubleClick = () => {
        stopAudio(audio) 
        setPlay(false) 

    }
    return (
        <li
            title={title}
            className="rounded-lg bg-black cursor-pointer w-9 h-9 bg-center bg-cover bg-no-repeat" 
            onClick={handleClick} 
            onDoubleClick={doubleClick}
            style={{
                backgroundImage: `url(${url})`,
            }}></li>
    );
}
export default Audio