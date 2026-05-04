import { faker } from '@faker-js/faker';
import { createHash } from 'node:crypto';

/**
 * Функция для генерации хеша, на вход получает строку, на выход даёт её в хешированном виде
 */
function generateHash(rawText: string): string {
  return createHash('sha256').update(rawText).digest('hex');
}

type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  failedAttempts: number;
  isBlocked: boolean;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

const database: User[] = [];

const register = (data: RegisterData) => {
  // Проверяем, существует ли уже пользователь с такой почтой
  const existingUser = database.find((user) => user.email === data.email);

  if (existingUser) {
    console.log(`Пользователь с email ${data.email} уже существует!`);
    return;
  }

  const id = faker.string.nanoid();
  const passwordHash = generateHash(data.password);

  const newUser: User = {
    id,
    name: data.name,
    email: data.email,
    passwordHash,
    failedAttempts: 0,
    isBlocked: false,
  };

  database.push(newUser);
  console.log(`${data.name}, вы успешно зарегистрированы, ваш id - ${id}!`);
};

const login = (data: LoginData) => {
  // Ищем пользователя по email
  const user = database.find((user) => user.email === data.email);

  if (!user) {
    console.log('Пользователь не найден!');
    return;
  }

  // Проверяем, заблокирован ли пользователь
  if (user.isBlocked) {
    console.log('Вы заблокированы!');
    return;
  }

  // Проверяем пароль
  const inputPasswordHash = generateHash(data.password);
  const isPasswordCorrect = inputPasswordHash === user.passwordHash;

  if (isPasswordCorrect) {
    // Успешный вход - сбрасываем счетчик неудачных попыток
    user.failedAttempts = 0;
    console.log(`Добро пожаловать, ${user.name}`);
    return;
  }

  // Неверный пароль - увеличиваем счетчик
  user.failedAttempts++;

  if (user.failedAttempts === 3) {
    // Третья неудачная попытка подряд - блокируем
    user.isBlocked = true;
    console.log('Неверный пароль! Вы заблокированы!');
  } else {
    // Первая или вторая неудачная попытка
    console.log('Неверный пароль!');
  }
};

/**
 * Ниже идут примеры использования ваших функций
 */

const maxim: RegisterData = { name: 'maxim', email: 'maxim@gmail.com', password: '123456' };
const mihail: RegisterData = { name: 'mihail', email: 'mihail@gmail.com', password: '223223' };

register(maxim); // maxim, вы успешно зарегистрированы, ваш id - jYhvZ!
register(mihail); // mihail, вы успешно зарегистрированы, ваш id - oPgxU!

/**
 * Проверяем Максима, он должен на первый раз успешно войти,
 * а дальше за 3 неверных входа заблокироваться
 */
console.log('\nПроверка Максима:');
const maximLoginData: LoginData = { ...maxim };

login(maximLoginData); // Добро пожаловать, maxim

maximLoginData.password = '--';

login(maximLoginData); // Неверный пароль!
login(maximLoginData); // Неверный пароль!
login(maximLoginData); // Неверный пароль! Вы заблокированы!

maximLoginData.password = '123456';
login(maximLoginData); // Вы заблокированы!
login(maximLoginData); // Вы заблокированы!

/**
 * Проверяем Михаила, счетчик его неверных попыток входа должен сбрасываться
 * Блокировка не должна происходить
 */
console.log('\n\nПроверка Михаила:');
const mihailLoginData: LoginData = { ...mihail };

login(mihailLoginData); // Добро пожаловать, mihail

mihailLoginData.password = '-';
login(mihailLoginData); // Неверный пароль!
login(mihailLoginData); // Неверный пароль!

mihailLoginData.password = mihail.password;

login(mihailLoginData); // Добро пожаловать, mihail

mihailLoginData.password = '-';
login(mihailLoginData); // Неверный пароль!
login(mihailLoginData); // Неверный пароль!

mihailLoginData.password = mihail.password;

login(mihailLoginData); // Добро пожаловать, mihail

/**
 * Проверяем несуществующего пользователя
 */
console.log('\nПроверяем несуществующего пользователя:');
login({ email: 'a@a.a', password: 'a' }); // Пользователь не найден!
