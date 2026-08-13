/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { PrismaClient } from './generated/client';

const app = express();
const PORT = 3000;

// Логгер всех запросов — САМЫЙ ПЕРВЫЙ
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// Проверяем DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('❌ DATABASE_URL не задан в .env');
  process.exit(1);
}

// Адаптер для PostgreSQL
const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

// PrismaClient
const prisma = new PrismaClient({ adapter });

// Middleware
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Валидация
const createUserSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  email: z.string().email({ message: 'Неверный формат почты' }),
});

// --- CREATE ---
app.post('/users', async (req: Request, res: Response) => {
  try {
    console.log('📩 POST /users, body:', req.body);
    const result = createUserSchema.parse(req.body);
    console.log('✅ Валидация пройдена:', result);
    const newUser = await prisma.user.create({ data: result });
    console.log('✅ Пользователь создан:', newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('❌ Ошибка в POST /users:');
    console.error(error);

    // Ошибка валидации Zod
    if (error instanceof ZodError) {
      const validationErrors = (error as any).issues || (error as any).errors || [];
      return res.status(400).json({
        message: 'Ошибка валидации',
        errors: validationErrors,
      });
    }

    // Ошибка дубликата (Prisma P2002)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return res.status(409).json({
        message: 'Пользователь с таким email уже существует',
      });
    }

    // Ошибка Prisma "Record not found" (P2025)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({ message: 'Запись не найдена' });
    }

    // Все остальные ошибки
    return res.status(500).json({
      message: 'Внутренняя ошибка сервера',
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
});

// --- READ ALL ---
app.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(users);
  } catch (error) {
    console.error('❌ Ошибка в GET /users:', error);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

// --- READ ONE ---
app.get('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID должен быть числом' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    return res.json(user);
  } catch (error) {
    console.error('❌ Ошибка в GET /users/:id:', error);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

// --- UPDATE ---
app.put('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID должен быть числом' });
  }
  try {
    const result = createUserSchema.parse(req.body);
    const updated = await prisma.user.update({
      where: { id },
      data: result,
    });
    return res.json(updated);
  } catch (error: any) {
    console.error('❌ Ошибка в PUT /users/:id:', error);
    if (error instanceof ZodError) {
      const validationErrors = (error as any).issues || (error as any).errors || [];
      return res.status(400).json({ message: 'Ошибка валидации', errors: validationErrors });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

// --- DELETE ---
app.delete('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID должен быть числом' });
  }
  try {
    await prisma.user.delete({ where: { id } });
    return res.status(204).send();
  } catch (error: any) {
    console.error('❌ Ошибка в DELETE /users/:id:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

// Запуск
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
