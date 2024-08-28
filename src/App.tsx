import { GameScreen } from "./components/GameScreen";
import { InsertNameScreen } from "./components/InsertNameScreen";
import { ResultScreen } from "./components/ResultScreen";

import { useGameContext } from "./context/GameContext";

const App = () => {
  const { gamePhaseState } = useGameContext();

  return (
    <main className="flex items-center justify-center h-screen bg-slate-300">
      <div className="w-3/4 md:w-1/3 p-2 rounded">
        {gamePhaseState.count === 0 && <InsertNameScreen />}
        {gamePhaseState.count === 1 && <GameScreen />}
        {gamePhaseState.count === 2 && <ResultScreen />}
      </div>
    </main>
  );
};

export default App;
