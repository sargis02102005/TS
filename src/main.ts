import { faker } from '@faker-js/faker';
import { appendFileSync, writeFileSync } from 'node:fs';

const files = [];

for (let i = 0; i < 2000; i++) {
  files.push({
    fullName: faker.person.fullName(),

    jobTitle: faker.person.jobTitle(),
    // number
    age: faker.number.int({ min: 18, max: 100 }),

    randomNumber: faker.number.int({ min: 1, max: 1000 }),
    // internet
    email: faker.internet.email(),
    // location
    country: faker.location.country(),

    city: faker.location.city(),

    zipCode: faker.location.zipCode(),
    // commerce
    product: faker.commerce.product(),

    price: faker.commerce.price(),
    // vehicle
    vehicle: faker.vehicle.vehicle(),
    // company
    companyName: faker.company.name(),
    // date
    birthDate: faker.date.birthdate(),
    // finance
    iban: faker.finance.iban(),
  });
}

writeFileSync(
  'append.csv',
  'fullName,jobTitle,randomNumber,email,country,city,zipCode,product,price,vehicle,companyName,birthDate,iban,\n',
  { encoding: 'utf-8' },
);
for (const file of files) {
  const data = [
    file.fullName,
    file.jobTitle,
    file.randomNumber,
    file.email,
    file.country,
    file.city,
    file.zipCode,
    file.product,
    file.price,
    file.vehicle,
    file.companyName,
    file.birthDate,
    file.iban,
  ];

  appendFileSync('append.csv', data.join(',') + '\n', {
    encoding: 'utf-8',
  });
}
