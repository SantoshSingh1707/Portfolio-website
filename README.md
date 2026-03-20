# Santosh Portfolio OS

An interactive desktop-style portfolio built with React + Vite.

This project simulates a full OS-like workspace with draggable windows, start menu, command palette, terminal, browser, recruiter tour, and ML-focused portfolio apps.

---

## 1. What This Website Includes

### Desktop Shell Features
- BIOS-style boot sequence and lock screen.
- Draggable desktop icons with grid snapping.
- Start menu with search, pinned apps, and recommendations.
- Window management: open, focus, minimize, close, fullscreen, and edge snap.
- Floating taskbar with active window states and system tray.
- Right-click context menu (refresh, sort icons, settings, system info).
- Global command palette (`Ctrl+K` / `Cmd+K`).
- Presentation mode toggle (via command palette).
- System toasts and confirmation modals.
- Recruiter guided tour overlay.

### App Catalog
| App | What it does |
|---|---|
| About Me | Profile overview, focus area, and quick actions. |
| Education | Coursework + academic highlights. |
| Projects | ML project showcase with repo-backed evidence and live links. |
| Skills | Structured technical skill breakdown. |
| Contact | Email, GitHub, and resume access points. |
| Settings | Wallpaper + accent personalization. |
| Notepad | Persistent notes saved locally. |
| Resume | Resume view + external PDF open. |
| Terminal | Command-driven launcher and portfolio shortcuts. |
| Music Player | YouTube-only integration with in-app search and embedded playback controls. |
| Web Browser | Embedded browsing with automatic external fallback for blocked sites. |
| File Explorer | Mock filesystem + preview modal interactions. |
| Task Manager | Window/process view and critical-process warning flow. |
| Research Lab | Research focus boards and resource links. |
| Live Demo | Interactive ML-style text demo modes. |
| Experiment Tracker | Structured run/evidence dashboard. |
| Dataset Explorer | Dataset cards, schema, and prep flow views. |
| Model Monitor | Health/status style ML monitoring panel. |
| Timeline | Learning and project evolution timeline. |
| Achievements | Milestone cards and impact summary. |
| AI Assistant | Portfolio-aware guided Q&A. |
| Recruiter Tour | Guided path through strongest portfolio sections. |

---

## 2. Music Player (YouTube Integration)

The music app is now fully YouTube-focused.

You can:
1. Search videos directly inside the app (`Search In App`).
2. Click any result to play in the embedded YouTube player.
3. Paste a direct YouTube link and click `Play Link`.
4. Open full YouTube search externally (`Open YouTube`).
5. Control embedded playback from app buttons: `Play/Pause` and `Stop`.

---

## 3. Browser Behavior (Important)

Many websites block iframe embedding (YouTube, GitHub, many modern platforms).

When that happens, this app:
- Detects that it should be opened externally.
- Opens the real page in a browser tab.
- Shows user feedback via toast/fallback state.

This is intentional and improves real-world UX.

---

## 4. Keyboard + Power User Controls

### Global Shortcut
- `Ctrl+K` (or `Cmd+K`) -> Open command palette.

### Terminal Commands
Use the terminal app and type:
- `help`, `whoami`, `date`, `clear`, `echo <text>`
- `projects`, `contact`, `resume`, `research`, `demo`
- `tracker`, `dataset`, `monitor`, `timeline`, `achievements`
- `assistant`, `tour`
- `open <app>`
- `neofetch`, `matrix`

---

## 5. Persistence (Saved Locally)

The app stores key preferences/content in browser local storage:
- Selected wallpaper
- Accent color
- Notepad text
- Desktop icon positions/order

---

## 6. Tech Stack

- React 19
- Vite 8
- Lucide React icons
- `react-draggable` for window/icon movement
- Playwright for automated end-to-end tests

---

## 7. Run Locally

### Prerequisites
- Node.js 20+ recommended
- npm

### Install
```bash
npm install
```

### Start Dev Server
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

---

## 8. Automated Testing

Playwright E2E suite validates core UX flows:
- desktop boot/login behavior
- settings persistence
- notepad persistence
- browser external fallback
- resume/file explorer/task manager flows
- command palette launch
- recruiter tour flow
- live demo + AI assistant flows
- mobile icon behavior

Run tests:
```bash
npm test
```

If Playwright browsers are missing:
```bash
npx playwright install
```

---

## 9. Project Structure

```text
src/
  App.jsx                    # Desktop shell + window manager + global orchestration
  index.css                  # Full visual system and component styling
  components/
    Window.jsx               # Draggable window wrapper
    Taskbar.jsx              # Dock/taskbar
    StartMenu.jsx            # Start menu UI + search
    CommandPalette.jsx       # Ctrl+K command launcher
    MusicPlayer.jsx          # YouTube-integrated music experience
    BrowserApp.jsx           # Embedded browser + external handoff logic
    TerminalApp.jsx          # Command terminal
    ...                      # Portfolio and system apps
  data/
    portfolioSuiteData.js    # Recruiter tour + data cards
tests/
  app.spec.js                # Playwright E2E tests
```

---

## 10. Troubleshooting

### "I can't open some websites inside browser app"
Expected behavior. Those sites block embeds; use the app's external open action.

### "Music search is not visible"
Use the YouTube panel in Music Player window. Resize window larger if needed.

### "Icons overlap or layout feels off"
Right-click desktop -> `Sort Icons`.

### "App opens but data looks reset"
Clear browser cache/local storage can reset personalization and notes.

---

## 11. Live ML Link

AI Study Tool live app:
- https://ai-study-tool-jymarkehtgcxyqgpqjz9ki.streamlit.app/

---

## 12. Purpose

This portfolio is built to feel like a product, not a static profile:
- show technical depth
- show UX/product thinking
- help recruiters quickly evaluate work
- provide guided exploration with clear evidence
