import styles from './QuestionSlot.module.scss'

type Props = {
  question: string,
}

const QuestionSlot = ({ question }: Props) => {
  return (
    <div className={styles.QuestionSlot}>
      <div className={styles.QuestionSlot__left}></div>
      <p>{question}</p>
      <div className={styles.QuestionSlot__right}></div>
    </div>
  )
}

export default QuestionSlot