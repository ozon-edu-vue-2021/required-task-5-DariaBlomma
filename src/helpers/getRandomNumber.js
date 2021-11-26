export default function getRandomNumber(max) {
  let number = Math.round(Math.random() * max);
  if (number === 0) {
    number = 1;
  }
  return number;
}
