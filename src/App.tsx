import React from "react"
import MainPage from "./pages/mainPaga/mainPage"
import style from  "./global.module.scss"
import PlayBar from "./components/playBar/playBar"

const App:React.FC = () => {
  return(
    <div className={style.wrapper}>
      <MainPage />
      <PlayBar />
    </div>
  )
}

export default App
