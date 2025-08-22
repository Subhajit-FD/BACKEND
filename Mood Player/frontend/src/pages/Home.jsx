import { useState } from "react"
import MoodDetector from "../components/MoodDetector"
import Music from "../components/Music"

const Home = () => {

  const [songs, setSongs] = useState([])
  return (
    <div className="flex flex-col gap-5">
        <header>
            <div className="text-3xl font-bold tracking-tight">🎵 Mood Player</div>
        </header>
        <h2 className="text-xl font-medium tracking-tight">Live Mood Detection</h2>
        <MoodDetector setSongs={setSongs} songs={songs}/>
        <Music songs={songs}/>
    </div>
  )
}

export default Home