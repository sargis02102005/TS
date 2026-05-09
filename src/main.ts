/*
Вам дано стихотворение.
Скопируйте его себе в текстовый файл.

Необходимо в нём все буквы "а" заменить на буквы "о" и обновлённое стихотворение записать в новый файл.
Замена должна быть и для заглавных, и для прописных букв.

✦ 🔥 Усложнённая версия (необязательно) - замените буквы "о" на "а" и "а" на "о"
То есть, поменяйте буквы "а" и "о" местами. Обновлённое стихотворение запишите в новый файл.

 */
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';

const content = readFileSync('./text.txt', 'utf8');

writeFileSync('./append.txt', '', 'utf-8');
for (const item of content.split('\n')) {
  if (item.includes('а') || item.includes('А')) {
    appendFileSync('./append.txt', item.replace(/а/g, 'о').replace(/А/g, 'О') + '\n', 'utf-8');
  }
}
