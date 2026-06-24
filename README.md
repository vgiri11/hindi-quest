# Hindi Quest

A personal Hindi language learning tracker built with React, Vite, and Tailwind CSS.

## What this is

Hindi Quest is a fully client-side web app I built to track and structure my own journey learning Hindi — specifically to reach B1+ level by December 2026. The goal is embarrassingly specific: to attend an Abhishek Upmanyu comedy show and be able to clap back in Hindi if singled out as a German in the audience.

The app has 8 tabs covering every aspect of my study plan:

- **Today** — daily to-do lists organised by time block (Anki, study, output, partner practice), with a progress bar, localStorage persistence, and a calendar reminder download
- **Get Started** — an expandable setup checklist covering tools, apps, and resources
- **Roadmap** — a 26-week phased learning plan from Devanagari basics to show-ready fluency
- **Practice** — session cards that open Claude.ai with pre-written Hindi tutoring prompts
- **Resources** — curated free (and some paid) tools, YouTube channels, and streaming recommendations
- **Culture** — context cards on Indian cultural references that come up in Hindi comedy
- **Clap Back** — a set of memorisable Hindi responses for specific comedy show scenarios, with explanations of why each one works
- **Progress** — a 30-day streak tracker, unlockable achievement badges, and self-assessed skill sliders

All state is stored in `localStorage` — no backend, no account, no data leaves your browser.

## Why I built this myself

When I started looking for structured Hindi learning resources online, I found almost nothing that matched what I actually needed. Most existing tools fall into one of two categories: either very beginner-focused apps like Duolingo that treat language learning as a game without real depth, or expensive tutoring platforms. Free, structured, self-directed Hindi learning resources are genuinely rare compared to languages like Spanish or French.

So I built exactly what I needed: a tool designed around my specific schedule, my specific goal, and my specific sense of humour.

## This is a personal project

This app is not intended for general use — the content is written specifically for my situation (German speaker, absolute beginner, targeting one comedy show, six-month timeline). The Clap Back tab is written for one specific comedian. The cultural notes reflect what I needed to understand, not a comprehensive curriculum.

That said, if you want to use it as a starting point for your own language learning tracker — Hindi or otherwise — you're very welcome to fork it and adapt the data files in `src/data/` to your own goals. The structure is intentionally generic: swap out the todo content, the phases, the culture cards, and the clapbacks, and you'd have a completely different app.

## Tech stack

- **React 19** + **Vite 8** — component-based UI with fast hot module reloading
- **Tailwind CSS v3** — utility-first styling
- **React Router v7** — client-side tab navigation
- **localStorage** — all persistence, no backend required
- No UI component libraries — every component is hand-built

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project structure

```
src/
├── components/     # Reusable UI: Card, Pill, TodoItem
├── data/           # All content as plain JS — edit these to customise
│   ├── phases.js   # Roadmap phases and weeks
│   ├── todos.js    # Daily to-do lists per day of the week
│   ├── setup.js    # Setup checklist
│   ├── clapbacks.js
│   ├── culture.js
│   └── resources.js
├── hooks/          # useTodos, useSetup, useStreak — localStorage logic
├── pages/          # One file per tab
└── App.jsx         # Router and nav layout
```
