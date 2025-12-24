type User = {
  id: number;
  name: string;
  age: number;
};

type Car = {
  id: number;
  title: string;
  vin: string;
  serial: string;
  pts: Pts;
};

type Pts = {
  id: number;
  vin: string;
  owners: User[];
};

const adultOwners = (car: Car) => {
  const adultOwners = car.pts.owners.filter((owner) => owner.age >= 18);

  const ownersInfo = adultOwners.map((owner) => `${owner.name} (${owner.age})`);

  return `Автомобиль "${car.title}"
VIN: ${car.vin}
Гос. номер: ${car.serial}
Совершеннолетние владельцы: ${ownersInfo}`;
};

const prius: Car = {
  id: 38,
  title: 'Toyota Prius',
  vin: 'JTDKARFP9L3128187',
  serial: 'А777МР97',
  pts: {
    id: 849325,
    vin: 'JTDKARFP9L3128187',
    owners: [
      { id: 3401, name: 'Лёха Перекуп', age: 35 },
      { id: 1946, name: 'Вячеслав', age: 14 },
      { id: 9613, name: 'Стас', age: 7 },
      { id: 9613, name: 'Татьяна', age: 18 },
      { id: 6542, name: 'Стас друг Лёхи Перекупа', age: 73 },
      { id: 6542, name: 'Валентин', age: 73 },
    ],
  },
};

const res = adultOwners(prius);
console.log(res);

/*
Автомобиль "Toyota Prius"
VIN: JTDKARFP9L3128187
Гос. номер: А777МР97
Совершеннолетние владельцы: Лёха Перекуп (35), Татьяна (18), Валентин (73)
 */
