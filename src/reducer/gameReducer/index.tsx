export type GameState = {
  userName: string;
  twoBackLetter: string;
  previousLetter: string;
  currentLetter: string;
  countCycle: number;
  showLetter: boolean;
  userClickIsCorrect: boolean;
  userClickIsWrong: boolean;
  gamePhase: string;
  correctAnswers: number;
  wrongAnswers: number;
  showAnalyticsNotifications: boolean;
  notification: string;
};

export type GameAction =
  | { type: "NEXT_LETTER"; nextLetter: string }
  | { type: "START_GAME"; userName: string }
  | {
      type:
        | "HIDE_LETTER"
        | "USER_CLICKED_CORRECT"
        | "USER_CLICKED_WRONG"
        | "RESTART_GAME"        
        | "END_GAME"
        | "SUM_CORRECT_ANSWER"
        | "SUM_WRONG_ANSWER"
        | "SET_ANALYTICS_NOTIFICATIONS";
    }  

export const initialGameState = {
  userName: "",
  twoBackLetter: "",
  previousLetter: "",
  currentLetter: "",
  countCycle: 0,
  showLetter: true,
  userClickIsCorrect: false,
  userClickIsWrong: false,
  gamePhase: 'startGame',
  correctAnswers: 0,
  wrongAnswers: 0,
  showAnalyticsNotifications: false,
  notification: "",
};

export function gameReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        userName: action.userName,
        gamePhase: "playGame",
        notification: "User clicked start button" + `\n Timestamp: ${Date.now()}`,
      };
    case "NEXT_LETTER":
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
    case "END_GAME":
      return {
        ...state,
        gamePhase: 'endGame'
      }  
    case "HIDE_LETTER":
      return {
        ...state,
        showLetter: false,
      };
    case "USER_CLICKED_CORRECT":
      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
        userClickIsCorrect: true,
        userClickIsWrong: false,
        notification: "User clicked two back button" + `\n Timestamp: ${Date.now()}`,
      };
    case "USER_CLICKED_WRONG":
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
        userClickIsWrong: true,
        userClickIsCorrect: false,
        notification: "User clicked two back button" + `\n Timestamp: ${Date.now()}`,
      };
    case "SUM_CORRECT_ANSWER":
      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
      };
    case "SUM_WRONG_ANSWER":
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
      };
    case "RESTART_GAME":
      return {
        ...initialGameState,
        showAnalyticsNotifications: state.showAnalyticsNotifications,
        notification: "User clicked restart button" + `\n Timestamp: ${Date.now()}`,
      };

    case "SET_ANALYTICS_NOTIFICATIONS":
      return {
        ...state,
        showAnalyticsNotifications: !state.showAnalyticsNotifications,
        notification: "User clicked set analytics button" + `\n Timestamp: ${Date.now()}`,
      };    
    default:
      return state;
  }
}
