import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const LOGO_IMAGE = "https://cdn.poehali.dev/projects/6cfdd47c-fb2c-49ee-8522-cad6c467cd1d/bucket/b68e4e93-4d79-41c7-8920-fae124ca8fc9.jpg";

const SPORTS = ["Все", "⚽ Футбол", "🏀 Баскетбол", "🎾 Теннис", "🏒 Хоккей", "🏈 NFL", "🥊 Бокс/MMA", "🏐 Волейбол"];

const RESULTS = ["Все", "WIN", "LOSS", "ВОЗВРАТ"];

const HISTORY: {
  id: number;
  date: string;
  sport: string;
  sportEmoji: string;
  league: string;
  home: string;
  away: string;
  score: string;
  pick: string;
  result: "WIN" | "LOSS" | "ВОЗВРАТ";
  odds: number;
  confidence: number;
  analyst: string;
}[] = [
  { id: 1, date: "12 мая 2025", sport: "⚽ Футбол", sportEmoji: "⚽", league: "Ла Лига", home: "Реал Мадрид", away: "Барселона", score: "2:1", pick: "Реал Мадрид победит", result: "WIN", odds: 1.85, confidence: 87, analyst: "Максим К." },
  { id: 2, date: "12 мая 2025", sport: "🏀 Баскетбол", sportEmoji: "🏀", league: "NBA", home: "Boston Celtics", away: "Miami Heat", score: "118:104", pick: "Тотал больше 215.5", result: "WIN", odds: 1.72, confidence: 81, analyst: "Дмитрий В." },
  { id: 3, date: "12 мая 2025", sport: "🎾 Теннис", sportEmoji: "🎾", league: "ATP Masters", home: "Синнер", away: "Алькарас", score: "6:4, 7:5", pick: "Синнер победит", result: "WIN", odds: 2.10, confidence: 76, analyst: "Александр П." },
  { id: 4, date: "12 мая 2025", sport: "🏒 Хоккей", sportEmoji: "🏒", league: "КХЛ", home: "ЦСКА", away: "Динамо Мск", score: "3:2 ОТ", pick: "Обе забьют 3+", result: "WIN", odds: 1.95, confidence: 83, analyst: "Максим К." },
  { id: 5, date: "12 мая 2025", sport: "⚽ Футбол", sportEmoji: "⚽", league: "АПЛ", home: "Манчестер Сити", away: "Арсенал", score: "1:1", pick: "Манчестер Сити победит", result: "LOSS", odds: 1.75, confidence: 72, analyst: "Дмитрий В." },
  { id: 6, date: "11 мая 2025", sport: "🏈 NFL", sportEmoji: "🏈", league: "NFL Playoffs", home: "Kansas City", away: "Buffalo", score: "27:21", pick: "Kansas City победит", result: "WIN", odds: 1.90, confidence: 79, analyst: "Александр П." },
  { id: 7, date: "11 мая 2025", sport: "⚽ Футбол", sportEmoji: "⚽", league: "Бундеслига", home: "Бавария", away: "Боруссия Д", score: "3:0", pick: "Бавария + фора -1", result: "WIN", odds: 1.65, confidence: 88, analyst: "Максим К." },
  { id: 8, date: "11 мая 2025", sport: "🥊 Бокс/MMA", sportEmoji: "🥊", league: "WBC Heavyweight", home: "Усик", away: "Дубуа", score: "KO-5", pick: "Усик победит", result: "WIN", odds: 2.30, confidence: 84, analyst: "Дмитрий В." },
  { id: 9, date: "11 мая 2025", sport: "🏐 Волейбол", sportEmoji: "🏐", league: "Суперлига", home: "Зенит СПб", away: "Белогорье", score: "3:1", pick: "Зенит выиграет сет 1", result: "WIN", odds: 1.55, confidence: 77, analyst: "Александр П." },
  { id: 10, date: "11 мая 2025", sport: "🏀 Баскетбол", sportEmoji: "🏀", league: "NBA", home: "LA Lakers", away: "Denver Nuggets", score: "105:112", pick: "Lakers победят", result: "LOSS", odds: 2.05, confidence: 61, analyst: "Максим К." },
  { id: 11, date: "10 мая 2025", sport: "⚽ Футбол", sportEmoji: "⚽", league: "Серия А", home: "Интер", away: "Милан", score: "1:1", pick: "Ничья", result: "WIN", odds: 3.10, confidence: 58, analyst: "Дмитрий В." },
  { id: 12, date: "10 мая 2025", sport: "🎾 Теннис", sportEmoji: "🎾", league: "WTA 1000", home: "Свёнтек", away: "Соболенко", score: "Отмен.", pick: "Свёнтек победит", result: "ВОЗВРАТ", odds: 1.80, confidence: 75, analyst: "Александр П." },
  { id: 13, date: "10 мая 2025", sport: "🏒 Хоккей", sportEmoji: "🏒", league: "НХЛ", home: "Florida Panthers", away: "Boston Bruins", score: "4:2", pick: "Florida победят", result: "WIN", odds: 1.88, confidence: 80, analyst: "Максим К." },
  { id: 14, date: "10 мая 2025", sport: "⚽ Футбол", sportEmoji: "⚽", league: "Лига чемпионов", home: "ПСЖ", away: "Атлетико", score: "2:0", pick: "ПСЖ победит и тотал 2+", result: "WIN", odds: 2.45, confidence: 69, analyst: "Дмитрий В." },
  { id: 15, date: "9 мая 2025", sport: "🏀 Баскетбол", sportEmoji: "🏀", league: "NBA", home: "Golden State", away: "Phoenix Suns", score: "128:115", pick: "Тотал больше 228.5", result: "WIN", odds: 1.91, confidence: 82, analyst: "Александр П." },
  { id: 16, date: "9 мая 2025", sport: "⚽ Футбол", sportEmoji: "⚽", league: "РПЛ", home: "Спартак", away: "Зенит", score: "0:2", pick: "Зенит победит", result: "WIN", odds: 1.78, confidence: 85, analyst: "Максим К." },
  { id: 17, date: "9 мая 2025", sport: "🥊 Бокс/MMA", sportEmoji: "🥊", league: "UFC 312", home: "Перейра", away: "Хилл", score: "UD", pick: "Перейра победит", result: "WIN", odds: 1.60, confidence: 89, analyst: "Дмитрий В." },
  { id: 18, date: "9 мая 2025", sport: "🏈 NFL", sportEmoji: "🏈", league: "NFL Regular", home: "Dallas Cowboys", away: "NY Giants", score: "24:17", pick: "Dallas победят", result: "WIN", odds: 1.70, confidence: 77, analyst: "Александр П." },
  { id: 19, date: "8 мая 2025", sport: "🎾 Теннис", sportEmoji: "🎾", league: "Roland Garros", home: "Медведев", away: "Циципас", score: "4:6, 6:3, 7:5", pick: "Медведев победит", result: "WIN", odds: 2.20, confidence: 71, analyst: "Максим К." },
  { id: 20, date: "8 мая 2025", sport: "🏒 Хоккей", sportEmoji: "🏒", league: "КХЛ", home: "СКА", away: "Локомотив", score: "5:3", pick: "Тотал больше 5.5", result: "WIN", odds: 2.05, confidence: 73, analyst: "Дмитрий В." },
  { id: 21, date: "8 мая 2025", sport: "⚽ Футбол", sportEmoji: "⚽", league: "Лига Европы", home: "Лацио", away: "Порту", score: "1:3", pick: "Порту победит", result: "WIN", odds: 2.80, confidence: 65, analyst: "Александр П." },
  { id: 22, date: "7 мая 2025", sport: "🏐 Волейбол", sportEmoji: "🏐", league: "CEV Champions", home: "Зенит Каз", away: "Перуджа", score: "2:3", pick: "Зенит победит", result: "LOSS", odds: 2.10, confidence: 60, analyst: "Максим К." },
  { id: 23, date: "7 мая 2025", sport: "🏀 Баскетбол", sportEmoji: "🏀", league: "EuroLeague", home: "ЦСКА", away: "Реал Мадрид", score: "88:79", pick: "ЦСКА победит", result: "WIN", odds: 2.15, confidence: 68, analyst: "Дмитрий В." },
  { id: 24, date: "7 мая 2025", sport: "⚽ Футбол", sportEmoji: "⚽", league: "АПЛ", home: "Ливерпуль", away: "Челси", score: "2:0", pick: "Ливерпуль + тотал 2+", result: "WIN", odds: 2.00, confidence: 78, analyst: "Александр П." },
];

