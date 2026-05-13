import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/6cfdd47c-fb2c-49ee-8522-cad6c467cd1d/files/e3f3e7fe-229a-4aa1-b601-82fc5b6dfae9.jpg";
const LOGO_IMAGE = "https://cdn.poehali.dev/projects/6cfdd47c-fb2c-49ee-8522-cad6c467cd1d/bucket/b68e4e93-4d79-41c7-8920-fae124ca8fc9.jpg";

const NAV_LINKS = ["Преимущества", "Прогнозы", "Тарифы", "Сообщество"];

const STATS = [
  { value: "84%", label: "Точность прогнозов", sub: "за последние 12 месяцев" },
  { value: "12K+", label: "Активных клиентов", sub: "в 47 странах" },
  { value: "3.2x", label: "Средний ROI", sub: "на вложенную сумму" },
  { value: "98%", label: "Довольных клиентов", sub: "рекомендуют нас" },
];

const ADVANTAGES = [
  {
    icon: "BarChart3",
    title: "Глубокая аналитика",
    desc: "Каждый прогноз основан на анализе 200+ факторов: форма команды, травмы, история матчей, погода и многое другое.",
    stat: "200+",
    statLabel: "факторов анализа",
  },
  {
    icon: "Brain",
    title: "ИИ-алгоритмы",
    desc: "Наши алгоритмы машинного обучения обрабатывают миллионы данных в реальном времени, находя скрытые закономерности.",
    stat: "84%",
    statLabel: "точность прогнозов",
  },
  {
    icon: "ShieldCheck",
    title: "Верификация результатов",
    desc: "Все наши прогнозы и результаты проходят независимую верификацию. Никакой подтасовки — только честная статистика.",
    stat: "100%",
    statLabel: "прозрачность",
  },
  {
    icon: "Zap",
    title: "Прогнозы в реальном времени",
    desc: "Получайте обновления и экспресс-прогнозы за несколько часов до матча, когда коэффициенты ещё максимально выгодны.",
    stat: "2-24ч",
    statLabel: "до начала матча",
  },
];

const PICKS = [
  {
    sport: "⚽",
    sportName: "Футбол",
    match: "Реал Мадрид vs Барселона",
    league: "Ла Лига",
    pick: "Реал Мадрид победит",
    odds: "1.85",
    confidence: 87,
    time: "21:00",
    date: "Сегодня",
    tag: "TOP",
    tagColor: "#ffc107",
  },
  {
    sport: "🏀",
    sportName: "Баскетбол",
    match: "Lakers vs Golden State",
    league: "NBA",
    pick: "Тотал больше 225.5",
    odds: "1.92",
    confidence: 79,
    time: "02:30",
    date: "Сегодня",
    tag: "HOT",
    tagColor: "#e8001d",
  },
  {
    sport: "🎾",
    sportName: "Теннис",
    match: "Джокович vs Медведев",
    league: "ATP Masters",
    pick: "Джокович — победа",
    odds: "1.65",
    confidence: 91,
    time: "14:00",
    date: "Завтра",
    tag: "SAFE",
    tagColor: "#4caf50",
  },
  {
    sport: "🏒",
    sportName: "Хоккей",
    match: "ЦСКА vs СКА",
    league: "КХЛ",
    pick: "Обе команды забьют",
    odds: "2.10",
    confidence: 74,
    time: "19:30",
    date: "Сегодня",
    tag: "VALUE",
    tagColor: "#9c27b0",
  },
];

