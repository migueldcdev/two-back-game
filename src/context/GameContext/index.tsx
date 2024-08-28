import React, { createContext, useContext, useEffect, useReducer } from "react";

import {
  GamePhaseAction,
  gamePhaseReducer,
  GamePhaseState,
  initialGamePhaseState,
} from "../../reducers/gamePhaseReducer";
import { initialLetterState, LetterAction, letterReducer, LetterState } from "../../reducers/letterReducer";

import { generateLetter } from "../../utils/letterGenerator";

export type Context = {
  gamePhaseState: GamePhaseState;
  gamePhaseDispatch: (type: GamePhaseAction) => void;
  letterState: LetterState;
  letterDispatch: (type: LetterAction) => void;
};

const gameContext = createContext<Context | null>(null);

export const GameContext = ({ children }: { children: React.ReactNode }) => {
  const [gamePhaseState, gamePhaseDispatch] = useReducer(gamePhaseReducer, initialGamePhaseState);
  const [letterState, letterDispatch] = useReducer(letterReducer, initialLetterState);


  function handleShowLetter() {
    const timeOutShowLetter = setTimeout(() => {
      letterDispatch({ type: 'hideLetter', nextLetter: '' });
    }, 500);
   
    return () => clearTimeout(timeOutShowLetter);
  }  

  useEffect(() => {
    const timeOutNextLetter = setTimeout(() => {
      letterDispatch({ type: 'next', nextLetter: generateLetter() });      
      handleShowLetter()
     
    }, 3000);
    
    return () => clearTimeout(timeOutNextLetter);
  }, [letterState, gamePhaseState])
  

  return (
    <gameContext.Provider value={{ letterState, letterDispatch, gamePhaseState, gamePhaseDispatch }}>
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
