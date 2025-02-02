import styles from './QuestionIndicator.module.scss'

type Props = {
  currentRound: Round,
  questionNumber: number,
}

const QuestionIndicator = ({ currentRound, questionNumber }: Props) => {
  const questions = [...currentRound].reverse()
  // questions.reverse()
  return (
    <div className={styles.QuestionIndicator}>
      {
        questions.map(({ label }, index) => {
          const lastIndex = questions.length;
          const actualIndex = lastIndex - index;
          const isCurrentQuestion = ((actualIndex - 1) === questionNumber)
          return (
            <span
              style={{ marginLeft: `${10 * actualIndex}px` }}
              className={`${isCurrentQuestion ? "text-yellow-500" : ""}`}
            >
              Pregunta {actualIndex} x {10 * actualIndex} puntos
            </span>
          )
        })
      }
    </div>
  )
}

export default QuestionIndicator