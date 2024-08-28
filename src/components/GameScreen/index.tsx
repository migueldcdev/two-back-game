import { useGameContext } from "../../context/GameContext";

export const GameScreen = () => {
  const { letterState } = useGameContext();

  return (
    <section className="text-9xl text-center">
      <div className="text-slate-800">
        <span className="text-slate-400">⌜ ⌝</span>
        <div> {letterState.currentLetter} </div>
        <span className="text-slate-400">⌞ ⌟</span>
      </div>
    </section>
  );
};
