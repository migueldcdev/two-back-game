export type GamePhaseState = {
  count: number;
};

export type GamePhaseAction = { type: "increment" | "reset" };

export const initialGamePhaseState = {
  count: 0,
};

export function gamePhaseReducer(state: GamePhaseState, action: GamePhaseAction) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "reset":
      return initialGamePhaseState;
    default:
      return state;
  }
}
