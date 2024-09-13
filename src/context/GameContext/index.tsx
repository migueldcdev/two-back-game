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

  const hasUserAlreadyClicked = useCallback(() => {
    return gameState.userClickIsCorrect != null;
  }, [gameState.userClickIsCorrect]);

  const isTwoBackLetterCoincidence = useCallback(() => {
    const lastLetter = gameState.lettersArray[gameState.lettersArray.length - 1];
    const twoBackLetter = gameState.lettersArray[gameState.lettersArray.length - 3];
    return lastLetter === twoBackLetter;
  }, [gameState.lettersArray]);

  const handleUserResponse = useCallback(
    (isCorrect: boolean, userDidClickCorrect: boolean | null) => {
      gameDispatch({ type: "USER_RESPONDED", isCorrect, userDidClickCorrect });
      if (gameState.wrongAnswers > 0) {
        gameDispatch({ type: "END_GAME" });
      }
    },
    [gameState.wrongAnswers],
  );

  function checkUserClickResult() {
    if (hasUserAlreadyClicked()) return;

    const isCorrect = isTwoBackLetterCoincidence();
    handleUserResponse(isCorrect, isCorrect ? true : false);
  }

  const handleUserOmission = useCallback(() => {
    if (hasUserAlreadyClicked()) return;

    if (isTwoBackLetterCoincidence()) {
      if (gameState.lettersArray.length >= 2) {
        handleUserResponse(false, null);
        return;
      }
      if (gameState.lettersArray.length >= 1) handleUserResponse(true, null);

      return;
    }

    handleUserResponse(true, null);
  }, [gameState, hasUserAlreadyClicked, isTwoBackLetterCoincidence, handleUserResponse]);

  function handleShowLetter() {
    const timeOutShowLetter = setTimeout(() => {
      gameDispatch({ type: "HIDE_LETTER" });
    }, 500);

    return () => clearTimeout(timeOutShowLetter);
  }

  useEffect(() => {
    if (gameState.gameStage !== "playGame") return;
    if (gameState.lettersArray.length > 15) gameDispatch({ type: "END_GAME" });

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
