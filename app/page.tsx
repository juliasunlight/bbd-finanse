// @ts-nocheck
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  CalendarRange, Wallet, Receipt, Landmark, FileSpreadsheet, Printer, Sparkles, Users,
  ShieldCheck, Clock, TrendingUp, HeartHandshake, Phone, Mail, ArrowRight, Scale, BookOpen,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { LotekFigure } from '@/components/Lotek';

const RED = '#991B1B';

const PROBLEMS = [
  'Na koncie są pieniądze, ale nie wiesz, ile z nich naprawdę jest Twoje po VAT, PIT i ZUS.',
  'Klient spóźnia się z ratą, a Ty dowiadujesz się o tym dopiero, gdy brakuje na przelewy.',
  'Nadwyżka VAT z poprzedniego miesiąca ginie w arkuszu i nikt nie pamięta, jak ją przenieść.',
  'Umowy, raty, faktury kosztowe i podwykonawcy leżą w pięciu różnych miejscach.',
  'Przy 50 czy 200 klientach zrobienie zestawienia dla księgowej zajmuje cały dzień.',
];

const FEATURES = [
  { icon: CalendarRange, t: 'Harmonogram umów i rat', d: 'Każda umowa rozpisana na raty na osi czasu. Od razu widać, kto i kiedy ma zapłacić, a kto jest po terminie.' },
  { icon: Wallet, t: 'Cash flow i saldo z wyprzedzeniem', d: 'Wpływy, koszty, podatki i ZUS w jednym kalendarzu. Widzisz saldo konta na kolejne miesiące, zanim pojawi się problem.' },
  { icon: Landmark, t: 'VAT i PIT bez zgadywania', d: 'Rozliczenia miesięczne albo kwartalne, przeniesienie nadwyżki VAT, zaliczki PIT. Skala, liniowy, ryczałt albo CIT.' },
  { icon: Scale, t: 'ZUS i składka zdrowotna', d: 'ZUS społeczny i zdrowotna liczone osobno, z właściwym odliczeniem dla wybranej formy opodatkowania.' },
  { icon: Receipt, t: 'Koszty firmy i koszty umów', d: 'Koszty stałe firmy oraz koszty przypisane do konkretnej umowy, z podwykonawcami i fakturami.' },
  { icon: BookOpen, t: 'Bilans otwarcia', d: 'Zaczynasz w dowolnym momencie roku: wpisujesz stan konta, VAT do przeniesienia i dotychczasowe przychody.' },
  { icon: Printer, t: 'Raporty i wydruki', d: 'Karty klientów i umów, rejestry, rachunek wyników, cash flow. Druk dla jednego klienta albo zbiorczo dla wszystkich, eksport do CSV.' },
  { icon: Sparkles, t: 'Asystent z Lotkiem', d: 'Rano zapyta, co dziś robisz, i poprowadzi krok po kroku: wpłata klienta, nowa umowa, faktura, ZUS. Dane same trafiają do tabel.' },
  { icon: Users, t: 'Praca zespołowa', d: 'Zapraszasz wspólnika albo księgową na ten sam e-mail i pracujecie na jednych danych.' },
];

const BENEFITS = [
  { icon: ShieldCheck, t: 'Spokój zamiast niespodzianek', d: 'Wiesz z wyprzedzeniem, kiedy zabraknie pieniędzy, i masz czas zareagować.' },
  { icon: TrendingUp, t: 'Decyzje na liczbach', d: 'Widzisz, która umowa zarabia, a która tylko obraca pieniędzmi.' },
  { icon: Clock, t: 'Godziny zamiast dni', d: 'Zestawienia, które robiło się w arkuszach, są gotowe jednym kliknięciem.' },
  { icon: HeartHandshake, t: 'Porządek dla księgowej', d: 'Rejestry i wydruki w jednym formacie, bez szukania papierów.' },
];

const STEPS = [
  { n: '1', t: 'Załóż konto', d: 'Wystarczy e-mail i hasło.' },
  { n: '2', t: 'Wpisz bilans otwarcia', d: 'Stan konta, formę opodatkowania i rozliczenie VAT.' },
  { n: '3', t: 'Dodaj umowy i koszty', d: 'Raty, podatki i saldo policzą się same.' },
];

