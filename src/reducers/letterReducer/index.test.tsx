import { describe, expect, test } from "vitest";

import { LetterAction, letterReducer, LetterState } from ".";

describe("Test for letterReducer", () => {
  test("Should save values to state properly", () => {
    const initialState: LetterState = {
      twoBackLetter: "",
      previousLetter: "",
      currentLetter: "",
      countCycle: 0,   
      showLetter: true,   
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
      countCycle: 1,
      showLetter: true,   

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
      countCycle: 2,
      showLetter: true,   

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
      countCycle: 3,
      showLetter: true,   
    });
  });
});
