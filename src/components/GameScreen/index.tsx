import { useGameContext } from "../../context/GameContext";

import { SvgLoader } from "../SvgLoader";

export const GameScreen = () => {
  const { gameState, checkUserClickResult } = useGameContext();

  return (
    <section className="text-9xl text-center flex justify-center">
      {gameState.countCycle === 0 ? (
        <SvgLoader />
      ) : (
        <div className="text-slate-700 flex flex-col">
          {gameState.userClickIsCorrect || gameState.userClickIsWrong ? (
            <span className={gameState.userClickIsCorrect ? "text-green-500" : "text-red-500"}>⌜&nbsp;&nbsp;⌝</span>
          ) : (
            <span className="text-slate-400">⌜&nbsp;&nbsp;⌝</span>
          )}

          <div>{gameState.showLetter ? gameState.currentLetter : <span className="text-slate-300">*</span>}</div>
          {gameState.userClickIsCorrect || gameState.userClickIsWrong ? (
            <span className={gameState.userClickIsCorrect ? "text-green-500" : "text-red-500"}>⌞&nbsp;&nbsp;⌟</span>
          ) : (
            <span className="text-slate-400">⌞&nbsp;&nbsp;⌟</span>
          )}
          <button
            className="px-4 py-6 bg-green-500 rounded text-white text-xl mt-16"
            onClick={() => checkUserClickResult()}
          >
            Check Two Back
          </button>
        </div>
      )}
    </section>
  );
};
