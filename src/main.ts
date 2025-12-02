const array = [
  [1, 9, 9],
  [2, 3, 6],
  [5, 5, 25],
  [8, 3, 24],
  [0, 0, 0],
];

const multiply = (a: number, b: number) => a * b;

const arrayMultiply = (arr: number[][]) => {
  const results = [];

  for (const items of arr) {
    const a = items[0];
    const b = items[1];
    const product = multiply(a, b);

    if (product === items[2]) {
      results.push([`Результат: ${product}, Ожидаемый результат: ${items[2]}`]);
    } else {
      results.push([`Результаты не совпали❌`]);
    }
  }
  return results;
};

console.log(arrayMultiply(array));
