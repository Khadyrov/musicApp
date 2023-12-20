import { FC } from "react";
import { dataType } from "../../types";
import {IconButton} from "@mui/material"
import {PlayArrow, Pause} from '@mui/icons-material';
import style from './track.module.scss'
import secondToMMSS from "../../utils/secondToMMSS";
import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import  cn  from "classnames";

const Track:FC<dataType>= (track) =>{

  const FornattedDuration = secondToMMSS(track.duration)

  const {handlyToggleAudio, CurrentTrack, isPlaying}:any = useContext(AudioContext)

  const theCurrentTrack = CurrentTrack.id === track.id

  return(
    <div className={cn(style.track, theCurrentTrack && style.playing)}>

      <IconButton onClick={() => handlyToggleAudio(track)}>
        {theCurrentTrack && isPlaying ? <Pause />:  <PlayArrow />}
      </IconButton>
      <img className={style.preview} src={track.preview} alt="" />
      <div className={style.credits}>
        <strong> {track.title}</strong>
        <p>{track.artists}</p>
      </div>
      <p>{FornattedDuration}</p>

    </div>
  )
}

export default Track