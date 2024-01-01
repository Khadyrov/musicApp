import { FC, createContext, useState,} from "react";
import data from "../data/data";
import { dataType } from "../types";
import { useEffect } from "react";

const defaultTrack = data[0]
 
// Create audio object
const audio = new Audio(defaultTrack.src)
export const AudioContext = createContext({})

const AudioProvider:FC<any> = ({children}) => {
  const [changedDates, setChangedDates]: [dataType[], Function] = useState(data);
  


  const [CurrentTrack, setCurrentTrack] = useState(defaultTrack)

  const [isPlaying, setPlaying] = useState(false)

  const AddFilteredData = (list:dataType) => {
    setChangedDates(list)
  }

  

  useEffect(() => {
    
    const handleAudioEnd = () => {
      const nextTrackIndex = changedDates.findIndex((track: dataType) => track.id === CurrentTrack.id);
      const newIndex:any = (nextTrackIndex + 1) % changedDates.length  
        
      setCurrentTrack(changedDates[newIndex])
      handlyToggleAudio(changedDates[newIndex])
      
    }

    audio.addEventListener('ended', handleAudioEnd)

    return (() => {
      audio.removeEventListener('ended', handleAudioEnd)
    })

  }, [audio,CurrentTrack])


  const handlyToggleAudio = (track:dataType) => {

    if(CurrentTrack.id !== track.id) {
      setCurrentTrack(track)

      setPlaying(true)

      audio.src = track.src
      audio.play()
      audio.currentTime = 0

      return
    }

    //  Play or Pause Audio
    if(isPlaying) {
      setPlaying(false)
      audio.pause()
    } else{
      setPlaying(true)
      audio.play()
    }
    
  }

  const value = {audio, CurrentTrack, isPlaying, handlyToggleAudio ,AddFilteredData}

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export default AudioProvider