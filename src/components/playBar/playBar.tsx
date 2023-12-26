import { FC, useEffect, useState } from "react"
import { AudioContext } from "../../context/AudioContext"
import { useContext } from "react"
import style from "./playBar.module.scss"
import "./playBar.module.scss"
import { IconButton, Slider } from "@mui/material"
import {Pause, PlayArrow} from "@mui/icons-material"
import secondToMMSS from "../../utils/secondToMMSS"

const TimeControls = () => {

  const {audio, CurrentTrack}:any = useContext(AudioContext)
  const {duration} = CurrentTrack

  const [currentTime, setCurrentTime] = useState<number>(0)

  const formattedCurrentTime = secondToMMSS(currentTime)

  

  const sliderCurrentTime = Math.round((currentTime / duration) *100)
  
  
  const handleChengeCurrentTime = (_:any, value:any) => {
    const time = Math.round(((value /100 )* duration ))
    setCurrentTime(time)
    audio.currentTime = time
  }

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime)

    }, 1000)

    return(() =>{
      clearInterval(timeInterval)
  })
  },[audio])

  
  return(
    <>
      <p>{formattedCurrentTime}</p>

      <Slider 
        value={sliderCurrentTime} 
        step={1} 
        max={100} 
        min={0} 
        onChange={handleChengeCurrentTime}
      />
    </>
  )
}

const PlayBar:FC = ():any => {
  const { CurrentTrack, handlyToggleAudio, isPlaying }:any = useContext(AudioContext)

  const {title, artists, preview, duration} = CurrentTrack
  const FornattedDuration =secondToMMSS(duration) 

  return(
    <div className={style.playbar}> 
      <img className={style.preview} src={preview} alt="" />

      <IconButton onClick={ () =>{
        handlyToggleAudio(CurrentTrack) 
      }}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}>
        <TimeControls />
        <p>{FornattedDuration}</p>
      </div>
    </div>  
  )
}

export default PlayBar

