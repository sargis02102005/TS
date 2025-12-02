/*
Напишите ф-цию generatePassword(options), которая генерирует пароль согласно переданным настройкам.

Пока что поддерживается только одна настройка:
1. Длина пароля

Для начала, базовая функция работает следующим образом:
Она генерирует случайный пароль заданной длины,
при этом пароль может состоять из маленьких, больших букв и цифр.


Далее поэтапно добавить поддержку следующий настроек:
1. Большие буквы (разрешить / запретить)
2. Маленькие буквы (разрешить / запретить)
3. Цифры (разрешить / запретить)
4. Специальные символы (разрешить / запретить)

 */

// Пример использования:
import { faker } from '@faker-js/faker';

type Options = {
  length: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
};

const generatePassword = (options: Options) => {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let password = '';
  for (let i = 0; i < options.length; i++) {
    let allowedChars = '';
    if (options.uppercase === true) {
      const randomIndex1 = faker.number.int({ min: 0, max: uppercaseChars.length - 1 });
      allowedChars += uppercaseChars[randomIndex1];
    }
    if (options.lowercase === true) {
      const randomIndex2 = faker.number.int({ min: 0, max: lowercaseChars.length - 1 });
      allowedChars += lowercaseChars[randomIndex2];
    }
    if (options.numbers === true) {
      const randomIndex3 = faker.number.int({ min: 0, max: numberChars.length - 1 });
      allowedChars += numberChars[randomIndex3];
    }
    if (options.symbols === true) {
      const randomIndex4 = faker.number.int({ min: 0, max: symbolChars.length - 1 });
      allowedChars += symbolChars[randomIndex4];
    }
    const randomIndex = faker.number.int({ min: 0, max: allowedChars.length - 1 });
    password += allowedChars[randomIndex];
  }
  return password;
};

console.log(generatePassword({ length: 10, uppercase: true, lowercase: true, numbers: true, symbols: true }));
