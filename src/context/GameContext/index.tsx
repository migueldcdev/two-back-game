import React, { createContext, useContext, useReducer } from "react";

import {
  GamePhaseAction,
  gamePhaseReducer,
  GamePhaseState,
  initialGamePhaseState,
} from "../../reducers/gamePhaseReducer";
import { initialLetterState, LetterAction, letterReducer, LetterState } from "../../reducers/letterReducer";

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
