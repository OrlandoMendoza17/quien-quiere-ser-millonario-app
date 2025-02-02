import { Dispatch, MouseEventHandler, SetStateAction, useRef, useState } from 'react'
import styles from './AnswerSlot.module.scss'
import { Audios } from '@/pages'

type Props = {
  answer: Answer,
  index: number,
  questionNumber: number,
  lastQuestionIndex: number,
  audios: Audios,
  correctAnswerAppears: boolean,
  setCorrectAnswerAppears: Dispatch<SetStateAction<boolean>>,
  setWellAnswered: Dispatch<SetStateAction<boolean>>,
}

const AnswerSlot = (props: Props) => {

  const { answer, index, lastQuestionIndex, questionNumber, audios } = props
  const { correctAnswerAppears, setCorrectAnswerAppears, setWellAnswered } = props

  const type = [
    "A", "B", "C", "D"
  ]

  const [selected, setSelected] = useState<boolean>(false)
  const [correct, setCorrect] = useState<boolean>(false)

  const $button = useRef<HTMLButtonElement | null>(null)

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if ($button.current) {
      setSelected(true)
      audios.intro.stop()
      audios.answerSelected.play()
      setTimeout(() => {

        if (answer.isCorrect) {

          audios.correctAnswer.play()
          setSelected(false)
          setCorrect(true)
          
          if (questionNumber !== lastQuestionIndex) {
            setWellAnswered(true)
          } else {
            setCorrectAnswerAppears(true)
          }

        } else {
          setCorrectAnswerAppears(true)
          audios.wrongAnswer.play()
        }

      }, 5 * 1000);
    }
  }

  return (
    <button
      ref={$button}
      onClick={handleClick}
      className={`${styles.AnswerSlot} ${selected ? styles.selected : ""} ${((correct || correctAnswerAppears) && answer.isCorrect) ? styles.correct : ""}`}
    >
      <div className={styles.AnswerSlot__left}></div>
      <span>
        <span className="text-yellow-500">{type[index]}:</span> {answer.label}
      </span>
      <div className={styles.AnswerSlot__right}></div>
    </button>
  )
}

export default AnswerSlot