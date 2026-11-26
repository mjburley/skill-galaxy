# CLAUDE.md — Skill Galaxy

Learning game for Mark's kids (ages 10–12) built on the Marble Skill Taxonomy (github.com/withmarbleapp/os-taxonomy). Vanilla JS, no build step: `index.html` + `style.css` + `game.js`, data in `topics.js` and `q-*.js`. See README.md for gameplay.

## Data

- `topics.js` is **generated** by `select.py`, a scratch script that was not kept. It picks topics by ID suffix from Marble's `data/topics.json` and `dependencies.json`, connects the chosen topics through Marble's transitive prerequisites, then transitively reduces those links within each constellation.
- To change the star list, re-download the Marble data and regenerate rather than hand-editing. `topics.js` is CC BY-SA 4.0 and must keep its attribution header.
- Marble's em dashes in descriptions are genuine, not encoding damage.

## Question formats (`q-*.js`)

- **Banks.** `SG_Q({ "<topic id>": [ {q, a:[correct, wrong, wrong, wrong], why}, ... ] })` with 8 per star. The correct answer is always `a[0]`; the game shuffles, except true/false, which always shows True first.
- **Maths generators.** `SG_GEN({ "<topic id>": function (R) { return item; } })` returns MC `{q, a, why}` or typed `{q, ans, alt?, unit?, exact?, why}`. `R` is `SG_R` from `helpers.js`.
- **Typed answers.** Marked by `SG_checkTyped`, which normalises spaces, commas and £, and accepts numerically equal answers unless `exact`.
- **Markup.** `**bold**`, `__underline__`, `[[3/4]]`, `[[2 1/3]]`. Write gaps as "…", never `___`, which clashes with underline.
- **Validation.** Run `node tools/validate.js` after any change to a bank. With no arguments it also checks that every star has at least 8 questions or a generator.

## Rules learned (don't regress)

- **Nothing may leak the answer.** The phone keyboard type is chosen **per star** (`keyboardFor`), never per answer. A full keyboard only for negative answers gave the sign away. The answer-box placeholder shows a format only for `exact` answers, where the question already states the form.
- **Hyperjump.** Retrying a failed Hyperjump must stay a jump (5/5 needed) while the star is locked.
- **Comet timer.** It runs on `requestAnimationFrame` with each step capped at 250 ms. In a hidden browser pane it barely moves, so use `?cometsecs=4` to test the end of a run.
- **Storage.** `localStorage` key `skillgalaxy_v1` = `{last, muted, players: {Name: {stars: {id: {r, n, d}}, dust, comet, seen}}}`. `r`: 1 = lit by Hyperjump, 2 = 4/5, 3 = 5/5.

## Running

- **Preview server.** The `skillgalaxy` entry lives in `Galaxians/.claude/launch.json`, not in this folder: Python http.server on port 8138 with `--directory` pointing here.
- **Games index.** The card is in the `GAMES` array of `ClaudeCode/index.html` (tag "Learning").
