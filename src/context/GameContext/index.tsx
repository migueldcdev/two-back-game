import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";

import { initialLetterState, LetterAction, letterReducer, LetterState } from "../../reducers/letterReducer";

import { generateLetter } from "../../utils/letterGenerator";

export type Context = {
  letterState: LetterState;
  letterDispatch: (type: LetterAction) => void;
  handleUserClick: () => void; 
};

export const gameContext = createContext<Context | null>(null);

export const GameContext = ({ children }: { children: React.ReactNode }) => {
  const [letterState, letterDispatch] = useReducer(letterReducer, initialLetterState);  

  function handleCorrectGuess() {
    if (letterState.userClickIsCorrect) return;

    letterDispatch({ type: "incrementCorrectAnswer" });
    letterDispatch({ type: "setUserClickCorrect" });
  }

  function handleIncorrectGuess() {
    if (letterState.userClickIsWrong) return;

    letterDispatch({ type: "incrementWrongAnswer" });
    letterDispatch({ type: "setUserClickWrong" });
    if (letterState.wrongAnswers > 0) letterDispatch({ type: "nextGamePhase" });
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
  }

  function handleUserClick() {
    if (letterState.gamePhase === 1) return;
    if (letterState.gamePhase === 2) checkUserClickResult();
    if (letterState.gamePhase === 3) resetGame();
  }

  const handleUserOmission = useCallback(() => {
    if (letterState.userClickIsCorrect || letterState.userClickIsWrong) return;

    const isAnOmissionError = letterState.currentLetter === letterState.twoBackLetter;

    if (isAnOmissionError) {
      if (letterState.countCycle >= 2) letterDispatch({ type: "incrementWrongAnswer" });
      if (letterState.wrongAnswers > 0) letterDispatch({ type: "nextGamePhase" });

      return;
    }

    letterDispatch({ type: "incrementCorrectAnswer" });
  }, [letterState, letterState]);

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
    <gameContext.Provider value={{ letterState, letterDispatch, handleUserClick }}>
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
