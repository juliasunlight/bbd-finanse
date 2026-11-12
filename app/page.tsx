'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading) router.replace(user ? '/aplikacja' : '/login');
  }, [user, loading, router]);
  return <div className="min-h-screen grid place-items-center text-slate-400 text-sm">Ładowanie…</div>;
}
