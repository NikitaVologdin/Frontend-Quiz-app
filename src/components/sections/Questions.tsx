import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { type IQuestion, AnswerStatusType } from "../../types/quizzes";
import Question from "../Question";

type props = {
  questions: IQuestion[];
  setScore: Dispatch<SetStateAction<number>>;
  setIsEnd: Dispatch<SetStateAction<boolean>>;
};

export default function Questions({ questions, setScore, setIsEnd }: props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatusType>("");
  const [choice, setChoice] = useState<string>("");

  const currentQuestion = questions[questionIndex];

  function submitAnswer(choice: string) {
    if (choice === "") {
      return setAnswerStatus("no-answer");
    }
    if (choice === currentQuestion.answer) {
      setAnswerStatus("right");
      return setScore((prev) => prev + 1);
    }
    if (choice !== currentQuestion.answer) {
      return setAnswerStatus("wrong");
    }
    if (answerStatus === "no-answer") {
      return;
    }
  }

  useEffect(() => {
    function nextQuestion(timeout: number) {
      const timeOutId = setTimeout(() => {
        setQuestionIndex((prev) => prev + 1);
        setAnswerStatus("");
        setChoice("");
        if (questionIndex + 1 === questions.length) {
          return setIsEnd(true);
        }
      }, timeout);
      return timeOutId;
    }
    let timeOutId: ReturnType<typeof setTimeout>;
    if (answerStatus === "right") {
      timeOutId = nextQuestion(2000);
    }
    if (answerStatus === "wrong") {
      timeOutId = nextQuestion(3000);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [answerStatus, questionIndex, questions.length, setIsEnd]);

  const warningClass =
    answerStatus === "no-answer" && choice === ""
      ? ""
      : "warning__message_none";

  return (
    <section className="app__questions questions">
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        answerStatus={answerStatus}
        submitAnswer={submitAnswer}
        questionIndex={questionIndex}
        length={questions.length}
        answer={currentQuestion.answer}
        choice={choice}
        setChoice={setChoice}
      />
      <div className="questions__warning warning">
        <div className={`warning__message ${warningClass}`}>
          <div className="warning__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <path d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z" />
            </svg>
          </div>
          Please select an answer
        </div>
      </div>
    </section>
  );
}
