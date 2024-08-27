import { useState } from "react";

import { generateLetter } from "../../utils/letterGenerator";

export const GameScreen = () => {
  const [currentLetter, setCurrentLetter] = useState(generateLetter());
  const [showLetter, setShowLetter] = useState(true);

  setTimeout(() => {
    setCurrentLetter(generateLetter());
  }, 3000);

  return (
    <section className="text-9xl text-center">
      <div className="text-slate-800">
        <span className="text-slate-400">[</span>{" "}
        {showLetter ? currentLetter : " "}{" "}
        <span className="text-slate-400">]</span>
      </div>
    </section>
  );
};
