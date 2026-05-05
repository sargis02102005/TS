import { readFileSync } from 'fs';

// Прочитали весь текст
const content = readFileSync('./text.txt', 'utf8');

// Разделили его в массив по строчках и вывели каждую с указанием длины
for (const line of content.split('\n')) {
  console.log(`(${line.length}) ${line}`);
}
