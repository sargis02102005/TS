import chalk from 'chalk';

type statusOrder = 'pending' | 'preparing' | 'delivering' | 'completed';

type Order = {
  id: number;
  amount: number;
  status: statusOrder;
};

const printOrder = (order: Order) => {
  let message: string;

  switch (order.status) {
    case 'pending':
      message = chalk.yellow('Ожидает обработки');
      break;
    case 'preparing':
      message = chalk.cyan('Готовится!');
      break;
    case 'delivering':
      message = chalk.blue('Доставка!');
      break;
    default:
      message = chalk.green('Выполнен!');
  }
  console.log(`Заказ #${order.id}: ${message}`);
};

printOrder({ id: 1, amount: 500, status: 'preparing' });

printOrder({ id: 6, amount: 2000, status: 'delivering' });
