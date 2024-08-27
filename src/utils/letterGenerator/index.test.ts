import { describe, expect, test } from 'vitest';
import { letters, generateLetter } from './';

describe("Test for generateLetter", () => {
    test("should generate a leter from the array", () => {
        const result = generateLetter();
        expect(letters).toContain(result);
    })
})