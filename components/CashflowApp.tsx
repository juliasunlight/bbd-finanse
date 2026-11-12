// @ts-nocheck
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Settings,
  Download,
  RotateCcw,
  Calendar,
  TrendingUp,
  Wallet,
  Users,
  Landmark,
  CheckCircle2,
  Clock,
  AlertCircle,
  PauseCircle,
  Edit3,
  Trash2,
  X,
  Search,
  Filter,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  ListChecks,
  GanttChartSquare,
  Check,
  Info,
  LogOut,
  UserPlus,
  Printer
} from 'lucide-react';

// ============================================================================
// STAŁE I DANE POCZĄTKOWE (MARKA: JACEK SZELA — BIZNES BEZ DRAMATÓW)
// ============================================================================

export const DEFAULT_SETTINGS = {
  vatRate: 23,
  pitRate: 12,
  deductSubcontractor: true,
  services: [
    {
      id: 'srv-mentoring',
      name: 'Mentoring 1 na 1',
      defaultDays: 60,
      defaultPrice: 8000,
      defaultSubCost: 1500
    },
    {
      id: 'srv-diagnoza',
      name: 'Diagnoza',
      defaultDays: 10,
      defaultPrice: 2500,
      defaultSubCost: 600
    },
    {
      id: 'srv-prezes',
      name: 'Prezes na zastępstwo',
      defaultDays: 90,
      defaultPrice: 12000,
      defaultSubCost: 3500
    },
    {
      id: 'srv-twierdza',
      name: 'Męska Twierdza',
      defaultDays: 45,
      defaultPrice: 5500,
      defaultSubCost: 1200
    }
  ]
};

export const INITIAL_CONTRACTS = [
  {
    id: 'ctr-1',
    clientName: 'Alfa Logistyka Sp. z o.o.',
    serviceName: 'Prezes na zastępstwo',
    status: 'W trakcie',
    startDate: '2026-11-02',
    endDate: '2027-01-31',
    netValue: 12000,
    installments: [
      { id: 'r1', label: 'Rata 1 (40%)', amount: 5904, dueDate: '2026-11-03', paid: true },
      { id: 'r2', label: 'Rata 2 (30%)', amount: 4428, dueDate: '2026-12-15', paid: false },
      { id: 'r3', label: 'Rata 3 (30%)', amount: 4428, dueDate: '2027-01-28', paid: false }
    ],
    subcontractorName: 'Marek Zieliński (Interim COO)',
    subCost: 3500,
    subDueDate: '2026-12-20',
    subStatus: 'Do zapłaty',
    taxDueDate: '2027-02-20',
    notes: 'Wdrożenie procesów operacyjnych i restrukturyzacja działu spedycji.'
  },
  {
    id: 'ctr-2',
    clientName: 'Anna Kowalczyk (E-commerce)',
    serviceName: 'Mentoring 1 na 1',
    status: 'W trakcie',
    startDate: '2026-11-09',
    endDate: '2027-01-08',
    netValue: 8000,
    installments: [
      { id: 'r1', label: 'Rata 1 (50%)', amount: 4920, dueDate: '2026-11-10', paid: true },
      { id: 'r2', label: 'Rata 2 (50%)', amount: 4920, dueDate: '2026-12-18', paid: false }
    ],
    subcontractorName: 'Katarzyna Nowak (Analityk KPI)',
    subCost: 1500,
    subDueDate: '2026-12-10',
    subStatus: 'Zapłacono',
    taxDueDate: '2027-01-20',
    notes: 'Budowa modelu marżowego i delegowanie sprzedaży.'
  },
  {
    id: 'ctr-3',
    clientName: 'Budimex Partner Sp. z o.o.',
    serviceName: 'Diagnoza',
    status: 'Zakończone',
    startDate: '2026-11-02',
    endDate: '2026-11-12',
    netValue: 2500,
    installments: [
      { id: 'r1', label: 'Całość (100%)', amount: 3075, dueDate: '2026-11-04', paid: true }
    ],
    subcontractorName: 'Piotr Wiśniewski (Audytor)',
    subCost: 600,
    subDueDate: '2026-11-16',
    subStatus: 'Zapłacono',
    taxDueDate: '2026-12-20',
    notes: 'Audyt wąskich gardeł przed przejściem na proces długoterminowy.'
  },
  {
    id: 'ctr-4',
    clientName: 'Grupa TechnoBud',
    serviceName: 'Męska Twierdza',
    status: 'W trakcie',
    startDate: '2026-11-16',
    endDate: '2026-12-31',
    netValue: 5500,
    installments: [
      { id: 'r1', label: 'Rata 1 (50%)', amount: 3383, dueDate: '2026-11-17', paid: true },
      { id: 'r2', label: 'Rata 2 (50%)', amount: 3382, dueDate: '2026-12-16', paid: false }
    ],
    subcontractorName: 'Tomasz Kaczmarek (Facylitator)',
    subCost: 1200,
    subDueDate: '2026-12-22',
    subStatus: 'Do zapłaty',
    taxDueDate: '2027-01-20',
    notes: 'Program liderski dla 2 wspólników firmy.'
  },
  {
    id: 'ctr-5',
    clientName: 'Meble Nowak S.A.',
    serviceName: 'Prezes na zastępstwo',
    status: 'Zaplanowane',
    startDate: '2026-12-01',
    endDate: '2027-02-28',
    netValue: 13500,
    installments: [
      { id: 'r1', label: 'Rata 1 (40%)', amount: 6642, dueDate: '2026-12-02', paid: false },
      { id: 'r2', label: 'Rata 2 (30%)', amount: 4982, dueDate: '2027-01-15', paid: false },
      { id: 'r3', label: 'Rata 3 (30%)', amount: 4981, dueDate: '2027-02-25', paid: false }
    ],
    subcontractorName: 'Marek Zieliński (Interim COO)',
    subCost: 3800,
    subDueDate: '2027-01-25',
    subStatus: 'Do zapłaty',
    taxDueDate: '2027-03-20',
    notes: 'Przejęcie sterów operacyjnych na czas sukcesji zarządu.'
  },
  {
    id: 'ctr-6',
    clientName: 'Centrum Medyczne Vita',
    serviceName: 'Diagnoza',
    status: 'Zaplanowane',
    startDate: '2026-11-23',
    endDate: '2026-12-03',
    netValue: 2500,
    installments: [
      { id: 'r1', label: 'Całość (100%)', amount: 3075, dueDate: '2026-11-24', paid: false }
    ],
    subcontractorName: '',
    subCost: 0,
    subDueDate: '',
    subStatus: 'Brak',
    taxDueDate: '2027-01-20',
    notes: 'Diagnoza realizowana bezpośrednio przez Jacka Szelę.'
  },
  {
    id: 'ctr-7',
    clientName: 'Digital Peak Agency',
    serviceName: 'Mentoring 1 na 1',
    status: 'W trakcie',
    startDate: '2026-11-04',
    endDate: '2027-01-03',
    netValue: 8500,
    installments: [
      { id: 'r1', label: 'Rata 1 (50%)', amount: 5228, dueDate: '2026-11-05', paid: true },
      { id: 'r2', label: 'Rata 2 (50%)', amount: 5227, dueDate: '2026-12-10', paid: false }
    ],
    subcontractorName: 'Katarzyna Nowak (Analityk KPI)',
    subCost: 1500,
    subDueDate: '2026-12-14',
    subStatus: 'Do zapłaty',
    taxDueDate: '2027-01-20',
    notes: 'Uporządkowanie rentowności projektów i cash flow agencji.'
  }
];

const STATUS_OPTIONS = ['W trakcie', 'Zaplanowane', 'Zakończone', 'Wstrzymane'];
const SUB_STATUS_OPTIONS = ['Do zapłaty', 'Zapłacono', 'Brak'];
const VAT_COST_OPTIONS = [23, 8, 5, 0];

// ============================================================================
// FUNKCJE POMOCNICZE (DATY, FORMATOWANIE WALUTY, OBLICZENIA FINANSOWE)
// ============================================================================

function formatPLN(value) {
  const num = Number(value) || 0;
  return new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(num)) + ' zł';
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function toISODate(dateObj) {
  if (!dateObj || isNaN(dateObj.getTime())) return '';
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(dateStr, days) {
  const d = parseDate(dateStr);
  if (!d) return '';
  d.setDate(d.getDate() + Number(days || 0));
  return toISODate(d);
}

function getNextMonth20th(dateStr) {
  const d = parseDate(dateStr);
  if (!d) return '';
  const next = new Date(d.getFullYear(), d.getMonth() + 1, 20);
  return toISODate(next);
}

function formatShortDate(dateStr) {
  const d = parseDate(dateStr);
  if (!d) return '—';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}`;
}

function formatFullDate(dateStr) {
  const d = parseDate(dateStr);
  if (!d) return '—';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${d.getFullYear()}`;
}

function getMondayOfWeek(dateStr) {
  const d = parseDate(dateStr) || new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.getFullYear(), d.getMonth(), diff);
  return toISODate(monday);
}

/**
 * Oblicza wszystkie wskaźniki finansowe, podatkowe i statusowe dla pojedynczej umowy
 */
function calculateContractFinancials(contract, settings) {
  const netValue = Number(contract.netValue) || 0;
  const vatRate = Number(settings.vatRate) || 0;
  const pitRate = Number(settings.pitRate) || 0;

  const vatAmount = Math.round(netValue * (vatRate / 100));
  const grossValue = netValue + vatAmount;

  const effectiveSubCost =
    contract.subStatus === 'Brak' ? 0 : Math.max(0, Number(contract.subCost) || 0);
  // VAT z faktury podwykonawcy (brak pola w starszych umowach = podwykonawca bez VAT)
  const subVatRate = Number(contract.subVatRate) || 0;
  const subVat = Math.round(effectiveSubCost * (subVatRate / 100));
  const subGross = effectiveSubCost + subVat;

  // Pozostałe koszty projektu (faktury kosztowe)
  const costs = Array.isArray(contract.costs) ? contract.costs : [];
  let costsNet = 0;
  let costsVat = 0;
  let costsPaidNet = 0;
  costs.forEach((item) => {
    const net = Math.max(0, Number(item.net) || 0);
    costsNet += net;
    costsVat += Math.round(net * ((Number(item.vatRate) || 0) / 100));
    if (item.paid) costsPaidNet += net;
  });
  const costsGross = costsNet + costsVat;

  // Koszty netto razem (podwykonawca + faktury kosztowe) pomniejszają podstawę PIT/CIT
  const totalCostsNet = effectiveSubCost + costsNet;
  // VAT naliczony z faktur kosztowych pomniejsza VAT należny
  const inputVat = subVat + costsVat;
  const vatPayable = vatAmount - inputVat; // ujemny = nadwyżka VAT do odliczenia

  const taxBase = settings.deductSubcontractor
    ? Math.max(0, netValue - totalCostsNet)
    : netValue;

  const pitAmount = Math.round(taxBase * (pitRate / 100));
  const totalTaxes = Math.max(0, vatPayable) + pitAmount;

  // Zysk netto po kosztach i podatku dochodowym (VAT jest neutralny na poziomie netto)
  const netProfit = netValue - totalCostsNet - pitAmount;
  const netMargin = netValue > 0 ? (netProfit / netValue) * 100 : 0;

  const installments = Array.isArray(contract.installments) ? contract.installments : [];
  const scheduledGross = installments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const paidGross = installments
    .filter((item) => item.paid)
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const remainingGross = Math.max(0, grossValue - paidGross);

  const start = parseDate(contract.startDate);
  const end = parseDate(contract.endDate);
  const durationDays =
    start && end ? Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1) : 0;

  return {
    netValue,
    vatAmount,
    grossValue,
    effectiveSubCost,
    subVatRate,
    subVat,
    subGross,
    costsNet,
    costsVat,
    costsGross,
    costsPaidNet,
    totalCostsNet,
    inputVat,
    vatPayable,
    vatDue: vatPayable,
    pitAmount,
    totalTaxes,
    netProfit,
    netMargin,
    scheduledGross,
    paidGross,
    remainingGross,
    durationDays
  };
}

/**
 * Koszt firmy (faktura kosztowa): netto obniża podstawę PIT/CIT (gdy włączone odliczanie kosztów),
 * VAT z faktury obniża VAT do zapłaty w miesiącu kosztu (rozliczenie miesięczne: buildTaxSchedule).
 */
export const COST_CATEGORIES = ['Biuro i czynsz', 'Marketing', 'Narzędzia i IT', 'Transport', 'Szkolenia', 'Usługi obce', 'Inne'];
const COST_VAT_OPTIONS = [23, 8, 5, 0];

function calculateCostFinancials(cost, settings) {
  const net = Math.max(0, Number(cost.netAmount) || 0);
  const vatRate = Number(cost.vatRate) || 0;
  const vat = Math.round(net * (vatRate / 100));
  const gross = net + vat;
  const citRelief = settings.deductSubcontractor
    ? Math.round(net * ((Number(settings.pitRate) || 0) / 100))
    : 0;
  const taxRelief = vat + citRelief;
  const reliefDate = cost.date ? getNextMonth20th(cost.date) : '';
  return { net, vat, gross, citRelief, taxRelief, reliefDate };
}

// ============================================================================
// MIESIĘCZNE ROZLICZENIE PODATKÓW (VAT miesięczny, zaliczki PIT/CIT miesięczne)
// ----------------------------------------------------------------------------
// • VAT należny powstaje w miesiącu raty klienta (data raty = data faktury sprzedaży).
//   Rata jest kwotą brutto, więc VAT = rata × stawka / (100 + stawka).
// • VAT naliczony: faktury podwykonawców (termin wypłaty), koszty projektów (termin płatności)
//   i koszty firmy (data kosztu) – w miesiącu faktury.
// • VAT do zapłaty za miesiąc M = należny − naliczony − nadwyżka z poprzednich miesięcy;
//   nadwyżka przechodzi na kolejny miesiąc. Termin: 25. dzień miesiąca M+1.
// • Zaliczka PIT/CIT za miesiąc M (termin: 20. dzień miesiąca M+1):
//   – przy odliczaniu kosztów: metoda narastająca w roku podatkowym:
//     stawka × (przychody − koszty od stycznia do M) − zaliczki już należne w tym roku;
//   – ryczałt (bez odliczania kosztów): stawka × przychód netto miesiąca M.
// ============================================================================

const round2 = (v) => Math.round((Number(v) || 0) * 100) / 100;

