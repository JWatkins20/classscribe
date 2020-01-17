import React, {useState, useEffect} from 'react'
import {default as BuiltinAudioPlayer} from "react-h5-audio-player";
var aud = document.getElementById("");
const AudioPlayer = ({audio_url}) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        if(playing){
            const timer = setTimeout(() => setCurrentTime(currentTime+1), 1000);
            return () => clearTimeout(timer);
        }
    })
    return (
        <div>
            <BuiltinAudioPlayer
                onPlay={()=>{setPlaying(true)}}
                onPause={()=>{setPlaying(false)}}
                src={audio_url}
            />
        </div>
    );
}

export default AudioPlayer;