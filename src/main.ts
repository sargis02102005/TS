import { readFileSync } from 'fs';

const users = [];

// ... Вот здесь ваш код ...
const readData = readFileSync('./users.csv', 'utf8').split('\n');

for (let i = 1; i < readData.length; i++) {
  const [id, name, email, age] = readData[i].split(',');

  users.push({ id: Number(id), name, email, age: Number(age) });
}

console.log(users);
/* Вывод:
[
  {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan.pетров@email.ru',
    age: 28
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    email: 'maria.sidorova@mail.ru',
    age: 34
  },
  {
    id: 3,
    name: 'Алексей Иванов',
    email: 'alex.ivanov@yandex.ru',
    age: 22
  },
  {
    id: 4,
    name: 'Елена Козлова',
    email: 'elena.kozlova@gmail.com',
    age: 41
  },
  {
    id: 5,
    name: 'Дмитрий Смирнов',
    email: 'dmitry.smirnov@outlook.ru',
    age: 29
  },
  {
    id: 6,
    name: 'Ольга Кузнецова',
    email: 'olga.kuznetsova@mail.ru',
    age: 37
  },
  {
    id: 7,
    name: 'Сергей Морозов',
    email: 'sergey.morozov@yandex.ru',
    age: 25
  }
]
 */
