import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios"

export default function MoodDetector({songs, setSongs}) {
  const videoRef = useRef(null);
  const [mood, setMood] = useState("Idle");
  const [isReady, setIsReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  // Start camera
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  // Load models once, then start camera
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // ensure models in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await startVideo();
      setIsReady(true);
    };
    loadModels();

    // cleanup camera on unmount
    return () => {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Single-shot detection
  const detectOnce = async () => {
    if (!isReady || !videoRef.current || isBusy) return;
    setIsBusy(true);
    setMood("Detecting...");

    try {
      // Ensure the video has enough data; if not, wait for it to be ready
      if (videoRef.current.readyState < 2) {
        await new Promise((resolve) => {
          const onCanPlay = () => {
            videoRef.current?.removeEventListener("canplay", onCanPlay);
            resolve();
          };
          videoRef.current?.addEventListener("canplay", onCanPlay, {
            once: true,
          });
        });
      }

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length === 0) {
        setMood("No face");
        return;
      }

      const expressions = detections[0].expressions;
      const moodGuess = Object.keys(expressions).reduce((a, b) =>
        (expressions[a] ?? 0) > (expressions[b] ?? 0) ? a : b
      );
      setMood(moodGuess);
      console.log(mood);
      
      axios(`http://localhost:3000/songs?mood=${mood}`).then(response => setSongs(response.data.songs));
    } catch (e) {
      console.error(e);
      setMood("Error");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="flex gap-5">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="rounded-md w-[400px] "
      />

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl">Start Listening</h3>
        <p className="text-sm w-[70%]">
          Your current mood is detected in real time. Enjoy listening music
          which best suits your mood.
        </p>
        <button
          className="px-3 py-1 w-fit cursor-pointer border rounded-md hover:text-black hover:bg-slate-200"
          onClick={detectOnce}
          disabled={!isReady || isBusy}
        >
          {isBusy ? "Detecting..." : "Detect Mood"}
        </button>
      </div>
    </div>
  );
}
