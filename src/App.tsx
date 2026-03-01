import React, { useState, useEffect } from 'react';
import { cn } from './lib/utils';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ClipboardCheck, 
  BarChart3, 
  Settings, 
  LogOut, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  BrainCircuit,
  UserCircle,
  FileText,
  Search,
  Filter,
  Download,
  Zap,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  Play,
  Link as LinkIcon,
  Upload,
  Briefcase
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

// --- COMPONENTS ---

const Button = ({ children, className, variant = 'primary', ...props }: any) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
    white: 'bg-white text-indigo-600 hover:bg-indigo-50'
  };
  return (
    <button 
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50',
        variants[variant as keyof typeof variants],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }: any) => (
  <div className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- PAGES ---

const BackButton = ({ fallback = '/' }: { fallback?: string }) => {
  const navigate = useNavigate();
  return (
    <Button 
      variant="ghost" 
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          navigate(fallback);
        }
      }}
      className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors"
    >
      <LogOut size={18} className="rotate-180" />
      <span>Назад</span>
    </Button>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">И</div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">HR Интуиция</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/tests')}>Библиотека тестов</Button>
          <Button variant="ghost" onClick={() => navigate('/hr/login')}>Вход для HR</Button>
          <Button onClick={() => navigate('/candidate/start')}>Пройти оценку</Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mb-6">
            <BrainCircuit size={14} /> AI-ПЛАТФОРМА ДЛЯ РЕКРУТИНГА
          </div>
          <h1 className="text-7xl font-extrabold text-slate-900 leading-[1] mb-6 tracking-tight">
            Найм без <br />
            <span className="text-indigo-600 italic font-serif">HR-отдела</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
            Тестируйте кандидатов за 15 минут. AI-анализ с вердиктом: нанимать или нет. 
            Точность оценки выше, чем у опытного рекрутера.
          </p>
          <div className="flex gap-4">
            <Button className="px-10 py-5 text-lg rounded-2xl shadow-xl shadow-indigo-200" onClick={() => navigate('/candidate/start')}>Начать бесплатно</Button>
            <Button variant="secondary" className="px-10 py-5 text-lg rounded-2xl" onClick={() => navigate('/tests')}>Библиотека тестов</Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                  <UserCircle size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Александр Петров</h3>
                  <p className="text-slate-500 text-sm">Frontend Developer • 5 лет опыта</p>
                </div>
              </div>
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold tracking-wider">РЕКОМЕНДОВАН</div>
            </div>
            <div className="h-72 w-full bg-slate-50 rounded-3xl flex items-center justify-center p-4">
               <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                  { subject: 'Логика', A: 120, fullMark: 150 },
                  { subject: 'Командность', A: 98, fullMark: 150 },
                  { subject: 'Стресс', A: 86, fullMark: 150 },
                  { subject: 'Фокус', A: 99, fullMark: 150 },
                  { subject: 'Эмпатия', A: 85, fullMark: 150 },
                ]}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Radar name="Score" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <div className="text-2xl font-bold text-indigo-600">8.4</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Soft Skills</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <div className="text-2xl font-bold text-indigo-600">9.1</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Logic</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <div className="text-2xl font-bold text-indigo-600">7.8</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">EQ</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        </motion.div>
      </main>

      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 leading-tight">Раньше найм был <br /><span className="text-slate-500">устроен так:</span></h2>
              <div className="space-y-6">
                {[
                  { title: 'На просмотр резюме', desc: 'Уходит 70% времени рекрутера' },
                  { title: 'Стоимость ошибки', desc: 'До 10 окладов сотрудника' },
                  { title: 'И кандидат ушёл', desc: 'Пока вы думали, его наняли другие' },
                  { title: 'Точность интуиции', desc: 'Всего 20% попадания в цель' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 rounded-3xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600 blur-[120px] opacity-20"></div>
              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-8 leading-tight">Сейчас AI делает <br /><span className="text-indigo-500">скрининг за вас</span></h2>
                <div className="space-y-8">
                  {[
                    { step: '01', title: 'Отправьте ссылку', desc: 'Кандидат получает приглашение на тест' },
                    { step: '02', title: 'Проходит тест', desc: '15-20 минут на глубокую оценку' },
                    { step: '03', title: 'Вы получаете вердикт', desc: 'AI анализирует и дает рекомендацию' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-center">
                      <div className="text-6xl font-black text-white/10 font-serif italic">{item.step}</div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full py-5 text-lg rounded-2xl mt-8" onClick={() => navigate('/candidate/start')}>Попробовать сейчас</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">9 проверенных тестов <br /><span className="text-indigo-600">для полной картины</span></h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto">Мы объединили лучшие мировые практики психометрики в единую систему оценки.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '16PF', desc: 'Личностный профиль по Кеттеллу' },
              { title: 'Эннеаграмма', desc: 'Глубинная мотивация и страхи' },
              { title: 'DISC', desc: 'Поведенческий стиль в работе' },
              { title: 'Big Five', desc: '5 базовых черт личности' },
              { title: 'Когнитивный', desc: 'Логика и интеллект' },
              { title: 'Лидерство', desc: 'Управленческий потенциал' },
              { title: 'Продажи', desc: 'Навыки коммуникации и закрытия' },
              { title: 'Wellbeing', desc: 'Стрессоустойчивость и выгорание' },
              { title: 'Командные роли', desc: 'Место в коллективе по Белбину' },
            ].map((test, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <BrainCircuit size={24} />
                </div>
                <h4 className="font-bold text-xl mb-2">{test.title}</h4>
                <p className="text-slate-500 text-sm">{test.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 border-4 border-white rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8">Готовы нанимать <br />лучших?</h2>
          <p className="text-indigo-100 text-xl mb-12">Начните использовать AI-рекрутинг сегодня и сократите время на найм в 3 раза.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="white"
              className="px-12 py-5 text-xl rounded-2xl shadow-2xl" 
              onClick={() => navigate('/candidate/start')}
            >
              Начать бесплатно
            </Button>
            <Button 
              variant="ghost" 
              className="border-2 border-white text-white hover:bg-white/10 px-12 py-5 text-xl rounded-2xl"
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                      <FileText size={20} />
                    </div>
                    <h5 className="font-bold mb-1">Умная анкета</h5>
                    <p className="text-xs text-slate-500">Сбор данных о вакансии и опыте</p>
                  </div>
                  <div className="p-6 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                      <BrainCircuit size={20} />
                    </div>
                    <h5 className="font-bold mb-1">AI-анализ</h5>
                    <p className="text-xs text-slate-500">Глубокая интерпретация ответов</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="p-6 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                      <ClipboardCheck size={20} />
                    </div>
                    <h5 className="font-bold mb-1">Вердикт</h5>
                    <p className="text-xs text-slate-500">Финальная рекомендация HR</p>
                  </div>
                  <div className="p-6 bg-indigo-600 rounded-[2rem] shadow-xl shadow-indigo-200 text-white">
                    <div className="w-10 h-10 bg-white/20 text-white rounded-xl flex items-center justify-center mb-4">
                      <Zap size={20} />
                    </div>
                    <h5 className="font-bold mb-1">Скорость</h5>
                    <p className="text-xs text-indigo-100">Результат сразу после теста</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-bold mb-8 leading-tight">Полная картина <br /><span className="text-indigo-600">по каждому кандидату</span></h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Мы не просто даем цифры. Наша система анализирует паттерны поведения, 
                выявляет скрытые риски и подсвечивает сильные стороны, которые не видны в резюме.
              </p>
              <ul className="space-y-4">
                {[
                  'Автоматический расчет баллов по 40+ шкалам',
                  'Сравнение с профилем идеального сотрудника',
                  'Готовые вопросы для интервью на основе рисков',
                  'Прогноз совместимости с командой'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Тарифы для бизнеса</h2>
            <p className="text-slate-500">Выберите подходящий план для вашего отдела найма</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Старт', price: 'Бесплатно', features: ['2 теста', 'До 5 кандидатов', 'Базовый отчет'] },
              { name: 'Профи', price: '4 900 ₽', features: ['Все 9 тестов', 'Безлимит кандидатов', 'AI-интерпретация', 'Экспорт в PDF'], popular: true },
              { name: 'Бизнес', price: '12 900 ₽', features: ['Интеграция с ATS', 'Брендирование', 'Приоритетная поддержка', 'Командный доступ'] },
            ].map((plan) => (
              <Card key={plan.name} className={`p-8 flex flex-col ${plan.popular ? 'border-indigo-600 ring-4 ring-indigo-50' : ''}`}>
                {plan.popular && <div className="text-indigo-600 text-xs font-bold uppercase mb-4">Самый популярный</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-extrabold mb-6">{plan.price} <span className="text-sm font-normal text-slate-400">/ мес</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full">Выбрать план</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">И</div>
            <span className="text-white font-bold">HR Интуиция</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Оферта</a>
            <a href="#" className="hover:text-white transition-colors">Контакты</a>
          </div>
          <div className="text-sm">© 2026 HR Интуиция. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
};

const CandidateStart = () => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [tests, setTests] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ fullName: '', email: '', vacancyId: '', testIds: [] as string[] });

  useEffect(() => {
    fetch('/api/vacancies').then(res => res.json()).then(setVacancies);
    fetch('/api/tests').then(res => res.json()).then(setTests);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    const res = await fetch('/api/candidate/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const session = await res.json();
    navigate(`/candidate/test/${session.id}`);
  };

  const toggleTest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      testIds: prev.testIds.includes(id) 
        ? prev.testIds.filter(tid => tid !== id)
        : [...prev.testIds, id]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8 relative">
        <div className="absolute top-8 left-8">
          <BackButton />
        </div>
        <div className="mt-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">Начало оценки</h2>
              <p className="text-slate-500">Шаг {step} из 2</p>
            </div>
            <div className="flex gap-1">
              <div className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
              <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ФИО</label>
                  <input 
                    required
                    placeholder="Иванов Иван Иванович"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    required
                    type="email"
                    placeholder="ivan@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Вакансия</label>
                  <select 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                    value={formData.vacancyId}
                    onChange={e => setFormData({ ...formData, vacancyId: e.target.value })}
                  >
                    <option value="">Выберите вакансию</option>
                    {vacancies.map((v: any) => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                </div>
                <div className="pt-4">
                  <Button type="submit" className="w-full py-4 text-lg rounded-xl">Далее</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
                  {tests.map((test: any) => (
                    <div 
                      key={test.id}
                      onClick={() => toggleTest(test.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        formData.testIds.includes(test.id)
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-slate-100 hover:border-indigo-200'
                      }`}
                    >
                      <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        formData.testIds.includes(test.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                      }`}>
                        {formData.testIds.includes(test.id) && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{test.title}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-2">{test.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="secondary" className="flex-1 py-4 text-lg rounded-xl" onClick={() => setStep(1)}>Назад</Button>
                  <Button type="submit" className="flex-[2] py-4 text-lg rounded-xl" disabled={formData.testIds.length === 0}>
                    Начать тестирование ({formData.testIds.length})
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
};

const CandidateTest = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [currentTestIdx, setCurrentTestIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [showInstruction, setShowInstruction] = useState(true);
  const [localAnswers, setLocalAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch(`/api/candidate/session/${sessionId}`).then(res => res.json()).then(setData);
  }, [sessionId]);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;

  const currentTest = data.tests[currentTestIdx];
  const currentQuestion = currentTest.questions[currentQuestionIdx];

  const handleStartTest = () => {
    setShowInstruction(false);
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    } else if (currentTestIdx > 0) {
      const prevTestIdx = currentTestIdx - 1;
      setCurrentTestIdx(prevTestIdx);
      setCurrentQuestionIdx(data.tests[prevTestIdx].questions.length - 1);
      setShowInstruction(false); // Don't show instruction when going back
    }
  };

  const handleAnswer = async (answer: any) => {
    setLocalAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));

    await fetch('/api/candidate/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        testId: currentTest.id,
        questionId: currentQuestion.id,
        answer
      })
    });

    if (currentQuestionIdx < currentTest.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else if (currentTestIdx < data.tests.length - 1) {
      setCurrentTestIdx(currentTestIdx + 1);
      setCurrentQuestionIdx(0);
      setShowInstruction(true);
    } else {
      await fetch('/api/candidate/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      navigate(`/candidate/done/${sessionId}`);
    }
  };

  const handleSkip = () => {
    handleAnswer('SKIPPED');
  };

  const progress = ((currentTestIdx * 100) / data.tests.length) + 
                   ((currentQuestionIdx * 100) / (data.tests.length * currentTest.questions.length));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">И</div>
          <div className="font-bold text-slate-900">HR Интуиция</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm text-slate-500 hidden sm:block">
            Тест {currentTestIdx + 1} из {data.tests.length}: {currentTest.title}
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-slate-400 hover:text-red-600">
            <LogOut size={16} className="mr-2" /> Выйти
          </Button>
        </div>
      </div>
      <div className="h-1 bg-slate-200 w-full">
        <motion.div 
          className="h-full bg-indigo-600" 
          animate={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {showInstruction ? (
            <motion.div 
              key={`instruction-${currentTest.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl w-full"
            >
              <Card className="p-12 text-center">
                <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <BrainCircuit size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">{currentTest.title}</h2>
                <p className="text-slate-600 text-lg mb-12">
                  {currentTest.description}
                </p>
                <div className="bg-slate-50 p-6 rounded-xl mb-12 text-left">
                  <h4 className="font-bold mb-2">Инструкция:</h4>
                  <ul className="list-disc list-inside text-slate-500 space-y-2">
                    <li>Отвечайте честно и быстро</li>
                    <li>Нет правильных или неправильных ответов</li>
                    <li>Ваша первая реакция обычно самая точная</li>
                  </ul>
                </div>
                <Button className="w-full py-4 text-lg" onClick={handleStartTest}>Начать тест</Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl w-full"
            >
              <Card className="p-12">
                <div className="flex justify-between items-center mb-8">
                  <button 
                    onClick={handleBack}
                    disabled={currentTestIdx === 0 && currentQuestionIdx === 0}
                    className="text-slate-400 hover:text-indigo-600 disabled:opacity-0 flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    ← Назад
                  </button>
                  <button 
                    onClick={handleSkip}
                    className="text-slate-400 hover:text-amber-600 flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    Пропустить →
                  </button>
                </div>

                <h3 className="text-2xl font-medium text-slate-800 mb-12 text-center">
                  {currentQuestion.text}
                </h3>

                <div className="grid gap-4">
                  {currentQuestion.type === 'LIKERT' ? (
                    <div className="flex justify-between gap-2">
                      {[1, 2, 3, 4, 5].map(val => (
                        <button 
                          key={val}
                          onClick={() => handleAnswer(val)}
                          className={`flex-1 h-16 rounded-xl border-2 transition-all font-bold text-lg ${
                            String(localAnswers[currentQuestion.id]) === String(val)
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                              : 'border-slate-100 hover:border-indigo-600 hover:bg-indigo-50'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  ) : currentQuestion.type === 'CHOICE' ? (
                    (() => {
                      let options = [];
                      try {
                        options = typeof currentQuestion.options === 'string' 
                          ? JSON.parse(currentQuestion.options) 
                          : currentQuestion.options;
                      } catch (e) {
                        console.error('Failed to parse options', e);
                      }
                      return (options || []).map((opt: string) => (
                        <button 
                          key={opt}
                          onClick={() => handleAnswer(opt)}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left font-medium ${
                            localAnswers[currentQuestion.id] === opt
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                              : 'border-slate-100 hover:border-indigo-600 hover:bg-indigo-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ));
                    })()
                  ) : (
                    <div className="space-y-4">
                      <textarea 
                        className="w-full p-4 h-40 rounded-xl border-2 border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                        placeholder="Введите ваш ответ здесь..."
                        value={localAnswers[currentQuestion.id] || ''}
                        onChange={e => setLocalAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                      />
                      <Button 
                        className="w-full py-4 text-lg" 
                        onClick={() => handleAnswer(localAnswers[currentQuestion.id])}
                        disabled={!localAnswers[currentQuestion.id]}
                      >
                        Ответить
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const TestCatalog = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch('/api/tests').then(res => res.json()).then(setTests);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">И</div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">HR Интуиция</span>
        </div>
        <div className="flex gap-4 items-center">
          <BackButton />
          <Button onClick={() => navigate('/candidate/start')}>Начать оценку</Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">Библиотека тестов</h1>
        <p className="text-slate-500 mb-12 max-w-2xl text-lg">
          Наши методики основаны на проверенных психометрических инструментах. 
          Мы объединили 9 ключевых тестов для создания полной картины потенциала кандидата.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test: any) => (
            <Card key={test.id} className="p-8 hover:border-indigo-200 transition-all group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <BrainCircuit size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{test.title}</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-3">{test.description}</p>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1"><ClipboardCheck size={14} /> {test.questions?.length} вопросов</span>
                <span className="flex items-center gap-1"><Settings size={14} /> 10-15 мин</span>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

const HRLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('123456');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('hr_token', token);
      navigate('/hr/dashboard');
    } else {
      alert('Ошибка входа');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-10 relative bg-white rounded-[2.5rem]">
        <div className="absolute top-10 left-10">
          <BackButton />
        </div>
        <div className="text-center mb-10 mt-8">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-2xl shadow-indigo-500/20">И</div>
          <h2 className="text-3xl font-bold tracking-tight">HR Панель</h2>
          <p className="text-slate-500 mt-2">Войдите для управления оценками</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Логин</label>
            <input 
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              placeholder="admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Пароль</label>
            <input 
              type="password"
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full py-5 text-lg rounded-2xl mt-4 shadow-xl shadow-indigo-200">Войти в систему</Button>
        </form>
        <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong className="block mb-1">Демо-доступ:</strong>
            Логин: <code className="bg-amber-100 px-1 rounded">Admin</code><br />
            Пароль: <code className="bg-amber-100 px-1 rounded">123456</code>
          </p>
        </div>
      </Card>
    </div>
  );
};

const HRTestManagement = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTest, setCurrentTest] = useState<any>(null);

  const fetchTests = () => {
    setIsLoading(true);
    fetch('/api/hr/tests')
      .then(res => res.json())
      .then(data => {
        setTests(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleCreate = () => {
    setCurrentTest({ title: '', description: '', questions: [] });
    setIsEditing(true);
  };

  const handleEdit = (test: any) => {
    setCurrentTest({ 
      ...test, 
      questions: test.questions.map((q: any) => ({ 
        ...q, 
        options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options, 
        scaleWeights: typeof q.scaleWeights === 'string' ? JSON.parse(q.scaleWeights) : q.scaleWeights 
      })) 
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить этот тест?')) {
      await fetch(`/api/hr/tests/${id}`, { method: 'DELETE' });
      fetchTests();
    }
  };

  const handleSave = async () => {
    if (!currentTest.title.trim()) {
      alert('Пожалуйста, введите название теста');
      return;
    }
    if (currentTest.questions.length === 0) {
      alert('Добавьте хотя бы один вопрос');
      return;
    }

    const method = currentTest.id ? 'PUT' : 'POST';
    const url = currentTest.id ? `/api/hr/tests/${currentTest.id}` : '/api/hr/tests';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTest)
      });
      if (!res.ok) throw new Error('Ошибка при сохранении');
      setIsEditing(false);
      fetchTests();
    } catch (e) {
      alert('Не удалось сохранить тест. Попробуйте снова.');
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{currentTest.id ? 'Редактировать тест' : 'Новый тест'}</h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Отмена</Button>
            <Button onClick={handleSave}>Сохранить</Button>
          </div>
        </header>
        
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Название</label>
            <input 
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={currentTest.title}
              onChange={e => setCurrentTest({ ...currentTest, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <textarea 
              className="w-full p-2 border rounded-lg h-24 outline-none focus:ring-2 focus:ring-indigo-500"
              value={currentTest.description}
              onChange={e => setCurrentTest({ ...currentTest, description: e.target.value })}
            />
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Вопросы</h3>
            <Button variant="secondary" size="sm" onClick={() => setCurrentTest({ ...currentTest, questions: [...currentTest.questions, { text: '', type: 'LIKERT', options: [], scaleWeights: {} }] })}>
              <Plus size={16} className="mr-1" /> Добавить вопрос
            </Button>
          </div>
          
          {currentTest.questions.map((q: any, idx: number) => (
            <Card key={idx} className="p-4 space-y-3 relative border-l-4 border-l-indigo-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Вопрос #{idx + 1}</span>
                <button className="text-slate-400 hover:text-red-500 transition-colors" onClick={() => {
                  const newQs = [...currentTest.questions];
                  newQs.splice(idx, 1);
                  setCurrentTest({ ...currentTest, questions: newQs });
                }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <input 
                placeholder="Введите текст вопроса..."
                className="w-full p-2 border rounded-lg font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                value={q.text}
                onChange={e => {
                  const newQs = [...currentTest.questions];
                  newQs[idx].text = e.target.value;
                  setCurrentTest({ ...currentTest, questions: newQs });
                }}
              />
              <div className="flex gap-4">
                <select 
                  className="p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  value={q.type}
                  onChange={e => {
                    const newQs = [...currentTest.questions];
                    newQs[idx].type = e.target.value;
                    if (e.target.value === 'CHOICE' && (!newQs[idx].options || newQs[idx].options.length === 0)) {
                      newQs[idx].options = [''];
                    }
                    setCurrentTest({ ...currentTest, questions: newQs });
                  }}
                >
                  <option value="LIKERT">Шкала Ликерта (1-5)</option>
                  <option value="CHOICE">Выбор варианта</option>
                  <option value="TEXT">Текстовый ответ</option>
                </select>
              </div>

              {q.type === 'CHOICE' && (
                <div className="space-y-2 pl-4 border-l-2 border-indigo-100">
                  <label className="text-xs font-bold text-slate-400 uppercase">Варианты ответов:</label>
                  {q.options.map((opt: string, optIdx: number) => (
                    <div key={optIdx} className="flex gap-2">
                      <input 
                        className="flex-1 p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        value={opt}
                        onChange={e => {
                          const newQs = [...currentTest.questions];
                          newQs[idx].options[optIdx] = e.target.value;
                          setCurrentTest({ ...currentTest, questions: newQs });
                        }}
                        placeholder={`Вариант ${optIdx + 1}`}
                      />
                      <button 
                        className="text-slate-400 hover:text-red-500"
                        onClick={() => {
                          const newQs = [...currentTest.questions];
                          newQs[idx].options.splice(optIdx, 1);
                          setCurrentTest({ ...currentTest, questions: newQs });
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-indigo-600 text-xs"
                    onClick={() => {
                      const newQs = [...currentTest.questions];
                      newQs[idx].options = [...(newQs[idx].options || []), ''];
                      setCurrentTest({ ...currentTest, questions: newQs });
                    }}
                  >
                    <Plus size={12} className="mr-1" /> Добавить вариант
                  </Button>
                </div>
              )}
            </Card>
          ))}
          <div className="flex justify-center pt-4">
            <Button variant="secondary" onClick={() => setCurrentTest({ ...currentTest, questions: [...currentTest.questions, { text: '', type: 'LIKERT', options: [], scaleWeights: {} }] })}>
              <Plus size={16} className="mr-1" /> Добавить еще один вопрос
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Психометрические тесты</h2>
          <p className="text-slate-500 text-sm">Управление библиотекой тестов для оценки кандидатов</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus size={18} className="mr-2 inline" /> Создать новый тест
        </Button>
      </header>
      
      {isLoading ? (
        <div className="p-12 text-center text-slate-400">Загрузка библиотеки тестов...</div>
      ) : tests.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <BrainCircuit size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Библиотека тестов пуста</h3>
          <p className="text-slate-500 mb-6">Создайте свой первый психометрический тест, чтобы начать оценку кандидатов.</p>
          <Button onClick={handleCreate}>Создать первый тест</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test: any) => (
          <Card key={test.id} className="p-6 flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <BrainCircuit size={24} />
                </div>
                {test.isCustom && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full uppercase">Кастомный</span>
                )}
              </div>
              <h3 className="font-bold text-lg mb-2">{test.title}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2 h-10">{test.description}</p>
              <div className="text-xs text-slate-400 mb-4 flex items-center gap-2">
                <ClipboardCheck size={14} /> {test.questions.length} вопросов
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-indigo-600" 
                onClick={() => navigate(`/hr/test/preview/${test.id}`)}
                title="Запустить (Предпросмотр)"
              >
                <Play size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(test)}>
                <Edit2 size={16} />
              </Button>
              {test.isCustom && (
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(test.id)}>
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
};

const HRVacancyManagement = () => {
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState<any>(null);
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const templates = [
    {
      name: 'Менеджер отдела продаж',
      description: 'Поиск и привлечение новых клиентов, ведение переговоров, выполнение плана продаж.',
      requirements: 'Опыт в продажах от 1 года, грамотная речь, нацеленность на результат.'
    },
    {
      name: 'Руководитель отдела продаж',
      description: 'Управление командой менеджеров, разработка стратегии продаж, контроль KPI.',
      requirements: 'Опыт управления отделом от 3 лет, навыки стратегического планирования, лидерские качества.'
    }
  ];

  const fetchVacancies = () => {
    setIsLoading(true);
    fetch('/api/vacancies')
      .then(res => res.json())
      .then(data => {
        setVacancies(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleCreate = () => {
    setCurrentVacancy({ name: '', description: '', requirements: '' });
    setIsEditing(true);
  };

  const handleEdit = (v: any) => {
    setCurrentVacancy(v);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить эту вакансию?')) {
      await fetch(`/api/hr/vacancies/${id}`, { method: 'DELETE' });
      fetchVacancies();
    }
  };

  const handleSave = async () => {
    const method = currentVacancy.id ? 'PUT' : 'POST';
    const url = currentVacancy.id ? `/api/hr/vacancies/${currentVacancy.id}` : '/api/hr/vacancies';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentVacancy)
    });
    setIsEditing(false);
    fetchVacancies();
  };

  const handleImport = async () => {
    if (!importUrl) return;
    setIsImporting(true);
    try {
      const res = await fetch('/api/hr/vacancies/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: importUrl })
      });
      const data = await res.json();
      setCurrentVacancy({ ...data });
      setIsEditing(true);
      setImportUrl('');
    } catch (e) {
      alert('Ошибка при импорте');
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    setIsImporting(true);
    try {
      const res = await fetch('/api/hr/vacancies/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setCurrentVacancy({ ...data });
      setIsEditing(true);
    } catch (e) {
      alert('Ошибка при загрузке файла');
    } finally {
      setIsImporting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{currentVacancy.id ? 'Редактировать вакансию' : 'Новая вакансия'}</h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Отмена</Button>
            <Button onClick={handleSave}>Сохранить</Button>
          </div>
        </header>
        
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Название вакансии</label>
            <input 
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={currentVacancy.name}
              onChange={e => setCurrentVacancy({ ...currentVacancy, name: e.target.value })}
              placeholder="Например: Менеджер по продажам"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <textarea 
              className="w-full p-2 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-indigo-500"
              value={currentVacancy.description}
              onChange={e => setCurrentVacancy({ ...currentVacancy, description: e.target.value })}
              placeholder="Опишите вакансию..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Требования и компетенции</label>
            <textarea 
              className="w-full p-2 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-indigo-500"
              value={currentVacancy.requirements}
              onChange={e => setCurrentVacancy({ ...currentVacancy, requirements: e.target.value })}
              placeholder="Перечислите ключевые требования..."
            />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Управление вакансиями</h2>
          <p className="text-slate-500 text-sm">Создание профилей компетенций и импорт вакансий</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleCreate}>
            <Plus size={18} className="mr-2 inline" /> Создать вручную
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Import Tools */}
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-indigo-600" /> Быстрый импорт
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ссылка (hh.ru и др.)</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" 
                      placeholder="https://hh.ru/vacancy/..." 
                      value={importUrl}
                      onChange={e => setImportUrl(e.target.value)}
                    />
                  </div>
                  <Button size="sm" onClick={handleImport} disabled={isImporting || !importUrl}>
                    {isImporting ? '...' : 'Импорт'}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Файл (docx, pdf, txt)</label>
                <div className="flex gap-2">
                   <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 cursor-pointer hover:bg-slate-100 transition-all">
                    <Upload size={16} />
                    <span>{isImporting ? 'Загрузка...' : 'Выбрать файл'}</span>
                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={isImporting} />
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Vacancy List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              <div className="col-span-2 p-12 text-center text-slate-400">Загрузка вакансий...</div>
            ) : vacancies.length === 0 ? (
              <div className="col-span-2 p-12 text-center border-2 border-dashed rounded-2xl text-slate-400">
                Список вакансий пуст. Используйте импорт или создайте вручную.
              </div>
            ) : vacancies.map((v: any) => (
              <Card key={v.id} className="p-5 flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Briefcase size={20} />
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(v)}>
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(v.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{v.name}</h4>
                  <p className="text-slate-500 text-xs line-clamp-2">{v.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    {new Date(v.createdAt).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm" className="text-indigo-600 text-xs font-bold">
                    Кандидаты <ChevronRight size={12} className="ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Templates Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText size={18} className="text-amber-500" /> Готовые шаблоны
            </h3>
            <div className="space-y-3">
              {templates.map((t, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setCurrentVacancy(t);
                    setIsEditing(true);
                  }}
                  className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
                >
                  <div className="font-bold text-sm mb-1 group-hover:text-indigo-600">{t.name}</div>
                  <div className="text-xs text-slate-500 line-clamp-2">{t.description}</div>
                </button>
              ))}
            </div>
          </Card>
          
          <div className="p-6 bg-indigo-600 rounded-3xl text-white">
            <h4 className="font-bold mb-2">AI-Подбор тестов</h4>
            <p className="text-indigo-100 text-xs leading-relaxed mb-4">
              Система автоматически подберет оптимальный набор психометрических тестов на основе описания вашей вакансии.
            </p>
            <Button variant="secondary" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
              Настроить профиль
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HRAnalytics = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/hr/analytics').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <div className="p-12 text-center text-slate-400">Загрузка аналитики...</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Глубокая аналитика</h1>
          <p className="text-slate-500">Статистика и тренды подбора персонала</p>
        </div>
        <Button variant="secondary"><Download size={18} className="mr-2 inline" /> Отчет PDF</Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Chart */}
        <Card className="p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600" />
            Динамика кандидатов (30 дней)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trendData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  tickFormatter={(val) => val.split('-').slice(1).reverse().join('.')}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Decision Distribution */}
        <Card className="p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-emerald-600" />
            Распределение решений
          </h3>
          <div className="h-80 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.decisionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.decisionData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Vacancy Popularity */}
        <Card className="p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Users size={20} className="text-blue-600" />
            Популярные вакансии
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.vacancyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  width={150}
                  tick={{fill: '#475569', fontSize: 12, fontWeight: 500}}
                />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Key Insights */}
        <Card className="p-6 bg-indigo-600 text-white">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Zap size={20} className="text-amber-300" />
            Ключевые инсайты
          </h3>
          <div className="space-y-6">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-indigo-100 text-sm mb-1">Самая активная вакансия</div>
              <div className="text-xl font-bold">{data.vacancyData[0]?.name || 'Н/Д'}</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-indigo-100 text-sm mb-1">Процент рекомендаций</div>
              <div className="text-3xl font-bold">
                {Math.round((data.decisionData.find((d: any) => d.name === 'Рекомендован')?.value / 
                  data.decisionData.reduce((acc: number, d: any) => acc + d.value, 0)) * 100) || 0}%
              </div>
            </div>
            <p className="text-indigo-100 text-sm italic">
              * Данные основаны на последних 30 днях активности системы.
            </p>
          </div>
        </Card>
      </div>

      {/* Test Statistics */}
      <Card className="p-6">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <BrainCircuit size={20} className="text-indigo-600" />
          Статистика по тестам
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Название теста</th>
                <th className="px-6 py-4 font-medium text-center">Вопросов</th>
                <th className="px-6 py-4 font-medium text-center">Среднее время</th>
                <th className="px-6 py-4 font-medium">Популярность</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.testStats?.map((test: any) => (
                <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{test.title}</div>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600">
                    {test.questionsCount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-sm font-medium">
                      {test.avgTimeMinutes} мин
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full" 
                        style={{ width: `${Math.min(100, (test.avgTimeMinutes / 20) * 100)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const HRDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [candidates, setCandidates] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/hr/stats').then(res => res.json()).then(setStats);
    fetch('/api/hr/candidates').then(res => res.json()).then(setCandidates);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Дашборд', icon: BarChart3 },
    { id: 'candidates', label: 'Кандидаты', icon: Users },
    { id: 'analytics', label: 'Аналитика', icon: TrendingUp },
    { id: 'tests', label: 'Тесты', icon: BrainCircuit },
    { id: 'vacancies', label: 'Вакансии', icon: ClipboardCheck },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">И</div>
          HR Интуиция
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={20} /> {tab.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all"
            >
              <LogOut size={20} /> Выйти на сайт
            </button>
          </div>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium">
            <LogOut size={20} /> Выйти
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === 'dashboard' && (
          <>
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Обзор системы</h1>
              <div className="flex gap-3">
                <Button variant="secondary"><Download size={18} className="mr-2 inline" /> Экспорт</Button>
                <Button>+ Новое приглашение</Button>
              </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={24} /></div>
                  <span className="text-emerald-600 text-sm font-bold">+12%</span>
                </div>
                <div className="text-3xl font-bold">{stats?.totalCandidates || 0}</div>
                <div className="text-slate-500 text-sm">Всего кандидатов</div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><CheckCircle2 size={24} /></div>
                  <span className="text-emerald-600 text-sm font-bold">+5%</span>
                </div>
                <div className="text-3xl font-bold">{stats?.completedSessions || 0}</div>
                <div className="text-slate-500 text-sm">Завершено оценок</div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><BrainCircuit size={24} /></div>
                  <span className="text-slate-400 text-sm font-bold">0%</span>
                </div>
                <div className="text-3xl font-bold">{stats?.activeSessions || 0}</div>
                <div className="text-slate-500 text-sm">В процессе</div>
              </Card>
            </div>

            {/* Candidate Table */}
            <Card>
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">Последние кандидаты</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none w-64" placeholder="Поиск..." />
                  </div>
                  <Button variant="secondary" className="py-2"><Filter size={16} /></Button>
                </div>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Кандидат</th>
                    <th className="px-6 py-4 font-medium">Вакансия</th>
                    <th className="px-6 py-4 font-medium">Статус</th>
                    <th className="px-6 py-4 font-medium">Дата</th>
                    <th className="px-6 py-4 font-medium">Решение</th>
                    <th className="px-6 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {candidates.map((c: any) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/hr/candidate/${c.id}`)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                            {c.candidate.fullName[0]}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{c.candidate.fullName}</div>
                            <div className="text-xs text-slate-500">{c.candidate.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{c.vacancy?.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          c.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {c.status === 'COMPLETED' ? 'Завершено' : 'В процессе'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{new Date(c.startedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        {c.hrNotes?.decision ? (
                          <span className={`text-xs font-bold ${
                            c.hrNotes.decision === 'RECOMMENDED' ? 'text-emerald-600' : 
                            c.hrNotes.decision === 'CONDITIONAL' ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {c.hrNotes.decision}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight className="text-slate-300 inline" size={20} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </>
        )}

        {activeTab === 'candidates' && (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Список всех кандидатов</h2>
            <p className="text-slate-500">Здесь будет расширенный фильтр и поиск по всей базе.</p>
          </div>
        )}

        {activeTab === 'analytics' && <HRAnalytics />}

        {activeTab === 'tests' && <HRTestManagement />}

        {activeTab === 'vacancies' && <HRVacancyManagement />}

        {activeTab === 'settings' && (
          <div className="p-12 text-center">
            <Settings size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Настройки системы</h2>
            <p className="text-slate-500">Интеграции, управление пользователями и брендирование.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const HRCandidateDetail = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [decision, setDecision] = useState('');

  useEffect(() => {
    fetch(`/api/hr/candidate/${sessionId}`).then(res => res.json()).then(d => {
      setData(d);
      setNotes(d.session.hrNotes?.notes || '');
      setDecision(d.session.hrNotes?.decision || '');
    });
  }, [sessionId]);

  const saveNotes = async () => {
    await fetch('/api/hr/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, decision, notes, tags: [] })
    });
    alert('Сохранено');
  };

  if (!data) return <div>Загрузка...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <BackButton fallback="/hr/dashboard" />
          <h1 className="text-2xl font-bold">{data.session.candidate.fullName}</h1>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600">{data.session.candidate.vacancy?.name}</span>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary"><Download size={18} className="mr-2 inline" /> PDF Отчет</Button>
          <Button onClick={saveNotes}>Сохранить изменения</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Left: Summary & Scores */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8">
            <h3 className="text-lg font-bold mb-6">Результаты по шкалам</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {data.scores.map((score: any) => (
                <div key={score.testId} className="space-y-4">
                  <h4 className="font-medium text-slate-700 border-b pb-2">{score.title}</h4>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={Object.entries(score.results).map(([name, value]) => ({ name, value }))}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} />
                        <YAxis hide />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-lg font-bold mb-6">Интерпретация и рекомендации</h3>
            {data.aiInterpretation ? (
              <div className="space-y-6">
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <BrainCircuit size={18} /> Сильные стороны
                  </h4>
                  <ul className="list-disc list-inside text-sm text-indigo-800 space-y-1">
                    {data.aiInterpretation.strengths?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertCircle size={18} /> Зоны риска
                  </h4>
                  <ul className="list-disc list-inside text-sm text-amber-800 space-y-1">
                    {data.aiInterpretation.risks?.map((r: string, i: number) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <FileText size={18} /> Вопросы для интервью
                  </h4>
                  <div className="space-y-2">
                    {data.aiInterpretation.interviewQuestions?.map((q: string, i: number) => (
                      <p key={i} className="text-sm text-slate-600 italic">"{q}"</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400">
                <BrainCircuit size={32} className="mx-auto mb-4 animate-pulse" />
                AI анализирует результаты...
              </div>
            )}
          </Card>

          <Card className="p-8">
            <h3 className="text-lg font-bold mb-6">Детальные ответы на вопросы</h3>
            <div className="space-y-8">
              {data.scores.map((score: any) => {
                const testResponses = data.session.responses.filter((r: any) => r.testId === score.testId);
                return (
                  <div key={score.testId}>
                    <h4 className="font-bold text-slate-700 mb-4 bg-slate-50 p-3 rounded-lg flex items-center gap-2">
                      <ClipboardCheck size={18} className="text-indigo-600" />
                      {score.title}
                    </h4>
                    <div className="space-y-4">
                      {testResponses.map((resp: any) => (
                        <div key={resp.id} className="border-b border-slate-100 pb-4 last:border-0">
                          <p className="text-sm font-medium text-slate-800 mb-3">{resp.question.text}</p>
                          <div className="flex gap-2">
                            {resp.answer === 'SKIPPED' ? (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">
                                <AlertCircle size={14} /> ПРОПУЩЕНО
                              </div>
                            ) : resp.question.type === 'LIKERT' ? (
                              <div className="flex items-center gap-3">
                                {[1, 2, 3, 4, 5].map(val => (
                                  <div 
                                    key={val}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border-2 transition-all ${
                                      String(resp.answer) === String(val) 
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' 
                                        : 'bg-white border-slate-100 text-slate-300 opacity-50'
                                    }`}
                                  >
                                    {val}
                                  </div>
                                ))}
                                <span className="text-xs text-slate-400 ml-2">
                                  {resp.answer === '1' ? '— Совсем нет' : resp.answer === '5' ? '— Полностью' : ''}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100">
                                  {resp.answer}
                                </div>
                                <CheckCircle2 size={16} className="text-emerald-500" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right: HR Decision & Info */}
        <div className="space-y-8">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Решение HR</h3>
            <div className="space-y-4">
              <select 
                className="w-full p-3 rounded-lg border border-slate-200 outline-none"
                value={decision}
                onChange={e => setDecision(e.target.value)}
              >
                <option value="">Выберите решение</option>
                <option value="RECOMMENDED">Рекомендован</option>
                <option value="CONDITIONAL">Условно рекомендован</option>
                <option value="NOT_RECOMMENDED">Не рекомендован</option>
              </select>
              <textarea 
                className="w-full p-3 h-32 rounded-lg border border-slate-200 outline-none resize-none"
                placeholder="Заметки по кандидату..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4">Информация</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Дата начала:</span>
                <span className="font-medium">{new Date(data.session.startedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Дата завершения:</span>
                <span className="font-medium">{data.session.completedAt ? new Date(data.session.completedAt).toLocaleString() : 'В процессе'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-medium">{data.session.candidate.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Код приглашения:</span>
                <span className="font-mono font-bold text-indigo-600">{data.session.inviteCode}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DonePage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <Card className="max-w-md w-full p-12">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Спасибо!</h2>
        <p className="text-slate-600 mb-8">
          Вы успешно завершили все тесты. Ваши результаты направлены HR-менеджеру. 
          Мы свяжемся с вами в ближайшее время.
        </p>
        <div className="space-y-3">
          <Button className="w-full py-4 rounded-xl" onClick={() => navigate(`/candidate/results/${sessionId}`)}>
            Посмотреть мои результаты
          </Button>
          <Button variant="secondary" className="w-full py-4 rounded-xl" onClick={() => window.location.href = '/'}>
            Вернуться на главную
          </Button>
        </div>
      </Card>
    </div>
  );
};

const CandidateResults = () => {
  const { sessionId } = useParams();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/candidate/results/${sessionId}`)
      .then(res => {
        if (!res.ok) throw new Error('Результаты еще не готовы');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, [sessionId]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="p-8 text-center max-w-md">
        <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Ой!</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Попробовать снова</Button>
      </Card>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <BrainCircuit size={48} className="mx-auto text-indigo-600 mb-4 animate-bounce" />
        <p className="text-slate-500 font-medium">Генерируем ваш профиль...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">И</div>
            <h1 className="text-2xl font-bold text-slate-900">Ваш профиль</h1>
          </div>
          <Button variant="secondary" onClick={() => window.print()}><Download size={18} className="mr-2 inline" /> Скачать PDF</Button>
        </header>

        <Card className="p-8 bg-indigo-600 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">{data.session.candidate.fullName}</h2>
            <p className="text-indigo-100 mb-6">{data.session.candidate.vacancy?.name || 'Кандидат'}</p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Zap size={20} className="text-amber-300" /> AI-Резюме
              </h3>
              <p className="text-indigo-50 leading-relaxed">
                {data.aiInterpretation?.summary || 'Ваш профиль показывает высокий потенциал в выбранном направлении.'}
              </p>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" /> Ключевые сильные стороны
            </h3>
            <ul className="space-y-4">
              {data.aiInterpretation?.topStrengths?.map((s: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-slate-700 font-medium">{s}</span>
                </li>
              )) || (
                <li className="text-slate-400 italic">Анализируем ваши таланты...</li>
              )}
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-600" /> Обзор компетенций
            </h3>
            <div className="space-y-6">
              {data.scores.map((score: any) => (
                <div key={score.testId}>
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                    <span>{score.title}</span>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(score.results).map(([name, value]: [string, any]) => (
                      <div key={name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{name}</span>
                          <span className="font-bold text-indigo-600">{Math.min(100, Math.round((value / 5) * 100))}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (value / 5) * 100)}%` }}
                            className="h-full bg-indigo-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="text-center pt-8">
          <p className="text-slate-400 text-sm mb-4">Это автоматизированный отчет, подготовленный системой HR Интуиция.</p>
          <Button variant="ghost" onClick={() => window.location.href = '/'}>Вернуться на главную</Button>
        </div>
      </div>
    </div>
  );
};

const TestPreview = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<any>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    fetch(`/api/hr/tests/${testId}`)
      .then(res => res.json())
      .then(setTest);
  }, [testId]);

  if (!test) return <div className="p-12 text-center text-slate-400">Загрузка теста...</div>;

  const currentQuestion = test.questions[currentIdx];

  const handleAnswer = (val: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: val });
    if (currentIdx < test.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsDone(true);
    }
  };

  if (isDone) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Предпросмотр завершен</h2>
          <p className="text-slate-600 mb-8">Так будет выглядеть завершение теста для кандидата.</p>
          <Button variant="secondary" onClick={() => navigate('/hr/dashboard')}>Вернуться в панель</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">П</div>
          <div className="font-bold text-slate-900">Предпросмотр: {test.title}</div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/hr/dashboard')} className="text-slate-400 hover:text-red-600">
          <LogOut size={16} className="mr-2" /> Закрыть
        </Button>
      </div>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-12">
            <div className="mb-8 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Вопрос {currentIdx + 1} из {test.questions.length}</span>
              <span className="text-indigo-600">Режим предпросмотра</span>
            </div>
            
            <h3 className="text-2xl font-medium text-slate-800 mb-12 text-center">
              {currentQuestion.text}
            </h3>

            <div className="grid gap-4">
              {currentQuestion.type === 'LIKERT' ? (
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button 
                      key={val}
                      onClick={() => handleAnswer(val)}
                      className="flex-1 h-16 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-bold text-lg"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              ) : currentQuestion.type === 'CHOICE' ? (
                (() => {
                  let options = [];
                  try {
                    options = typeof currentQuestion.options === 'string' 
                      ? JSON.parse(currentQuestion.options) 
                      : currentQuestion.options;
                  } catch (e) { options = []; }
                  return options.map((opt: string) => (
                    <button 
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left font-medium"
                    >
                      {opt}
                    </button>
                  ));
                })()
              ) : (
                <div className="space-y-4">
                  <textarea 
                    className="w-full p-4 h-40 rounded-xl border-2 border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    placeholder="Введите ответ..."
                  />
                  <Button className="w-full py-4 text-lg" onClick={() => handleAnswer('Sample Text')}>Далее</Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

// --- APP ---

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tests" element={<TestCatalog />} />
        <Route path="/candidate/start" element={<CandidateStart />} />
        <Route path="/candidate/test/:sessionId" element={<CandidateTest />} />
        <Route path="/candidate/done/:sessionId" element={<DonePage />} />
        <Route path="/candidate/results/:sessionId" element={<CandidateResults />} />
        
        <Route path="/hr/login" element={<HRLogin />} />
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/test/preview/:testId" element={<TestPreview />} />
        <Route path="/hr/candidate/:sessionId" element={<HRCandidateDetail />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
