"use client";
import {
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { type ICategory } from "../../types/quizzes";
import Introduction from "../sections/Introduction";
import Questions from "../sections/Questions";
import FinalScore from "../sections/FinalScore";

interface MainProps {
  quizzes: ICategory[];
  selectedCategory: ICategory | undefined;
  setSelectedCategory: Dispatch<SetStateAction<ICategory | undefined>>;
}

export default function Main({
  quizzes,
  selectedCategory,
  setSelectedCategory,
}: MainProps) {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [playAgain, setPlayAgain] = useState(false);
  let content: ReactNode;

  if (selectedCategory && !isEnd) {
    content = (
      <Questions
        questions={selectedCategory.questions}
        setScore={setScore}
        setIsEnd={setIsEnd}
      />
    );
  }
  if (!selectedCategory) {
    content = (
      <Introduction setCategory={setSelectedCategory} quizzes={quizzes} />
    );
  }
  if (isEnd && selectedCategory) {
    content = (
      <FinalScore
        score={score}
        length={selectedCategory.questions.length}
        icon={selectedCategory.icon}
        category={selectedCategory.title}
        setPlayAgain={setPlayAgain}
      />
    );
  }

  useEffect(() => {
    if (playAgain) {
      setScore(0);
      setIsEnd(false);
      setSelectedCategory(undefined);
      setPlayAgain(false);
    }
  }, [playAgain, setSelectedCategory]);

  return <main>{content}</main>;
}
