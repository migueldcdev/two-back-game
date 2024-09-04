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
    gameDispatch({ type: "incrementCorrectAnswer" });
    gameDispatch({ type: "setUserClickCorrect" });
  }

  function handleIncorrectGuess() {
    gameDispatch({ type: "incrementWrongAnswer" });
    gameDispatch({ type: "setUserClickWrong" });
  }

  function checkUserClickResult() {
    gameDispatch({ type: "setNotification", notification: "User clicked two back button" });
    const hasUserAlreadyClicked = gameState.userClickIsCorrect || gameState.userClickIsWrong;
    if (hasUserAlreadyClicked) return;

    const isCorrect = gameState.currentLetter === gameState.twoBackLetter;

    if (isCorrect) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess();
      if (gameState.wrongAnswers > 0) gameDispatch({ type: "nextGamePhase" });
    }
  }

  const handleUserOmission = useCallback(() => {
    const hasUserAlreadyClicked = gameState.userClickIsCorrect || gameState.userClickIsWrong;
    if (hasUserAlreadyClicked) return;

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
