import { readFileSync } from 'node:fs';

const rows = readFileSync('./report.csv', 'utf8').split('\n');

const orders = [];

for (let i = 1; i < rows.length - 1; i++) {
  const [id, name, country, company, price, currency] = rows[i].split(';');

  orders.push({
    id: Number(id),
    name: String(name),
    country: String(country),
    company: String(company),
    price: Number(price),
    currency: String(currency),
  });
}

console.log(orders);
