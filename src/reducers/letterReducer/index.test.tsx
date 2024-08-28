import { describe, expect, test } from "vitest";

import { LetterAction, letterReducer, LetterState } from ".";

describe("Test for letterReducer", () => {
  test("Should save values to state properly", () => {
    const initialState: LetterState = {
      twoBackLetter: "",
      previousLetter: "",
      currentLetter: "",
      count: 0,
    };

    const firstAction: LetterAction = {
      type: "next",
      nextLetter: "A",
    };

    const firstUpdatedState = letterReducer(initialState, firstAction);
    expect(firstUpdatedState).toEqual({
      twoBackLetter: "",
      previousLetter: "",
      currentLetter: "A",
      count: 1,
    });

    const secondAction: LetterAction = {
      type: "next",
      nextLetter: "B",
    };

    const secondUpdatedState = letterReducer(firstUpdatedState, secondAction);

    expect(secondUpdatedState).toEqual({
      twoBackLetter: "",
      previousLetter: "A",
      currentLetter: "B",
      count: 2,
    });

    const thirdAction: LetterAction = {
      type: "next",
      nextLetter: "C",
    };

    const thirdUpdatedState = letterReducer(secondUpdatedState, thirdAction);

    expect(thirdUpdatedState).toEqual({
      twoBackLetter: "A",
      previousLetter: "B",
      currentLetter: "C",
      count: 3,
    });
  });
});
