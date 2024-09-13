import { useGameContext } from "../../context/GameContext";

export const ResultScreen = () => {
  const { gameState, gameDispatch } = useGameContext();

  const { correctAnswers, wrongAnswers } = gameState;

  return (
    <section className="p-3 rounded border p-6 bg-white">
      <article>
        <p className="text-2xl mb-6 text-center font-bold">Results</p>
        <hr />
        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg mt-6">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-slate-700">&#9989; Correct</span>
          </div>
          <span className="text-2xl font-bold text-green-500">{correctAnswers}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg mt-6">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-slate-700">
              <span className="text-base">&#10060;</span> Wrong
            </span>
          </div>
          <span className="text-2xl font-bold text-red-500">{wrongAnswers}</span>
        </div>
      </article>
      <div className="p-3 mt-10 text-center text-slate-600">
        <button
          className="px-6 py-3 bg-green-600 rounded text-white text-xl mt-4 cursor-pointer hover:bg-green-500"
          onClick={() => gameDispatch({ type: "RESTART_GAME" })}
        >
          &#128472; Restart game
        </button>
      </div>
    </section>
  );
};
