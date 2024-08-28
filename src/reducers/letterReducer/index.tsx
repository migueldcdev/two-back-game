import { generateLetter } from "../../utils/letterGenerator";

export type LetterState = {
  twoBackLetter: string;
  previousLetter: string;
  currentLetter: string;
  count: number;
};

export type LetterAction = {
  type: "next";
  nextLetter: string;
};

export const initialLetterState = {
  twoBackLetter: "",
  previousLetter: "",
  currentLetter: generateLetter(),
  count: 1,
};

export function letterReducer(state: LetterState, action: LetterAction) {
  switch (action.type) {
    case "next":
      return {
        ...state,
        twoBackLetter: state.previousLetter,
        previousLetter: state.currentLetter,
        currentLetter: action.nextLetter,
        count: state.count + 1,
      };
    default:
      return state;
  }
}
