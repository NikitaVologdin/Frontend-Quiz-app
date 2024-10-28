export interface IQuizzes {
  quizzes: ICategory[];
}

export interface ICategory {
  title: string;
  icon: string;
  questions: IQuestion[];
}

export interface IQuestion {
  question: string;
  options: string[];
  answer: string;
}

export type AnswerStatusType = "right" | "wrong" | "no-answer" | "";
