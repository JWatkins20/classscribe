import React, {useState, useEffect} from 'react'
import {default as BuiltinAudioPlayer} from "react-h5-audio-player";

const AudioPlayer = ({audio_url}) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        if(playing){
            const timer = setTimeout(() => setCurrentTime(currentTime+1), 1000);
            return () => clearTimeout(timer);
        }
    })

    const changeTime = (time) => {
        setCurrentTime(currentTime + time);
        
    }
    return (
        <div>
            {/* <audio id="audioPlayer" 
                preload="auto" 
                src="http://upload.wikimedia.org/wikipedia/commons/a/a9/Tromboon-sample.ogg"  controls>
            </audio>
            <button onclick={changeTime(10)}>10 seconds event</button>
            <button onclick={changeTime(20)}>20 seconds event</button> */}
            <BuiltinAudioPlayer
                onPlay={()=>{setPlaying(true)}}
                onPause={()=>{setPlaying(false)}}
                src={audio_url}
            />
        </div>
    );
}



export default AudioPlayer;