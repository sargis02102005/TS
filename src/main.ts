import { faker } from '@faker-js/faker'; // Добавляем импорт faker
import { createHash } from 'node:crypto'; // <= показывает Ошибку
/*
C:\Users\PC\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:859
    return new TSError(diagnosticText, diagnosticCodes, diagnostics);
           ^
TSError: ⨯ Unable to compile TypeScript:
src/main.ts:2:28 - error TS2307: Cannot find module 'node:crypto' or its corresponding type declarations.

2 import { createHash } from 'node:crypto'; // <= показывает Ошибку
                             ~~~~~~~~~~~~~

    at createTSError (C:\Users\PC\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:859:12)
    at reportTSError (C:\Users\PC\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:863:19)
    at getOutput (C:\Users\PC\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1077:36)
    at Object.compile (C:\Users\PC\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1433:41)
    at Module.m._compile (C:\Users\PC\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1617:30)
    at node:internal/modules/cjs/loader:1895:10
    at Object.require.extensions.<computed> [as .ts] (C:\Users\PC\AppData\Roaming\npm\node_modules\ts-node\src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1465:32)
    at Function._load (node:internal/modules/cjs/loader:1282:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14) {
  diagnosticCodes: [ 2307 ]
}

 */

function generateHash(rawText: string): string {
  return createHash('sha256').update(rawText).digest('hex');
}

type User = {
  id: string; // Изменяем на string, т.к. используем nanoid
  name: string;
  email: string;
  password: string;
  incorrectPasswordTries?: number; // Добавляем опциональное поле
};

type RegisterData = Omit<User, 'id'>; // Исключаем id, т.к. генерируется автоматически

type LoginData = {
  email: string;
  password: string;
};

const database: User[] = [];

const register = (data: RegisterData) => {
  const { name, email, password: rawPassword } = data;

  for (const item of database) {
    if (item.email === data.email) {
      console.log(`Пользователь с email ${email} уже существует!`);
      return;
    }

    const id = faker.string.nanoid();
    const password = generateHash(rawPassword);

    database.push({
      id,
      name,
      email,
      password,
      incorrectPasswordTries: 0,
    });

    console.log(`Пользователь ${name} успешно зарегистрирован!`);
  }
};

const login = (data: LoginData) => {
  const { email, password } = data;

  for (const user of database) {
    if (user.email === email) {
      const passwordCorrect = generateHash(password) === user.password;

      if (passwordCorrect) {
        console.log(`Добро пожаловать, ${user.name}`);
      } else {
        if (user.incorrectPasswordTries === 3) {
          console.log('Вы заблокированы!');
        } else if (user.incorrectPasswordTries === 2) {
          console.log('Неверный пароль! Вы заблокированы!');
          user.incorrectPasswordTries++;
        } else {
          console.log('Неверный пароль!');
        }
      }

      return;
    }
  }
  console.log('Пользователь не найден!');
};

register({ name: 'Алексей', email: 'alex@mail.ru', password: 'alex123' });

register({ name: 'Алексей Дубль', email: 'alex@mail.ru', password: 'qwerty' });

login({ email: 'alex@mail.ru', password: 'alex123' });

login({ email: 'alex@mail.ru', password: 'a1a1a1a1' });

login({ email: 'unknown@mail.ru', password: '123456' });

register({ name: 'Мария', email: 'maria@mail.ru', password: 'maria456' });

login({ email: 'maria@mail.ru', password: 'maria456' });
