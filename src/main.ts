/*
Прошла школьная олимпиада.

Вам необходимо определить какое место занял каждый ученик.
Если ученик не участвовал или не решил ни одного задание - он не занял никакого места и должен находиться внизу списка.

Вам дан:
1. Список заданий (Task)
2. Список учеников (Student)
3. Список решений заданий учеников (Solution)

У каждого решения есть информация о задании, ученике, времени выполнения и успешности (то есть правильное решение или нет).
Неправильные решения учитывать не нужно.

За каждое задание даётся разное количество баллов.
Необходимо вывести по убыванию учеников и полученное в олимпиаде место.
* Если количество баллов у двух учеников одинаковое - место выше получит тот, кто потратил меньше времени на решение.
* Если оба ученика не смогли решить ни одной задачи (или не участвовали), тогда выше по списку должен находиться тот, у кого больше попыток решения.

Вы должны вывести вот такой список с такой информацией:
1. Игорь Игнатенко (8 баллов, 3ч)
2. Михаил Смирнов (4 балла, 1ч 1мин 1сек)
3. Алексей Михайлов (4 балла, 1ч 59м 59с)
4. Иван Петров (3 балла, 0ч 7м 3с)
5. Владислав Торопыгин (0 баллов, 4 попытки решения)
6. Антон Синяков (0 баллов, 0 попыток решения)
 */

type Student = {
  // Опишите учеников
  id: number;
  name: string;
};

type Task = {
  // Опишите задания
  id: number;
  title: string;
  score: number;
};

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

type Solution = {
  // Опишите решения
  id: number;
  studentId: number;
  taskId: number;
  correct: boolean;
  time: Time;
};

const students: Student[] = [
  { id: 8, name: 'Иван Петров' }, // Решил задания 1, 2 (В сумме 3 балла за 7 мин 3 сек)
  { id: 18, name: 'Алексей Михайлов' }, // Решил задание 3 (В сумме 4 балла за 1ч 59мин 59сек)
  { id: 5, name: 'Игорь Игнатенко' }, // Решил задания 2,4 (В сумме 8 баллов за 3ч)
  { id: 39, name: 'Михаил Смирнов' }, // Решил задание 3 (В сумме 4 балла за 1ч 1мин 1сек)
  { id: 22, name: 'Владислав Торопыгин' }, // Не решил ни одной задачи, но было 4 попытки решения
  { id: 27, name: 'Антон Синяков' }, // Не решил ни одной задачи, и вообще не было попыток решения
];

const tasks: Task[] = [
  { id: 1, title: 'Крысиные бега', score: 1 },
  { id: 2, title: 'Мышеловка', score: 2 },
  { id: 3, title: 'Хитрый козел', score: 4 },
  { id: 4, title: 'Шах и мат', score: 6 },
];

const solutions: Solution[] = [
  // Иван
  { id: 5, studentId: 8, taskId: 1, correct: true, time: { hours: 0, minutes: 5, seconds: 3 } },
  { id: 35, studentId: 8, taskId: 2, correct: true, time: { hours: 0, minutes: 2, seconds: 0 } },

  // Алексей
  { id: 74, studentId: 18, taskId: 3, correct: true, time: { hours: 1, minutes: 59, seconds: 59 } },
  { id: 29, studentId: 18, taskId: 4, correct: false, time: { hours: 0, minutes: 45, seconds: 45 } },

  // Игорь
  { id: 73, studentId: 5, taskId: 2, correct: true, time: { hours: 1, minutes: 20, seconds: 18 } },
  { id: 32, studentId: 5, taskId: 4, correct: true, time: { hours: 1, minutes: 25, seconds: 25 } },
  { id: 64, studentId: 5, taskId: 3, correct: false, time: { hours: 0, minutes: 14, seconds: 17 } },

  // Михаил
  { id: 45, studentId: 39, taskId: 4, correct: false, time: { hours: 0, minutes: 5, seconds: 3 } },
  { id: 90, studentId: 39, taskId: 2, correct: false, time: { hours: 0, minutes: 5, seconds: 3 } },
  { id: 10, studentId: 39, taskId: 3, correct: true, time: { hours: 1, minutes: 1, seconds: 1 } },

  // Владислав
  { id: 85, studentId: 22, taskId: 1, correct: false, time: { hours: 1, minutes: 1, seconds: 1 } },
  { id: 55, studentId: 22, taskId: 2, correct: false, time: { hours: 1, minutes: 1, seconds: 1 } },
  { id: 66, studentId: 22, taskId: 3, correct: false, time: { hours: 1, minutes: 1, seconds: 1 } },
  { id: 77, studentId: 22, taskId: 4, correct: false, time: { hours: 1, minutes: 1, seconds: 1 } },
];

type StudentInfo = {
  name: string;
  totalScore: number;
  totalSeconds: number;
  failSolutionsCount: number;
};

const convertTimeToSeconds = (time: Time) => {
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
};
const convertSecondsToTime = (seconds: number): Time => {
  let n = seconds;

  const hours = Math.floor(n / 3600);
  n = n % 3600;

  const minutes = Math.floor(n / 60);
  n = n % 60;

  return { hours, minutes, seconds: n };
};

const results: StudentInfo[] = [];

for (const student of students) {
  const successSolutions = solutions.filter((solution) => student.id === solution.studentId && solution.correct);
  const failSolutions = solutions.filter((solution) => student.id === solution.studentId && !solution.correct);

  let totalSeconds = 0;
  let totalScore = 0;
  for (const solution of successSolutions) {
    const task = tasks.find((task) => task.id === solution.taskId);
    if (!task) continue;

    totalSeconds += convertTimeToSeconds(solution.time);
    totalScore += task.score;
  }

  results.push({
    name: student.name,
    totalScore,
    failSolutionsCount: failSolutions.length,
    totalSeconds,
  });
}

results.sort((a, b) => {
  if (a.totalScore === 0 && b.totalScore === 0) {
    return a.failSolutionsCount < b.failSolutionsCount ? 1 : -1;
  }

  if (a.totalScore === b.totalScore) {
    return a.totalSeconds < b.totalSeconds ? -1 : 1;
  }

  return a.totalScore < b.totalScore ? 1 : -1;
});

for (let i = 0; i < results.length; i++) {
  const res = results[i];

  const time = convertSecondsToTime(res.totalSeconds);

  console.log(
    `${i + 1}. ${res.name} Баллов: ${res.totalScore} Время: ${time.hours} ч ${time.minutes} мин ${time.seconds} сек`,
  );
}
