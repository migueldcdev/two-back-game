import { useGameContext } from "../../context/GameContext";

export const ResultScreen = () => {

  const { guessesState } = useGameContext();

  return (
    <section>
      <article className="text-center border-2 border-slate-400 p-3 rounded">
        <p className="text-xl mb-10 text-slate-600 ">RESULTS</p>
        <p className="mb-4 text-slate-500">
          Correct: <span className="text-green-500">{guessesState.correct}</span>
        </p>
        <p className="text-slate-500">
          Errors: <span className="text-red-500">{guessesState.error}</span>
        </p>
      </article>
      <div className="p-3 mt-10 text-center text-slate-600">
        <p>Click anywhere to restart game.</p>
      </div>
    </section>
  )
};
