import React from "react";
import { useContext , createContext } from "react";
import { useState } from "react";
import useSound from "use-sound";
import { useCallback , useMemo } from "react";
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
    const toggleSound = useCallback(() => {
        if (isPlaying) {
          stop();
          setIsPlaying(false);
        } else {
          play();
          setIsPlaying(true);
        }
      }, [isPlaying, play, stop]);
      const value = useMemo(() => ({
        isPlaying,
        toggleSound,
      }), [isPlaying, toggleSound]);
    return (
        <SoundContext.Provider value={value}>   
            {children}
        </SoundContext.Provider>
    )
}

const useSoundContext = () => useSoundContext(SoundContext)

export {SoundContext , SoundProvider , useSoundContext}