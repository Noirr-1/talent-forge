# Talent Forge — Module 1 Frontend

Vanilla HTML, CSS and JavaScript frontend for Module 1 (AI Profile Builder).

## Run locally
Because the project uses multiple pages and JavaScript, run it from a small local web server instead of double-clicking HTML files.

### Python
```bash
python -m http.server 5500
```
Then open: `http://localhost:5500`

## Backend readiness
`js/utils.js` contains one centralized API base URL:

```js
API_BASE_URL: "http://localhost:8000/api/v1"
```

It also contains a reusable `AC.api()` helper and endpoint names. The current wizard uses `localStorage`, so the frontend works before the backend exists. Later, page scripts can replace local saves with API calls without redesigning the pages.

Planned backend stack: FastAPI + PostgreSQL + JWT + future AI services.

## Structure
- `index.html` — landing page
- `pages/signup.html`, `signin.html`, `success.html`
- `pages/freelancer/*` — 6-step freelancer wizard
- `pages/client/signup.html`
- `css/style.css` — black / white / gray theme + animations
- `js/utils.js` — local storage + API helper
- `js/stepper.js` — shared progress banner
- `js/autobind.js` — shared form persistence + reveal animation
- `js/pages/*` — page-specific behavior

## Important
No database credentials, JWT secrets, or AI API keys belong in frontend files.
