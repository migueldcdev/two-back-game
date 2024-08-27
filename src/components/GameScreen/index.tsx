import { useEffect, useReducer } from "react";

import {
  guessesReducer,
  initialGuessesState,
} from "../../reducers/guessesReducer";
import {
  initialLetterState,
  letterReducer,
} from "../../reducers/letterReducer";
import {
  initialRenderLetterState,
  renderLetterReducer,
} from "../../reducers/renderLetterReducer";
import { generateBlock } from "../../utils/blockGenerator";

export const GameScreen = () => {
  const [letter, dispatchLetter] = useReducer(
    letterReducer,
    initialLetterState,
  );
  const [render, dispatchRender] = useReducer(
    renderLetterReducer,
    initialRenderLetterState,
  );
  const [guesses, dispatchGuesses] = useReducer(
    guessesReducer,
    initialGuessesState,
  );

  const blockOfLetters = generateBlock();

  function setLetter() {
    dispatchLetter({ type: "next", nextLetter: blockOfLetters[letter.count] });
  }

  useEffect(() => {
    setLetter();
    console.log("2-back letter: ", letter.twoBackLetter);
    console.log("Previous letter: ", letter.previousLetter);
    console.log("Current letter: ", letter.currentLetter);

    console.log(
      "___________________________________________________________________________",
    );
  }, []);

  setTimeout(() => {
    setLetter();

    console.log("2-back letter: ", letter.twoBackLetter);
    console.log("Previous letter: ", letter.previousLetter);
    console.log("Current letter: ", letter.currentLetter);

    console.log(
      "___________________________________________________________________________",
    );
  }, 5000);

  return (
    <section className="text-9xl text-center">
      <div className="text-slate-800">
        <span className="text-slate-400">[</span> {letter.currentLetter}{" "}
        <span className="text-slate-400">]</span>
      </div>
    </section>
  );
};
