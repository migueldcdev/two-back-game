import { describe, test, expect } from "vitest";

import { guessesReducer, GuessesState, initialGuessesState, GuessesAction } from ".";

describe("Tests for guesses reducer", () => {
    test("should increment correct", () => {
        const incrementCorrectAction: GuessesAction = {type: "incrementCorrect"};

        const updatedState = guessesReducer(initialGuessesState, incrementCorrectAction);

        expect(updatedState).toEqual({...initialGuessesState, correct: 1});
    });

    test("should increment error", () => {
        const incrementErrorAction: GuessesAction = {type: "incrementError"};

        const updatedState = guessesReducer(initialGuessesState, incrementErrorAction);

        expect(updatedState).toEqual({...initialGuessesState, error: 1});
    });

    test("should reset to initial state", () => {
        const finalGuessState: GuessesState = {
            correct: 14,
            error: 1,

        };

        const resetGuessesAction: GuessesAction = {type: "reset"};

        const resetedState = guessesReducer(finalGuessState, resetGuessesAction);

        expect(resetedState).toEqual(initialGuessesState);
    });
});