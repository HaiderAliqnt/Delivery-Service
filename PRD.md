# GIKIGo — Frontend Product Requirements Document

> **For Antigravity (AI coding agent) eyes only.**
> Read this entire document before touching a single file. Do not deviate from the patterns,
> naming conventions, or design system described here. When in doubt, ask — do not invent.

---

## 0. Project Snapshot

| Field | Value |
|---|---|
| Project | GIKIGo — campus peer-to-peer delivery app |
| Platform | Web app (desktop-tolerant, mobile-first layout ~390px wide) |
| Framework | React + Vite |
| Styling | Plain CSS (`.css` files, no Tailwind, no CSS-in-JS, no inline styles) |
| Routing | React Router v6 |
| API | REST (backend not live yet — use stubbed async functions, see §6) |
| State | Local component state (`useState`) + Context API where needed |
| Auth tokens | JWT stored in `localStorage` under keys `gikigo_token` and `gikigo_role` |

---

## 1. Design System — THE LAW

The entire app uses a pixel-art / retro-game aesthetic. Every page must feel consistent with
this. Do not introduce modern "clean" UI elements, shadows, gradients, or rounded cards
unless they are already present in the existing pages.

### 1.1 Color Palette

```css
:root {
  --bg-primary:     #1a0000;   /* near-black dark red — main page background */
  --bg-card:        #2d0a0a;   /* slightly lighter red — card/panel backgrounds */
  --bg-input:       #1a0000;   /* input field background */
  --accent:         #c0392b;   /* primary red — buttons, borders, highlights */
  --accent-hover:   #e74c3c;   /* lighter red on hover */
  --accent-green:   #27ae60;   /* confirm / accept actions only */
  --accent-danger:  #c0392b;   /* reject / cancel actions */
  --text-primary:   #f5f5f5;   /* main text */
  --text-muted:     #a08080;   /* secondary / placeholder text */
  --border:         #8b0000;   /* borders and dividers */
}
```

### 1.2 Typography

- **Primary font:** A pixel/retro font (check what's already imported in `index.css` / `App.css`
  and use the same one — do NOT add new font imports).
- All headings use the pixel font.
- Body text may use the same font at smaller sizes.
- No `font-weight: bold` on pixel fonts — they render poorly. Use font-size hierarchy instead.

### 1.3 Component Patterns (copy exactly from existing pages)

| Element | Pattern |
|---|---|
| Buttons | Flat, no border-radius (or very slight ~2px), `--accent` background, `--text-primary` text, solid `2px --border` border. On hover: `--accent-hover` bg. |
| Input fields | Dark background `--bg-input`, `--border` border `2px solid`, `--text-primary` text, no border-radius. Placeholder in `--text-muted`. |
| Cards / Panels | `--bg-card` background, `2–3px solid --border` border, slight padding (12–16px). |
| Section labels | ALL CAPS, small letter-spacing, `--text-muted` color. |
| NPC/Avatar images | Pixel-art sprite style. Use the existing sprite assets — do not substitute with emojis or generic icons. |
| Checkmark / X | Large green ✓ (`--accent-green`) and red ✗ (`--accent-danger`) for confirm/reject screens. |

### 1.4 Do Nots

- ❌ No Material UI, Ant Design, or any component library imports.
- ❌ No Tailwind classes.
- ❌ No `box-shadow` heavy cards (flat design only).
- ❌ No rounded pill buttons.
- ❌ No white or light backgrounds on any screen.
- ❌ No adding new dependencies without explicit approval.

---

## 2. File & Folder Conventions

Follow whatever `src/` structure already exists. If `pages/` and `components/` folders are
present, use them. Rules:

- One `.jsx` file per page, one `.css` file per page (same name, same folder).
- Shared reusable components go in `src/components/`.
- API stub functions go in `src/api/` (one file per domain, e.g. `orders.js`, `auth.js`).
- Do NOT put logic in `App.jsx` beyond route definitions.
- Keep each component under ~150 lines. Split if larger.

---

## 3. Routing Map

```
/                   → TitleScreen (already done)
/login              → LoginPage (already done)
/signup             → SignupPage (already done)
/home               → HomePage  (role-aware: customer vs deliverer)
/home/deliverer     → DelivererHomePage (where are you? + toggle)
/browse             → BrowsePage (choose store)
/browse/npcs        → NPCListPage (available deliverers for chosen store)
/browse/npcs/:id    → NPCDetailPage (selected deliverer + confirm/reject)
/order/new          → NewOrderPage (enter order items + phone)
/order/new/shop     → ShopSelectPage (for Outside GIK — choose shop)
/order/:id          → OrderStatusPage (live status tracking)
/deliver/feed       → DelivererFeedPage (open orders broadcast feed)
/deliver/:id        → DelivererOrderPage (claimed order detail)
/profile            → ProfilePage (ratings, earnings, trust score)
```