const PLANS = [
  {
    name: "Старт",
    price: "990",
    period: "месяц",
    color: "#c0c0c0",
    features: [
      "3 прогноза в неделю",
      "Футбол и хоккей",
      "Базовая аналитика",
      "Email-рассылка",
      "История прогнозов — 30 дней",
    ],
    cta: "Начать бесплатно",
    highlight: false,
    badge: "",
  },
  {
    name: "Про",
    price: "2 490",
    period: "месяц",
    color: "#e8001d",
    features: [
      "Все прогнозы ежедневно",
      "10+ видов спорта",
      "Расширенная аналитика",
      "Telegram + Push-уведомления",
      "История прогнозов — без ограничений",
      "Приоритетная поддержка 24/7",
    ],
    cta: "Выбрать Про",
    highlight: true,
    badge: "Популярный",
  },
  {
    name: "VIP",
    price: "5 990",
    period: "месяц",
    color: "#ffc107",
    features: [
      "Всё из Про",
      "Эксклюзивные VIP-прогнозы",
      "Персональный аналитик",
      "Закрытый VIP-чат",
      "Банкролл-менеджмент",
      "Ранний доступ к прогнозам",
    ],
    cta: "Стать VIP",
    highlight: false,
    badge: "",
  },
];

const FEEDS = [
  { name: "Александр М.", city: "Москва", win: "+18 400 ₽", pick: "Реал Мадрид", time: "2 часа назад", avatar: "А" },
  { name: "Дмитрий К.", city: "СПб", win: "+7 200 ₽", pick: "Lakers тотал", time: "5 часов назад", avatar: "Д" },
  { name: "Сергей В.", city: "Казань", win: "+31 000 ₽", pick: "Джокович", time: "вчера", avatar: "С" },
  { name: "Иван П.", city: "Екб", win: "+12 600 ₽", pick: "ЦСКА+СКА", time: "вчера", avatar: "И" },
  { name: "Максим Р.", city: "Новосиб", win: "+9 850 ₽", pick: "Манчестер Сити", time: "2 дня назад", avatar: "М" },
  { name: "Антон Л.", city: "Краснодар", win: "+5 300 ₽", pick: "Атлетико Мадрид", time: "2 дня назад", avatar: "А" },
];

