import React from "react";
import { useContext , createContext } from "react";
import { useState } from "react";
import useSound from "use-sound";

const SoundContext = createContext() 

function SoundProvider({children})
{
    const soundUrl  = 'sound/windy_hill.mp3'
    const [isPlaying , setIsPlaying] = useState(false) 
    const [play , {stop}] = useSound(soundUrl , {
        volume: 0.75, 
        loop: true 

    })
    const playMusic = () => {
        if (!isPlaying) {
            play() 
            setIsPlaying(true) 
        }
    } 
    const stopPlayMusic = () => {
        if (isPlaying) {
            stop() 
            setIsPlaying(false) 
        }
    } 
    const toggleMusic = () => {
        if (isPlaying) stopPlayMusic() 
            else playMusic() 
    }
    return (
        <SoundContext.Provider value={{playMusic , stopPlayMusic , toggleMusic}}>   
            {children}
        </SoundContext.Provider>
    )
}

const useSoundContext = () => useSoundContext(SoundContext)

export {SoundContext , SoundProvider , useSoundContext}