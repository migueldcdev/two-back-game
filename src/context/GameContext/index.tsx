import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";

import { GameAction, gameReducer, GameState, initialGameState } from "../../reducer/gameReducer";

import { generateLetter } from "../../utils/letterGenerator";

export type Context = {
  gameState: GameState;
  gameDispatch: (type: GameAction) => void;
  checkUserClickResult: () => void;
};

export const gameContext = createContext<Context | null>(null);

export const GameContext = ({ children }: { children: React.ReactNode }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

  function handleCorrectGuess() {    
    gameDispatch({ type: "USER_CLICKED_CORRECT" });
  }

  function handleIncorrectGuess() {    
    gameDispatch({ type: "USER_CLICKED_WRONG" });
  }

  function checkUserClickResult() {    
    const hasUserAlreadyClicked = gameState.userClickIsCorrect || gameState.userClickIsWrong;
    if (hasUserAlreadyClicked) return;

    const isCorrect = gameState.currentLetter === gameState.twoBackLetter;

    if (isCorrect) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess();
      if (gameState.wrongAnswers > 0) gameDispatch({ type: "END_GAME" });
    }
  }

  const handleUserOmission = useCallback(() => {
    const hasUserAlreadyClicked = gameState.userClickIsCorrect || gameState.userClickIsWrong;
    if (hasUserAlreadyClicked) return;

    const isAnOmissionError = gameState.currentLetter === gameState.twoBackLetter;

    if (isAnOmissionError) {
      if (gameState.countCycle >= 2) gameDispatch({ type: "SUM_WRONG_ANSWER" });
      if (gameState.wrongAnswers > 0) gameDispatch({ type: "END_GAME" });

      return;
    }

    gameDispatch({ type: "SUM_CORRECT_ANSWER" });
  }, [gameState]);

  function handleShowLetter() {
    const timeOutShowLetter = setTimeout(() => {
      gameDispatch({ type: "HIDE_LETTER" });
    }, 500);

    return () => clearTimeout(timeOutShowLetter);
  }

  useEffect(() => {
    if (gameState.gamePhase !== 'playGame') return;

    if (gameState.countCycle > 15) gameDispatch({ type: "END_GAME" });

    const timeOutNextLetter = setTimeout(() => {
      handleUserOmission();
      gameDispatch({ type: "NEXT_LETTER", nextLetter: generateLetter() });
      handleShowLetter();
    }, 3000);

    return () => clearTimeout(timeOutNextLetter);
  }, [gameState, handleUserOmission]);

  return (
    <gameContext.Provider value={{ gameState, gameDispatch, checkUserClickResult }}>{children}</gameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(gameContext);

  if (!context) {
    throw new Error("useIdeaContext must be used within a game provider");
  }

  return context;
};