function monthKey(iso) {
  const d = parseDate(iso);
  if (!d) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function nextMonthDay(key, day) {
  const [y, m] = key.split('-').map(Number);
  return toISODate(new Date(y, m, day)); // m (1–12) jako indeks = kolejny miesiąc
}

const MONTH_NAMES_PL = [
  'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
  'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
];

function monthLabel(key) {
  const [y, m] = key.split('-').map(Number);
  return `${MONTH_NAMES_PL[m - 1]} ${y}`;
}

export function buildTaxSchedule(contracts, costs, settings) {
  const vatRate = Number(settings.vatRate) || 0;
  const pitRate = Number(settings.pitRate) || 0;
  const deduct = Boolean(settings.deductSubcontractor);
  const months = {};
  const get = (iso) => {
    const key = monthKey(iso);
    if (!key) return null;
    if (!months[key]) {
      months[key] = { key, revenueNet: 0, vatOut: 0, costsNet: 0, vatIn: 0, sales: [], purchases: [] };
    }
    return months[key];
  };

  (contracts || []).forEach((ctr) => {
    (ctr.installments || []).forEach((inst) => {
      const m = get(inst.dueDate);
      if (!m) return;
      const gross = Number(inst.amount) || 0;
      const vat = vatRate > 0 ? (gross * vatRate) / (100 + vatRate) : 0;
      m.vatOut += vat;
      m.revenueNet += gross - vat;
      m.sales.push({ name: `${ctr.clientName} — ${inst.label || 'rata'}`, date: inst.dueDate, gross, net: gross - vat, vat });
    });
    const calc = calculateContractFinancials(ctr, settings);
    if (calc.effectiveSubCost > 0) {
      const date = ctr.subDueDate || ctr.endDate;
      const m = get(date);
      if (m) {
        m.costsNet += calc.effectiveSubCost;
        m.vatIn += calc.subVat;
        m.purchases.push({ name: `Podwykonawca: ${ctr.subcontractorName || '—'} (${ctr.clientName})`, date, net: calc.effectiveSubCost, vat: calc.subVat, gross: calc.subGross });
      }
    }
    (Array.isArray(ctr.costs) ? ctr.costs : []).forEach((cost) => {
      const date = cost.dueDate || ctr.endDate;
      const m = get(date);
      if (!m) return;
      const net = Math.max(0, Number(cost.net) || 0);
      const vat = (net * (Number(cost.vatRate) || 0)) / 100;
      m.costsNet += net;
      m.vatIn += vat;
      m.purchases.push({ name: `${cost.name || 'Koszt projektu'} (${ctr.clientName})`, date, net, vat, gross: net + vat });
    });
  });

  (costs || []).forEach((cost) => {
    const m = get(cost.date);
    if (!m) return;
    const net = Math.max(0, Number(cost.netAmount) || 0);
    const vat = (net * (Number(cost.vatRate) || 0)) / 100;
    m.costsNet += net;
    m.vatIn += vat;
    m.purchases.push({ name: `${cost.name || 'Koszt firmy'} (koszt firmy)`, date: cost.date, net, vat, gross: net + vat });
  });

  const sorted = Object.values(months).sort((a, b) => a.key.localeCompare(b.key));
  let vatCarry = 0;
  let year = '';
  let ytdBase = 0;
  let ytdAdvances = 0;
  sorted.forEach((m) => {
    m.revenueNet = round2(m.revenueNet);
    m.vatOut = round2(m.vatOut);
    m.costsNet = round2(m.costsNet);
    m.vatIn = round2(m.vatIn);

    // VAT z przeniesieniem nadwyżki
    m.vatCarryIn = round2(vatCarry);
    const vatBalance = round2(m.vatOut - m.vatIn - vatCarry);
    m.vatPayable = vatBalance > 0 ? Math.round(vatBalance) : 0; // VAT wpłaca się w pełnych złotych
    vatCarry = vatBalance < 0 ? -vatBalance : 0;
    m.vatCarryOut = round2(vatCarry);
    m.vatDueDate = nextMonthDay(m.key, 25);

    // Zaliczka PIT/CIT
    const y = m.key.slice(0, 4);
    if (y !== year) {
      year = y;
      ytdBase = 0;
      ytdAdvances = 0;
    }
    if (deduct) {
      ytdBase += m.revenueNet - m.costsNet;
      m.ytdBase = round2(ytdBase);
      const dueYtd = Math.max(0, Math.round(Math.max(0, ytdBase) * (pitRate / 100)));
      m.pitDueYtd = dueYtd;
      m.pitPaidBefore = ytdAdvances;
      m.pitAdvance = Math.max(0, dueYtd - ytdAdvances);
      ytdAdvances += m.pitAdvance;
    } else {
      m.ytdBase = null;
      m.pitAdvance = Math.max(0, Math.round(m.revenueNet * (pitRate / 100)));
    }
    m.pitDueDate = nextMonthDay(m.key, 20);
    m.totalPayable = m.vatPayable + m.pitAdvance;
    m.label = monthLabel(m.key);
  });

  const totals = sorted.reduce(
    (t, m) => ({
      revenueNet: t.revenueNet + m.revenueNet,
      costsNet: t.costsNet + m.costsNet,
      vatOut: t.vatOut + m.vatOut,
      vatIn: t.vatIn + m.vatIn,
      vatPayable: t.vatPayable + m.vatPayable,
      pitAdvance: t.pitAdvance + m.pitAdvance
    }),
    { revenueNet: 0, costsNet: 0, vatOut: 0, vatIn: 0, vatPayable: 0, pitAdvance: 0 }
  );
  totals.vatCarryLeft = round2(vatCarry);

  // Płatności podatków w dniach terminów (do wykresów i harmonogramu)
  const payments = [];
  sorted.forEach((m) => {
    if (m.vatPayable > 0) payments.push({ date: m.vatDueDate, amount: m.vatPayable, kind: 'VAT', month: m.label, m });
    if (m.pitAdvance > 0) payments.push({ date: m.pitDueDate, amount: m.pitAdvance, kind: 'PIT/CIT', month: m.label, m });
  });

  return { months: sorted, totals, payments };
}

// ============================================================================
// FORMULARZE DO DRUKU (raport podatkowy, umowy i raty, koszty, karta umowy)
// ============================================================================

const pCell = 'border border-slate-400 px-1.5 py-1 align-top';
const pHead = `${pCell} bg-slate-100 font-bold text-left`;
const pNum = `${pCell} text-right whitespace-nowrap`;

function PrintView({ onClose, contracts, costs, settings, workspaceName }) {
  const [form, setForm] = useState('tax');
  const [contractId, setContractId] = useState(contracts[0]?.id || '');
  const [year, setYear] = useState('all');

  const schedule = useMemo(() => buildTaxSchedule(contracts, costs, settings), [contracts, costs, settings]);
  const years = Array.from(new Set(schedule.months.map((m) => m.key.slice(0, 4))));
  const months = year === 'all' ? schedule.months : schedule.months.filter((m) => m.key.startsWith(year));
  const sum = (arr, f) => arr.reduce((s, x) => s + (Number(f(x)) || 0), 0);
  const today = formatFullDate(toISODate(new Date()));
  const contract = contracts.find((c) => c.id === contractId);

  const Header = ({ title }) => (
    <div className="flex items-start justify-between border-b-2 border-slate-800 pb-2 mb-3">
      <div>
        <div className="text-[10px] font-bold tracking-[0.2em] text-slate-500">JACEK SZELA • BIZNES BEZ DRAMATÓW</div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        <div className="text-xs text-slate-600">Firma: {workspaceName}</div>
      </div>
      <div className="text-right text-[11px] text-slate-600">
        Data wydruku: {today}
        <br />
        VAT {settings.vatRate}% • PIT/CIT {settings.pitRate}%
        {settings.deductSubcontractor ? ' (od dochodu)' : ' (ryczałt od przychodu)'}
      </div>
    </div>
  );

  const Signatures = () => (
    <div className="grid grid-cols-2 gap-10 mt-10 text-[11px] text-slate-600">
      <div className="border-t border-slate-500 pt-1 text-center">Sporządził(a)</div>
      <div className="border-t border-slate-500 pt-1 text-center">Zatwierdził(a)</div>
    </div>
  );

  return (
    <div className="print-overlay fixed inset-0 z-[60] bg-slate-200/90 overflow-y-auto">
      <div className="no-print sticky top-0 z-10 bg-[#1E293B] text-white px-4 py-3 flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold mr-1">Formularz do druku:</span>
          {[
            ['tax', 'Raport podatkowy (miesięczny)'],
            ['contracts', 'Umowy i harmonogram rat'],
            ['costs', 'Koszty firmy'],
            ['card', 'Karta umowy']
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setForm(id)}
              className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${form === id ? 'bg-white text-slate-900' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              {label}
            </button>
          ))}
          {form === 'tax' && years.length > 0 && (
            <select value={year} onChange={(e) => setYear(e.target.value)} className="px-2 py-1.5 rounded-lg text-slate-900">
              <option value="all">Wszystkie lata</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          )}
          {form === 'card' && (
            <select value={contractId} onChange={(e) => setContractId(e.target.value)} className="px-2 py-1.5 rounded-lg text-slate-900 max-w-[220px]">
              {contracts.map((c) => (
                <option key={c.id} value={c.id}>{c.clientName} — {c.serviceName}</option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => window.print()} className="px-4 py-1.5 rounded-lg bg-[#991B1B] hover:bg-[#B91C1C] text-xs font-bold cursor-pointer">
            Drukuj / zapisz PDF
          </button>
          <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold cursor-pointer">
            Zamknij
          </button>
        </div>
      </div>

      <div id="print-area" className="bg-white text-slate-900 max-w-[1000px] mx-auto my-4 p-6 sm:p-8 shadow-lg text-[11px] leading-snug">
        {form === 'tax' && (
          <>
            <Header title="Miesięczny harmonogram podatków (VAT i zaliczki PIT/CIT)" />
            <p className="mb-2 text-slate-600">
              VAT rozliczany miesięcznie, płatny do 25. dnia następnego miesiąca; nadwyżka VAT naliczonego
              przechodzi na kolejny miesiąc. Zaliczka PIT/CIT płatna do 20. dnia następnego miesiąca
              {settings.deductSubcontractor ? ', liczona narastająco od początku roku (przychody − koszty).' : ', liczona od przychodu (ryczałt).'}
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={pHead}>Miesiąc</th>
                  <th className={pHead}>Przychód netto</th>
                  <th className={pHead}>Koszty netto</th>
                  <th className={pHead}>VAT należny</th>
                  <th className={pHead}>VAT naliczony</th>
                  <th className={pHead}>Nadwyżka z poprz.</th>
                  <th className={pHead}>VAT do zapłaty</th>
                  <th className={pHead}>Termin VAT</th>
                  <th className={pHead}>Zaliczka PIT/CIT</th>
                  <th className={pHead}>Termin PIT/CIT</th>
                  <th className={pHead}>Razem</th>
                </tr>
              </thead>
              <tbody>
                {months.length === 0 && (
                  <tr><td className={pCell} colSpan={11}>Brak danych.</td></tr>
                )}
                {months.map((m) => (
                  <tr key={m.key}>
                    <td className={pCell}>{m.label}</td>
                    <td className={pNum}>{formatPLN(m.revenueNet)}</td>
                    <td className={pNum}>{formatPLN(m.costsNet)}</td>
                    <td className={pNum}>{formatPLN(m.vatOut)}</td>
                    <td className={pNum}>{formatPLN(m.vatIn)}</td>
                    <td className={pNum}>{m.vatCarryIn ? formatPLN(m.vatCarryIn) : '—'}</td>
                    <td className={`${pNum} font-bold`}>{formatPLN(m.vatPayable)}</td>
                    <td className={pNum}>{formatFullDate(m.vatDueDate)}</td>
                    <td className={`${pNum} font-bold`}>{formatPLN(m.pitAdvance)}</td>
                    <td className={pNum}>{formatFullDate(m.pitDueDate)}</td>
                    <td className={`${pNum} font-bold`}>{formatPLN(m.totalPayable)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold">
                  <td className={pCell}>Razem</td>
                  <td className={pNum}>{formatPLN(sum(months, (m) => m.revenueNet))}</td>
                  <td className={pNum}>{formatPLN(sum(months, (m) => m.costsNet))}</td>
                  <td className={pNum}>{formatPLN(sum(months, (m) => m.vatOut))}</td>
                  <td className={pNum}>{formatPLN(sum(months, (m) => m.vatIn))}</td>
                  <td className={pNum} />
                  <td className={pNum}>{formatPLN(sum(months, (m) => m.vatPayable))}</td>
                  <td className={pNum} />
                  <td className={pNum}>{formatPLN(sum(months, (m) => m.pitAdvance))}</td>
                  <td className={pNum} />
                  <td className={pNum}>{formatPLN(sum(months, (m) => m.totalPayable))}</td>
                </tr>
              </tfoot>
            </table>
            {schedule.totals.vatCarryLeft > 0 && (
              <p className="mt-2">Nadwyżka VAT do przeniesienia na kolejne miesiące: <b>{formatPLN(schedule.totals.vatCarryLeft)}</b></p>
            )}
            <p className="mt-2 text-slate-500">
              Data raty klienta traktowana jest jako data faktury sprzedaży. Kwoty orientacyjne, do weryfikacji z księgowością.
            </p>
            <Signatures />
          </>
        )}

        {form === 'contracts' && (
          <>
            <Header title="Zestawienie umów i harmonogram rat" />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={pHead}>Klient / usługa</th>
                  <th className={pHead}>Status</th>
                  <th className={pHead}>Okres</th>
                  <th className={pHead}>Netto</th>
                  <th className={pHead}>Brutto</th>
                  <th className={pHead}>Raty (brutto, termin, status)</th>
                  <th className={pHead}>Koszty netto</th>
                  <th className={pHead}>Zysk netto (szac.)</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((ctr) => {
                  const c = calculateContractFinancials(ctr, settings);
                  return (
                    <tr key={ctr.id}>
                      <td className={pCell}><b>{ctr.clientName}</b><br />{ctr.serviceName}</td>
                      <td className={pCell}>{ctr.status}</td>
                      <td className={`${pCell} whitespace-nowrap`}>{formatFullDate(ctr.startDate)}<br />{formatFullDate(ctr.endDate)}</td>
                      <td className={pNum}>{formatPLN(c.netValue)}</td>
                      <td className={pNum}>{formatPLN(c.grossValue)}</td>
                      <td className={pCell}>
                        {(ctr.installments || []).map((i) => (
                          <div key={i.id} className="whitespace-nowrap">
                            {formatPLN(i.amount)} • {formatFullDate(i.dueDate)} • {i.paid ? 'opłacona' : 'oczekuje'}
                          </div>
                        ))}
                      </td>
                      <td className={pNum}>{formatPLN(c.totalCostsNet)}</td>
                      <td className={pNum}>{formatPLN(c.netProfit)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold">
                  <td className={pCell} colSpan={3}>Razem ({contracts.length})</td>
                  <td className={pNum}>{formatPLN(sum(contracts, (x) => calculateContractFinancials(x, settings).netValue))}</td>
                  <td className={pNum}>{formatPLN(sum(contracts, (x) => calculateContractFinancials(x, settings).grossValue))}</td>
                  <td className={pCell}>Wpłacono: {formatPLN(sum(contracts, (x) => calculateContractFinancials(x, settings).paidGross))}</td>
                  <td className={pNum}>{formatPLN(sum(contracts, (x) => calculateContractFinancials(x, settings).totalCostsNet))}</td>
                  <td className={pNum}>{formatPLN(sum(contracts, (x) => calculateContractFinancials(x, settings).netProfit))}</td>
                </tr>
              </tfoot>
            </table>
            <Signatures />
          </>
        )}

        {form === 'costs' && (
          <>
            <Header title="Zestawienie kosztów firmy (faktury kosztowe)" />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={pHead}>Data</th>
                  <th className={pHead}>Nazwa</th>
                  <th className={pHead}>Kategoria</th>
                  <th className={pHead}>Produkt</th>
                  <th className={pHead}>Netto</th>
                  <th className={pHead}>VAT</th>
                  <th className={pHead}>Brutto</th>
                  <th className={pHead}>Status</th>
                </tr>
              </thead>
              <tbody>
                {costs.length === 0 && <tr><td className={pCell} colSpan={8}>Brak kosztów.</td></tr>}
                {[...costs].sort((a, b) => String(a.date).localeCompare(String(b.date))).map((c) => {
                  const cc = calculateCostFinancials(c, settings);
                  return (
                    <tr key={c.id}>
                      <td className={`${pCell} whitespace-nowrap`}>{formatFullDate(c.date)}</td>
                      <td className={pCell}>{c.name}</td>
                      <td className={pCell}>{c.category}</td>
                      <td className={pCell}>{c.serviceName || 'wspólny'}</td>
                      <td className={pNum}>{formatPLN(cc.net)}</td>
                      <td className={pNum}>{formatPLN(cc.vat)} ({Number(c.vatRate) || 0}%)</td>
                      <td className={pNum}>{formatPLN(cc.gross)}</td>
                      <td className={pCell}>{c.paid ? 'zapłacono' : 'do zapłaty'}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold">
                  <td className={pCell} colSpan={4}>Razem ({costs.length})</td>
                  <td className={pNum}>{formatPLN(sum(costs, (c) => calculateCostFinancials(c, settings).net))}</td>
                  <td className={pNum}>{formatPLN(sum(costs, (c) => calculateCostFinancials(c, settings).vat))}</td>
                  <td className={pNum}>{formatPLN(sum(costs, (c) => calculateCostFinancials(c, settings).gross))}</td>
                  <td className={pCell} />
                </tr>
              </tfoot>
            </table>
            <Signatures />
          </>
        )}

        {form === 'card' && (
          contract ? (() => {
            const c = calculateContractFinancials(contract, settings);
            return (
              <>
                <Header title={`Karta umowy: ${contract.clientName}`} />
                <table className="w-full border-collapse mb-3">
                  <tbody>
                    <tr><td className={pHead}>Klient</td><td className={pCell}>{contract.clientName}</td><td className={pHead}>Usługa</td><td className={pCell}>{contract.serviceName}</td></tr>
                    <tr><td className={pHead}>Okres</td><td className={pCell}>{formatFullDate(contract.startDate)} – {formatFullDate(contract.endDate)} ({c.durationDays} dni)</td><td className={pHead}>Status</td><td className={pCell}>{contract.status}</td></tr>
                    <tr><td className={pHead}>Wartość netto</td><td className={pNum}>{formatPLN(c.netValue)}</td><td className={pHead}>VAT {settings.vatRate}%</td><td className={pNum}>{formatPLN(c.vatAmount)}</td></tr>
                    <tr><td className={pHead}>Wartość brutto</td><td className={pNum}>{formatPLN(c.grossValue)}</td><td className={pHead}>Wpłacono / pozostało</td><td className={pNum}>{formatPLN(c.paidGross)} / {formatPLN(c.remainingGross)}</td></tr>
                  </tbody>
                </table>

                <div className="font-bold mb-1">Harmonogram rat klienta</div>
                <table className="w-full border-collapse mb-3">
                  <thead><tr><th className={pHead}>Rata</th><th className={pHead}>Termin (data faktury)</th><th className={pHead}>Kwota brutto</th><th className={pHead}>w tym VAT</th><th className={pHead}>VAT płatny do</th><th className={pHead}>Status</th></tr></thead>
                  <tbody>
                    {(contract.installments || []).map((i) => {
                      const r = Number(settings.vatRate) || 0;
                      const vat = r > 0 ? ((Number(i.amount) || 0) * r) / (100 + r) : 0;
                      return (
                        <tr key={i.id}>
                          <td className={pCell}>{i.label}</td>
                          <td className={pCell}>{formatFullDate(i.dueDate)}</td>
                          <td className={pNum}>{formatPLN(i.amount)}</td>
                          <td className={pNum}>{formatPLN(vat)}</td>
                          <td className={pCell}>{i.dueDate ? formatFullDate(nextMonthDay(monthKey(i.dueDate), 25)) : '—'}</td>
                          <td className={pCell}>{i.paid ? 'opłacona' : 'oczekuje'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="font-bold mb-1">Koszty umowy</div>
                <table className="w-full border-collapse mb-3">
                  <thead><tr><th className={pHead}>Pozycja</th><th className={pHead}>Termin</th><th className={pHead}>Netto</th><th className={pHead}>VAT</th><th className={pHead}>Brutto</th><th className={pHead}>Status</th></tr></thead>
                  <tbody>
                    {c.effectiveSubCost > 0 && (
                      <tr>
                        <td className={pCell}>Podwykonawca: {contract.subcontractorName || '—'}</td>
                        <td className={pCell}>{formatFullDate(contract.subDueDate)}</td>
                        <td className={pNum}>{formatPLN(c.effectiveSubCost)}</td>
                        <td className={pNum}>{formatPLN(c.subVat)}</td>
                        <td className={pNum}>{formatPLN(c.subGross)}</td>
                        <td className={pCell}>{contract.subStatus}</td>
                      </tr>
                    )}
                    {(contract.costs || []).map((k) => {
                      const net = Math.max(0, Number(k.net) || 0);
                      const vat = Math.round(net * ((Number(k.vatRate) || 0) / 100));
                      return (
                        <tr key={k.id}>
                          <td className={pCell}>{k.name || 'Koszt'}</td>
                          <td className={pCell}>{formatFullDate(k.dueDate)}</td>
                          <td className={pNum}>{formatPLN(net)}</td>
                          <td className={pNum}>{formatPLN(vat)}</td>
                          <td className={pNum}>{formatPLN(net + vat)}</td>
                          <td className={pCell}>{k.paid ? 'zapłacono' : 'do zapłaty'}</td>
                        </tr>
                      );
                    })}
                    {c.totalCostsNet === 0 && <tr><td className={pCell} colSpan={6}>Brak kosztów.</td></tr>}
                  </tbody>
                </table>

                <div className="font-bold mb-1">Wynik umowy (szacunek)</div>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr><td className={pHead}>VAT należny</td><td className={pNum}>{formatPLN(c.vatAmount)}</td><td className={pHead}>VAT naliczony z kosztów</td><td className={pNum}>{formatPLN(c.inputVat)}</td></tr>
                    <tr><td className={pHead}>VAT do zapłaty</td><td className={pNum}>{formatPLN(Math.max(0, c.vatPayable))}</td><td className={pHead}>PIT/CIT {settings.pitRate}%</td><td className={pNum}>{formatPLN(c.pitAmount)}</td></tr>
                    <tr><td className={pHead}>Koszty netto razem</td><td className={pNum}>{formatPLN(c.totalCostsNet)}</td><td className={pHead}>Zysk netto po podatkach</td><td className={`${pNum} font-bold`}>{formatPLN(c.netProfit)} ({c.netMargin.toFixed(1)}%)</td></tr>
                  </tbody>
                </table>
                {contract.notes && <p className="mt-2"><b>Notatki:</b> {contract.notes}</p>}
                <Signatures />
              </>
            );
          })() : <p>Brak umów.</p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONENT LOGO MARKI: JACEK SZELA — BIZNES BEZ DRAMATÓW
// ============================================================================

function BrandLogo() {
  return (
    <div className="flex items-center gap-3.5 select-none">
      {/* Minimalistyczna ikona samolotu z papieru i orbity */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/90 border border-slate-700/80 shadow-inner">
        <svg
          viewBox="0 0 40 40"
          className="w-7 h-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Łuk orbity */}
          <path
            d="M7 29C12 33 24 33 32 23"
            stroke="#64748B"
            strokeWidth="1.5"
            strokeDasharray="2.5 2.5"
            strokeLinecap="round"
          />
          {/* Karmazynowy punkt na orbicie */}
          <circle cx="9" cy="29.5" r="2.5" fill="#991B1B" />
          {/* Geometryczny samolot z papieru */}
          <path
            d="M33 9L8 19.5L17.5 22.5L29 12.5L20.5 23.5L27.5 26L33 9Z"
            fill="#F8FAFC"
            stroke="#F8FAFC"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M17.5 22.5V28.5L21 24.5" stroke="#CBD5E1" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-white font-bold tracking-[0.22em] text-sm sm:text-base leading-tight">
          JACEK SZELA
        </span>
        <span className="text-[#DC2626] font-extrabold tracking-[0.18em] text-[10px] sm:text-[11px] uppercase mt-0.5">
          BIZNES BEZ DRAMATÓW
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONENT ODZNAKI STATUSU UMOWY
// ============================================================================

function StatusBadge({ status, onChange }) {
  const styles = {
    'W trakcie': 'bg-amber-50 text-amber-800 border-amber-200',
    Zaplanowane: 'bg-slate-100 text-slate-700 border-slate-300',
    Zakończone: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Wstrzymane: 'bg-rose-50 text-rose-800 border-rose-200'
  };

  if (onChange) {
    return (
      <select
        value={status}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          onChange(e.target.value);
        }}
        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 transition ${
          styles[status] || styles['Zaplanowane']
        }`}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt} className="bg-white text-slate-800">
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        styles[status] || styles['Zaplanowane']
      }`}
    >
      {status}
    </span>
  );
}

// ============================================================================
// MODAL DODAWANIA / EDYCJI UMOWY (Z AUTOMATYZACJĄ RAT I KALKULATOREM PODATKÓW)
// ============================================================================

function ContractModal({ isOpen, onClose, onSave, onDelete, initialContract, settings }) {
  const isEditing = Boolean(initialContract);

  const buildEmptyContract = () => {
    const defaultSrv = settings.services[0] || {
      name: 'Mentoring 1 na 1',
      defaultDays: 60,
      defaultPrice: 8000,
      defaultSubCost: 1500
    };
    const start = '2026-11-16';
    const end = addDays(start, defaultSrv.defaultDays);
    const gross = Math.round(defaultSrv.defaultPrice * (1 + settings.vatRate / 100));
    const half1 = Math.round(gross * 0.5);
    const half2 = gross - half1;

    return {
      id: `ctr-${Date.now()}`,
      clientName: '',
      serviceName: defaultSrv.name,
      status: 'Zaplanowane',
      startDate: start,
      endDate: end,
      netValue: defaultSrv.defaultPrice,
      installments: [
        { id: 'r1', label: 'Rata 1 (50%)', amount: half1, dueDate: start, paid: false },
        { id: 'r2', label: 'Rata 2 (50%)', amount: half2, dueDate: addDays(start, Math.floor(defaultSrv.defaultDays / 2)), paid: false }
      ],
      subcontractorName: '',
      subCost: defaultSrv.defaultSubCost,
      subVatRate: 23,
      subDueDate: addDays(end, -5),
      subStatus: defaultSrv.defaultSubCost > 0 ? 'Do zapłaty' : 'Brak',
      costs: [],
      taxDueDate: getNextMonth20th(end),
      notes: ''
    };
  };

  const [formData, setFormData] = useState(buildEmptyContract);
  const [autoFeedback, setAutoFeedback] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormError('');
      setAutoFeedback('');
      setConfirmDelete(false);
      if (initialContract) {
        setFormData(JSON.parse(JSON.stringify(initialContract)));
      } else {
        setFormData(buildEmptyContract());
      }
    }
  }, [isOpen, initialContract]);

  if (!isOpen) return null;

  // Automatyczna aktualizacja parametrów po wyborze usługi z katalogu
  const handleServiceChange = (newServiceName) => {
    const srv = settings.services.find((s) => s.name === newServiceName);
    if (!srv) {
      setFormData((prev) => ({ ...prev, serviceName: newServiceName }));
      return;
    }

    const updatedEnd = formData.startDate
      ? addDays(formData.startDate, srv.defaultDays)
      : formData.endDate;
    const updatedTaxDate = updatedEnd ? getNextMonth20th(updatedEnd) : formData.taxDueDate;
    const newGross = Math.round(srv.defaultPrice * (1 + settings.vatRate / 100));

    // Przeliczamy proporcjonalnie istniejące raty pod nową kwotę brutto
    const currentInstallments = formData.installments || [];
    let nextInstallments = currentInstallments;
    if (currentInstallments.length === 1) {
      nextInstallments = [
        { ...currentInstallments[0], amount: newGross, dueDate: formData.startDate }
      ];
    } else if (currentInstallments.length === 2) {
      const r1 = Math.round(newGross * 0.5);
      nextInstallments = [
        { ...currentInstallments[0], amount: r1, dueDate: formData.startDate },
        {
          ...currentInstallments[1],
          amount: newGross - r1,
          dueDate: addDays(formData.startDate, Math.floor(srv.defaultDays / 2))
        }
      ];
    } else if (currentInstallments.length === 3) {
      const r1 = Math.round(newGross * 0.4);
      const r2 = Math.round(newGross * 0.3);
      nextInstallments = [
        { ...currentInstallments[0], amount: r1, dueDate: formData.startDate },
        {
          ...currentInstallments[1],
          amount: r2,
          dueDate: addDays(formData.startDate, Math.floor(srv.defaultDays / 2))
        },
        {
          ...currentInstallments[2],
          amount: newGross - r1 - r2,
          dueDate: addDays(updatedEnd, -3)
        }
      ];
    }

    setFormData((prev) => ({
      ...prev,
      serviceName: srv.name,
      endDate: updatedEnd,
      netValue: srv.defaultPrice,
      subCost: srv.defaultSubCost,
      subStatus: srv.defaultSubCost > 0 ? (prev.subStatus === 'Brak' ? 'Do zapłaty' : prev.subStatus) : 'Brak',
      subDueDate: updatedEnd ? addDays(updatedEnd, -5) : prev.subDueDate,
      taxDueDate: updatedTaxDate,
      installments: nextInstallments
    }));

    setAutoFeedback(
      `Automatycznie uzupełniono z katalogu: ${srv.defaultDays} dni, ${formatPLN(
        srv.defaultPrice
      )} netto, podwykonawca ${formatPLN(srv.defaultSubCost)}.`
    );
  };

  // Automatyczna zmiana daty zakończenia przy zmianie daty startu
  const handleStartDateChange = (newStart) => {
    const srv = settings.services.find((s) => s.name === formData.serviceName);
    const days = srv ? srv.defaultDays : 30;
    const newEnd = newStart ? addDays(newStart, days) : formData.endDate;
    setFormData((prev) => ({
      ...prev,
      startDate: newStart,
      endDate: newEnd,
      taxDueDate: newEnd ? getNextMonth20th(newEnd) : prev.taxDueDate
    }));
  };

  // Generator automatycznego podziału rat brutto
  const generateInstallments = (weights) => {
    const net = Number(formData.netValue) || 0;
    const gross = Math.round(net * (1 + settings.vatRate / 100));
    const start = formData.startDate || toISODate(new Date());
    const end = formData.endDate || addDays(start, 30);

    const startObj = parseDate(start);
    const endObj = parseDate(end);
    const totalSpanDays =
      startObj && endObj ? Math.max(1, Math.round((endObj - startObj) / (1000 * 60 * 60 * 24))) : 30;

    let allocated = 0;
    const generated = weights.map((w, idx) => {
      const isLast = idx === weights.length - 1;
      const amt = isLast ? gross - allocated : Math.round(gross * (w / 100));
      allocated += amt;

      const offsetDays =
        idx === 0
          ? 0
          : isLast
          ? Math.max(1, totalSpanDays - 3)
          : Math.round(totalSpanDays * (idx / weights.length));

      return {
        id: `r-${Date.now()}-${idx}`,
        label: weights.length === 1 ? 'Całość (100%)' : `Rata ${idx + 1} (${w}%)`,
        amount: amt,
        dueDate: addDays(start, offsetDays),
        paid: formData.installments[idx]?.paid || false
      };
    });

    setFormData((prev) => ({ ...prev, installments: generated }));
    setAutoFeedback(`Rozdzielono kwotę brutto (${formatPLN(gross)}) na ${weights.length} raty.`);
  };

  const updateInstallment = (idx, field, value) => {
    setFormData((prev) => {
      const next = [...prev.installments];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, installments: next };
    });
  };

  const addManualInstallment = () => {
    if (formData.installments.length >= 3) return;
    const idx = formData.installments.length + 1;
    setFormData((prev) => ({
      ...prev,
      installments: [
        ...prev.installments,
        {
          id: `r-${Date.now()}`,
          label: `Rata ${idx}`,
          amount: 0,
          dueDate: prev.endDate || prev.startDate,
          paid: false
        }
      ]
    }));
  };

  const removeInstallment = (idx) => {
    if (formData.installments.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      installments: prev.installments.filter((_, i) => i !== idx)
    }));
  };

  // Faktury kosztowe projektu
  const formCosts = Array.isArray(formData.costs) ? formData.costs : [];

  const addCost = () => {
    setFormData((prev) => ({
      ...prev,
      costs: [
        ...(Array.isArray(prev.costs) ? prev.costs : []),
        {
          id: `k-${Date.now()}`,
          name: '',
          net: 0,
          vatRate: 23,
          dueDate: prev.endDate || prev.startDate || '',
          paid: false
        }
      ]
    }));
  };

  const updateCost = (idx, field, value) => {
    setFormData((prev) => {
      const next = [...(prev.costs || [])];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, costs: next };
    });
  };

  const removeCost = (idx) => {
    setFormData((prev) => ({
      ...prev,
      costs: (prev.costs || []).filter((_, i) => i !== idx)
    }));
  };

  const liveCalc = calculateContractFinancials(formData, settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName.trim()) {
      setFormError('Podaj nazwę klienta lub firmy.');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setFormError('Uzupełnij datę rozpoczęcia i zakończenia usługi.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Nagłówek modala */}
        <div className="bg-[#1E293B] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#DC2626] uppercase block">
              BIZNES BEZ DRAMATÓW • KARTA UMOWY
            </span>
            <h2 className="text-lg font-bold tracking-tight mt-0.5">
              {isEditing ? `Edycja umowy: ${formData.clientName}` : 'Nowa umowa i harmonogram klienta'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Treść formularza */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {autoFeedback && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#991B1B] shrink-0" />
                <span>{autoFeedback}</span>
              </div>
              <button
                type="button"
                onClick={() => setAutoFeedback('')}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* SEKCJA 1: DANE KLIENTA I USŁUGI */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#991B1B]" />
              1. Zakres usługi i harmonogram realizacji
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Klient / Nazwa firmy *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="np. Omega Transport Sp. z o.o."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status realizacji
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rodzaj usługi (auto-uzupełnianie)
                </label>
                <select
                  value={formData.serviceName}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                >
                  {settings.services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.defaultDays} dni • {formatPLN(s.defaultPrice)} netto)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Data startu *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Data zakończenia ({liveCalc.durationDays} dni)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
                />
              </div>
            </div>
          </div>

          {/* SEKCJA 2: WARTOŚĆ UMOWY I HARMONOGRAM RAT KLIENTA */}
          <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-600" />
                2. Wartość umowy i raty płatności klienta (Brutto z VAT {settings.vatRate}%)
              </h3>

              {/* Szybkie przyciski generatora rat */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-500 mr-1">
                  Rozdziel raty automatycznie:
                </span>
                <button
                  type="button"
                  onClick={() => generateInstallments([100])}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition"
                >
                  100% z góry
                </button>
                <button
                  type="button"
                  onClick={() => generateInstallments([50, 50])}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition"
                >
                  50% / 50%
                </button>
                <button
                  type="button"
                  onClick={() => generateInstallments([40, 30, 30])}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition"
                >
                  40% / 30% / 30%
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Wartość umowy NETTO (PLN)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={formData.netValue}
                  onChange={(e) =>
                    setFormData({ ...formData, netValue: Number(e.target.value) || 0 })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="bg-white px-3.5 py-2 rounded-xl border border-amber-200 flex flex-col justify-center">
                <span className="text-[11px] text-slate-500">Kwota BRUTTO (do zafakturowania)</span>
                <span className="text-base font-bold text-slate-900">
                  {formatPLN(liveCalc.grossValue)}
                </span>
              </div>

              <div className="bg-white px-3.5 py-2 rounded-xl border border-amber-200 flex flex-col justify-center">
                <span className="text-[11px] text-slate-500">Suma rozpisanych rat brutto</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-base font-bold ${
                      Math.abs(liveCalc.scheduledGross - liveCalc.grossValue) <= 2
                        ? 'text-emerald-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {formatPLN(liveCalc.scheduledGross)}
                  </span>
                  {Math.abs(liveCalc.scheduledGross - liveCalc.grossValue) > 2 && (
                    <span className="text-[11px] text-amber-700 font-medium">
                      (różnica: {formatPLN(liveCalc.grossValue - liveCalc.scheduledGross)})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Lista rat */}
            <div className="space-y-2.5">
              {formData.installments.map((inst, idx) => (
                <div
                  key={inst.id || idx}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center bg-white p-2.5 rounded-xl border border-slate-200"
                >
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={inst.label}
                      onChange={(e) => updateInstallment(idx, 'label', e.target.value)}
                      placeholder={`Rata ${idx + 1}`}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={inst.amount}
                        onChange={(e) =>
                          updateInstallment(idx, 'amount', Number(e.target.value) || 0)
                        }
                        className="w-full px-2.5 py-1.5 pr-8 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                      />
                      <span className="absolute right-2.5 top-1.5 text-xs text-slate-400">zł</span>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="date"
                      value={inst.dueDate}
                      onChange={(e) => updateInstallment(idx, 'dueDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(inst.paid)}
                        onChange={(e) => updateInstallment(idx, 'paid', e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span
                        className={`text-xs font-semibold ${
                          inst.paid ? 'text-emerald-700' : 'text-slate-500'
                        }`}
                      >
                        {inst.paid ? 'Opłacona' : 'Oczekuje'}
                      </span>
                    </label>
                    {formData.installments.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstallment(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Usuń ratę"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {formData.installments.length < 3 && (
                <button
                  type="button"
                  onClick={addManualInstallment}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 px-2 py-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Dodaj kolejną ratę (maks. 3)
                </button>
              )}
            </div>
          </div>

          {/* SEKCJA 3: PODWYKONAWCY I PODATKI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Podwykonawcy */}
            <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-200/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-600" />
                3. Podwykonawca (Koszty projektu)
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Podwykonawca (imię / rola)
                </label>
                <input
                  type="text"
                  value={formData.subcontractorName}
                  onChange={(e) =>
                    setFormData({ ...formData, subcontractorName: e.target.value })
                  }
                  placeholder="np. Marek Zieliński (Interim COO)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Koszt netto (PLN)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={formData.subCost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subCost: Number(e.target.value) || 0,
                        subStatus:
                          Number(e.target.value) > 0 && formData.subStatus === 'Brak'
                            ? 'Do zapłaty'
                            : formData.subStatus
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    VAT na fakturze
                  </label>
                  <select
                    value={Number(formData.subVatRate) || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, subVatRate: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                  >
                    {VAT_COST_OPTIONS.map((v) => (
                      <option key={v} value={v}>
                        {v === 0 ? 'bez VAT / zw.' : `${v}%`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Status wypłaty
                  </label>
                  <select
                    value={formData.subStatus}
                    onChange={(e) => setFormData({ ...formData, subStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                  >
                    {SUB_STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Termin wypłaty podwykonawcy
                </label>
                <input
                  type="date"
                  value={formData.subDueDate}
                  onChange={(e) => setFormData({ ...formData, subDueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                />
              </div>
            </div>

            {/* Podatki i podgląd rentowności na żywo */}
            <div className="bg-purple-50/40 p-4 rounded-xl border border-purple-200/80 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-purple-700" />
                  4. Podatki i podgląd wyniku netto
                </h3>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <p>
                    Podatki płacisz <strong>co miesiąc</strong>: VAT do 25., zaliczkę PIT/CIT do 20.
                    dnia następnego miesiąca. Terminy wyliczają się same z dat rat (data raty = data
                    faktury).
                  </p>
                  {(formData.installments || []).filter((i) => i.dueDate).map((inst, idx) => {
                    const gross = Number(inst.amount) || 0;
                    const r = Number(settings.vatRate) || 0;
                    const vat = r > 0 ? Math.round((gross * r) / (100 + r)) : 0;
                    const key = monthKey(inst.dueDate);
                    return (
                      <div key={inst.id || idx} className="flex justify-between bg-white/70 rounded-lg px-2 py-1 border border-purple-100">
                        <span>{inst.label || `Rata ${idx + 1}`}: VAT za {monthLabel(key)}</span>
                        <span className="font-semibold">
                          {formatPLN(vat)} do {formatFullDate(nextMonthDay(key, 25))}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Podsumowanie finansowe na żywo */}
              <div className="bg-white p-3.5 rounded-xl border border-purple-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>VAT należny ze sprzedaży ({settings.vatRate}%):</span>
                  <span className="font-semibold text-slate-800">
                    {formatPLN(liveCalc.vatAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT naliczony (podwykonawca + faktury kosztowe):</span>
                  <span className="font-semibold text-slate-800">
                    -{formatPLN(liveCalc.inputVat)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>
                    {liveCalc.vatPayable >= 0 ? 'VAT do zapłaty:' : 'Nadwyżka VAT do odliczenia:'}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {formatPLN(Math.abs(liveCalc.vatPayable))}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Koszty netto razem (podwykonawca + faktury):</span>
                  <span className="font-semibold text-slate-800">
                    -{formatPLN(liveCalc.totalCostsNet)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>
                    Podatek dochodowy PIT/CIT ({settings.pitRate}%
                    {settings.deductSubcontractor ? ' po kosztach' : ' ryczałt od przychodu'}):
                  </span>
                  <span className="font-semibold text-slate-800">
                    {formatPLN(liveCalc.pitAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-purple-800 font-semibold pt-1 border-t border-slate-100">
                  <span>Łączne obciążenie podatkowe:</span>
                  <span>{formatPLN(liveCalc.totalTaxes)}</span>
                </div>
                <div className="flex justify-between items-center pt-1.5 border-t border-slate-200">
                  <span className="font-bold text-slate-800">Zysk netto po podatkach:</span>
                  <span
                    className={`text-sm font-extrabold ${
                      liveCalc.netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {formatPLN(liveCalc.netProfit)} ({liveCalc.netMargin.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KOSZTY PROJEKTU (FAKTURY KOSZTOWE) */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-slate-500" />
                5. Koszty projektu (faktury kosztowe)
              </h3>
              <span className="text-[11px] text-slate-500">
                Koszty netto obniżają PIT/CIT, VAT z faktur obniża VAT do zapłaty.
              </span>
            </div>

            {formCosts.length === 0 && (
              <p className="text-xs text-slate-400">Brak kosztów. Dodaj np. wynajem sali, materiały, dojazdy.</p>
            )}

            {formCosts.map((cost, idx) => (
              <div
                key={cost.id || idx}
                className="grid grid-cols-2 sm:grid-cols-12 gap-2.5 items-center bg-white p-2.5 rounded-xl border border-slate-200"
              >
                <div className="col-span-2 sm:col-span-4">
                  <input
                    type="text"
                    value={cost.name}
                    onChange={(e) => updateCost(idx, 'name', e.target.value)}
                    placeholder="Za co? np. wynajem sali"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800"
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={cost.net}
                      onChange={(e) => updateCost(idx, 'net', Number(e.target.value) || 0)}
                      title="Kwota netto"
                      className="w-full px-2.5 py-1.5 pr-14 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                    />
                    <span className="absolute right-2.5 top-1.5 text-xs text-slate-400">zł netto</span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <select
                    value={Number(cost.vatRate) || 0}
                    onChange={(e) => updateCost(idx, 'vatRate', Number(e.target.value) || 0)}
                    title="Stawka VAT na fakturze"
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white"
                  >
                    {VAT_COST_OPTIONS.map((v) => (
                      <option key={v} value={v}>
                        {v === 0 ? 'VAT: brak / zw.' : `VAT ${v}%`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="date"
                    value={cost.dueDate}
                    onChange={(e) => updateCost(idx, 'dueDate', e.target.value)}
                    title="Termin płatności"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(cost.paid)}
                      onChange={(e) => updateCost(idx, 'paid', e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className={`text-xs font-semibold ${cost.paid ? 'text-emerald-700' : 'text-slate-500'}`}>
                      {cost.paid ? 'Zapłacono' : 'Do zapłaty'}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeCost(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Usuń koszt"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={addCost}
                className="text-xs font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1 px-2 py-1"
              >
                <Plus className="w-3.5 h-3.5" /> Dodaj koszt
              </button>
              {formCosts.length > 0 && (
                <span className="text-[11px] text-slate-600">
                  Razem: <strong>{formatPLN(liveCalc.costsNet)}</strong> netto + VAT{' '}
                  <strong>{formatPLN(liveCalc.costsVat)}</strong> ={' '}
                  <strong>{formatPLN(liveCalc.costsGross)}</strong> brutto
                </span>
              )}
            </div>
          </div>

          {/* NOTATKI */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notatki do umowy
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Dodatkowe ustalenia, kluczowe kamienie milowe lub uwagi do rozliczeń..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
            />
          </div>

          {/* STOPKA MODALA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
            {isEditing ? (
              <div>
                {!confirmDelete ? (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 inline-flex items-center gap-1.5 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Usuń umowę
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-rose-700">Na pewno usunąć?</span>
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(formData.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700"
                    >
                      Tak, usuń
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700"
                    >
                      Anuluj
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1E293B] hover:bg-slate-800 shadow-sm inline-flex items-center gap-2 transition"
              >
                <Check className="w-4 h-4" />
                {isEditing ? 'Zapisz zmiany' : 'Dodaj do harmonogramu'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// MODAL USTAWIEŃ USŁUG I PODATKÓW
// ============================================================================

function SettingsModal({ isOpen, onClose, settings, onSaveSettings }) {
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    if (isOpen) {
      setDraft(JSON.parse(JSON.stringify(settings)));
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const updateService = (idx, field, value) => {
    setDraft((prev) => {
      const next = [...prev.services];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, services: next };
    });
  };

  const addService = () => {
    setDraft((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          id: `srv-${Date.now()}`,
          name: 'Nowa usługa doradcza',
          defaultDays: 30,
          defaultPrice: 5000,
          defaultSubCost: 1000
        }
      ]
    }));
  };

  const removeService = (idx) => {
    if (draft.services.length <= 1) return;
    setDraft((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="bg-[#1E293B] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#DC2626] uppercase block">
              KONFIGURACJA MODELU FINANSOWEGO
            </span>
            <h2 className="text-lg font-bold mt-0.5">Ustawienia usług i podatków</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Parametry podatkowe */}
          <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900">
              Parametry podatkowe (przeliczają całą aplikację w czasie rzeczywistym)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stawka podatku VAT (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="1"
                  value={draft.vatRate}
                  onChange={(e) =>
                    setDraft({ ...draft, vatRate: Math.max(0, Number(e.target.value) || 0) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stawka podatku dochodowego PIT / CIT / Ryczałt (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={draft.pitRate}
                  onChange={(e) =>
                    setDraft({ ...draft, pitRate: Math.max(0, Number(e.target.value) || 0) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm font-bold"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-purple-200 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(draft.deductSubcontractor)}
                onChange={(e) =>
                  setDraft({ ...draft, deductSubcontractor: e.target.checked })
                }
                className="w-4 h-4 rounded text-purple-700 focus:ring-purple-600"
              />
              <div>
                <span className="text-sm font-semibold text-slate-800 block">
                  Odliczaj koszty (podwykonawcy, koszty projektów i koszty firmy) od podstawy PIT/CIT
                </span>
                <span className="text-xs text-slate-500">
                  Odznacz, jeśli rozliczasz się ryczałtem od przychodów ewidencjonowanych (podatek od
                  pełnej kwoty netto).
                </span>
              </div>
            </label>
          </div>

          {/* Katalog usług */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Katalog usług i wartości domyślne
              </h3>
              <button
                type="button"
                onClick={addService}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Dodaj usługę
              </button>
            </div>

            <div className="space-y-2.5">
              {draft.services.map((srv, idx) => (
                <div
                  key={srv.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center bg-slate-50 p-3 rounded-xl border border-slate-200"
                >
                  <div className="sm:col-span-5">
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                      Nazwa produktu / usługi
                    </label>
                    <input
                      type="text"
                      value={srv.name}
                      onChange={(e) => updateService(idx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                      Czas (dni)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={srv.defaultDays}
                      onChange={(e) =>
                        updateService(idx, 'defaultDays', Math.max(1, Number(e.target.value) || 1))
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                      Cena netto (zł)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={srv.defaultPrice}
                      onChange={(e) =>
                        updateService(idx, 'defaultPrice', Math.max(0, Number(e.target.value) || 0))
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
                      Podwyk. (zł)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={srv.defaultSubCost}
                      onChange={(e) =>
                        updateService(
                          idx,
                          'defaultSubCost',
                          Math.max(0, Number(e.target.value) || 0)
                        )
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-4">
                    {draft.services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Usuń z katalogu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1E293B] hover:bg-slate-800 inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Zastosuj ustawienia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// WIDOK 1: HARMONOGRAM I OŚ CZASU (GANTT + CASH FLOW TYGODNIOWY)
// ============================================================================

// ============================================================================
// OKNO ROZSZYFROWANIA KWOT (kliknięcie w kwotę na osi czasu)
// ============================================================================

function TaxPaymentDetails({ p, settings }) {
  const m = p.m;
  const rate = Number(settings.pitRate) || 0;
  const row = (label, value, strong) => (
    <div className={`flex justify-between gap-3 ${strong ? 'font-bold text-slate-900 border-t border-slate-200 pt-1' : 'text-slate-600'}`}>
      <span>{label}</span>
      <span className="whitespace-nowrap">{value}</span>
    </div>
  );
  return (
    <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-3 space-y-1.5 text-xs">
      <div className="font-bold text-purple-900">
        {p.kind === 'VAT' ? 'VAT' : 'Zaliczka PIT/CIT'} za {m.label} — termin {formatFullDate(p.date)}
      </div>
      {p.kind === 'VAT' ? (
        <>
          {row('VAT należny (ze sprzedaży w tym miesiącu)', formatPLN(m.vatOut))}
          {row('− VAT naliczony (z faktur kosztowych w tym miesiącu)', `-${formatPLN(m.vatIn)}`)}
          {m.vatCarryIn > 0 && row('− nadwyżka VAT z poprzednich miesięcy', `-${formatPLN(m.vatCarryIn)}`)}
          {row('= VAT do zapłaty (do 25. dnia następnego miesiąca)', formatPLN(m.vatPayable), true)}
          {m.vatCarryOut > 0 && row('Nadwyżka przechodzi na kolejny miesiąc', formatPLN(m.vatCarryOut))}
        </>
      ) : settings.deductSubcontractor ? (
        <>
          {row('Przychód netto w tym miesiącu', formatPLN(m.revenueNet))}
          {row('− koszty netto w tym miesiącu', `-${formatPLN(m.costsNet)}`)}
          {row(`Dochód narastająco od stycznia ${m.key.slice(0, 4)}`, formatPLN(m.ytdBase))}
          {row(`× stawka ${rate}% = podatek narastająco`, formatPLN(m.pitDueYtd))}
          {row('− zaliczki należne za wcześniejsze miesiące roku', `-${formatPLN(m.pitPaidBefore)}`)}
          {row('= zaliczka do zapłaty (do 20. dnia następnego miesiąca)', formatPLN(m.pitAdvance), true)}
        </>
      ) : (
        <>
          {row('Przychód netto w tym miesiącu', formatPLN(m.revenueNet))}
          {row(`× stawka ryczałtu ${rate}%`, '')}
          {row('= podatek do zapłaty (do 20. dnia następnego miesiąca)', formatPLN(m.pitAdvance), true)}
        </>
      )}
      <details className="pt-1">
        <summary className="cursor-pointer text-purple-800 font-semibold">Z czego to wynika (dokumenty miesiąca)</summary>
        <div className="mt-1.5 space-y-1">
          <div className="font-semibold text-slate-700">Sprzedaż (raty klientów):</div>
          {m.sales.length === 0 && <div className="text-slate-400">brak</div>}
          {m.sales.map((s, i) => (
            <div key={i} className="flex justify-between gap-2 text-slate-600">
              <span>{formatFullDate(s.date)} • {s.name}</span>
              <span className="whitespace-nowrap">netto {formatPLN(s.net)} • VAT {formatPLN(s.vat)}</span>
            </div>
          ))}
          <div className="font-semibold text-slate-700 pt-1">Koszty (faktury kosztowe):</div>
          {m.purchases.length === 0 && <div className="text-slate-400">brak</div>}
          {m.purchases.map((s, i) => (
            <div key={i} className="flex justify-between gap-2 text-slate-600">
              <span>{formatFullDate(s.date)} • {s.name}</span>
              <span className="whitespace-nowrap">netto {formatPLN(s.net)} • VAT {formatPLN(s.vat)}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

function BreakdownModal({ data, onClose, settings }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const { title, subtitle, inflows = [], outflows = [], taxes = [], totals } = data;
  const sumBy = (arr, f) => arr.reduce((s, x) => s + (Number(f(x)) || 0), 0);

  const ItemTable = ({ items, sign }) => (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
          <th className="text-left py-1">Data • pozycja</th>
          <th className="text-right py-1">Netto</th>
          <th className="text-right py-1">VAT</th>
          <th className="text-right py-1">Brutto</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it, i) => (
          <tr key={i} className="border-b border-slate-100">
            <td className="py-1 pr-2">{formatFullDate(it.date)} • {it.name}</td>
            <td className="py-1 text-right whitespace-nowrap">{formatPLN(it.net)}</td>
            <td className="py-1 text-right whitespace-nowrap">{formatPLN(it.vat)}</td>
            <td className="py-1 text-right whitespace-nowrap font-bold">{sign}{formatPLN(it.gross)}</td>
          </tr>
        ))}
        <tr className="font-bold">
          <td className="py-1">Razem</td>
          <td className="py-1 text-right">{formatPLN(sumBy(items, (x) => x.net))}</td>
          <td className="py-1 text-right">{formatPLN(sumBy(items, (x) => x.vat))}</td>
          <td className="py-1 text-right">{sign}{formatPLN(sumBy(items, (x) => x.gross))}</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 grid place-items-center p-3" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#1E293B] text-white px-5 py-3.5 flex items-start justify-between gap-3 sticky top-0">
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#DC2626] uppercase block">Szczegóły kwoty</span>
            <h2 className="text-base font-bold">{title}</h2>
            {subtitle && <div className="text-xs text-slate-300">{subtitle}</div>}
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-700 cursor-pointer" aria-label="Zamknij">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {inflows.length > 0 && (
            <div>
              <div className="text-xs font-bold text-amber-900 mb-1">Wpływy od klientów (raty brutto)</div>
              <ItemTable items={inflows} sign="+" />
            </div>
          )}
          {outflows.length > 0 && (
            <div>
              <div className="text-xs font-bold text-rose-900 mb-1">Wydatki: koszty i podwykonawcy (brutto, w dniu płatności)</div>
              <ItemTable items={outflows} sign="-" />
            </div>
          )}
          {taxes.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-purple-900">Podatki płatne w tym okresie</div>
              {taxes.map((p, i) => (
                <TaxPaymentDetails key={i} p={p} settings={settings} />
              ))}
            </div>
          )}
          {inflows.length === 0 && outflows.length === 0 && taxes.length === 0 && (
            <p className="text-xs text-slate-500">Brak płatności w tym okresie.</p>
          )}
          {totals && (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs space-y-1">
              {totals.map(([label, value, strong], i) => (
                <div key={i} className={`flex justify-between ${strong ? 'font-bold text-slate-900 border-t border-slate-200 pt-1' : 'text-slate-600'}`}>
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineGanttView({
  contracts,
  costs = [],
  settings,
  timelineStart,
  setTimelineStart,
  weeksCount,
  setWeeksCount,
  onSelectContract
}) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const weekTitle = (w) => `${w.label}: tydzień ${formatShortDate(w.start)}–${formatShortDate(w.end)}`;
  const openBreakdown = (e, data) => {
    e.stopPropagation();
    setBreakdown(data);
  };
  const chipBtn = 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-slate-400 transition';
  const weekBreakdown = (w, mode) => {
    const out = w.subOutflow + w.costOutflow + w.taxOutflow;
    const base = { subtitle: weekTitle(w) };
    if (mode === 'in') return { ...base, title: 'Wpływy od klientów', inflows: w.inflowItems };
    if (mode === 'out') return { ...base, title: 'Wydatki (koszty + podatki)', outflows: w.outItems, taxes: w.taxItems, totals: [
      ['Koszty i podwykonawcy (brutto)', `-${formatPLN(w.subOutflow + w.costOutflow)}`],
      ['Podatki (VAT + PIT/CIT)', `-${formatPLN(w.taxOutflow)}`],
      ['Razem wydatki', `-${formatPLN(out)}`, true]
    ] };
    const totals = [
      ['+ Wpływy', `+${formatPLN(w.inflow)}`],
      ['− Koszty i podwykonawcy', `-${formatPLN(w.subOutflow + w.costOutflow)}`],
      ['− Podatki', `-${formatPLN(w.taxOutflow)}`],
      ['= Saldo tygodnia', formatPLN(w.netBalance), true]
    ];
    if (mode === 'cum') {
      totals.push(['Saldo narastające do poprzedniego tygodnia', formatPLN(w.cumulativeBalance - w.netBalance)]);
      totals.push(['= Skumulowany cash flow (od początku osi czasu)', formatPLN(w.cumulativeBalance), true]);
    }
    return { ...base, title: mode === 'cum' ? 'Skumulowany cash flow' : 'Saldo tygodnia', inflows: w.inflowItems, outflows: w.outItems, taxes: w.taxItems, totals };
  };
  const footBtn = 'w-full cursor-pointer hover:underline';

  // Generowanie tablicy tygodni zaczynając od poniedziałku wybranego tygodnia
  const weeks = useMemo(() => {
    const mondayStr = getMondayOfWeek(timelineStart);
    const result = [];
    for (let i = 0; i < weeksCount; i++) {
      const wStart = addDays(mondayStr, i * 7);
      const wEnd = addDays(wStart, 6);
      result.push({
        index: i,
        label: `T${i + 1}`,
        start: wStart,
        end: wEnd,
        rangeText: `${formatShortDate(wStart)}–${formatShortDate(wEnd)}`
      });
    }
    return result;
  }, [timelineStart, weeksCount]);

  // Przeliczenie macierzy komórek i sum tygodniowych
  const { rowsData, weeklySummary, costRow, taxRow } = useMemo(() => {
    const summary = weeks.map((w) => ({
      ...w,
      inflow: 0,
      subOutflow: 0,
      taxOutflow: 0,
      costOutflow: 0,
      taxRelief: 0,
      netBalance: 0,
      cumulativeBalance: 0
    }));

    // Koszty firmy: wypływ brutto w dniu kosztu (ich VAT i PIT/CIT są już w miesięcznym rozliczeniu podatków)
    const inWeek = (iso, w) => {
      const d = parseDate(iso);
      return d && d >= parseDate(w.start) && d <= parseDate(w.end);
    };
    summary.forEach((s) => {
      s.inflowItems = [];
      s.outItems = [];
      s.taxItems = [];
    });
    const vatR = Number(settings.vatRate) || 0;
    const costCells = weeks.map((w, wIdx) => {
      let out = 0;
      const items = [];
      costs.forEach((c) => {
        const cc = calculateCostFinancials(c, settings);
        if (inWeek(c.date, w)) {
          out += cc.gross;
          const it = { name: `${c.name} (koszt firmy${c.category ? ', ' + c.category : ''})`, date: c.date, net: cc.net, vat: cc.vat, gross: cc.gross };
          items.push(it);
          summary[wIdx].outItems.push(it);
        }
      });
      summary[wIdx].costOutflow += out;
      return { weekIndex: wIdx, out, items };
    });

    // Podatki: płatności z miesięcznego rozliczenia (VAT do 25., PIT/CIT do 20. następnego miesiąca)
    const schedule = buildTaxSchedule(contracts, costs, settings);
    const taxCells = weeks.map((w, wIdx) => {
      const items = schedule.payments.filter((p) => inWeek(p.date, w));
      const amount = items.reduce((s, p) => s + p.amount, 0);
      summary[wIdx].taxOutflow += amount;
      summary[wIdx].taxItems.push(...items);
      return { weekIndex: wIdx, amount, items };
    });

    const rows = contracts.map((ctr) => {
      const calc = calculateContractFinancials(ctr, settings);
      const ctrStart = parseDate(ctr.startDate);
      const ctrEnd = parseDate(ctr.endDate);

      const cells = weeks.map((w, wIdx) => {
        const wStartObj = parseDate(w.start);
        const wEndObj = parseDate(w.end);

        // Czy usługa trwa w tym tygodniu
        const isActive =
          ctrStart && ctrEnd && wStartObj && wEndObj
            ? ctrStart <= wEndObj && ctrEnd >= wStartObj
            : false;

        // Raty klienta przypadające na ten tydzień
        const weekInstallments = (ctr.installments || []).filter((inst) => {
          const d = parseDate(inst.dueDate);
          return d && d >= wStartObj && d <= wEndObj;
        });
        const inflowAmt = weekInstallments.reduce((s, x) => s + (Number(x.amount) || 0), 0);
        const inflowItems = weekInstallments.map((inst) => {
          const gross = Number(inst.amount) || 0;
          const vat = vatR > 0 ? (gross * vatR) / (100 + vatR) : 0;
          return { name: `${ctr.clientName} — ${inst.label || 'rata'}${inst.paid ? ' (opłacona)' : ''}`, date: inst.dueDate, gross, net: gross - vat, vat };
        });
        summary[wIdx].inflowItems.push(...inflowItems);

        // Wypłata podwykonawcy przypadająca na ten tydzień
        // (kwoty brutto: tyle faktycznie wychodzi z konta)
        let subAmt = 0;
        const outItems = [];
        if (calc.effectiveSubCost > 0 && ctr.subDueDate) {
          const subD = parseDate(ctr.subDueDate);
          if (subD && subD >= wStartObj && subD <= wEndObj) {
            subAmt = calc.subGross;
            outItems.push({ name: `Podwykonawca: ${ctr.subcontractorName || '—'} (${ctr.clientName}, ${ctr.subStatus})`, date: ctr.subDueDate, net: calc.effectiveSubCost, vat: calc.subVat, gross: calc.subGross });
          }
        }
        // Faktury kosztowe przypadające na ten tydzień
        (Array.isArray(ctr.costs) ? ctr.costs : []).forEach((cost) => {
          const d = parseDate(cost.dueDate);
          if (d && d >= wStartObj && d <= wEndObj) {
            const net = Math.max(0, Number(cost.net) || 0);
            const vat = Math.round(net * ((Number(cost.vatRate) || 0) / 100));
            subAmt += net + vat;
            outItems.push({ name: `${cost.name || 'Koszt projektu'} (${ctr.clientName})`, date: cost.dueDate, net, vat, gross: net + vat });
          }
        });
        summary[wIdx].outItems.push(...outItems);

        // Podatki liczone są miesięcznie dla całej firmy (osobny wiersz „Podatki”)
        const taxAmt = 0;

        summary[wIdx].inflow += inflowAmt;
        summary[wIdx].subOutflow += subAmt;

        return {
          weekIndex: wIdx,
          isActive,
          inflowAmt,
          weekInstallments,
          inflowItems,
          subAmt,
          outItems,
          taxAmt
        };
      });

      return {
        contract: ctr,
        calc,
        cells
      };
    });

    let running = 0;
    summary.forEach((w) => {
      w.netBalance = w.inflow - w.subOutflow - w.taxOutflow - w.costOutflow + w.taxRelief;
      running += w.netBalance;
      w.cumulativeBalance = running;
    });

    return { rowsData: rows, weeklySummary: summary, costRow: costCells, taxRow: taxCells };
  }, [contracts, costs, settings, weeks]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Pasek sterowania osią czasu + legenda */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <Calendar className="w-4 h-4 text-[#991B1B]" />
            <span className="text-xs font-semibold text-slate-600">Start osi czasu:</span>
            <input
              type="date"
              value={timelineStart}
              onChange={(e) => setTimelineStart(e.target.value)}
              className="text-xs font-bold text-slate-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1">
            {[12, 16, 20].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setWeeksCount(num)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  weeksCount === num
                    ? 'bg-[#1E293B] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {num} tyg.
              </button>
            ))}
          </div>
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 text-slate-600">
            <span className="w-4 h-2.5 rounded-xs bg-slate-700 inline-block" />
            Realizacja usługi
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-800 font-medium">
            <span className="px-1.5 py-0.5 rounded-sm bg-amber-100 border border-amber-300 text-[10px] font-bold">
              +Kwota
            </span>
            Rata klienta (brutto)
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-800 font-medium">
            <span className="px-1.5 py-0.5 rounded-sm bg-rose-100 border border-rose-300 text-[10px] font-bold">
              -Kwota
            </span>
            Podwykonawca
          </span>
          <span className="inline-flex items-center gap-1.5 text-purple-800 font-medium">
            <span className="px-1.5 py-0.5 rounded-sm bg-purple-100 border border-purple-300 text-[10px] font-bold">
              -Kwota
            </span>
            Podatki: VAT do 25., PIT/CIT do 20. następnego miesiąca
          </span>
        </div>
      </div>

      {/* Kontener przewijanej tabeli Gantta */}
      <div className="overflow-x-auto relative">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-100/90 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="sticky left-0 z-20 bg-slate-100 px-4 py-3 min-w-[230px] border-r border-slate-200">
                Klient i usługa
              </th>
              <th className="px-3 py-3 min-w-[105px] border-r border-slate-200 text-right">
                Netto / Zysk
              </th>
              {weeks.map((w) => (
                <th
                  key={w.index}
                  className="px-1.5 py-2 min-w-[84px] text-center border-r border-slate-200/70"
                >
                  <div className="text-slate-900 font-extrabold">{w.label}</div>
                  <div className="text-[10px] font-normal text-slate-500 mt-0.5">{w.rangeText}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/80 text-xs">
            {rowsData.length === 0 ? (
              <tr>
                <td colSpan={weeks.length + 2} className="py-12 text-center text-slate-500">
                  Brak umów spełniających wybrane kryteria filtrowania.
                </td>
              </tr>
            ) : (
              rowsData.map(({ contract, calc, cells }) => (
                <tr
                  key={contract.id}
                  onClick={() => onSelectContract(contract)}
                  className="hover:bg-slate-50/90 cursor-pointer transition group"
                >
                  {/* Sticky kolumna klienta */}
                  <td className="sticky left-0 z-10 bg-white group-hover:bg-slate-50 px-4 py-2.5 border-r border-slate-200">
                    <div className="font-bold text-slate-900 truncate max-w-[210px]">
                      {contract.clientName}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[11px] font-semibold text-[#991B1B]">
                        {contract.serviceName}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500">{calc.durationDays} dni</span>
                    </div>
                  </td>

                  {/* Kolumna Netto / Zysk netto */}
                  <td className="px-3 py-2.5 border-r border-slate-200 text-right whitespace-nowrap">
                    <div className="font-bold text-slate-800">{formatPLN(calc.netValue)}</div>
                    <div className="text-[11px] font-semibold text-emerald-700">
                      Zysk: {formatPLN(calc.netProfit)}
                    </div>
                  </td>

                  {/* Komórki tygodniowe Gantta */}
                  {cells.map((cell) => {
                    const hasEvents =
                      cell.inflowAmt > 0 || cell.subAmt > 0 || cell.taxAmt > 0 || cell.isActive;
                    return (
                      <td
                        key={cell.weekIndex}
                        onMouseEnter={() =>
                          hasEvents &&
                          setHoveredCell({
                            clientName: contract.clientName,
                            serviceName: contract.serviceName,
                            week: weeks[cell.weekIndex],
                            cell
                          })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`p-1 border-r border-slate-200/60 align-middle text-center relative transition ${
                          cell.isActive ? 'bg-slate-100/80' : ''
                        }`}
                      >
                        {/* Pasek trwania usługi na górze komórki */}
                        {cell.isActive && (
                          <div className="h-1.5 w-full rounded-full bg-[#1E293B] mb-1 opacity-85" />
                        )}

                        <div className="flex flex-col gap-1 items-center">
                          {cell.inflowAmt > 0 && (
                            <button
                              type="button"
                              onClick={(e) => openBreakdown(e, { title: `${contract.clientName}: wpływ od klienta`, subtitle: weekTitle(weeks[cell.weekIndex]), inflows: cell.inflowItems })}
                              className={`px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] leading-tight whitespace-nowrap shadow-2xs ${chipBtn}`}
                            >
                              +{formatPLN(cell.inflowAmt)}
                            </button>
                          )}
                          {cell.subAmt > 0 && (
                            <button
                              type="button"
                              onClick={(e) => openBreakdown(e, { title: `${contract.clientName}: koszty umowy`, subtitle: weekTitle(weeks[cell.weekIndex]), outflows: cell.outItems })}
                              className={`px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-300 font-bold text-[10px] leading-tight whitespace-nowrap ${chipBtn}`}
                            >
                              -{formatPLN(cell.subAmt)}
                            </button>
                          )}
                          {cell.taxAmt > 0 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300 font-bold text-[10px] leading-tight whitespace-nowrap">
                              -{formatPLN(cell.taxAmt)}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
            {costs.length > 0 && (
              <tr className="bg-orange-50/40">
                <td className="sticky left-0 z-10 bg-orange-50 px-4 py-2.5 border-r border-slate-200">
                  <div className="font-bold text-slate-900">Koszty firmy</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">brutto, w dniu kosztu</div>
                </td>
                <td className="px-3 py-2.5 border-r border-slate-200 text-right whitespace-nowrap text-[11px] text-slate-500">
                  {costs.length} poz.
                </td>
                {costRow.map((cell) => (
                  <td
                    key={cell.weekIndex}
                    className="p-1 border-r border-slate-200/60 align-middle text-center"
                    title={cell.items.map((i) => i.name).join(', ')}
                  >
                    <div className="flex flex-col gap-1 items-center">
                      {cell.out > 0 && (
                        <button
                          type="button"
                          onClick={(e) => openBreakdown(e, { title: 'Koszty firmy', subtitle: weekTitle(weeks[cell.weekIndex]), outflows: cell.items })}
                          className={`px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-900 border border-orange-300 font-bold text-[10px] leading-tight whitespace-nowrap ${chipBtn}`}
                        >
                          -{formatPLN(cell.out)}
                        </button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            )}
            <tr className="bg-purple-50/40">
              <td className="sticky left-0 z-10 bg-purple-50 px-4 py-2.5 border-r border-slate-200">
                <div className="font-bold text-slate-900">Podatki (miesięcznie)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">VAT do 25. • PIT/CIT do 20.</div>
              </td>
              <td className="px-3 py-2.5 border-r border-slate-200 text-right whitespace-nowrap text-[11px] text-slate-500">
                za poprzedni miesiąc
              </td>
              {taxRow.map((cell) => (
                <td
                  key={cell.weekIndex}
                  className="p-1 border-r border-slate-200/60 align-middle text-center"
                  title={cell.items.map((p) => `${p.kind} za ${p.month}: ${formatPLN(p.amount)} (do ${formatFullDate(p.date)})`).join('\n')}
                >
                  <div className="flex flex-col gap-1 items-center">
                    {cell.items.map((p, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={(e) => openBreakdown(e, { title: `${p.kind === 'VAT' ? 'VAT' : 'Zaliczka PIT/CIT'} za ${p.month}`, subtitle: `Termin płatności: ${formatFullDate(p.date)}`, taxes: [p] })}
                        className={`px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300 font-bold text-[10px] leading-tight whitespace-nowrap ${chipBtn}`}
                      >
                        {p.kind} -{formatPLN(p.amount)}
                      </button>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>

          {/* STOPKA PODSUMOWUJĄCA CASH FLOW TYGODNIOWY */}
          <tfoot className="border-t-2 border-slate-300 text-xs font-semibold">
            {/* Wiersz 1: Wpływy klientów */}
            <tr className="bg-amber-50/60 border-b border-slate-200">
              <td
                colSpan={2}
                className="sticky left-0 z-10 bg-amber-50 px-4 py-2 text-amber-950 font-bold border-r border-slate-200"
              >
                + Wpływy od klientów (brutto)
              </td>
              {weeklySummary.map((w) => (
                <td
                  key={w.index}
                  className="px-1.5 py-2 text-center border-r border-slate-200/70 text-amber-900 whitespace-nowrap"
                >
                  {w.inflow > 0 ? (
                    <button type="button" className={footBtn} onClick={(e) => openBreakdown(e, weekBreakdown(w, 'in'))}>
                      +{formatPLN(w.inflow)}
                    </button>
                  ) : '—'}
                </td>
              ))}
            </tr>

            {/* Wiersz 2: Wydatki (Podwykonawcy + Podatki) */}
            <tr className="bg-rose-50/50 border-b border-slate-200">
              <td
                colSpan={2}
                className="sticky left-0 z-10 bg-rose-50 px-4 py-2 text-rose-950 font-bold border-r border-slate-200"
              >
                - Wydatki (Koszty + Podatki)
              </td>
              {weeklySummary.map((w) => {
                const totalOut = w.subOutflow + w.taxOutflow + w.costOutflow - w.taxRelief;
                return (
                  <td
                    key={w.index}
                    className="px-1.5 py-2 text-center border-r border-slate-200/70 text-rose-800 whitespace-nowrap"
                  >
                    {totalOut !== 0 ? (
                      <button type="button" className={footBtn} onClick={(e) => openBreakdown(e, weekBreakdown(w, 'out'))}>
                        {`${totalOut > 0 ? '-' : '+'}${formatPLN(Math.abs(totalOut))}`}
                      </button>
                    ) : '—'}
                  </td>
                );
              })}
            </tr>

            {/* Wiersz 3: Saldo tygodnia */}
            <tr className="bg-slate-50 border-b border-slate-200">
              <td
                colSpan={2}
                className="sticky left-0 z-10 bg-slate-50 px-4 py-2 text-slate-800 font-bold border-r border-slate-200"
              >
                = Saldo tygodnia
              </td>
              {weeklySummary.map((w) => (
                <td
                  key={w.index}
                  className={`px-1.5 py-2 text-center border-r border-slate-200/70 font-bold whitespace-nowrap ${
                    w.netBalance > 0
                      ? 'text-emerald-700'
                      : w.netBalance < 0
                      ? 'text-rose-700'
                      : 'text-slate-400'
                  }`}
                >
                  <button type="button" className={footBtn} onClick={(e) => openBreakdown(e, weekBreakdown(w, 'saldo'))}>
                    {w.netBalance !== 0
                      ? `${w.netBalance > 0 ? '+' : ''}${formatPLN(w.netBalance)}`
                      : '0 zł'}
                  </button>
                </td>
              ))}
            </tr>

            {/* Wiersz 4: Skumulowany Cash Flow */}
            <tr className="bg-[#1E293B] text-white">
              <td
                colSpan={2}
                className="sticky left-0 z-10 bg-[#1E293B] px-4 py-2.5 font-bold tracking-wide border-r border-slate-700"
              >
                SKUMULOWANY CASH FLOW
              </td>
              {weeklySummary.map((w) => (
                <td
                  key={w.index}
                  className={`px-1.5 py-2.5 text-center border-r border-slate-700/80 font-extrabold whitespace-nowrap ${
                    w.cumulativeBalance >= 0 ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  <button type="button" className={footBtn} onClick={(e) => openBreakdown(e, weekBreakdown(w, 'cum'))}>
                    {formatPLN(w.cumulativeBalance)}
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {breakdown && <BreakdownModal data={breakdown} onClose={() => setBreakdown(null)} settings={settings} />}

      {/* Pływający pasek szczegółów po najechaniu na komórkę */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between min-h-[38px]">
        {hoveredCell ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-900">
              {hoveredCell.clientName} ({hoveredCell.serviceName})
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">
              {hoveredCell.week.label}: {hoveredCell.week.rangeText}
            </span>
            {hoveredCell.cell.inflowAmt > 0 && (
              <span className="text-amber-800 font-semibold">
                Wpływ klienta: +{formatPLN(hoveredCell.cell.inflowAmt)} (
                {hoveredCell.cell.weekInstallments
                  .map((i) => `${i.label} • ${formatShortDate(i.dueDate)}`)
                  .join(', ')}
                )
              </span>
            )}
            {hoveredCell.cell.subAmt > 0 && (
              <span className="text-rose-800 font-semibold">
                Wypłata podwykonawcy: -{formatPLN(hoveredCell.cell.subAmt)}
              </span>
            )}
            {hoveredCell.cell.taxAmt > 0 && (
              <span className="text-purple-800 font-semibold">
                Podatki (VAT+PIT): -{formatPLN(hoveredCell.cell.taxAmt)}
              </span>
            )}
          </div>
        ) : (
          <span className="text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Najedź na dowolny tydzień na osi, aby zobaczyć szczegóły płatności, lub kliknij wiersz,
            aby edytować umowę.
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// WIDOK 2: LISTA UMÓW I SZYBKIE ROZLICZENIA (ZAKŁADKA 2)
// ============================================================================

function ContractsTableView({
  contracts,
  settings,
  onEditContract,
  onUpdateStatus,
  onToggleInstallmentPaid,
  onToggleSubStatus
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/90 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="px-4 py-3.5">Klient i usługa</th>
              <th className="px-3 py-3.5">Status</th>
              <th className="px-3 py-3.5">Okres realizacji</th>
              <th className="px-3 py-3.5 text-right">Netto / Brutto</th>
              <th className="px-3 py-3.5">Raty klienta (kliknij, aby rozliczyć)</th>
              <th className="px-3 py-3.5">Podwykonawca</th>
              <th className="px-3 py-3.5 text-right">Podatki (VAT+PIT)</th>
              <th className="px-3 py-3.5 text-right">Zysk netto</th>
              <th className="px-4 py-3.5 text-right">Akcje</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/80 text-xs">
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-500">
                  Brak umów spełniających wybrane filtry.
                </td>
              </tr>
            ) : (
              contracts.map((ctr) => {
                const calc = calculateContractFinancials(ctr, settings);
                return (
                  <tr
                    key={ctr.id}
                    onClick={() => onEditContract(ctr)}
                    className="hover:bg-slate-50/90 cursor-pointer transition"
                  >
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 text-sm">{ctr.clientName}</div>
                      <div className="text-xs font-semibold text-[#991B1B] mt-0.5">
                        {ctr.serviceName}
                      </div>
                      {ctr.notes && (
                        <div className="text-[11px] text-slate-400 truncate max-w-[230px] mt-0.5">
                          {ctr.notes}
                        </div>
                      )}
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap">
                      <StatusBadge
                        status={ctr.status}
                        onChange={(newSt) => onUpdateStatus(ctr.id, newSt)}
                      />
                    </td>

                    <td className="px-3 py-3 whitespace-nowrap text-slate-700">
                      <div className="font-semibold">
                        {formatShortDate(ctr.startDate)} – {formatFullDate(ctr.endDate)}
                      </div>
                      <div className="text-[11px] text-slate-500">{calc.durationDays} dni</div>
                    </td>

                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <div className="font-bold text-slate-900">{formatPLN(calc.netValue)}</div>
                      <div className="text-[11px] text-slate-500">
                        Brutto: {formatPLN(calc.grossValue)}
                      </div>
                    </td>

                    {/* Interaktywne raty */}
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-wrap gap-1.5">
                        {(ctr.installments || []).map((inst) => (
                          <button
                            key={inst.id}
                            type="button"
                            onClick={() => onToggleInstallmentPaid(ctr.id, inst.id)}
                            title="Kliknij, aby zmienić status wpłaty raty"
                            className={`px-2 py-1 rounded-lg border text-[11px] font-semibold inline-flex items-center gap-1 transition ${
                              inst.paid
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                            }`}
                          >
                            {inst.paid ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Clock className="w-3 h-3 text-amber-600" />
                            )}
                            <span>{formatPLN(inst.amount)}</span>
                            <span className="opacity-70">({formatShortDate(inst.dueDate)})</span>
                          </button>
                        ))}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Wpłacono:{' '}
                        <strong className="text-emerald-700">{formatPLN(calc.paidGross)}</strong> •
                        Pozostało:{' '}
                        <strong className="text-amber-800">{formatPLN(calc.remainingGross)}</strong>
                      </div>
                    </td>

                    {/* Podwykonawca z szybkim przełącznikiem statusu */}
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      {calc.costsNet > 0 && (
                        <div className="text-[10px] text-rose-700 mb-1">
                          Koszty: -{formatPLN(calc.costsNet)} netto
                          {calc.costsVat > 0 && ` (VAT ${formatPLN(calc.costsVat)})`}
                        </div>
                      )}
                      {ctr.subStatus === 'Brak' || calc.effectiveSubCost === 0 ? (
                        <span className="text-slate-400 text-xs">Brak podwykonawcy</span>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-800 truncate max-w-[160px]">
                            {ctr.subcontractorName || 'Podwykonawca'}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-rose-700">
                              -{formatPLN(calc.effectiveSubCost)}
                            </span>
                            <button
                              type="button"
                              onClick={() => onToggleSubStatus(ctr.id)}
                              title="Kliknij, aby przełączyć status wypłaty"
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                                ctr.subStatus === 'Zapłacono'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                              }`}
                            >
                              {ctr.subStatus}
                            </button>
                          </div>
                          {ctr.subDueDate && (
                            <div className="text-[10px] text-slate-400">
                              Termin: {formatFullDate(ctr.subDueDate)}
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Podatki */}
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <div className="font-bold text-purple-800">
                        -{formatPLN(calc.totalTaxes)}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        VAT {formatPLN(Math.max(0, calc.vatPayable))} + PIT {formatPLN(calc.pitAmount)}
                      </div>
                      {calc.inputVat > 0 && (
                        <div className="text-[10px] text-slate-400">
                          (VAT {formatPLN(calc.vatAmount)} − {formatPLN(calc.inputVat)} z kosztów)
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400">płatne co miesiąc</div>
                    </td>

                    {/* Zysk netto */}
                    <td className="px-3 py-3 text-right whitespace-nowrap">
                      <div className="text-sm font-extrabold text-emerald-700">
                        {formatPLN(calc.netProfit)}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        Marża {calc.netMargin.toFixed(1)}%
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditContract(ctr);
                        }}
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                        title="Edytuj umowę"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// WIDOK 3: ANALIZA CASH FLOW I RENTOWNOŚCI USŁUG (ZAKŁADKA 3)
// ============================================================================

function AnalyticsView({ contracts, costs = [], settings }) {
  const [hoveredMonth, setHoveredMonth] = useState(null);

  // Agregacja miesięczna przepływów (Wpływy brutto, Podwykonawcy, Podatki, Skumulowane saldo)
  const monthlyData = useMemo(() => {
    const map = {};

    const ensureMonth = (isoDate) => {
      if (!isoDate || isoDate.length < 7) return null;
      const key = isoDate.slice(0, 7); // YYYY-MM
      if (!map[key]) {
        const [y, m] = key.split('-');
        const monthNames = [
          'Sty',
          'Lut',
          'Mar',
          'Kwi',
          'Maj',
          'Cze',
          'Lip',
          'Sie',
          'Wrz',
          'Paź',
          'Lis',
          'Gru'
        ];
        map[key] = {
          key,
          label: `${monthNames[Number(m) - 1]} ${y}`,
          inflow: 0,
          subOutflow: 0,
          taxOutflow: 0,
          netCash: 0,
          cumulative: 0
        };
      }
      return map[key];
    };

    contracts.forEach((ctr) => {
      const calc = calculateContractFinancials(ctr, settings);

      (ctr.installments || []).forEach((inst) => {
        const bucket = ensureMonth(inst.dueDate);
        if (bucket) bucket.inflow += Number(inst.amount) || 0;
      });

      if (calc.effectiveSubCost > 0 && ctr.subDueDate) {
        const bucket = ensureMonth(ctr.subDueDate);
        if (bucket) bucket.subOutflow += calc.subGross;
      }

      (Array.isArray(ctr.costs) ? ctr.costs : []).forEach((cost) => {
        const bucket = ensureMonth(cost.dueDate);
        const net = Math.max(0, Number(cost.net) || 0);
        if (bucket) bucket.subOutflow += net + Math.round(net * ((Number(cost.vatRate) || 0) / 100));
      });
    });

    // Koszty firmy: brutto w miesiącu kosztu (razem z podwykonawcami)
    costs.forEach((c) => {
      const cc = calculateCostFinancials(c, settings);
      const bucket = ensureMonth(c.date);
      if (bucket) bucket.subOutflow += cc.gross;
    });

    // Podatki: miesięczne rozliczenie (VAT do 25., PIT/CIT do 20. następnego miesiąca)
    buildTaxSchedule(contracts, costs, settings).payments.forEach((p) => {
      const bucket = ensureMonth(p.date);
      if (bucket) bucket.taxOutflow += p.amount;
    });

    const sorted = Object.values(map).sort((a, b) => a.key.localeCompare(b.key));
    let running = 0;
    sorted.forEach((m) => {
      m.netCash = m.inflow - m.subOutflow - m.taxOutflow;
      running += m.netCash;
      m.cumulative = running;
    });
    return sorted;
  }, [contracts, costs, settings]);

  // Agregacja rentowności według rodzaju usługi
  const serviceStats = useMemo(() => {
    const map = {};
    settings.services.forEach((s) => {
      map[s.name] = {
        serviceName: s.name,
        count: 0,
        netRevenue: 0,
        subCost: 0,
        taxes: 0,
        netProfit: 0
      };
    });

    contracts.forEach((ctr) => {
      const calc = calculateContractFinancials(ctr, settings);
      if (!map[ctr.serviceName]) {
        map[ctr.serviceName] = {
          serviceName: ctr.serviceName,
          count: 0,
          netRevenue: 0,
          subCost: 0,
          taxes: 0,
          netProfit: 0
        };
      }
      map[ctr.serviceName].count += 1;
      map[ctr.serviceName].netRevenue += calc.netValue;
      map[ctr.serviceName].subCost += calc.totalCostsNet;
      map[ctr.serviceName].taxes += calc.totalTaxes;
      map[ctr.serviceName].netProfit += calc.netProfit;
    });

    // Koszty firmy: przypisane do produktu liczą się w jego wyniku, pozostałe w osobnym wierszu
    const shared = { net: 0, relief: 0, citRelief: 0, count: 0 };
    costs.forEach((c) => {
      const cc = calculateCostFinancials(c, settings);
      const target = c.serviceName && map[c.serviceName];
      if (target) {
        target.subCost += cc.net;
        target.taxes -= cc.taxRelief;
        target.netProfit += cc.citRelief - cc.net;
      } else {
        shared.net += cc.net;
        shared.relief += cc.taxRelief;
        shared.citRelief += cc.citRelief;
        shared.count += 1;
      }
    });

    const list = Object.values(map).sort((a, b) => b.netRevenue - a.netRevenue);
    list.shared = shared;
    return list;
  }, [contracts, costs, settings]);

  const maxMonthlyVal = useMemo(() => {
    let max = 1000;
    monthlyData.forEach((m) => {
      max = Math.max(max, m.inflow, m.subOutflow + m.taxOutflow, Math.abs(m.cumulative));
    });
    return max * 1.15;
  }, [monthlyData]);

  const maxServiceVal = useMemo(() => {
    let max = 1000;
    serviceStats.forEach((s) => {
      max = Math.max(max, s.netRevenue);
    });
    return max;
  }, [serviceStats]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* LEWY WYKRES: MIESIĘCZNE PRZEPŁYWY PIENIĘŻNE + SKUMULOWANY CASH FLOW */}
      <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Miesięczny plan przepływów pieniężnych (Cash Flow)
              </h3>
              <p className="text-xs text-slate-500">
                Zestawienie wpływów brutto, wypłat dla podwykonawców, podatków oraz salda
                narastającego
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold">
              <span className="inline-flex items-center gap-1.5 text-amber-800">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" /> Wpływy brutto
              </span>
              <span className="inline-flex items-center gap-1.5 text-rose-800">
                <span className="w-2.5 h-2.5 rounded-xs bg-rose-600" /> Koszty i podwykonawcy (brutto)
              </span>
              <span className="inline-flex items-center gap-1.5 text-purple-800">
                <span className="w-2.5 h-2.5 rounded-xs bg-purple-700" /> Podatki
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-800">
                <span className="w-3 h-0.5 bg-emerald-600 inline-block" /> Skumulowane
              </span>
            </div>
          </div>

          {monthlyData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-sm text-slate-400">
              Brak danych do wyświetlenia wykresu.
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${Math.max(540, monthlyData.length * 105)} 270`}
                className="w-full h-64 overflow-visible"
              >
                {/* Linie siatki poziomej */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = 210 - ratio * 180;
                  const val = Math.round(maxMonthlyVal * ratio);
                  return (
                    <g key={idx}>
                      <line
                        x1="55"
                        y1={y}
                        x2={Math.max(520, monthlyData.length * 105 - 15)}
                        y2={y}
                        stroke="#E2E8F0"
                        strokeDasharray={ratio === 0 ? '' : '3 3'}
                      />
                      <text
                        x="48"
                        y={y + 4}
                        textAnchor="end"
                        className="fill-slate-400 text-[10px] font-medium"
                      >
                        {val >= 1000 ? `${Math.round(val / 1000)}k` : val}
                      </text>
                    </g>
                  );
                })}

                {/* Słupki dla każdego miesiąca */}
                {monthlyData.map((m, idx) => {
                  const groupX = 75 + idx * 100;
                  const inflowH = (m.inflow / maxMonthlyVal) * 180;
                  const subH = (Math.max(0, m.subOutflow) / maxMonthlyVal) * 180;
                  const taxH = (Math.max(0, m.taxOutflow) / maxMonthlyVal) * 180;

                  return (
                    <g
                      key={m.key}
                      onMouseEnter={() => setHoveredMonth(m)}
                      onMouseLeave={() => setHoveredMonth(null)}
                      className="cursor-pointer"
                    >
                      {/* Obszar podświetlenia przy najechaniu */}
                      <rect
                        x={groupX - 10}
                        y={25}
                        width="72"
                        height="190"
                        rx="8"
                        fill={hoveredMonth?.key === m.key ? '#F1F5F9' : 'transparent'}
                      />

                      {/* Słupek 1: Wpływy */}
                      <rect
                        x={groupX}
                        y={210 - inflowH}
                        width="16"
                        height={Math.max(0, inflowH)}
                        rx="3"
                        fill="#D97706"
                      />

                      {/* Słupek 2: Podwykonawcy */}
                      <rect
                        x={groupX + 20}
                        y={210 - subH}
                        width="16"
                        height={Math.max(0, subH)}
                        rx="3"
                        fill="#DC2626"
                      />

                      {/* Słupek 3: Podatki */}
                      <rect
                        x={groupX + 40}
                        y={210 - taxH}
                        width="16"
                        height={Math.max(0, taxH)}
                        rx="3"
                        fill="#7E22CE"
                      />

                      {/* Etykieta miesiąca */}
                      <text
                        x={groupX + 28}
                        y="232"
                        textAnchor="middle"
                        className="fill-slate-700 text-[11px] font-bold"
                      >
                        {m.label}
                      </text>
                    </g>
                  );
                })}

                {/* Linia skumulowanego Cash Flow */}
                {monthlyData.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={monthlyData
                      .map((m, idx) => {
                        const x = 75 + idx * 100 + 28;
                        const clamped = Math.max(0, m.cumulative);
                        const y = 210 - (clamped / maxMonthlyVal) * 180;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                )}

                {/* Punkty na linii skumulowanej */}
                {monthlyData.map((m, idx) => {
                  const x = 75 + idx * 100 + 28;
                  const clamped = Math.max(0, m.cumulative);
                  const y = 210 - (clamped / maxMonthlyVal) * 180;
                  return (
                    <circle
                      key={`pt-${m.key}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#15803D"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>
          )}
        </div>

        {/* Pasek informacyjny pod wykresem */}
        <div className="mt-3 pt-3 border-t border-slate-100 text-xs flex flex-wrap items-center justify-between gap-2 min-h-[36px]">
          {hoveredMonth ? (
            <>
              <span className="font-bold text-slate-900">{hoveredMonth.label}:</span>
              <span className="text-amber-800 font-semibold">
                Wpływy: +{formatPLN(hoveredMonth.inflow)}
              </span>
              <span className="text-rose-700 font-semibold">
                Koszty: -{formatPLN(hoveredMonth.subOutflow)}
              </span>
              <span className="text-purple-700 font-semibold">
                Podatki: {hoveredMonth.taxOutflow >= 0 ? '-' : '+'}{formatPLN(Math.abs(hoveredMonth.taxOutflow))}
              </span>
              <span className="text-emerald-700 font-extrabold">
                Skumulowane: {formatPLN(hoveredMonth.cumulative)}
              </span>
            </>
          ) : (
            <span className="text-slate-400">
              Najedź na wybrany miesiąc na wykresie, aby sprawdzić dokładne przepływy pieniężne.
            </span>
          )}
        </div>
      </div>

      {/* PRAWY PANEL: RENTOWNOŚĆ WEDŁUG PRODUKTU */}
      <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Rentowność według produktów marki
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Porównanie przychodu netto, kosztów (podwykonawcy, koszty projektu i koszty firmy przypisane do produktu), podatków oraz czystego zysku
          </p>

          <div className="space-y-4">
            {serviceStats.map((item) => {
              const revPct = maxServiceVal > 0 ? (item.netRevenue / maxServiceVal) * 100 : 0;
              const profitPct = maxServiceVal > 0 ? (Math.max(0, item.netProfit) / maxServiceVal) * 100 : 0;
              const margin =
                item.netRevenue > 0 ? ((item.netProfit / item.netRevenue) * 100).toFixed(1) : '0.0';

              return (
                <div
                  key={item.serviceName}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{item.serviceName}</span>
                      <span className="ml-2 text-xs font-semibold text-slate-500">
                        ({item.count} {item.count === 1 ? 'umowa' : item.count < 5 ? 'umowy' : 'umów'})
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Marża {margin}%
                    </span>
                  </div>

                  {/* Paski porównawcze */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-24 text-slate-500 shrink-0">Przychód netto:</span>
                      <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1E293B] rounded-full"
                          style={{ width: `${revPct}%` }}
                        />
                      </div>
                      <span className="w-20 text-right font-bold text-slate-800">
                        {formatPLN(item.netRevenue)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-24 text-slate-500 shrink-0">Zysk netto:</span>
                      <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${profitPct}%` }}
                        />
                      </div>
                      <span className="w-20 text-right font-extrabold text-emerald-700">
                        {formatPLN(item.netProfit)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/70">
                    <span>Koszty: -{formatPLN(item.subCost)}</span>
                    <span>
                      Podatki (VAT+PIT): {item.taxes >= 0 ? '-' : '+'}
                      {formatPLN(Math.abs(item.taxes))}
                    </span>
                  </div>
                </div>
              );
            })}

            {serviceStats.shared && serviceStats.shared.count > 0 && (
              <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    Koszty wspólne firmy{' '}
                    <span className="text-xs text-slate-500 font-normal">
                      ({serviceStats.shared.count} poz., bez przypisanego produktu)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>Koszty netto: -{formatPLN(serviceStats.shared.net)}</span>
                  <span className="text-emerald-700">
                    Obniża podatki (VAT + PIT/CIT) o {formatPLN(serviceStats.shared.relief)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-800 pt-1 border-t border-orange-200">
                  <span>Wpływ na zysk netto:</span>
                  <span className="text-rose-700">
                    -{formatPLN(serviceStats.shared.net - serviceStats.shared.citRelief)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// KOSZTY FIRMY: KARTA KOSZTU I LISTA (ZAKŁADKA 4)
// ============================================================================

function CostModal({ isOpen, onClose, onSave, onDelete, initialCost, settings }) {
  const empty = () => ({
    id: `cost-${Date.now()}`,
    name: '',
    category: COST_CATEGORIES[0],
    date: toISODate(new Date()),
    netAmount: '',
    vatRate: Number(settings.vatRate) || 23,
    paid: false,
    serviceName: '',
    notes: ''
  });
  const [form, setForm] = useState(empty);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(initialCost ? { ...initialCost } : empty());
      setConfirmDelete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialCost]);

  if (!isOpen) return null;
  const calc = calculateCostFinancials(form, settings);
  const field = 'w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm';

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.date) return;
    onSave({ ...form, name: form.name.trim(), netAmount: Number(form.netAmount) || 0, vatRate: Number(form.vatRate) || 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
      >
        <div className="bg-[#1E293B] text-white px-6 py-4 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-bold tracking-[0.18em] text-[#F87171] uppercase">Koszty firmy</div>
            <h2 className="text-lg font-bold">{initialCost ? 'Edycja kosztu' : 'Nowy koszt (faktura kosztowa)'}</h2>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-slate-700 cursor-pointer" aria-label="Zamknij">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nazwa / dostawca *</label>
            <input className={field} required placeholder="np. Czynsz biura, reklama Meta, księgowość" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kategoria</label>
              <select className={field} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {COST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Data płatności *</label>
              <input type="date" required className={field} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kwota netto (PLN)</label>
              <input type="number" min="0" step="0.01" className={`${field} font-semibold`} value={form.netAmount} onChange={(e) => setForm({ ...form, netAmount: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">VAT na fakturze</label>
              <select className={field} value={String(form.vatRate)} onChange={(e) => setForm({ ...form, vatRate: Number(e.target.value) })}>
                {COST_VAT_OPTIONS.map((r) => <option key={r} value={r}>{r === 0 ? 'Bez VAT / zw.' : `${r}%`}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Przypisz do produktu</label>
            <select className={field} value={form.serviceName || ''} onChange={(e) => setForm({ ...form, serviceName: e.target.value })}>
              <option value="">Cała firma (koszt wspólny)</option>
              {(settings.services || []).map((sv) => <option key={sv.id || sv.name} value={sv.name}>{sv.name}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={!!form.paid} onChange={(e) => setForm({ ...form, paid: e.target.checked })} />
            Zapłacono
          </label>
          <textarea className={field} rows={2} placeholder="Notatki (opcjonalnie)" value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

          <div className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600"><span>Do zapłaty brutto:</span><b className="text-slate-900">{formatPLN(calc.gross)}</b></div>
            <div className="flex justify-between text-slate-600"><span>VAT do odliczenia (obniża VAT do zapłaty):</span><b className="text-emerald-700">-{formatPLN(calc.vat)}</b></div>
            <div className="flex justify-between text-slate-600">
              <span>Obniżenie PIT/CIT ({settings.pitRate}% od netto){settings.deductSubcontractor ? '' : ' — wyłączone (ryczałt)'}:</span>
              <b className="text-emerald-700">-{formatPLN(calc.citRelief)}</b>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-slate-200 font-bold text-slate-800">
              <span>Rzeczywisty koszt po obniżeniu podatków:</span><span>{formatPLN(calc.gross - calc.taxRelief)}</span>
            </div>
            {form.date && monthKey(form.date) && (
              <div className="text-[11px] text-slate-500">
                VAT odliczysz w deklaracji za {monthLabel(monthKey(form.date))} (płatność do{' '}
                {formatFullDate(nextMonthDay(monthKey(form.date), 25))}), koszt obniży zaliczkę PIT/CIT za ten
                miesiąc (płatność do {formatFullDate(nextMonthDay(monthKey(form.date), 20))}).
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          {initialCost ? (
            confirmDelete ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-700 font-semibold">Usunąć koszt?</span>
                <button type="button" className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold cursor-pointer" onClick={() => { onDelete(form.id); onClose(); }}>Tak, usuń</button>
                <button type="button" className="px-3 py-1.5 rounded-lg bg-slate-200 cursor-pointer" onClick={() => setConfirmDelete(false)}>Nie</button>
              </div>
            ) : (
              <button type="button" className="text-xs font-semibold text-rose-700 inline-flex items-center gap-1 cursor-pointer" onClick={() => setConfirmDelete(true)}>
                <Trash2 className="w-4 h-4" /> Usuń koszt
              </button>
            )
          ) : <span />}
          <button className="px-5 py-2 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white text-sm font-bold cursor-pointer">
            {initialCost ? 'Zapisz zmiany' : 'Dodaj koszt'}
          </button>
        </div>
      </form>
    </div>
  );
}

function CostsView({ costs, settings, onAdd, onEdit, onTogglePaid }) {
  const sorted = [...costs].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  const totals = sorted.reduce(
    (t, c) => {
      const cc = calculateCostFinancials(c, settings);
      t.net += cc.net; t.vat += cc.vat; t.gross += cc.gross; t.cit += cc.citRelief;
      return t;
    },
    { net: 0, vat: 0, gross: 0, cit: 0 }
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Koszty firmy (faktury kosztowe)</h3>
          <p className="text-xs text-slate-500">
            Koszty netto obniżają podstawę PIT/CIT, a VAT z faktur kosztowych obniża VAT do zapłaty.
          </p>
        </div>
        <button type="button" onClick={onAdd} className="px-4 py-2 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" /> Dodaj koszt
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-100/90 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="px-4 py-3">Data</th>
              <th className="px-3 py-3">Nazwa i kategoria</th>
              <th className="px-3 py-3 text-right">Netto</th>
              <th className="px-3 py-3 text-right">VAT</th>
              <th className="px-3 py-3 text-right">Brutto</th>
              <th className="px-3 py-3 text-right">Obniża podatki o</th>
              <th className="px-3 py-3 text-center">Status</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  Brak kosztów. Dodaj pierwszą fakturę kosztową przyciskiem „Dodaj koszt”.
                </td>
              </tr>
            ) : (
              sorted.map((c) => {
                const cc = calculateCostFinancials(c, settings);
                return (
                  <tr key={c.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => onEdit(c)}>
                    <td className="px-4 py-3 whitespace-nowrap font-semibold text-slate-700">{formatFullDate(c.date)}</td>
                    <td className="px-3 py-3">
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {c.category} • {c.serviceName || 'Cała firma'}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right font-semibold whitespace-nowrap">{formatPLN(cc.net)}</td>
                    <td className="px-3 py-3 text-right whitespace-nowrap text-slate-600">
                      {formatPLN(cc.vat)} <span className="text-[10px]">({Number(c.vatRate) || 0}%)</span>
                    </td>
                    <td className="px-3 py-3 text-right font-bold text-orange-800 whitespace-nowrap">-{formatPLN(cc.gross)}</td>
                    <td className="px-3 py-3 text-right font-semibold text-emerald-700 whitespace-nowrap">+{formatPLN(cc.taxRelief)}</td>
                    <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onTogglePaid(c)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer ${
                          c.paid ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {c.paid ? 'Zapłacono' : 'Do zapłaty'}
                      </button>
                    </td>
                    <td className="px-3 py-3 text-right"><Edit3 className="w-4 h-4 text-slate-400 inline" /></td>
                  </tr>
                );
              })
            )}
          </tbody>
          {sorted.length > 0 && (
            <tfoot className="border-t-2 border-slate-300 bg-slate-50 font-bold text-xs">
              <tr>
                <td className="px-4 py-3" colSpan={2}>Razem ({sorted.length})</td>
                <td className="px-3 py-3 text-right">{formatPLN(totals.net)}</td>
                <td className="px-3 py-3 text-right">{formatPLN(totals.vat)}</td>
                <td className="px-3 py-3 text-right text-orange-800">-{formatPLN(totals.gross)}</td>
                <td className="px-3 py-3 text-right text-emerald-700">+{formatPLN(totals.vat + totals.cit)}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// GŁÓWNA APLIKACJA: JACEK SZELA — BIZNES BEZ DRAMATÓW
// ============================================================================

/**
 * Dane przychodzą z Firestore (props), a każda zmiana jest zapisywana przez store.
 * setContracts/setSettings zachowują dawny interfejs (updater), ale zapisują tylko różnice.
 */
export default function App({ contracts, costs, settings, store, workspaceName, userEmail, onOpenTeam, onLogout }) {
  const setContracts = (updater) => {
    const next = typeof updater === 'function' ? updater(contracts) : updater;
    const before = new Map(contracts.map((c) => [c.id, c]));
    const after = new Map(next.map((c) => [c.id, c]));
    for (const [id, c] of after) {
      if (JSON.stringify(before.get(id)) !== JSON.stringify(c)) store.saveContract(c);
    }
    for (const id of before.keys()) if (!after.has(id)) store.deleteContract(id);
  };
  const setSettings = (next) => store.saveSettings(next);

  // Nawigacja i filtry
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'contracts' | 'analytics'
  const [serviceFilter, setServiceFilter] = useState('Wszystkie');
  const [statusFilter, setStatusFilter] = useState('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const [timelineStart, setTimelineStart] = useState('2026-11-02');
  const [weeksCount, setWeeksCount] = useState(20);

  // Modale i powiadomienia
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [costModalOpen, setCostModalOpen] = useState(false);
  const [editingCost, setEditingCost] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? '' : prev));
    }, 3500);
  };

  // Filtrowane umowy
  const filteredContracts = useMemo(() => {
    return contracts.filter((ctr) => {
      if (serviceFilter !== 'Wszystkie' && ctr.serviceName !== serviceFilter) return false;
      if (statusFilter !== 'Wszystkie' && ctr.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchClient = ctr.clientName.toLowerCase().includes(q);
        const matchSub = (ctr.subcontractorName || '').toLowerCase().includes(q);
        const matchService = ctr.serviceName.toLowerCase().includes(q);
        if (!matchClient && !matchSub && !matchService) return false;
      }
      return true;
    });
  }, [contracts, serviceFilter, statusFilter, searchQuery]);

  // Globalne KPI na podstawie przefiltrowanych umów
  const kpi = useMemo(() => {
    let totalNet = 0;
    let totalGross = 0;
    let totalPaidGross = 0;
    let totalSubCost = 0;
    let totalSubPaid = 0;
    let totalTaxes = 0;
    let totalNetProfit = 0;

    filteredContracts.forEach((ctr) => {
      const c = calculateContractFinancials(ctr, settings);
      totalNet += c.netValue;
      totalGross += c.grossValue;
      totalPaidGross += c.paidGross;
      totalSubCost += c.totalCostsNet;
      totalSubPaid += c.costsPaidNet;
      if (ctr.subStatus === 'Zapłacono') {
        totalSubPaid += c.effectiveSubCost;
      }
      totalTaxes += c.totalTaxes;
      totalNetProfit += c.netProfit;
    });

    // Koszty firmy liczą się tylko w widoku całej firmy (bez filtrów umów)
    const costsApplied =
      serviceFilter === 'Wszystkie' && statusFilter === 'Wszystkie' && !searchQuery.trim();
    let totalCostsNet = 0;
    if (costsApplied) {
      costs.forEach((c) => {
        totalCostsNet += calculateCostFinancials(c, settings).net;
      });
    }

    // Podatki i zysk z miesięcznego rozliczenia (VAT miesięczny z przeniesieniem nadwyżki,
    // zaliczki PIT/CIT narastająco w roku podatkowym)
    const taxSchedule = buildTaxSchedule(filteredContracts, costsApplied ? costs : [], settings);
    totalTaxes = taxSchedule.totals.vatPayable + taxSchedule.totals.pitAdvance;
    totalNetProfit = totalNet - totalSubCost - totalCostsNet - taxSchedule.totals.pitAdvance;

    const remainingGross = Math.max(0, totalGross - totalPaidGross);
    const avgMargin = totalNet > 0 ? (totalNetProfit / totalNet) * 100 : 0;

    return {
      totalNet,
      totalGross,
      totalPaidGross,
      remainingGross,
      totalSubCost,
      totalSubPaid,
      totalTaxes,
      totalNetProfit,
      avgMargin,
      totalCostsNet,
      costsApplied,
      taxSchedule
    };
  }, [filteredContracts, settings, costs, serviceFilter, statusFilter, searchQuery]);

  // Obsługa zapisu nowej lub edytowanej umowy
  const handleSaveContract = (savedCtr) => {
    setContracts((prev) => {
      const exists = prev.some((c) => c.id === savedCtr.id);
      if (exists) {
        return prev.map((c) => (c.id === savedCtr.id ? savedCtr : c));
      }
      return [savedCtr, ...prev];
    });
    showToast(`Zapisano umowę: ${savedCtr.clientName}`);
  };

  const handleDeleteContract = (id) => {
    setContracts((prev) => prev.filter((c) => c.id !== id));
    showToast('Umowa została usunięta z harmonogramu.');
  };

  const handleUpdateStatus = (id, newStatus) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    showToast(`Zmieniono status realizacji na: ${newStatus}`);
  };

  const handleToggleInstallmentPaid = (contractId, installmentId) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        return {
          ...c,
          installments: (c.installments || []).map((inst) =>
            inst.id === installmentId ? { ...inst, paid: !inst.paid } : inst
          )
        };
      })
    );
    showToast('Zaktualizowano status płatności raty.');
  };

  const handleToggleSubStatus = (contractId) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const nextStatus = c.subStatus === 'Zapłacono' ? 'Do zapłaty' : 'Zapłacono';
        return { ...c, subStatus: nextStatus };
      })
    );
    showToast('Zaktualizowano status wypłaty dla podwykonawcy.');
  };

  // Eksport danych do pliku CSV zgodnego z polskim Excelem (średnik + BOM UTF-8)
  const handleExportCSV = () => {
    const headers = [
      'Klient',
      'Rodzaj usługi',
      'Status',
      'Data startu',
      'Data zakończenia',
      'Czas (dni)',
      'Wartość netto (PLN)',
      'VAT (PLN)',
      'Wartość brutto (PLN)',
      'Wpłacono brutto (PLN)',
      'Pozostało brutto (PLN)',
      'Podwykonawca',
      'Koszt podwykonawcy (PLN)',
      'Status podwykonawcy',
      'Inne koszty netto (PLN)',
      'VAT naliczony z kosztów (PLN)',
      'VAT do zapłaty (PLN)',
      'Podatek PIT/CIT (PLN)',
      'Łączne podatki (PLN)',
      'Zysk netto po podatkach (PLN)',
      'Notatki'
    ];

    const rows = filteredContracts.map((ctr) => {
      const c = calculateContractFinancials(ctr, settings);
      return [
        `"${ctr.clientName.replace(/"/g, '""')}"`,
        `"${ctr.serviceName}"`,
        `"${ctr.status}"`,
        ctr.startDate,
        ctr.endDate,
        c.durationDays,
        c.netValue,
        c.vatAmount,
        c.grossValue,
        c.paidGross,
        c.remainingGross,
        `"${(ctr.subcontractorName || '').replace(/"/g, '""')}"`,
        c.effectiveSubCost,
        `"${ctr.subStatus}"`,
        c.costsNet,
        c.inputVat,
        c.vatPayable,
        c.pitAmount,
        c.totalTaxes,
        c.netProfit,
        `"${(ctr.notes || '').replace(/"/g, '""')}"`
      ].join(';');
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Biznes_Bez_Dramatow_Harmonogram_${toISODate(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Wyeksportowano zestawienie do pliku CSV.');
  };

  const handleResetDemoData = () => {
    setContracts(INITIAL_CONTRACTS);
    setSettings(DEFAULT_SETTINGS);
    setResetConfirmOpen(false);
    showToast('Wczytano dane przykładowe (zastąpiły wszystkie umowy).');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans flex flex-col">
      {/* ==================================================================== */}
      {/* GÓRNY PASEK MARKI: JACEK SZELA — BIZNES BEZ DRAMATÓW                 */}
      {/* ==================================================================== */}
      <header className="no-print bg-[#1E293B] text-white border-b border-slate-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <BrandLogo />

          {/* Przyciski głównych akcji */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => {
                setEditingContract(null);
                setContractModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold shadow-xs inline-flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Dodaj nową umowę / klienta</span>
            </button>

            <button
              type="button"
              onClick={() => setSettingsModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-300" />
              <span>Usługi i podatki</span>
            </button>

            <button
              type="button"
              onClick={() => setPrintOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
              title="Formularze do druku: raport podatkowy, umowy, koszty, karta umowy"
            >
              <Printer className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">Drukuj</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
              title="Pobierz zestawienie do Excela (CSV)"
            >
              <Download className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">Eksportuj CSV</span>
            </button>

            {!resetConfirmOpen ? (
              <button
                type="button"
                onClick={() => setResetConfirmOpen(true)}
                className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/70 transition cursor-pointer"
                title="Wczytaj dane przykładowe (usuwa obecne umowy)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-xl border border-rose-500/50">
                <span className="text-[11px] text-slate-200">Zastąpić umowy przykładowymi?</span>
                <button
                  type="button"
                  onClick={handleResetDemoData}
                  className="px-2 py-0.5 rounded bg-rose-600 text-white text-[11px] font-bold"
                >
                  Tak
                </button>
                <button
                  type="button"
                  onClick={() => setResetConfirmOpen(false)}
                  className="px-2 py-0.5 rounded bg-slate-700 text-slate-200 text-[11px]"
                >
                  Nie
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onOpenTeam}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
              title={`Firma: ${workspaceName}`}
            >
              <UserPlus className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">Zespół</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/70 transition cursor-pointer"
              title={`Wyloguj (${userEmail})`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Powiadomienie Toast */}
      {printOpen && (
        <PrintView
          onClose={() => setPrintOpen(false)}
          contracts={filteredContracts}
          costs={kpi.costsApplied ? costs : []}
          settings={settings}
          workspaceName={workspaceName}
        />
      )}

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1E293B] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* GŁÓWNY OBSZAR ROBOCZY                                                */}
      {/* ==================================================================== */}
      <main className="no-print max-w-[1480px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1">
        {/* PASEK KPI (5 KART FINANSOWYCH) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* KPI 1: Przychód netto */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Przychód netto (umowy)</span>
              <TrendingUp className="w-4 h-4 text-slate-700" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-2">
              {formatPLN(kpi.totalNet)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Brutto z VAT ({settings.vatRate}%):{' '}
              <strong className="text-slate-700">{formatPLN(kpi.totalGross)}</strong>
            </div>
          </div>

          {/* KPI 2: Wpłacono / Pozostało */}
          <div className="bg-white rounded-2xl p-4 border border-amber-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-amber-800 text-xs font-semibold">
              <span>Wpłacono (brutto)</span>
              <Wallet className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-amber-700 mt-2">
              {formatPLN(kpi.totalPaidGross)}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              Pozostało do zapłaty:{' '}
              <strong className="text-amber-800">{formatPLN(kpi.remainingGross)}</strong>
            </div>
          </div>

          {/* KPI 3: Koszt podwykonawców */}
          <div className="bg-white rounded-2xl p-4 border border-rose-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-rose-800 text-xs font-semibold">
              <span>Koszty netto (projekty i firma)</span>
              <Users className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-extrabold text-rose-700 mt-2">
              {formatPLN(kpi.totalSubCost + kpi.totalCostsNet)}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              Umowy (podwykonawcy i koszty projektów):{' '}
              <strong className="text-slate-800">{formatPLN(kpi.totalSubCost)}</strong> • Koszty
              firmy:{' '}
              <strong className="text-rose-700">
                {kpi.costsApplied ? formatPLN(kpi.totalCostsNet) : 'pominięte przy filtrze'}
              </strong>
            </div>
          </div>

          {/* KPI 4: Podatki (VAT + PIT/CIT) */}
          <div className="bg-white rounded-2xl p-4 border border-purple-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-purple-800 text-xs font-semibold">
              <span>Podatki (VAT + PIT/CIT)</span>
              <Landmark className="w-4 h-4 text-purple-700" />
            </div>
            <div className="text-2xl font-extrabold text-purple-800 mt-2">
              {formatPLN(kpi.totalTaxes)}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              VAT {formatPLN(kpi.taxSchedule.totals.vatPayable)} • PIT/CIT{' '}
              {formatPLN(kpi.taxSchedule.totals.pitAdvance)} (miesięcznie)
            </div>
          </div>

          {/* KPI 5: Zysk netto po podatkach */}
          <div className="bg-white rounded-2xl p-4 border border-emerald-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold">
              <span>Zysk netto po podatkach</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 mt-2">
              {formatPLN(kpi.totalNetProfit)}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              Rentowność netto:{' '}
              <strong className="text-emerald-700">{kpi.avgMargin.toFixed(1)}%</strong> (
              {filteredContracts.length} umów)
            </div>
          </div>
        </section>

        {/* PASEK ZAKŁADEK I FILTRÓW */}
        <section className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Zakładki nawigacyjne */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-[#1E293B] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GanttChartSquare className="w-4 h-4" />
              <span>Harmonogram i Oś Czasu (Gantt)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contracts')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'contracts'
                  ? 'bg-[#1E293B] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListChecks className="w-4 h-4" />
              <span>Lista umów i rozliczenia ({filteredContracts.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#1E293B] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analiza Cash Flow i Podatki</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('costs')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'costs'
                  ? 'bg-[#1E293B] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Koszty firmy ({costs.length})</span>
            </button>
          </div>

          {/* Filtry po prawej */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Wyszukiwarka */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj klienta lub podwykonawcy..."
                className="w-full sm:w-56 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
              />
            </div>

            {/* Filtr usługi */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
            >
              <option value="Wszystkie">Wszystkie usługi</option>
              {settings.services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Filtr statusu */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
            >
              <option value="Wszystkie">Wszystkie statusy</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* ZAWARTOŚĆ AKTYWNEJ ZAKŁADKI */}
        <section>
          {activeTab === 'timeline' && (
            <TimelineGanttView
              contracts={filteredContracts}
              costs={kpi.costsApplied ? costs : []}
              settings={settings}
              timelineStart={timelineStart}
              setTimelineStart={setTimelineStart}
              weeksCount={weeksCount}
              setWeeksCount={setWeeksCount}
              onSelectContract={(ctr) => {
                setEditingContract(ctr);
                setContractModalOpen(true);
              }}
            />
          )}

          {activeTab === 'contracts' && (
            <ContractsTableView
              contracts={filteredContracts}
              settings={settings}
              onEditContract={(ctr) => {
                setEditingContract(ctr);
                setContractModalOpen(true);
              }}
              onUpdateStatus={handleUpdateStatus}
              onToggleInstallmentPaid={handleToggleInstallmentPaid}
              onToggleSubStatus={handleToggleSubStatus}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView contracts={filteredContracts} costs={kpi.costsApplied ? costs : []} settings={settings} />
          )}

          {activeTab === 'costs' && (
            <CostsView
              costs={costs}
              settings={settings}
              onAdd={() => {
                setEditingCost(null);
                setCostModalOpen(true);
              }}
              onEdit={(c) => {
                setEditingCost(c);
                setCostModalOpen(true);
              }}
              onTogglePaid={(c) => {
                store.saveCost({ ...c, paid: !c.paid });
                showToast(c.paid ? 'Koszt oznaczony jako do zapłaty.' : 'Koszt oznaczony jako zapłacony.');
              }}
            />
          )}
        </section>
      </main>

      {/* MODALE INTERAKTYWNE */}
      <ContractModal
        isOpen={contractModalOpen}
        onClose={() => setContractModalOpen(false)}
        onSave={handleSaveContract}
        onDelete={handleDeleteContract}
        initialContract={editingContract}
        settings={settings}
      />

      <CostModal
        isOpen={costModalOpen}
        onClose={() => setCostModalOpen(false)}
        initialCost={editingCost}
        settings={settings}
        onSave={(c) => {
          store.saveCost(c);
          showToast(`Zapisano koszt: ${c.name}`);
        }}
        onDelete={(id) => {
          store.deleteCost(id);
          showToast('Koszt został usunięty.');
        }}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => {
          setSettings(newSettings);
          showToast('Zaktualizowano katalog usług i stawki podatkowe.');
        }}
      />
    </div>
  );
}