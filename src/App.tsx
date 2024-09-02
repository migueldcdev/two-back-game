import { GameScreen } from "./components/GameScreen";
import { InsertNameScreen } from "./components/InsertNameScreen";
import { ResultScreen } from "./components/ResultScreen";

import { useGameContext } from "./context/GameContext";

const App = () => {
  const { letterState, handleUserClick } = useGameContext();

  return (
    <main className="flex items-center justify-center h-screen bg-slate-300" onClick={handleUserClick}>
      <div className="w-3/4 md:w-1/3 p-2 rounded">
        {letterState.gamePhase === 1 && <InsertNameScreen />}
        {letterState.gamePhase === 2 && <GameScreen />}
        {letterState.gamePhase === 3 && <ResultScreen />}        
      </div>
    </main>
  );
};

export default App;
