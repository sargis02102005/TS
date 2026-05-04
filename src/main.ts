import { fakerRU } from '@faker-js/faker';
import { appendFileSync, writeFileSync } from 'node:fs';

const orders = [];

for (let i = 0; i < 10; i++) {
  orders.push({
    id: fakerRU.number.int({ min: 10, max: 100000 }),
    clientName: fakerRU.person.fullName(),
    clientCountry: fakerRU.location.country(),
    clientCompany: fakerRU.company.name(),
    price: fakerRU.number.float({ min: 100, max: 100000, fractionDigits: 2 }),
    currency: fakerRU.finance.currencySymbol(),
  });
}

writeFileSync('report.txt', 'id,name,country,company,price,currency\n', { encoding: 'utf-8' });
for (const order of orders) {
  const data = [order.id, order.clientName, order.clientCountry, order.clientCompany, order.price, order.currency];

  appendFileSync('report.txt', data.join(',') + `\n`, {
    encoding: 'utf-8',
  });
}
