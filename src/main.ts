const palindrome = (src: string) => {
  let a = 0;
  let b = src.length - 1;

  while (a < src.length) {
    if (src[a] !== src[b]) {
      return false;
    }
    a++;
    b--;
  }

  return true;
};
console.log(palindrome('топот')); // true
console.log(palindrome('кабак')); // true
console.log(palindrome('Топот')); // false (если не использовать toLowerCase)
console.log(palindrome('привет')); // false
console.log(palindrome('а')); // true
console.log(palindrome('')); // true
