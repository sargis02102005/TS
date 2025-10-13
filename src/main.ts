const func = (src: Array<Record<string, number>>) => {
  let sum = 0;

  for (const obj of src) {
    for (const number of Object.values(obj)) {
      sum += number;
    }
  }

  return sum;
};

console.log(func([{ a: 20, b: 30 }, {}, { a: 3 }, { x: 5 }])); // 58
