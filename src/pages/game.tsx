
import AnswerSlot from '@/components/Game/AnswerSlot'
import styles from '../styles/pages/game.module.scss'
import QuestionSlot from '@/components/Game/QuestionSlot'
import { MouseEventHandler, useState } from 'react'
import round1 from '@/utils/round1'
import round2 from '@/utils/round2'
import QuestionIndicator from '@/components/Game/QuestionIndicator'

const rounds: Round[] = [round1, round2]

const GamePage = () => {

  const [wellAnswered, setWellAnswered] = useState<boolean>(false)
  const [correctAnswerAppears, setCorrectAnswerAppears] = useState<boolean>(false)

  const [roundNumber, setRoundNumber] = useState<number>(0)
  const [questionNumber, setQuestionNumber] = useState<number>(0)

  const currentRound = rounds[roundNumber]
  const currentQuetion = currentRound[questionNumber]
  
  const lastRoundIndex = (rounds.length - 1)

  const handleNextQuestion: MouseEventHandler<HTMLButtonElement> = () => {
    setQuestionNumber(questionNumber + 1)
    setWellAnswered(false)
    setCorrectAnswerAppears(false)
  }
  
  
  const handleNextRound: MouseEventHandler<HTMLButtonElement> = () => {
    setQuestionNumber(0)
    setCorrectAnswerAppears(false)
    
    if(roundNumber !== lastRoundIndex){
      setRoundNumber(roundNumber + 1)
    }else{
      setRoundNumber(0)
    }
    
  }

  return (
    <div className={styles.Game}>
      <div className="grid grid-cols-[1fr,auto,1fr] justify-items-center items-center">
        <QuestionIndicator
          currentRound={currentRound}
          questionNumber={questionNumber}
        />
        <figure>
          <img src="/logo.png" className={styles.Game__logo} alt="" />
        </figure>
        <div></div>
      </div>
      {
        wellAnswered &&
        <div className="flex justify-center pb-12">
          <button
            className={styles.Game__continue}
            onClick={handleNextQuestion}
          >
            Siguiente Pregunta
          </button>
        </div>
      }
      {
        correctAnswerAppears &&
        <div className="flex justify-center pb-12">
          <button
            className={styles.Game__continue}
            onClick={handleNextRound}
          >
            {
              (roundNumber !== lastRoundIndex) ? "Siguiente Ronda" : "Reiniciar"
            }
          </button>
        </div>
      }
      <div>
        <div className={styles.Game__question}>
          <hr />
          <QuestionSlot question={currentQuetion.label} />
          <hr />
        </div>
        <div className="pb-12">
          <div className={styles.Game__answers}>
            {
              currentQuetion.answers.map((answer, index) =>
                <>
                  <hr />
                  <AnswerSlot
                    key={answer.label.split(" ").join("")}
                    {...{
                      index,
                      answer,
                      correctAnswerAppears,
                      setCorrectAnswerAppears,
                      setWellAnswered,
                    }}
                  />
                  {
                    (index === 1 || index === 3) &&
                    <hr />
                  }
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage