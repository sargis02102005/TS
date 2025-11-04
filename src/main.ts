import { faker } from '@faker-js/faker';

type User = {
  id: number;
  email: string;
  password: string;
  role: UserRole;
};

enum UserRole {
  ADMIN = 'admin',
  GUEST = 'guest',
  MANAGER = 'manager',
  MODERATOR = 'moderator',
}

const generateRandomUser = (n: number) => {
  const users = [];

  for (let i = 0; i < n; i++) {
    const user: User = {
      id: faker.number.int({ min: 1, max: 1000 }),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(Object.values(UserRole)),
    };
    users.push(user);
  }

  return users;
};

const filterByRole = (users: User[], role: UserRole) => {
  return users.filter((user) => user.role === role);
};

const randomUsers = generateRandomUser(10);
console.log('Все пользователи:', randomUsers.length);

const admins = filterByRole(randomUsers, UserRole.ADMIN);
console.log(`Админы (${admins.length}):`, admins);

const guests = filterByRole(randomUsers, UserRole.GUEST);
console.log(`Гости (${guests.length}):`, guests);

const managers = filterByRole(randomUsers, UserRole.MANAGER);
console.log(`Менеджеры (${managers.length}):`, managers);

const moderators = filterByRole(randomUsers, UserRole.MODERATOR);
console.log(`Модераторы (${moderators.length}):`, moderators);

console.log(`Статистика по ролям: 
Админы:${admins.length}
Гости:${guests.length}
Менеджеры:${managers.length}
Модераторы:${moderators.length}`);
