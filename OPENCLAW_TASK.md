# OPENCLAW TASK — GATEKEPT FULL UI/FLOW COMPLETION

**Repo:** `/data/data/com.termux/files/home/gatekept-full-mvp`
**Stack:** Next.js 14 App Router + TypeScript + Tailwind + lucide-react (already installed)
**Deploy target:** Vercel (PWA-first)
**Scope:** Complete ALL pages, components, and user flows end-to-end with realistic placeholder data and clean "Coming Soon" treatment for backend-heavy features. **DO NOT touch database/Prisma yet.** Use in-memory mock services and localStorage for state persistence between routes so the app feels real for testing.

---

## 0. GROUND RULES (read first, every time)

1. **No databases, no migrations, no Prisma in this task.** All data lives in `apps/web/src/lib/mockStore.ts` (create it) backed by `localStorage` so state survives reloads.
2. **No real API calls.** All `fetch()` goes through `apps/web/src/lib/api.ts` — a fake API layer that returns mock data with realistic 200-600ms latency via `setTimeout`.
3. **Every page must be reachable, navigable, and visually finished.** No `TODO` text visible to user. No raw component dumps.
4. **Features that require backend implementation get the `<ComingSoon />` component** — branded, on-brand, with a "Notify me" email capture that writes to localStorage waitlist.
5. **Mobile-first.** Test every page at 375×812 (iPhone SE). Desktop is bonus but secondary.
6. **Brand:** Black background `#000`, rose accent `#f43f5e` (rose-500), white text, subtle gradients `from-rose-500/20 to-pink-500/20`. Glassmorphism cards: `bg-white/5 backdrop-blur-xl border border-white/10`.
7. **Accessibility:** Every interactive element gets `aria-label`, focus rings, and keyboard support.
8. **Verify before claiming done.** Run `npm run build` and `npm run lint` from `apps/web` and fix all errors. Visit every route in a browser preview if possible.

---

## 1. INFRASTRUCTURE FILES TO CREATE FIRST

### `apps/web/src/lib/mockStore.ts`
A localStorage-backed in-memory store with typed getters/setters for:
- `currentUser` (id, email, displayName, age, gender, onboardingComplete, isVerified, isPremium)
- `profiles[]` (the feed — seed with 12 diverse profiles using mixkit + unsplash)
- `matches[]` (mutual matches with timestamps)
- `swipes[]` (user actions: pass/connect on profile ids)
- `conversations[]` and `messages[]` (seeded with 3 sample threads)
- `reports[]` (submitted reports queue)
- `notifications[]` (in-app notification feed)
- `waitlist[]` (emails captured by ComingSoon)
- `blockedUserIds[]`
- `preferences` (age range, distance, gender, notification toggles)

Expose hooks: `useMockStore<T>(key)`, `useCurrentUser()`, `useFeed()`, `useMatches()`, `useConversations(id)`.

### `apps/web/src/lib/api.ts`
Fake async API with realistic latency:
```ts
export const api = {
  auth: { login, register, logout, requestPasswordReset },
  profile: { update, uploadVideo, uploadPhoto },
  feed: { list, swipe, undoSwipe, boost },
  matches: { list, unmatch },
  messages: { list, send, markRead, typing },
  reports: { submit, list },
  notifications: { list, markAllRead },
  verification: { start, status },
  subscription: { plans, checkout, manage, status },
  preferences: { get, update },
};
```
Every method returns `Promise<T>` with `await sleep(200-600ms)`. Errors are simulated 5% of the time when `NEXT_PUBLIC_SIMULATE_ERRORS=1`.

### `apps/web/src/components/ComingSoon.tsx`
Reusable branded panel. Props: `title`, `description`, `featureKey`, `eta?`, `icon?`. Includes email capture that writes to `mockStore.waitlist`. Shows "You're on the list" confirmation on submit. Add a subtle animated gradient border.

### `apps/web/src/components/AppShell.tsx`
Persistent layout wrapper for authenticated pages with:
- Top bar (logo, notification bell with unread count badge, profile avatar)
- Bottom tab nav (Feed, Matches, Messages, Profile) — sticky, safe-area-aware
- Mobile-optimized, fixed bottom nav with `pb-safe`

### `apps/web/src/components/EmptyState.tsx`
For empty lists. Props: `icon`, `title`, `description`, `action?`.

