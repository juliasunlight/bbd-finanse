import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Publiczna konfiguracja aplikacji webowej Firebase (projekt bbd-finanse-4827).
// To nie są sekrety: dostęp do danych chronią reguły firestore.rules.
// Wpisana na stałe, żeby nie zależeć od zmiennych środowiskowych na Vercel.
const config = {
  apiKey: 'AIzaSyDhUsDyF6dAeFF1PKkQ8Iv-SzX6THewnp8',
  authDomain: 'bbd-finanse-4827.firebaseapp.com',
  projectId: 'bbd-finanse-4827',
  appId: '1:364831618301:web:b3dc7ac9dd18f006eb7a94',
};

export const firebaseConfigured = true;

const app = getApps().length ? getApp() : initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
