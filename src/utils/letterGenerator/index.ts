export const letters = ["A", "B", "C", "D", "E", "H", "I", "K", "L", "M", "O"];

export function generateLetter() {
  const randomNumber = Math.floor(Math.random() * letters.length);

  return letters[randomNumber];
}
