const storage = [
  { age: 10, name: 'first' },
  { age: 20, name: 'second' },
  { age: 30, name: 'third' },
  { age: 40, name: 'fourth' },
];

const smalls = storage.map((s) => s.age > 20);

console.log(smalls); // [ false, false, true, true ]
