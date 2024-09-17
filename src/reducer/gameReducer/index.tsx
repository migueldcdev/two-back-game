export type GameStage = "startGame" | "playGame" | "endGame";

export type GameState = {
  userName: string;
  lettersArray: string[];
  showLetter: boolean;
  userClickIsCorrect: boolean | null;
  gameStage: GameStage;
  correctAnswers: number;
  wrongAnswers: number;
  showAnalyticsNotifications: boolean;
  notification: string;
};

export type GameAction =
  | { type: "NEXT_LETTER"; nextLetter: string }
  | { type: "START_GAME"; userName: string }
  | { type: "HIDE_LETTER" }
  | { type: "USER_RESPONDED"; isCorrect: boolean; userDidClickCorrect: boolean | null }
  | { type: "RESTART_GAME" }
  | { type: "END_GAME" }
  | { type: "SET_ANALYTICS_NOTIFICATIONS" };

export const initialGameState: GameState = {
  userName: "",
  lettersArray: [],
  showLetter: true,
  userClickIsCorrect: null,
  gameStage: "startGame",
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
        gameStage: "playGame" as const,
        notification: "User clicked start button" + `\n Timestamp: ${Date.now()}`,
      };
    case "NEXT_LETTER":
      return {
        ...state,
        lettersArray: [...state.lettersArray, action.nextLetter],
        showLetter: true,
        userClickIsCorrect: null,
      };
    case "END_GAME":
      return {
        ...state,
        gameStage: "endGame" as const,
      };
    case "HIDE_LETTER":
      return {
        ...state,
        showLetter: false,
      };
    case "USER_RESPONDED":
      return {
        ...state,
        correctAnswers: state.correctAnswers + (action.isCorrect ? 1 : 0),
        wrongAnswers: state.wrongAnswers + (action.isCorrect ? 0 : 1),
        userClickIsCorrect: action.userDidClickCorrect,
        notification:
          action.userDidClickCorrect !== null
            ? "User clicked two back button" + `\n Timestamp: ${Date.now()}`
            : state.notification,
      };
    case "RESTART_GAME":
      return {
        ...initialGameState,
        userName: state.userName,
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
