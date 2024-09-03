import { GameScreen } from "./components/GameScreen";
import { InsertNameScreen } from "./components/InsertNameScreen";
import { ResultScreen } from "./components/ResultScreen";

import { useGameContext } from "./context/GameContext";

const App = () => {
  const { gameState } = useGameContext();

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-3/4 md:w-1/3 p-2 rounded">
        {gameState.gamePhase === 1 && <InsertNameScreen />}
        {gameState.gamePhase === 2 && <GameScreen />}
        {gameState.gamePhase === 3 && <ResultScreen />}
      </div>
    </main>
  );
};

export default App;
