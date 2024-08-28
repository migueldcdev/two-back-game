import { useReducer } from "react";

import { GameScreen } from "./components/GameScreen";
import { InsertNameScreen } from "./components/InsertNameScreen";
import { ResultScreen } from "./components/ResultScreen";
import { gamePhaseReducer, initialGamePhaseState } from "./reducers/gamePhaseReducer";

const App = () => {
  const [state, dispatch] = useReducer(gamePhaseReducer, initialGamePhaseState);

  return (
    <main className="flex items-center justify-center h-screen bg-slate-300">
      <div className="w-3/4 md:w-1/3 p-2 rounded">
        {state.count === 0 && <InsertNameScreen incrementGamePhase={dispatch} />}
        {state.count === 1 && <GameScreen />}
        {state.count === 2 && <ResultScreen />}
      </div>
    </main>
  );
};

export default App;
