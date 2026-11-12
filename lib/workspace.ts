'use client';

import {
  addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, onSnapshot, query,
  serverTimestamp, setDoc, updateDoc, where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Model danych (każdy klient platformy = osobna „firma”):
 *   workspaces/{id}              { name, ownerUid, members: [uid], invites: [email], settings, createdAt }
 *   workspaces/{id}/contracts/{contractId}   umowa w formacie aplikacji
 *   workspaces/{id}/costs/{costId}           koszt firmy (faktura kosztowa)
 * Reguły w firestore.rules wpuszczają do firmy tylko jej członków.
 */
export type Workspace = {
  id: string;
  name: string;
  ownerUid: string;
  members: string[];
  invites: string[];
  memberEmails?: Record<string, string>;
  settings?: unknown;
};

const norm = (email: string) => email.trim().toLowerCase();

/** Firma, do której należy użytkownik; jeśli jest zaproszony, dołącza go automatycznie. */
export async function findOrJoinWorkspace(uid: string, email: string): Promise<string | null> {
  const mine = await getDocs(query(collection(db, 'workspaces'), where('members', 'array-contains', uid)));
  if (!mine.empty) return mine.docs[0].id;
  const invited = await getDocs(query(collection(db, 'workspaces'), where('invites', 'array-contains', norm(email))));
  if (invited.empty) return null;
  const ws = invited.docs[0];
  await updateDoc(ws.ref, {
    members: arrayUnion(uid),
    invites: arrayRemove(norm(email)),
    [`memberEmails.${uid}`]: norm(email),
  });
  return ws.id;
}

export async function createWorkspace(uid: string, email: string, name: string, settings: unknown) {
  const ref = await addDoc(collection(db, 'workspaces'), {
    name: name.trim(),
    ownerUid: uid,
    members: [uid],
    invites: [],
    memberEmails: { [uid]: norm(email) },
    settings,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export function watchWorkspace(id: string, cb: (ws: Workspace | null) => void, onError: (e: Error) => void) {
  return onSnapshot(doc(db, 'workspaces', id), (s) => cb(s.exists() ? ({ id: s.id, ...s.data() } as Workspace) : null), onError);
}

export function watchCosts(id: string, cb: (list: any[]) => void, onError: (e: Error) => void) {
  return onSnapshot(collection(db, 'workspaces', id, 'costs'), (s) => {
    cb(s.docs.map((d) => ({ ...d.data(), id: d.id })));
  }, onError);
}

export function watchContracts(id: string, cb: (list: any[]) => void, onError: (e: Error) => void) {
  return onSnapshot(collection(db, 'workspaces', id, 'contracts'), (s) => {
    const list = s.docs.map((d) => ({ ...d.data(), id: d.id }));
    list.sort((a: any, b: any) => String(b.startDate ?? '').localeCompare(String(a.startDate ?? '')));
    cb(list);
  }, onError);
}

/** Firestore nie przyjmuje wartości undefined, więc czyścimy obiekt przez JSON. */
const clean = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

export function makeStore(wsId: string) {
  return {
    saveContract: (c: { id: string }) => setDoc(doc(db, 'workspaces', wsId, 'contracts', c.id), clean(c)),
    deleteContract: (id: string) => deleteDoc(doc(db, 'workspaces', wsId, 'contracts', id)),
    saveCost: (c: { id: string }) => setDoc(doc(db, 'workspaces', wsId, 'costs', c.id), clean(c)),
    deleteCost: (id: string) => deleteDoc(doc(db, 'workspaces', wsId, 'costs', id)),
    saveSettings: (settings: unknown) => updateDoc(doc(db, 'workspaces', wsId), { settings: clean(settings) }),
  };
}

export const inviteMember = (wsId: string, email: string) =>
  updateDoc(doc(db, 'workspaces', wsId), { invites: arrayUnion(norm(email)) });

export const cancelInvite = (wsId: string, email: string) =>
  updateDoc(doc(db, 'workspaces', wsId), { invites: arrayRemove(norm(email)) });

export const removeMember = (wsId: string, uid: string) =>
  updateDoc(doc(db, 'workspaces', wsId), { members: arrayRemove(uid) });
