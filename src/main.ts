/*
Вам дан отдел с сотрудниками, у каждого сотрудника есть имя и его зарплата.
Ваша задача написать ф-цию analyze, которая получается на вход отдел и определияе на сколько % отличается зарплата
 между самой низкой и самой высокой.

Пример сообщения:
В отделе "Бухгалтерия" самая высокая зарплата у "Иван" - 80 тыс рублей, что на +60% больше, чем зарплата "Елена" - 50 тыс рублей.

*/

type Person = {
  // опишите
  name: string;
  salary: number;
};

type Department = {
  // опишите
  title: string;
  persons: Person[];
};

const analyze = (depar: Department) => {
  let max = depar.persons[0];
  let min = depar.persons[0];
  for (const person of depar.persons) {
    if (person.salary > max.salary) {
      max = person;
    }

    if (person.salary < min.salary) {
      min = person;
    }
  }

  const diff = Math.round(((max.salary - min.salary) / min.salary) * 100);

  console.log(
    `В отделе ${depar.title} самая высокая зарплата у ${max.name} - ${max.salary / 1000} тыс рублей, что на ${diff}% больше, чем зарплата "${min.name}" - ${min.salary / 1000} тыс рублей.`,
  );
};

const dep1: Department = {
  title: 'Бухгалтерия',
  persons: [
    { name: 'Иван', salary: 80000 },
    { name: 'Михаил', salary: 72500 },
    { name: 'Олег', salary: 65000 },
    { name: 'Елена', salary: 50000 },
  ],
};

analyze(dep1); // В отделе "Бухгалтерия" самая высокая зарплата у "Иван" - 80 тыс рублей, что на +60% больше, чем зарплата "Елена" - 50 тыс рублей.

const dep2: Department = {
  title: 'Столовая',
  persons: [{ name: 'Валентин', salary: 280000 }],
};

analyze(dep2); // В отделе "Столовая" самая высокая зарплата у "Валентин" - 280 тыс рублей, что на +0% больше, чем зарплата "Валентин" - 280 тыс рублей.

const dep3: Department = {
  title: 'Столовая',
  persons: [
    { name: 'Саша', salary: 101800 },
    { name: 'Маша', salary: 100000 },
  ],
};

analyze(dep3); // В отделе "Столовая" самая высокая зарплата у "Саша" - 101.8 тыс рублей, что на +1.8% больше, чем зарплата "Маша" - 100 тыс рублей.
