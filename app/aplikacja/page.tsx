'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';
import {
  createWorkspace, findOrJoinWorkspace, makeStore, watchContracts, watchWorkspace, type Workspace,
} from '@/lib/workspace';
import CashflowApp, { DEFAULT_SETTINGS } from '@/components/CashflowApp';
import { TeamModal } from '@/components/TeamModal';
import { Brand, btnCls, inputCls } from '@/components/Brand';

function Center({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen grid place-items-center px-4 py-10">{children}</main>;
}

export default function Aplikacja() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [wsId, setWsId] = useState<string | null | undefined>(undefined);
  const [ws, setWs] = useState<Workspace | null>(null);
  const [contracts, setContracts] = useState<any[] | null>(null);
  const [error, setError] = useState('');
  const [teamOpen, setTeamOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    findOrJoinWorkspace(user.uid, user.email ?? '').then(setWsId, (e) => setError(String(e?.message ?? e)));
  }, [user]);

  useEffect(() => {
    if (!wsId) return;
    const onErr = (e: Error) => setError(e.message);
    const a = watchWorkspace(wsId, setWs, onErr);
    const b = watchContracts(wsId, setContracts, onErr);
    return () => { a(); b(); };
  }, [wsId]);

  const store = useMemo(() => {
    if (!wsId) return null;
    const s = makeStore(wsId);
    const report = (p: Promise<unknown>) => p.catch((e) => setError(`Nie zapisano zmian: ${e?.message ?? e}`));
    return {
      saveContract: (c: { id: string }) => report(s.saveContract(c)),
      deleteContract: (id: string) => report(s.deleteContract(id)),
      saveSettings: (v: unknown) => report(s.saveSettings(v)),
    };
  }, [wsId]);

  if (error) {
    return (
      <Center>
        <div className="max-w-md text-center space-y-3">
          <p className="text-sm text-rose-700">{error}</p>
          <button className="text-xs underline cursor-pointer" onClick={() => location.reload()}>Odśwież stronę</button>
        </div>
      </Center>
    );
  }
  if (loading || !user || wsId === undefined) return <Center><span className="text-sm text-slate-400">Ładowanie…</span></Center>;
  if (wsId === null) return <NewWorkspace uid={user.uid} email={user.email ?? ''} onCreated={setWsId} />;
  if (!ws || !contracts || !store) return <Center><span className="text-sm text-slate-400">Ładowanie danych…</span></Center>;

  return (
    <>
      <CashflowApp
        contracts={contracts}
        settings={(ws.settings as any) ?? DEFAULT_SETTINGS}
        store={store}
        workspaceName={ws.name}
        userEmail={user.email}
        onOpenTeam={() => setTeamOpen(true)}
        onLogout={() => signOut(auth)}
      />
      {teamOpen && <TeamModal ws={ws} uid={user.uid} onClose={() => setTeamOpen(false)} />}
    </>
  );
}

function NewWorkspace({ uid, email, onCreated }: { uid: string; email: string; onCreated: (id: string) => void }) {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      onCreated(await createWorkspace(uid, email, name, DEFAULT_SETTINGS));
    } catch (err: any) {
      setError(err?.message ?? String(err));
      setBusy(false);
    }
  }

  return (
    <Center>
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <Brand />
        <h1 className="mt-6 text-base font-bold text-slate-900">Załóż swoją firmę</h1>
        <p className="mt-1 text-xs text-slate-500">
          Umowy i rozliczenia firmy widzą tylko osoby, które do niej zaprosisz. Jeśli czekasz na zaproszenie, poproś o nie właściciela firmy.
        </p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input className={inputCls} placeholder="Nazwa firmy" required value={name} onChange={(e) => setName(e.target.value)} />
          {error && <p className="text-xs text-rose-700">{error}</p>}
          <button className={btnCls} disabled={busy}>Utwórz firmę</button>
        </form>
        <button type="button" onClick={() => signOut(auth)} className="mt-3 w-full text-xs text-slate-500 hover:text-slate-800 cursor-pointer">
          Wyloguj ({email})
        </button>
      </div>
    </Center>
  );
}
