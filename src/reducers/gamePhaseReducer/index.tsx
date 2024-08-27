type GamePhaseState = {
  count: number;
};

type GamePhaseAction = { type: "increment" } | { type: "reset" };

export const initialGamePhaseState = {
  count: 0,
};

export function gamePhaseReducer(
  state: GamePhaseState,
  action: GamePhaseAction,
) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "reset":
      return { ...state, count: 0 };
    default:
      return state;
  }
}
