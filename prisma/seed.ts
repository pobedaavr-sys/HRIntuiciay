import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 0. Clear existing data (Optional for fresh seed)
  await prisma.hRNote.deleteMany();
  await prisma.score.deleteMany();
  await prisma.response.deleteMany();
  await prisma.question.deleteMany();
  await prisma.test.deleteMany();
  await prisma.session.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.vacancy.deleteMany();

  // 1. Create Admin
  const adminPassword = await bcrypt.hash('123456', 10);
  await prisma.user.upsert({
    where: { username: 'Admin' },
    update: {},
    create: {
      username: 'Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  // 2. Create Vacancies
  const vacancies = ['Менеджер по продажам', 'Frontend Разработчик', 'HR-менеджер', 'Аналитик данных'];
  for (const name of vacancies) {
    await prisma.vacancy.create({ data: { name } });
  }

  // 3. Create Tests
  const tests = [
    {
      slug: 'big-five',
      title: 'Большая Пятерка (OCEAN)',
      description: 'Оценка основных черт личности: открытость, добросовестность, экстраверсия, доброжелательность, нейротизм.',
      questions: [
        { text: 'Я легко завожу новые знакомства.', scaleWeights: { Extraversion: 1 } },
        { text: 'Я часто беспокоюсь о мелочах.', scaleWeights: { Neuroticism: 1 } },
        { text: 'Я всегда сочувствую другим людям.', scaleWeights: { Agreeableness: 1 } },
        { text: 'Я люблю порядок и дисциплину.', scaleWeights: { Conscientiousness: 1 } },
        { text: 'Меня интересуют абстрактные идеи.', scaleWeights: { Openness: 1 } },
      ]
    },
    {
      slug: 'disc',
      title: 'Поведенческий профиль (DISC)',
      description: 'Определение стиля поведения в рабочей среде: Доминирование, Влияние, Стабильность, Соответствие.',
      questions: [
        { text: 'В работе я ориентирован на быстрый результат.', scaleWeights: { Dominance: 1 } },
        { text: 'Мне нравится убеждать людей и вести их за собой.', scaleWeights: { Influence: 1 } },
        { text: 'Я предпочитаю спокойный и предсказуемый темп работы.', scaleWeights: { Steadiness: 1 } },
        { text: 'Я всегда следую правилам и инструкциям.', scaleWeights: { Compliance: 1 } },
      ]
    },
    {
      slug: 'cognitive',
      title: 'Когнитивный профиль',
      description: 'Оценка вербальной логики, числовых способностей и внимания.',
      questions: [
        { text: 'Продолжите ряд: 2, 4, 8, 16, ...', type: 'CHOICE', options: ['24', '32', '64', '30'], scaleWeights: { Logic: 1 } },
        { text: 'Все люди смертны. Сократ — человек. Следовательно...', type: 'CHOICE', options: ['Сократ смертен', 'Сократ грек', 'Все люди — Сократы'], scaleWeights: { Verbal: 1 } },
      ]
    },
    {
      slug: 'enneagram',
      title: 'Эннеаграмма личности',
      description: 'Глубинная мотивация и базовые страхи личности.',
      questions: [
        { text: 'Для меня важно, чтобы всё было сделано правильно и идеально.', scaleWeights: { Type1: 1 } },
        { text: 'Я всегда готов прийти на помощь другим, даже в ущерб себе.', scaleWeights: { Type2: 1 } },
        { text: 'Успех и признание моих достижений — главный двигатель для меня.', scaleWeights: { Type3: 1 } },
      ]
    },
    {
      slug: 'leadership',
      title: 'Лидерские качества',
      description: 'Стиль руководства и потенциал к управлению командой.',
      questions: [
        { text: 'Я предпочитаю принимать решения самостоятельно, не советуясь с командой.', scaleWeights: { Authoritarian: 1 } },
        { text: 'Для меня важно мнение каждого члена команды при принятии решений.', scaleWeights: { Democratic: 1 } },
        { text: 'Я ставлю четкие задачи и контролирую каждый этап их выполнения.', scaleWeights: { TaskOriented: 1 } },
      ]
    },
    {
      slug: 'sales',
      title: 'Навыки продаж',
      description: 'Оценка коммуникабельности, работы с возражениями и ориентации на результат.',
      questions: [
        { text: 'Я легко нахожу общий язык с незнакомыми людьми.', scaleWeights: { Communication: 1 } },
        { text: 'Возражение клиента для меня — это вызов, а не проблема.', scaleWeights: { Resilience: 1 } },
        { text: 'Я всегда стараюсь закрыть сделку как можно быстрее.', scaleWeights: { Closing: 1 } },
      ]
    },
    {
      slug: 'wellbeing',
      title: 'Рабочее благополучие',
      description: 'Уровень стрессоустойчивости, удовлетворенности и риск выгорания.',
      questions: [
        { text: 'Я чувствую себя энергичным и мотивированным в начале рабочего дня.', scaleWeights: { Energy: 1 } },
        { text: 'После работы я чувствую себя полностью опустошенным.', scaleWeights: { BurnoutRisk: 1 } },
        { text: 'Я доволен тем, как соблюдается баланс между моей работой и личной жизнью.', scaleWeights: { Balance: 1 } },
      ]
    },
    {
      slug: 'team-roles',
      title: 'Командные роли',
      description: 'Предпочтительная роль в коллективе по методике Белбина.',
      questions: [
        { text: 'Мне нравится генерировать новые, нестандартные идеи.', scaleWeights: { Plant: 1 } },
        { text: 'Я хорошо организую работу других и распределяю задачи.', scaleWeights: { Coordinator: 1 } },
        { text: 'Я всегда довожу начатое до конца и проверяю детали.', scaleWeights: { Completer: 1 } },
      ]
    }
  ];

  for (const t of tests) {
    const createdTest = await prisma.test.create({
      data: {
        slug: t.slug,
        title: t.title,
        description: t.description,
      }
    });

    for (const q of t.questions as any[]) {
      await prisma.question.create({
        data: {
          testId: createdTest.id,
          text: q.text,
          type: q.type || 'LIKERT',
          options: JSON.stringify(q.options || []),
          scaleWeights: JSON.stringify(q.scaleWeights),
        }
      });
    }
  }

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
