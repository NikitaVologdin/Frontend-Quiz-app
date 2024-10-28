import { Dispatch, SetStateAction } from "react";

type finalScoreProps = {
  score: number;
  length: number;
  category: string;
  icon: string;
  setPlayAgain: Dispatch<SetStateAction<boolean>>;
};
export default function FinalScore({
  score,
  length,
  category,
  icon,
  setPlayAgain,
}: finalScoreProps) {
  return (
    <section className="app__final final">
      <h3 className="final__title">
        Quiz completed
        <br />
        <strong className="final__title_bolder">You scored...</strong>
      </h3>
      <div className="final__score score">
        <div className="score__category">
          <img src={icon} width={40} height={40} alt={""} />
          {category}
        </div>
        <div className="score__points">{score}</div>
        <span className="score__questions-amount">out of {length}</span>
      </div>
      <button
        className="score__submit"
        onClick={() => {
          setPlayAgain(true);
        }}
      >
        Play Again
      </button>
    </section>
  );
}
