/*
Вам даны несколько списков учащихся разных школ.
Напишите функцию, которая принимает на вход список школ (переменную schools).
И выводит имена всех учеников, которым от 10 до 15 лет.
При этом выводить имена нужно по возрастанию возраста ученика (если возраст одинаковый - имена по алфавиту)

Вывод программы должен быть следующим:
Иван
Дмитрий
Александр
Дмитрий
Роман
Серафим
 */

type Student = {
  // Опишите ученика
  name: string;
  age: number;
};

const schools: Student[][] = [
  [
    // Ученики первой школы
    { age: 10, name: 'Иван' },
    { age: 13, name: 'Серафим' },
    { age: 8, name: 'Евгений' },
    { age: 11, name: 'Дмитрий' },
  ],
  [
    // Ученики второй школы
    { age: 9, name: 'Евгений' },
    { age: 10, name: 'Алексей' },
  ],
  [
    // Ученики третьей школы
    { age: 12, name: 'Александр' },
    { age: 12, name: 'Дмитрий' },
  ],
  [
    // Ученики четвертой школы
    { age: 13, name: 'Роман' },
    { age: 16, name: 'Максим' },
  ],
];

const lestStudents = (school: Student[][]) => {
  const allStudents: Student[] = [];
  for (const students of school) {
    for (const student of students) {
      allStudents.push(student);
    }
  }

  const student = allStudents.filter((item) => item.age >= 10 && item.age <= 15);
  const res = student.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));
  return res.map((item) => console.log(item.name));
};

lestStudents(schools);
