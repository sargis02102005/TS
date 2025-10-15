type A = {
  age?: number | string;
  nick?: string;
  info?: string[] | number[] | { id?: number };
  photo?: string | null;
};

const a1: A = {
  age: 10,
  nick: 'mynick',
  info: [1, 100],
  photo: 'string',
};

const a2: A = {
  age: '10 years',
  nick: '',
  info: { id: 100 },
  photo: null,
};

const a3: A = {
  nick: '       ',
  info: ['secret', 'key'],
};

const a4: A = {
  nick: '',
  info: {},
};

console.log(a1);
console.log(a2);
console.log(a3);
console.log(a4);
