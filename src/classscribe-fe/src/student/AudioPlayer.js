import React, {useState, useEffect} from 'react'
import {default as BuiltinAudioPlayer} from "react-h5-audio-player";
import Button from '@material-ui/core/Button'

const AudioPlayer = ({parent, getAudioDuration,updateTime, audio_url, syncToPage}) => {
    var myaudio = {}
    const [currentTime, setCurrentTime] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [playable, setPlayable] = useState(false)
    // window.onload = function(){
    //     setPlayable(true)
    // }
    useEffect(() => {
        if(playing){
            // 
            const timer = setTimeout(() => {updateTime(myaudio.currentTime)}, 1000);
            return () => clearTimeout(timer);
        }
        
    })


    // function changeTime(time){
    //     myaudio.currentTime = currentTime + time
    //     updateTime(time)
    // }
    return (
        <div>
            <audio id="audioPlayer" 
                preload="auto" 
                onPlay={(event)=>{setPlaying(true); getAudioDuration(myaudio)}}
                onPause={(event)=>setPlaying(false)}
                onSeeked={(event)=>{updateTime(myaudio.currentTime);getAudioDuration(myaudio)}}
                src={audio_url}  controls ref={audio=>{myaudio = audio}}>
            </audio>
            <Button onClick={(event)=>{myaudio.currentTime = syncToPage(parent); updateTime(myaudio.currentTime)}}>Sync audio to page</Button>
        </div>
    );
}



export default AudioPlayer;