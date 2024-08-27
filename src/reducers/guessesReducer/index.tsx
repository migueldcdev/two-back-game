type GuessesState = {
  correct: number;
  error: number;
};

type GuessesAction = { type: "incrementCorrect" } | { type: "incrementError" };

export const initialGuessesState = {
  correct: 0,
  error: 0,
};

export function guessesReducer(state: GuessesState, action: GuessesAction) {
  switch (action.type) {
    case "incrementCorrect":
      return { ...state, correct: state.correct + 1 };
    case "incrementError":
      return { ...state, error: state.error + 1 };
    default:
      return state;
  }
}
