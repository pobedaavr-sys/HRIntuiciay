import express from 'express';
import { createServer as createViteServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import multer from 'multer';
import mammoth from 'mammoth';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'hr-intuition-secret-key-2026';
const upload = multer({ storage: multer.memoryStorage() });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Auth
  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { username: user.username, role: user.role } });
  });

  // Public: Get Vacancies
  app.get('/api/vacancies', async (req, res) => {
    const vacancies = await prisma.vacancy.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(vacancies);
  });

  // HR: Vacancy Management
  app.post('/api/hr/vacancies', async (req, res) => {
    const { name, description, requirements } = req.body;
    const vacancy = await prisma.vacancy.create({
      data: { name, description, requirements }
    });
    res.json(vacancy);
  });

  app.put('/api/hr/vacancies/:id', async (req, res) => {
    const { name, description, requirements } = req.body;
    const vacancy = await prisma.vacancy.update({
      where: { id: req.params.id },
      data: { name, description, requirements }
    });
    res.json(vacancy);
  });

  app.delete('/api/hr/vacancies/:id', async (req, res) => {
    await prisma.vacancy.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  });

  // HR: Import Vacancy from HH.ru or Text
  app.post('/api/hr/vacancies/import', async (req, res) => {
    const { url, text } = req.body;
    
    try {
      let prompt = '';
      let config: any = { responseMimeType: "application/json" };

      if (url) {
        prompt = `Extract vacancy details (title, description, requirements) from this URL: ${url}. Return as JSON with keys: name, description, requirements. Language: Russian.`;
        config.tools = [{ urlContext: {} }];
      } else {
        prompt = `Extract vacancy details (title, description, requirements) from the following text. Return as JSON with keys: name, description, requirements. Language: Russian. Content: ${text}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config
      });
      
      const result = JSON.parse(response.text || '{}');
      res.json(result);
    } catch (error) {
      console.error('Import error:', error);
      res.status(500).json({ error: 'Failed to parse vacancy' });
    }
  });

  // HR: Import Vacancy from File
  app.post('/api/hr/vacancies/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    let fileContent = '';
    
    if (req.file.originalname.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      fileContent = result.value;
    } else {
      fileContent = req.file.buffer.toString('utf-8'); // Simplified for text-based files
    }
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Extract vacancy details (title, description, requirements) from the following file content. Return as JSON with keys: name, description, requirements. Content: ${fileContent}`,
        config: { responseMimeType: "application/json" }
      });
      
      const result = JSON.parse(response.text || '{}');
      res.json(result);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to parse file' });
    }
  });

  // Public: Get Tests
  app.get('/api/tests', async (req, res) => {
    const tests = await prisma.test.findMany({
      include: { questions: true },
      orderBy: { order: 'asc' }
    });
    res.json(tests);
  });

  // Candidate: Start Session
  app.post('/api/candidate/start', async (req, res) => {
    const { fullName, email, phone, vacancyId, inviteCode, testIds } = req.body;
    
    let candidate = await prisma.candidate.findFirst({ where: { email } });
    if (!candidate) {
      candidate = await prisma.candidate.create({
        data: { fullName, email, phone, vacancyId }
      });
    }

    const session = await prisma.session.create({
      data: {
        candidateId: candidate.id,
        vacancyId,
        testIds: JSON.stringify(testIds || []),
        inviteCode: inviteCode || Math.random().toString(36).substring(7).toUpperCase(),
        status: 'STARTED',
        startedAt: new Date(),
      }
    });

    res.json(session);
  });

  // Candidate: Get Session & Tests
  app.get('/api/candidate/session/:id', async (req, res) => {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: { candidate: true, vacancy: true }
    });
    if (!session) return res.status(404).json({ error: 'Сессия не найдена' });
    
    const selectedTestIds = JSON.parse(session.testIds || '[]');
    
    const tests = await prisma.test.findMany({
      where: selectedTestIds.length > 0 ? { id: { in: selectedTestIds } } : {},
      include: { questions: true },
      orderBy: { order: 'asc' }
    });
    
    res.json({ session, tests });
  });

  // Candidate: Submit Answer
  app.post('/api/candidate/answer', async (req, res) => {
    const { sessionId, testId, questionId, answer } = req.body;
    const response = await prisma.response.create({
      data: { sessionId, testId, questionId, answer: String(answer) }
    });
    res.json(response);
  });

  // Candidate: Complete Session
  app.post('/api/candidate/complete', async (req, res) => {
    const { sessionId } = req.body;
    const session = await prisma.session.update({
      where: { id: sessionId },
      data: { status: 'COMPLETED', completedAt: new Date() }
    });

    res.json(session);
  });

  // Candidate: Get Results (Public summary)
  app.get('/api/candidate/results/:sessionId', async (req, res) => {
    const session = await prisma.session.findUnique({
      where: { id: req.params.sessionId },
      include: {
        candidate: { include: { vacancy: true } },
        responses: { include: { question: true } },
      }
    });
    
    if (!session || session.status !== 'COMPLETED') {
      return res.status(404).json({ error: 'Результаты еще не готовы или сессия не найдена' });
    }

    // Compute scores
    const tests = await prisma.test.findMany({ include: { questions: true } });
    const scores = tests.map(test => {
      const testResponses = session.responses.filter(r => r.testId === test.id) || [];
      if (testResponses.length === 0) return null;
      
      const results: Record<string, number> = {};
      testResponses.forEach(resp => {
        const weights = JSON.parse(resp.question.scaleWeights);
        const val = parseInt(resp.answer) || 0;
        Object.keys(weights).forEach(scale => {
          results[scale] = (results[scale] || 0) + (val * weights[scale]);
        });
      });
      return { testId: test.id, title: test.title, results };
    }).filter(Boolean);

    // AI Interpretation for candidate (more encouraging)
    let aiInterpretation = null;
    try {
      const prompt = `Provide a brief, encouraging psychometric summary for candidate ${session.candidate.fullName}.
      Scores: ${JSON.stringify(scores)}
      Focus on strengths and potential. Return as JSON with keys: summary (string), topStrengths (array of strings).
      Language: Russian.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      aiInterpretation = JSON.parse(response.text || '{}');
    } catch (e) {
      console.error('Candidate AI Interpretation error:', e);
    }

    res.json({ session, scores, aiInterpretation });
  });

  // HR: Dashboard Stats
  app.get('/api/hr/stats', async (req, res) => {
    const totalCandidates = await prisma.candidate.count();
    const completedSessions = await prisma.session.count({ where: { status: 'COMPLETED' } });
    const activeSessions = await prisma.session.count({ where: { status: 'STARTED' } });
    
    res.json({ totalCandidates, completedSessions, activeSessions });
  });

  // HR: Deep Analytics
  app.get('/api/hr/analytics', async (req, res) => {
    // 1. Trends: Candidates per day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sessions = await prisma.session.findMany({
      where: { startedAt: { gte: thirtyDaysAgo } },
      select: { startedAt: true }
    });

    const trendMap: Record<string, number> = {};
    sessions.forEach(s => {
      if (s.startedAt) {
        const date = s.startedAt.toISOString().split('T')[0];
        trendMap[date] = (trendMap[date] || 0) + 1;
      }
    });

    const trendData = Object.keys(trendMap).sort().map(date => ({
      date,
      count: trendMap[date]
    }));

    // 2. Decisions Distribution
    const notes = await prisma.hRNote.findMany({
      select: { decision: true }
    });
    
    const decisionMap: Record<string, number> = {
      'RECOMMENDED': 0,
      'CONDITIONAL': 0,
      'NOT_RECOMMENDED': 0,
      'PENDING': 0
    };
    
    notes.forEach(n => {
      if (n.decision) decisionMap[n.decision]++;
    });
    
    // Add pending (sessions without notes)
    const totalSessions = await prisma.session.count();
    const totalNotes = notes.length;
    decisionMap['PENDING'] = Math.max(0, totalSessions - totalNotes);

    const decisionData = Object.keys(decisionMap).map(name => ({
      name: name === 'RECOMMENDED' ? 'Рекомендован' : 
            name === 'CONDITIONAL' ? 'Условно' : 
            name === 'NOT_RECOMMENDED' ? 'Отказ' : 'На рассмотрении',
      value: decisionMap[name],
      color: name === 'RECOMMENDED' ? '#10b981' : 
             name === 'CONDITIONAL' ? '#f59e0b' : 
             name === 'NOT_RECOMMENDED' ? '#ef4444' : '#94a3b8'
    }));

    // 3. Vacancy Distribution
    const vacancies = await prisma.vacancy.findMany({
      include: { _count: { select: { sessions: true } } }
    });
    
    const vacancyData = vacancies.map(v => ({
      name: v.name,
      count: v._count.sessions
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    // 4. Test Statistics: Questions count and average time
    const tests = await prisma.test.findMany({
      include: {
        questions: { select: { id: true } },
        _count: { select: { questions: true } }
      }
    });

    const responses = await prisma.response.findMany({
      select: {
        sessionId: true,
        testId: true,
        answeredAt: true
      },
      orderBy: { answeredAt: 'asc' }
    });

    // Group responses by sessionId and testId to calculate time
    const sessionTestTimes: Record<string, Record<string, { start: Date, end: Date }>> = {};
    responses.forEach(r => {
      if (!sessionTestTimes[r.sessionId]) sessionTestTimes[r.sessionId] = {};
      if (!sessionTestTimes[r.sessionId][r.testId]) {
        sessionTestTimes[r.sessionId][r.testId] = { start: r.answeredAt, end: r.answeredAt };
      } else {
        sessionTestTimes[r.sessionId][r.testId].end = r.answeredAt;
      }
    });

    const testStats = tests.map(t => {
      const durations: number[] = [];
      Object.values(sessionTestTimes).forEach(sessionTests => {
        if (sessionTests[t.id]) {
          const duration = (sessionTests[t.id].end.getTime() - sessionTests[t.id].start.getTime()) / 1000 / 60; // in minutes
          if (duration > 0) durations.push(duration);
        }
      });

      const avgTime = durations.length > 0 
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length * 10) / 10 
        : 0;

      return {
        id: t.id,
        title: t.title,
        questionsCount: t._count.questions,
        avgTimeMinutes: avgTime
      };
    });

    res.json({ trendData, decisionData, vacancyData, testStats });
  });

  // HR: Candidate List
  app.get('/api/hr/candidates', async (req, res) => {
    const candidates = await prisma.session.findMany({
      include: {
        candidate: true,
        vacancy: true,
        hrNotes: true,
      },
      orderBy: { startedAt: 'desc' }
    });
    res.json(candidates);
  });

  // HR: Candidate Detail
  app.get('/api/hr/candidate/:sessionId', async (req, res) => {
    const session = await prisma.session.findUnique({
      where: { id: req.params.sessionId },
      include: {
        candidate: { include: { vacancy: true } },
        responses: { include: { question: true } },
        hrNotes: true,
      }
    });
    
    if (!session) return res.status(404).json({ error: 'Кандидат не найден' });

    // Compute scores
    const tests = await prisma.test.findMany({ include: { questions: true } });
    const scores = tests.map(test => {
      const testResponses = session.responses.filter(r => r.testId === test.id) || [];
      if (testResponses.length === 0) return null;
      
      const results: Record<string, number> = {};
      
      testResponses.forEach(resp => {
        const weights = JSON.parse(resp.question.scaleWeights);
        const val = parseInt(resp.answer) || 0;
        Object.keys(weights).forEach(scale => {
          results[scale] = (results[scale] || 0) + (val * weights[scale]);
        });
      });
      
      return { testId: test.id, title: test.title, results };
    }).filter(Boolean);

    // AI Interpretation (Simplified: in real app, we'd check if it's already generated)
    let aiInterpretation = null;
    try {
      const prompt = `Analyze psychometric test results for candidate ${session.candidate.fullName} for vacancy ${session.candidate.vacancy?.name || 'N/A'}.
      Scores: ${JSON.stringify(scores)}
      Provide interpretation in JSON format with keys: strengths (array of strings), risks (array of strings), interviewQuestions (array of strings).
      Language: Russian.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      aiInterpretation = JSON.parse(response.text || '{}');
    } catch (e) {
      console.error('AI Interpretation error:', e);
    }

    res.json({ session, scores, aiInterpretation });
  });

  // HR: Update Notes
    app.post('/api/hr/notes', async (req, res) => {
      const { sessionId, decision, notes, tags } = req.body;
      const hrNote = await prisma.hRNote.upsert({
        where: { sessionId },
        update: { decision, notes, tags: JSON.stringify(tags) },
        create: { sessionId, decision, notes, tags: JSON.stringify(tags) }
      });
      res.json(hrNote);
    });

  // HR: Test Management
  app.get('/api/hr/tests', async (req, res) => {
    const tests = await prisma.test.findMany({
      include: { questions: true },
      orderBy: { order: 'asc' }
    });
    res.json(tests);
  });

  app.get('/api/hr/tests/:id', async (req, res) => {
    const test = await prisma.test.findUnique({
      where: { id: req.params.id },
      include: { questions: true }
    });
    if (!test) return res.status(404).json({ error: 'Тест не найден' });
    res.json(test);
  });

  app.post('/api/hr/tests', async (req, res) => {
    const { title, description, questions } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const test = await prisma.test.create({
      data: {
        title,
        description,
        slug: `${slug}-${Math.random().toString(36).substring(7)}`,
        isCustom: true,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type || 'LIKERT',
            options: JSON.stringify(q.options || []),
            scaleWeights: JSON.stringify(q.scaleWeights || {})
          }))
        }
      },
      include: { questions: true }
    });
    res.json(test);
  });

  app.put('/api/hr/tests/:id', async (req, res) => {
    const { title, description, questions } = req.body;
    
    // Simple update: delete old questions and create new ones
    await prisma.question.deleteMany({ where: { testId: req.params.id } });
    
    const test = await prisma.test.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type || 'LIKERT',
            options: JSON.stringify(q.options || []),
            scaleWeights: JSON.stringify(q.scaleWeights || {})
          }))
        }
      },
      include: { questions: true }
    });
    res.json(test);
  });

  app.delete('/api/hr/tests/:id', async (req, res) => {
    await prisma.question.deleteMany({ where: { testId: req.params.id } });
    await prisma.test.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
