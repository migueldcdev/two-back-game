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
    if (gameState.userClickIsCorrect) return;

    gameDispatch({ type: "incrementCorrectAnswer" });
    gameDispatch({ type: "setUserClickCorrect" });
  }

  function handleIncorrectGuess() {
    if (gameState.userClickIsWrong) return;

    gameDispatch({ type: "incrementWrongAnswer" });
    gameDispatch({ type: "setUserClickWrong" });
    if (gameState.wrongAnswers > 0) gameDispatch({ type: "nextGamePhase" });
  }

  function checkUserClickResult() {
    const isCorrect = gameState.currentLetter === gameState.twoBackLetter;
    if (isCorrect) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess();
    }
  }

  const handleUserOmission = useCallback(() => {
    if (gameState.userClickIsCorrect || gameState.userClickIsWrong) return;

    const isAnOmissionError = gameState.currentLetter === gameState.twoBackLetter;

    if (isAnOmissionError) {
      if (gameState.countCycle >= 2) gameDispatch({ type: "incrementWrongAnswer" });
      if (gameState.wrongAnswers > 0) gameDispatch({ type: "nextGamePhase" });

      return;
    }

    gameDispatch({ type: "incrementCorrectAnswer" });
  }, [gameState]);

  function handleShowLetter() {
    const timeOutShowLetter = setTimeout(() => {
      gameDispatch({ type: "hideLetter" });
    }, 500);

    return () => clearTimeout(timeOutShowLetter);
  }

  useEffect(() => {
    if (gameState.gamePhase !== 2) return;

    if (gameState.countCycle > 15) gameDispatch({ type: "nextGamePhase" });

    const timeOutNextLetter = setTimeout(() => {
      handleUserOmission();
      gameDispatch({ type: "next", nextLetter: generateLetter() });
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
