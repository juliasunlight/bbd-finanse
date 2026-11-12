'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { cancelInvite, inviteMember, removeMember, type Workspace } from '@/lib/workspace';
import { inputCls } from '@/components/Brand';

export function TeamModal({ ws, uid, onClose }: { ws: Workspace; uid: string; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const isOwner = ws.ownerUid === uid;
  const emails = ws.memberEmails ?? {};

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await inviteMember(ws.id, email);
      setEmail('');
    } catch (err: any) {
      setError(err?.message ?? String(err));
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 grid place-items-center p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Zespół firmy</h2>
            <p className="text-xs text-slate-500">{ws.name}</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" aria-label="Zamknij">
            <X className="w-4 h-4" />
          </button>
        </div>

        <ul className="mt-4 divide-y divide-slate-100 text-sm">
          {ws.members.map((m) => (
            <li key={m} className="py-2 flex items-center justify-between gap-2">
              <span className="truncate">
                {emails[m] ?? m}
                {m === ws.ownerUid && <span className="ml-2 text-[11px] text-slate-500">właściciel</span>}
                {m === uid && <span className="ml-2 text-[11px] text-slate-500">(Ty)</span>}
              </span>
              {isOwner && m !== ws.ownerUid && (
                <button type="button" className="text-xs text-rose-700 hover:underline cursor-pointer" onClick={() => removeMember(ws.id, m)}>
                  Usuń
                </button>
              )}
            </li>
          ))}
          {ws.invites.map((i) => (
            <li key={i} className="py-2 flex items-center justify-between gap-2 text-slate-500">
              <span className="truncate">{i} <span className="text-[11px]">· zaproszenie czeka</span></span>
              <button type="button" className="text-xs hover:underline cursor-pointer" onClick={() => cancelInvite(ws.id, i)}>
                Anuluj
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={invite} className="mt-4 flex gap-2">
          <input className={inputCls} type="email" required placeholder="E-mail osoby do zaproszenia" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="shrink-0 rounded-xl bg-[#1E293B] text-white text-xs font-bold px-4 cursor-pointer">Zaproś</button>
        </form>
        {error && <p className="mt-2 text-xs text-rose-700">{error}</p>}
        <p className="mt-3 text-[11px] text-slate-500">
          Zaproszona osoba zakłada konto na ten adres e-mail i od razu widzi wszystkie umowy firmy.
        </p>
      </div>
    </div>
  );
}
