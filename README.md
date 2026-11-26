# Skill Galaxy

A learning game for 10–12-year-olds (UK Key Stage 2 / early Key Stage 3). The galaxy holds 133 stars across 15 constellations covering maths, science, geography, history, English, computing and money.

- Each **star** is one micro-topic from the [Marble Skill Taxonomy](https://github.com/withmarbleapp/os-taxonomy). The lines between stars are Marble's prerequisite links.
- A **mission** is 5 questions. Get 4 right to light the star and unlock the stars that build on it. Get 5 right to earn ✦✦✦. Every answer shows a short explanation.
- A **Hyperjump** lets you try a locked star. Get all 5 right and it lights up, along with every star it builds on.
- A **comet run** is 60 seconds of quick-fire questions from stars you've already lit (spaced review).
- **Family players** are Mark, Anya, Victoria and Liam. Each has their own stars, stardust and best comet run. Progress is saved in the browser (`localStorage`); nothing is sent anywhere.

Play: open `index.html`, or serve the folder (`python -m http.server`).

## Files

| File | What it is |
|---|---|
| `index.html`, `style.css`, `game.js` | The game |
| `helpers.js` | Random helpers for maths generators, and typed-answer checking |
| `topics.js` | Constellations and stars, adapted from the Marble taxonomy (CC BY-SA 4.0) |
| `q-*.js` | Question banks (8 per star) and maths generators (new questions every time) |
| `tools/validate.js` | `node tools/validate.js` checks every bank and generator |
| `tools/select_topics.py` | Regenerates `topics.js` from the Marble data files |

Play online: https://mjburley.github.io/skill-galaxy/

## Credits and licences

The topic names, descriptions, skills lists and prerequisite links in `topics.js` come from the **Marble Skill Taxonomy v1** by [Marble](https://withmarble.com), licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). They have been adapted: a subset of topics was selected and grouped into constellations, and the prerequisite graph was reduced to links within each constellation. `topics.js` is shared under the same CC BY-SA 4.0 licence.

The questions and game code were written for this project.
