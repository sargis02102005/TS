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
