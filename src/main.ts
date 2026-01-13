enum Team {
  red = 'red',
  blue = 'blue',
}

type User = {
  id: number;
  name: string;
  age: number;
};

type ProcessedUser = {
  name: string;
  isAdult: boolean;
  team: Team;
};

const users: User[] = [
  { id: 7, name: 'Александр Сильвестрович', age: 17 },
  { id: 17, name: 'Райан Сергеевич Гослинг', age: 18 },
  { id: 27, name: 'Джейсон Райанович Стетхем', age: 19 },
  { id: 37, name: 'Имя не указано', age: 8 },
];

const processUsers = (users: User[]): ProcessedUser[] => {
  // ... здесь ваш код
  const processed = users.filter((user) => user.age >= 18);

  const processUsers = processed.map((user) => {
    const team = Math.random() < 0.5 ? Team.red : Team.blue;

    return {
      name: user.name,
      isAdult: true,
      team,
    };
  });

  return processUsers;
};

const processed: ProcessedUser[] = processUsers(users);

console.log(processed);
/*
Пример вывода! Команды будут случайными!
[
 { name: 'Райан Сергеевич Гослинг', isAdult: true, team: 'red' },
 { name: 'Джейсон Райанович Стетхем', isAdult: true, team: 'blue' },
]
 */