const ACCURACY_SPORTS = [
  { sport: "⚽ Футбол", value: 86 },
  { sport: "🏀 Баскетбол", value: 81 },
  { sport: "🎾 Теннис", value: 89 },
  { sport: "🏒 Хоккей", value: 79 },
  { sport: "🥊 Бокс/MMA", value: 76 },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function StatCard({ value, label, sub, delay }: { value: string; label: string; sub: string; delay: number }) {
  return (
    <div
      className="animate-float-up opacity-0 text-center"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="text-4xl md:text-5xl font-oswald font-bold text-win-red glow-red-text stat-counter">
        {value}
      </div>
      <div className="text-white font-oswald font-medium text-lg mt-1">{label}</div>
      <div className="text-win-silver text-sm mt-0.5 font-roboto">{sub}</div>
    </div>
  );
}

function PickCard({ pick }: { pick: typeof PICKS[0] }) {
  return (
    <div className="card-shine bg-win-card border border-white/8 rounded-2xl overflow-hidden hover:border-red-800/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{pick.sport}</span>
            <div>
              <div className="text-win-silver text-xs font-roboto">{pick.league}</div>
              <div className="text-white font-oswald text-sm">{pick.sportName}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold font-oswald px-2 py-0.5 rounded"
              style={{ color: pick.tagColor, backgroundColor: `${pick.tagColor}22`, border: `1px solid ${pick.tagColor}44` }}
            >
              {pick.tag}
            </span>
            <div className="text-right">
              <div className="text-win-silver text-xs">{pick.date}</div>
              <div className="text-white text-xs font-medium">{pick.time}</div>
            </div>
          </div>
        </div>

        <div className="text-white font-oswald font-medium text-base mb-1">{pick.match}</div>
        <div className="text-win-silver text-sm font-roboto mb-4">{pick.pick}</div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-win-silver text-xs mb-1 font-roboto">Уверенность</div>
            <div className="progress-bar w-32 h-2">
              <div className="progress-fill" style={{ width: `${pick.confidence}%` }} />
            </div>
          </div>
          <div className="text-right">
            <div className="text-win-silver text-xs mb-0.5 font-roboto">Коэффициент</div>
            <div className="font-oswald text-2xl font-bold text-win-orange">{pick.odds}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-win-silver font-roboto">{pick.confidence}% точность</span>
          <button className="gradient-blue text-white text-xs font-oswald font-bold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
            ОТКРЫТЬ
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ plan }: { plan: typeof PLANS[0] }) {
  return (
    <div
      className={`relative card-shine rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
        plan.highlight ? "border-2" : "border border-white/10"
      }`}
      style={{ borderColor: plan.highlight ? plan.color : undefined }}
    >
      {plan.highlight && (
        <div className="absolute top-0 inset-x-0 h-1 gradient-red" />
      )}
      {plan.badge && (
        <div className="absolute top-4 right-4">
          <span className="gradient-red text-white text-xs font-oswald font-bold px-3 py-1 rounded-full">
            {plan.badge}
          </span>
        </div>
      )}
      <div className={`p-7 ${plan.highlight ? "bg-win-card2" : "bg-win-card"}`}>
        <div className="font-oswald font-bold text-2xl mb-1" style={{ color: plan.color }}>
          {plan.name}
        </div>
        <div className="flex items-end gap-1 mb-6">
          <span className="font-oswald font-bold text-5xl text-white">{plan.price}</span>
          <span className="text-win-silver mb-2 font-roboto">₽ / {plan.period}</span>
        </div>
        <div className="space-y-3 mb-7">
          {plan.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${plan.color}22`, border: `1px solid ${plan.color}44` }}>
                <Icon name="Check" size={10} style={{ color: plan.color } as React.CSSProperties} />
              </div>
              <span className="text-win-silver text-sm font-roboto">{f}</span>
            </div>
          ))}
        </div>
        <button
          className="w-full py-3 rounded-xl font-oswald font-bold text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          style={
            plan.highlight
              ? { background: "linear-gradient(135deg, #e8001d, #a80015)", color: "white" }
              : { background: `${plan.color}18`, color: plan.color, border: `1px solid ${plan.color}33` }
          }
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
}

function AccuracyBar({ sport, value, inView }: { sport: string; value: number; inView: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-sm font-roboto text-win-silver w-32 flex-shrink-0">{sport}</div>
      <div className="flex-1 progress-bar h-3">
        <div
          className="progress-fill"
          style={{ width: inView ? `${value}%` : "0%", transition: "width 1.2s ease" }}
        />
      </div>
      <div className="text-white font-oswald font-bold text-sm w-10 text-right">{value}%</div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { ref: accuracyRef, inView: accuracyInView } = useInView();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#07101f] text-white overflow-x-hidden">

      {/* TICKER */}
      <div className="overflow-hidden border-b border-blue-900/40" style={{ background: "#060f1c" }}>
        <div className="flex items-stretch">
          {/* Лейбл */}
          <div className="flex-shrink-0 flex items-center gap-2 px-4 z-10 border-r border-blue-900/40" style={{ background: "linear-gradient(135deg, #0d3d87, #1a6fd4)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-oswald font-bold text-white text-xs tracking-widest uppercase whitespace-nowrap">Вчера</span>
          </div>
          {/* Скролл */}
          <div className="overflow-hidden flex-1 py-2">
            <div className="flex animate-ticker gap-0">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-0 flex-shrink-0">
                  {[
                    { emoji: "⚽", event: "Реал Мадрид — Барселона", score: "2:1", result: "WIN", coef: "1.85", color: "#4ade80" },
                    { emoji: "🏀", event: "Boston Celtics — Miami Heat", score: "118:104", result: "WIN", coef: "1.72", color: "#4ade80" },
                    { emoji: "🎾", event: "Синнер — Алькарас", score: "6:4, 7:5", result: "WIN", coef: "2.10", color: "#4ade80" },
                    { emoji: "🏒", event: "ЦСКА — Динамо Мск", score: "3:2 ОТ", result: "WIN", coef: "1.95", color: "#4ade80" },
                    { emoji: "⚽", event: "Манчестер Сити — Арсенал", score: "1:1", result: "ВОЗВРАТ", coef: "—", color: "#f5a623" },
                    { emoji: "🏈", event: "Kansas City — Buffalo", score: "27:21", result: "WIN", coef: "1.90", color: "#4ade80" },
                    { emoji: "⚽", event: "Бавария — Боруссия Д", score: "3:0", result: "WIN", coef: "1.65", color: "#4ade80" },
                    { emoji: "🥊", event: "Усик — Дубуа", score: "KO-5", result: "WIN", coef: "2.30", color: "#4ade80" },
                  ].map((item, j) => (
                    <div key={j} className="flex items-center gap-3 px-5 border-r border-white/6 flex-shrink-0">
                      <span className="text-sm">{item.emoji}</span>
                      <span className="text-white/60 text-xs font-roboto whitespace-nowrap">{item.event}</span>
                      <span className="text-white font-oswald font-bold text-sm whitespace-nowrap">{item.score}</span>
                      <span
                        className="text-xs font-oswald font-bold px-2 py-0.5 rounded whitespace-nowrap"
                        style={{ color: item.color, background: `${item.color}18`, border: `1px solid ${item.color}33` }}
                      >
                        {item.result}
                      </span>
                      {item.coef !== "—" && (
                        <span className="text-win-orange font-oswald font-bold text-xs whitespace-nowrap">×{item.coef}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#07101f]/96 backdrop-blur-md border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={LOGO_IMAGE}
              alt="WinWinSports"
              className="h-10 w-10 rounded-xl object-cover"
            />
            <span className="font-oswald font-bold text-xl tracking-wide">
              <span className="text-win-blue">Win</span><span className="text-win-orange">Win</span><span className="text-white">Sports</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(["advantages", "picks", "plans", "community"][i])}
                className="text-win-silver hover:text-white transition-colors text-sm font-roboto font-medium"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:block text-win-silver hover:text-white text-sm font-roboto transition-colors">
              Войти
            </button>
            <button
              onClick={() => scrollTo("plans")}
              className="gradient-blue text-white text-sm font-oswald font-bold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              ПОПРОБОВАТЬ
            </button>
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-win-card border-t border-white/6 px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(["advantages", "picks", "plans", "community"][i])}
                className="text-win-silver hover:text-white text-left py-2 font-roboto text-sm"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07101f]/80 via-[#07101f]/60 to-[#07101f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d5fbf]/30 via-transparent to-[#0d5fbf]/20" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24">
          <div
            className="animate-float-up opacity-0 mb-6"
            style={{ animationFillMode: "forwards" }}
          >
            <img
              src={LOGO_IMAGE}
              alt="WinWinSports Logo"
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover mx-auto shadow-2xl"
              style={{ boxShadow: "0 0 40px rgba(26,143,255,0.4), 0 0 80px rgba(245,166,35,0.2)" }}
            />
          </div>

          <div className="badge-live mb-6 inline-flex animate-float-up delay-100" style={{ animationFillMode: "forwards" }}>
            <span className="badge-live-dot" />
            84% точность прогнозов • Проверено независимо
          </div>

          <div className="animate-float-up opacity-0 delay-200" style={{ animationFillMode: "forwards" }}>
            <h1 className="font-oswald font-bold leading-none text-5xl sm:text-6xl md:text-8xl tracking-tight mb-2">
              <span className="text-win-blue glow-blue-text">WIN</span>
              <span className="text-white"> TOGETHER.</span>
            </h1>
            <h1 className="font-oswald font-bold leading-none text-5xl sm:text-6xl md:text-8xl tracking-tight mb-6">
              <span className="text-white">WIN</span>
              <span className="text-win-orange glow-orange-text"> ALWAYS.</span>
            </h1>
          </div>

          <p
            className="animate-float-up opacity-0 delay-400 text-win-silver text-lg md:text-xl font-roboto max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animationFillMode: "forwards" }}
          >
            Профессиональная аналитика и прогнозы для спортивных ставок с верифицированной статистикой.
            Более 12 000 клиентов доверяют нам своих побед.
          </p>

          <div
            className="animate-float-up opacity-0 delay-500 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            style={{ animationFillMode: "forwards" }}
          >
            <button
              onClick={() => scrollTo("picks")}
              className="text-white font-oswald font-bold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-all duration-200 hover:scale-105 flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #f5a623, #e08800)", boxShadow: "0 0 24px rgba(245,166,35,0.4)" }}
            >
              <Icon name="Flame" size={20} />
              ПРОГНОЗЫ НА СЕГОДНЯ
            </button>
            <button
              onClick={() => scrollTo("plans")}
              className="text-white font-oswald font-bold text-lg px-10 py-4 rounded-full transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #1a8fff, #0d5fbf)", boxShadow: "0 0 24px rgba(26,143,255,0.3)" }}
            >
              ВЫБРАТЬ ПЛАН
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm p-8">
            {STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={600 + i * 100} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/40" />
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="text-win-red font-roboto text-sm font-medium tracking-widest uppercase mb-3">Почему мы</div>
          <h2 className="font-oswald font-bold text-4xl md:text-6xl text-white mb-4">
            WINWIN <span className="text-win-red">ПРЕИМУЩЕСТВО</span>
          </h2>
          <p className="text-win-silver font-roboto max-w-2xl mx-auto text-lg">
            Мы не просто даём прогнозы — мы строим систему побед для каждого клиента
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.title}
              className="card-shine group bg-win-card border border-white/8 rounded-2xl p-8 hover:border-red-900/50 transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 gradient-red rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={adv.icon} size={26} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-oswald font-bold text-xl text-white mb-2">{adv.title}</h3>
                  <p className="text-win-silver font-roboto text-sm leading-relaxed mb-4">{adv.desc}</p>
                  <div className="inline-flex items-center gap-2 bg-win-red/10 border border-win-red/20 rounded-full px-4 py-1">
                    <span className="text-win-red font-oswald font-bold text-lg">{adv.stat}</span>
                    <span className="text-win-silver text-xs font-roboto">{adv.statLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={accuracyRef} className="bg-win-card border border-white/8 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-win-red font-roboto text-sm font-medium tracking-widest uppercase mb-3">Статистика</div>
              <h3 className="font-oswald font-bold text-3xl md:text-4xl text-white mb-4">
                Точность по <span className="text-win-red">видам спорта</span>
              </h3>
              <p className="text-win-silver font-roboto mb-6 leading-relaxed">
                Независимая верификация за последние 12 месяцев. Все данные проверены третьей стороной и публично доступны.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-red rounded-full flex items-center justify-center">
                  <Icon name="Award" size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-oswald font-bold">Сертифицировано TipsterCheck</div>
                  <div className="text-win-silver text-xs font-roboto">Международная платформа верификации</div>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              {ACCURACY_SPORTS.map((s) => (
                <AccuracyBar key={s.sport} sport={s.sport} value={s.value} inView={accuracyInView} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PICKS */}
      <section id="picks" className="py-24 bg-gradient-to-b from-transparent via-win-card/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-win-red font-roboto text-sm font-medium tracking-widest uppercase mb-3">Актуально</div>
              <h2 className="font-oswald font-bold text-4xl md:text-6xl text-white">
                ТОП <span className="text-win-red">ПРОГНОЗЫ</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="badge-live">
                <span className="badge-live-dot" />
                4 прогноза активно
              </div>
              <button onClick={() => navigate("/history")} className="text-win-blue font-oswald text-sm hover:underline flex items-center gap-1">Все прогнозы <Icon name="ArrowRight" size={14} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PICKS.map((pick) => (
              <PickCard key={pick.match} pick={pick} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/history")}
              className="border border-win-blue/40 text-win-blue font-oswald font-bold px-10 py-3 rounded-full hover:bg-win-blue/10 transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <Icon name="BarChart2" size={18} />
              ПОЛНАЯ ИСТОРИЯ ПРОГНОЗОВ
            </button>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="text-win-red font-roboto text-sm font-medium tracking-widest uppercase mb-3">Тарифы</div>
          <h2 className="font-oswald font-bold text-4xl md:text-6xl text-white mb-4">
            ВЫБЕРИТЕ <span className="text-win-red">ПЛАН</span>
          </h2>
          <p className="text-win-silver font-roboto max-w-xl mx-auto">
            Без скрытых комиссий. Отмените в любой момент. Гарантия возврата 7 дней.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-win-silver text-sm font-roboto">
          <div className="flex items-center gap-2">
            <Icon name="ShieldCheck" size={16} className="text-win-red" />
            Гарантия возврата 7 дней
          </div>
          <div className="flex items-center gap-2">
            <Icon name="CreditCard" size={16} className="text-win-red" />
            Оплата картой или криптой
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Lock" size={16} className="text-win-red" />
            Безопасная транзакция
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="py-24 bg-gradient-to-b from-transparent via-black/40 to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="text-win-red font-roboto text-sm font-medium tracking-widest uppercase mb-3">Сообщество</div>
            <h2 className="font-oswald font-bold text-4xl md:text-6xl text-white mb-4">
              ИСТОРИИ <span className="text-win-red">ПОБЕД</span>
            </h2>
            <p className="text-win-silver font-roboto max-w-xl mx-auto">
              Реальные результаты наших клиентов. Каждая победа верифицирована нашей командой.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {FEEDS.map((f, i) => (
              <div
                key={i}
                className="card-shine bg-win-card border border-white/8 rounded-2xl p-6 hover:border-green-900/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 gradient-blue rounded-full flex items-center justify-center font-oswald font-bold text-white text-lg">
                    {f.avatar}
                  </div>
                  <div>
                    <div className="text-white font-oswald font-medium">{f.name}</div>
                    <div className="text-win-silver text-xs font-roboto">{f.city} • {f.time}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-green-400 font-oswald font-bold text-xl">{f.win}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-win-silver text-sm font-roboto">
                  <Icon name="TrendingUp" size={14} className="text-win-red" />
                  Прогноз: {f.pick}
                </div>
                <div className="flex mt-3 gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <div className="p-10 md:p-14 text-center" style={{ background: "linear-gradient(135deg, #0d3d87 0%, #1a6fd4 50%, #c47a00 100%)" }}>
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                <div className="absolute top-4 left-4 text-8xl">🏆</div>
                <div className="absolute bottom-4 right-4 text-8xl">🎯</div>
              </div>
              <div className="relative z-10">
                <h3 className="font-oswald font-bold text-3xl md:text-5xl text-white mb-4">
                  ГОТОВ НАЧАТЬ ВЫИГРЫВАТЬ?
                </h3>
                <p className="text-white/80 font-roboto mb-8 max-w-xl mx-auto text-lg">
                  Присоединяйся к 12 000+ клиентам, которые уже зарабатывают со WinWinSports
                </p>
                <button
                  onClick={() => scrollTo("plans")}
                  className="bg-white font-oswald font-bold text-lg px-12 py-4 rounded-full hover:scale-105 transition-all duration-200 shadow-2xl"
                  style={{ color: "#0d3d87" }}
                >
                  НАЧАТЬ СЕЙЧАС — БЕСПЛАТНО
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-blue-900/30 py-12 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={LOGO_IMAGE} alt="WinWinSports" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-oswald font-bold text-lg">
              <span className="text-win-blue">Win</span><span className="text-win-orange">Win</span><span className="text-white">Sports</span>
            </span>
          </div>
          <div className="flex gap-6 text-win-silver text-sm font-roboto">
            <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Поддержка</a>
          </div>
          <div className="text-win-silver text-xs font-roboto text-center md:text-right">
            <div>© 2024 WinWinSports. Все права защищены.</div>
            <div className="mt-1 text-win-silver/60">18+ Делайте ставки ответственно</div>
          </div>
        </div>
      </footer>

    </div>
  );
}