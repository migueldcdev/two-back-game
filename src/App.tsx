import { useReducer } from "react";
import { GameScreen } from "./components/GameScreen";
import { InsertNameScreen } from "./components/InsertNameScreen";
import { ResultScreen } from "./components/ResultScreen";

import { gamePhaseReducer, initialGamePhaseState } from "./reducers/gamePhaseReducer";

const App = () => {
  const [gamePhaseState, gamePhaseDispatch] = useReducer(gamePhaseReducer, initialGamePhaseState);

  return (
    <main className="flex items-center justify-center h-screen bg-slate-300">
      <div className="w-3/4 md:w-1/3 p-2 rounded">
        {gamePhaseState.count === 0 && <InsertNameScreen incrementGamePhase={gamePhaseDispatch} />}
        {gamePhaseState.count === 1 && <GameScreen />}
        {gamePhaseState.count === 2 && <ResultScreen />}
      </div>
    </main>
  );
};

export default App;
