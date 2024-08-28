import { describe, expect, test } from "vitest";
import { generateLetter, letters } from ".";

describe("Test for generateLetter", () => {
  test("should generate a letter from the array", () => {
    const result = generateLetter();
    expect(letters).toContain(result);
  });
});
