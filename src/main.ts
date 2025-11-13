// Регистрация -> в БД добавляется новый объект пользователя (с указанием его почты, пароля, имени)

// register({ name: "Алексей", email: "alex@mail.ru", password: "alex123" })
// Ф-ция register должна сохранить этого пользователя в базу (добавить в массив database)

// login({ email: "alex@mail.ru", password: "a1a1a1a1" }) => Пароль неверный!
// login({ email: "alex@mail.ru", password: "alex123" }) => Добрый день, Алексей!
// Ф-ция login должна принимать на вход - почту и пароль, искать в БД пользователя с такой почтой,
// далее, если пароль правильный - выводить приветствие, если неправильный - выводить сообщение об этом.
// Описать типы - User, RegisterData, LoginData

type User = {
  name: string;
  email: string;
  password: string;
};

type RegisterData = User;

type LoginData = {
  email: string;
  password: string;
};

const database: User[] = [];

const register = (data: RegisterData) => {
  for (const item of database) {
    if (item.email === data.email) {
      return false;
    }
  }
  return database.push(data);
};

const login = (data: LoginData) => {
  for (const item of database) {
    if (item.email === data.email) {
      if (item.password === data.password) {
        console.log(`Добрый день, ${item.name}!`);
      } else {
        console.log('Пароль неверный!');
      }
      return;
    }
  }
  console.log('Пользователь с такой почтой не найден!');
};

register({ name: 'Алексей', email: 'alex@mail.ru', password: 'alex123' });

register({ name: 'Алексей Дубль', email: 'alex@mail.ru', password: 'qwerty' });

login({ email: 'alex@mail.ru', password: 'alex123' });

login({ email: 'alex@mail.ru', password: 'a1a1a1a1' });

login({ email: 'unknown@mail.ru', password: '123456' });

register({ name: 'Мария', email: 'maria@mail.ru', password: 'maria456' });

login({ email: 'maria@mail.ru', password: 'maria456' });
