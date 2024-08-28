import { generateLetter } from "../../utils/letterGenerator";

export type LetterState = {
  twoBackLetter: string;
  previousLetter: string;
  currentLetter: string;
  countCycle: number;
  showLetter: boolean;
};

export type LetterAction = {
  type: "next" | "hideLetter";
  nextLetter: string;
};

export const initialLetterState = {
  twoBackLetter: "",
  previousLetter: "",
  currentLetter: generateLetter(),
  countCycle: 1,
  showLetter: true
};

export function letterReducer(state: LetterState, action: LetterAction) {
  switch (action.type) {
    case "next":
      return {
        ...state,
        twoBackLetter: state.previousLetter,
        previousLetter: state.currentLetter,
        currentLetter: action.nextLetter,
        countCycle: state.countCycle + 1,
        showLetter: true,
      };    
    case "hideLetter":
      return {
        ...state,
        showLetter: false
      }  
    default:
      return state;
  }
}
