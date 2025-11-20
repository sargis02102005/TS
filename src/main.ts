/*

Написать ф-цию, которая принимает на вход 2 массива, а возвращает true/false - обратные ли они друг другу


[1,2,3] и [3,2,1] => true
[90, 80, 90] и [90, 80, 90] => true
[1,2,3,4,5,6,7,8,9,0] и [0,9,8,7,6,5,4,3,2,1] => true
[4,5] и [5,4] => true

[1, 2] и [1, 2] => false

*/
const src = (a: number[], b: number[]) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[b.length - 1 - i]) {
      return true;
    }
  }
  return false;
};

console.log(src([1], [1]));
console.log(src([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
console.log(src([1, 2, 3], [3, 2, 1]));
