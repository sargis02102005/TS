type User = {
  id: number;
  name?: string;
  email: string;
};

type Item = {
  id: number;
  name: string;
  price: number;
  count?: number; // Если count не указан, по умолчанию считать количество 1
};

type DiscountCard = {
  id: number;
  series: number;
};

type Order = {
  id: number;
  user: User | null;
  card: DiscountCard | null;
  items: Item[];
};

const f = (orders: Order[]) => {
  if (orders.length === 0) {
    console.log('Нет, заказа!');
    return;
  }

  for (const order of orders) {
    if (order.id) {
      console.log(`Заказ #${order.id}`);
    }

    console.log('------------');

    if (order.user) {
      console.log(`Клиент:`);
      console.log(`id: ${order.user.id}`);
      console.log(`имя: ${order.user.name || 'Не указано'}`);
      console.log(`email: ${order.user.email}`);
    } else {
      console.log('Клиент: Не указан');
    }

    console.log('------------');

    if (order.card) {
      console.log(`Скидочная карта:`);
      console.log(`id: ${order.card.id}`);
      console.log(`номер: ${order.card.series}`);
    } else {
      console.log('Скидочная карта: Не применена');
    }

    console.log('------------');

    console.log('Список покупок:');
    let totalItems = 0;
    let totalPrice = 0;

    for (const item of order.items) {
      const count = item.count || 1;
      const itemTotal = item.price * count;

      console.log(`- ${item.name}  ${item.price} руб ${count}шт`);

      totalItems += count;
      totalPrice += itemTotal;
    }
    console.log('------------');
    console.log(`Итого: ${totalItems} товаров на сумму ${totalPrice} руб.`);
    console.log('\n');
  }
};

const order: Order[] = [
  {
    id: 3,
    user: {
      id: 5,
      email: 'example@domain.com',
    },
    card: null,
    items: [
      { id: 6, name: 'Хлеб', price: 75, count: 3 },
      { id: 9, name: 'Вафли', price: 95.9, count: 1 },
      { id: 12, name: 'Набор конфет', price: 350 },
    ],
  },
];

f(order);

const order1: Order[] = [
  {
    id: 3,
    user: null,
    card: null,
    items: [
      { id: 6, name: 'Хлеб', price: 75, count: 3 },
      { id: 9, name: 'Вафли', price: 95.9, count: 1 },
      { id: 12, name: 'Набор конфет', price: 350 },
    ],
  },
];

f(order1);

const order2: Order[] = [
  {
    id: 3,
    user: {
      id: 5,
      name: 'Алексей',
      email: 'example@domain.com',
    },
    card: { id: 8, series: 6374634 },
    items: [
      { id: 6, name: 'Хлеб', price: 75, count: 3 },
      { id: 9, name: 'Вафли', price: 95.9, count: 1 },
      { id: 12, name: 'Набор конфет', price: 350 },
    ],
  },
];

f(order2);
