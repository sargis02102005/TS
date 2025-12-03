/*
Вам дан список станций, а так же 2 маршрута поезда.

Необходимо написать ф-цию, которая выводит номер, название маршрута и список станций по порядку
 */

type Station = {
  // Описать ...
  id: number;
  name: string;
};

type Route = {
  // Описать ...
  id: number;
  stationIds: number[];
};

const stations: Station[] = [
  { id: 9, name: 'Ростов-на-Дону' },
  { id: 13, name: 'Москва' },
  { id: 19, name: 'Санкт-петербург' },
  { id: 2, name: 'Воронеж' },
  { id: 7, name: 'Краснодар' },
  { id: 55, name: 'Сочи' },
  { id: 71, name: 'Адлер' },
];

const route56: Route = {
  id: 56,
  stationIds: [19, 13, 2, 9, 7],
};

const route9: Route = {
  id: 9,
  stationIds: [9, 7, 55, 71],
};

const showRoute = (route: Route) => {
  const relt = [];

  for (const items of route.stationIds) {
    for (const station of stations) {
      if (items === station.id) {
        relt.push(station.name);
      }
    }
  }
  console.log(`Поезд #${route.id} ${relt[0]} - ${relt[relt.length - 1]}`);
  console.log('Остановки:');
  for (let i = 1; i <= relt.length; i++) {
    console.log(`${i}. ${relt[i - 1]}`);
  }
};

showRoute(route56); // Должен быть вывод как ниже
/*
Поезд #56 Санкт-петербург - Краснодар
Остановки:
1. Санкт-петербург
2. Москва
3. Воронеж
4. Ростов-на-Дону
5. Краснодар
 */

showRoute(route9); // Должен быть вывод как ниже
/*
Поезд #9 Ростов-на-Дону - Адлер
Остановки:
1. Ростов-на-Дону
2. Краснодар
3. Сочи
4. Адлер
 */
