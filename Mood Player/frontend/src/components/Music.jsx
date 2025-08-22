import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const Music = ({ songs }) => {
  const [current, setCurrent] = useState(null); // Index of current playing song
  const audioRefs = useRef([]);

  const handlePlay = (index) => {
    // Pause all other audios
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    audioRefs.current[index].play();
    setCurrent(index);
  };

  const handlePause = (index) => {
    audioRefs.current[index].pause();
    setCurrent(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl underline underline-offset-4">Recommended Tracks :</h2>
      <div className="flex gap-4 flex-wrap overflow-hidden">
        {songs.map((song, ind) => (
          <div className="card w-fit flex flex-col gap-3" key={ind}>
            <div className="flex items-center justify-center w-fit px-4 py-2 aspect-square border rounded-md">
              <h2>{song.title}</h2>
            </div>
            <div className="flex justify-center gap-2">
              <audio
                ref={el => (audioRefs.current[ind] = el)}
                src={song.audio}
                onEnded={() => setCurrent(null)}
                style={{ display: "none" }} // Hide native controls
              />
              {current === ind ? (
                <Pause className="font-thin cursor-pointer" onClick={() => handlePause(ind)} />
              ) : (
                <Play className="font-thin cursor-pointer" onClick={() => handlePlay(ind)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
