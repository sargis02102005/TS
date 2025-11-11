type User = {
  name: string;
  email?: string | null;
};

const users: User[] = [
  { name: 'Алексей' },
  { name: 'Мария', email: null },
  { name: 'Иван', email: '' },
  { name: 'Елена', email: 'elena@example.com' },
];

console.log(
  `${(users[0].email ?? 'не обнаружено') || 'пусто'} ${(users[1].email ?? 'не обнаружено') || 'пусто'} ${(users[2].email ?? 'не обнаружено') || 'пусто'} ${(users[3].email ?? 'не обнаружено') || 'пусто'}`,
);
