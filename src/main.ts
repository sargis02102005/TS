const src = (a: number[], b: number[]) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[b.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

console.log(src([1], [1]));
console.log(src([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
console.log(src([1, 2, 3], [3, 2, 1]));