const ECOSYSTEM = [
  { name: 'Biznes bez dramatów', href: 'https://biznesbezdramatow.com', label: 'biznesbezdramatow.com', d: 'Diagnoza firmy, mentoring 1:1 i prezes na zastępstwo. Pomagamy właścicielowi przestać ciągnąć wszystko na sobie i przestawić firmę na system.' },
  { name: 'Męska Twierdza', href: 'https://meskatwierdza.online', label: 'meskatwierdza.online', d: 'Zamknięte koło dla mężczyzn, którzy prowadzą firmy. Cykl 90 dni, cotygodniowe spotkania w stałym gronie.' },
  { name: 'Kariera bez dramatów', href: 'https://karierabezdramatow.online', label: 'karierabezdramatow.online', d: 'Doradztwo zawodowe i wsparcie w rozwoju kariery, prowadzone przez Yuliię.' },
  { name: 'Biznes bez dramatów · Finanse', href: null, label: 'jesteś tutaj', d: 'Harmonogram umów, cash flow, podatki i raporty dla firm usługowych.' },
];

const BUBBLES = [
  'Cześć! Jestem Lotek. Pilnuję, żeby w Twoich finansach nie było dramatów.',
  'Policzę VAT, PIT i ZUS, zanim przyjdzie termin.',
  'Klient spóźnia się z ratą? Powiem Ci o tym pierwszy.',
];

