import chalk from 'chalk';

type statusOrder = 'pending' | 'preparing' | 'delivering' | 'completed';

type Order = {
  id: number;
  amount: number;
  status: statusOrder;
};

const printOrder = (order: Order) => {
  if (order.status === 'pending') {
    console.log(chalk.bgBlack(`Заказ #${order.id}:`), chalk.yellow('Ожидает обработки'));
  } else if (order.status === 'preparing') {
    console.log(chalk.bgBlack(`Заказ #${order.id}:`), chalk.red('Готовится!'));
  } else if (order.status === 'delivering') {
    console.log(chalk.bgBlack(`Заказ #${order.id}:`), chalk.blue('Доставка!'));
  } else {
    console.log(chalk.bgBlack(`Заказ #${order.id}:`), chalk.green('Выполнен!'));
  }
};

printOrder({ id: 1, amount: 500, status: 'preparing' });

printOrder({ id: 6, amount: 2000, status: 'delivering' });
