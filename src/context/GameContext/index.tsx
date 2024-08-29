import React, { createContext, useContext, useEffect, useReducer } from "react";

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

const gameContext = createContext<Context | null>(null);

export const GameContext = ({ children }: { children: React.ReactNode }) => {
  const [gamePhaseState, gamePhaseDispatch] = useReducer(gamePhaseReducer, initialGamePhaseState);
  const [letterState, letterDispatch] = useReducer(letterReducer, initialLetterState);
  const [guessesState, guessesDispatch] = useReducer(guessesReducer, initialGuessesState);

  function handleShowLetter() {
    const timeOutShowLetter = setTimeout(() => {
      letterDispatch({ type: "hideLetter", nextLetter: "" });
    }, 500);

    return () => clearTimeout(timeOutShowLetter);
  }

  function handleCorrectGuess() {
    guessesDispatch({ type: "incrementCorrect" });
    letterDispatch({ type: "setCorrect", nextLetter: "" });
  }

  function handleIncorrectGuess() {
    guessesDispatch({ type: "incrementError" });
    letterDispatch({ type: "setError", nextLetter: "" });

    if (guessesState.error > 0) gamePhaseDispatch({ type: "increment" });
  }

  function handleUserClick() {
    if (gamePhaseState.count !== 1) return;

    const isCorrect = letterState.currentLetter === letterState.twoBackLetter;

    if (isCorrect) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess();
    }

    return;
  }

  useEffect(() => {
    if (gamePhaseState.count !== 1) return;

    if (letterState.countCycle > 15) gamePhaseDispatch({ type: "increment" });

    const timeOutNextLetter = setTimeout(() => { 

      letterDispatch({ type: "next", nextLetter: generateLetter() });
      handleShowLetter();
    }, 3000);

    return () => clearTimeout(timeOutNextLetter);
  }, [letterState, gamePhaseState]);

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
    if (!context) {
      throw new Error("useIdeaContext must be used within a user provider");
    }
  }

  return context;
};
