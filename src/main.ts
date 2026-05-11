import { readFileSync } from 'node:fs';

const content = readFileSync('./append.csv', 'utf8').split('\n');
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let Index = 0;

let maxDayIndex = 0;
let maxPosition = 0;
for (const items of content) {
  for (const item of items.split(',')) {
    if (Number(item) > Index) {
      Index = Number(item);
    }
  }
  for (let j = 0; j < items.split(',').length; j++) {
    if (Index === Number(items.split(',')[j])) {
      maxPosition = j + 1;
      maxDayIndex++;
      break;
    }
  }
}

const day = days[maxDayIndex % 7];

console.log(`Наибольший заказ - ${Index}
Он сделан в ${day}, по порядку #${maxPosition}`);
