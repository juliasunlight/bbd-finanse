'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, firebaseConfigured } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';
import { Brand, btnCls, inputCls } from '@/components/Brand';

const ERRORS: Record<string, string> = {
  'auth/invalid-credential': 'Nieprawidłowy e-mail lub hasło.',
  'auth/invalid-email': 'Nieprawidłowy adres e-mail.',
  'auth/email-already-in-use': 'To konto już istnieje. Zaloguj się.',
  'auth/weak-password': 'Hasło musi mieć co najmniej 6 znaków.',
  'auth/too-many-requests': 'Zbyt wiele prób. Spróbuj za kilka minut.',
  'auth/operation-not-allowed': 'Logowanie e-mailem jest wyłączone w Firebase.',
  'auth/configuration-not-found': 'Logowanie nie jest skonfigurowane w Firebase.',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'Nieprawidłowy klucz Firebase.',
  'auth/network-request-failed': 'Brak połączenia z internetem.',
};

export default function Login() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<{ ok?: string; error?: string }>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace('/aplikacja');
  }, [user, loading, router]);

  // ze strony głównej „Załóż konto” otwiera od razu zakładkę nowego konta
  useEffect(() => {
    try {
      if (new URLSearchParams(window.location.search).get('nowe')) setMode('register');
    } catch {}
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg({});
    try {
      if (mode === 'login') await signInWithEmailAndPassword(auth, email.trim(), password);
      else await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      setMsg({ error: ERRORS[err?.code] ?? `Coś poszło nie tak (${err?.code ?? 'nieznany błąd'}).` });
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!email.trim()) return setMsg({ error: 'Wpisz najpierw swój e-mail.' });
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMsg({ ok: 'Wysłaliśmy link do zmiany hasła. Sprawdź skrzynkę.' });
    } catch (err: any) {
      setMsg({ error: ERRORS[err?.code] ?? 'Nie udało się wysłać linku.' });
    }
  }

  return (
    <main className="min-h-screen grid place-items-center px-4 py-10">
      <div className="w-full max-w-sm">
      <a href="/" className="inline-block mb-3 text-xs text-slate-500 hover:text-slate-800">← Strona główna</a>
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <Brand />
        {!firebaseConfigured && (
          <p className="mt-5 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
            Aplikacja nie jest jeszcze połączona z Firebase (brak zmiennych NEXT_PUBLIC_FIREBASE_*).
          </p>
        )}
        <div className="mt-6 grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setMsg({}); }}
              className={`py-2 rounded-lg transition cursor-pointer ${mode === m ? 'bg-[#1E293B] text-white' : 'text-slate-600'}`}
            >
              {m === 'login' ? 'Logowanie' : 'Nowe konto'}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">E-mail</span>
            <input className={`${inputCls} mt-1`} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600">Hasło</span>
            <input
              className={`${inputCls} mt-1`}
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {msg.error && <p className="text-xs text-rose-700">{msg.error}</p>}
          {msg.ok && <p className="text-xs text-emerald-700">{msg.ok}</p>}
          <button className={btnCls} disabled={busy || !firebaseConfigured}>
            {mode === 'login' ? 'Zaloguj się' : 'Załóż konto'}
          </button>
        </form>
        {mode === 'login' && (
          <button type="button" onClick={reset} className="mt-3 w-full text-xs text-slate-500 hover:text-slate-800 cursor-pointer">
            Nie pamiętam hasła
          </button>
        )}
        {mode === 'register' && (
          <p className="mt-3 text-[11px] text-slate-500 text-center">
            Jeśli ktoś zaprosił Cię do swojej firmy, załóż konto na ten sam e-mail, a dołączysz automatycznie.
          </p>
        )}
      </div>
      </div>
    </main>
  );
}
