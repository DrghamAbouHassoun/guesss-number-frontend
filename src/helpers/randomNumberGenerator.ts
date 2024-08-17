
export function getRandomMinutes(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNumber(max: number) {
  if (max <= 50) {
    throw new Error("Max number must be greater than 50.");
  }
  return Math.floor(Math.random() * (max - 50 + 1)) + 50;
}

function randomNumberGenerator() {
  const min = 3;
  const max = 10;
  const randomNum = Math.random() * (max - min) + min;
  return parseFloat(randomNum.toFixed(1));
}

export default randomNumberGenerator;