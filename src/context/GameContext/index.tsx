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

  const { lettersArray, userClickIsCorrect, wrongAnswers, gameStage } = gameState;

  const didUserAlreadyClick = userClickIsCorrect != null;

  const hasTwoBackLetterMatch = lettersArray[lettersArray.length - 1] === lettersArray[lettersArray.length - 3];

  const shouldEndGame = lettersArray.length > 15 || wrongAnswers > 1;

  const handleUserResponse = useCallback(
    (isCorrect: boolean, userDidClickCorrect: boolean | null) => {
      gameDispatch({ type: "USER_RESPONDED", isCorrect, userDidClickCorrect });
      if (shouldEndGame) {
        gameDispatch({ type: "END_GAME" });
      }
    },
    [shouldEndGame],
  );

  function checkUserClickResult() {
    const isCorrect = hasTwoBackLetterMatch;
    handleUserResponse(isCorrect, isCorrect);
  }

  const handleUserOmission = useCallback(() => {
    if (hasTwoBackLetterMatch) {
      if (lettersArray.length >= 2) {
        handleUserResponse(false, null);
        return;
      }
      if (lettersArray.length >= 1) handleUserResponse(true, null);

      return;
    }

    handleUserResponse(true, null);
  }, [hasTwoBackLetterMatch, handleUserResponse, lettersArray.length]);

  function handleHideLetter() {
    const timeOutShowLetter = setTimeout(() => {
      gameDispatch({ type: "HIDE_LETTER" });
    }, 500);

    return () => clearTimeout(timeOutShowLetter);
  }

  useEffect(() => {
    if (gameStage !== "playGame") return;
    if (shouldEndGame) gameDispatch({ type: "END_GAME" });

    const timeOutNextLetter = setTimeout(() => {
      if (!didUserAlreadyClick) handleUserOmission();
      gameDispatch({ type: "NEXT_LETTER", nextLetter: generateLetter() });
      handleHideLetter();
    }, 3000);

    return () => clearTimeout(timeOutNextLetter);
  }, [handleUserOmission, didUserAlreadyClick, gameStage, shouldEndGame]);

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
