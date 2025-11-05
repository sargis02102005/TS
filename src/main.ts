/*
Дано:
Больница, имеющая список палат, в каждой палате список пациентов.

Каждая палата содержит информацию о:
* Номер палаты
* Список пациентов

Каждый пациент содержит информацию о:
* Своём имени
* Температуре

Ваша задача, вывести список палат с указанием средней температуры в каждой палате,
а так же с указанием средней температуры по всей больнице.

*/

type Patient = {
  // описать тип
  name: string;
  temp: number;
};

type Room = {
  // описать тип
  name: string;
  patients: Patient[];
};

// По всей больнице средняя температура 37.792 (пустые палаты в расчет не идут, температура округлена до 3х знаков после запятой)
const hospital: Room[] = [
  {
    name: 'A-123', // Средняя температура 36.6
    patients: [
      { name: 'Мария', temp: 36.8 },
      { name: 'Валентин', temp: 36.4 },
    ],
  },
  {
    name: 'B-093', // Средняя температура 40
    patients: [{ name: 'Алексей', temp: 40.0 }],
  },
  {
    name: 'C-107', // Средняя температура 0
    patients: [],
  },
  {
    name: 'D-246', // Средняя температура 36.775
    patients: [
      { name: 'Михаил', temp: 34.9 },
      { name: 'Анатолий', temp: 38.9 },
      { name: 'Гарик', temp: 37 },
      { name: 'Антон', temp: 36.3 },
    ],
  },
];

const calculateTemperature = (rooms: Room[]) => {
  let sumTemp = 0;
  let sumCount = 0;
  for (const room of rooms) {
    if (room.patients.length === 0) {
      continue;
    }
    let result = 0;

    for (const patient of room.patients) {
      result += patient.temp;
      sumTemp += patient.temp;
    }
    sumCount += room.patients.length;
    const roomAverage = result / room.patients.length;
    const roundedRoomAverage = Math.round(roomAverage * 1000) / 1000;

    console.log(`Палата ${room.name}: ${roundedRoomAverage} C`);
  }
  const roomhospital = sumTemp / sumCount;
  const roundedHospitalAverage = Math.round(roomhospital * 1000) / 1000;

  console.log(`Вся больница: ${roundedHospitalAverage} C`);
};

calculateTemperature(hospital);
// Ожидаемый вывод программы:
/*
Палата [A-123]: 36.6 C
Палата [B-093]: 40 C
Палата [D-246]: 36.775 C
Вся больница: 37.792 C
*/
