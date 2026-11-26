// Skill Galaxy — a learning game built on the Marble Skill Taxonomy.
// Each star is a Marble micro-topic; lines are Marble prerequisite links.
// Answer 4 of 5 questions to light a star and unlock the stars that build on it.
(function () {
    'use strict';

    // ------------------------------------------------------------------ data
    const PLAYERS = [
        { name: 'Mark', emoji: '\u{1F468}‍\u{1F680}', color: '#4f6df5' },
        { name: 'Anya', emoji: '\u{1F984}', color: '#e052a0' },
        { name: 'Victoria', emoji: '\u{1F31F}', color: '#f5a54f' },
        { name: 'Liam', emoji: '\u{1F409}', color: '#20b2aa' }
    ];
    const GROUP_ORDER = ['Maths', 'Science', 'Geography', 'History', 'English', 'Computing', 'Life Skills'];
    const STORE_KEY = 'skillgalaxy_v1';
    const MISSION_LEN = 5;
    const PASS_MARK = 4;
    // ?cometsecs=5 shortens comet runs for testing
    const COMET_MS = (Number(new URLSearchParams(location.search).get('cometsecs')) || 60) * 1000;
    const COMET_MIN_STARS = 3;
    const PRAISE = ['Brilliant!', 'Spot on!', 'Stellar!', 'Nailed it!', 'Correct!', 'Superb!', 'Out of this world!'];
    const NOT_QUITE = ['Not quite.', 'Close, but no.', 'Not this time.'];

    const TOPICS = window.SG_TOPICS;
    const CONSTS = window.SG_CONSTELLATIONS;
    const BANK = window.SG_BANK;
    const GENS = window.SG_GENS;
    const R = window.SG_R;
    const TOTAL_STARS = CONSTS.reduce((s, c) => s + c.stars.length, 0);
    const STAR_CONST = {};
    const DEPENDENTS = {};
    CONSTS.forEach(c => c.stars.forEach(id => { STAR_CONST[id] = c; DEPENDENTS[id] = []; }));
    Object.keys(TOPICS).forEach(id => TOPICS[id].pre.forEach(p => DEPENDENTS[p] && DEPENDENTS[p].push(id)));

    const $ = (sel) => document.querySelector(sel);
    const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };

    // ------------------------------------------------------------------ storage
    const store = {
        get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
        set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
    };
    const save = store.get(STORE_KEY, null) || { last: 'Mark', muted: false, players: {} };
    if (!save.players) save.players = {};
    const persist = () => store.set(STORE_KEY, save);

    const state = { player: PLAYERS.some(p => p.name === save.last) ? save.last : 'Mark', screen: 'title', constId: null, mission: null, justLit: [], newlyReady: [] };
    const playerInfo = () => PLAYERS.find(p => p.name === state.player);
    const P = (name) => {
        name = name || state.player;
        if (!save.players[name]) save.players[name] = { stars: {}, dust: 0, comet: 0, seen: {} };
        return save.players[name];
    };

    // ------------------------------------------------------------------ star logic
    const starName = (id) => TOPICS[id].name.replace(/\s*\(age \d+\+\)/i, '');
    const hasQuestions = (id) => !!GENS[id] || (BANK[id] && BANK[id].length >= MISSION_LEN);
    const rating = (id, name) => { const s = P(name).stars[id]; return s ? s.r : 0; };
    const isLit = (id, name) => rating(id, name) > 0;
    function status(id, name) {
        if (!hasQuestions(id)) return 'soon';
        if (isLit(id, name)) return 'lit';
        return TOPICS[id].pre.every(p => isLit(p, name)) ? 'ready' : 'locked';
    }
    function ancestors(id, out) {
        out = out || new Set();
        TOPICS[id].pre.forEach(p => { if (!out.has(p)) { out.add(p); ancestors(p, out); } });
        return out;
    }
    const litCount = (name) => Object.keys(TOPICS).filter(id => STAR_CONST[id] && isLit(id, name)).length;
    const goldCount = (name) => Object.keys(TOPICS).filter(id => STAR_CONST[id] && rating(id, name) === 3).length;
    const today = () => { const d = new Date(); return [d.getDate(), d.getMonth() + 1, d.getFullYear()].map((n, i) => i < 2 ? String(n).padStart(2, '0') : n).join('/'); };
    const sparks = (r) => r >= 3 ? '✦✦✦' : r === 2 ? '✦✦' : r === 1 ? '✦' : '';

    // ------------------------------------------------------------------ text
    const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    function md(s) {
        s = esc(s);
        s = s.replace(/\[\[(-?\d+) ([\w.]+)\/([\w.]+)\]\]/g, '<span class="mixed">$1<span class="frac" aria-hidden="true"><span>$2</span><span>$3</span></span><span class="sr"> and $2 over $3</span></span>');
        s = s.replace(/\[\[(-?[\w.]+)\/([\w.]+)\]\]/g, '<span class="frac" aria-hidden="true"><span>$1</span><span>$2</span></span><span class="sr">$1 over $2</span>');
        s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/__(.+?)__/g, '<u>$1</u>');
        return s;
    }
    const sentence = (s) => { s = s.trim(); s = s.charAt(0).toUpperCase() + s.slice(1); return /[.!?]$/.test(s) ? s : s + '.'; };

    // ------------------------------------------------------------------ sound
    const sound = {
        ctx: null,
        init() {
            if (this.ctx) return;
            try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ctx = null; }
        },
        tone(freq, dur, type, vol, when, slideTo) {
            if (save.muted || !this.ctx) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const t = this.ctx.currentTime + (when || 0);
            const o = this.ctx.createOscillator(), g = this.ctx.createGain();
            o.type = type || 'sine';
            o.frequency.setValueAtTime(freq, t);
            if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.015);
            g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
            o.connect(g); g.connect(this.ctx.destination);
            o.start(t); o.stop(t + dur + 0.05);
        },
        click() { this.tone(900, 0.05, 'triangle', 0.05); },
        correct() { this.tone(660, 0.12, 'triangle', 0.13); this.tone(990, 0.2, 'triangle', 0.13, 0.09); },
        wrong() { this.tone(260, 0.22, 'sine', 0.12, 0, 180); },
        light() { [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => this.tone(f, 0.35, 'triangle', 0.09, i * 0.07)); },
        fail() { [392, 330, 262].forEach((f, i) => this.tone(f, 0.25, 'sine', 0.08, i * 0.12)); },
        unlock() { this.tone(1200, 0.4, 'sine', 0.07, 0, 2400); },
        tick() { this.tone(1500, 0.03, 'square', 0.03); }
    };

    // ------------------------------------------------------------------ sky
    const sky = (() => {
        const cv = $('#sky'), cx = cv.getContext('2d');
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let stars = [], W = 0, H = 0, shoot = null, last = 0;
        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth; H = window.innerHeight;
            cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const n = Math.round(W * H / 5000);
            stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + 0.3, p: Math.random() * 6.28, s: 0.5 + Math.random() * 1.5, v: 0.02 + Math.random() * 0.08 }));
            if (reduce) draw(0);
        }
        function draw(t) {
            cx.clearRect(0, 0, W, H);
            for (const s of stars) {
                const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.p + t * 0.001 * s.s));
                cx.globalAlpha = a; cx.fillStyle = '#fff';
                cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.283); cx.fill();
            }
            if (shoot) {
                const k = (t - shoot.t0) / 900;
                if (k > 1) shoot = null;
                else {
                    const x = shoot.x + shoot.dx * k, y = shoot.y + shoot.dy * k;
                    const g = cx.createLinearGradient(x, y, x - shoot.dx * 0.15, y - shoot.dy * 0.15);
                    g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
                    cx.globalAlpha = 1 - k; cx.strokeStyle = g; cx.lineWidth = 2;
                    cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x - shoot.dx * 0.15, y - shoot.dy * 0.15); cx.stroke();
                }
            }
            cx.globalAlpha = 1;
        }
        function loop(t) {
            if (!document.hidden) {
                const dt = Math.min(50, t - last); last = t;
                for (const s of stars) { s.x -= s.v * dt * 0.05; if (s.x < -2) s.x = W + 2; }
                if (!shoot && Math.random() < 0.002) shoot = { t0: t, x: Math.random() * W * 0.8 + W * 0.2, y: Math.random() * H * 0.4, dx: -W * 0.35, dy: H * 0.2 };
                draw(t);
            }
            requestAnimationFrame(loop);
        }
        window.addEventListener('resize', resize);
        resize();
        if (!reduce) requestAnimationFrame(loop);
        return { shootingStar() { if (!reduce) shoot = { t0: performance.now(), x: W * 0.9, y: H * 0.1, dx: -W * 0.6, dy: H * 0.35 }; } };
    })();

    // ------------------------------------------------------------------ ui helpers
    let toastTimer = null;
    function toast(msg, ms) {
        const t = $('#toast');
        t.innerHTML = msg; t.classList.add('show');
        clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), ms || 2600);
    }
    function floaty(text, near) {
        const f = el('div', 'floaty', esc(text));
        const r = near ? near.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0 };
        f.style.left = (r.left + r.width / 2 - 20) + 'px'; f.style.top = (r.top - 10) + 'px';
        document.body.appendChild(f); setTimeout(() => f.remove(), 1000);
    }

    function show(screen) {
        state.screen = screen;
        document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === 'screen-' + screen));
        $('#bar').classList.toggle('hidden', screen === 'title');
        updateBar();
        const scr = $('#screen-' + screen); if (scr) scr.scrollTop = 0;
    }
    function updateBar() {
        const pi = playerInfo();
        document.documentElement.style.setProperty('--player', pi.color);
        $('#pill-player').innerHTML = `<span aria-hidden="true">${pi.emoji}</span> <span class="pn">${esc(pi.name)}</span>`;
        $('#dust').textContent = P().dust.toLocaleString('en-GB');
        $('#lit').textContent = litCount() + '/' + TOTAL_STARS;
        const titles = { galaxy: 'Skill Galaxy', const: state.constId ? constById(state.constId).icon + ' ' + constById(state.constId).name : '', mission: '', result: '' };
        if (state.mission && (state.screen === 'mission' || state.screen === 'result')) {
            titles.mission = titles.result = state.mission.mode === 'comet' ? '☄️ Comet run' : starName(state.mission.id);
        }
        $('#bar-title').textContent = titles[state.screen] || '';
        const cometReady = litCount() >= COMET_MIN_STARS;
        $('#btn-comet').style.opacity = cometReady ? 1 : 0.45;
        $('#btn-comet').classList.toggle('hidden', state.screen === 'mission');
        $('#btn-sound').textContent = save.muted ? '🔇' : '🔊';
        $('#btn-sound').setAttribute('aria-label', save.muted ? 'Sound off' : 'Sound on');
    }
    const constById = (id) => CONSTS.find(c => c.id === id);

    // ------------------------------------------------------------------ title
    function renderTitle() {
        const wrap = $('#player-pick');
        wrap.innerHTML = '';
        PLAYERS.forEach(p => {
            const b = el('button', 'player-card');
            b.setAttribute('role', 'radio');
            b.setAttribute('aria-checked', String(p.name === state.player));
            b.style.setProperty('--pc', p.color);
            b.innerHTML = `<span class="emoji" aria-hidden="true">${p.emoji}</span><span class="pname">${esc(p.name)}</span>` +
                `<span class="pstats">⭐ ${litCount(p.name)} · ✨ ${P(p.name).dust.toLocaleString('en-GB')}</span>`;
            b.addEventListener('click', () => { selectPlayer(p.name); sound.init(); sound.click(); });
            wrap.appendChild(b);
        });
        document.documentElement.style.setProperty('--player', playerInfo().color);
    }
    function selectPlayer(name) {
        state.player = name; save.last = name; persist(); renderTitle();
        const btn = [...document.querySelectorAll('.player-card')].find(b => b.getAttribute('aria-checked') === 'true');
        if (btn && document.activeElement && document.activeElement.classList.contains('player-card')) btn.focus();
    }

    // ------------------------------------------------------------------ layout of a constellation
    function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0); }
    function depthMap(c) {
        const d = {};
        const f = (id) => d[id] !== undefined ? d[id] : (d[id] = TOPICS[id].pre.length ? 1 + Math.max(...TOPICS[id].pre.map(f)) : 0);
        c.stars.forEach(f);
        return d;
    }
    function layout(c, W, o) {
        const dm = depthMap(c);
        const maxD = Math.max(...Object.values(dm));
        const levels = [];
        for (let d = 0; d <= maxD; d++) levels.push(c.stars.filter(id => dm[id] === d));
        const pos = {};
        let H = 0;
        const place = () => {
            const rows = [];
            levels.forEach(lv => {
                const per = Math.ceil(lv.length / Math.ceil(lv.length / o.maxPer)); // balanced rows
                for (let i = 0; i < lv.length; i += per) rows.push(lv.slice(i, i + per));
            });
            const n = rows.length;
            const gap = o.H ? (n > 1 ? (o.H - 2 * o.my) / (n - 1) : 0) : o.rowGap;
            H = o.H || (o.myTop + o.my + (n - 1) * gap);
            rows.forEach((row, ri) => {
                const y = n === 1 && o.H ? H / 2 : H - o.my - ri * gap;
                const slot = W / row.length;
                row.forEach((id, i) => {
                    const jx = ((hash(id) % 1000) / 1000 - 0.5) * Math.min(slot, 160) * o.jitter;
                    const jy = n > 1 ? ((hash(id + 'y') % 1000) / 1000 - 0.5) * gap * o.jitter * 0.6 : 0;
                    pos[id] = { x: slot * (i + 0.5) + jx, y: y + jy };
                });
            });
        };
        place();
        for (let pass = 0; pass < 2; pass++) {
            levels.forEach((lv, d) => {
                const k = {};
                lv.forEach(id => {
                    const nb = d === 0 ? DEPENDENTS[id] : TOPICS[id].pre;
                    k[id] = nb.length ? nb.reduce((s, x) => s + pos[x].x, 0) / nb.length : pos[id].x;
                });
                lv.sort((a, b) => k[a] - k[b]);
            });
            place();
        }
        return { pos, H };
    }
    function wrapLabel(text, max) {
        const words = text.split(' '), lines = [];
        let cur = '';
        words.forEach(w => {
            if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
        });
        if (cur) lines.push(cur);
        if (lines.length > 3) {
            let rest = lines.slice(2).join(' ');
            if (rest.length > max + 2) rest = rest.slice(0, max).replace(/\s+\S*$/, '') + '…';
            lines.length = 2; lines.push(rest);
        }
        return lines;
    }
    const SVG_DEFS = `<defs>
        <radialGradient id="gold" cx="40%" cy="35%" r="70%"><stop offset="0%" stop-color="#fffbe0"/><stop offset="45%" stop-color="#ffd43b"/><stop offset="100%" stop-color="#f08c00"/></radialGradient>
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>`;

    // ------------------------------------------------------------------ galaxy
    function renderGalaxy() {
        const grid = $('#galaxy-grid');
        grid.innerHTML = '';
        const groups = GROUP_ORDER.filter(g => CONSTS.some(c => c.group === g));
        groups.forEach(g => {
            grid.appendChild(el('h2', 'group-h', esc(g)));
            CONSTS.filter(c => c.group === g).forEach(c => {
                const lit = c.stars.filter(id => isLit(id)).length;
                const b = el('button', 'tile' + (lit === c.stars.length ? ' done' : ''));
                b.style.setProperty('--cc', c.color);
                b.setAttribute('aria-label', `${c.name}: ${lit} of ${c.stars.length} stars lit`);
                const { pos } = layout(c, 200, { maxPer: 6, H: 92, my: 12, jitter: 0.6 });
                let svg = `<svg viewBox="0 0 200 92" aria-hidden="true">`;
                c.stars.forEach(id => TOPICS[id].pre.forEach(p => {
                    const on = isLit(id) && isLit(p);
                    svg += `<line x1="${pos[p].x}" y1="${pos[p].y}" x2="${pos[id].x}" y2="${pos[id].y}" stroke="${on ? c.color : 'rgba(255,255,255,0.22)'}" stroke-width="${on ? 2 : 1.2}"/>`;
                }));
                c.stars.forEach(id => {
                    const st = status(id);
                    const fill = st === 'lit' ? '#ffd43b' : st === 'ready' ? '#ffffff' : '#4a5190';
                    const r = st === 'lit' ? 5.5 : st === 'ready' ? 4 : 3;
                    if (st === 'lit') svg += `<circle cx="${pos[id].x}" cy="${pos[id].y}" r="11" fill="#ffd43b" opacity="0.22"/>`;
                    svg += `<circle cx="${pos[id].x}" cy="${pos[id].y}" r="${r}" fill="${fill}"/>`;
                });
                svg += '</svg>';
                b.innerHTML = svg + `<span class="tname"><span aria-hidden="true">${c.icon}</span>${esc(c.name)}</span>` +
                    `<span class="tprog"><span class="bar"><i style="width:${Math.round(100 * lit / c.stars.length)}%"></i></span>${lit}/${c.stars.length}</span>`;
                b.addEventListener('click', () => { sound.click(); openConstellation(c.id); });
                grid.appendChild(b);
            });
        });
        const n = litCount();
        $('#galaxy-msg').innerHTML = n === 0 ? 'Pick a constellation and light your first star.'
            : n === TOTAL_STARS ? 'You have lit the whole galaxy! 🌌 Try a comet run, or go for ✦✦✦ on every star.'
                : `You've lit ${n} of ${TOTAL_STARS} stars. Pick a constellation to explore.`;
    }

    // ------------------------------------------------------------------ constellation tree
    function openConstellation(id) {
        state.constId = id;
        show('const');
        renderTree();
    }
    function renderTree() {
        const c = constById(state.constId);
        const wrap = $('#tree-wrap');
        const W = Math.max(300, Math.min(1100, wrap.clientWidth || window.innerWidth - 32));
        const maxPer = Math.max(2, Math.min(8, Math.floor(W / 118)));
        const { pos, H } = layout(c, W, { maxPer, rowGap: 122, my: 62, myTop: 40, jitter: 0.35 });
        const svg = $('#tree');
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        svg.setAttribute('height', H);
        svg.style.setProperty('--cc', c.color);
        svg.setAttribute('aria-label', c.name + ' stars');
        const labelMax = Math.max(12, Math.min(18, Math.floor(W / maxPer / 8.5)));
        let edges = '', nodes = '';
        c.stars.forEach(id => TOPICS[id].pre.forEach(p => {
            edges += `<line class="edge${isLit(id) && isLit(p) ? ' on' : ''}" x1="${pos[p].x}" y1="${pos[p].y}" x2="${pos[id].x}" y2="${pos[id].y}"/>`;
        }));
        c.stars.forEach(id => {
            const st = status(id), r = rating(id), { x, y } = pos[id];
            const lines = wrapLabel(starName(id), labelMax);
            const label = lines.map((l, i) => `<tspan x="0" dy="${i ? 15 : 0}">${esc(l)}</tspan>`).join('');
            const stLabel = { lit: 'lit ' + sparks(r).length + ' of 3 sparkles', ready: 'ready to play', locked: 'locked', soon: 'coming soon' }[st];
            const cls = 'node ' + (st === 'soon' ? 'locked' : st) + (state.justLit.includes(id) ? ' just-lit' : '');
            nodes += `<g class="${cls}" data-id="${id}" transform="translate(${x},${y})" tabindex="0" role="button" aria-label="${esc(starName(id))}, ${stLabel}">` +
                `<circle class="hit" r="34"/>` +
                (st === 'ready' ? `<circle class="halo" r="21"/>` : '') +
                `<circle class="core" r="${st === 'lit' ? 15 : st === 'ready' ? 13 : 10}"/>` +
                (st === 'lit' ? `<text class="sparks" y="-22">${sparks(r)}</text>` : '') +
                (st === 'locked' || st === 'soon' ? `<text class="lock" y="5" aria-hidden="true">${st === 'soon' ? '…' : '🔒'}</text>` : '') +
                `<text class="label" y="34">${label}</text></g>`;
        });
        svg.innerHTML = SVG_DEFS + edges + nodes;
        svg.querySelectorAll('.node').forEach(n => {
            n.addEventListener('click', () => { sound.click(); openStar(n.dataset.id, n); });
            n.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openStar(n.dataset.id, n); } });
        });
        const lit = c.stars.filter(id => isLit(id)).length;
        const gold = c.stars.filter(id => rating(id) === 3).length;
        $('#const-msg').innerHTML = lit === c.stars.length
            ? (gold === c.stars.length ? 'Every star here is ✦✦✦ — a perfect constellation! 🏅' : 'Constellation complete! 🏅 Replay stars to earn ✦✦✦ on each one.')
            : lit === 0 ? 'Tap a glowing star to start a mission. Get 4 out of 5 right to light it.'
                : 'Light a star to unlock the stars that build on it.';
        if (state.newlyReady.length) {
            const names = state.newlyReady.map(starName);
            setTimeout(() => { sound.unlock(); toast('🔓 New star' + (names.length > 1 ? 's' : '') + ' unlocked: ' + esc(names.join(', '))); }, 500);
            state.newlyReady = [];
        }
        state.justLit = [];
    }

    // ------------------------------------------------------------------ star sheet
    let sheetReturn = null;
    function openSheet(html, returnFocus) {
        sheetReturn = returnFocus || document.activeElement;
        $('#sheet-body').innerHTML = html;
        $('#sheet').classList.remove('hidden');
        $('#sheet-back').classList.remove('hidden');
        const first = $('#sheet-body').querySelector('.big-btn') || $('#sheet-close');
        setTimeout(() => first.focus(), 30);
    }
    function closeSheet() {
        if ($('#sheet').classList.contains('hidden')) return false;
        $('#sheet').classList.add('hidden');
        $('#sheet-back').classList.add('hidden');
        if (sheetReturn && document.body.contains(sheetReturn)) sheetReturn.focus();
        return true;
    }
    function openStar(id, node) {
        const t = TOPICS[id], c = STAR_CONST[id], st = status(id), r = rating(id);
        const chip = (x) => `<span class="chip${isLit(x) ? ' on' : ''}">${isLit(x) ? '⭐' : '🔒'} ${esc(starName(x))}</span>`;
        const ages = t.age[0] === t.age[1] ? `age ${t.age[0]}` : `ages ${t.age[0]}–${t.age[1]}`;
        let html = `<h2 id="sheet-h">${esc(starName(id))}</h2>` +
            `<div class="meta">${c.icon} ${esc(c.name)} · ${esc(t.domain)} · ${ages}</div>` +
            `<p class="desc">${esc(sentence(t.desc))}</p>`;
        if (t.evidence.length) html += `<h3>Skills in this star</h3><ul>${t.evidence.slice(0, 3).map(e => `<li>${esc(sentence(e))}</li>`).join('')}</ul>`;
        if (t.pre.length) html += `<h3>Builds on</h3><div class="chips">${t.pre.map(chip).join('')}</div>`;
        if (DEPENDENTS[id].length) html += `<h3>Unlocks</h3><div class="chips">${DEPENDENTS[id].map(chip).join('')}</div>`;
        html += '<div class="actions">';
        if (st === 'soon') html += `<span class="note">Questions for this star are coming soon.</span>`;
        else if (st === 'locked') {
            html += `<button class="big-btn purple" data-act="jump"><span aria-hidden="true">🌀</span> Hyperjump</button>` +
                `<span class="note">Light the stars it builds on first — or Hyperjump: get all 5 right to light this star <b>and</b> the ones it builds on.</span>`;
        } else {
            html += `<button class="big-btn gold" data-act="play"><span aria-hidden="true">🚀</span> ${st === 'lit' ? 'Play again' : 'Start mission'}</button>`;
            html += st === 'lit' ? `<span class="note">Your best: <b style="color:var(--gold)">${sparks(r)}</b>${r < 3 ? ' — get 5 out of 5 for ✦✦✦' : ' — perfect!'}</span>`
                : `<span class="note">5 questions · get 4 right to light it</span>`;
        }
        html += '</div>';
        openSheet(html, node);
        const b = $('#sheet-body').querySelector('[data-act]');
        if (b) b.addEventListener('click', () => { closeSheet(); startMission(id, b.dataset.act === 'jump' ? 'jump' : 'normal'); });
    }

    // ------------------------------------------------------------------ missions
    function prepare(item) {
        const it = Object.assign({}, item);
        if (Array.isArray(it.a)) {
            let opts = it.a.map((t, i) => ({ t: String(t), ok: i === 0 }));
            if (opts.length === 2 && opts.every(o => /^(true|false)$/i.test(o.t))) opts.sort((a, b) => /^true$/i.test(a.t) ? -1 : 1);
            else opts = R.shuffle(opts);
            it.opts = opts;
        }
        return it;
    }
    function drawItem(id, avoid) {
        if (GENS[id]) {
            for (let tries = 0; tries < 25; tries++) {
                let it;
                try { it = GENS[id](R); } catch (e) { continue; }
                if (!it) continue;
                const key = it.q + '|' + (it.a ? it.a[0] : it.ans);
                if (!avoid.has(key)) { avoid.add(key); return prepare(it); }
            }
            return null;
        }
        return null;
    }
    function pickItems(id) {
        if (GENS[id]) {
            const avoid = new Set(), items = [];
            for (let i = 0; i < MISSION_LEN; i++) { const it = drawItem(id, avoid); if (it) items.push(it); }
            return items;
        }
        const bank = BANK[id] || [];
        const p = P();
        const recent = new Set(p.seen[id] || []);
        const order = R.shuffle(bank.map((_, i) => i)).sort((a, b) => (recent.has(a) ? 1 : 0) - (recent.has(b) ? 1 : 0));
        const chosen = order.slice(0, MISSION_LEN);
        p.seen[id] = chosen; persist();
        return chosen.map(i => prepare(bank[i]));
    }
    function startMission(id, mode) {
        sound.init();
        const items = pickItems(id);
        if (items.length < MISSION_LEN) { toast('This star has no questions yet.'); return; }
        state.mission = { id, mode, items, i: 0, correct: 0, streak: 0, dust: 0, answered: false };
        $('#timer').classList.add('hidden');
        $('#pips').classList.remove('hidden');
        show('mission');
        renderQuestion();
    }
    function startComet() {
        sound.init();
        const pool = Object.keys(TOPICS).filter(id => STAR_CONST[id] && isLit(id) && hasQuestions(id));
        if (pool.length < COMET_MIN_STARS) {
            toast(`☄️ Light ${COMET_MIN_STARS} stars to unlock comet runs (you have ${pool.length}).`);
            return;
        }
        state.mission = { mode: 'comet', pool, items: [], i: 0, correct: 0, streak: 0, dust: 0, answered: false, left: COMET_MS, lastT: performance.now(), seenKeys: new Set(), over: false };
        $('#timer').classList.remove('hidden');
        $('#pips').classList.add('hidden');
        show('mission');
        nextCometItem();
        requestAnimationFrame(cometTick);
    }
    function nextCometItem() {
        const m = state.mission;
        let it = null;
        for (let tries = 0; tries < 20 && !it; tries++) {
            const id = R.pick(m.pool);
            if (GENS[id]) it = drawItem(id, m.seenKeys);
            else {
                const bank = BANK[id];
                const raw = R.pick(bank), key = raw.q;
                if (!m.seenKeys.has(key) || tries > 15) { m.seenKeys.add(key); it = prepare(raw); }
            }
            if (it) it.star = id;
        }
        m.items[m.i] = it;
        renderQuestion();
    }
    function cometTick(t) {
        const m = state.mission;
        if (!m || m.mode !== 'comet' || m.over || state.screen !== 'mission') return;
        const dt = t - m.lastT; m.lastT = t;
        if (!document.hidden && !m.paused) m.left -= Math.min(dt, 250);
        $('#timer-fill').style.transform = `scaleX(${Math.max(0, m.left / COMET_MS)})`;
        if (m.left <= 0) { m.over = true; finishComet(); return; }
        requestAnimationFrame(cometTick);
    }

    // One phone keyboard per star, so the keyboard can't hint at an answer's sign or form.
    // A star whose answers can ever need '-', '/', a space or letters always gets the full keyboard.
    const kbCache = {};
    const needsText = (it) => /[^0-9.,£]/.test([it.ans].concat(it.alt || []).join(' '));
    function keyboardFor(id, it) {
        if (!id || !GENS[id]) return needsText(it) ? 'text' : 'decimal';
        if (!(id in kbCache)) {
            let text = false;
            for (let i = 0; i < 150 && !text; i++) {
                try { const g = GENS[id](R); if (g && g.ans !== undefined && needsText(g)) text = true; } catch (e) { /* ignore */ }
            }
            kbCache[id] = text ? 'text' : 'decimal';
        }
        return kbCache[id];
    }

    function renderQuestion() {
        const m = state.mission, it = m.items[m.i];
        m.answered = false;
        if (m.mode !== 'comet') {
            $('#pips').innerHTML = m.items.map((_, i) => {
                const res = m.results && m.results[i];
                return `<span class="pip${i === m.i ? ' now' : ''}${res === true ? ' ok' : res === false ? ' no' : ''}">${res === true ? '✓' : res === false ? '✗' : ''}</span>`;
            }).join('');
            $('#pips').setAttribute('aria-label', `Question ${m.i + 1} of ${m.items.length}`);
        }
        $('#streak').textContent = m.mode === 'comet' ? `✔ ${m.correct}` + (m.streak >= 3 ? `  🔥×${1 + Math.floor(m.streak / 3)}` : '')
            : (m.streak >= 2 ? `🔥 ${m.streak} in a row` : '');
        $('#question').innerHTML = md(it.q);
        $('#feedback').innerHTML = '';
        $('#btn-next').classList.add('hidden');
        const ans = $('#answers'), typed = $('#typed');
        if (it.opts) {
            typed.classList.add('hidden');
            ans.classList.remove('hidden');
            ans.innerHTML = '';
            it.opts.forEach((o, i) => {
                const b = el('button', 'answer', `<span class="key" aria-hidden="true">${'ABCD'[i]}</span>${md(o.t)}`);
                b.addEventListener('click', () => chooseOption(i));
                ans.appendChild(b);
            });
        } else {
            ans.classList.add('hidden');
            typed.classList.remove('hidden');
            const inp = $('#typed-in');
            inp.value = ''; inp.disabled = false; inp.className = '';
            inp.setAttribute('inputmode', keyboardFor(m.mode === 'comet' ? it.star : m.id, it));
            // Format hint only where the question already demands that form (exact answers),
            // so the hint never tells a child anything about the answer.
            inp.placeholder = it.exact && /^-?\d+ \d+\/\d+$/.test(it.ans) ? 'e.g. 2 3/4'
                : it.exact && /^-?\d+\/\d+$/.test(it.ans) ? 'e.g. 3/4' : 'Type your answer';
            $('#typed-unit').textContent = it.unit || '';
            $('#typed-go').disabled = false;
            setTimeout(() => inp.focus(), 50);
        }
        if (m.mode === 'comet') m.paused = false;
    }
    function chooseOption(i) {
        const m = state.mission;
        if (!m || m.answered) return;
        const it = m.items[m.i];
        const btns = [...document.querySelectorAll('#answers .answer')];
        btns.forEach((b, k) => {
            b.disabled = true;
            if (it.opts[k].ok) b.classList.add('right');
            else if (k === i) b.classList.add('wrong');
            else b.classList.add('dim');
        });
        afterAnswer(it.opts[i].ok, btns[i], null);
    }
    function submitTyped(e) {
        e.preventDefault();
        const m = state.mission;
        if (!m || m.answered) return;
        const inp = $('#typed-in');
        if (!inp.value.trim()) { inp.focus(); return; }
        const it = m.items[m.i];
        const ok = window.SG_checkTyped(inp.value, it);
        inp.disabled = true; inp.classList.add(ok ? 'right' : 'wrong');
        $('#typed-go').disabled = true;
        afterAnswer(ok, inp, ok ? null : it.ans + (it.unit ? ' ' + it.unit : ''));
    }
    function afterAnswer(ok, near, correctText) {
        const m = state.mission, it = m.items[m.i];
        m.answered = true;
        m.results = m.results || [];
        m.results[m.i] = ok;
        let gained = 0;
        if (ok) {
            m.correct++; m.streak++;
            gained = m.mode === 'comet' ? 10 * (1 + Math.floor((m.streak - 1) / 3)) : 10 + (m.streak >= 3 ? 5 : 0);
            m.dust += gained;
            floaty('+' + gained + ' ✨', near);
            sound.correct();
        } else { m.streak = 0; sound.wrong(); }
        const verdict = ok ? R.pick(PRAISE) : R.pick(NOT_QUITE) + (correctText ? ` The answer is <b>${md(correctText)}</b>.` : '');
        if (m.mode === 'comet') {
            $('#feedback').innerHTML = `<div class="verdict ${ok ? 'ok' : 'no'}">${verdict}</div>`;
            $('#streak').textContent = `✔ ${m.correct}` + (m.streak >= 3 ? `  🔥×${1 + Math.floor(m.streak / 3)}` : '');
            m.paused = !ok; // don't punish reading the correct answer
            setTimeout(() => { if (state.mission === m && !m.over) { m.i++; nextCometItem(); } }, ok ? 650 : 1700);
            return;
        }
        $('#feedback').innerHTML = `<div class="verdict ${ok ? 'ok' : 'no'}">${verdict}</div><div class="why">${md(it.why)}</div>`;
        $('#streak').textContent = m.streak >= 2 ? `🔥 ${m.streak} in a row` : '';
        const nb = $('#btn-next');
        const last = m.i === m.items.length - 1;
        nb.innerHTML = last ? '<span aria-hidden="true">🏁</span> Finish' : '<span aria-hidden="true">➡️</span> Next';
        nb.classList.remove('hidden');
        // update pips immediately
        const pip = document.querySelectorAll('#pips .pip')[m.i];
        if (pip) { pip.classList.add(ok ? 'ok' : 'no'); pip.textContent = ok ? '✓' : '✗'; }
        setTimeout(() => nb.focus(), 30);
    }
    function nextQuestion() {
        const m = state.mission;
        if (!m || !m.answered || m.mode === 'comet') return;
        if (m.i < m.items.length - 1) { m.i++; renderQuestion(); } else finishMission();
    }

    function finishMission() {
        const m = state.mission, id = m.id, p = P(), c = STAR_CONST[id];
        const before = {};
        c.stars.forEach(s => { before[s] = status(s); });
        const perfect = m.correct === m.items.length;
        const passed = m.mode === 'jump' ? perfect : m.correct >= PASS_MARK;
        const prev = rating(id);
        let bonus = 0;
        const jumped = [];
        const rec = p.stars[id] || { r: 0, n: 0 };
        rec.n = (rec.n || 0) + 1;
        if (passed) {
            const r = perfect ? 3 : 2;
            if (!prev) bonus += 50;
            if (r === 3 && prev < 3) bonus += 50;
            rec.r = Math.max(prev, r); rec.d = today();
            if (m.mode === 'jump') {
                ancestors(id).forEach(a => { if (!isLit(a)) { p.stars[a] = { r: 1, n: 0, d: today() }; jumped.push(a); } });
                bonus += 100;
            }
        }
        p.stars[id] = rec;
        const wasComplete = c.stars.every(s => before[s] === 'lit');
        const nowComplete = c.stars.every(s => isLit(s));
        if (nowComplete && !wasComplete) bonus += 200;
        const total = m.dust + bonus;
        p.dust += total;
        persist();
        state.justLit = passed ? [id].concat(jumped) : [];
        state.newlyReady = c.stars.filter(s => before[s] === 'locked' && status(s) === 'ready');

        const star = $('#result-star');
        star.textContent = passed ? (perfect ? '🌟' : '⭐') : '🌑';
        star.classList.remove('pop'); void star.offsetWidth; if (passed) star.classList.add('pop');
        $('#result-h').textContent = !passed ? 'Not lit yet' : nowComplete && !wasComplete ? 'Constellation complete!' : m.mode === 'jump' ? 'Hyperjump success!' : perfect ? 'Perfect — star lit!' : 'Star lit!';
        let msg = `${m.correct} out of ${m.items.length} correct.`;
        if (passed) {
            if (jumped.length) msg += ` You also lit ${jumped.length} star${jumped.length > 1 ? 's' : ''} it builds on.`;
            if (!perfect) msg += ' Get all 5 for ✦✦✦.';
            if (state.newlyReady.length) msg += ` New star${state.newlyReady.length > 1 ? 's' : ''} unlocked!`;
        } else msg += m.mode === 'jump' ? ' A Hyperjump needs all 5 right — or light the stars it builds on first.' : ` You need ${PASS_MARK} to light it. Read the explanations and have another go!`;
        $('#result-msg').textContent = msg;
        $('#result-dust').textContent = total ? `+${total.toLocaleString('en-GB')} stardust ✨` + (bonus ? ` (bonus ${bonus})` : '') : '';
        $('#btn-result-go').innerHTML = '<span aria-hidden="true">🌌</span> Back to ' + esc(c.name);
        $('#btn-result-retry').innerHTML = '<span aria-hidden="true">🔁</span> ' + (passed ? 'Play again' : 'Try again');
        $('#btn-result-retry').classList.toggle('hidden', m.mode === 'jump' && passed);
        show('result');
        if (passed) { sound.light(); sky.shootingStar(); } else sound.fail();
        setTimeout(() => $('#btn-result-go').focus(), 50);
    }
    function finishComet() {
        const m = state.mission, p = P();
        const best = p.comet || 0;
        const record = m.dust > best;
        if (record) p.comet = m.dust;
        p.dust += m.dust;
        persist();
        const star = $('#result-star');
        star.textContent = '☄️';
        star.classList.remove('pop'); void star.offsetWidth; star.classList.add('pop');
        $('#result-h').textContent = record && m.dust > 0 ? 'New comet record!' : 'Comet run over!';
        $('#result-msg').textContent = `${m.correct} correct in ${COMET_MS / 1000} seconds.` + (record || !best ? '' : ` Your best is ${best.toLocaleString('en-GB')} stardust.`);
        $('#result-dust').textContent = m.dust ? `+${m.dust.toLocaleString('en-GB')} stardust ✨` : '';
        $('#btn-result-go').innerHTML = '<span aria-hidden="true">🌌</span> Back to the galaxy';
        $('#btn-result-retry').innerHTML = '<span aria-hidden="true">☄️</span> Go again';
        $('#btn-result-retry').classList.remove('hidden');
        show('result');
        if (record) { sound.light(); sky.shootingStar(); } else sound.unlock();
        setTimeout(() => $('#btn-result-go').focus(), 50);
    }

    // ------------------------------------------------------------------ sheets: scores / about
    function showScores() {
        const rows = PLAYERS.map(pl => {
            const pp = P(pl.name);
            return `<tr><td>${pl.emoji} ${esc(pl.name)}</td><td>${litCount(pl.name)}</td><td>${goldCount(pl.name)}</td><td>${pp.dust.toLocaleString('en-GB')}</td><td>${(pp.comet || 0).toLocaleString('en-GB')}</td></tr>`;
        }).join('');
        openSheet(`<h2 id="sheet-h">🏆 Family scores</h2><table><tr><th>Player</th><th>⭐ Stars</th><th>✦✦✦</th><th>✨ Stardust</th><th>☄️ Best run</th></tr>${rows}</table>` +
            `<p class="note">Stars lit out of ${TOTAL_STARS}. ✦✦✦ means 5 out of 5.</p>`);
    }
    function showAbout() {
        const nQ = Object.values(BANK).reduce((s, l) => s + l.length, 0);
        const nG = Object.keys(GENS).length;
        openSheet(`<h2 id="sheet-h">For grown-ups</h2>
            <p><b>Skill Galaxy</b> turns the <a href="https://github.com/withmarbleapp/os-taxonomy" target="_blank" rel="noopener">Marble Skill Taxonomy</a> into a star map. Each of the ${TOTAL_STARS} stars is one Marble micro-topic (chosen for ages 10–12) and the lines are Marble's prerequisite links, so a star unlocks once the stars it builds on are lit.</p>
            <p>A mission is 5 questions; 4 correct lights the star, 5 earns ✦✦✦. Every answer shows a short explanation. A <b>Hyperjump</b> lets a confident child skip ahead: 5 out of 5 on a locked star lights it and everything it builds on. <b>Comet runs</b> mix 60 seconds of questions from stars already lit, for spaced review.</p>
            <p>The star descriptions and skills lists are Marble's. The questions (${nQ} written questions plus ${nG} maths generators) were written for this game and mapped to those topics — they check understanding of each topic, not every part of it, so a lit star is a good sign rather than proof of mastery.</p>
            <p>Progress is saved only in this browser (no accounts, nothing is sent anywhere).</p>
            <h3>Credits</h3>
            <p class="note">Topic names, descriptions, skills and prerequisite links: Marble Skill Taxonomy v1 by <a href="https://withmarble.com" target="_blank" rel="noopener">Marble</a>, licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>; adapted (subset selected, prerequisites reduced to each constellation). The adapted data in <code>topics.js</code> is shared under the same licence.</p>
            <div class="actions"><button class="big-btn ghost small" id="btn-reset"><span aria-hidden="true">🗑️</span> Reset ${esc(state.player)}'s progress</button></div>`);
        $('#btn-reset').addEventListener('click', () => {
            if (window.confirm(`Reset all of ${state.player}'s stars and stardust? This can't be undone.`)) {
                delete save.players[state.player]; persist(); closeSheet(); renderTitle(); toast(`${esc(state.player)}'s progress has been reset.`);
            }
        });
    }

    // ------------------------------------------------------------------ navigation
    function goBack() {
        if (closeSheet()) return;
        switch (state.screen) {
            case 'galaxy': show('title'); renderTitle(); break;
            case 'const': show('galaxy'); renderGalaxy(); break;
            case 'mission': {
                const m = state.mission;
                const left = m.mode === 'comet' ? 'Leave this comet run?' : 'Leave this mission? Your answers so far won’t count.';
                if (m.i === 0 && !m.answered && m.mode !== 'comet' || window.confirm(left)) {
                    if (m.mode === 'comet') m.over = true;
                    state.mission = null;
                    if (m.mode === 'comet' || !state.constId) { show('galaxy'); renderGalaxy(); } else { show('const'); renderTree(); }
                }
                break;
            }
            case 'result': resultGo(); break;
        }
    }
    function resultGo() {
        const m = state.mission;
        state.mission = null;
        if (!m || m.mode === 'comet') { show('galaxy'); renderGalaxy(); }
        else { state.constId = STAR_CONST[m.id].id; show('const'); renderTree(); }
    }

    // ------------------------------------------------------------------ wiring
    $('#btn-start').addEventListener('click', () => { sound.init(); sound.click(); show('galaxy'); renderGalaxy(); });
    $('#btn-scores').addEventListener('click', showScores);
    $('#btn-about').addEventListener('click', showAbout);
    $('#btn-back').addEventListener('click', goBack);
    $('#btn-comet').addEventListener('click', () => {
        if (state.screen === 'mission') return;
        startComet();
    });
    $('#btn-sound').addEventListener('click', () => { save.muted = !save.muted; persist(); updateBar(); sound.init(); sound.click(); });
    const fsOK = document.fullscreenEnabled || document.webkitFullscreenEnabled;
    if (!fsOK) $('#btn-full').classList.add('hidden');
    $('#btn-full').addEventListener('click', () => {
        const d = document;
        if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
        else { const e = d.documentElement; (e.requestFullscreen || e.webkitRequestFullscreen).call(e); }
    });
    $('#btn-next').addEventListener('click', nextQuestion);
    $('#typed').addEventListener('submit', submitTyped);
    $('#btn-result-go').addEventListener('click', resultGo);
    $('#btn-result-retry').addEventListener('click', () => {
        const m = state.mission;
        if (!m) return;
        if (m.mode === 'comet') startComet();
        else startMission(m.id, status(m.id) === 'locked' ? 'jump' : 'normal');
    });
    $('#sheet-close').addEventListener('click', closeSheet);
    $('#sheet-back').addEventListener('click', closeSheet);

    document.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        const tag = (e.target.tagName || '').toLowerCase();
        const inField = tag === 'input' || tag === 'textarea';
        if (e.key === 'Escape') { e.preventDefault(); goBack(); return; }
        if (!$('#sheet').classList.contains('hidden')) {
            // keep Tab inside the sheet
            if (e.key === 'Tab') {
                const f = [...$('#sheet').querySelectorAll('button, a[href]')];
                if (!f.length) return;
                const i = f.indexOf(document.activeElement);
                if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
                else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
            }
            return;
        }
        if (state.screen === 'title' && !inField) {
            const i = PLAYERS.findIndex(p => p.name === state.player);
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); selectPlayer(PLAYERS[(i + 1) % PLAYERS.length].name); sound.init(); sound.click(); }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); selectPlayer(PLAYERS[(i + PLAYERS.length - 1) % PLAYERS.length].name); sound.init(); sound.click(); }
            else if (/^[1-4]$/.test(e.key)) selectPlayer(PLAYERS[Number(e.key) - 1].name);
            else if (e.key === 'Enter' && tag !== 'button') $('#btn-start').click();
            return;
        }
        if (state.screen === 'mission' && state.mission && !inField) {
            const m = state.mission, it = m.items[m.i];
            if (!m.answered && it && it.opts) {
                const k = e.key.toLowerCase();
                const idx = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'abcd'.indexOf(k);
                if (idx >= 0 && idx < it.opts.length) { e.preventDefault(); chooseOption(idx); }
            } else if (m.answered && (e.key === 'Enter' || e.key === ' ') && tag !== 'button') { e.preventDefault(); nextQuestion(); }
        }
    });

    let resizeT = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => { if (state.screen === 'const') renderTree(); }, 150);
    });
    document.addEventListener('visibilitychange', () => {
        const m = state.mission;
        if (m && m.mode === 'comet') m.lastT = performance.now();
    });

    renderTitle();
    updateBar();
})();
