import React, { FC, useContext } from "react"
import data from "../../data/data"
import Track from "../../components/track/track"
import { Input } from "@mui/material"
import { dataType } from "../../types"
import { AudioContext } from "../../context/AudioContext"
import style from './mainPage.module.scss'


const MainPage:FC = () => {

  const {AddFilteredData}:any = useContext(AudioContext)

  console.log(AddFilteredData);
  

  

  const [tracksList, setTracksList] = React.useState<dataType[]>([])

  React.useEffect(() => {
    setTracksList(data)
  }, [])

  const runSearch = (query:string) => {

    

    if(!query) {
      setTracksList(data)
    }

    setTracksList(
      data.filter((track) => (
      track.title.toLowerCase().includes(query.toLowerCase())||
      track.artists.toLowerCase().includes(query.toLowerCase())
      ))
    )

    AddFilteredData(
      data.filter((track) => (
      track.title.toLowerCase().includes(query.toLowerCase())||
      track.artists.toLowerCase().includes(query.toLowerCase())
      ))
    )
    
  }

  return(
    <div className={style.search}>

      <Input 
        className={style.input}  
        placeholder="Поиск треков"
        onChange={(e) => runSearch(e.target.value)}
      />

      <div className={style.list}>

        {tracksList.map((track:dataType) => (
          <Track {...track} key={track.id}/>
        ))}

      </div>

    </div>
  )
}

export default MainPage