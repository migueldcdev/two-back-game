import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { InsertNameScreen } from ".";
import { render, screen } from "../../context/GameContext/testGameContext";

const context = {
  gamePhaseState: { phase: 0 },
  gamePhaseDispatch: () => {},
  letterState: {
    twoBackLetter: "",
    previousLetter: "",
    currentLetter: "",
    countCycle: 0,
    showLetter: true,
    correct: false,
    error: false,
  },
  letterDispatch: () => {},
  handleUserClick: () => {},
  guessesState: { correct: 0, error: 0 },
};

describe("Test suite InsertNameScreen component", () => {
  test("it should render", () => {
    render(<InsertNameScreen />, context);

    const button = screen.getAllByRole("button");

    expect(button).toBeDefined();
  });

  test("should write name to input", async () => {
    const user = userEvent;

    render(<InsertNameScreen />, context);

    const input = screen.getByPlaceholderText("Jane");

    await user.type(input, "John");
  });
});
