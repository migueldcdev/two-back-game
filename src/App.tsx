import { Analytics } from "./components/Analytics";
import { GameScreen } from "./components/GameScreen";
import { InsertNameScreen } from "./components/InsertNameScreen";
import { ResultScreen } from "./components/ResultScreen";

import { useGameContext } from "./context/GameContext";

const App = () => {
  const { gameState } = useGameContext();
  const { gamePhase } = gameState;

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-3/4 md:w-1/3 p-2 rounded">
        {gamePhase === 'startGame' && <InsertNameScreen />}
        {gamePhase === 'playGame' && <GameScreen />}
        {gamePhase === 'endGame' && <ResultScreen />}
      </div>
      <Analytics />
    </main>
  );
};

export default App;
