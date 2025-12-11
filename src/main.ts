type Units = 'gb' | 'mb' | 'kb' | 'b';

type FileInfo = {
  name: string;
  size: number;
  units: Units;
};

type SpeedInfo = {
  speedPerSecond: number;
  units: Units;
};

const convertToBytes = (value: number, units: Units) => {
  const powers = {
    b: 0,
    kb: 1,
    mb: 2,
    gb: 3,
  };

  return value * Math.pow(1000, powers[units]);
};

const downloadTimeCalculator = (file: FileInfo, speed: SpeedInfo) => {
  const fileSizeInBytes = convertToBytes(file.size, file.units);

  const speedSizeInBytes = convertToBytes(speed.speedPerSecond, speed.units);

  return Math.ceil(fileSizeInBytes / speedSizeInBytes);
};

/**
 * Первая итерация - просто посчитать сколько СЕКУНД будет скачиваться файл.
 * Например 30, или 100, или 3900, или 100450000000
 *
 * Вторая итерация - выводить ответ в днях, часах, минутах и секундах
 */

const timeCalculator = (a: number) => {
  const timeDays = Math.floor(a / (24 * 3600));

  const timeHours = Math.floor((a % (24 * 3600)) / 3600);

  const minutes = Math.floor((a % 3600) / 60);

  const seconds = Math.floor(a % 60);

  return { timeDays, timeHours, minutes, seconds };
};

const testCases = [
  [10000, { name: 'День рождения.mp4', size: 1, units: 'gb' }, { speedPerSecond: 100, units: 'kb' }],
  [1024, { name: 'Отчёт.docx', size: 1023443, units: 'kb' }, { speedPerSecond: 1, units: 'mb' }],
  [1, { name: 'Голосовое сообщение.mp3', size: 1, units: 'b' }, { speedPerSecond: 1000, units: 'gb' }],
  [86402, { name: 'Корги.png', size: 100.45, units: 'mb' }, { speedPerSecond: 1162.6, units: 'b' }],
  [100450000000, { name: 'GTA V', size: 100.45, units: 'gb' }, { speedPerSecond: 1, units: 'b' }],
] as const;

/**
 * Цикл для проверки каждого тест-кейса по очереди
 */
for (const testCase of testCases) {
  const [expected, file, speed] = testCase;

  const result = downloadTimeCalculator(file, speed);

  const time = timeCalculator(result);
  console.log(
    `Файл ${file.name} будет скачиваться ${time.timeDays} дней ${time.timeHours} часов ${time.minutes} минут ${time.seconds} секунд`,
  );
}
/* Файл День рождения.mp4 будет скачиваться 0 дней 2 часов 46 минут 40 секунд
Файл Отчёт.docx будет скачиваться 0 дней 0 часов 17 минут 4 секунд
Файл Голосовое сообщение.mp3 будет скачиваться 0 дней 0 часов 0 минут 1 секунд
Файл Корги.png будет скачиваться 1 дней 0 часов 0 минут 2 секунд
Файл GTA V будет скачиваться 1162615 дней 17 часов 46 минут 40 секунд
*/