### `apps/web/src/components/LoadingSkeleton.tsx`
Shimmer placeholders for feed cards, message list, profile grids.

### `apps/web/src/components/Toast.tsx` + `ToastProvider`
Simple toast system (top-right on desktop, top on mobile). Used for swipe feedback, send confirmations, errors.

---

## 2. PAGES TO BUILD OR COMPLETE

> Mark each ⬜ as ✅ in the final summary. Existing partial pages must be re-finished to match this spec.

### A. Public / Auth flow

⬜ **`/` (landing)** — NEW
- Hero: video bg loop, headline "Dating, but you actually mean it.", CTAs (Get Started / Sign In)
- Sections: How it works (3 steps), Trust & Safety pillars (verified profiles, video-first, 72hr moderation), FAQ accordion (use FAQ text from user's prompt as base), Footer with legal links
- Age gate modal on first visit (18+ confirm, stored in localStorage)

⬜ **`/login`** — POLISH
- Email/password, "Forgot password?" link, social-login buttons styled but wired to ComingSoon modal
- Error states inline, loading state on submit
- Redirect to `/feed` on success (mock auth)

⬜ **`/register`** — POLISH
- Multi-step: (1) email/password, (2) displayName/age/gender, (3) location consent
- Real-time validation, password strength meter
- Redirect to `/onboarding` on success

⬜ **`/forgot-password`** — NEW
- Email input → "If an account exists, we sent a link" confirmation

⬜ **`/reset-password/[token]`** — NEW
- New password + confirm, success redirects to login

⬜ **`/verify-email/[token]`** — NEW
- Auto-verify (mock) and redirect

### B. Onboarding flow

⬜ **`/onboarding`** — REBUILD AS MULTI-STEP
Steps with progress indicator (1/5, 2/5…):
1. **Welcome** — explains the 3 gates
2. **Profile basics** — displayName, age, bio (280 char), gender, looking-for
3. **Photos** — up to 6 photo slots (drag-reorder), uses `<input type="file">` with object-URL preview; stores blob refs to localStorage (or base64 if small). First photo = primary.
4. **Profile video** — real `MediaRecorder` capture with 30s countdown, retake, preview. If browser doesn't support, show ComingSoon panel.
5. **Identity verification** — `<ComingSoon featureKey="identity-verification" />` with explanation that Stripe Identity / Veriff goes here. Button "Skip for now" sets `isVerified: false` on user.
6. **Interests** — pick 5+ from a grid of 30 chips
7. **Preferences** — age range slider, max distance, gender preference
8. **Done** — celebration screen, "Enter Gatekept" → `/feed`

Persist progress to localStorage so refresh resumes at last step.

### C. Core authenticated app

⬜ **`/feed`** — POLISH
- Vertical scroll video cards (current implementation)
- Add: like-back indicator if profile already liked you, "It's a Match" full-screen modal on mutual connect
- Add: "Out of profiles" empty state with CTA to expand preferences
- Add: long-press → profile detail view
- Add: report flag in overflow menu (already exists, wire to mockStore)
- Add: undo last swipe button (3-second window)

⬜ **`/profile/[id]`** — NEW
- Full profile detail: video, photo gallery (swipeable), bio, interests, distance, age, verified badge
- Action buttons: Pass / Super Like (ComingSoon) / Connect
- Report and Block in overflow

⬜ **`/matches`** — NEW
- Grid of mutual matches with avatars, name, age, "New" badge if <24h
- Tap → opens conversation
- Empty state with copy "No matches yet — keep exploring"
- Top horizontal "New Matches" carousel

⬜ **`/messages`** — REBUILD
- List of conversations: avatar, name, last message preview, timestamp, unread dot
- Search bar at top
- Empty state for no conversations
- Tap row → `/messages/[conversationId]`

⬜ **`/messages/[conversationId]`** — NEW
- Header: avatar, name, online dot, overflow (View profile, Block, Report, Unmatch)
- Message bubbles (mine right, theirs left, timestamps grouped)
- Read receipts (mock)
- Typing indicator (mock — fires when other side "is typing" after you send)
- Input bar: text, send button, attachment button → ComingSoon (photo/voice/video msg)
- Auto-scroll to newest, pull-to-load older

⬜ **`/profile`** (own profile / settings hub) — REBUILD
Sections:
- Header card: avatar, name, age, edit button, verified badge
- Stats row: connections, matches, days on Gatekept
- Quick links list:
  - Edit profile → `/profile/edit`
  - Preferences → `/preferences`
  - Subscription → `/subscription`
  - Safety center → `/safety`
  - Notifications → `/settings/notifications`
  - Privacy → `/settings/privacy`
  - Blocked users → `/settings/blocked`
  - Help & Support → `/help`
  - Sign out
- App version footer

⬜ **`/profile/edit`** — NEW
- Edit displayName, bio, interests, photos (reorder/delete/add), video re-record
- Save → toast confirmation, returns to `/profile`

⬜ **`/preferences`** — NEW
- Age range (slider 18-99), max distance (slider 1-100mi), interested in (gender chips), show me toggle (pause profile)

⬜ **`/subscription`** — NEW
- 3 tiers: Free / Premium ($9.99) / Elite ($24.99) with feature comparison
- "Upgrade" button → `<ComingSoon featureKey="payments" />` modal (Stripe placeholder)
- Show current plan status

⬜ **`/safety`** — NEW
- Safety tips, how to report, community guidelines summary, panic-button section (ComingSoon)
- Link to full guidelines, ToS, Privacy Policy

⬜ **`/settings/notifications`** — NEW
- Toggle switches: new matches, messages, likes, marketing
- Quiet hours (ComingSoon)

⬜ **`/settings/privacy`** — NEW
- Show me on feed, show distance, show age, incognito mode (ComingSoon), data download (ComingSoon), delete account (with confirm modal)

⬜ **`/settings/blocked`** — NEW
- List of blocked users with unblock button, empty state

⬜ **`/notifications`** — NEW
- Chronological list of in-app notifications (new match, new message, like, system)
- Mark all read button

⬜ **`/help`** — NEW
- FAQ accordion (reuse landing FAQ), contact support form (mailto: support@gatekept.app)

⬜ **`/legal/terms`**, **`/legal/privacy`**, **`/legal/community-guidelines`**, **`/legal/dmca`** — NEW
- Real placeholder legal copy clearly marked "DRAFT — REVIEW BEFORE LAUNCH" at top

⬜ **`/404` and `/error`** — NEW
- Branded error pages with "Go home" CTA

⬜ **`/coming-soon`** — NEW
- Standalone page that lists ALL features marked ComingSoon with eta. Linkable from footer.

### D. Admin (gated by ?admin=1 in URL for now)

⬜ **`/admin/moderation`** — NEW
- Tabs: Reports queue, Pending verifications, Flagged content
- Mock data, action buttons (Approve / Reject / Ban) wired to mockStore

---

## 3. CROSS-CUTTING REQUIREMENTS

### Coming Soon registry
Create `apps/web/src/lib/comingSoon.ts` exporting a typed registry:
```ts
export const COMING_SOON = {
  'identity-verification': { eta: 'Q3 2026', why: 'Stripe Identity integration pending compliance review' },
  'payments': { eta: 'Q3 2026', why: 'Stripe Checkout integration' },
  'video-messaging': { eta: 'Q4 2026', why: 'WebRTC infrastructure' },
  'voice-notes': { eta: 'Q4 2026', why: 'Audio recording pipeline' },
  'super-like': { eta: 'Q3 2026', why: 'Tied to premium' },
  'incognito-mode': { eta: 'Q4 2026', why: 'Premium feature' },
  'data-export': { eta: 'Q4 2026', why: 'GDPR tooling' },
  'push-notifications': { eta: 'Q3 2026', why: 'Service worker + VAPID setup' },
  'social-login': { eta: 'Q3 2026', why: 'OAuth providers' },
  'quiet-hours': { eta: 'Q4 2026', why: 'Scheduler' },
  'panic-button': { eta: 'Q3 2026', why: 'T&S workflow' },
} as const;
```
Every `<ComingSoon featureKey="..." />` pulls from this registry.

### PWA
- `apps/web/public/manifest.json` — verify name, icons (192/512), theme `#000`, background `#000`, display `standalone`, start_url `/feed`
- Add `apps/web/src/app/icon.png` and `apple-icon.png`
- Add basic service worker via `next-pwa` OR a hand-rolled `sw.js` (cache shell + offline fallback page `/offline`)
- Add `/offline` page

### SEO / Meta
- Per-page `<Metadata>` exports (title, description, OG image)
- Default OG image at `apps/web/public/og.png` (1200×630, branded)

### Auth gate
- Create `apps/web/src/components/AuthGate.tsx` that redirects unauthenticated users to `/login` and incomplete-onboarding users to `/onboarding`. Wrap authenticated pages.

### Theme & Tailwind
- Extend `tailwind.config.js` with brand colors, custom shadows, safe-area utilities (`pt-safe`, `pb-safe`)
- Add `globals.css` rules for `env(safe-area-inset-*)`

### Analytics placeholder
- `apps/web/src/lib/analytics.ts` with `track(event, props)` that console.logs. Call from key actions (signup, swipe, match, message_send, upgrade_click).

---

## 4. SEED DATA REQUIREMENTS

- **12 profiles** with diverse names, ages 21-38, all gender options, locations across 8 US cities, realistic bios, 3-5 interests each, mix of verified/unverified, all with mixkit video URLs and unsplash photos
- **3 conversations** pre-seeded for the demo user with 5-15 messages each (varied timestamps, mix of read/unread)
- **4 notifications** (1 new match, 2 new messages, 1 system welcome)
- **2 already-mutual matches** so `/matches` isn't empty on first load

Put seed in `apps/web/src/lib/seed.ts`, runs on first localStorage init.

---

## 5. VALIDATION CHECKLIST (run before declaring done)

```bash
cd /data/data/com.termux/files/home/gatekept-full-mvp/apps/web
npm install
npm run lint        # zero errors
npm run typecheck   # zero errors  (add script if missing: "tsc --noEmit")
npm run build       # succeeds
```

Manual click-through (record findings):
- [ ] Landing → Register → Onboarding (all 8 steps) → Feed
- [ ] Swipe right on 2 seeded profiles that like back → match modal appears
- [ ] Open match → send message → typing indicator → "received" reply (mocked auto-reply after 2s)
- [ ] Profile → Edit → change bio → save → toast → bio updated
- [ ] Subscription → Upgrade → ComingSoon modal with waitlist capture
- [ ] Settings → Delete account → confirm → returns to landing with localStorage cleared
- [ ] Report a profile → admin/moderation shows the report
- [ ] Reload mid-onboarding → resumes at correct step
- [ ] Offline (devtools) → `/offline` page shown
- [ ] Lighthouse PWA score ≥ 90

---

## 6. DELIVERABLES

1. All pages from §2 implemented and accessible
2. All shared components from §1 created and used consistently
3. Mock store + fake API + seed data working
4. ComingSoon registry covers every backend-dependent feature
5. PWA installable
6. `BUILD_REPORT.md` at repo root listing:
   - Every route created with one-line description
   - Every ComingSoon feature with eta + handoff notes for backend implementation
   - Known gaps / things explicitly out of scope
   - Lighthouse scores
   - Screenshots of 8 key screens (optional but ideal)
7. `git add -A && git commit -m "feat: complete UI/UX with mock backend and ComingSoon placeholders"` — DO NOT push (user will review)

---

## 7. NON-GOALS (do not do these)

- ❌ Prisma, Postgres, Supabase, any real DB
- ❌ Real Stripe, Stripe Identity, Veriff, Persona
- ❌ Real Cloudflare R2/Stream uploads (object URLs / base64 only)
- ❌ WebRTC, WebSockets, Pusher, Ably
- ❌ Push notifications (placeholder only)
- ❌ Backend deployment changes
- ❌ Rewriting `apps/api/*` — leave it alone for now
- ❌ Adding new heavy dependencies (`react-query`, `zustand`, etc.) unless absolutely required. Prefer React state + custom hooks.

---

## 8. SUCCESS CRITERIA

A non-technical reviewer can install the PWA on their phone, walk through the entire dating-app experience end-to-end without hitting a broken page, a `TODO`, a blank state, or a console error. Every "missing" backend feature shows a polished, branded ComingSoon panel that captures interest rather than feeling broken. The app is demo-ready for investor pitches, user-testing sessions, and design review.

**Begin now. Work autonomously through all sections. Verify at each phase boundary. Report back with the BUILD_REPORT.md when complete.**
