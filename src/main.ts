/*
Напишите программу для снятия наличных денег из банкомата.

После 3х ПОДРЯД неверных вводов пин кода карта блокируется и дальнейшие операции с ней невозможны.
Обратите внимание - именно ПОДРЯД, если человек ввёл PIN дважды неправильно, а потом правильно - счётчик обнуляется.

При успешном снятии денег необходимо вывести сумму снятия и оставшийся баланс.
Сумма снятия реально должна списываться - баланс карты должен уменьшаться.

Если на карте недостаточно средств - выводите "Недостаточно средств"
Если произошёл 3-й подряд ввод неверного PIN - выводите "Карта заблокирована"
Если происходит операция с заблокированной или несуществующей картой - выводите "Карта не обслуживается"

Для вывода успешного сообщения используйте ф-цию logGreen, передав её как колбек внутрь ф-ции withdraw.
Для вывода сообщения с ошибкой используйте ф-цию logRed, передав её как колбек внутрь ф-ции withdraw.

Так же создайте типы для описания:
* Card - описывает информацию о карте
* CallbackFn - описывает переданные колбек функции

Часть данных вам уже дана.
Вы должны повторить вывод программы так, как показано на скриншоте ниже.
 */

type CallbackFn = (text: string) => void;

type Card = {
  no: string;
  pin: number;
  balance: number;
  badTries: number;
  active: boolean;
};

const database: Card[] = [
  { no: '4276 1234 5678 9101', pin: 1234, balance: 15000, badTries: 0, active: true },
  { no: '4214 5678 9101 1121', pin: 5678, balance: 23000, badTries: 0, active: true },
  { no: '4376 1111 2222 3333', pin: 4321, balance: 5000, badTries: 0, active: true },
  { no: '4276 4444 5555 6666', pin: 8765, balance: 12000, badTries: 0, active: true },
  { no: '4214 7777 8888 9999', pin: 1357, balance: 32000, badTries: 0, active: true },
];

const separator = () => console.log('----------------------\n');

const logRed: CallbackFn = (msg: string) => {
  console.log(new Date().toISOString(), 'ERROR', msg);
};

const logGreen: CallbackFn = (msg: string) => {
  console.log(new Date().toISOString(), 'INFO', msg);
};

const withdraw = (no: string, pin: number, amount: number, success: CallbackFn, error: CallbackFn) => {
  const badTriesLimitForBlock = 3;

  let foundCard: Card | null = null;

  // Ищем карту по неё номеру
  for (const card of database) {
    if (card.no === no) {
      foundCard = card;
      break;
    }
  }

  // Если карты или она заблокирована
  if (!foundCard || !foundCard.active) {
    error('Карта не обслуживается!');
    return;
  }

  // Если PIN неверный
  if (foundCard.pin !== pin) {
    foundCard.badTries++;

    // Если это НЕ 3-я попытка подряд
    if (foundCard.badTries <= badTriesLimitForBlock) {
      error('PIN неверный!');
    } else {
      // Если это 3-я попытка подряд
      error('Карта заблокирована!');
      foundCard.active = false;
    }

    return;
  }

  // PIN верный, обнуляем попытки
  foundCard.badTries = 0;

  // Недостаточно средств
  if (foundCard.balance < amount) {
    error('Недостаточно средств!');
    return;
  }

  // Уменьшаем баланс
  foundCard.balance -= amount;

  // Выводим сообщение
  success(`Снятие наличных ${amount} руб. Баланс: ${foundCard.balance} руб`);
}; // Ваша реализация функции
// Проверка на реальное снятие баланса
console.log('Проверка на реальное снятие баланса');
withdraw('4276 1234 5678 9101', 1234, 14000, logGreen, logRed); // Снятие наличных 14000 руб. Баланс: 1000 руб
withdraw('4276 1234 5678 9101', 1234, 500, logGreen, logRed); // Снятие наличных 500 руб. Баланс: 500 руб
withdraw('4276 1234 5678 9101', 1234, 501, logGreen, logRed); // Недостаточно средств

separator();

// Проверка на несуществующую карту
console.log('Проверка на несуществующую карту');
withdraw('1111 2222 3333 4444', 1234, 501, logGreen, logRed); // Карта не обслуживается!

separator();

// Проверка, что карта блокируется после трех неправильных вводов PIN
console.log('Проверка, что карта блокируется после трех неправильных вводов PIN');
withdraw('4276 4444 5555 6666', 1111, 1, logGreen, logRed); // PIN неверный!
withdraw('4276 4444 5555 6666', 1111, 1, logGreen, logRed); // PIN неверный!
withdraw('4276 4444 5555 6666', 1111, 1, logGreen, logRed); // Карта заблокирована!
withdraw('4276 4444 5555 6666', 8765, 1, logGreen, logRed); // Карта не обслуживается!

separator();

// Проверка, что счётчик неправильных попыток сбрасывается после правильного PIN
console.log('Проверка, что счётчик неправильных попыток сбрасывается после правильного PIN');
const a = 16000;
withdraw('4214 7777 8888 9999', 1111, a, logGreen, logRed); // PIN неверный!
withdraw('4214 7777 8888 9999', 1111, a, logGreen, logRed); // PIN неверный!
withdraw('4214 7777 8888 9999', 1357, a, logGreen, logRed); // Снятие наличных 16000 руб. Баланс: 16000 руб
withdraw('4214 7777 8888 9999', 1111, a, logGreen, logRed); // PIN неверный!
withdraw('4214 7777 8888 9999', 1111, a, logGreen, logRed); // PIN неверный!
withdraw('4214 7777 8888 9999', 1357, a, logGreen, logRed); // Снятие наличных 16000 руб. Баланс: 0 руб
