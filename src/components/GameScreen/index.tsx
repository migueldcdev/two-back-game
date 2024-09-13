import { useGameContext } from "../../context/GameContext";

import { SvgLoader } from "../SvgLoader";

export const GameScreen = () => {
  const { gameState, checkUserClickResult } = useGameContext();

  const { userClickIsCorrect, lettersArray, showLetter } = gameState;

  const currentLetter = lettersArray[lettersArray.length - 1];

  function didUserAlreadyClick() {
    return userClickIsCorrect === null ? false : true;
  }

  function getBorderColor() {
    if (userClickIsCorrect === null) return "text-slate-500";
    return userClickIsCorrect ? "text-green-500" : "text-red-500";
  }

  const borderColor = getBorderColor();

  return (
    <section className="text-9xl text-center flex justify-center">
      {lettersArray.length === 0 ? (
        <SvgLoader />
      ) : (
        <div className="text-slate-800 flex flex-col">
          {/* Top border corners */}
          <span className={borderColor}>⌜&nbsp;&nbsp;⌝</span>

          <div>{showLetter ? currentLetter : <span>&nbsp;</span>}</div>

          {/* Bottom border corners */}
          <span className={borderColor}>⌞&nbsp;&nbsp;⌟</span>
          <button
            className="px-4 py-6 bg-green-600 rounded text-white text-xl mt-16 cursor-pointer hover:bg-green-500 disabled:bg-slate-300"
            disabled={didUserAlreadyClick()}
            onClick={checkUserClickResult}
          >
            Two Back
          </button>
        </div>
      )}
    </section>
  );
};
