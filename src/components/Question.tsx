import { Dispatch, SetStateAction } from "react";
import Option from "./Option";
import { AnswerStatusType, IQuestion } from "../types/quizzes";

interface questionProps extends IQuestion {
  submitAnswer: (choice: string) => void;
  questionIndex: number;
  length: number;
  answerStatus: AnswerStatusType;
  choice: string;
  setChoice: Dispatch<SetStateAction<string>>;
}

export default function Question({
  question,
  options,
  submitAnswer,
  questionIndex,
  length,
  answerStatus,
  answer,
  choice,
  setChoice,
}: questionProps) {
  return (
    <div className="question">
      <div className="question__progress-indicator">
        {`Question ${questionIndex + 1} of ${length}`}
      </div>
      <div className="question__question">{question}</div>
      <progress
        className="question__progress-bar"
        max={length}
        value={questionIndex + 1}
      ></progress>
      <div className="question__options options">
        {options.map((title, i) => {
          return (
            <Option
              title={title}
              index={i}
              key={i}
              setChoice={setChoice}
              choice={choice}
              answerStatus={answerStatus}
              answer={answer}
              selected={choice === title ? true : false}
            />
          );
        })}
      </div>
      <button className="question__submit" onClick={() => submitAnswer(choice)}>
        Submit Answer
      </button>
    </div>
  );
}
