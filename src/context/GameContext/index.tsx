import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";

import {
  GamePhaseAction,
  gamePhaseReducer,
  GamePhaseState,
  initialGamePhaseState,
} from "../../reducers/gamePhaseReducer";
import { guessesReducer, GuessesState, initialGuessesState } from "../../reducers/guessesReducer";
import { initialLetterState, LetterAction, letterReducer, LetterState } from "../../reducers/letterReducer";

import { generateLetter } from "../../utils/letterGenerator";

export type Context = {
  gamePhaseState: GamePhaseState;
  gamePhaseDispatch: (type: GamePhaseAction) => void;
  letterState: LetterState;
  letterDispatch: (type: LetterAction) => void;
  handleUserClick: () => void;
  guessesState: GuessesState;
};

export const gameContext = createContext<Context | null>(null);

export const GameContext = ({ children }: { children: React.ReactNode }) => {
  const [gamePhaseState, gamePhaseDispatch] = useReducer(gamePhaseReducer, initialGamePhaseState);
  const [letterState, letterDispatch] = useReducer(letterReducer, initialLetterState);
  const [guessesState, guessesDispatch] = useReducer(guessesReducer, initialGuessesState);

  function handleCorrectGuess() {
    if (letterState.correct) return;

    guessesDispatch({ type: "incrementCorrect" });
    letterDispatch({ type: "setCorrect" });
  }

  function handleIncorrectGuess() {
    if (letterState.error) return;

    guessesDispatch({ type: "incrementError" });
    letterDispatch({ type: "setError" });
    if (guessesState.error > 0) gamePhaseDispatch({ type: "increment" });
  }

  function checkUserClickResult() {
    const isCorrect = letterState.currentLetter === letterState.twoBackLetter;
    if (isCorrect) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess();
    }
  }

  function resetGame() {
    gamePhaseDispatch({ type: "reset" });
    letterDispatch({ type: "reset" });
    guessesDispatch({ type: "reset" });
  }

  function handleUserClick() {
    if (gamePhaseState.phase === 0) return;

    if (gamePhaseState.phase === 1) checkUserClickResult();

    if (gamePhaseState.phase === 2) resetGame();
  }

  const handleUserOmission = useCallback(() => {
    if (letterState.correct || letterState.error) return;

    const isAnOmissionError = letterState.currentLetter === letterState.twoBackLetter;

    if (isAnOmissionError) {
      if (letterState.countCycle >= 2) guessesDispatch({ type: "incrementError" });
      if (guessesState.error > 0) gamePhaseDispatch({ type: "increment" });

      return;
    }

    guessesDispatch({ type: "incrementCorrect" });
  }, [letterState, guessesState]);

  function handleShowLetter() {
    const timeOutShowLetter = setTimeout(() => {
      letterDispatch({ type: "hideLetter" });
    }, 500);

    return () => clearTimeout(timeOutShowLetter);
  }

  useEffect(() => {
    if (gamePhaseState.phase !== 1) return;

    if (letterState.countCycle > 15) gamePhaseDispatch({ type: "increment" });

    const timeOutNextLetter = setTimeout(() => {
      handleUserOmission();
      letterDispatch({ type: "next", nextLetter: generateLetter() });
      handleShowLetter();
    }, 3000);

    return () => clearTimeout(timeOutNextLetter);
  }, [letterState, gamePhaseState, handleUserOmission]);

  return (
    <gameContext.Provider
      value={{ letterState, letterDispatch, gamePhaseState, gamePhaseDispatch, handleUserClick, guessesState }}
    >
      {children}
    </gameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(gameContext);

  if (!context) {
    throw new Error("useIdeaContext must be used within a game provider");
  }

  return context;
};
