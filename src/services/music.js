const pauseAudio = (audio) => {
    if (audio) {
        audio.pause() 
    }
} 

const stopAudio = (audio) => {
    if (audio) {
        audio.pause() 
        audio.currentTime = 0 
    }
}
const turnOffAll = () => {
    const audio = document.getElementById('bg-audio') 
    const audio_1 = document.getElementById('bg-1') 
    const audio_2 = document.getElementById('bg-2')
    const audio_3 = document.getElementById('bg-3') 
    const audio_4 = document.getElementById('bg-4') 
    if (audio && audio_1 && audio_2 && audio_3 && audio_4) {
        pauseAudio(audio) 
        pauseAudio(audio_1) 
        pauseAudio(audio_2) 
        pauseAudio(audio_3) 
        pauseAudio(audio_4)
    }
} 
const turnAudio = (audio) => {
    if (audio) {
        turnOffAll() 
        audio.play() 
    }
} 

export {turnAudio , stopAudio , pauseAudio}