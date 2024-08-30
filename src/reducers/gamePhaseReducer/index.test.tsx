import { describe, test, expect } from "vitest";

import { gamePhaseReducer, initialGamePhaseState, GamePhaseAction, GamePhaseState } from ".";

describe("Test for gamePhase reducer", () => {
    test("should increment game phase",() => {
        const gamePhaseIncrementAction: GamePhaseAction= {type: "increment"};

        const updatedState = gamePhaseReducer(initialGamePhaseState, gamePhaseIncrementAction);

        expect(updatedState).toEqual({phase: 1});
    });

    test("should reset to initial state", () => {
        const finalGamePhaseState: GamePhaseState = {phase: 2}    

        const gamePhaseResetAction: GamePhaseAction= {type: "reset"};

        const updatedState = gamePhaseReducer(finalGamePhaseState, gamePhaseResetAction);

        expect(updatedState).toEqual(initialGamePhaseState);


    });
});