const RESULT_STYLES: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  WIN:      { color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.3)", icon: "TrendingUp" },
  LOSS:     { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", icon: "TrendingDown" },
  ВОЗВРАТ:  { color: "#f5a623", bg: "rgba(245,166,35,0.1)", border: "rgba(245,166,35,0.3)", icon: "Minus" },
};

function StatBadge({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-win-card border border-white/8 rounded-xl px-5 py-4 text-center">
      <div className="font-oswald font-bold text-3xl mb-1" style={{ color }}>{value}</div>
      <div className="text-win-silver text-xs font-roboto">{label}</div>
    </div>
  );
}

export default function History() {
  const navigate = useNavigate();
  const [sport, setSport] = useState("Все");
  const [result, setResult] = useState("Все");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = HISTORY.filter((h) => {
    const matchSport = sport === "Все" || h.sport === sport;
    const matchResult = result === "Все" || h.result === result;
    const matchSearch =
      search === "" ||
      h.home.toLowerCase().includes(search.toLowerCase()) ||
      h.away.toLowerCase().includes(search.toLowerCase()) ||
      h.league.toLowerCase().includes(search.toLowerCase());
    return matchSport && matchResult && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const wins = filtered.filter((h) => h.result === "WIN").length;
  const losses = filtered.filter((h) => h.result === "LOSS").length;
  const returns = filtered.filter((h) => h.result === "ВОЗВРАТ").length;
  const accuracy = filtered.length > 0 ? Math.round((wins / (wins + losses || 1)) * 100) : 0;
  const avgOdds = filtered.length > 0
    ? (filtered.reduce((acc, h) => acc + h.odds, 0) / filtered.length).toFixed(2)
    : "—";

  return (
    <div className="min-h-screen bg-[#07101f] text-white" style={{ fontFamily: "Roboto, sans-serif" }}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#07101f]/96 backdrop-blur-md border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={LOGO_IMAGE} alt="WinWinSports" className="h-9 w-9 rounded-xl object-cover" />
            <span style={{ fontFamily: "Oswald, sans-serif" }} className="font-bold text-xl tracking-wide">
              <span className="text-win-blue">Win</span><span className="text-win-orange">Win</span><span className="text-white">Sports</span>
            </span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-win-silver hover:text-white transition-colors text-sm"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <div className="text-win-blue font-roboto text-sm font-medium tracking-widest uppercase mb-2">Аналитика</div>
          <h1 style={{ fontFamily: "Oswald, sans-serif" }} className="font-bold text-4xl md:text-6xl text-white mb-3">
            ИСТОРИЯ <span className="text-win-orange">ПРОГНОЗОВ</span>
          </h1>
          <p className="text-win-silver max-w-2xl">
            Полная верифицированная история всех прогнозов с фильтрацией по виду спорта, результату и поиском по матчам.
          </p>
        </div>

        {/* SUMMARY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <StatBadge label="Всего прогнозов" value={filtered.length} color="#a8bcd4" />
          <StatBadge label="Победы" value={wins} color="#4ade80" />
          <StatBadge label="Неудачи" value={losses} color="#f87171" />
          <StatBadge label="Возвраты" value={returns} color="#f5a623" />
          <StatBadge label="Точность" value={`${accuracy}%`} color="#1a8fff" />
        </div>

        {/* FILTERS */}
        <div className="bg-win-card border border-white/8 rounded-2xl p-5 mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-win-silver" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Поиск по команде или лиге..."
              className="w-full bg-[#0e1a2e] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-win-silver focus:outline-none focus:border-win-blue/50 transition-colors"
            />
          </div>

          {/* Sport filter */}
          <div>
            <div className="text-win-silver text-xs mb-2 uppercase tracking-widest">Вид спорта</div>
            <div className="flex flex-wrap gap-2">
              {SPORTS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSport(s); setPage(1); }}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-150"
                  style={
                    sport === s
                      ? { background: "linear-gradient(135deg, #1a8fff, #0d5fbf)", color: "white" }
                      : { background: "rgba(255,255,255,0.06)", color: "#a8bcd4", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Result filter */}
          <div>
            <div className="text-win-silver text-xs mb-2 uppercase tracking-widest">Результат</div>
            <div className="flex flex-wrap gap-2">
              {RESULTS.map((r) => {
                const style = r !== "Все" ? RESULT_STYLES[r] : null;
                return (
                  <button
                    key={r}
                    onClick={() => { setResult(r); setPage(1); }}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-150"
                    style={
                      result === r && style
                        ? { background: style.bg, color: style.color, border: `1px solid ${style.border}` }
                        : result === r
                        ? { background: "linear-gradient(135deg, #1a8fff, #0d5fbf)", color: "white" }
                        : { background: "rgba(255,255,255,0.06)", color: "#a8bcd4", border: "1px solid rgba(255,255,255,0.08)" }
                    }
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-win-card border border-white/8 rounded-2xl overflow-hidden mb-6">
          {/* Desktop header */}
          <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-white/6 text-win-silver text-xs uppercase tracking-widest">
            <div>Матч / Прогноз</div>
            <div>Лига</div>
            <div>Счёт</div>
            <div>Кэф</div>
            <div>Уверен.</div>
            <div>Результат</div>
          </div>

          {paginated.length === 0 ? (
            <div className="py-20 text-center text-win-silver">
              <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
              <div>Прогнозы не найдены</div>
            </div>
          ) : (
            paginated.map((h, idx) => {
              const rs = RESULT_STYLES[h.result];
              return (
                <div
                  key={h.id}
                  className="border-b border-white/5 last:border-0 px-4 md:px-6 py-4 hover:bg-white/3 transition-colors"
                >
                  {/* Mobile layout */}
                  <div className="md:hidden space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{h.sportEmoji}</span>
                        <div>
                          <div className="text-white font-medium text-sm">{h.home} — {h.away}</div>
                          <div className="text-win-silver text-xs">{h.league} • {h.date}</div>
                        </div>
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ color: rs.color, background: rs.bg, border: `1px solid ${rs.border}` }}
                      >
                        {h.result}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-win-silver">{h.pick}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-win-silver">
                      <span>Счёт: <span className="text-white font-medium">{h.score}</span></span>
                      <span>Кэф: <span className="text-win-orange font-bold">×{h.odds}</span></span>
                      <span>Уверенность: <span className="text-white">{h.confidence}%</span></span>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span>{h.sportEmoji}</span>
                        <span className="text-white text-sm font-medium">{h.home} — {h.away}</span>
                      </div>
                      <div className="text-win-silver text-xs ml-6">{h.pick}</div>
                      <div className="text-win-silver/50 text-xs ml-6 mt-0.5">{h.date} • {h.analyst}</div>
                    </div>
                    <div className="text-win-silver text-sm">{h.league}</div>
                    <div className="text-white font-medium text-sm">{h.score}</div>
                    <div className="text-win-orange font-oswald font-bold text-lg">×{h.odds}</div>
                    <div>
                      <div className="text-white text-sm mb-1">{h.confidence}%</div>
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${h.confidence}%`, background: "linear-gradient(90deg, #1a8fff, #63c2ff)" }}
                        />
                      </div>
                    </div>
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ color: rs.color, background: rs.bg, border: `1px solid ${rs.border}` }}
                      >
                        <Icon name={rs.icon} size={12} />
                        {h.result}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-win-silver disabled:opacity-30 hover:bg-white/8 transition-colors"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                style={
                  p === page
                    ? { background: "linear-gradient(135deg, #1a8fff, #0d5fbf)", color: "white" }
                    : { color: "#a8bcd4" }
                }
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-win-silver disabled:opacity-30 hover:bg-white/8 transition-colors"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        )}

        {/* BOTTOM STATS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-win-card border border-white/8 rounded-2xl p-6">
            <div className="text-win-silver text-xs uppercase tracking-widest mb-4">Средний коэффициент</div>
            <div className="font-oswald font-bold text-4xl text-win-orange">×{avgOdds}</div>
            <div className="text-win-silver text-sm mt-1">по выбранным прогнозам</div>
          </div>
          <div className="bg-win-card border border-white/8 rounded-2xl p-6">
            <div className="text-win-silver text-xs uppercase tracking-widest mb-4">Лучший аналитик</div>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-oswald font-bold text-white" style={{ background: "linear-gradient(135deg, #1a8fff, #0d5fbf)" }}>М</div>
              <div>
                <div className="text-white font-oswald font-bold text-lg">Максим К.</div>
                <div className="text-win-silver text-xs">89% точность • 47 прогнозов</div>
              </div>
            </div>
          </div>
          <div className="bg-win-card border border-white/8 rounded-2xl p-6">
            <div className="text-win-silver text-xs uppercase tracking-widest mb-3">WIN / LOSS / ВОЗВРАТ</div>
            <div className="flex items-end gap-1 h-12 mt-2">
              {[
                { val: wins, color: "#4ade80", max: Math.max(wins, losses, returns) },
                { val: losses, color: "#f87171", max: Math.max(wins, losses, returns) },
                { val: returns, color: "#f5a623", max: Math.max(wins, losses, returns) },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: bar.max > 0 ? `${(bar.val / bar.max) * 40}px` : "4px",
                      background: bar.color,
                      opacity: 0.85,
                    }}
                  />
                  <span className="text-xs font-bold" style={{ color: bar.color }}>{bar.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
