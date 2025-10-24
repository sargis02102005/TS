import chalk from 'chalk';

type statusOrder = 'pending' | 'preparing' | 'delivering' | 'completed';

type Order = {
  id: number;
  amount: number;
  status: statusOrder;
};

const printOrder = (order: Order) => {
  const messades = {
    pending: chalk.yellow('Ожидает обработки'),
    preparing: chalk.red('Готовится!'),
    delivering: chalk.blue('Доставка!'),
    completed: chalk.green('Выполнен!'),
  };
  console.log(chalk.bgBlack(`Заказ #${order.id}: ${messades[order.status]}`));
};

printOrder({ id: 1, amount: 500, status: 'preparing' });

printOrder({ id: 6, amount: 2000, status: 'delivering' });