> Routes that don't have a page yet must be created. Routes marked "already done" must
> not be modified unless there is a bug to fix.

---

## 4. Pages — Detailed Specifications

Read the Figma screenshot provided alongside this PRD for exact layout reference.
The screens below correspond to the panels visible in that image, top-to-bottom, left-to-right.

---

### 4.1 TitleScreen `/` ✅ DONE — DO NOT TOUCH

---

### 4.2 LoginPage `/login` ✅ DONE — DO NOT TOUCH

---

### 4.3 SignupPage `/signup` ✅ DONE — DO NOT TOUCH

---

### 4.4 HomePage `/home` 🔴 BUILD

**What it does:** Landing screen after login. Greets the user by name. Asks: "Order from?" and
presents store options plus a toggle to switch to Deliverer mode.

**Layout:**
- Top: `Hi, lets order` greeting — "lets" in `--text-primary`, "order" in `--accent` red.
- Section label: `ORDER FROM?`
- List of store buttons (full-width, stacked):
  - `GEN. STORE`
  - `MAIN GATE`
  - `CAFE`
  - `OUTSIDE GIK`
- Divider line.
- Bottom: `I WANT TO DELIVER` button — distinct styling (outlined or inverted) to differentiate
  from store selection.

**Logic:**
- On mount: read `gikigo_token` from localStorage, decode JWT to get `{ name, role }`.
- Replace "order" in greeting with name if available (e.g. "Hi, lets **Ahmad**").
- Each store button navigates to `/browse` with a query param: `/browse?store=GEN_STORE` etc.
- "I WANT TO DELIVER" navigates to `/home/deliverer`.

---

### 4.5 DelivererHomePage `/home/deliverer` 🔴 BUILD

**What it does:** Same layout as HomePage but asks "WHERE ARE YOU?" — deliverer sets their
current hostel location before going online.

**Layout:**
- Greeting same as HomePage but "deliver" highlighted in accent instead of "order".
- Section label: `WHERE ARE YOU?`
- Same hostel/location buttons (GEN. STORE, MAIN GATE, CAFE, OUTSIDE GIK — these represent
  campus zones the deliverer is near).
- Bottom: `I WANT TO ORDER` — navigates back to `/home`.

**Logic:**
- On location button click: call `api/deliverer.setAvailability({ status: 'available', current_hostel: zone })`.
- On success: navigate to `/deliver/feed`.

---

### 4.6 NPCListPage `/browse/npcs` 🔴 BUILD

**What it does:** Shows available deliverers (NPCs) for the chosen store.

**Layout:**
- Header: store name (from route state or query param) e.g. `GEN. STORE`
- Section label: `AVAILABLE NPCS`
- List of deliverer cards. Each card:
  - Avatar (pixel sprite — use a placeholder sprite asset or the one already in `/assets`).
  - Deliverer username.
  - Rating (small, muted).
  - Entire card is clickable.
- If no deliverers available: show `NO NPCS ONLINE` message in muted text.

**Logic:**
- On mount: call `api/deliverers.getAvailable({ store })` → populate list.
- Click on card → navigate to `/browse/npcs/:id` passing deliverer data via router state.

---

### 4.7 NPCDetailPage `/browse/npcs/:id` 🔴 BUILD

**What it does:** Shows the selected deliverer's profile and asks customer to confirm or reject.

**Layout:**
- Header: store name.
- Section label: `YOU HAVE CHOSEN`
- Deliverer name (large).
- `REVIEWS` label (shows rating or placeholder text).
- `ASKING FOR CONSENT...` — animated ellipsis or static text.
- Two large buttons side by side:
  - Green ✓ (confirm) — `--accent-green`
  - Red ✗ (reject) — `--accent-danger`

**Logic:**
- ✓ → call `api/orders.createOrder({ deliverer_id, store })` → navigate to `/order/new` passing
  `order_id` in state.
- ✗ → navigate back to `/browse/npcs`.
- "ASKING FOR CONSENT..." implies the deliverer is being notified. In the stub, this is cosmetic only.

---

### 4.8 ShopSelectPage `/order/new/shop` 🔴 BUILD

**What it does:** Only shown when store = `OUTSIDE GIK`. Lets customer pick a specific shop.

