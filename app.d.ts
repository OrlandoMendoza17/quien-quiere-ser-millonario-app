type Answer = {
  isCorrect: boolean;
  label: string;
}

type Question = {
  label: string;
  answers: Answer[];
}

type Round = Question[]