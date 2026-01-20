const sort = (array: User[], key: 'id' | 'age' | 'name', direction: 'asc' | 'desc' = 'asc') => {
  // Создаем копию массива
  const newArray = [...array];

  // Сортируем копию
  newArray.sort((a, b) => {
    if (a[key] < b[key]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Возвращаем отсортированную копию
  return newArray;
};

type User = { id: number; age: number; name: string };

const users: User[] = [
  { id: 1, age: 10, name: 'zxc' },
  { id: 3, age: 20, name: 'juk' },
  { id: 6, age: 2, name: 'aa' },
  { id: 9, age: 1, name: 'ab' },
  { id: 2, age: 5, name: 'zz' },
];

const sortedByIdAsc = sort(users, 'id');
console.log(sortedByIdAsc);
/* Отсортированы по увеличению id
[
  { id: 1, age: 10, name: 'zxc' },
  { id: 2, age: 5, name: 'zz' },
  { id: 3, age: 20, name: 'juk' },
  { id: 6, age: 2, name: 'aa' },
  { id: 9, age: 1, name: 'ab' }
]
 */

const sortedByNameDesc = sort(users, 'name', 'desc');
console.log(sortedByNameDesc);
/* Отсортированы по уменьшению имени
[
  { id: 2, age: 5, name: 'zz' },
  { id: 1, age: 10, name: 'zxc' },
  { id: 3, age: 20, name: 'juk' },
  { id: 9, age: 1, name: 'ab' },
  { id: 6, age: 2, name: 'aa' }
]
 */

const sortedByAgeDesc = sort(users, 'age', 'desc');
console.log(sortedByAgeDesc);
/* Отсортированы по уменьшению возраста
[
  { id: 3, age: 20, name: 'juk' },
  { id: 1, age: 10, name: 'zxc' },
  { id: 2, age: 5, name: 'zz' },
  { id: 6, age: 2, name: 'aa' },
  { id: 9, age: 1, name: 'ab' }
]
 */

console.log(users);
/* ПЕРВОНАЧАЛЬНЫЙ МАССИВ USERS ОСТАЛСЯ НЕ ТРОНУТЫМ!
[
  { id: 1, age: 10, name: 'zxc' },
  { id: 3, age: 20, name: 'juk' },
  { id: 6, age: 2, name: 'aa' },
  { id: 9, age: 1, name: 'ab' },
  { id: 2, age: 5, name: 'zz' }
]
 */
