import React, {useState} from 'react'
import Axios from 'axios'
import {url} from '../App'

const AudioPlayer = () => {
    return(
        <div>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwA2bAk8cgXzEOX22rKNAWdk1D7kbbDn2cvgr5E8KjObVSnfYZMg&s'} onClick={() => play(url+'audioupload/get/1')}/>
        </div>
    )
}

const play = async(passedurl, data) =>{
    try{
        const res =  await Axios.get(passedurl, {
            responseType: 'blob'
        })
        const mp3 = new Blob([res.data], { type: 'audio/mp3' })
        const url = window.URL.createObjectURL(mp3)
        const audio = new Audio(url)
        audio.load()
        await audio.play()
    } catch (e) {
      console.log('play audio error: ', e)
    }
}

export default AudioPlayer;