/*
Создать CRUD-функции для сущности User.

CRUD это набор базовых функций для работы с какой-то сущностью:
* Create - создание
* Read - чтение по id
* Update - обновить по id
* Delete - удалить по id

Create
Ф-ция createUser(data) должна записать пользователя в database, а так же выдать ему случайный id, используя faker.string.nanoid длиной 5
Возвращать она должна только что созданного пользователя

Read
Ф-ция getUserById(id) должна искать пользователя в database и отдавать либо найденного пользователя, либо null

Update
Ф-ция updateUserById(id, data) принимает на вход id и новые данные для обновления, и обновляет пользователя в database.
Все поля во втором аргументе - опциональные, можно менять все поля User, кроме id

Delete
Ф-ция deleteUserById(id) принимает на вход id и возвращает true/false - удалось ли удалить пользователя из database:
 * Он был в базе и успешно удален из базы - вернуть true
 * Пользователя с таким id не было в базе - вернуть false

При этом все функции должны обеспечивать безопасность данных, то есть не выводить пароль пользователя!


Пример использования ниже:
 */

import { faker } from '@faker-js/faker';

type User = {
  // Описать тип
  id: string;
  name: string;
  email: string;
  password: string;
};

type CreateUserData = Record<'name' | 'email' | 'password', string>;

const database: User[] = [];

const createUser = (user: CreateUserData) => {
  database.push({
    id: faker.string.uuid(),
    ...user,
  });
  const data = database[database.length - 1];

  return {
    id: data.id,
    name: data.name,
    email: data.email,
  };
};

const getUserById = (id: string) => {
  for (const user of database) {
    if (user.id === id) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }
  return null;
};

const updateUserById = (id: string, users: Record<'name', string>) => {
  for (const user of database) {
    if (user.id === id) {
      user.name = users.name;
    }
  }
  return null;
};

const deleteUserById = (id: string) => {
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === id) {
      database.splice(i, 1);
      return true;
    }
  }
  return false;
};

// [CREATE] Создаём нового пользователя
const maxim = createUser({ name: 'Maxim', email: 'maxim@mail.ru', password: '123' });
console.log(maxim); // { id: 'SwoPd', name: 'Maxim', email: 'maxim@mail.ru' }   (id взят случайный, у вас он будет другой)

// [READ] Ищем пользователя по id
console.log(getUserById(maxim.id)); // { id: 'SwoPd', name: 'Maxim', email: 'maxim@mail.ru' } - находим его в database

// [UPDATE] Обновляем имя у пользователя с id=SwoPd
updateUserById(maxim.id, { name: 'max' });
// Ищем пользователя по id=SwoPd и находим его, у него в базе будет уже новое имя
console.log(getUserById(maxim.id)); // { id: 'SwoPd', name: 'max', email: 'maxim@mail.ru' }

// [DELETE] Удаляем пользователя по id=SwoPd
console.log(deleteUserById(maxim.id)); // true
// Ищем пользователя по такому id и ничего не находим
console.log(getUserById(maxim.id)); // null
// Повторно пытаемся удалить пользователя по id=SwoPd и удалено не проходит
console.log(deleteUserById(maxim.id)); // false
