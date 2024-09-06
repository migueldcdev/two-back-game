import { useGameContext } from "../../context/GameContext";

import { SvgLoader } from "../SvgLoader";

export const GameScreen = () => {
  const { gameState, checkUserClickResult } = useGameContext();

  const { countCycle, userClickIsCorrect, userClickIsWrong, currentLetter, showLetter } = gameState;

  function getBorderColor() {
    if(!userClickIsCorrect && !userClickIsWrong) return "text-slate-400";
    return userClickIsCorrect ? "text-green-500" : "text-red-500"
  }

  const borderColor = getBorderColor();

  return (
    <section className="text-9xl text-center flex justify-center">
      {countCycle === 0 ? (
        <SvgLoader />
      ) : (
        <div className="text-slate-700 flex flex-col">  
          {/* Top border corners */}        
          <span className={borderColor}>⌜&nbsp;&nbsp;⌝</span>

          <div>{showLetter ? currentLetter : <span>&nbsp;</span>}</div>
          
          {/* Bottom border corners */}
          <span className={borderColor}>⌞&nbsp;&nbsp;⌟</span>
          <button
            className="px-4 py-6 bg-green-500 rounded text-white text-xl mt-16 cursor-pointer hover:bg-green-600"
            onClick={checkUserClickResult}
          >
            Two Back
          </button>
        </div>
      )}
    </section>
  );
};
