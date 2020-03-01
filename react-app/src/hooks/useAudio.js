import { useState, useEffect } from 'react'

const useAudio = source => {
  const [audio, setAudio] = useState(new Audio())
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    audio.pause()
    if (source) {
      audio.src = 'data:audio/mpeg;base64,' + source
      audio.volume = 0.6
      audio.play()
      setAudio(audio)
      setPlaying(true)
    } 
  }, [source])

  const stop = () => {
    audio.pause()
    audio.currentTime = 0
    setAudio(audio)
    setPlaying(false)
  }

  const play = () => {
    audio.play()
    setAudio(audio)
    setPlaying(true)
  }

  const switchPlayOrStop = () => {
    playing ? stop() : play()
  }

  return {
    audio,
    playing,
    stop,
    play,
    switchPlayOrStop
  }
}

export default useAudio