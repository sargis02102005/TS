import { faker } from '@faker-js/faker';

type User = {
  id: number;
  name: string;
  age: number;
  address: string;
  animal: Animal;
  job: Job;
};

type Animal = {
  name: string;
  species: string;
  breed: string;
};

type Job = {
  city: string;
  company: string;
  position: string;
  salary: number;
  currency: string;
};

const generateRandomUser = (): User => {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    name: faker.person.firstName(),
    age: faker.number.int({ min: 1, max: 100 }),
    address: faker.location.streetAddress(),
    animal: {
      name: faker.person.firstName(),
      species: faker.animal.type(),
      breed: faker.animal.dog(),
    },
    job: {
      city: faker.location.city(),
      company: faker.company.name(),
      position: faker.person.jobTitle(),
      salary: faker.number.int({ min: 20000, max: 200000 }),
      currency: faker.finance.currencyCode(),
    },
  };
};
console.log(generateRandomUser());
