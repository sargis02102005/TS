import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './src/generated/client';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('❌ DATABASE_URL не задан в .env');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function test() {
  try {
    console.log('🔍 Проверяем подключение к БД...');
    const count = await prisma.user.count();
    console.log('✅ Подключение к БД работает, количество пользователей:', count);
  } catch (error) {
    console.error('❌ Ошибка при работе с БД:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