**Layout:**
- Header: `OUTSIDE GIK`
- Section label: `CHOOSE SHOP`
- List of shop name buttons (stacked, full-width). Hardcode these for now:
  - `TAHIR KHAN`
  - `AMIR KHAN`
  - `BANNU BEEF`
  - `BIRYANI`

**Logic:**
- Click a shop → navigate to `/order/new` with `{ store: 'OUTSIDE GIK', shop: shopName }` in state.

---

### 4.9 NewOrderPage `/order/new` 🔴 BUILD

**What it does:** Customer types in their order (free text) and optionally provides phone number.

**Layout:**
- Header: store name (from state).
- Section label: `ENTER YOUR ORDER`
- Large textarea: placeholder `TYPE HERE...` — dark background, red border.
- Muted label: `FOR EXTRA COMMUNICATION REACH OUT`
- Phone input with a phone icon (🎮 or pixel phone icon) on the left.
- Submit button: full-width, accent red.

**Logic:**
- Submit → call `api/orders.submitOrder({ order_id, items_text, phone, store, shop? })`.
- On success → navigate to `/order/:id` (order status page).
- Validate: textarea must not be empty before submit.

---

### 4.10 OrderStatusPage `/order/:id` 🔴 BUILD

**What it does:** Live order tracking. Shows current status in the order lifecycle.

**States to display:**
```
OPEN → CLAIMED → PICKED UP → DELIVERED
```

**Layout:**
- Order ID / store name at top.
- Status bar or step indicator (pixel style — simple colored blocks, not a smooth progress bar).
- Current status label (large, accent color).
- Deliverer info (avatar + name) once claimed.
- Chat button (navigates to chat — out of scope for now, show as disabled).
- Cancel button (only visible if status is OPEN).

**Logic:**
- Poll `api/orders.getStatus(order_id)` every 5 seconds (no WebSocket yet — polling stub is fine).
- Cancel → call `api/orders.cancelOrder(order_id)` → navigate to `/home`.

---

### 4.11 DelivererFeedPage `/deliver/feed` 🔴 BUILD

**What it does:** Deliverer sees all open broadcast orders and can claim one.

**Layout:**
- Header: `OPEN ORDERS`
- List of order cards. Each card:
  - Store name.
  - Customer username (or anonymous).
  - Order preview (truncated text).
  - `CLAIM` button — accent red, full width of card.
- Empty state: `NO OPEN ORDERS YET` in muted text.

**Logic:**
- Poll `api/deliverer.getFeed()` every 5 seconds.
- `CLAIM` → call `api/deliverer.claimOrder(order_id)` → navigate to `/deliver/:id`.

---

### 4.12 DelivererOrderPage `/deliver/:id` 🔴 BUILD

**What it does:** Deliverer views the claimed order details and updates status.

**Layout:**
- Order details: store, customer name, delivery hostel + room, special instructions.
- Order items listed.
- Current status label.
- Action button changes based on status:
  - If `CLAIMED` → `MARK AS PICKED UP`
  - If `PICKED_UP` → `MARK AS DELIVERED`
  - If `DELIVERED` → disabled / complete state.

**Logic:**
- `api/deliverer.updateOrderStatus(order_id, newStatus)` on each button press.
- On DELIVERED → show completion screen with earnings amount, then navigate to `/deliver/feed`.

---

### 4.13 ProfilePage `/profile` 🔴 BUILD

**What it does:** Shows user stats — trust score, rating, order history summary, earnings (if deliverer).

**Layout:**
- Avatar (pixel sprite).
- Username + role badge.
- Stats grid (2 columns):
  - Rating: ⭐ X.X
  - Trust Score: X
  - Orders placed / delivered: count
  - Earnings: PKR XX (deliverer only)
- Recent activity list (last 5 orders, muted text).
- Logout button at bottom.

**Logic:**
- `api/profile.getProfile()` on mount.
- Logout → clear localStorage → navigate to `/`.

---

## 5. Shared Components to Build

| Component | File | Purpose |
|---|---|---|
| `<NavBar />` | `components/NavBar.jsx` | Top bar with back arrow + page title. Used on all inner pages. |
| `<StoreButton />` | `components/StoreButton.jsx` | Full-width red button for store/location selection. |
| `<DelivererCard />` | `components/DelivererCard.jsx` | NPC list item with avatar + name + rating. |
| `<OrderCard />` | `components/OrderCard.jsx` | Feed item card for deliverer feed. |
| `<StatusBar />` | `components/StatusBar.jsx` | Pixel-style order status step indicator. |
| `<LoadingPixel />` | `components/LoadingPixel.jsx` | Retro loading animation (blinking block or dots). |

