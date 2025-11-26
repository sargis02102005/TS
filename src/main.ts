/*
Фраза
the quick brown fox jumps over the lazy dog

содержит все буквы английского алфавита.

Я перемешал обычный алфавит и создал свой алфавит, который замещает одни английские буквы другими. Вот та же самая фраза, но записанная с помощью нового алфавита:
oak lgypb wited zts qgfch tuki oak mjrn xtv
В данном примере буква t была изменена на o, буква h на a и так далее. Гарантируется отсутствие дубликатов, то есть одна буква нового алфавита соответствует строго одной букве старого алфавита и наоборот.

Используя эти данные, расшифруйте фразу ниже.
ntg ajuk fjbydv vikjo citvikhh yd mkjidydv qjujhpiyco. ptdvijoh!
you

Если в фразе встретились символы, которые не удалось декодировать - оставьте эти символы без изменения.

Верное решение задачи должно показать человеко-читаемый понятный текст!


 */

const shifrs = () => {
  const fraza = 'the quick brown fox jumps over the lazy dog';
  const shif = 'oak lgypb wited zts qgfch tuki oak mjrn xtv';
  const frazza = 'ntg ajuk fjbydv vikjo citvikhh yd mkjidydv qjujhpiyco. ptdvijoh!';

  let relt = '';

  let i = 0;

  while (relt.length < frazza.length) {
    let s = 0;
    while (s < shif.length) {
      if (frazza[i] === shif[s]) {
        relt += fraza[s];
        i++;
      }
      if (frazza[i] === '.' || frazza[i] === '!') {
        relt += frazza[i];
        i++;
      }
      s++;
    }
  }
  console.log(relt);
};

shifrs();
