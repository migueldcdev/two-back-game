import { describe, expect, test } from "vitest";

import { initialLetterState, LetterAction, letterReducer, LetterState } from ".";

describe("Test for letterReducer", () => {
  test("should set showLetter to false", () => {
    const hideLetterAction: LetterAction = { type: "hideLetter" };

    const updatedState = letterReducer(initialLetterState, hideLetterAction);

    expect(updatedState).toEqual({
      ...initialLetterState,
      showLetter: false,
    });
  });

  test("correct and error should not be true at the same time", () => {
    const setCorrectAction: LetterAction = { type: "setCorrect" };
    const setErrorAction: LetterAction = { type: "setError" };

    const updatedStateOne = letterReducer(initialLetterState, setCorrectAction);

    expect(updatedStateOne).toEqual({
      ...initialLetterState,
      correct: true,
      error: false,
    });

    const updatedStateTwo = letterReducer(updatedStateOne, setErrorAction);

    expect(updatedStateTwo).toEqual({
      ...initialLetterState,
      correct: false,
      error: true,
    });
  });

  test("should save values to state properly", () => {
    const firstAction: LetterAction = {
      type: "next",
      nextLetter: "A",
    };

    const firstUpdatedState = letterReducer(initialLetterState, firstAction);
    expect(firstUpdatedState).toEqual({
      ...firstUpdatedState,
      twoBackLetter: "",
      previousLetter: "",
      currentLetter: "A",
      countCycle: 1,
    });

    const secondAction: LetterAction = {
      type: "next",
      nextLetter: "B",
    };

    const secondUpdatedState = letterReducer(firstUpdatedState, secondAction);

    expect(secondUpdatedState).toEqual({
      ...secondUpdatedState,
      twoBackLetter: "",
      previousLetter: "A",
      currentLetter: "B",
      countCycle: 2,
    });

    const thirdAction: LetterAction = {
      type: "next",
      nextLetter: "C",
    };

    const thirdUpdatedState = letterReducer(secondUpdatedState, thirdAction);

    expect(thirdUpdatedState).toEqual({
      ...thirdUpdatedState,
      twoBackLetter: "A",
      previousLetter: "B",
      currentLetter: "C",
      countCycle: 3,
    });
  });

  test("should reset to initial state", () => {
    const finalState: LetterState = {
      twoBackLetter: "A",
      previousLetter: "B",
      currentLetter: "C",
      countCycle: 15,
      showLetter: false,
      correct: true,
      error: false,
    };

    const resetStateAction: LetterAction = { type: "reset" };

    const resetedState = letterReducer(finalState, resetStateAction);

    expect(resetedState).toEqual(initialLetterState);
  });
});
