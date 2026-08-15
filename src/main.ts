type Cargo = {
  model: string;
  no: string;
};

type Model = {
  model: string;
  no: string;
  cargo: Cargo | null;
};

type Tourist = {
  id: number;
  name: string;
  car: Model | null;
};

const john: Tourist = { id: 1, name: 'Джон', car: null };

const max: Tourist = {
  id: 4,
  name: 'Максим',
  car: { model: 'Тойота Приус', no: 'A777MP777', cargo: null },
};

const gena: Tourist = {
  id: 82,
  name: 'Гена',
  car: {
    model: 'Форд Фокус',
    no: 'Ч123МО054',
    cargo: { model: 'Крытый прицеп', no: '-' },
  },
};

const isTouristReady = (src: Tourist) => {
  if (!src.car) return false;
  return !!src.car.cargo;
};

console.log(isTouristReady(john));
console.log(isTouristReady(max));
console.log(isTouristReady(gena));
