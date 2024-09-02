import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";

import { guessesReducer, GuessesState, initialGuessesState } from "../../reducers/guessesReducer";
import { initialLetterState, LetterAction, letterReducer, LetterState } from "../../reducers/letterReducer";

import { generateLetter } from "../../utils/letterGenerator";

export type Context = {
  letterState: LetterState;
  letterDispatch: (type: LetterAction) => void;
  handleUserClick: () => void;
  guessesState: GuessesState;
};

export const gameContext = createContext<Context | null>(null);

export const GameContext = ({ children }: { children: React.ReactNode }) => {
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
    if (guessesState.error > 0) letterDispatch({ type: "nextGamePhase" });
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
    letterDispatch({ type: "reset" });
    guessesDispatch({ type: "reset" });
  }

  function handleUserClick() {
    if (letterState.gamePhase === 1) return;
    if (letterState.gamePhase === 2) checkUserClickResult();
    if (letterState.gamePhase === 3) resetGame();
  }

  const handleUserOmission = useCallback(() => {
    if (letterState.correct || letterState.error) return;

    const isAnOmissionError = letterState.currentLetter === letterState.twoBackLetter;

    if (isAnOmissionError) {
      if (letterState.countCycle >= 2) guessesDispatch({ type: "incrementError" });
      if (guessesState.error > 0) letterDispatch({ type: "nextGamePhase" });

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
    if (letterState.gamePhase !== 2) return;

    if (letterState.countCycle > 15) letterDispatch({ type: "nextGamePhase" });

    const timeOutNextLetter = setTimeout(() => {
      handleUserOmission();
      letterDispatch({ type: "next", nextLetter: generateLetter() });
      handleShowLetter();
    }, 3000);

    return () => clearTimeout(timeOutNextLetter);
  }, [letterState, handleUserOmission]);

  return (
    <gameContext.Provider value={{ letterState, letterDispatch, handleUserClick, guessesState }}>
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
