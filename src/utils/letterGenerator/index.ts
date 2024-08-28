export const letters = ["A", "B", "C", "D", "E", "H", "I", "K", "L", "M", "O"];

function generateRandomNumber() {
  return Math.floor(Math.random() * 11);
}

export function generateLetter() {
  return letters[generateRandomNumber()];
}
