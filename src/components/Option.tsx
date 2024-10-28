import { Dispatch, SetStateAction } from "react";
import { AnswerStatusType } from "../types/quizzes";

interface OptionProps {
  title: string;
  index: number;
  setChoice: Dispatch<SetStateAction<string>>;
  answerStatus: AnswerStatusType;
  answer: string;
  choice: string;
  selected: boolean;
}

export default function Option({
  title,
  index,
  setChoice,
  selected,
  answerStatus,
  answer,
}: OptionProps) {
  const variants = ["A", "B", "C", "D"];

  function clickHandler() {
    if (answerStatus === "" || answerStatus === "no-answer") setChoice(title);
    if (selected) setChoice("");
    return;
  }

  const selectedClasses = selected ? "active" : "";
  const pickedCorrectlyClasses =
    answerStatus === "right" && selected ? "correct" : "";
  const pickedWronglyClasses =
    answerStatus === "wrong" && selected ? "wrong" : "";
  const wasCorrect =
    !selected && answer === title && answerStatus === "wrong" ? "right" : "";

  return (
    <button
      className={`options__item item ${selectedClasses} ${pickedCorrectlyClasses} ${pickedWronglyClasses} ${wasCorrect}`}
      onClick={clickHandler}
    >
      <span className="options__icon question__icon">{variants[index]}</span>
      {title}
    </button>
  );
}
