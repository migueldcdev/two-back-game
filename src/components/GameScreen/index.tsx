import { useGameContext } from "../../context/GameContext";

import { SvgLoader } from "../SvgLoader";

export const GameScreen = () => {
  const { gameState } = useGameContext();

  return (
    <section className="text-9xl text-center flex justify-center">
      {gameState.countCycle === 0 ? (
        <SvgLoader />
      ) : (
        <div className="text-slate-700">
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
        </div>
      )}
    </section>
  );
};
