export const letters = ["A", "B", "C", "D", "E", "H", "I", "K", "L", "M", "O"];

function generateRandomNumber() {
  return Math.floor(Math.random() * letters.length);
}

export function generateLetter() {
  return letters[generateRandomNumber()];
}
