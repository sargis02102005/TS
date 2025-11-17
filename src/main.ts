import { faker, fakerRU } from '@faker-js/faker';

const possibleTasks = ['Купить кота', 'Продать кота', 'Помыть кота', 'Купить арбуз'];

type User = {
  id: string; // nanoid длиной 6 символов, используйте faker.string.nanoid
  name: string; // обязательно русское
  email: string;
  company: string; // название компании (использовать .company)
  tasks: string[]; // От 0 до 2х рандомных задач из массива possibleTasks (взять используя faker.helpers)
};

const generateUsers = () => {
  const Count = faker.number.int({ min: 3, max: 6 });
  const users: User[] = [];

  for (let i = 0; i < Count; i++) {
    const taskCount = faker.number.int({ min: 0, max: 2 });
    const randomTasks = faker.helpers.arrayElements(possibleTasks, taskCount);

    const user: User = {
      id: faker.string.nanoid(6),
      name: fakerRU.person.fullName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      tasks: randomTasks,
    };

    users.push(user);
  }

  return users;
};

// Функция для форматирования списка дел пользователя
const formatUserTasks = (user: User[]) => {
  for (const task of user) {
    const Count = task.tasks.length;
    const Text = Count === 0 ? 'Нет' : `${Count}`;

    console.log(`Пользователь "${task.name}" (id="${task.id}"): ${Text} дел на сегодня`);
  }
};

formatUserTasks(generateUsers());
