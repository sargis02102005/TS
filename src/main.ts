import { faker } from '@faker-js/faker';

const filterWithChance = (arr: any[], chance: any) => {
  return arr.filter(() => {
    const randomValue = Math.random() * 100;

    return randomValue < chance;
  });
};

const generateTestData = (count: number) => {
  const testData = [];

  for (let i = 0; i < count; i++) {
    testData.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
      city: faker.location.city(),
    });
  }
  return testData;
};

console.log('=== Тестирование функции filterWithChance ===\n');

// Тест 1: Ваш оригинальный пример
const numbers = [1, 2, 3, 4, 5, 6];
console.log('Тест 1: Числовой массив');
console.log('Исходный массив:', numbers);
console.log('Шанс: 20%');
console.log('Результат:', filterWithChance(numbers, 20));
console.log('');

// Тест 2: Строковый массив
const fruits = ['яблоко', 'банан', 'апельсин', 'груша', 'киви', 'манго'];
console.log('Тест 2: Массив фруктов');
console.log('Исходный массив:', fruits);
console.log('Шанс: 50%');
console.log('Результат:', filterWithChance(fruits, 50));
console.log('');

// Тест 3: Сгенерированные данные Faker
const fakeUsers = generateTestData(10);
console.log('Тест 3: Сгенерированные пользователи (Faker)');
console.log('Всего пользователей:', fakeUsers);
console.log('Шанс: 30%');

const filteredUsers = filterWithChance(fakeUsers, 30);
console.log('Отфильтровано пользователей:', filteredUsers.length);
console.log('Результат (первые 3 если есть):', filteredUsers.slice(0, 3));
console.log('');

// Тест 4: Крайние случаи
console.log('Тест 4: Крайние случаи');

// Шанс 0% - ничего не должно отобраться
console.log('Шанс 0%:', filterWithChance([1, 2, 3], 0));

// Шанс 100% - должно отобраться всё
console.log('Шанс 100%:', filterWithChance([1, 2, 3], 100));

// Пустой массив
console.log('Пустой массив:', filterWithChance([], 50));
