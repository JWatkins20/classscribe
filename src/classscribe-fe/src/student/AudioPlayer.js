import React, {useState, useEffect} from 'react'
import {default as BuiltinAudioPlayer} from "react-h5-audio-player";
import Button from '@material-ui/core/Button'
//parent is parent component, getAudioDuration, syncToPage and updateTime are functions passed from parent to 
//update parent component. audio_url is url to fetch audio from.
const AudioPlayer = ({parent, getAudioDuration,updateTime, audio_url, syncToPage}) => {
    var myaudio = {}
    const [playing, setPlaying] = useState(false) //sets state's playing attribute
    useEffect(() => {
        if(playing){
            // only update audio time when audio is playing
            const timer = setTimeout(() => {updateTime(myaudio.currentTime)}, 1000);
            return () => clearTimeout(timer);
        }  
    })
    return (
        <div><audio id="audioPlayer" 
                preload="auto" 
                //when play is pressed adjust playing to true and send audio duration to parent
                onPlay={(event)=>{setPlaying(true); getAudioDuration(myaudio)}}
                onPause={(event)=>setPlaying(false)} //when paused adjust playing to false
                //when seeking to specific point in audio send current time to parent and send duration to parent
                onSeeked={(event)=>{updateTime(myaudio.currentTime);getAudioDuration(myaudio)}}
                src={audio_url} //source of audio
                controls 
                // creates a reference to audio object
                ref={audio=>{myaudio = audio} }>
            </audio>
            {/*syncs audio to page*/}
            <Button onClick={(event)=>{myaudio.currentTime = syncToPage(parent); updateTime(myaudio.currentTime)}}>Sync audio to page</Button>
            </div>
    );
}



export default AudioPlayer;