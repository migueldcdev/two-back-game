export type LetterState = {
  twoBackLetter: string;
  previousLetter: string;
  currentLetter: string;
  countCycle: number;
  showLetter: boolean;
  correct: boolean;
  error: boolean;
  gamePhase: number;
};

export type LetterAction =
  | { type: "next"; nextLetter: string }
  | { type: "hideLetter" | "setCorrect" | "setError" | "reset" | "nextGamePhase" };

export const initialLetterState = {
  twoBackLetter: "",
  previousLetter: "",
  currentLetter: "",
  countCycle: 0,
  showLetter: true,
  error: false,
  correct: false,
  gamePhase: 1,
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
    case "nextGamePhase":
      return {
        ...state,
        gamePhase: state.gamePhase + 1,
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
        error: false,
      };
    case "setError":
      return {
        ...state,
        error: true,
        correct: false,
      };
    case "reset":
      return initialLetterState;
    default:
      return state;
  }
}
