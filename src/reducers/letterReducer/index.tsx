export type LetterState = {
  twoBackLetter: string;
  previousLetter: string;
  currentLetter: string;
  countCycle: number;
  showLetter: boolean;
  correct: boolean;
  error: boolean;
};

export type LetterAction =
  | { type: "next"; nextLetter: string }
  | { type: "hideLetter" }
  | { type: "setCorrect" }
  | { type: "setError" };

export const initialLetterState = {
  twoBackLetter: "",
  previousLetter: "",
  currentLetter: "",
  countCycle: 0,
  showLetter: true,
  error: false,
  correct: false,
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
        correct: false,
        error: false,
      };
    case "hideLetter":
      return {
        ...state,
        showLetter: false,
      };
    case "setCorrect":
      return {
        ...state,
        correct: true,
      };
    case "setError":
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
