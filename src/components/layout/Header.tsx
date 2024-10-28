import { ReactNode } from "react";
import { ICategory } from "../../types/quizzes";
import ThemeSwitcher from "../ThemeSwitcher";
interface props {
  selectedCategory: ICategory | undefined;
}
type TCategoryBackground = "HTML" | "CSS" | "JavaScript" | "Accessibility";

export default function Header({ selectedCategory }: props) {
  let category: ReactNode;

  const categoryBackground = {
    HTML: "#FFF1E9",
    CSS: "#E0FDEF",
    JavaScript: "#EBF0FF",
    Accessibility: "#F6E7FF",
  };

  if (selectedCategory) {
    category = (
      <div className="header__category category">
        <div
          className="category__icon"
          style={{
            backgroundColor: `${
              categoryBackground[selectedCategory.title as TCategoryBackground]
            }`,
          }}
        >
          <img
            src={selectedCategory.icon}
            alt=""
            width={28.57}
            height={28.57}
          />
        </div>
        <h2 className="category__title">{selectedCategory.title}</h2>
      </div>
    );
  }
  return (
    <header className="app__header header">
      {selectedCategory ? category : ""}
      <ThemeSwitcher />
    </header>
  );
}
