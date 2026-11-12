# Biznes bez dramatów · Finanse

Harmonogram umów i cash flow (Gantt, lista umów z ratami, analiza VAT/PIT i podwykonawców).
Osobna platforma: każdy klient ma własną „firmę”, do której zaprasza swój zespół po e-mailu.

## Technologia
- Next.js 15 + Tailwind CSS 4 + lucide-react
- Firebase Authentication (e-mail + hasło) i Firestore (dane firm)
- Hosting: Vercel

## Struktura danych
- `workspaces/{id}`: nazwa firmy, właściciel, członkowie, zaproszenia, ustawienia (usługi, stawki VAT/PIT)
- `workspaces/{id}/contracts/{id}`: umowy z ratami i podwykonawcami
- Dostęp chronią reguły `firestore.rules` (tylko członkowie firmy).

## Uruchomienie (jednorazowo)
1. Firebase: nowy projekt → Authentication → włącz „E-mail/hasło” → Firestore Database → utwórz bazę (region `eur3`).
2. Firestore → Reguły: wklej zawartość `firestore.rules` → Opublikuj.
3. Ustawienia projektu → Twoje aplikacje → dodaj aplikację Web → skopiuj apiKey, authDomain, projectId, appId.
4. Vercel: nowy projekt z tego repozytorium, zmienne środowiskowe z `.env.example`.
5. Firebase → Authentication → Settings → Authorized domains: dodaj domenę z Vercel.

## Lokalnie
```
cp .env.example .env.local   # uzupełnij wartości
npm install
npm run dev
```