---

## 6. API Stub Layer

**Location:** `src/api/`

All API functions must be `async` and return a resolved Promise with mock data. Structure them
so that swapping in real `fetch()` calls later requires only editing these files — not any page component.

### Pattern:

```js
// src/api/orders.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function getStatus(orderId) {
  // STUB — replace with real fetch when backend is ready
  return {
    order_id: orderId,
    status: 'CLAIMED',
    deliverer: { name: 'Haider', avatar: null },
    store: 'GEN. STORE',
  };
}

export async function submitOrder(payload) {
  // STUB
  return { order_id: 'mock-001', status: 'OPEN' };
}
```

### API files to create:

| File | Functions |
|---|---|
| `src/api/auth.js` | `login(email, password)`, `signup(name, email, phone, password, role)` |
| `src/api/orders.js` | `createOrder(payload)`, `submitOrder(payload)`, `getStatus(id)`, `cancelOrder(id)` |
| `src/api/deliverers.js` | `getAvailable(store)` |
| `src/api/deliverer.js` | `setAvailability(payload)`, `getFeed()`, `claimOrder(id)`, `updateOrderStatus(id, status)` |
| `src/api/profile.js` | `getProfile()` |

---

## 7. Auth & Role Handling

- JWT stored in `localStorage` as `gikigo_token`.
- User role stored as `gikigo_role` (`'customer'` or `'deliverer'`).
- Create a `src/utils/auth.js` with:
  ```js
  export function getToken() { return localStorage.getItem('gikigo_token'); }
  export function getRole() { return localStorage.getItem('gikigo_role'); }
  export function logout() { localStorage.removeItem('gikigo_token'); localStorage.removeItem('gikigo_role'); }
  export function isLoggedIn() { return !!getToken(); }
  ```
- Create a `<ProtectedRoute />` component that redirects to `/login` if `!isLoggedIn()`.
- Wrap all routes except `/`, `/login`, `/signup` in `<ProtectedRoute />`.

---

## 8. Error & Loading States

Every page that makes an API call must handle three states:

1. **Loading** — show `<LoadingPixel />` centered on screen.
2. **Error** — show a red error message in a styled panel: `SOMETHING WENT WRONG. TRY AGAIN.`
3. **Success** — render the actual content.

No silent failures. No unhandled promise rejections.

---

## 9. What "Done" Means for Each Page

A page is considered complete when:
- [ ] It renders without console errors.
- [ ] It matches the Figma screenshot visual style (dark bg, red accents, pixel font, flat buttons).
- [ ] All buttons navigate to the correct routes.
- [ ] All API calls use the stub layer (not hardcoded inline data).
- [ ] Loading and error states are handled.
- [ ] It works on a ~390px wide mobile viewport.

---

## 10. Sequence — Build in This Order

Build in this order to avoid dependency blockers:

1. `src/api/` — all stub files first.
2. `src/utils/auth.js` + `<ProtectedRoute />`
3. Shared components (`NavBar`, `StoreButton`, `DelivererCard`, `OrderCard`, `StatusBar`, `LoadingPixel`)
4. `HomePage`
5. `DelivererHomePage`
6. `NPCListPage` → `NPCDetailPage`
7. `ShopSelectPage` → `NewOrderPage`
8. `OrderStatusPage`
9. `DelivererFeedPage` → `DelivererOrderPage`
10. `ProfilePage`
11. Wire up all routes in `App.jsx`
12. Smoke test every route — fix any broken navigation.

---

## 11. Figma Reference

A screenshot of the full Figma design has been provided alongside this PRD as `figma_reference.png`.
Use it as the visual ground truth for layout, spacing, and component appearance.
When in doubt between this document and the screenshot — **the screenshot wins.**

---

## 12. Things You Must NOT Do

- ❌ Do not restructure or rename existing files/folders.
- ❌ Do not modify `TitleScreen`, `LoginPage`, or `SignupPage`.
- ❌ Do not add any npm package without being explicitly told to.
- ❌ Do not use `any` TypeScript types (not applicable here but noted for hygiene).
- ❌ Do not make real API calls — use the stub layer only.
- ❌ Do not use inline styles (`style={{ }}`) — all styling in `.css` files.
- ❌ Do not invent UI patterns not present in the existing pages or this PRD.

---

*Last updated: April 2026 — GIKIGo CS232 DBMS Project, GIKI*
