export function Brand() {
  return (
    <div className="flex flex-col items-center text-center select-none">
      <span className="font-bold tracking-[0.22em] text-sm text-slate-900">JACEK SZELA</span>
      <span className="text-[#991B1B] font-extrabold tracking-[0.18em] text-[11px] uppercase mt-0.5">BIZNES BEZ DRAMATÓW</span>
      <span className="text-slate-500 text-xs mt-3">Harmonogram umów i cash flow</span>
    </div>
  );
}

export const inputCls =
  'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#991B1B] focus:ring-2 focus:ring-[#991B1B]/15';
export const btnCls =
  'w-full rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white text-sm font-bold py-2.5 transition cursor-pointer disabled:opacity-60';
