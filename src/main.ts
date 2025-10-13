/*
Напишите функцию, которая получает на вход семью и выводит в консоль список покупок этой семьи.
Если название продукта имеет чётное количество знаков - выведите название ЗАГЛАВНЫМИ БУКВАМИ, например

Опишите типы:
* Product
* Person
* Family

Часть данных вам уже дана, осталось доработать функцию.
Вывод программы должен быть таким же, как в скриншоте ниже.

 */

type Product = {
  name: string;
  count: number;
};

type Person = {
  name: string;
  products: Product[];
};

type Family = {
  name: string;
  persons: Person[];
};

const family: Family = {
  name: 'Алексеевы',
  persons: [
    {
      name: 'Отец',
      products: [
        { name: 'Кофе', count: 2 },
        { name: 'Колбаса', count: 3 },
        { name: 'Огурцы', count: 3 },
      ],
    },
    {
      name: 'Мать',
      products: [
        { name: 'Молоко', count: 1 },
        { name: 'Сыр', count: 74 },
      ],
    },
    {
      name: 'Дочь',
      products: [
        { name: 'Конфеты', count: 29 },
        { name: 'Лимонад', count: 30 },
        { name: 'Салат', count: 3 },
        { name: 'Помидоры', count: 3 },
      ],
    },
    {
      name: 'Сын',
      products: [{ name: 'Чипсы', count: 1 }],
    },
  ],
};

const printList = (family: Family) => {
  console.log(`Список покупок семьи "${family.name}"\n`);

  for (const person of family.persons) {
    console.log(`Покупки ${person.name}:`);

    for (const item of person.products) {
      const name = item.name.length % 2 ? item.name : item.name.toUpperCase();

      console.log(`  *  ${name} (${item.count})`);
    }
    console.log();
  }
};

printList(family);
