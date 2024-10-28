import { SetStateAction, Dispatch, MouseEvent } from "react";
import { ICategory } from "../../types/quizzes";

interface IntroductionProps {
  setCategory: Dispatch<SetStateAction<ICategory | undefined>>;
  quizzes: ICategory[];
}

type TCategoryBackground = "HTML" | "CSS" | "JavaScript" | "Accessibility";

export default function Introduction({
  quizzes,
  setCategory,
}: IntroductionProps) {
  const categories = quizzes.map((q) => {
    return { title: q.title, icon: q.icon };
  });

  function clickHandler(event: MouseEvent<HTMLButtonElement>) {
    const choice = event.currentTarget.innerText;
    const selectedCategory = quizzes.find((q) => q.title === choice);
    setCategory(selectedCategory);
  }

  const categoryBackground = {
    HTML: "#FFF1E9",
    CSS: "#E0FDEF",
    JavaScript: "#EBF0FF",
    Accessibility: "#F6E7FF",
  };

  return (
    <div className="app__introduction introduction">
      <h1 className="introduction__title">
        Welcome to the{" "}
        <span className="introduction__title_bolder">Frontend Quiz!</span>
      </h1>
      <em className="introduction__info">Pick a subject to get started.</em>
      <div className="introduction__options options">
        {categories.map((s, i) => (
          <button key={i} onClick={clickHandler} className="options__item item">
            <span
              className="item__icon"
              style={{
                backgroundColor: `${
                  categoryBackground[s.title as TCategoryBackground]
                }`,
              }}
            >
              <img src={s.icon} width={40} height={40} alt={""} />
            </span>
            {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}