function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-20 px-4 sm:px-6 py-14 sm:py-20 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {eyebrow && <div className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: RED }}>{eyebrow}</div>}
        {title && <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 max-w-3xl">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export default function Landing() {
  const { user, loading } = useAuth();
  const [bubble, setBubble] = useState(0);
  const [talking, setTalking] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setBubble((b) => (b + 1) % BUBBLES.length);
      setTalking(true);
    }, 5200);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setTalking(false), 1800);
    return () => clearTimeout(t);
  }, [bubble]);

  const appHref = user ? '/aplikacja' : '/login';
  const appLabel = user ? 'Przejdź do aplikacji' : 'Zaloguj się';

  return (
    <div className="bg-white text-slate-800">
      {/* Nawigacja */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex flex-col leading-tight select-none">
            <span className="font-bold tracking-[0.2em] text-[13px] text-slate-900">JACEK SZELA</span>
            <span className="font-extrabold tracking-[0.16em] text-[10px] uppercase" style={{ color: RED }}>Biznes bez dramatów · Finanse</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#funkcje" className="hover:text-slate-900">Funkcje</a>
            <a href="#korzysci" className="hover:text-slate-900">Korzyści</a>
            <a href="#tworcy" className="hover:text-slate-900">Twórcy</a>
            <a href="#ekosystem" className="hover:text-slate-900">Ekosystem</a>
          </nav>
          <Link href={appHref} className="shrink-0 rounded-xl px-4 py-2 text-sm font-bold text-white transition hover:opacity-90" style={{ background: RED }}>
            {loading ? 'Zaloguj się' : appLabel}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-20 pb-14 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.25fr_1fr] gap-10 items-center">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: RED }}>Ekosystem Życie bez dramatów</div>
            <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Finanse firmy usługowej. Spokojnie i bez dramatów.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl">
              Umowy, raty, koszty, VAT, PIT i ZUS w jednym miejscu. Widzisz, ile pieniędzy będzie na koncie za miesiąc i za kwartał, zanim pojawi się problem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={user ? '/aplikacja' : '/login?nowe=1'} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:opacity-90" style={{ background: RED }}>
                {user ? 'Przejdź do aplikacji' : 'Załóż konto'} <ArrowRight className="w-4 h-4" />
              </Link>
              {!user && (
                <Link href="/login" className="rounded-xl px-5 py-3 text-sm font-bold border border-slate-300 text-slate-800 hover:bg-slate-50">
                  Mam już konto
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-3 text-sm text-slate-700 max-w-xs min-h-[64px] bbd-pop" key={bubble}>
              {BUBBLES[bubble]}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-r border-b border-slate-200" />
            </div>
            <div className="bbd-mascot w-56 h-56 sm:w-64 sm:h-64 mt-4">
              <LotekFigure mood={bubble === 2 ? 'thinking' : 'happy'} action={bubble === 0 ? 'wave' : bubble === 2 ? 'look' : ''} talking={talking} />
            </div>
          </div>
        </div>
      </section>

      {/* Problemy */}
      <Section id="problemy" eyebrow="Jakie problemy rozwiązuje" title="Znasz to z własnej firmy?">
        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEMS.map((p) => (
            <li key={p} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 leading-relaxed">{p}</li>
          ))}
          <li className="rounded-2xl p-5 text-sm leading-relaxed text-white" style={{ background: '#1E293B' }}>
            To nie chaos. To etap rozwoju firmy, w którym finanse trzeba przestawić z pamięci właściciela na system.
          </li>
        </ul>
      </Section>

      {/* Funkcje */}
      <Section id="funkcje" eyebrow="Co robi platforma" title="Wszystko, czego potrzebujesz, żeby finanse działały same" className="bg-slate-50">
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="w-10 h-10 rounded-xl grid place-items-center bg-rose-50"><Icon className="w-5 h-5" style={{ color: RED }} /></div>
              <h3 className="mt-3 font-bold text-slate-900">{t}</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Korzyści */}
      <Section id="korzysci" eyebrow="Jaką daje korzyść" title="Mniej nerwów, więcej czasu na prowadzenie firmy">
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-slate-200 p-5">
              <Icon className="w-6 h-6" style={{ color: RED }} />
              <h3 className="mt-3 font-bold text-slate-900">{t}</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 rounded-full grid place-items-center text-white font-extrabold" style={{ background: RED }}>{s.n}</div>
              <div>
                <div className="font-bold text-slate-900">{s.t}</div>
                <div className="text-sm text-slate-600">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Twórcy */}
      <Section id="tworcy" eyebrow="Kto za tym stoi" title="Twórcy" className="bg-slate-50">
        <div className="mt-8 grid md:grid-cols-[minmax(0,380px)_1fr] gap-8 items-start">
          <img src="/tworcy.jpg" alt="Jacek Szela i Yuliia Shevchenko-Szela" className="w-full rounded-2xl border border-slate-200 object-cover" />
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Jacek Szela</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                Mentor właścicieli firm. Ponad 25 lat w zarządzaniu: dyrektor handlowy, były prezes zarządu, kierownik produkcji. MBA, ponad 60 klientów. Z pierwszego wykształcenia pilot, dlatego w firmie najbardziej ceni sterowność: kurs, przyrządy i spokojne lądowanie.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Yuliia Shevchenko-Szela</h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                Psycholożka i doradczyni zawodowa. Wcześniej prawie 20 lat jako księgowa w firmach budowlanych, handlowych i usługowych. Zna finanse małych firm od środka i wie, ile stresu kosztuje właściciela brak porządku w liczbach.
              </p>
            </div>
            <blockquote className="border-l-4 pl-4 text-slate-800 font-semibold" style={{ borderColor: RED }}>
              „Biznes nie może rosnąć szybciej, niż rozwija się jego właściciel jako lider.”
            </blockquote>
          </div>
        </div>
      </Section>

      {/* Ekosystem */}
      <Section id="ekosystem" eyebrow="Ekosystem Życie bez dramatów" title="Jedna myśl, kilka produktów">
        <p className="mt-4 text-slate-600 max-w-3xl">
          Życie bez dramatów to ekosystem, który stworzyliśmy dla właścicieli firm i ludzi, którzy je prowadzą. Biznes bez dramatów pracuje z firmą, Męska Twierdza pracuje z człowiekiem, który ją prowadzi, a Finanse porządkują pieniądze, żeby decyzje zapadały na spokojnie.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {ECOSYSTEM.map((p) => {
            const inner = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-extrabold text-slate-900">{p.name}</h3>
                  {p.href && <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />}
                </div>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{p.d}</p>
                <div className="mt-3 text-xs font-bold" style={{ color: RED }}>{p.label}</div>
              </>
            );
            return p.href ? (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-slate-200 p-5 hover:border-slate-400 hover:shadow-sm transition">{inner}</a>
            ) : (
              <div key={p.name} className="rounded-2xl border-2 p-5 bg-rose-50/40" style={{ borderColor: RED }}>{inner}</div>
            );
          })}
        </div>
      </Section>

      {/* CTA + kontakt */}
      <section className="px-4 sm:px-6 py-14 text-white" style={{ background: '#1E293B' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Uporządkujmy Twoje finanse</h2>
            <p className="mt-3 text-slate-300">Masz pytania albo chcesz, żebyśmy spokojnie sprawdzili razem, czy platforma pasuje do Twojej firmy? Zadzwoń albo napisz.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={user ? '/aplikacja' : '/login?nowe=1'} className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: RED }}>
                {user ? 'Przejdź do aplikacji' : 'Załóż konto'} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <a href="tel:+48660905155" className="flex items-center gap-3 hover:text-white text-slate-200"><Phone className="w-5 h-5" /> +48 660 905 155</a>
            <a href="mailto:lifewithoutdrama.team@gmail.com" className="flex items-center gap-3 hover:text-white text-slate-200"><Mail className="w-5 h-5" /> lifewithoutdrama.team@gmail.com</a>
          </div>
        </div>
      </section>

      <footer className="px-4 sm:px-6 py-6 text-xs text-slate-500 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Jacek Szela · Biznes bez dramatów · Ekosystem Życie bez dramatów</span>
          <span className="flex gap-4">
            <a href="https://biznesbezdramatow.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800">Biznes bez dramatów</a>
            <a href="https://meskatwierdza.online" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800">Męska Twierdza</a>
            <a href="https://karierabezdramatow.online" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800">Kariera bez dramatów</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
