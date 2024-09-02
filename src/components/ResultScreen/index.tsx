import { useGameContext } from "../../context/GameContext";

export const ResultScreen = () => {
  const { gameState } = useGameContext();

  return (
    <section>
      <article className="text-center p-3 rounded bg-slate-600">
        <p className="text-2xl mb-6 text-slate-300 ">RESULTS</p>
        <p className="mb-4 text-slate-400">
          Correct: <span className="text-green-500">{gameState.correctAnswers}</span>
        </p>
        <p className="text-slate-400">
          Wrong: <span className="text-red-500">{gameState.wrongAnswers}</span>
        </p>
      </article>
      <div className="p-3 mt-10 text-center text-slate-600">
        <p>Click anywhere to restart game.</p>
      </div>
    </section>
  );
};
