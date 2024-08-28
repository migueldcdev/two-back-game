import { useGameContext } from "../../context/GameContext";

export const GameScreen = () => {
  const { letterState } = useGameContext();

  return (
    <section className="text-9xl text-center">
      <div className="text-slate-800">
        <span className="text-slate-400">⌜ ⌝</span>
        <div> 
          {letterState.showLetter ? 
            letterState.currentLetter 
            :
            <span className="text-slate-300">*</span>
          } 
        </div>
        <span className="text-slate-400">⌞ ⌟</span>
        <span className="text-sm">{letterState.countCycle}</span>
      </div>
    </section>
  );
};
