import { readFileSync } from 'fs'; // Нужно импортировать readFileSync

const content = readFileSync('./text.txt', 'utf8');

const lines = content.split('\n');
// Разделили его в массив по строчках и вывели каждую с указанием длины
for (const line of lines) {
  console.log(`(${line.length}) ${line}`);
}
