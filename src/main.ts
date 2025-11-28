const fraza = 'the quick brown fox jumps over the lazy dog';
const shif = 'oak lgypb wited zts qgfch tuki oak mjrn xtv';
const frazza = 'ntg ajuk fjbydv vikjo citvikhh yd mkjidydv qjujhpiyco. ptdvijoh!';

let relt = '';

for (const letter of frazza) {
  const index = shif.indexOf(letter);
  relt += fraza[index] ?? letter;
}

console.log(relt);
