// Validate Skill Galaxy question banks.
// Usage: node tools/validate.js [q-file.js ...]   (no args = every q-*.js)
// Checks structure, lengths, duplicate options, markup balance and coverage
// (every star in a constellation the file touches needs at least MIN questions).
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const MIN = 8;
const ctx = { window: {}, console };
ctx.globalThis = ctx;
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
load(path.join(ROOT, 'helpers.js'));
load(path.join(ROOT, 'topics.js'));
const TOPICS = ctx.window.SG_TOPICS;
const CONST = ctx.window.SG_CONSTELLATIONS;
const R = ctx.window.SG_R || ctx.SG_R;

let files = process.argv.slice(2);
const checkAll = !files.length;
if (checkAll) files = fs.readdirSync(ROOT).filter(f => /^q-.*\.js$/.test(f)).map(f => path.join(ROOT, f));

let errors = 0, warnings = 0;
const err = (m) => { errors++; console.log('ERROR  ' + m); };
const warn = (m) => { warnings++; console.log('warn   ' + m); };

function checkMarkup(s, where) {
    if (typeof s !== 'string') return;
    if ((s.match(/\*\*/g) || []).length % 2) err(`${where}: unbalanced ** in "${s}"`);
    if ((s.match(/__/g) || []).length % 2) err(`${where}: unbalanced __ in "${s}"`);
    if ((s.match(/\[\[/g) || []).length !== (s.match(/\]\]/g) || []).length) err(`${where}: unbalanced [[ ]] in "${s}"`);
    (s.match(/\[\[([^\]]*)\]\]/g) || []).forEach(m => {
        if (!/^\[\[-?(\d+ )?[\w.]+\/[\w.]+\]\]$/.test(m)) err(`${where}: bad fraction markup ${m}`);
    });
    if (/NaN|undefined|Infinity|\[object/.test(s)) err(`${where}: suspicious text "${s}"`);
}

function checkItem(item, where, generated) {
    if (!item || typeof item !== 'object') return err(`${where}: not an object`);
    if (typeof item.q !== 'string' || !item.q.trim()) err(`${where}: missing q`);
    else if (item.q.length > 240) warn(`${where}: q is ${item.q.length} chars`);
    checkMarkup(item.q, where);
    if (typeof item.why !== 'string' || !item.why.trim()) err(`${where}: missing why`);
    else if (item.why.length > 300) warn(`${where}: why is ${item.why.length} chars`);
    checkMarkup(item.why, where);
    if (item.a !== undefined) {
        if (!Array.isArray(item.a) || item.a.length < 2 || item.a.length > 4) return err(`${where}: a must have 2-4 options`);
        const strs = item.a.map(String);
        if (new Set(strs.map(s => s.trim().toLowerCase())).size !== strs.length) err(`${where}: duplicate options ${JSON.stringify(strs)}`);
        strs.forEach(o => {
            if (!o.trim()) err(`${where}: empty option`);
            if (o.length > 80) warn(`${where}: long option (${o.length}) "${o}"`);
            if (/\b(all|none|both) of the above\b/i.test(o)) err(`${where}: "of the above" option`);
            checkMarkup(o, where);
        });
        if (!generated && strs.length === 4) {
            const others = Math.max(...strs.slice(1).map(s => s.length));
            if (strs[0].length > 1.8 * others && strs[0].length > 25) warn(`${where}: correct answer much longer than distractors: "${strs[0]}"`);
        }
    } else if (item.ans !== undefined) {
        if (typeof item.ans !== 'string' || !item.ans.trim()) err(`${where}: ans must be a non-empty string`);
        else if (!ctx.window.SG_checkTyped(item.ans, item)) err(`${where}: ans "${item.ans}" does not pass its own check`);
        (item.alt || []).forEach(a => { if (!ctx.window.SG_checkTyped(a, item)) err(`${where}: alt "${a}" does not pass check`); });
    } else err(`${where}: needs a (options) or ans (typed answer)`);
}

const banks = {}, gens = {};
ctx.SG_Q = ctx.window.SG_Q = (obj) => Object.entries(obj).forEach(([k, v]) => { banks[k] = (banks[k] || []).concat(v); });
ctx.SG_GEN = ctx.window.SG_GEN = (obj) => Object.assign(gens, obj);

const touched = new Set();
for (const f of files) {
    const before = new Set([...Object.keys(banks), ...Object.keys(gens)]);
    try { load(f); } catch (e) { err(`${path.basename(f)} failed to load: ${e.message}`); continue; }
    [...Object.keys(banks), ...Object.keys(gens)].filter(k => !before.has(k)).forEach(k => {
        if (!TOPICS[k]) err(`${path.basename(f)}: unknown topic id ${k}`);
        const c = CONST.find(c => c.stars.includes(k));
        if (c) touched.add(c.id);
    });
}

for (const [id, list] of Object.entries(banks)) {
    const name = TOPICS[id] ? TOPICS[id].name : id;
    const seen = new Set();
    list.forEach((item, i) => {
        checkItem(item, `${name} #${i + 1}`, false);
        const key = (item.q || '').trim().toLowerCase();
        if (seen.has(key)) err(`${name} #${i + 1}: duplicate question`);
        seen.add(key);
    });
    const tf = list.filter(it => Array.isArray(it.a) && it.a.length === 2).length;
    if (tf > 2) warn(`${name}: ${tf} two-option questions (max 2 recommended)`);
}

for (const [id, fn] of Object.entries(gens)) {
    const name = TOPICS[id] ? TOPICS[id].name : id;
    if (typeof fn !== 'function') { err(`${name}: generator is not a function`); continue; }
    const qs = new Set();
    let bad = 0;
    for (let i = 0; i < 400 && bad < 3; i++) {
        let item;
        try { item = fn(R); } catch (e) { err(`${name}: generator threw ${e.message}`); bad++; continue; }
        const e0 = errors;
        checkItem(item, `${name} (generated)`, true);
        if (errors > e0) { bad++; console.log('       ' + JSON.stringify(item)); }
        if (item && item.q) qs.add(item.q + JSON.stringify(item.a || item.ans));
    }
    if (qs.size < 12) warn(`${name}: generator only produced ${qs.size} distinct questions in 400 runs`);
}

// With no file arguments, every constellation must be fully covered.
if (checkAll) CONST.forEach(c => touched.add(c.id));
for (const cid of touched) {
    const c = CONST.find(c => c.id === cid);
    c.stars.forEach(id => {
        const n = (banks[id] || []).length;
        if (!gens[id] && n < MIN) err(`${c.name} / ${TOPICS[id].name}: ${n} questions (need ${MIN})`);
    });
}

const total = Object.values(banks).reduce((s, l) => s + l.length, 0);
console.log(`\n${Object.keys(banks).length} banked stars, ${total} questions, ${Object.keys(gens).length} generators — ${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
