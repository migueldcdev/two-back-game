import { useGameContext } from "../../context/GameContext";

import { SvgLoader } from "../SvgLoader";

export const GameScreen = () => {
  const { letterState } = useGameContext();

  return (
    <section className="text-9xl text-center flex justify-center">
      {letterState.countCycle === 0 ? (
        <SvgLoader />
      ) : (
        <div className="text-slate-700">
          {letterState.correct || letterState.error ? (
            <span className={letterState.correct ? "text-green-500" : "text-red-500"}>⌜&nbsp;&nbsp;⌝</span>
          ) : (
            <span className="text-slate-400">⌜&nbsp;&nbsp;⌝</span>
          )}

          <div>{letterState.showLetter ? letterState.currentLetter : <span className="text-slate-300">*</span>}</div>
          {letterState.correct || letterState.error ? (
            <span className={letterState.correct ? "text-green-500" : "text-red-500"}>⌞&nbsp;&nbsp;⌟</span>
          ) : (
            <span className="text-slate-400">⌞&nbsp;&nbsp;⌟</span>
          )}
          <span className="text-sm">{letterState.countCycle}</span>
        </div>
      )}
    </section>
  );
};
