# Sylphair — Ionic v1 Reference Demo

Static browser demo of the original Sylphair aviation recruitment app (Ionic 1 / AngularJS). Used as a visual reference while building v2. No real backend required — all API calls are intercepted client-side.

**Live:** https://sylphair-demo.kaizendevs.com

---

## What this is

The original app connected to a Rails API that no longer exists. This build replaces every `$http` call with a client-side mock that returns fixture data, so all four user role flows are navigable in any browser.

## User roles

Login with any email/password and select a role from the dropdown:

| Role | What you can explore |
|---|---|
| **Pilot** | Home, job search & results, job detail, my profile, applied jobs, messages |
| **Aircraft Owner (AOM)** | Home, pilot search & results, pilot detail, post/edit jobs, my profile, messages |
| **Mechanic** | Home, my profile, applied jobs |
| **Flight Attendant** | Home, my profile, applied jobs |

## Run locally

Requires Node.js (any modern version).

```bash
npm install -g serve      # one-time
serve sylphair_ionic_app/www -p 8100
```

Open http://localhost:8100

## Project structure

```
sylphair_ionic_app/www/
├── index.html                   # Entry point
├── css/style.css                # App styles + phone frame simulator
├── js/
│   ├── app.js                   # Angular module + run block
│   ├── app.constants.js         # CONFIG, CAMERA_OPTIONS, PUSHER_KEY
│   ├── app.api-services.js      # Session, User, Pilot, CrewMember services
│   ├── app.services.js          # Shared utilities
│   └── mock/
│       ├── mock.module.js       # Angular module declaration
│       ├── mock.data.js         # All fixture data (pilots, jobs, conversations…)
│       └── mock.backend.js      # $http decorator — intercepts API calls
├── profiles/
│   ├── pilot/                   # Pilot routes, service, controllers, templates
│   ├── aom/                     # Aircraft Owner routes, service, controllers, templates
│   ├── mechanic/                # Mechanic routes, service, controllers, templates
│   └── flight-attendant/        # Flight Attendant routes, service, controllers, templates
├── templates/pages/             # Shared pages (login, registration, messages…)
├── languages/                   # i18n strings (English, Spanish, Chinese)
├── json/                        # Static select data (countries, aircrafts, licenses…)
└── lib/                         # Front-end dependencies (Ionic, Angular, Pusher…)
```

## Mock backend

`js/mock/mock.backend.js` decorates Angular's `$http` service. Any request to `api.sylphairaviation.com` is intercepted and returns data from `mock.data.js`. All other requests (templates, local JSON) pass through normally.

Mocked endpoints:

| Method | Path | Returns |
|---|---|---|
| `POST` | `/sessions` | User object for selected role |
| `DELETE` | `/sessions/:id` | Empty 200 |
| `GET` | `/users/:id` | Current role's user object |
| `GET` | `/pilots` | List of 3 pilots |
| `GET` | `/pilots/:id` | Single pilot |
| `GET` | `/crew_members` | List of 3 crew members |
| `GET` | `/crew_members/:id` | Single crew member |
| `GET` | `/jobs` | List of 3 jobs |
| `GET` | `/jobs/:id` | Single job |
| `POST/PUT` | `/jobs` | Echoes first job (200) |
| `GET` | `/aircrafts` | 11 aircraft types |
| `GET` | `/conversations` | 2 conversations |
| `GET` | `/conversations/:id` | Conversation with messages |
| `POST` | `/conversations` | New conversation stub |
| `POST` | `/messages` | New message stub |

## Deploy to GitHub Pages

```bash
git push origin $(git subtree split --prefix sylphair_ionic_app/www main):gh-pages --force
```

The `CNAME` file in `www/` points to `sylphair-demo.kaizendevs.com`. DNS must have a CNAME record: `sylphair-demo.kaizendevs.com → kaizendevs.github.io`.

## Environment hooks

No secrets are hardcoded. Optional integrations read from `window.*` globals set before Angular boots:

```html
<script>
  window.SENTRY_DSN      = '…';   // Sentry error tracking
  window.PUSHER_KEY      = '…';   // Pusher real-time (unused in demo)
  window.ONESIGNAL_APP_ID = '…';  // Push notifications (Cordova only)
</script>
```

## Tech stack

- **Ionic 1.3** / **AngularJS 1.5.3**
- **angular-translate** — i18n (English, Spanish, Chinese)
- **pusher-angular** — real-time messaging (mocked in demo)
- **angular-local-storage** — session persistence
- **Raven.js** — Sentry error tracking (disabled unless `window.SENTRY_DSN` set)
