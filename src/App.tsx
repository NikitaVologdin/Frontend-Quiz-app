import { useState } from "react";
import "./sass/style.sass";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import { IQuizzes, ICategory } from "./types/quizzes";
import data from "./json/data.json";

function App() {
  const { quizzes } = data as IQuizzes;
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(undefined);

  return (
    <div className="container app">
      <Header
        selectedCategory={selectedCategory}
        // appTheme={appTheme}
        // setAppTheme={setAppTheme}
      />
      <Main
        quizzes={quizzes}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default App;
