import Image from "next/image";
import styles from '../styles/pages/index.module.scss'
import { MouseEventHandler, useRef, useState } from "react";
import Game from "@/components/Game";
// import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export type Audios = {
  intro: {
    play: () => void,
    stop: () => void,
  }
  nextQuestion: {
    play: () => void,
    stop: () => void,
  }
  answerSelected: {
    play: () => void,
    stop: () => void,
  }
  correctAnswer: {
    play: () => void,
    stop: () => void,
  }
  wrongAnswer: {
    play: () => void,
    stop: () => void,
  }
}

export default function Home() {
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  
  const $introAudio = useRef<HTMLAudioElement | null>(null)
  const $nextQuestionAudio = useRef<HTMLAudioElement | null>(null)
  const $answerSelectedAudio = useRef<HTMLAudioElement | null>(null)
  const $correctAnswerAudio = useRef<HTMLAudioElement | null>(null)
  const $wrongAnswerAudio = useRef<HTMLAudioElement | null>(null)
  
  const handleStartGame: MouseEventHandler<HTMLButtonElement> = () => {
    setGameStarted(true)
    audios.intro.play()
  }
  
  const stopAudio = ($audio: HTMLAudioElement | null) => {
    if($audio){
      $audio.pause()
    }
  }
  
  const playAudio = ($audio: HTMLAudioElement | null) => {
    if($audio){
      $audio.currentTime = 0
      $audio.play()
    }
  }
  
  const audios: Audios = {
    intro: {
      play: ()=> playAudio($introAudio.current),
      stop: ()=> stopAudio($introAudio.current),
    },
    nextQuestion: {
      play: ()=> playAudio($nextQuestionAudio.current),
      stop: ()=> stopAudio($nextQuestionAudio.current),
    },
    answerSelected: {
      play: ()=> playAudio($answerSelectedAudio.current),
      stop: ()=> stopAudio($answerSelectedAudio.current),
    },
    correctAnswer: {
      play: ()=> playAudio($correctAnswerAudio.current),
      stop: ()=> stopAudio($correctAnswerAudio.current),
    },
    wrongAnswer: {
      play: ()=> playAudio($wrongAnswerAudio.current),
      stop: ()=> stopAudio($wrongAnswerAudio.current),
    },
  }
  
  return (
    <>
      {
        gameStarted ?
          <Game audios={audios}/>
          :
          <main className={styles.Home}>
            <img src="/logo.png" className={styles.Home__logo} alt="" />
            <button onClick={handleStartGame}>Comenzar</button>
          </main>
      }
      <audio ref={$introAudio} src="/introGameSound.mp3"></audio>
      <audio ref={$nextQuestionAudio} src="/nextQuestion.mp3"></audio>
      <audio ref={$answerSelectedAudio} src="/answerSelected.mp3"></audio>
      <audio ref={$correctAnswerAudio} src="/correctAnswer.mp3"></audio>
      <audio ref={$wrongAnswerAudio} src="/wrongAnswer.mp3"></audio>
    </>
  );
}
