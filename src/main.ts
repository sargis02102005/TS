const joinWithCase = (words: string[], usingCase: string) => {
  let result = '';

  if (usingCase === 'snake_case' || usingCase === 'kebab-case') {
    const symbol = usingCase === 'snake_case' ? '_' : '-';
    return words.join(symbol).toLowerCase();
  }

  if (usingCase === 'PascalCase') {
    for (const item of words) {
      result += item[0].toUpperCase() + item.slice(1).toLowerCase();
    }
    return result;
  }

  if (usingCase === 'camelCase') {
    for (const item of words) {
      if (result.length === 0) {
        result += item.toLowerCase();
      } else {
        result += item[0].toUpperCase() + item.slice(1).toLowerCase();
      }
    }
    return result;
  }
  return 'Ошибка, такова вида регистра не существует!';
};

console.log(joinWithCase(['хочу', 'соединить', 'эти', 'пять', 'слов'], 'pascal_case'));

const testCase1 = ['path'];

console.log(joinWithCase(testCase1, 'PascalCase')); // Path
console.log(joinWithCase(testCase1, 'camelCase')); // path
console.log(joinWithCase(testCase1, 'snake_case')); // path
console.log(joinWithCase(testCase1, 'kebab-case')); // path

const testCase2 = ['favorite', 'COLOR'];

console.log(joinWithCase(testCase2, 'PascalCase')); // FavoriteColor
console.log(joinWithCase(testCase2, 'camelCase')); // favoriteColor
console.log(joinWithCase(testCase2, 'snake_case')); // favorite_color
console.log(joinWithCase(testCase2, 'kebab-case')); // favorite-color

const testCase3 = ['uSEr', 'FIRST', 'Login', 'dATE'];

console.log(joinWithCase(testCase3, 'PascalCase')); // UserFirstLoginDate
console.log(joinWithCase(testCase3, 'camelCase')); // userFirstLoginDate
console.log(joinWithCase(testCase3, 'snake_case')); // user_first_login_date
console.log(joinWithCase(testCase3, 'kebab-case')); // user-first-login-date
