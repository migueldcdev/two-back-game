import { EventRegister } from "./components/EventRegister";
import { GameScreen } from "./components/GameScreen";
import { InsertNameScreen } from "./components/InsertNameScreen";
import { ResultScreen } from "./components/ResultScreen";

import { useGameContext } from "./context/GameContext";

const App = () => {
  const { gamePhaseState, handleUserClick } = useGameContext();

  return (
    <main className="flex items-center justify-center h-screen bg-slate-300" onClick={handleUserClick}>
      <div className="w-3/4 md:w-1/3 p-2 rounded">
        {gamePhaseState.phase === 0 && <InsertNameScreen />}
        {gamePhaseState.phase === 1 && <GameScreen />}
        {gamePhaseState.phase === 2 && <ResultScreen />}
        <EventRegister />
      </div>
    </main>
  );
};

export default App;
