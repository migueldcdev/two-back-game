export type GamePhaseState = {
  phase: number;
};

export type GamePhaseAction = { type: "increment" | "reset" };

export const initialGamePhaseState = {
  phase: 0,
};

export function gamePhaseReducer(state: GamePhaseState, action: GamePhaseAction) {
  switch (action.type) {
    case "increment":
      return { ...state, phase: state.phase + 1 };
    case "reset":
      return initialGamePhaseState;
    default:
      return state;
  }
}
