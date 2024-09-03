export type GameState = {
  userName: string;
  twoBackLetter: string;
  previousLetter: string;
  currentLetter: string;
  countCycle: number;
  showLetter: boolean;
  userClickIsCorrect: boolean;
  userClickIsWrong: boolean;
  gamePhase: number;
  correctAnswers: number;
  wrongAnswers: number;
};

export type GameAction =
  | { type: "next"; nextLetter: string }
  | {type: "setUserName"; userName: string}
  | {
      type:
        | "hideLetter"
        | "setUserClickCorrect"
        | "setUserClickWrong"
        | "reset"
        | "nextGamePhase"
        | "incrementCorrectAnswer"
        | "incrementWrongAnswer";
    };

export const initialGameState = {
  userName: "",
  twoBackLetter: "",
  previousLetter: "",
  currentLetter: "",
  countCycle: 0,
  showLetter: true,
  userClickIsWrong: false,
  userClickIsCorrect: false,
  gamePhase: 1,
  correctAnswers: 0,
  wrongAnswers: 0,
};

export function gameReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case "setUserName":
      return {
        ...state,
        userName: action.userName,
        gamePhase: state.gamePhase + 1,
      }
    case "next":
      return {
        ...state,
        twoBackLetter: state.previousLetter,
        previousLetter: state.currentLetter,
        currentLetter: action.nextLetter,
        countCycle: state.countCycle + 1,
        showLetter: true,
        userClickIsCorrect: false,
        userClickIsWrong: false,
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
    case "setUserClickCorrect":
      return {
        ...state,
        userClickIsCorrect: true,
        userClickIsWrong: false,
      };
    case "setUserClickWrong":
      return {
        ...state,
        userClickIsWrong: true,
        userClickIsCorrect: false,
      };
    case "incrementCorrectAnswer":
      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
      };
    case "incrementWrongAnswer":
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
      };
    case "reset":
      return initialGameState;
    default:
      return state;
  }
}
