// Skill Galaxy — maths question generators (Number Nebula, Fraction Frontier, Shape Sector, Pattern Pulsar).
// Written for Skill Galaxy; topics from the Marble Skill Taxonomy (CC BY-SA 4.0).
// Each generator gets the SG_R helper object (R) and returns ONE fresh question:
//   multiple choice { q, a: [correct, wrong, wrong, wrong], why }  or  typed { q, ans, alt?, unit?, exact?, why }.
(function () {
    'use strict';

    // ===================== private helpers =====================
    const MINUS = '−';
    const clean = (n) => (Math.round(n * 1e9) / 1e9) || 0;            // also turns -0 into 0
    function fmt(n, dp) {                                                // 1234567 -> "1,234,567"
        n = clean(n);
        const o = dp === undefined ? { maximumFractionDigits: 9 } : { minimumFractionDigits: dp, maximumFractionDigits: dp };
        return n.toLocaleString('en-GB', o);
    }
    const num = (n, dp) => { n = clean(n); return (n < 0 ? MINUS : '') + fmt(Math.abs(n), dp); };   // display, true minus sign
    const par = (n) => (clean(n) < 0 ? '(' + num(n) + ')' : num(n));                                 // (−3) inside working
    const plain = (n) => String(clean(n));                                                           // typed answer: "-7", "0.45"
    const big = (n) => (Math.abs(n) >= 10000 ? fmt(n) : plain(n));                                   // typed answer with commas
    const money = (n) => (clean(n) < 0 ? MINUS : '') + '£' + fmt(Math.abs(n), Number.isInteger(clean(n)) ? 0 : 2);
    const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
    const lcm = (a, b) => a / gcd(a, b) * b;
    const F = (n, d) => '[[' + n + '/' + d + ']]';
    const MX = (w, n, d) => '[[' + w + ' ' + n + '/' + d + ']]';
    const simp = (n, d) => { const g = gcd(n, d) || 1; return [n / g, d / g]; };
    // simplest-form display: whole number, fraction, or (mixed = true) mixed number
    function fshow(n, d, mixed) {
        [n, d] = simp(n, d);
        if (d === 1) return String(n);
        if (mixed && n > d) return MX(Math.floor(n / d), n % d, d);
        return F(n, d);
    }
    const fplain = (n, d) => { [n, d] = simp(n, d); return d === 1 ? String(n) : n + '/' + d; };
    const mplain = (n, d) => { [n, d] = simp(n, d); return d === 1 ? String(n) : n > d ? Math.floor(n / d) + ' ' + (n % d) + '/' + d : n + '/' + d; };
    const eqv = (a, b, c, d) => a * d === b * c;
    function properFrac(R, dMin, dMax) { let n, d; do { d = R.int(dMin, dMax); n = R.int(1, d - 1); } while (gcd(n, d) !== 1); return [n, d]; }
    const listAnd = (arr) => (arr.length < 2 ? arr.join('') : arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1]);
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
    const factorsOf = (n) => { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
    const primeFactors = (n) => { const f = []; for (let p = 2; n > 1; p++) while (n % p === 0) { f.push(p); n /= p; } return f; };
    const SUP = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', 10: '¹⁰' };
    // decimal answer forms when the form matters (exact): "0.4" -> [".4", "0.40", ".40"]
    function decAlts(s) {
        const out = [];
        const add = (x) => { if (x !== s && !out.includes(x)) out.push(x); };
        const one = /\.\d$/.test(s);
        if (/^0\./.test(s)) add(s.slice(1));
        if (one) { add(s + '0'); if (/^0\./.test(s)) add(s.slice(1) + '0'); }
        return out;
    }

    // Numeric value of an option string ("[[3/4]]", "[[2 1/3]]", "−£7", "1,250", "45%", "40 cm²"), or NaN
    function valOf(s) {
        s = String(s).replace(/−/g, '-').replace(/£/g, '').replace(/(\d),(?=\d{3}\b)/g, '$1').trim();
        s = s.replace(/\s*(cm²|m²|cm³|m³|mm|cm|km|kg|ml|°C|°|degrees|m|g|l)$/, '');
        let m = s.match(/^\[\[(-?\d+) (\d+)\/(\d+)\]\]$/);
        if (m) return (m[1].startsWith('-') ? -1 : 1) * (Math.abs(+m[1]) + m[2] / m[3]);
        m = s.match(/^\[\[(-?\d+)\/(\d+)\]\]$/);
        if (m) return m[1] / m[2];
        m = s.match(/^(-?\d+(?:\.\d+)?)(%?)$/);
        if (m) return m[2] ? m[1] / 100 : +m[1];
        return NaN;
    }
    // R.options, but wrong answers (and filler) that are EQUAL IN VALUE to the answer or to
    // each other are dropped (e.g. [[2/4]] when the answer is [[1/2]]).
    function mc(R, correct, wrong, filler) {
        const vals = [valOf(correct)];
        const fresh = (w) => {
            if (w === undefined || w === null || w === '') return false;
            const v = valOf(w);
            if (Number.isNaN(v)) return true;
            if (vals.some(x => !Number.isNaN(x) && Math.abs(x - v) < 1e-9)) return false;
            vals.push(v);
            return true;
        };
        const seen = new Set([String(correct)]);
        const w2 = [];
        (wrong || []).forEach(w => { const s = String(w); if (!seen.has(s) && fresh(s)) { seen.add(s); w2.push(s); } });
        const fill = filler ? () => { const w = filler(); const s = w === undefined || w === null ? '' : String(w); return (!seen.has(s) && fresh(s)) ? (seen.add(s), s) : ''; } : null;
        return R.options(String(correct), w2, fill);
    }
    // numeric filler: v ± up to spread, never below min, shown with show()
    const near = (R, v, spread, min, show) => () => { const x = v + R.int(-spread, spread); return (x === v || x < min) ? '' : (show || fmt)(x); };

    // ---- number words (UK style: "three million, forty thousand, five hundred and six")
    const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const w99 = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : ''));
    const w999 = (n) => { const h = Math.floor(n / 100), r = n % 100; return h ? ONES[h] + ' hundred' + (r ? ' and ' + w99(r) : '') : w99(r); };
    function words(n) {
        if (n === 0) return 'zero';
        const m = Math.floor(n / 1e6), t = Math.floor(n / 1000) % 1000, u = n % 1000, parts = [];
        if (m) parts.push(w999(m) + ' million');
        if (t) parts.push(w999(t) + ' thousand');
        let s = parts.join(', ');
        if (u) s += parts.length ? (u < 100 ? ' and ' : ', ') + w999(u) : w999(u);
        return s;
    }

    // ---- Roman numerals
    const ROM = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    const roman = (n) => { let s = ''; for (const [v, r] of ROM) while (n >= v) { s += r; n -= v; } return s; };
    const romanAdditive = (n) => { let s = ''; for (const [v, r] of ROM) if (r.length === 1) while (n >= v) { s += r; n -= v; } return s; };
    const RVAL = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    const romanAddAll = (s) => s.split('').reduce((t, c) => t + RVAL[c], 0);
    function romanSplit(n, numberFirst) {   // "MM = 2000, XX = 20, IV = 4"
        const vals = [Math.floor(n / 1000) * 1000, Math.floor(n / 100) % 10 * 100, Math.floor(n / 10) % 10 * 10, n % 10].filter(v => v);
        return vals.map(v => numberFirst ? v + ' = ' + roman(v) : roman(v) + ' = ' + v).join(', ');
    }

    // ---- "nice" fractions with exact percentages (denominators 2, 4, 5, 10, 20, 25, 50)
    const NICE = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [1, 20], [3, 20], [7, 20], [9, 20], [11, 20], [13, 20], [17, 20], [19, 20], [1, 25], [2, 25], [3, 25], [4, 25], [6, 25], [7, 25], [8, 25], [9, 25], [11, 25], [12, 25], [1, 50], [3, 50], [7, 50], [9, 50], [11, 50]];
    // count different values (in %) shown as fractions, decimals or percentages
    function mixedForms(R, count) {
        const out = [], used = new Set();
        for (const [n, d] of R.sample(NICE, 8)) {
            const p = n * 100 / d;
            if (out.length < 2 && !used.has(p)) { used.add(p); out.push({ p, disp: F(n, d), kind: 'f' }); }
        }
        let g = 0;
        while (out.length < count && g++ < 200) {
            const p = R.pick(out).p + R.int(-9, 9);
            if (p < 2 || p > 98 || used.has(p)) continue;
            used.add(p);
            out.push(R.chance(0.5) ? { p, disp: String(p / 100), kind: 'd' } : { p, disp: p + '%', kind: 'p' });
        }
        return R.shuffle(out);
    }

    // ---- fractions sharing a common denominator L (for comparing / ordering)
    function fracSet(R, count, improper, distinctDen) {
        for (let attempt = 0; attempt < 50; attempt++) {
            const L = R.pick([12, 18, 20, 24, 30, 36]);
            const dens = factorsOf(L).filter(x => x >= 2 && x <= 12);
            const out = [], vs = new Set(), ds = new Set();
            for (let g = 0; g < 300 && out.length < count; g++) {
                const d = R.pick(dens);
                if (distinctDen && ds.has(d)) continue;
                const n = R.int(1, improper ? 2 * d - 1 : d - 1);
                if (gcd(n, d) !== 1) continue;
                const v = n * L / d;
                if (vs.has(v)) continue;
                vs.add(v); ds.add(d);
                out.push({ n, d, v, disp: n > d && R.chance(0.5) ? MX(Math.floor(n / d), n % d, d) : F(n, d) });
            }
            if (out.length === count) return { L, items: out };
        }
        return null;
    }

    const NAMES = ['Amy', 'Ben', 'Chloe', 'Dev', 'Ella', 'Finn', 'Grace', 'Harry', 'Isla', 'Jack', 'Maya', 'Omar', 'Priya', 'Sam', 'Zara', 'Leo'];

    SG_GEN({
        // ===================================================================
        // NUMBER NEBULA
        // ===================================================================

        // Numbers to Ten Million
        "mt_XNmGwNggdU": function (R) {
            const t = R.int(1, 4);
            const COL = ['millions', 'hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones'];
            if (t === 1) {
                // digits all different, so the digit appears exactly once
                const digs = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 7);
                const n = Number(digs.join('')), pos = R.int(0, 5), d = digs[pos], pv = Math.pow(10, 6 - pos);
                return {
                    q: 'What is the value of the digit **' + d + '** in **' + fmt(n) + '**?',
                    a: mc(R, fmt(d * pv), [fmt(d * pv * 10), fmt(d * pv / 10), fmt(d)], () => fmt(d * Math.pow(10, R.int(0, 7)))),
                    why: 'The ' + d + ' is in the ' + COL[pos] + ' column, so it is worth ' + d + ' × ' + fmt(pv) + ' = ' + fmt(d * pv) + '.'
                };
            }
            if (t === 2) {
                const digs = [R.int(1, 9)];
                for (let i = 0; i < 6; i++) digs.push(R.int(1, 9));
                R.sample([1, 2, 3, 4, 5, 6], R.int(2, 3)).forEach(i => { digs[i] = 0; });
                const n = Number(digs.join(''));
                const m = Math.floor(n / 1e6), th = Math.floor(n / 1000) % 1000, u = n % 1000;
                const p3 = (x) => String(x).padStart(3, '0');
                return {
                    q: 'Write **' + words(n) + '** in figures.',
                    ans: fmt(n),
                    why: 'Fill each group of three places: ' + m + ' million, ' + p3(th) + ' thousand, ' + p3(u) + ' ones. So it is ' + fmt(n) + ' — the zeros hold the empty places.'
                };
            }
            if (t === 3) {
                if (R.chance(0.35)) {
                    const v = [];
                    while (v.length < 3) { const x = R.int(120000, 980000); if (x % 100000 !== 50000) v.push(x); }
                    const r = v.map(x => Math.round(x / 100000) * 100000), tot = r[0] + r[1] + r[2];
                    return {
                        q: 'Three festivals sold ' + fmt(v[0]) + ', ' + fmt(v[1]) + ' and ' + fmt(v[2]) + ' tickets. Round each number to the nearest 100,000 to estimate the total.',
                        ans: fmt(tot),
                        why: fmt(v[0]) + ' ≈ ' + fmt(r[0]) + ', ' + fmt(v[1]) + ' ≈ ' + fmt(r[1]) + ' and ' + fmt(v[2]) + ' ≈ ' + fmt(r[2]) + '. Total ≈ ' + fmt(r[0]) + ' + ' + fmt(r[1]) + ' + ' + fmt(r[2]) + ' = ' + fmt(tot) + '.'
                    };
                }
                const p = R.pick([1000000, 100000, 10000, 1000]);
                let n; do { n = R.int(1000000, 9999999); } while (n % p === 0);
                const r = Math.round(n / p) * p, look = Math.floor(n / (p / 10)) % 10;
                const NEAR = { 1000000: 'million', 100000: '100,000', 10000: '10,000', 1000: '1,000' };
                const LOOK = { 100000: 'hundred thousands', 10000: 'ten thousands', 1000: 'thousands', 100: 'hundreds' };
                const ctx = R.pick([
                    'The population of a country is ' + fmt(n) + '.',
                    'A football club sold ' + fmt(n) + ' tickets in one season.',
                    'A video has been watched ' + fmt(n) + ' times.',
                    'A forest has ' + fmt(n) + ' trees.'
                ]);
                return {
                    q: ctx + ' Round this number to the nearest ' + NEAR[p] + '.',
                    ans: fmt(r),
                    why: 'For the nearest ' + NEAR[p] + ', look at the ' + LOOK[p / 10] + ' digit: ' + look + '. ' + (look >= 5 ? 'It is 5 or more, so round up' : 'It is less than 5, so round down') + ': ' + fmt(n) + ' → ' + fmt(r) + '.'
                };
            }
            if (R.chance(0.6)) {
                const digs = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 7);
                const nums = [Number(digs.join(''))];
                for (let g = 0; nums.length < 4 && g < 200; g++) {
                    const c = digs.slice();
                    const i = R.int(0, 5); [c[i], c[i + 1]] = [c[i + 1], c[i]];
                    if (R.chance(0.5)) { const j = R.int(0, 5); [c[j], c[j + 1]] = [c[j + 1], c[j]]; }
                    const v = Number(c.join(''));
                    if (!nums.includes(v)) nums.push(v);
                }
                const most = R.chance(0.5), sorted = nums.slice().sort((x, y) => x - y);
                const correct = most ? sorted[sorted.length - 1] : sorted[0];
                return {
                    q: 'Which of these numbers is the **' + (most ? 'greatest' : 'smallest') + '**?',
                    a: mc(R, fmt(correct), nums.filter(x => x !== correct).map(x => fmt(x)), null),
                    why: 'Compare the digits from the left, starting with the millions; the first column where they differ decides. In order: ' + sorted.map(x => fmt(x)).join(' < ') + '.'
                };
            }
            const vals = [];
            while (vals.length < 4) { const x = -R.int(1000, 11000); if (!vals.includes(x)) vals.push(x); }
            const deep = R.chance(0.6), sorted = vals.slice().sort((x, y) => x - y);
            const correct = deep ? sorted[0] : sorted[3];
            return {
                q: 'These are depths in metres (negative numbers are below sea level). Which is the **' + (deep ? 'deepest' : 'closest to the surface') + '**?',
                a: mc(R, num(correct) + ' m', vals.filter(x => x !== correct).map(x => num(x) + ' m'), null),
                why: 'Sea level is 0 m. The further a negative number is below 0, the deeper it is. From deepest to shallowest: ' + sorted.map(x => num(x)).join(', ') + '.'
            };
        },

        // Rounding whole numbers and decimals
        "mt__casygEB85": function (R) {
            const t = R.int(1, 4);
            if (t === 1) {
                // decimal as a scaled integer, rounded with integer arithmetic
                const k = R.int(2, 4), d = R.int(0, k - 1);
                const scale = Math.pow(10, k), fac = Math.pow(10, k - d);
                let N; do { N = R.int(scale + 1, 99 * scale); } while (N % fac === 0);
                const look = Math.floor((N % fac) / (fac / 10));
                const res = Math.floor(N / fac) + (look >= 5 ? 1 : 0);
                const nStr = (N / scale).toFixed(k), rStr = (res / Math.pow(10, d)).toFixed(d);
                const to = d === 0 ? 'the nearest whole number' : d + ' decimal place' + (d > 1 ? 's' : '');
                const DIG = ['tenths', 'hundredths', 'thousandths', 'ten-thousandths'];
                return {
                    q: 'Round **' + nStr + '** to ' + to + '.',
                    ans: rStr,
                    why: 'To round to ' + to + ', look at the ' + DIG[d] + ' digit: ' + look + '. ' + (look >= 5 ? 'It is 5 or more, so round up' : 'It is less than 5, so round down') + ': ' + nStr + ' → ' + rStr + '.'
                };
            }
            if (t === 2 || t === 3) {
                const p = R.pick([10, 100, 1000, 10000, 100000]);
                const NEAR = { 10: '10', 100: '100', 1000: '1,000', 10000: '10,000', 100000: '100,000' };
                const LOOK = { 1: 'ones', 10: 'tens', 100: 'hundreds', 1000: 'thousands', 10000: 'ten thousands' };
                const len = Math.min(7, Math.round(Math.log10(p)) + R.int(2, 3));
                let n; do { n = R.int(Math.pow(10, len - 1), Math.pow(10, len) - 1); } while (n % p === 0);
                const r = Math.round(n / p) * p, look = Math.floor(n / (p / 10)) % 10;
                const q = 'Round **' + fmt(n) + '** to the nearest ' + NEAR[p] + '.';
                const why = 'For the nearest ' + NEAR[p] + ', look at the ' + LOOK[p / 10] + ' digit: ' + look + '. ' + (look >= 5 ? 'It is 5 or more, so round up' : 'It is less than 5, so round down') + ': ' + fmt(n) + ' → ' + fmt(r) + '.';
                if (t === 2) return { q, ans: big(r), why };
                const wrong = [Math.round(n / (p * 10)) * p * 10, Math.floor(n / p) * p, Math.ceil(n / p) * p, Math.round(n / (p / 10)) * (p / 10)];
                return { q, a: mc(R, fmt(r), wrong.map(x => fmt(x)), () => fmt(r + p * R.int(-3, 3))), why };
            }
            const mk = () => { let f; do { f = R.int(1, 99); } while (f % 10 === 0 || f === 50); return f; };
            const a = R.int(2, 9), b = R.int(2, 9), fa = mk(), fb = mk();
            const xs = a + '.' + String(fa).padStart(2, '0'), ys = b + '.' + String(fb).padStart(2, '0');
            const rx = fa >= 50 ? a + 1 : a, ry = fb >= 50 ? b + 1 : b;
            return {
                q: 'Estimate **' + xs + ' × ' + ys + '** by first rounding each number to the nearest whole number.',
                ans: String(rx * ry),
                why: xs + ' rounds to ' + rx + ' and ' + ys + ' rounds to ' + ry + ', so ' + xs + ' × ' + ys + ' ≈ ' + rx + ' × ' + ry + ' = ' + (rx * ry) + '.'
            };
        },

        // Negative numbers in context
        "mt_1KkvzwYxbR": function (R) {
            const t = R.int(1, 4);
            if (t === 1) {
                const place = R.pick(['in Edinburgh', 'in the Arctic', 'on a mountain top', 'in Aberdeen', 'in the back garden', 'at a ski resort']);
                let up, s, c, e;
                do { up = R.chance(0.5); s = up ? -R.int(1, 12) : R.int(-6, 8); c = R.int(3, 12); e = up ? s + c : s - c; } while (s === 0 || (!up && e >= 0));
                let why;
                if (up && e > 0) why = 'Start at ' + num(s) + ' and count up ' + c + ': ' + (-s) + ' up to 0, then ' + e + ' more. So it is ' + num(e) + '°C.';
                else if (!up && s > 0) why = 'Start at ' + s + ' and count down ' + c + ': ' + s + ' down to 0, then ' + (-e) + ' more. So it is ' + num(e) + '°C.';
                else if (up) why = num(s) + ' + ' + c + ' = ' + num(e) + '. Rising moves you up the number line, towards 0. So it is ' + num(e) + '°C.';
                else why = num(s) + ' − ' + c + ' = ' + num(e) + '. Falling from below zero makes it even colder. So it is ' + num(e) + '°C.';
                return { q: 'The temperature ' + place + ' is ' + num(s) + '°C. It ' + (up ? 'rises' : 'falls') + ' by ' + c + ' degrees. What is the temperature now?', ans: plain(e), unit: '°C', why };
            }
            if (t === 2) {
                const lo = -R.int(3, 12);
                const hi = R.chance(0.7) ? R.int(1, 12) : -R.int(1, -lo - 2);
                const d = hi - lo;   // always 2 or more
                const deg = (x) => num(x) + (Math.abs(x) === 1 ? ' degree' : ' degrees');
                const tm = R.pick([['6 am', 'midday'], ['midnight', '10 am'], ['5 am', '2 pm'], ['dawn', 'lunchtime']]);
                const q = 'At ' + tm[0] + ' the temperature was ' + num(lo) + '°C. By ' + tm[1] + ' it was ' + num(hi) + '°C. By how many degrees did it rise?';
                const why = hi > 0
                    ? 'From ' + num(lo) + ' up to 0 is ' + (-lo) + ' degrees, then from 0 up to ' + hi + ' is ' + hi + ' more: ' + (-lo) + ' + ' + hi + ' = ' + d + ' degrees.'
                    : 'Count up from ' + num(lo) + ' to ' + num(hi) + ': ' + num(hi) + ' − (' + num(lo) + ') = ' + num(hi) + ' + ' + (-lo) + ' = ' + d + ' degrees.';
                if (R.chance(0.5)) return { q, ans: String(d), unit: 'degrees', why };
                const wrong = hi > 0 ? [Math.abs(hi + lo), -d] : [Math.abs(hi) + Math.abs(lo), -d];
                return { q, a: mc(R, deg(d), wrong.map(deg), near(R, d, 4, 1, deg)), why };
            }
            if (t === 3) {
                const kind = R.int(1, 3);
                if (kind === 1) {
                    const b = R.int(5, 40), s = b + R.int(3, 30), o = s - b;
                    return {
                        q: 'A bank account has £' + b + ' in it. A bill of £' + s + ' is paid from it. What is the balance now?',
                        a: mc(R, money(-o), [money(o), money(-(b + s)), money(b + s)], null),
                        why: '£' + b + ' − £' + s + ': the first £' + b + ' takes the balance down to £0, then £' + o + ' more takes it to ' + money(-o) + '. The account is overdrawn by £' + o + '.'
                    };
                }
                if (kind === 2) {
                    const dep = R.int(8, 40), up = R.chance(0.5), m = up ? R.int(3, dep - 2) : R.int(3, 20);
                    const e = up ? -dep + m : -dep - m;
                    return {
                        q: 'A diver is at ' + num(-dep) + ' m (' + dep + ' m below sea level). She swims ' + (up ? 'up' : 'down') + ' ' + m + ' m. What is her position now?',
                        ans: plain(e), unit: 'm',
                        why: num(-dep) + (up ? ' + ' : ' − ') + m + ' = ' + num(e) + ', so she is now ' + (-e) + ' m below sea level.'
                    };
                }
                let s = R.int(-3, 6), m, down;
                if (s > 0) { down = true; m = s + R.int(1, 4); } else { down = false; m = R.int(2, 7); }
                const e = down ? s - m : s + m, steps = [];
                for (let i = 1; i <= m; i++) steps.push(num(down ? s - i : s + i));
                return {
                    q: 'In a building the ground floor is floor 0 and the floors below ground have negative numbers. A lift is on floor ' + num(s) + '. It goes ' + (down ? 'down' : 'up') + ' ' + m + ' floors. Which floor is it on now?',
                    ans: plain(e),
                    why: 'Count ' + (down ? 'down' : 'up') + ' ' + m + ' from ' + num(s) + ': ' + steps.join(', ') + '. The lift is on floor ' + num(e) + '.'
                };
            }
            const abs = R.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
            let vals;
            do { vals = abs.map(a => (a === 0 ? 0 : (R.chance(0.5) ? -a : a))); } while (vals.filter(v => v < 0).length < 2 || vals.filter(v => v > 0).length < 1);
            const show = (arr) => arr.map(v => num(v)).join(', ');
            const sorted = vals.slice().sort((x, y) => x - y);
            const negs = sorted.filter(v => v < 0), rest = sorted.filter(v => v >= 0);
            const wrong = [
                show(vals.slice().sort((x, y) => Math.abs(x) - Math.abs(y))),
                show(negs.slice().reverse().concat(rest)),
                show(sorted.slice().reverse())
            ];
            return {
                q: 'Which list puts these temperatures in order from coldest to warmest? ' + vals.map(v => num(v) + '°C').join(', '),
                a: mc(R, show(sorted), wrong, () => show(R.shuffle(vals))),
                why: 'The coldest is the most negative. Reading the number line from left to right: ' + show(sorted) + '. ' + num(negs[0]) + ' is colder than ' + num(negs[1]) + ' because it is further below 0.'
            };
        },

        // Roman numerals to 1000
        "mt_To9HdLy8vq": function (R) {
            const t = R.int(1, 4);
            const hasSub = (n) => roman(n) !== romanAdditive(n);
            const pickN = (needSub) => { let n; do { n = R.chance(0.3) ? R.int(1900, 2030) : R.int(1, 1000); } while (needSub && !hasSub(n)); return n; };
            const RULE = 'A smaller numeral in front of a bigger one is taken away; only IV, IX, XL, XC, CD and CM are used.';
            if (t === 1) {
                const n = pickN(false), r = roman(n);
                return {
                    q: n >= 1900 ? 'A film ends with the year **' + r + '**. What year is that?' : 'What number is **' + r + '** in Roman numerals?',
                    ans: String(n),
                    why: 'Split it into place values: ' + romanSplit(n) + '. So ' + r + ' = ' + n + '.'
                };
            }
            if (t === 2) {
                const n = pickN(false), r = roman(n);
                return {
                    q: 'Write **' + n + '** in Roman numerals.',
                    ans: r, exact: true,
                    why: 'Split ' + n + ' into place values: ' + romanSplit(n, true) + '. Together: ' + r + '.'
                };
            }
            if (t === 3) {
                const n = pickN(true), r = roman(n);
                const wrong = [romanAdditive(n)];
                const m = r.match(/CM|CD|XC|XL|IX|IV/);
                if (m) wrong.push(r.slice(0, m.index) + m[0][1] + m[0][0] + r.slice(m.index + 2));
                const BAD = { 49: 'IL', 99: 'IC', 45: 'VL', 95: 'VC', 999: 'IM', 990: 'XM', 490: 'XD' };
                if (BAD[n % 1000]) wrong.unshift(roman(n - n % 1000) + BAD[n % 1000]);
                else if (BAD[n % 100]) wrong.unshift(roman(n - n % 100) + BAD[n % 100]);
                return {
                    q: 'Which is the correct way to write **' + n + '** in Roman numerals?',
                    a: mc(R, r, wrong, () => { const x = n + R.pick([-10, -1, 1, 10]); return x > 0 && x !== n ? roman(x) : ''; }),
                    why: romanSplit(n, true) + ', so ' + n + ' = ' + r + '. ' + RULE
                };
            }
            const n = pickN(true), r = roman(n), m = r.match(/CM|CD|XC|XL|IX|IV/);
            const PV = { CM: 900, CD: 400, XC: 90, XL: 40, IX: 9, IV: 4 };
            const PA = { CM: 1100, CD: 600, XC: 110, XL: 60, IX: 11, IV: 6 };
            return {
                q: 'What number is **' + r + '**?',
                a: mc(R, String(n), [String(romanAddAll(r)), String(n - PV[m[0]] + PA[m[0]])], () => { const x = n + R.pick([-100, -10, -1, 1, 10, 100]); return x > 0 ? String(x) : ''; }),
                why: romanSplit(n) + ', so ' + r + ' = ' + n + '. ' + m[0] + ' means ' + PV[m[0]] + ' (a smaller numeral before a bigger one is taken away), not ' + PA[m[0]] + '.'
            };
        },

        // Factors, multiples, and primes
        "mt_FHIAv6dfhU": function (R) {
            const t = R.int(1, 4);
            if (t === 1) {
                let a, b; do { a = R.int(12, 100); b = R.int(12, 100); } while (a === b || gcd(a, b) < 3);
                if (a > b) [a, b] = [b, a];
                const fa = factorsOf(a), fb = factorsOf(b), com = fa.filter(x => b % x === 0), h = com[com.length - 1];
                const lists = 'Factors of ' + a + ': ' + fa.join(', ') + '. Factors of ' + b + ': ' + fb.join(', ') + '. ';
                if (R.chance(0.6)) return { q: 'What is the highest common factor of **' + a + '** and **' + b + '**?', ans: String(h), why: lists + 'The biggest number in both lists is ' + h + '.' };
                return { q: 'How many common factors do **' + a + '** and **' + b + '** have?', ans: String(com.length), why: lists + 'The common factors are ' + listAnd(com) + ', so there are ' + com.length + '.' };
            }
            if (t === 2) {
                let a, b; do { a = R.int(3, 12); b = R.int(3, 12); } while (a === b || a % b === 0 || b % a === 0 || lcm(a, b) > 60);
                const L = lcm(a, b);
                const mults = (x) => { const k = L / x, arr = []; for (let i = 1; i <= k; i++) arr.push(x * i); return k <= 8 ? arr.join(', ') : arr.slice(0, 4).join(', ') + ', … ' + L; };
                const why = 'Multiples of ' + a + ': ' + mults(a) + '. Multiples of ' + b + ': ' + mults(b) + '. The first number in both lists is ' + L + '.';
                if (R.chance(0.5)) return { q: 'What is the lowest common multiple of **' + a + '** and **' + b + '**?', ans: String(L), why };
                return {
                    q: 'A red light flashes every ' + a + ' seconds and a green light flashes every ' + b + ' seconds. They flash together now. After how many seconds will they next flash together?',
                    ans: String(L), unit: 'seconds',
                    why: 'You need the lowest common multiple. ' + why
                };
            }
            if (t === 3) {
                const n = R.pick([12, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 72, 80, 84, 90, 96, 100]);
                const pairs = [];
                for (let i = 1; i * i <= n; i++) if (n % i === 0) pairs.push([i, n / i]);
                const [x, y] = R.pick(pairs.filter(p => p[0] > 1));
                const cands = [[x, y + 1], [x + 1, y], [x, y - 1], [x - 1, y + 2], [x + 2, y - 1]].filter(([p, q]) => p > 0 && q > 0 && p * q !== n);
                return {
                    q: 'Which of these is a factor pair of **' + n + '**?',
                    a: mc(R, x + ' and ' + y, R.shuffle(cands).map(([p, q]) => Math.min(p, q) + ' and ' + Math.max(p, q)), () => { const p = R.int(2, 12), q = R.int(2, 20); return p * q === n ? '' : Math.min(p, q) + ' and ' + Math.max(p, q); }),
                    why: x + ' × ' + y + ' = ' + n + '. All the factor pairs of ' + n + ' are ' + pairs.map(p => p[0] + ' × ' + p[1]).join(', ') + '.'
                };
            }
            if (R.chance(0.5)) {
                let a, b; do { a = R.int(3, 12); b = R.int(3, 12); } while (a === b || a % b === 0 || b % a === 0 || lcm(a, b) > 48);
                const L = lcm(a, b), c = L * R.int(1, 2);
                const cands = [];
                for (let x = Math.min(a, b); x <= 2 * L + 12; x++) if ((x % a === 0) !== (x % b === 0)) cands.push(x);
                const wr = R.sample(cands, 3);
                return {
                    q: 'Which of these is a common multiple of **' + a + '** and **' + b + '**?',
                    a: mc(R, String(c), wr.map(String), null),
                    why: c + ' = ' + a + ' × ' + (c / a) + ' and ' + c + ' = ' + b + ' × ' + (c / b) + ', so it is in both times tables. ' + wr[0] + ' is only a multiple of ' + (wr[0] % a === 0 ? a : b) + '.'
                };
            }
            let a, b, com;
            do { a = R.int(12, 100); b = R.int(12, 100); com = factorsOf(a).filter(x => x > 1 && b % x === 0); } while (a === b || com.length < 2);
            const c = R.pick(com);
            const one = factorsOf(a).concat(factorsOf(b)).filter(x => x > 1 && ((a % x === 0) !== (b % x === 0)));
            const wr = R.sample(one, 2).concat([5, 7, 9, 11, 13].filter(x => a % x !== 0 || b % x !== 0).slice(0, 1));
            return {
                q: 'Which of these is a factor of both **' + a + '** and **' + b + '**?',
                a: mc(R, String(c), wr.map(String), () => { const x = R.int(2, 30); return (a % x === 0 && b % x === 0) ? '' : String(x); }),
                why: c + ' divides into both: ' + a + ' ÷ ' + c + ' = ' + (a / c) + ' and ' + b + ' ÷ ' + c + ' = ' + (b / c) + '. The common factors of ' + a + ' and ' + b + ' are ' + listAnd(factorsOf(a).filter(x => b % x === 0)) + '.'
            };
        },

        // Prime numbers
        "mt_y1XCVsIelg": function (R) {
            const t = R.int(1, 5);
            const PR = []; for (let i = 2; i < 100; i++) if (isPrime(i)) PR.push(i);
            const LOOK = [21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99];
            const why1 = (n) => n === 1 ? '1 has only one factor, so it is not prime' : (() => { for (let p = 2; p < n; p++) if (n % p === 0) return n + ' = ' + p + ' × ' + (n / p); return ''; })();
            if (t === 1) {
                const p = R.pick(PR.filter(x => x > 10)), wr = R.sample(LOOK, 3);
                if (R.chance(0.2)) wr[2] = 1;
                return {
                    q: 'Which of these numbers is **prime**?',
                    a: mc(R, String(p), wr.map(String), null),
                    why: p + ' has exactly two factors, 1 and ' + p + ', so it is prime. The others are not: ' + wr.map(why1).join('; ') + '.'
                };
            }
            if (t === 2) {
                const c = R.chance(0.15) ? 1 : R.pick(LOOK), wr = R.sample(PR.filter(x => x > 10), 3);
                return {
                    q: 'Which of these numbers is **not** prime?',
                    a: mc(R, String(c), wr.map(String), null),
                    why: (c === 1 ? '1 has only one factor (1 itself), so it is not prime' : why1(c) + ', so it has more than two factors and is not prime') + '. ' + listAnd(wr.slice().sort((x, y) => x - y).map(String)) + ' each have exactly two factors.'
                };
            }
            if (t === 3) {
                if (R.chance(0.5)) {
                    const n = R.int(10, 88);
                    let p = n + 1; while (!isPrime(p)) p++;
                    const checks = []; for (let x = n + 1; x < p; x++) checks.push(why1(x));
                    return {
                        q: 'What is the next prime number after **' + n + '**?',
                        ans: String(p),
                        why: (checks.length ? checks.join(', ') + ' — so ' + (checks.length > 1 ? 'these are' : 'this is') + ' not prime. ' : '') + p + ' has only two factors (1 and ' + p + '), so it is the next prime.'
                    };
                }
                const ok = (x) => x === 1 || !isPrime(x);
                let a, b; do { a = R.int(1, 60); b = a + R.int(10, 25); } while (!ok(a) || !ok(b) || b > 100);
                const ps = PR.filter(x => x > a && x < b);
                return {
                    q: 'How many prime numbers are there between **' + a + '** and **' + b + '**?',
                    ans: String(ps.length),
                    why: 'The prime numbers between ' + a + ' and ' + b + ' are ' + listAnd(ps.map(String)) + ', so there ' + (ps.length === 1 ? 'is 1' : 'are ' + ps.length) + '.'
                };
            }
            if (t === 4) {
                const n = R.pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 44, 45, 48, 50, 52, 54, 56, 60, 63, 66, 70, 72, 75, 78, 80, 84, 88, 90, 98, 100]);
                const pf = primeFactors(n), show = (arr) => arr.slice().sort((x, y) => x - y).join(' × ');
                const merged = [pf[0] * pf[1]].concat(pf.slice(2));
                const wrong = [show(merged), pf[0] + ' × ' + (n / pf[0]), show(pf.slice(1)), show(pf.concat([pf[0]]))];
                const chain = []; let rest = n; const done = [];
                for (let i = 0; i < pf.length - 1; i++) { done.push(pf[i]); rest /= pf[i]; chain.push(done.join(' × ') + ' × ' + rest); }
                return {
                    q: 'Which shows **' + n + '** written as a product of prime factors?',
                    a: mc(R, show(pf), wrong, null),
                    why: 'Keep splitting until every factor is prime: ' + n + ' = ' + chain.join(' = ') + '.'
                };
            }
            const POOL = [
                { q: 'How many factors does a prime number have?', a: ['Exactly 2', 'Exactly 1', 'Exactly 3', 'More than 2'], why: 'A prime number has exactly two factors: 1 and itself. For example, 13 = 1 × 13 and nothing else.' },
                { q: 'Which is the only **even** prime number?', a: ['2', '4', '10', '0'], why: 'Every other even number can be divided by 2 as well as 1 and itself, so it has more than two factors. 2 has just 1 and 2.' },
                { q: 'What do we call a whole number that has more than two factors?', a: ['A composite number', 'A prime number', 'A square number', 'A prime factor'], why: 'Composite numbers have more than two factors, e.g. 12 = 1 × 12 = 2 × 6 = 3 × 4. Prime numbers have exactly two.' },
                { q: 'Why is 1 **not** a prime number?', a: ['It has only one factor', 'It is an odd number', 'It has too many factors', 'It is not a whole number'], why: 'A prime number needs exactly two different factors. 1 has only one factor (1), so it is neither prime nor composite.' },
                { q: 'Which list shows **all** the prime numbers less than 20?', a: ['2, 3, 5, 7, 11, 13, 17, 19', '1, 2, 3, 5, 7, 11, 13, 17, 19', '3, 5, 7, 9, 11, 13, 15, 17, 19', '2, 3, 5, 7, 11, 13, 17'], why: 'The primes below 20 are 2, 3, 5, 7, 11, 13, 17 and 19. 1 is not prime, 9 = 3 × 3 and 15 = 3 × 5.' },
                { q: 'Which number is a **prime factor** of 30?', a: ['5', '6', '10', '15'], why: '30 = 2 × 3 × 5, so its prime factors are 2, 3 and 5. 6, 10 and 15 are factors of 30, but they are not prime.' },
                { q: 'Which statement about the number 2 is true?', a: ['It is prime and even', 'It is prime and odd', 'It is composite and even', 'It is not prime'], why: '2 has exactly two factors (1 and 2), so it is prime, and it is even. It is the only even prime.' },
                { q: 'To check if 91 is prime, which is the best thing to try?', a: ['Divide it by small primes like 2, 3, 5 and 7', 'See if it ends in 1', 'See if it is odd', 'Add up its digits only'], why: 'Test small primes: 91 ÷ 7 = 13, so 91 = 7 × 13 and it is not prime. Being odd or ending in 1 does not make a number prime.' }
            ];
            const it = R.pick(POOL);
            return { q: it.q, a: it.a.slice(), why: it.why };
        },

        // Square and cube numbers
        "mt_hCVPYlF-7Y": function (R) {
            const t = R.int(1, 4);
            if (t === 1) {
                const kind = R.pick(['sq', 'sq', 'cube', 'p2', 'p3', 'p45']);
                let b, e;
                if (kind === 'sq') { b = R.int(3, 15); e = 2; }
                else if (kind === 'cube') { b = R.pick([2, 3, 4, 5, 6, 10]); e = 3; }
                else if (kind === 'p2') { b = 2; e = R.int(4, 10); }
                else if (kind === 'p3') { b = 3; e = R.int(3, 5); }
                else { b = R.pick([4, 5]); e = R.int(3, 4); }
                const val = Math.pow(b, e), expr = b + SUP[e];
                let why;
                if (e === 2) why = expr + ' means ' + b + ' × ' + b + ' = ' + fmt(val) + ' (not ' + b + ' × 2 = ' + (2 * b) + ').';
                else if (e === 3) why = expr + ' means ' + b + ' × ' + b + ' × ' + b + ' = ' + fmt(val) + ' (not ' + b + ' × 3 = ' + (3 * b) + ').';
                else { const ch = []; for (let i = 1; i <= e; i++) ch.push(fmt(Math.pow(b, i))); why = expr + ' means ' + e + ' ' + b + 's multiplied together. Keep multiplying by ' + b + ': ' + ch.join(', ') + '. So ' + expr + ' = ' + fmt(val) + '.'; }
                if (R.chance(0.5)) return { q: 'What is **' + expr + '**?', ans: big(val), why };
                return { q: 'What is **' + expr + '**?', a: mc(R, fmt(val), [fmt(b * e), fmt(Math.pow(e, b)), fmt(Math.pow(b, e - 1)), fmt(b + e)], near(R, val, 10, 1)), why };
            }
            if (t === 2) {
                if (R.chance(0.6)) {
                    const b = R.int(2, 15);
                    return { q: 'What is the square root of ' + (b * b) + ' (√' + (b * b) + ')?', ans: String(b), why: b + ' × ' + b + ' = ' + (b * b) + ', so √' + (b * b) + ' = ' + b + '.' };
                }
                const b = R.pick([2, 3, 4, 5, 6, 10]), c = b * b * b;
                return { q: 'What is the cube root of ' + fmt(c) + ' (∛' + fmt(c) + ')?', ans: String(b), why: b + ' × ' + b + ' × ' + b + ' = ' + fmt(c) + ', so ∛' + fmt(c) + ' = ' + b + '.' };
            }
            if (t === 3) {
                const isSq = (x) => Number.isInteger(Math.sqrt(x));
                const isCube = (x) => Math.pow(Math.round(Math.cbrt(x)), 3) === x;
                if (R.chance(0.6)) {
                    const b = R.int(4, 15), sq = b * b;
                    const cands = [b * 2].concat(R.shuffle([sq + 1, sq - 1, sq + b, b * 10, (b + 1) * (b + 1) - 2])).filter(x => x > 1 && !isSq(x));
                    const a = mc(R, String(sq), cands.map(String), () => { const x = R.int(10, 230); return isSq(x) ? '' : String(x); });
                    return {
                        q: 'Which of these is a **square number**?', a,
                        why: sq + ' = ' + b + ' × ' + b + ', so it is a square number.' + (a.includes(String(b * 2)) ? ' ' + (b * 2) + ' is ' + b + ' × 2, not ' + b + ' × ' + b + '.' : '')
                    };
                }
                const b = R.pick([2, 3, 4, 5, 6, 7, 10]), cu = b * b * b;
                const cands = [b * 3].concat(R.shuffle([b * b, cu + 1, cu - 1, b * b * 2, cu + b])).filter(x => x > 1 && !isCube(x));
                const a = mc(R, String(cu), cands.map(String), () => { const x = R.int(10, 400); return isCube(x) ? '' : String(x); });
                return {
                    q: 'Which of these is a **cube number**?', a,
                    why: cu + ' = ' + b + ' × ' + b + ' × ' + b + ', so it is a cube number.' + (a.includes(String(b * 3)) ? ' ' + (b * 3) + ' is ' + b + ' × 3, not ' + b + ' × ' + b + ' × ' + b + '.' : '')
                };
            }
            let n; do { n = R.int(10, 200); } while (Number.isInteger(Math.sqrt(n)));
            const a = Math.floor(Math.sqrt(n)), h = Math.floor(n / 2);
            return {
                q: '√' + n + ' is not a whole number. Between which two whole numbers does it lie?',
                a: mc(R, a + ' and ' + (a + 1), [(a - 1) + ' and ' + a, (a + 1) + ' and ' + (a + 2), h + ' and ' + (h + 1)], null),
                why: a + '² = ' + (a * a) + ' and ' + (a + 1) + '² = ' + ((a + 1) * (a + 1)) + '. ' + n + ' is between them, so √' + n + ' is between ' + a + ' and ' + (a + 1) + ' (about ' + Math.sqrt(n).toFixed(1) + ', which is only an approximation).'
            };
        },

        // Order of operations
        "mt_jHgRQ4hR0g": function (R) {
            const t = R.int(1, 6);
            let expr, val, wrong, why;
            if (t === 1) {
                const b = R.int(2, 9), c = R.int(2, 9);
                if (R.chance(0.6)) {
                    const a = R.int(2, 20); expr = a + ' + ' + b + ' × ' + c; val = a + b * c; wrong = (a + b) * c;
                    why = 'Multiply first: ' + b + ' × ' + c + ' = ' + (b * c) + ', then ' + a + ' + ' + (b * c) + ' = ' + val + '. Working left to right would give ' + wrong + ', which is wrong.';
                } else {
                    const a = b * c + R.int(1, 30); expr = a + ' − ' + b + ' × ' + c; val = a - b * c; wrong = (a - b) * c;
                    why = 'Multiply first: ' + b + ' × ' + c + ' = ' + (b * c) + ', then ' + a + ' − ' + (b * c) + ' = ' + val + '. Working left to right would give ' + wrong + ', which is wrong.';
                }
            } else if (t === 2) {
                const b = R.int(2, 9), q = R.int(2, 9), a = b * q, c = R.int(2, 9), d = R.int(2, 9);
                expr = a + ' ÷ ' + b + ' + ' + c + ' × ' + d; val = q + c * d; wrong = (q + c) * d;
                why = 'Do ÷ and × before +: ' + a + ' ÷ ' + b + ' = ' + q + ' and ' + c + ' × ' + d + ' = ' + (c * d) + '. Then ' + q + ' + ' + (c * d) + ' = ' + val + '.';
            } else if (t === 3) {
                if (R.chance(0.5)) {
                    const a = R.int(2, 12), b = R.int(2, 12), c = R.int(2, 9);
                    expr = '(' + a + ' + ' + b + ') × ' + c; val = (a + b) * c; wrong = a + b * c;
                    why = 'Brackets first: ' + a + ' + ' + b + ' = ' + (a + b) + ', then ' + (a + b) + ' × ' + c + ' = ' + val + '.';
                } else {
                    const b = R.int(2, 9), a = b + R.int(2, 9), c = R.int(2, 9);
                    expr = c + ' × (' + a + ' − ' + b + ')'; val = c * (a - b); wrong = c * a - b;
                    why = 'Brackets first: ' + a + ' − ' + b + ' = ' + (a - b) + ', then ' + c + ' × ' + (a - b) + ' = ' + val + '.';
                }
            } else if (t === 4) {
                const b = R.int(2, 6);
                if (R.chance(0.5)) {
                    const a = R.int(2, 5); expr = a + ' × ' + b + '²'; val = a * b * b; wrong = (a * b) * (a * b);
                    why = 'Powers (indices) come before ×: ' + b + '² = ' + (b * b) + ', then ' + a + ' × ' + (b * b) + ' = ' + val + '. (' + a + ' × ' + b + ')² would be ' + wrong + '.';
                } else {
                    const a = R.int(2, 15); expr = a + ' + ' + b + '²'; val = a + b * b; wrong = (a + b) * (a + b);
                    why = 'Powers (indices) come before +: ' + b + '² = ' + (b * b) + ', then ' + a + ' + ' + (b * b) + ' = ' + val + '.';
                }
            } else if (t === 5) {
                if (R.chance(0.5)) {
                    const b = R.int(2, 9), c = R.int(2, 9), a = b + c + R.int(2, 20);
                    expr = a + ' − ' + b + ' + ' + c; val = a - b + c; wrong = a - (b + c);
                    why = '+ and − have equal priority, so work left to right: ' + a + ' − ' + b + ' = ' + (a - b) + ', then ' + (a - b) + ' + ' + c + ' = ' + val + '.';
                } else {
                    const b = R.int(2, 6), c = R.int(2, 5), a = b * c * R.int(2, 6);
                    expr = a + ' ÷ ' + b + ' × ' + c; val = a / b * c; wrong = a / (b * c);
                    why = '× and ÷ have equal priority, so work left to right: ' + a + ' ÷ ' + b + ' = ' + (a / b) + ', then ' + (a / b) + ' × ' + c + ' = ' + val + '.';
                }
            } else {
                const ANY = 'Any of them — the answer is the same';
                if (R.chance(0.5)) {
                    const c = R.int(2, 6), b = c * R.int(2, 6), d = R.int(1, 9), a = b / c + R.int(5, 30);
                    return {
                        q: 'In **' + a + ' − ' + b + ' ÷ ' + c + ' + ' + d + '**, which part should you work out first?',
                        a: [b + ' ÷ ' + c, a + ' − ' + b, c + ' + ' + d, ANY],
                        why: 'Division comes before addition and subtraction, so do ' + b + ' ÷ ' + c + ' = ' + (b / c) + ' first. Then work left to right: ' + a + ' − ' + (b / c) + ' + ' + d + ' = ' + (a - b / c + d) + '.'
                    };
                }
                const a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 9), d = R.int(1, 9);
                return {
                    q: 'In **' + a + ' × (' + b + ' + ' + c + ') − ' + d + '**, which part should you work out first?',
                    a: [b + ' + ' + c, a + ' × ' + b, c + ' − ' + d, ANY],
                    why: 'Brackets come first: ' + b + ' + ' + c + ' = ' + (b + c) + '. Then multiply: ' + a + ' × ' + (b + c) + ' = ' + (a * (b + c)) + ', and finally subtract: ' + (a * (b + c)) + ' − ' + d + ' = ' + (a * (b + c) - d) + '.'
                };
            }
            const q = 'Work out **' + expr + '**.';
            if (R.chance(0.5)) return { q, ans: String(val), why };
            return { q, a: mc(R, String(val), [String(wrong)], near(R, val, 8, 0, String)), why };
        },

        // ===================================================================
        // FRACTION FRONTIER
        // ===================================================================

        // Equivalent fractions (age 9+)
        "mt_ebPelt-qAl": function (R) {
            const t = R.int(1, 4);
            if (t === 1) {
                const [n, d] = properFrac(R, 2, 10), k = R.int(2, 8), f = R.int(1, 3);
                if (f === 1) return { q: F(n, d) + ' = ' + F('n', d * k) + '. What number is **n**?', ans: String(n * k), why: d + ' × ' + k + ' = ' + (d * k) + ', so multiply the numerator by ' + k + ' too: ' + n + ' × ' + k + ' = ' + (n * k) + '. ' + F(n, d) + ' = ' + F(n * k, d * k) + '.' };
                if (f === 2) return { q: F(n, d) + ' = ' + F(n * k, 'n') + '. What number is **n**?', ans: String(d * k), why: n + ' × ' + k + ' = ' + (n * k) + ', so multiply the denominator by ' + k + ' too: ' + d + ' × ' + k + ' = ' + (d * k) + '. ' + F(n, d) + ' = ' + F(n * k, d * k) + '.' };
                return { q: F(n * k, d * k) + ' = ' + F(n, 'n') + '. What number is **n**?', ans: String(d), why: (n * k) + ' ÷ ' + k + ' = ' + n + ', so divide the denominator by ' + k + ' too: ' + (d * k) + ' ÷ ' + k + ' = ' + d + '. ' + F(n * k, d * k) + ' = ' + F(n, d) + '.' };
            }
            if (t === 2) {
                const [n, d] = properFrac(R, 2, 9), k = R.int(2, 6);
                const others = R.shuffle([F(n * k, d), F(n, d * k), F(n * k, d * k + 1), F(n * k + 1, d * k), F(n + 1, d + 1)]);
                return {
                    q: 'Which fraction is equivalent to ' + F(n, d) + '?',
                    a: mc(R, F(n * k, d * k), [F(n + k, d + k)].concat(others), null),
                    why: 'Multiply the numerator and the denominator by the same number: ' + n + ' × ' + k + ' = ' + (n * k) + ' and ' + d + ' × ' + k + ' = ' + (d * k) + '. Adding the same number to both, or changing only one of them, changes the size.'
                };
            }
            if (t === 3) {
                const [n, d] = properFrac(R, 2, 7), ks = R.sample([2, 3, 4, 5, 6], 3), eq = ks.map(k => F(n * k, d * k));
                const j = R.int(1, 4), k2 = R.pick(ks);
                const odd = R.pick([
                    [n + j, d + j, 'adds ' + j + ' to the top and the bottom'],
                    [n * k2, d * k2 + 1, 'does not multiply the top and bottom by the same number'],
                    [n * k2 + 1, d * k2, 'does not multiply the top and bottom by the same number']
                ]);
                // the three wrong answers are equivalent to each other on purpose, so plain R.options
                return {
                    q: 'Which fraction is **not** equivalent to ' + F(n, d) + '?',
                    a: R.options(F(odd[0], odd[1]), eq, null),
                    why: F(n, d) + ' = ' + eq.join(' = ') + ' (top and bottom multiplied by the same number). ' + F(odd[0], odd[1]) + ' ' + odd[2] + ', so it is a different size.'
                };
            }
            const f = R.int(1, 3);
            if (f === 1) { const a = R.int(1, 9); return { q: F(a, 10) + ' = ' + F('n', 100) + '. What number is **n**?', ans: String(a * 10), why: '10 × 10 = 100, so multiply the numerator by 10 too: ' + a + ' × 10 = ' + (a * 10) + '. ' + a + ' tenths = ' + (a * 10) + ' hundredths.' }; }
            if (f === 2) { const a = R.int(1, 9); return { q: F(a * 10, 100) + ' = ' + F('n', 10) + '. What number is **n**?', ans: String(a), why: '100 ÷ 10 = 10, so divide the numerator by 10 too: ' + (a * 10) + ' ÷ 10 = ' + a + '. ' + (a * 10) + ' hundredths = ' + a + ' tenths.' }; }
            const [n, d] = R.pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 20], [3, 20], [7, 20], [1, 25], [3, 25], [1, 50], [7, 50]]), k = 100 / d;
            return { q: F(n, d) + ' = ' + F('n', 100) + '. What number is **n**?', ans: String(n * k), why: d + ' × ' + k + ' = 100, so multiply the numerator by ' + k + ' too: ' + n + ' × ' + k + ' = ' + (n * k) + '. ' + F(n, d) + ' = ' + F(n * k, 100) + '.' };
        },

        // Simplifying Fractions
        "mt_b7T-CjOYUR": function (R) {
            const t = R.int(1, 4);
            const numFor = (d) => { let n; do { n = R.int(1, d - 1); } while (gcd(n, d) !== 1); return n; };
            if (t === 1 || t === 2) {
                const [p, q] = properFrac(R, 3, 12), k = R.int(2, 9), N = p * k, D = q * k;
                const why = 'The highest common factor of ' + N + ' and ' + D + ' is ' + k + '. ' + N + ' ÷ ' + k + ' = ' + p + ' and ' + D + ' ÷ ' + k + ' = ' + q + ', so ' + F(N, D) + ' = ' + F(p, q) + '.';
                if (t === 1) return { q: 'Write ' + F(N, D) + ' in its simplest form.', ans: p + '/' + q, exact: true, why };
                // partly simplified forms are equal in value but NOT simplest — deliberate distractors
                const partial = factorsOf(k).filter(f => f > 1 && f < k).map(f => F(N / f, D / f));
                const others = [[p, q + 1], [p + 1, q], [p + 1, q + 1], [p, q - 1], [p + 2, q + 1]].filter(([x, y]) => x > 0 && x < y && !eqv(x, y, p, q)).map(([x, y]) => F(x, y));
                const wrong = R.shuffle(partial).slice(0, 2).concat([F(p, D)], R.shuffle(others));
                return {
                    q: 'What is ' + F(N, D) + ' in its simplest form?',
                    a: R.options(F(p, q), wrong, null),
                    why: why + (partial.length ? ' Fractions like ' + partial[0] + ' are equivalent, but they can still be simplified.' : '')
                };
            }
            if (t === 3) {
                let b, d; do { b = R.int(2, 12); d = R.int(2, 12); } while (b === d || lcm(b, d) > 60 || (lcm(b, d) === Math.max(b, d) && R.chance(0.7)));
                const a = numFor(b), c = numFor(d), L = lcm(b, d);
                const conv = [[a, b], [c, d]].filter(([x, y]) => y !== L).map(([x, y]) => F(x, y) + ' = ' + F(x * L / y, L));
                return {
                    q: 'What is the lowest common denominator of ' + F(a, b) + ' and ' + F(c, d) + '?',
                    ans: String(L),
                    why: 'The lowest common multiple of ' + b + ' and ' + d + ' is ' + L + ', so both fractions can be written in ' + L + 'ths: ' + conv.join(' and ') + '.'
                };
            }
            const [n, d] = properFrac(R, 5, 15);
            const wr = [], vals = [n / d];
            let ex = null;
            for (let g = 0; wr.length < 3 && g < 200; g++) {
                const [p, q] = properFrac(R, 2, 7), k = R.int(2, 5);
                if (vals.some(v => Math.abs(v - p / q) < 1e-9)) continue;
                vals.push(p / q); wr.push(F(p * k, q * k));
                if (!ex) ex = F(p * k, q * k) + ' = ' + F(p, q) + ' (divide both by ' + k + ')';
            }
            return {
                q: 'Which fraction is already in its **simplest form**?',
                a: R.options(F(n, d), wr, null),
                why: F(n, d) + ' cannot be simplified: ' + n + ' and ' + d + ' have no common factor except 1. The others can, e.g. ' + ex + '.'
            };
        },

        // Comparing fractions (age 10+)
        "mt_PL9VkDwXfh": function (R) {
            const t = R.int(1, 4);
            const lcd = (items) => items.map(x => x.d).reduce(lcm);
            const conv = (x, L) => x.disp + ' = ' + F(x.n * L / x.d, L);
            if (t === 1) {
                const S = fracSet(R, 4, R.chance(0.4), false), most = R.chance(0.5), L = lcd(S.items);
                const sorted = S.items.slice().sort((x, y) => x.v - y.v), c = most ? sorted[3] : sorted[0];
                if (R.chance(0.45)) {
                    const it = {
                        q: 'Which of these is the **' + (most ? 'largest' : 'smallest') + '**? Type it.  ' + S.items.map(x => x.disp).join(',  '),
                        ans: c.n + '/' + c.d,
                        why: 'Use a common denominator of ' + L + ': ' + S.items.map(x => conv(x, L)).join(', ') + '. So the ' + (most ? 'largest' : 'smallest') + ' is ' + c.disp + '.'
                    };
                    if (c.n > c.d) it.alt = [mplain(c.n, c.d)];
                    return it;
                }
                return {
                    q: 'Which fraction is the **' + (most ? 'largest' : 'smallest') + '**?',
                    a: mc(R, c.disp, S.items.filter(x => x !== c).map(x => x.disp), null),
                    why: 'Use a common denominator of ' + L + ': ' + S.items.map(x => conv(x, L)).join(', ') + '. So the ' + (most ? 'largest' : 'smallest') + ' is ' + c.disp + '.'
                };
            }
            if (t === 2) {
                let A, B, va, vb, L;
                if (R.chance(0.2)) {
                    const [n, d] = properFrac(R, 2, 6), [k1, k2] = R.sample([1, 2, 3, 4], 2);
                    A = F(n * k1, d * k1); B = F(n * k2, d * k2); L = lcm(d * k1, d * k2); va = vb = n * L / d;
                } else {
                    const S = fracSet(R, 2, R.chance(0.4), true), [x, y] = S.items;
                    L = lcd(S.items); A = x.disp; B = y.disp; va = x.n * L / x.d; vb = y.n * L / y.d;
                }
                const sym = va > vb ? '>' : va < vb ? '<' : '=';
                return {
                    q: 'Which sign makes this true?  ' + A + '  ?  ' + B,
                    a: [sym].concat(['>', '<', '='].filter(s => s !== sym)),
                    why: sym === '='
                        ? 'Use a common denominator of ' + L + ': ' + A + ' and ' + B + ' are both ' + F(va, L) + ', so they are equal.'
                        : 'Use a common denominator of ' + L + ': ' + A + ' = ' + F(va, L) + ' and ' + B + ' = ' + F(vb, L) + '. ' + va + ' ' + sym + ' ' + vb + ', so ' + A + ' ' + sym + ' ' + B + '.'
                };
            }
            if (t === 3) {
                const S = fracSet(R, 3, R.chance(0.3), true), L = lcd(S.items);
                const show = (arr) => arr.map(x => x.disp).join(', ');
                const asc = S.items.slice().sort((x, y) => x.v - y.v);
                const wrong = [show(S.items.slice().sort((x, y) => x.d - y.d)), show(S.items.slice().sort((x, y) => x.n - y.n)), show(asc.slice().reverse())];
                return {
                    q: 'Which list is in order from **smallest to largest**?',
                    a: R.options(show(asc), wrong, () => show(R.shuffle(S.items))),
                    why: 'Use a common denominator of ' + L + ': ' + asc.map(x => conv(x, L)).join(', ') + '. So the order is ' + show(asc) + '.'
                };
            }
            const S = fracSet(R, 2, R.chance(0.3), true), [x, y] = S.items, L = lcd(S.items), bg = x.v > y.v ? x : y;
            const it = {
                q: 'Which is bigger, ' + x.disp + ' or ' + y.disp + '? Type the bigger fraction.',
                ans: bg.n + '/' + bg.d,
                why: 'Use a common denominator of ' + L + ': ' + conv(x, L) + ' and ' + conv(y, L) + '. So ' + bg.disp + ' is bigger.'
            };
            if (bg.n > bg.d) it.alt = [mplain(bg.n, bg.d)];
            return it;
        },

        // Mixed numbers and improper fractions
        "mt_o_p-3tCxiM": function (R) {
            const t = R.int(1, 4);
            const mk = () => { const d = R.int(2, 10); let r; do { r = R.int(1, d - 1); } while (gcd(r, d) !== 1); const w = R.int(1, 6); return { w, r, d, n: w * d + r }; };
            if (t === 1) {
                const { w, r, d, n } = mk();
                return { q: 'Write ' + F(n, d) + ' as a mixed number.', ans: w + ' ' + r + '/' + d, exact: true, why: n + ' ÷ ' + d + ' = ' + w + ' remainder ' + r + '. So ' + F(n, d) + ' is ' + w + ' whole' + (w > 1 ? 's' : '') + ' and ' + F(r, d) + ' left over: ' + MX(w, r, d) + '.' };
            }
            if (t === 2) {
                const { w, r, d, n } = mk();
                return { q: 'Write ' + MX(w, r, d) + ' as an improper fraction.', ans: n + '/' + d, exact: true, why: 'Multiply the whole number by the denominator, then add the numerator: ' + w + ' × ' + d + ' + ' + r + ' = ' + n + '. So ' + MX(w, r, d) + ' = ' + F(n, d) + '.' };
            }
            if (t === 3) {
                const { w, r, d, n } = mk();
                if (R.chance(0.5)) {
                    const wr = [MX(w, r, n), MX(w + 1, r, d), MX(w, d - r, d)];
                    if (w < d) wr.unshift(MX(r, w, d));
                    return {
                        q: 'Which mixed number is equal to ' + F(n, d) + '?',
                        a: mc(R, MX(w, r, d), wr, () => { const ww = w + R.pick([-1, 1, 2]); return ww >= 1 ? MX(ww, R.int(1, d - 1), d) : ''; }),
                        why: n + ' ÷ ' + d + ' = ' + w + ' remainder ' + r + ', so ' + F(n, d) + ' = ' + w + ' whole' + (w > 1 ? 's' : '') + ' and ' + F(r, d) + ' = ' + MX(w, r, d) + '.'
                    };
                }
                return {
                    q: 'Which improper fraction is equal to ' + MX(w, r, d) + '?',
                    a: mc(R, F(n, d), [F(w * r + d, d), F(w * d, d), F(w + r, d)], () => { const x = n + R.int(-3, 3); return x > 0 ? F(x, d) : ''; }),
                    why: 'Whole number × denominator + numerator: ' + w + ' × ' + d + ' + ' + r + ' = ' + n + ', so ' + MX(w, r, d) + ' = ' + F(n, d) + '.'
                };
            }
            const d = R.int(3, 12);
            if (R.chance(0.3)) {
                const W = R.int(2, 4), n1 = R.int(d + 1, W * d - 1), n2 = W * d - n1;
                return { q: F(n1, d) + ' + ' + F(n2, d) + ' = ? Write the answer as a whole number.', ans: String(W), exact: true, why: 'Add the numerators: ' + n1 + ' + ' + n2 + ' = ' + (W * d) + ', so the total is ' + F(W * d, d) + '. ' + (W * d) + ' ÷ ' + d + ' = ' + W + ', so it is ' + W + ' wholes.' };
            }
            let n1, n2, r; do { n1 = R.int(1, d - 1); n2 = R.int(1, d - 1); r = n1 + n2 - d; } while (r <= 0 || gcd(r, d) !== 1);
            return {
                q: F(n1, d) + ' + ' + F(n2, d) + ' = ? Write the answer as a mixed number.',
                ans: '1 ' + r + '/' + d, exact: true,
                why: 'Add the numerators: ' + n1 + ' + ' + n2 + ' = ' + (n1 + n2) + ', so the total is ' + F(n1 + n2, d) + '. ' + d + ' of them make 1 whole, with ' + r + ' left over: ' + MX(1, r, d) + '.'
            };
        },

        // Adding Fractions (Unlike Denominators)
        "mt_14T5yPXUq_": function (R) {
            const t = R.int(1, 4);
            const numFor = (d) => { let n; do { n = R.int(1, d - 1); } while (gcd(n, d) !== 1); return n; };
            const dens = (max) => { let b, d; do { b = R.int(2, 12); d = R.int(2, 12); } while (b === d || lcm(b, d) > max); return [b, d]; };
            const tail = (N, L) => { const s = fshow(N, L, true); return s === F(N, L) ? '' : ' = ' + s; };
            const typed = (q, N, L, why) => { const it = { q, ans: fplain(N, L), why }; const m = mplain(N, L); if (m !== it.ans) it.alt = [m]; return it; };
            if (t === 1 || t === 3) {
                const [b, d] = dens(36), a = numFor(b), c = numFor(d), L = lcm(b, d), A = a * L / b, C = c * L / d, N = A + C;
                const conv = [[a, b, A], [c, d, C]].filter(([x, y]) => y !== L).map(([x, y, z]) => F(x, y) + ' = ' + F(z, L));
                const why = 'Use a common denominator of ' + L + (conv.length ? ': ' + conv.join(' and ') : '') + '. ' + F(A, L) + ' + ' + F(C, L) + ' = ' + F(N, L) + tail(N, L) + '.';
                const q = 'Work out ' + F(a, b) + ' + ' + F(c, d) + '.';
                if (t === 1) return typed(q, N, L, why);
                return {
                    q,
                    a: mc(R, fshow(N, L, false), [F(a + c, b + d), F(a + c, L), F(a + c, b * d), F(N, b + d)], () => { const x = N + R.int(-3, 3); return x > 0 ? fshow(x, L) : ''; }),
                    why: why + ' Never add the denominators: ' + F(a + c, b + d) + ' is wrong.'
                };
            }
            if (t === 2) {
                let b, d, a, c, L, A, C;
                do { [b, d] = dens(36); a = numFor(b); c = numFor(d); L = lcm(b, d); A = a * L / b; C = c * L / d; } while (A === C);
                if (A < C) [a, b, c, d, A, C] = [c, d, a, b, C, A];
                const N = A - C;
                const conv = [[a, b, A], [c, d, C]].filter(([x, y]) => y !== L).map(([x, y, z]) => F(x, y) + ' = ' + F(z, L));
                return typed('Work out ' + F(a, b) + ' − ' + F(c, d) + '.', N, L, 'Use a common denominator of ' + L + (conv.length ? ': ' + conv.join(' and ') : '') + '. ' + F(A, L) + ' − ' + F(C, L) + ' = ' + F(N, L) + tail(N, L) + '.');
            }
            let [b, d] = dens(24), a = numFor(b), c = numFor(d), w1 = R.int(1, 5), w2 = R.int(1, 4);
            let sub = R.chance(0.6);
            const L = lcm(b, d);
            let I1 = w1 * b + a, I2 = w2 * d + c, P = I1 * L / b, Q = I2 * L / d;
            if (P === Q) sub = false;
            if (sub && P < Q) { [w1, a, b, I1, P, w2, c, d, I2, Q] = [w2, c, d, I2, Q, w1, a, b, I1, P]; }
            const op = sub ? ' − ' : ' + ', N = sub ? P - Q : P + Q;
            return typed('Work out ' + MX(w1, a, b) + op + MX(w2, c, d) + '.', N, L,
                'Change to improper fractions: ' + F(I1, b) + op + F(I2, d) + '. Use a common denominator of ' + L + ': ' + F(P, L) + op + F(Q, L) + ' = ' + F(N, L) + tail(N, L) + '.');
        },

        // Multiplying fractions (age 10+)
        "mt_AabJisinfi": function (R) {
            const t = R.int(1, 4);
            if (t === 1 || t === 2) {
                const [a, b] = properFrac(R, 2, 10), [c, d] = properFrac(R, 2, 10), N = a * c, D = b * d, [sn, sd] = simp(N, D), g = gcd(N, D);
                const why = 'Multiply the numerators: ' + a + ' × ' + c + ' = ' + N + '. Multiply the denominators: ' + b + ' × ' + d + ' = ' + D + '. ' + (g > 1 ? F(N, D) + ' simplifies to ' + F(sn, sd) + ' (divide both by ' + g + ').' : 'So the answer is ' + F(N, D) + '.');
                if (t === 1) return { q: 'Work out ' + F(a, b) + ' × ' + F(c, d) + '. Give your answer in its simplest form.', ans: sn + '/' + sd, exact: true, why };
                return {
                    q: 'Work out ' + F(a, b) + ' × ' + F(c, d) + '.',
                    a: mc(R, F(sn, sd), [F(a + c, b + d), F(a * d, b * c), F(N, b + d), F(N, b)], () => { const x = sn + R.int(-2, 2), y = sd + R.int(-2, 2); return x > 0 && y > 1 ? F(x, y) : ''; }),
                    why
                };
            }
            if (t === 3) {
                const [a, b] = properFrac(R, 2, 10), w = R.int(2, 12), N = a * w;
                const it = { q: 'Work out ' + F(a, b) + ' × ' + w + '.', ans: fplain(N, b), why: F(a, b) + ' × ' + w + ' means ' + w + ' lots of ' + F(a, b) + ': ' + a + ' × ' + w + ' = ' + N + ', so it is ' + F(N, b) + (fshow(N, b, true) !== F(N, b) ? ' = ' + fshow(N, b, true) : '') + '.' };
                const m = mplain(N, b); if (m !== it.ans) it.alt = [m];
                return it;
            }
            const [a, b] = properFrac(R, 2, 10), m = R.int(2, 12), Q = b * m;
            const ctx = R.pick([['', '', ''], ['£', '', ''], ['', ' sweets', 'sweets'], ['', ' km', 'km']]);
            const it = {
                q: 'What is ' + F(a, b) + ' of ' + ctx[0] + Q + ctx[1] + '?',
                ans: String(a * m),
                why: 'Find ' + F(1, b) + ' first: ' + Q + ' ÷ ' + b + ' = ' + m + '. Then ' + F(a, b) + ' is ' + a + ' lots of that: ' + m + ' × ' + a + ' = ' + (a * m) + '.'
            };
            if (ctx[2]) it.unit = ctx[2];
            return it;
        },

        // Understanding Percentages
        "mt_ZM9mhHsyYZ": function (R) {
            const t = R.int(1, 5);
            if (t === 1) {
                const p = R.chance(0.3) ? R.int(1, 9) : R.int(10, 99), s = String(p / 100);
                if (R.chance(0.35)) return { q: 'Write **' + p + '%** as a fraction with a denominator of 100.', ans: p + '/100', exact: true, why: 'Per cent means "out of 100", so ' + p + '% = ' + p + ' out of 100 = ' + F(p, 100) + '.' };
                return { q: 'Write **' + p + '%** as a decimal.', ans: s, alt: decAlts(s), exact: true, why: 'Per cent means "out of 100", so ' + p + '% = ' + F(p, 100) + ' = ' + p + ' ÷ 100 = ' + s + '.' + (p < 10 ? ' (Not 0.' + p + ', which is ' + (p * 10) + '%.)' : '') };
            }
            if (t === 2) {
                let p; do { p = R.int(11, 99); } while (p % 10 === 0);
                const asF = R.chance(0.5);
                return {
                    q: 'Which of these is the same as **' + p + '%**?',
                    a: mc(R, asF ? F(p, 100) : String(p / 100), asF ? [F(p, 10), F(1, p), String(p / 10), String(p / 1000)] : [String(p / 10), String(p / 1000), F(p, 10), F(1, p)], null),
                    why: p + '% means ' + p + ' out of 100: ' + F(p, 100) + ' = ' + (p / 100) + '.'
                };
            }
            if (t === 3) {
                const k = R.int(3, 97), not = R.chance(0.5);
                return {
                    q: 'A 10 × 10 grid has 100 squares. ' + k + ' of them are shaded. What percentage of the grid is ' + (not ? '**not** shaded' : 'shaded') + '?',
                    ans: String(not ? 100 - k : k), unit: '%',
                    why: 'There are 100 squares, so each square is 1%. ' + (not ? k + ' are shaded, so 100 − ' + k + ' = ' + (100 - k) + ' are not: ' + (100 - k) + '%.' : k + ' squares out of 100 = ' + F(k, 100) + ' = ' + k + '%.')
                };
            }
            if (t === 4) {
                const p = R.int(1, 19) * 5;
                const C = R.pick([
                    ['In a class, ' + p + '% of the pupils walk to school.', 'What percentage of the pupils do **not** walk to school?'],
                    [p + '% of a garden is grass.', 'What percentage of the garden is **not** grass?'],
                    ['A phone battery is ' + p + '% charged.', 'What percentage of the battery is still to be charged?'],
                    [p + '% of the sweets in a jar are red.', 'What percentage of the sweets are **not** red?']
                ]);
                return { q: C[0] + ' ' + C[1], ans: String(100 - p), unit: '%', why: 'The whole thing is 100%. 100% − ' + p + '% = ' + (100 - p) + '%.' };
            }
            const p = R.chance(0.4) ? R.int(1, 9) : R.int(10, 99), s = String(p / 100);
            return {
                q: 'Write **' + s + '** as a percentage.',
                a: mc(R, p + '%', [s + '%', (p * 10) + '%', (p / 10) + '%', (p * 100) + '%'], null),
                why: 'Multiply by 100 to change a decimal to a percentage: ' + s + ' × 100 = ' + p + '%.' + (p < 10 ? ' (0.' + p + ' would be ' + (p * 10) + '%.)' : '')
            };
        },

        // Percentage and decimal equivalents
        "mt_4ubP_RMg9o": function (R) {
            const t = R.int(1, 5);
            if (t === 1 || t === 2) {
                const [n, d] = R.pick(NICE), p = n * 100 / d, k = 100 / d;
                const to100 = F(n, d) + ' = ' + F(p, 100) + ' (multiply top and bottom by ' + k + ')';
                if (t === 1) return { q: 'Write ' + F(n, d) + ' as a percentage.', ans: String(p), unit: '%', why: to100 + ' = ' + p + '%. Per cent means "out of 100".' };
                const s = String(p / 100);
                return { q: 'Write ' + F(n, d) + ' as a decimal.', ans: s, alt: decAlts(s), exact: true, why: to100 + ' = ' + s + '.' };
            }
            if (t === 3) {
                const [p, fn, fd] = R.pick([[10, 1, 10], [20, 1, 5], [25, 1, 4], [40, 2, 5], [50, 1, 2], [60, 3, 5], [75, 3, 4], [80, 4, 5]]);
                const A = fd * R.int(2, 25), part = A / fd * fn;
                const work = fn === 1 ? A + ' ÷ ' + fd + ' = ' + part : A + ' ÷ ' + fd + ' = ' + (A / fd) + ', and ' + fn + ' × ' + (A / fd) + ' = ' + part;
                if (R.chance(0.5)) return { q: 'Find **' + p + '% of ' + A + '**.', ans: String(part), why: p + '% = ' + F(fn, fd) + '. ' + work + '.' };
                const item = R.pick(['coat', 'bike', 'board game', 'pair of trainers', 'football', 'scooter']);
                return {
                    q: 'A shop has ' + p + '% off a £' + A + ' ' + item + '. What is the sale price?',
                    ans: String(A - part),
                    why: p + '% = ' + F(fn, fd) + ', so the discount is ' + F(fn, fd) + ' of £' + A + ': ' + work + '. Sale price: £' + A + ' − £' + part + ' = £' + (A - part) + '.'
                };
            }
            if (t === 4) {
                const [n, d] = R.pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5]]), p = n * 100 / d, s = String(p / 100);
                return {
                    q: 'Which decimal is equal to ' + F(n, d) + '?',
                    a: mc(R, s, ['0.' + n + d, String(d / 10)].concat(R.shuffle([n + '.' + d, String(p / 10), String(p / 1000)])), null),
                    why: F(n, d) + ' = ' + F(p, 100) + ' = ' + s + '. ' + F(n, d) + ' means ' + n + ' ÷ ' + d + ', not "' + n + ' point ' + d + '".'
                };
            }
            const items = mixedForms(R, 4), most = R.chance(0.5);
            const sorted = items.slice().sort((x, y) => x.p - y.p), c = most ? sorted[sorted.length - 1] : sorted[0];
            return {
                q: 'Which is the **' + (most ? 'largest' : 'smallest') + '**?',
                a: mc(R, c.disp, items.filter(x => x !== c).map(x => x.disp), null),
                why: 'Change them all to percentages: ' + items.map(x => (x.kind === 'p' ? x.disp : x.disp + ' = ' + x.p + '%')).join(', ') + '. The ' + (most ? 'largest' : 'smallest') + ' is ' + c.disp + '.'
            };
        },

        // Calculating Percentages
        "mt_PNSyfH56eQ": function (R) {
            const t = R.int(1, 5);
            // working for p% of A, where A is a multiple of 20 so 10% and 5% are whole numbers
            const pw = (p, A, m) => {
                const f = m ? money : fmt, ten = A / 10, five = A / 20, tens = Math.floor(p / 10), half = p % 10 === 5;
                if (p === 50) return '50% is a half: ' + f(A) + ' ÷ 2 = ' + f(A / 2) + '.';
                if (p === 25) return '25% is a quarter: ' + f(A) + ' ÷ 4 = ' + f(A / 4) + '.';
                if (p === 75) return '25% is ' + f(A) + ' ÷ 4 = ' + f(A / 4) + ', so 75% = 3 × ' + f(A / 4) + ' = ' + f(A * 3 / 4) + '.';
                let s = '10% of ' + f(A) + ' = ' + f(A) + ' ÷ 10 = ' + f(ten) + '.';
                if (tens > 1) s += ' ' + (tens * 10) + '% = ' + tens + ' × ' + f(ten) + ' = ' + f(ten * tens) + '.';
                if (half) s += ' 5% = half of 10% = ' + f(five) + '.' + (tens ? ' So ' + p + '% = ' + f(ten * tens) + ' + ' + f(five) + ' = ' + f(ten * tens + five) + '.' : '');
                return s;
            };
            if (t === 1) {
                const p = R.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 65, 70, 75, 80, 90]), A = 20 * R.int(1, 30);
                return { q: 'What is **' + p + '% of ' + A + '**?', ans: big(A * p / 100), why: pw(p, A) };
            }
            if (t === 2) {
                const p = R.pick([10, 15, 20, 25, 30, 40, 50]), A = 20 * R.int(1, 15), part = A * p / 100, inc = R.chance(0.35);
                const item = R.pick(['jacket', 'bike', 'tent', 'guitar', 'pair of boots', 'tablet']);
                const nw = inc ? A + part : A - part;
                return {
                    q: inc ? 'A £' + A + ' ' + item + ' goes up in price by ' + p + '%. What is the new price?' : 'A £' + A + ' ' + item + ' is reduced by ' + p + '% in a sale. What is the sale price?',
                    ans: String(nw),
                    why: pw(p, A, true) + ' ' + (inc ? 'New price: £' + A + ' + £' + part : 'Sale price: £' + A + ' − £' + part) + ' = £' + nw + '.'
                };
            }
            if (t === 3) {
                const mk = () => { let p, A; do { p = R.pick([10, 15, 20, 25, 30, 40, 50]); A = R.int(4, 40) * 5; } while ((A * p) % 100 !== 0); return [p, A]; };
                let p1, A1, p2, A2;
                do { [p1, A1] = mk(); [p2, A2] = mk(); } while (p1 === p2);
                const s1 = A1 * p1 / 100, s2 = A2 * p2 / 100;
                const item = R.pick(['coat', 'bike', 'tent', 'guitar', 'games console']);
                const res = s1 > s2 ? 'Shop A saves more.' : s1 < s2 ? 'Shop B saves more.' : 'They save the same amount.';
                const ans = s1 > s2 ? 'Shop A' : s1 < s2 ? 'Shop B' : 'They save the same';
                return {
                    q: 'Shop A has ' + p1 + '% off a £' + A1 + ' ' + item + '. Shop B has ' + p2 + '% off a £' + A2 + ' ' + item + '. Which discount saves more money?',
                    a: [ans].concat(['Shop A', 'Shop B', 'They save the same'].filter(x => x !== ans)),
                    why: 'Shop A saves ' + p1 + '% of £' + A1 + ' = £' + s1 + '. Shop B saves ' + p2 + '% of £' + A2 + ' = £' + s2 + '. ' + res + ' Compare the amounts saved, not just the percentages.'
                };
            }
            if (t === 4) {
                let W, p, part;
                do { W = R.pick([20, 25, 40, 50, 200]); p = R.int(1, 19) * 5; part = W * p / 100; } while (!Number.isInteger(part));
                const nm = R.pick(NAMES);
                const C = R.pick([
                    nm + ' scored ' + part + ' out of ' + W + ' in a quiz. What percentage did they get?',
                    'What percentage of ' + W + ' is ' + part + '?',
                    'A team won ' + part + ' of its ' + W + ' matches. What percentage of its matches did it win?'
                ]);
                return { q: C, ans: String(p), unit: '%', why: 'Write it as a fraction and make the denominator 100: ' + F(part, W) + ' = ' + F(p, 100) + ' = ' + p + '%.' };
            }
            const p = R.pick([15, 20, 25, 30, 35, 40, 45, 60, 70, 80, 90]), A = 20 * R.int(2, 20), v = A * p / 100;
            return {
                q: 'What is **' + p + '% of ' + A + '**?',
                a: mc(R, fmt(v), [A - p, A * p / 1000, A * p / 10, A / 10].filter(x => x > 0).map(x => fmt(x)), near(R, v, 10, 1)),
                why: pw(p, A)
            };
        },

        // ===================================================================
        // SHAPE SECTOR
        // ===================================================================

        // Angle Sum Rules
        "mt_oqziWKry-L": function (R) {
            const t = R.int(1, 4);
            if (t === 1) {
                if (R.chance(0.6)) {
                    const a = R.int(15, 165);
                    return { q: 'Two angles sit side by side on a straight line. One of them is ' + a + '°. What is the other angle?', ans: String(180 - a), unit: '°', why: 'Angles on a straight line add up to 180°. 180 − ' + a + ' = ' + (180 - a) + '°.' };
                }
                let a, b; do { a = R.int(20, 100); b = R.int(20, 100); } while (a + b > 160);
                const c = 180 - a - b;
                return { q: 'Three angles sit side by side on a straight line. Two of them are ' + a + '° and ' + b + '°. What is the third angle?', ans: String(c), unit: '°', why: 'Angles on a straight line add up to 180°. ' + a + ' + ' + b + ' = ' + (a + b) + ', and 180 − ' + (a + b) + ' = ' + c + '°.' };
            }
            if (t === 2) {
                const k = R.int(2, 3), angs = [];
                let s;
                do { angs.length = 0; for (let i = 0; i < k; i++) angs.push(R.int(30, 170)); s = angs.reduce((x, y) => x + y, 0); } while (s > 340 || s < 120);
                const m = 360 - s;
                return {
                    q: (k + 1) + ' angles meet at a point. ' + (k === 2 ? 'Two' : 'Three') + ' of them are ' + listAnd(angs.map(x => x + '°')) + '. What is the missing angle?',
                    ans: String(m), unit: '°',
                    why: 'Angles at a point add up to 360° (a full turn). ' + angs.join(' + ') + ' = ' + s + ', and 360 − ' + s + ' = ' + m + '°.'
                };
            }
            if (t === 3) {
                let a; do { a = R.int(20, 160); } while (a === 90);
                const opp = R.chance(0.5), c = opp ? a : 180 - a;
                return {
                    q: 'Two straight lines cross, making four angles. One of the angles is ' + a + '°. What is the angle ' + (opp ? '**vertically opposite** it' : '**next to it** on the same straight line') + '?',
                    a: mc(R, c + '°', [(opp ? 180 - a : a) + '°', (360 - a) + '°', Math.abs(90 - a) + '°'], near(R, c, 40, 5, x => x + '°')),
                    why: opp
                        ? 'Vertically opposite angles are equal, so it is also ' + a + '°. (The angles next to it are 180 − ' + a + ' = ' + (180 - a) + '°.)'
                        : 'Angles on a straight line add up to 180°: 180 − ' + a + ' = ' + (180 - a) + '°. (The vertically opposite angle is equal to it: ' + a + '°.)'
                };
            }
            const f = R.int(1, 3);
            if (f === 1) {
                const k = R.int(1, 4);
                return { q: 'How many degrees are there in ' + (k === 1 ? 'one right angle' : k + ' right angles') + '?', ans: String(90 * k), unit: '°', why: 'A right angle is 90°' + (k > 1 ? ', so ' + k + ' right angles = ' + k + ' × 90 = ' + (90 * k) + '°' : '') + (k === 4 ? ' — a full turn.' : '.') };
            }
            if (f === 2) {
                const n = R.pick([3, 4, 5, 6, 8, 9, 10, 12]);
                return { q: n + ' equal angles meet at a point. How big is each angle?', ans: String(360 / n), unit: '°', why: 'Angles at a point add up to 360°. ' + n + ' equal angles: 360 ÷ ' + n + ' = ' + (360 / n) + '°.' };
            }
            const k = R.int(1, 11);
            return { q: 'The minute hand of a clock turns clockwise from 12 to ' + k + '. How many degrees does it turn?', ans: String(30 * k), unit: '°', why: 'A full turn is 360° and there are 12 numbers, so each gap is 360 ÷ 12 = 30°. From 12 to ' + k + ' is ' + k + ' gap' + (k > 1 ? 's' : '') + ': ' + k + ' × 30 = ' + (30 * k) + '°.' };
        },

        // Angles in triangles (age 10+)
        "mt_cdMlC7EpTJ": function (R) {
            const t = R.int(1, 4);
            if (t === 1) {
                let a, b; do { a = R.int(20, 120); b = R.int(15, 140); } while (180 - a - b < 10 || a === 90 || b === 90);
                const c = 180 - a - b;
                return { q: 'A triangle has angles of ' + a + '° and ' + b + '°. What is the third angle?', ans: String(c), unit: '°', why: 'The angles in a triangle add up to 180°. ' + a + ' + ' + b + ' = ' + (a + b) + ', and 180 − ' + (a + b) + ' = ' + c + '°.' };
            }
            if (t === 2) {
                let A, m; do { A = [R.int(50, 150), R.int(50, 150), R.int(50, 150)]; m = 360 - A[0] - A[1] - A[2]; } while (m < 40 || m > 170);
                const s = 360 - m;
                return { q: 'A quadrilateral has angles of ' + listAnd(A.map(x => x + '°')) + '. What is the fourth angle?', ans: String(m), unit: '°', why: 'The angles in a quadrilateral add up to 360° (it splits into two triangles). ' + A.join(' + ') + ' = ' + s + ', and 360 − ' + s + ' = ' + m + '°.' };
            }
            if (t === 3) {
                const f = R.int(1, 3);
                if (f === 1) {
                    let ap; do { ap = R.int(20, 140); } while (ap % 2);
                    const b = (180 - ap) / 2;
                    return { q: 'An isosceles triangle has a top angle of ' + ap + '°. The other two angles are equal. What size is each of them?', ans: String(b), unit: '°', why: 'The angles add up to 180°. 180 − ' + ap + ' = ' + (180 - ap) + '°, shared equally between the two base angles: ' + (180 - ap) + ' ÷ 2 = ' + b + '°.' };
                }
                if (f === 2) {
                    const b = R.int(25, 85);
                    return { q: 'An isosceles triangle has two equal base angles of ' + b + '° each. What is the third angle?', ans: String(180 - 2 * b), unit: '°', why: 'The two base angles add up to 2 × ' + b + ' = ' + (2 * b) + '°. 180 − ' + (2 * b) + ' = ' + (180 - 2 * b) + '°.' };
                }
                const a = R.int(15, 75);
                return { q: 'A right-angled triangle has one angle of ' + a + '° as well as its right angle. What is the third angle?', ans: String(90 - a), unit: '°', why: 'The right angle is 90° and all three angles add up to 180°: 180 − 90 − ' + a + ' = ' + (90 - a) + '°.' };
            }
            const P = R.pick([[3, 'an equilateral triangle'], [4, 'a square'], [5, 'a regular pentagon'], [6, 'a regular hexagon'], [8, 'a regular octagon'], [10, 'a regular decagon']]);
            const n = P[0], sum = (n - 2) * 180, each = sum / n;
            return {
                q: 'What size is each interior angle of ' + P[1] + '?',
                a: mc(R, each + '°', [sum + '°', (360 / n) + '°', (180 / n) + '°'], () => R.pick([60, 72, 90, 108, 120, 135, 144, 150]) + '°'),
                why: n === 3 ? 'The angles of a triangle add up to 180°. An equilateral triangle has 3 equal angles: 180 ÷ 3 = 60°.'
                    : cap(P[1]) + ' splits into ' + (n - 2) + ' triangles, so its angles add up to ' + (n - 2) + ' × 180 = ' + sum + '°. It has ' + n + ' equal angles: ' + sum + ' ÷ ' + n + ' = ' + each + '°.'
            };
        },

        // Angle sums in triangles and polygons
        "mt_J03RFlVdas": function (R) {
            const t = R.int(1, 5);
            const NM = { 3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 12: 'dodecagon' };
            const an = (w) => (/^[aeiou]/.test(w) ? 'an ' : 'a ') + w;
            const plainP = (n) => NM[n] ? an(NM[n]) : 'a polygon with ' + n + ' sides';
            const poly = (n) => NM[n] ? an(NM[n]) + ' (' + n + ' sides)' : 'a polygon with ' + n + ' sides';
            const reg = (n) => NM[n] ? 'a regular ' + NM[n] + ' (' + n + ' sides)' : 'a regular polygon with ' + n + ' sides';
            if (t === 1 || t === 5) {
                const n = R.pick([4, 5, 6, 7, 8, 9, 10, 12, 15, 20]), S = (n - 2) * 180;
                const why = 'From one corner, ' + plainP(n) + ' splits into ' + n + ' − 2 = ' + (n - 2) + ' triangles. Each has 180°, so the angles add up to ' + (n - 2) + ' × 180 = ' + fmt(S) + '°.';
                const q = 'What do the interior angles of ' + poly(n) + ' add up to?';
                if (t === 1) return { q, ans: big(S), unit: '°', why };
                return { q, a: mc(R, fmt(S) + '°', [n * 180, (n - 1) * 180, 360, (n - 2) * 360].map(x => fmt(x) + '°'), () => { const x = S + 180 * R.pick([-2, -1, 1, 2, 3]); return x > 0 ? fmt(x) + '°' : ''; }), why };
            }
            if (t === 2) {
                const n = R.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]), ext = 360 / n, int = 180 - ext;
                return { q: 'What size is each interior angle of ' + reg(n) + '?', ans: String(int), unit: '°', why: 'Each exterior angle is 360 ÷ ' + n + ' = ' + ext + '°. Interior + exterior = 180° (a straight line), so each interior angle is 180 − ' + ext + ' = ' + int + '°.' };
            }
            if (t === 3) {
                const n = R.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36]), ext = 360 / n;
                if (R.chance(0.5)) return { q: 'What size is each exterior angle of ' + reg(n) + '?', ans: String(ext), unit: '°', why: 'The exterior angles of any polygon add up to 360° (one full turn). A regular polygon has ' + n + ' equal ones: 360 ÷ ' + n + ' = ' + ext + '°.' };
                return { q: 'Each exterior angle of a regular polygon is ' + ext + '°. How many sides does it have?', ans: String(n), unit: 'sides', why: 'The exterior angles of a polygon add up to 360°, so the number of sides is 360 ÷ ' + ext + ' = ' + n + '.' };
            }
            const n = R.pick([5, 6]), S = (n - 2) * 180;
            let A, last;
            do { A = []; for (let i = 0; i < n - 1; i++) A.push(R.int(90, n === 5 ? 140 : 160)); last = S - A.reduce((x, y) => x + y, 0); } while (last < 60 || last > 175);
            const part = S - last;
            return {
                q: (n === 5 ? 'Four of the angles of a pentagon are ' : 'Five of the angles of a hexagon are ') + listAnd(A.map(x => x + '°')) + '. What is the ' + (n === 5 ? 'fifth' : 'sixth') + ' angle?',
                ans: String(last), unit: '°',
                why: 'The angles of ' + an(NM[n]) + ' add up to (' + n + ' − 2) × 180 = ' + S + '°. ' + A.join(' + ') + ' = ' + part + ', so the missing angle is ' + S + ' − ' + part + ' = ' + last + '°.'
            };
        },

        // Area and perimeter of rectangles
        "mt_eiB3-6pu6a": function (R) {
            const t = R.int(1, 5);
            if (t === 1) {
                let l, w; do { l = R.int(3, 15); w = R.int(2, 12); } while (l <= w);
                const [thing, u] = R.pick([['A rectangle', R.pick(['cm', 'm'])], ['A rectangular garden', 'm'], ['A rectangular playground', 'm'], ['A rectangular poster', 'cm'], ['A rectangular photo', 'cm']]);
                const A = l * w, P = 2 * (l + w), area = R.chance(0.5);
                const q = thing + ' is ' + l + ' ' + u + ' long and ' + w + ' ' + u + ' wide. What is its ' + (area ? 'area' : 'perimeter') + '?';
                const why = area
                    ? 'Area = length × width = ' + l + ' × ' + w + ' = ' + A + ' ' + u + '². (' + P + ' ' + u + ' would be the perimeter — the distance around the edge.)'
                    : 'Perimeter = 2 × (length + width) = 2 × (' + l + ' + ' + w + ') = 2 × ' + (l + w) + ' = ' + P + ' ' + u + '. (' + A + ' ' + u + '² would be the area.)';
                if (R.chance(0.5)) return { q, ans: String(area ? A : P), unit: area ? u + '²' : u, why };
                return area
                    ? { q, a: mc(R, A + ' ' + u + '²', [P, l + w, 2 * A].map(x => x + ' ' + u + '²'), near(R, A, 10, 1, x => x + ' ' + u + '²')), why }
                    : { q, a: mc(R, P + ' ' + u, [A, l + w, 2 * l + w].map(x => x + ' ' + u), near(R, P, 8, 1, x => x + ' ' + u)), why };
            }
            if (t === 2) {
                let l, w; do { l = R.int(4, 15); w = R.int(2, 12); } while (l <= w);
                if (R.chance(0.5)) return { q: 'A rectangular room has an area of ' + (l * w) + ' m² and a length of ' + l + ' m. How wide is it?', ans: String(w), unit: 'm', why: 'Area = length × width, so width = area ÷ length = ' + (l * w) + ' ÷ ' + l + ' = ' + w + ' m.' };
                const P = 2 * (l + w);
                return { q: 'A rectangle has a perimeter of ' + P + ' cm and a length of ' + l + ' cm. What is its width?', ans: String(w), unit: 'cm', why: 'Perimeter = 2 × (length + width), so length + width = ' + P + ' ÷ 2 = ' + (l + w) + '. Width = ' + (l + w) + ' − ' + l + ' = ' + w + ' cm.' };
            }
            if (t === 3) {
                const k = R.int(1, 9), s10 = 10 * k + 5, s = plain(s10 / 10);   // side 1.5 ... 9.5 cm, kept as tenths
                if (R.chance(0.6)) {
                    const A = plain(s10 * s10 / 100);
                    return { q: 'A square has sides of ' + s + ' cm. What is its area?', ans: A, unit: 'cm²', why: 'Area = ' + s + ' × ' + s + ' = ' + A + ' cm². (' + k + ' × ' + s + ' = ' + plain(k * s10 / 10) + ', plus 0.5 × ' + s + ' = ' + plain(s10 / 20) + '.)' };
                }
                return { q: 'A square has sides of ' + s + ' cm. What is its perimeter?', ans: plain(4 * s10 / 10), unit: 'cm', why: 'A square has 4 equal sides: 4 × ' + s + ' = ' + plain(4 * s10 / 10) + ' cm.' };
            }
            if (t === 4) {
                const OPTS = ['Rectangle A', 'Rectangle B', 'They are the same'];
                if (R.chance(0.5)) {
                    const S = R.int(8, 14);
                    let a, b; do { a = R.int(2, S - 2); b = R.int(2, S - 2); } while (a === b || a === S - b || a < S - a || b < S - b);
                    const A1 = a * (S - a), A2 = b * (S - b), ans = A1 > A2 ? OPTS[0] : OPTS[1];
                    return {
                        q: 'Rectangle A is ' + a + ' cm by ' + (S - a) + ' cm. Rectangle B is ' + b + ' cm by ' + (S - b) + ' cm. Both have a perimeter of ' + (2 * S) + ' cm. Which has the larger area?',
                        a: [ans].concat(OPTS.filter(x => x !== ans)),
                        why: 'The same perimeter does not mean the same area. A: ' + a + ' × ' + (S - a) + ' = ' + A1 + ' cm². B: ' + b + ' × ' + (S - b) + ' = ' + A2 + ' cm². So ' + ans + ' has the larger area.'
                    };
                }
                const N = R.pick([12, 16, 18, 20, 24, 30, 36, 40, 48]);
                const pairs = []; for (let i = 1; i * i < N; i++) if (N % i === 0) pairs.push([N / i, i]);
                const [p1, p2] = R.sample(pairs, 2), P1 = 2 * (p1[0] + p1[1]), P2 = 2 * (p2[0] + p2[1]), ans = P1 > P2 ? OPTS[0] : OPTS[1];
                return {
                    q: 'Rectangle A is ' + p1[0] + ' cm by ' + p1[1] + ' cm. Rectangle B is ' + p2[0] + ' cm by ' + p2[1] + ' cm. Both have an area of ' + N + ' cm². Which has the longer perimeter?',
                    a: [ans].concat(OPTS.filter(x => x !== ans)),
                    why: 'The same area does not mean the same perimeter. A: 2 × (' + p1[0] + ' + ' + p1[1] + ') = ' + P1 + ' cm. B: 2 × (' + p2[0] + ' + ' + p2[1] + ') = ' + P2 + ' cm. So ' + ans + ' has the longer perimeter.'
                };
            }
            const whole = R.int(8, 30), halves = 2 * R.int(2, 8);
            const thing = R.pick(['a pond', 'a puddle', 'a leaf', 'an island on a map', 'a footprint']);
            return {
                q: cap(thing) + ' is drawn on a centimetre-squared grid. It covers ' + whole + ' whole squares and ' + halves + ' half squares. Estimate its area.',
                ans: String(whole + halves / 2), unit: 'cm²',
                why: 'Two half squares make about one whole square, so ' + halves + ' halves ≈ ' + (halves / 2) + ' whole squares. ' + whole + ' + ' + (halves / 2) + ' = ' + (whole + halves / 2) + ' cm².'
            };
        },

        // Area of Triangles & Parallelograms
        "mt_ML5t7n2-U8": function (R) {
            const t = R.int(1, 5);
            if (t === 1) {
                let b, h; do { b = R.int(4, 20); h = R.int(3, 15); } while ((b * h) % 2);
                const obtuse = R.chance(0.3);
                return {
                    q: obtuse ? 'An obtuse-angled triangle has a base of ' + b + ' cm. Its perpendicular height, measured outside the triangle, is ' + h + ' cm. What is its area?'
                        : 'A triangle has a base of ' + b + ' cm and a perpendicular height of ' + h + ' cm. What is its area?',
                    ans: String(b * h / 2), unit: 'cm²',
                    why: 'Area of a triangle = ½ × base × perpendicular height = ½ × ' + b + ' × ' + h + ' = ' + (b * h / 2) + ' cm². It is half of a ' + (obtuse ? 'parallelogram' : 'rectangle') + ' with the same base and height (' + (b * h) + ' cm²).'
                };
            }
            if (t === 2) {
                const b = R.int(6, 15), h = R.int(3, 10), s = h + R.int(1, 4);
                return {
                    q: 'A parallelogram has a base of ' + b + ' cm, a sloping side of ' + s + ' cm and a perpendicular height of ' + h + ' cm. What is its area?',
                    a: mc(R, (b * h) + ' cm²', [b * s, b * h / 2, 2 * (b + s)].map(x => plain(x) + ' cm²'), near(R, b * h, 10, 1, x => x + ' cm²')),
                    why: 'Area of a parallelogram = base × perpendicular height = ' + b + ' × ' + h + ' = ' + (b * h) + ' cm². The ' + s + ' cm sloping side is not the height, so ' + b + ' × ' + s + ' = ' + (b * s) + ' is wrong.'
                };
            }
            if (t === 3) {
                if (R.chance(0.5)) {
                    let a, b; do { a = R.int(3, 12); b = R.int(3, 12); } while ((a * b) % 2 || a === b);
                    return { q: 'A right-angled triangle has two shorter sides of ' + a + ' cm and ' + b + ' cm, which meet at the right angle. What is its area?', ans: String(a * b / 2), unit: 'cm²', why: 'The two shorter sides are the base and the perpendicular height. The triangle is half of a ' + a + ' cm by ' + b + ' cm rectangle: ' + a + ' × ' + b + ' = ' + (a * b) + ', and half of that is ' + (a * b / 2) + ' cm².' };
                }
                // a real triangle: sloping sides from Pythagorean triples, so the numbers fit together
                const H = { 3: [[4, 5]], 4: [[3, 5]], 5: [[12, 13]], 6: [[8, 10]], 8: [[6, 10], [15, 17]], 9: [[12, 15]], 12: [[5, 13], [9, 15], [16, 20]], 15: [[8, 17]], 16: [[12, 20]] };
                const h = Number(R.pick(Object.keys(H))), [x1, s1] = R.pick(H[h]), [x2, s2] = R.pick(H[h]), base = x1 + x2, A = base * h / 2;
                return {
                    q: 'A triangle has a base of ' + base + ' cm and sloping sides of ' + s1 + ' cm and ' + s2 + ' cm. Its perpendicular height is ' + h + ' cm. What is its area?',
                    a: mc(R, plain(A) + ' cm²', [base * s1 / 2, base * h, base * s2 / 2, s1 * s2 / 2].map(x => plain(x) + ' cm²'), near(R, A, 12, 1, x => x + ' cm²')),
                    why: 'Use the perpendicular height, not a sloping side: ½ × ' + base + ' × ' + h + ' = ' + plain(A) + ' cm².'
                };
            }
            if (t === 4) {
                if (R.chance(0.5)) {
                    let b, h; do { b = R.int(4, 16); h = R.int(3, 14); } while ((b * h) % 2);
                    const A = b * h / 2;
                    return { q: 'A triangle has an area of ' + A + ' cm² and a base of ' + b + ' cm. What is its perpendicular height?', ans: String(h), unit: 'cm', why: 'Area = ½ × base × height. Double the area to undo the ½: ' + (2 * A) + ' = ' + b + ' × height, so height = ' + (2 * A) + ' ÷ ' + b + ' = ' + h + ' cm.' };
                }
                const b = R.int(4, 15), h = R.int(2, 12);
                return { q: 'A parallelogram has an area of ' + (b * h) + ' cm² and a base of ' + b + ' cm. What is its perpendicular height?', ans: String(h), unit: 'cm', why: 'Area = base × perpendicular height, so height = ' + (b * h) + ' ÷ ' + b + ' = ' + h + ' cm.' };
            }
            const odd = R.pick(['An irregular leaf shape', 'The outline of a puddle', 'A map of an island', 'A footprint', 'A blob of spilt paint']);
            const regs = R.sample(['A parallelogram', 'A right-angled triangle', 'A rectangle', 'An obtuse-angled triangle', 'A square', 'A triangle'], 3);
            return {
                q: 'For which shape would you need to estimate the area by counting squares on a grid, because no area formula fits it?',
                a: [odd].concat(regs),
                why: odd + ' has curved, irregular edges, so count whole squares and pair up part squares. Rectangles (l × w), parallelograms (b × h) and triangles (½ × b × h) all have formulae.'
            };
        },

        // Volume of cuboids
        "mt_nTL-owFJTF": function (R) {
            const t = R.int(1, 5);
            const dims = () => { let l, w, h; do { l = R.int(2, 12); w = R.int(2, 10); h = R.int(2, 10); } while (l * w * h > 600); return [l, w, h]; };
            if (t === 1 || t === 2) {
                const [l, w, h] = dims(), V = l * w * h, u = R.chance(0.75) ? 'cm' : 'm', U = u + '³';
                const q = (u === 'cm' ? R.pick(['A cuboid', 'A box']) : R.pick(['A cuboid', 'A shipping container'])) + ' measures ' + l + ' ' + u + ' by ' + w + ' ' + u + ' by ' + h + ' ' + u + '. What is its volume?';
                const why = 'Volume = length × width × height = ' + l + ' × ' + w + ' × ' + h + ' = ' + V + ' ' + U + '.';
                if (t === 1) return { q, ans: String(V), unit: U, why };
                return { q, a: mc(R, V + ' ' + U, [l + w + h, 2 * (l * w + l * h + w * h), l * w, 4 * (l + w + h)].map(x => x + ' ' + U), near(R, V, 20, 1, x => x + ' ' + U)), why: why + ' (Adding the edges or finding the area of the faces does not give the volume.)' };
            }
            if (t === 3) {
                const [l, w, h] = dims();
                if (R.chance(0.5)) return { q: 'A box has a base area of ' + (l * w) + ' cm² and a height of ' + h + ' cm. What is its volume?', ans: String(l * w * h), unit: 'cm³', why: 'Volume = base area × height = ' + (l * w) + ' × ' + h + ' = ' + (l * w * h) + ' cm³.' };
                return { q: 'A cuboid has a volume of ' + (l * w * h) + ' cm³. It is ' + l + ' cm long and ' + w + ' cm wide. How tall is it?', ans: String(h), unit: 'cm', why: 'Base area = ' + l + ' × ' + w + ' = ' + (l * w) + ' cm². Height = volume ÷ base area = ' + (l * w * h) + ' ÷ ' + (l * w) + ' = ' + h + ' cm.' };
            }
            if (t === 4) {
                if (R.chance(0.4)) {
                    const e = R.int(2, 10), V = e * e * e;
                    return { q: 'A cube has edges of ' + e + ' cm. What is its volume?', ans: big(V), unit: 'cm³', why: 'All the edges of a cube are the same length: ' + e + ' × ' + e + ' × ' + e + ' = ' + fmt(V) + ' cm³.' };
                }
                const [l, w, h] = dims();
                return { q: 'How many 1 cm cubes are needed to fill a box ' + l + ' cm long, ' + w + ' cm wide and ' + h + ' cm high?', ans: String(l * w * h), unit: 'cubes', why: 'One layer on the bottom needs ' + l + ' × ' + w + ' = ' + (l * w) + ' cubes. There are ' + h + ' layers: ' + (l * w) + ' × ' + h + ' = ' + (l * w * h) + ' cubes.' };
            }
            const [l, w, h] = dims(), V = l * w * h, M = V + R.pick([-3, -2, -1, 0, 1, 2, 3]);
            const ans = V > M ? 'Model A' : V < M ? 'Model B' : 'They are the same';
            return {
                q: 'Model A is a cuboid ' + l + ' cm × ' + w + ' cm × ' + h + ' cm. Model B is an irregular shape made from ' + M + ' centimetre cubes. Which has the bigger volume?',
                a: [ans].concat(['Model A', 'Model B', 'They are the same'].filter(x => x !== ans)),
                why: 'Model A is a cuboid, so use the formula: ' + l + ' × ' + w + ' × ' + h + ' = ' + V + ' cm³. Model B is irregular, so count its cubes: ' + M + ' cm³. ' + (ans === 'They are the same' ? 'They are equal.' : ans + ' is bigger.')
            };
        },

        // Converting measurement units
        "mt_d8al9JcajP": function (R) {
            if (R.chance(0.08)) return { q: 'Why can\'t you change "3 months" into an exact number of days?', a: ['Months have different numbers of days', 'A month is always 30 days', 'A month is always exactly 4 weeks', 'Days are too small to count'], why: 'Months have 28, 29, 30 or 31 days, so 3 months could be anything from 89 to 92 days. Fixed units like weeks (7 days) convert exactly.' };
            const t = R.int(1, 4);
            if (t === 1) {
                const [bu, su, Fc, bn, sn] = R.pick([['km', 'm', 1000, 'kilometres', 'metres'], ['m', 'cm', 100, 'metres', 'centimetres'], ['cm', 'mm', 10, 'centimetres', 'millimetres'], ['m', 'mm', 1000, 'metres', 'millimetres'], ['kg', 'g', 1000, 'kilograms', 'grams'], ['l', 'ml', 1000, 'litres', 'millilitres']]);
                // a mix of 1, 2 and 3 decimal places in the bigger unit
                let N; do { N = Fc === 1000 ? R.pick([R.int(1, 9999), R.int(1, 999) * 10, R.int(1, 99) * 100]) : Fc === 100 ? R.pick([R.int(1, 999), R.int(1, 99) * 10]) : R.int(1, 999); } while (N % Fc === 0);
                const B = N / Fc;   // N is a whole number of the small unit, so B is exact (at most 3 dp)
                if (R.chance(0.5)) return { q: 'Convert ' + fmt(B) + ' ' + bn + ' to ' + sn + '.', ans: big(N), unit: su, why: '1 ' + bu + ' = ' + fmt(Fc) + ' ' + su + '. ' + cap(sn) + ' are smaller, so there are more of them: multiply by ' + fmt(Fc) + '. ' + fmt(B) + ' × ' + fmt(Fc) + ' = ' + fmt(N) + ' ' + su + '.' };
                return { q: 'Convert ' + fmt(N) + ' ' + sn + ' to ' + bn + '.', ans: plain(B), unit: bu, why: fmt(Fc) + ' ' + su + ' = 1 ' + bu + '. ' + cap(bn) + ' are bigger, so there are fewer of them: divide by ' + fmt(Fc) + '. ' + fmt(N) + ' ÷ ' + fmt(Fc) + ' = ' + fmt(B) + ' ' + bu + '.' };
            }
            if (t === 2) {
                const f = R.int(1, 4);
                if (f === 1) { const h = R.int(1, 5), m = R.int(1, 11) * 5; return { q: 'How many minutes are there in ' + h + ' hour' + (h > 1 ? 's' : '') + ' ' + m + ' minutes?', ans: String(h * 60 + m), unit: 'minutes', why: '1 hour = 60 minutes (not 100). ' + h + ' × 60 = ' + (h * 60) + ', plus ' + m + ' = ' + (h * 60 + m) + ' minutes.' }; }
                if (f === 2) { const m = R.int(1, 9), s = R.int(1, 59); return { q: 'How many seconds are there in ' + m + ' minute' + (m > 1 ? 's' : '') + ' ' + s + ' second' + (s > 1 ? 's' : '') + '?', ans: String(m * 60 + s), unit: 'seconds', why: '1 minute = 60 seconds. ' + m + ' × 60 = ' + (m * 60) + ', plus ' + s + ' = ' + (m * 60 + s) + ' seconds.' }; }
                if (f === 3) { const w = R.int(2, 12), d = R.int(1, 6); return { q: 'How many days are there in ' + w + ' weeks ' + d + ' day' + (d > 1 ? 's' : '') + '?', ans: String(w * 7 + d), unit: 'days', why: '1 week = 7 days. ' + w + ' × 7 = ' + (w * 7) + ', plus ' + d + ' = ' + (w * 7 + d) + ' days.' }; }
                const y = R.int(1, 9), mo = R.int(1, 11);
                return { q: 'How many months are there in ' + y + ' year' + (y > 1 ? 's' : '') + ' ' + mo + ' month' + (mo > 1 ? 's' : '') + '?', ans: String(y * 12 + mo), unit: 'months', why: '1 year = 12 months. ' + y + ' × 12 = ' + (y * 12) + ', plus ' + mo + ' = ' + (y * 12 + mo) + ' months.' };
            }
            if (t === 3) {
                if (R.chance(0.5)) {
                    const m = R.int(1, 5), s = R.int(1, 11) * 5, S = m * 60 + s;
                    const show = (a, b) => a + ' minute' + (a === 1 ? '' : 's') + ' ' + b + ' seconds';
                    const wr = [];
                    if (S % 100 < 60) wr.push(show(Math.floor(S / 100), S % 100));
                    if (m > 1) wr.push(show(m - 1, s));
                    wr.push(show(m + 1, s));
                    if (60 - s !== s) wr.push(show(m, 60 - s));
                    return {
                        q: 'What is ' + S + ' seconds in minutes and seconds?',
                        a: mc(R, show(m, s), wr, () => show(m, R.int(1, 11) * 5)),
                        why: '1 minute = 60 seconds (not 100). ' + S + ' = ' + (m * 60) + ' + ' + s + ', and ' + (m * 60) + ' seconds = ' + m + ' minute' + (m === 1 ? '' : 's') + '. So it is ' + show(m, s) + '.'
                    };
                }
                const w = R.int(1, 4), q4 = R.int(1, 3), hs = plain(w + q4 / 4), mins = w * 60 + q4 * 15;
                const part = ['', 'a quarter', 'a half', 'three quarters'][q4];
                return {
                    q: 'How many minutes are there in ' + hs + ' hours?',
                    a: mc(R, mins + ' minutes', [w * 60 + Number(hs.split('.')[1]), Math.round((w + q4 / 4) * 100), w * 60 + q4 * 10].map(x => x + ' minutes'), near(R, mins, 30, 30, x => x + ' minutes')),
                    why: '0.' + hs.split('.')[1] + ' of an hour is ' + part + ' of 60 minutes = ' + (q4 * 15) + ' minutes. So ' + hs + ' hours = ' + w + ' × 60 + ' + (q4 * 15) + ' = ' + mins + ' minutes.'
                };
            }
            const h = R.pick([0.25, 0.5, 0.75, 1.5, 2.5, 1.25, 3.5, 2, 3]), min = h * 60, sec = min * 60;
            return { q: 'How many seconds are there in ' + plain(h) + ' hours?', ans: big(sec), unit: 'seconds', why: 'First change to minutes: ' + plain(h) + ' × 60 = ' + min + ' minutes. Then to seconds: ' + min + ' × 60 = ' + fmt(sec) + ' seconds.' };
        },

        // Parts of a circle
        "mt_xq3YHZ2zeR": function (R) {
            const t = R.int(1, 4);
            const u = R.pick(['cm', 'cm', 'm', 'mm']);
            if (t === 1) {
                const r10 = R.chance(0.4) ? R.int(1, 19) * 10 + 5 : R.int(2, 25) * 10, r = plain(r10 / 10), d = plain(r10 / 5);
                return { q: 'A circle has a radius of ' + r + ' ' + u + '. What is its diameter?', ans: d, unit: u, why: 'The diameter goes right across the circle through the centre, so it is two radii: 2 × ' + r + ' = ' + d + ' ' + u + '.' };
            }
            if (t === 2) {
                const d = R.int(3, 40), r = plain(d / 2);
                return { q: 'A circle has a diameter of ' + d + ' ' + u + '. What is its radius?', ans: r, unit: u, why: 'The radius goes from the centre to the edge, which is half the diameter: ' + d + ' ÷ 2 = ' + r + ' ' + u + '.' };
            }
            if (t === 3) {
                const T = {
                    Radius: ['What do we call the distance from the centre of a circle to its edge?', 'The distance from the centre to the edge', 'The radius goes from the centre to the edge. It is half the diameter.'],
                    Diameter: ['What do we call a straight line from edge to edge of a circle, through the centre?', 'A straight line across the circle, through the centre', 'The diameter goes from edge to edge through the centre, so it is two radii long.'],
                    Circumference: ['What do we call the distance all the way round a circle?', 'The distance all the way round the edge', 'The circumference is the distance all the way round — the perimeter of the circle.'],
                    Centre: ['What do we call the point in the middle of a circle, the same distance from every point on the edge?', 'The point in the middle', 'The centre is the middle point. Every point on the edge is one radius away from it.']
                };
                const keys = Object.keys(T), k = R.pick(keys), f = R.int(1, 3);
                if (f === 1) return { q: T[k][0], a: [k].concat(keys.filter(x => x !== k)), why: T[k][2] };
                if (f === 2) return { q: 'What is the **' + k.toLowerCase() + '** of a circle?', a: [T[k][1]].concat(keys.filter(x => x !== k).map(x => T[x][1])), why: T[k][2] };
                if (R.chance(0.5)) return { q: 'The diameter of a circle is always…', a: ['twice as long as the radius', 'half as long as the radius', 'the same length as the radius', 'the same length as the circumference'], why: 'The diameter is made of two radii end to end, so it is twice the radius. If the radius is 4 cm, the diameter is 8 cm.' };
                return { q: 'The radius of a circle is always…', a: ['half the diameter', 'twice the diameter', 'the same as the diameter', 'the same as the circumference'], why: 'The radius goes from the centre to the edge — half way across — so it is half the diameter. If the diameter is 10 cm, the radius is 5 cm.' };
            }
            const f = R.int(1, 3);
            if (f === 1) {
                const n = R.int(2, 5), r10 = R.pick([10, 15, 20, 25, 30, 35, 40]), r = plain(r10 / 10), d = plain(r10 / 5), tot = plain(n * r10 / 5);
                return { q: n + ' coins, each with a radius of ' + r + ' cm, are placed in a straight row, touching each other. How long is the row?', ans: tot, unit: 'cm', why: 'Each coin is one diameter across: 2 × ' + r + ' = ' + d + ' cm. ' + n + ' coins: ' + n + ' × ' + d + ' = ' + tot + ' cm.' };
            }
            if (f === 2) {
                const r = R.int(25, 45);
                return { q: 'A bicycle wheel has spokes ' + r + ' cm long, going from the centre to the rim. What is the diameter of the wheel?', ans: String(2 * r), unit: 'cm', why: 'Each spoke is a radius (' + r + ' cm). The diameter is two radii: 2 × ' + r + ' = ' + (2 * r) + ' cm.' };
            }
            const d = R.int(2, 12) * 2;
            return { q: 'A round pond has a diameter of ' + d + ' m. A frog sits exactly in the centre. How far is it from the frog to the edge of the pond?', ans: String(d / 2), unit: 'm', why: 'From the centre to the edge is the radius, which is half the diameter: ' + d + ' ÷ 2 = ' + (d / 2) + ' m.' };
        },

        // ===================================================================
        // PATTERN PULSAR
        // ===================================================================

        // Linear number sequences
        "mt_hBZwbst0ow": function (R) {
            // terms are kept as whole numbers of 10^-dp so decimal steps never drift
            let dp, s, k;
            const type = R.int(1, 3);
            if (type === 1) { dp = 0; const m = R.int(2, 9); if (R.chance(0.5)) { k = -m; s = R.int(m, 3 * m); } else { k = m; s = -R.int(m, 3 * m); } }
            else if (type === 2) { dp = 1; k = R.pick([2, 3, 4, 5, 6, 7, 8, 12, 15, 25]) * (R.chance(0.4) ? -1 : 1); s = R.int(-30, 60); }
            else { dp = 2; k = R.pick([5, 15, 25, 75, 125]) * (R.chance(0.4) ? -1 : 1); s = R.int(-20, 60) * 5; }
            const sc = Math.pow(10, dp), unit = dp === 2 ? 5 : 1;
            const term = (i) => (s + (i - 1) * k) / sc;
            const show = (v) => num(v, dp);
            const step = Math.abs(k) / sc, stepS = fmt(step), op = k > 0 ? ' + ' : ' − ';
            const rule = (kk) => (kk > 0 ? 'add ' : 'subtract ') + fmt(Math.abs(kk) / sc);
            const first4 = [1, 2, 3, 4].map(i => show(term(i))).join(', ') + ', …';
            const t = R.int(1, 4);
            if (t === 1) return { q: 'What is the next term in this sequence?  ' + first4, ans: plain(term(5)), why: 'The rule is ' + rule(k) + ': ' + show(term(4)) + op + stepS + ' = ' + show(term(5)) + '.' };
            if (t === 2) {
                return {
                    q: 'What is the term-to-term rule for this sequence?  ' + first4,
                    a: mc(R, rule(k), [rule(-k), rule(2 * k), rule(k + Math.sign(k) * unit), rule(k - Math.sign(k) * unit)].filter(x => !/ 0$/.test(x)), () => rule((R.chance(0.5) ? 1 : -1) * (Math.abs(k) + unit * R.int(1, 5)))),
                    why: 'Each term is ' + stepS + ' ' + (k > 0 ? 'more' : 'less') + ' than the one before (' + show(term(1)) + ' → ' + show(term(2)) + ' → ' + show(term(3)) + '), so the rule is ' + rule(k) + '.'
                };
            }
            if (t === 3) {
                const n = R.int(8, 15);
                return { q: 'Using the rule, what is the ' + n + 'th term of this sequence?  ' + first4, ans: plain(term(n)), why: 'The rule is ' + rule(k) + '. From the 1st term to the ' + n + 'th is ' + (n - 1) + ' steps: ' + show(term(1)) + op + (n - 1) + ' × ' + stepS + ' = ' + show(term(1)) + op + fmt((n - 1) * step) + ' = ' + show(term(n)) + '.' };
            }
            return { q: 'What is the missing term?  ' + show(term(1)) + ', ' + show(term(2)) + ', ?, ' + show(term(4)) + ', ' + show(term(5)), ans: plain(term(3)), why: 'The rule is ' + rule(k) + ': ' + show(term(2)) + op + stepS + ' = ' + show(term(3)) + '. Check: ' + show(term(3)) + op + stepS + ' = ' + show(term(4)) + '.' };
        },

        // Using Simple Formulae
        "mt_Jvg8X0N5u0": function (R) {
            const t = R.int(1, 4);
            if (t === 1) {
                const f = R.int(1, 4);
                if (f === 1) { const l = R.int(3, 20), w = R.int(2, 15); return { q: 'The perimeter of a rectangle is P = 2 × (l + w). Find P when l = ' + l + ' cm and w = ' + w + ' cm.', ans: String(2 * (l + w)), unit: 'cm', why: 'Work out the bracket first: ' + l + ' + ' + w + ' = ' + (l + w) + '. Then P = 2 × ' + (l + w) + ' = ' + (2 * (l + w)) + ' cm.' }; }
                if (f === 2) { let b, h; do { b = R.int(3, 20); h = R.int(2, 15); } while ((b * h) % 2); return { q: 'The area of a triangle is A = ½ × b × h. Find A when b = ' + b + ' cm and h = ' + h + ' cm.', ans: String(b * h / 2), unit: 'cm²', why: 'A = ½ × ' + b + ' × ' + h + ' = ½ × ' + (b * h) + ' = ' + (b * h / 2) + ' cm².' }; }
                if (f === 3) { const c = R.int(2, 15), h = R.int(2, 20); return { q: 'On a farm, the number of legs is L = 4c + 2h, where c is the number of cows and h is the number of hens. Find L when c = ' + c + ' and h = ' + h + '.', ans: String(4 * c + 2 * h), unit: 'legs', why: 'L = 4 × ' + c + ' + 2 × ' + h + ' = ' + (4 * c) + ' + ' + (2 * h) + ' = ' + (4 * c + 2 * h) + '.' }; }
                const n = R.int(5, 30);
                return { q: 'The number of matchsticks needed to make n squares in a row is M = 3n + 1. How many matchsticks are needed for ' + n + ' squares?', ans: String(3 * n + 1), unit: 'matchsticks', why: 'M = 3 × ' + n + ' + 1 = ' + (3 * n) + ' + 1 = ' + (3 * n + 1) + '. Multiply before adding.' };
            }
            const C = R.pick([
                { intro: (f, r) => 'A taxi charges £' + f + ' plus £' + r + ' for every mile.', ask: (n) => 'How much does a ' + n + '-mile journey cost?', rev: (T) => 'A taxi journey cost £' + T + '. How many miles was it?', gen: () => [R.int(3, 6), R.int(2, 4), R.int(3, 12)], m: true, per: 'mile', nu: 'miles' },
                { intro: (f, r) => 'Bike hire costs £' + f + ' plus £' + r + ' per hour.', ask: (n) => 'How much does it cost to hire a bike for ' + n + ' hours?', rev: (T) => 'Hiring a bike cost £' + T + '. For how many hours was it hired?', gen: () => [R.int(5, 10), R.int(3, 6), R.int(2, 8)], m: true, per: 'hour', nu: 'hours' },
                { intro: (f, r) => 'A plumber charges a £' + f + ' call-out fee plus £' + r + ' per hour.', ask: (n) => 'How much is the bill for a ' + n + '-hour job?', rev: (T) => 'A plumber\'s bill was £' + T + '. How many hours did the plumber work?', gen: () => [R.int(5, 12) * 5, R.int(4, 8) * 5, R.int(2, 6)], m: true, per: 'hour', nu: 'hours' },
                { intro: (f, r) => 'A hall costs £' + f + ' to hire, plus £' + r + ' for each guest.', ask: (n) => 'How much does a party for ' + n + ' guests cost?', rev: (T) => 'A party cost £' + T + '. How many guests were there?', gen: () => [R.int(4, 10) * 10, R.int(3, 9), R.int(10, 30)], m: true, per: 'guest', nu: 'guests' },
                { intro: (f, r) => 'To cook a chicken, allow ' + r + ' minutes per kilogram plus an extra ' + f + ' minutes.', ask: (n) => 'How long does a ' + n + ' kg chicken take to cook?', rev: (T) => 'A chicken took ' + T + ' minutes to cook. How many kilograms did it weigh?', gen: () => [R.pick([15, 20, 25]), R.pick([40, 45]), R.int(2, 4)], m: false, per: 'kg', nu: 'kg' }
            ]);
            const [f, r, n] = C.gen(), T = f + r * n;
            const cur = (x) => (C.m ? '£' + x : x + ' minutes');
            const work = (C.m ? 'Cost' : 'Time') + ' = ' + (C.m ? '£' : '') + r + ' × ' + n + ' + ' + (C.m ? '£' : '') + f + ' = ' + cur(r * n) + ' + ' + cur(f) + ' = ' + cur(T) + '.';
            if (t === 2) { const it = { q: C.intro(f, r) + ' ' + C.ask(n), ans: String(T), why: work }; if (!C.m) it.unit = 'minutes'; return it; }
            if (t === 3) {
                return {
                    q: C.intro(f, r) + ' ' + C.ask(n),
                    a: mc(R, cur(T), [r * n, r + n + f, r * (n + f), f * n + r].map(cur), near(R, T, 10, 1, cur)),
                    why: work + ' Remember to add the fixed ' + cur(f) + ' only once.'
                };
            }
            return { q: C.intro(f, r) + ' ' + C.rev(T), ans: String(n), unit: C.nu, why: 'Take off the fixed ' + cur(f) + ': ' + T + ' − ' + f + ' = ' + (T - f) + '. Then divide by the ' + cur(r) + ' per ' + C.per + ': ' + (T - f) + ' ÷ ' + r + ' = ' + n + ' ' + C.nu + '.' };
        },

        // Substituting into Formulae
        "mt_vHzVa3SURC": function (R) {
            const t = R.int(1, 4);
            const v = R.pick(['a', 'x', 'n', 'y', 'p', 'm']);
            if (t === 1) {
                const a = R.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9]), k = R.int(2, 9), c = R.int(1, 12), f = R.int(1, 4);
                let expr, val, why;
                if (f === 1) { expr = k + v + ' + ' + c; val = k * a + c; why = k + v + ' means ' + k + ' × ' + v + ' = ' + k + ' × ' + par(a) + ' = ' + num(k * a) + '. Then ' + num(k * a) + ' + ' + c + ' = ' + num(val) + '.'; }
                else if (f === 2) { expr = k + v + ' − ' + c; val = k * a - c; why = k + v + ' means ' + k + ' × ' + v + ' = ' + k + ' × ' + par(a) + ' = ' + num(k * a) + '. Then ' + num(k * a) + ' − ' + c + ' = ' + num(val) + '.'; }
                else if (f === 3) { expr = c + ' − ' + k + v; val = c - k * a; why = k + v + ' = ' + k + ' × ' + par(a) + ' = ' + num(k * a) + '. Then ' + c + ' − ' + par(k * a) + ' = ' + num(val) + '.'; }
                else { expr = k + '(' + v + ' + ' + c + ')'; val = k * (a + c); why = 'Bracket first: ' + par(a) + ' + ' + c + ' = ' + num(a + c) + '. Then ' + k + ' × ' + par(a + c) + ' = ' + num(val) + '.'; }
                return { q: 'If ' + v + ' = ' + num(a) + ', what is **' + expr + '**?', ans: plain(val), why };
            }
            if (t === 2) {
                const f = R.int(1, 4);
                if (f === 1) {
                    const x = -R.int(3, 9);
                    return { q: 'If ' + v + ' = ' + num(x) + ', what is **' + v + '²**?', a: mc(R, String(x * x), [num(-x * x), num(2 * x), num(-2 * x)], near(R, x * x, 8, 1, num)), why: v + '² means ' + v + ' × ' + v + ' = ' + par(x) + ' × ' + par(x) + ' = ' + (x * x) + '. A negative times a negative is positive. (It is not 2 × ' + par(x) + '.)' };
                }
                if (f === 2) {
                    const x = R.int(2, 6), k = R.int(2, 5);
                    return { q: 'If ' + v + ' = ' + x + ', what is **' + k + v + '²**?', a: mc(R, String(k * x * x), [String((k * x) * (k * x)), String(k * x * 2), String(k + x * x)], near(R, k * x * x, 10, 1)), why: k + v + '² means ' + k + ' × ' + v + '²: square first, ' + x + '² = ' + (x * x) + ', then ' + k + ' × ' + (x * x) + ' = ' + (k * x * x) + '. (' + k + ' × ' + x + ')² = ' + ((k * x) * (k * x)) + ' would be wrong.' };
                }
                if (f === 3) {
                    const x = R.int(2, 9), k = R.int(2, 9);
                    return { q: 'If ' + v + ' = ' + x + ', what is **' + k + v + '**?', a: mc(R, String(k * x), [String(k) + x, String(k + x), String(x) + k], near(R, k * x, 6, 1, String)), why: k + v + ' means ' + k + ' × ' + v + ' = ' + k + ' × ' + x + ' = ' + (k * x) + '. It does not mean putting the digits together to make ' + k + x + '.' };
                }
                const x = R.int(2, 5);
                return { q: 'If ' + v + ' = ' + x + ', what is **' + v + '³**?', a: mc(R, String(x * x * x), [String(3 * x), String(x * x), String(x + 3)], near(R, x * x * x, 8, 1, String)), why: v + '³ means ' + v + ' × ' + v + ' × ' + v + ' = ' + x + ' × ' + x + ' × ' + x + ' = ' + (x * x * x) + ' (not 3 × ' + x + ' = ' + (3 * x) + ').' };
            }
            if (t === 3) {
                const a = R.int(2, 9), b = R.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), c = R.int(1, 9), f = R.int(1, 4);
                const given = 'If a = ' + a + ' and b = ' + num(b) + ', what is ';
                if (f === 1) return { q: given + '**ab + ' + c + '**?', ans: plain(a * b + c), why: 'ab means a × b = ' + a + ' × ' + par(b) + ' = ' + num(a * b) + '. Then ' + num(a * b) + ' + ' + c + ' = ' + num(a * b + c) + '.' };
                if (f === 2) return { q: given + '**a − 3b**?', ans: plain(a - 3 * b), why: '3b = 3 × ' + par(b) + ' = ' + num(3 * b) + '. Then a − 3b = ' + a + ' − ' + par(3 * b) + ' = ' + num(a - 3 * b) + '.' };
                if (f === 3) return { q: given + '**2a + 3b**?', ans: plain(2 * a + 3 * b), why: '2a = 2 × ' + a + ' = ' + (2 * a) + ' and 3b = 3 × ' + par(b) + ' = ' + num(3 * b) + '. ' + (2 * a) + ' + ' + par(3 * b) + ' = ' + num(2 * a + 3 * b) + '.' };
                return { q: given + '**a(b + ' + c + ')**?', ans: plain(a * (b + c)), why: 'Bracket first: ' + par(b) + ' + ' + c + ' = ' + num(b + c) + '. Then ' + a + ' × ' + par(b + c) + ' = ' + num(a * (b + c)) + '.' };
            }
            const f = R.int(1, 5);
            if (f === 1) { const u = R.int(0, 20), a = R.int(2, 9), tt = R.int(2, 10); return { q: 'The formula v = u + at gives the speed of an object. Find v when u = ' + u + ', a = ' + a + ' and t = ' + tt + '.', ans: String(u + a * tt), unit: 'm/s', why: 'at means a × t = ' + a + ' × ' + tt + ' = ' + (a * tt) + '. Then v = ' + u + ' + ' + (a * tt) + ' = ' + (u + a * tt) + ' m/s.' }; }
            if (f === 2) { const sp = R.int(5, 60), tt = R.int(2, 8), d = sp * tt; return { q: 'Speed = distance ÷ time. A car travels ' + d + ' km in ' + tt + ' hours. What is its average speed?', ans: String(sp), unit: 'km/h', why: 'Speed = ' + d + ' ÷ ' + tt + ' = ' + sp + ' km/h.' }; }
            if (f === 3) { const m = R.int(2, 20), a = R.int(2, 10); return { q: 'The formula F = ma gives the force needed to speed up an object. Find F when m = ' + m + ' kg and a = ' + a + ' m/s².', ans: String(m * a), unit: 'N', why: 'ma means m × a = ' + m + ' × ' + a + ' = ' + (m * a) + ' N (newtons).' }; }
            if (f === 4) { const m = R.int(2, 90); return { q: 'Weight W = m × g. On Earth, g = 10 N/kg. What is the weight of a ' + m + ' kg object?', ans: String(m * 10), unit: 'N', why: 'W = ' + m + ' × 10 = ' + (m * 10) + ' N.' }; }
            const Cc = R.int(-4, 8) * 5, Fh = Cc * 9 / 5 + 32;
            return { q: 'To change °C to °F you can use F = 1.8C + 32. What is ' + num(Cc) + '°C in °F?', ans: plain(Fh), unit: '°F', why: 'F = 1.8 × ' + par(Cc) + ' + 32 = ' + num(Cc * 9 / 5) + ' + 32 = ' + num(Fh) + '°F.' };
        },

        // Writing Algebraic Equations
        "mt_i9rJbuFO3p": function (R) {
            const t = R.int(1, 4);
            const co = (k, x) => (k === 1 ? x : k + x);
            if (t === 1) {
                const n = R.int(2, 12), m = R.int(2, 9), f = R.int(1, 3);
                let c = R.int(1, 12); while (c === m) c = R.int(1, 12);
                const mult = m === 2 ? 'double it' : 'multiply it by ' + m;
                if (f === 1) {
                    const T = m * n + c;
                    return { q: 'I think of a number n, ' + mult + ' and add ' + c + '. The answer is ' + T + '. Which equation shows this?', a: mc(R, m + 'n + ' + c + ' = ' + T, [m + '(n + ' + c + ') = ' + T, 'n + ' + m + ' + ' + c + ' = ' + T, c + 'n + ' + m + ' = ' + T, m + 'n = ' + T + ' + ' + c], null), why: '"' + cap(mult) + '" gives ' + m + 'n, then "add ' + c + '" gives ' + m + 'n + ' + c + ', and that equals ' + T + '. (The number is ' + n + '.)' };
                }
                if (f === 2) {
                    let nn = n; while (m * nn - c <= 0) nn++;
                    const T = m * nn - c;
                    return { q: 'I think of a number n, ' + mult + ' and subtract ' + c + '. The answer is ' + T + '. Which equation shows this?', a: mc(R, m + 'n − ' + c + ' = ' + T, [m + '(n − ' + c + ') = ' + T, c + ' − ' + m + 'n = ' + T, m + 'n + ' + c + ' = ' + T, 'n − ' + m + ' − ' + c + ' = ' + T], null), why: '"' + cap(mult) + '" gives ' + m + 'n, then "subtract ' + c + '" gives ' + m + 'n − ' + c + ', and that equals ' + T + '. (The number is ' + nn + '.)' };
                }
                const T = m * (n + c);
                return { q: 'I think of a number n, add ' + c + ', then multiply the result by ' + m + '. The answer is ' + T + '. Which equation shows this?', a: mc(R, m + '(n + ' + c + ') = ' + T, [m + 'n + ' + c + ' = ' + T, 'n + ' + c + ' + ' + m + ' = ' + T, c + '(n + ' + m + ') = ' + T], null), why: 'The adding happens first, so it goes in a bracket: (n + ' + c + '). Then multiply the whole bracket by ' + m + ': ' + m + '(n + ' + c + ') = ' + T + '. (The number is ' + n + '.)' };
            }
            if (t === 2) {
                const x = R.int(2, 15), a = R.int(2, 9), b = R.int(2, 20), f = R.int(1, 4);
                if (f === 1) return { q: 'Solve **' + a + 'x = ' + (a * x) + '**. What is x?', ans: String(x), why: a + 'x means ' + a + ' × x. Divide both sides by ' + a + ': x = ' + (a * x) + ' ÷ ' + a + ' = ' + x + '.' };
                if (f === 2) return { q: 'Solve **x + ' + b + ' = ' + (x + b) + '**. What is x?', ans: String(x), why: 'Subtract ' + b + ' from both sides: x = ' + (x + b) + ' − ' + b + ' = ' + x + '.' };
                if (f === 3) { const y = x + b; return { q: 'Solve **x − ' + b + ' = ' + x + '**. What is x?', ans: String(y), why: 'Add ' + b + ' to both sides: x = ' + x + ' + ' + b + ' = ' + y + '.' }; }
                return { q: 'Solve **' + F('x', a) + ' = ' + x + '**. What is x?', ans: String(a * x), why: F('x', a) + ' means x ÷ ' + a + '. Multiply both sides by ' + a + ': x = ' + x + ' × ' + a + ' = ' + (a * x) + '.' };
            }
            if (t === 3) {
                const n = R.int(2, 12), m = R.int(2, 9), c = R.int(1, 15), add = R.chance(0.6);
                const T = add ? m * n + c : m * n - c;
                if (T <= 0) return { q: 'I think of a number, multiply it by ' + m + ' and get ' + (m * n) + '. What is my number?', ans: String(n), why: m + 'n = ' + (m * n) + ', so n = ' + (m * n) + ' ÷ ' + m + ' = ' + n + '.' };
                const mult = m === 2 ? 'double it' : 'multiply it by ' + m;
                return {
                    q: 'I think of a number, ' + mult + ' and ' + (add ? 'add ' : 'subtract ') + c + '. The answer is ' + T + '. What was my number?',
                    ans: String(n),
                    why: 'Write it as ' + m + 'n ' + (add ? '+ ' : '− ') + c + ' = ' + T + '. Undo the steps in reverse: ' + T + (add ? ' − ' : ' + ') + c + ' = ' + (m * n) + ', then ' + (m * n) + ' ÷ ' + m + ' = ' + n + '.'
                };
            }
            const f = R.int(1, 3), n = R.int(2, 12), k = R.int(2, 8);
            if (f === 1) {
                const c = R.int(1, 9), T = k * n + c;
                return { q: 'A notebook costs £n. ' + k + ' notebooks and a £' + c + ' pen cost £' + T + ' altogether. Which equation is correct?', a: mc(R, k + 'n + ' + c + ' = ' + T, [k + ' + n + ' + c + ' = ' + T, k + '(n + ' + c + ') = ' + T, c + 'n + ' + k + ' = ' + T, 'n + ' + c + ' = ' + T], null), why: k + ' notebooks cost ' + k + ' × n = ' + k + 'n pounds. Add the £' + c + ' pen: ' + k + 'n + ' + c + ' = ' + T + '. (So n = ' + n + '.)' };
            }
            if (f === 2) {
                const c = R.int(1, 9), T = k * n + c;
                return { q: 'Each bag holds n sweets. ' + k + ' full bags and ' + c + ' loose sweets make ' + T + ' sweets. Which equation is correct?', a: mc(R, k + 'n + ' + c + ' = ' + T, [k + '(n + ' + c + ') = ' + T, 'n + ' + k + ' + ' + c + ' = ' + T, c + 'n + ' + k + ' = ' + T, k + 'n = ' + T + ' + ' + c], null), why: k + ' bags of n sweets is ' + k + 'n. Add the ' + c + ' loose sweets: ' + k + 'n + ' + c + ' = ' + T + '. (So n = ' + n + '.)' };
            }
            const c = R.int(1, Math.min(9, k * n - 1)), T = k * n - c;
            return { q: 'There are ' + k + ' rows of n chairs. ' + c + ' chairs are taken away, leaving ' + T + '. Which equation is correct?', a: mc(R, k + 'n − ' + c + ' = ' + T, [k + '(n − ' + c + ') = ' + T, k + 'n + ' + c + ' = ' + T, c + ' − ' + k + 'n = ' + T, 'n − ' + c + ' = ' + T], null), why: k + ' rows of n chairs is ' + k + 'n chairs. Taking ' + c + ' away gives ' + k + 'n − ' + c + ' = ' + T + '. (So n = ' + n + '.)' };
        },

        // Solving Linear Equations
        "mt_QhFEDyIwSO": function (R) {
            const t = R.int(1, 5);
            const co = (k) => (k === 1 ? 'x' : k + 'x');
            const xv = () => (R.chance(0.2) ? -R.int(1, 6) : R.int(1, 12));
            if (t === 1 || t === 5) {
                const a = R.int(2, 9), x = xv(), b = R.int(1, 20), plus = R.chance(0.6), c = plus ? a * x + b : a * x - b;
                const eq = a + 'x ' + (plus ? '+ ' : '− ') + b + ' = ' + num(c);
                const why = (plus ? 'Subtract ' + b + ' from' : 'Add ' + b + ' to') + ' both sides: ' + a + 'x = ' + num(a * x) + '. Divide both sides by ' + a + ': x = ' + num(x) + '.';
                if (t === 1) return { q: 'Solve **' + eq + '**. What is x?', ans: plain(x), why };
                const wr = [plain(plus ? c - b : c + b), (plus ? c + b : c - b) % a === 0 ? plain((plus ? c + b : c - b) / a) : '', c % a === 0 ? plain(c / a - (plus ? b : -b)) : '', plain(c - b - a)];
                return { q: 'Solve **' + eq + '**. What is x?', a: mc(R, plain(x), wr.map(s => s.replace('-', MINUS)), near(R, x, 4, -10, num)).map(s => s.replace('-', MINUS)), why };
            }
            if (t === 2) {
                const a = R.int(2, 6), x = xv(), b = R.int(1, 9), plus = R.chance(0.6), inner = plus ? x + b : x - b, c = a * inner;
                return { q: 'Solve **' + a + '(x ' + (plus ? '+ ' : '− ') + b + ') = ' + num(c) + '**. What is x?', ans: plain(x), why: 'Expand the bracket: ' + a + 'x ' + (plus ? '+ ' : '− ') + (a * b) + ' = ' + num(c) + '. ' + (plus ? 'Subtract ' : 'Add ') + (a * b) + ': ' + a + 'x = ' + num(a * x) + '. Divide by ' + a + ': x = ' + num(x) + '.' };
            }
            if (t === 3) {
                const c2 = R.int(1, 5), a = c2 + R.int(1, 5), x = R.int(1, 10), b = R.int(1, 15), d = (a - c2) * x + b;
                return { q: 'Solve **' + co(a) + ' + ' + b + ' = ' + co(c2) + ' + ' + d + '**. What is x?', ans: String(x), why: 'Take ' + co(c2) + ' from both sides: ' + co(a - c2) + ' + ' + b + ' = ' + d + '. Subtract ' + b + ': ' + co(a - c2) + ' = ' + (d - b) + (a - c2 > 1 ? '. Divide by ' + (a - c2) + ': x = ' + x : '') + '.' };
            }
            if (R.chance(0.5)) {
                const a = R.int(2, 6), q = R.int(2, 10), b = R.int(1, 10);
                return { q: 'Solve **' + F('x', a) + ' + ' + b + ' = ' + (q + b) + '**. What is x?', ans: String(a * q), why: 'Subtract ' + b + ' from both sides: ' + F('x', a) + ' = ' + q + '. Multiply both sides by ' + a + ': x = ' + q + ' × ' + a + ' = ' + (a * q) + '.' };
            }
            const a = R.int(2, 6), x = R.int(1, 8), b = R.int(10, 40), Rr = b - a * x;
            return { q: 'Solve **' + b + ' − ' + a + 'x = ' + num(Rr) + '**. What is x?', ans: String(x), why: 'Add ' + a + 'x to both sides: ' + b + ' = ' + num(Rr) + ' + ' + a + 'x. Subtract ' + par(Rr) + ': ' + a + 'x = ' + (a * x) + '. Divide by ' + a + ': x = ' + x + '.' };
        },

        // Ratio Problems
        "mt_h0gJcSuwdL": function (R) {
            const t = R.int(1, 5);
            const PAIRS = [['red beads', 'blue beads', 'In a jar'], ['apples', 'oranges', 'In a fruit bowl'], ['girls', 'boys', 'In a chess club'], ['cats', 'dogs', 'At a rescue centre'], ['red tulips', 'yellow tulips', 'In a flower bed'], ['sheep', 'cows', 'On a farm'], ['strawberries', 'grapes', 'In a fruit salad']];
            const ratio = () => { let a, b; do { a = R.int(1, 9); b = R.int(1, 9); } while (a === b || gcd(a, b) !== 1); return [a, b]; };
            if (t === 1 || t === 2) {
                const [X, Y, at] = R.pick(PAIRS), [a, b] = ratio(), k = R.int(2, 9), B = b * k, A = a * k;
                const q = (R.chance(0.5) || a === 1 || b === 1) ? at + ', the ratio of ' + X + ' to ' + Y + ' is ' + a + ':' + b + '. There are ' + B + ' ' + Y + '. How many ' + X + ' are there?' : 'For every ' + a + ' ' + X + ' there are ' + b + ' ' + Y + '. If there are ' + B + ' ' + Y + ', how many ' + X + ' are there?';
                const why = B + ' ' + Y + ' ÷ ' + b + ' = ' + k + ', so there are ' + k + ' lots of the ratio. ' + cap(X) + ': ' + a + ' × ' + k + ' = ' + A + '.';
                if (t === 1) return { q, ans: String(A), why };
                return { q, a: mc(R, String(A), [B + a - b, (B * b) % a === 0 ? B * b / a : 0, a * B].filter(x => x > 0).map(String), near(R, A, 6, 1, String)), why: why + ' (Ratios multiply — adding or taking away the difference does not work.)' };
            }
            if (t === 3) {
                const [a, b] = ratio(), k = R.int(2, 15), T = (a + b) * k, [p1, p2] = R.sample(NAMES, 2), first = R.chance(0.5);
                const money = R.chance(0.6);
                const what = money ? '£' + T : T + ' sweets';
                const got = first ? a * k : b * k;
                return {
                    q: 'Share ' + what + ' between ' + p1 + ' and ' + p2 + ' in the ratio ' + a + ':' + b + '. How ' + (money ? 'much does ' : 'many sweets does ') + (first ? p1 : p2) + ' get?',
                    ans: String(got),
                    why: a + ' + ' + b + ' = ' + (a + b) + ' parts. ' + (money ? '£' : '') + T + ' ÷ ' + (a + b) + ' = ' + (money ? '£' : '') + k + ' per part. ' + (first ? p1 : p2) + ' gets ' + (first ? a : b) + ' part' + ((first ? a : b) === 1 ? '' : 's') + ': ' + (first ? a : b) + ' × ' + (money ? '£' : '') + k + ' = ' + (money ? '£' : '') + got + '.'
                };
            }
            if (t === 4) {
                const [ing, u] = R.pick([['flour', 'g'], ['sugar', 'g'], ['butter', 'g'], ['milk', 'ml']]);
                let p1, p2; do { p1 = R.pick([2, 3, 4, 5, 6]); p2 = R.int(2, 12); } while (p1 === p2);
                const each = R.int(2, 30) * 5, A = each * p1;
                return { q: 'A recipe for ' + p1 + ' people uses ' + A + ' ' + u + ' of ' + ing + '. How much ' + ing + ' is needed for ' + p2 + ' people?', ans: String(each * p2), unit: u, why: 'For 1 person: ' + A + ' ÷ ' + p1 + ' = ' + each + ' ' + u + '. For ' + p2 + ' people: ' + each + ' × ' + p2 + ' = ' + (each * p2) + ' ' + u + '.' };
            }
            const [X, Y, at] = R.pick(PAIRS), [a, b] = ratio(), k = R.int(2, 9), T = (a + b) * k, askY = R.chance(0.5);
            return {
                q: at + ', the ratio of ' + X + ' to ' + Y + ' is ' + a + ':' + b + '. There are ' + T + ' altogether. How many ' + (askY ? Y : X) + ' are there?',
                ans: String((askY ? b : a) * k),
                why: a + ' + ' + b + ' = ' + (a + b) + ' parts. ' + T + ' ÷ ' + (a + b) + ' = ' + k + ' in each part. ' + cap(askY ? Y : X) + ': ' + (askY ? b : a) + ' × ' + k + ' = ' + ((askY ? b : a) * k) + '.'
            };
        },

        // The 0-to-1 Probability Scale
        "mt_t0g2SlP404": function (R) {
            const t = R.int(1, 5);
            const WORDS = ['impossible', 'unlikely', 'even chance', 'likely', 'certain'];
            if (t === 1) {
                const P = R.pick([['0', 0], ['1', 4], ['0.5', 2], [F(1, 2), 2], ['50%', 2], ['0.1', 1], ['0.2', 1], ['0.15', 1], [F(1, 10), 1], [F(1, 5), 1], ['10%', 1], ['20%', 1], [F(1, 4), 1], ['0.8', 3], ['0.9', 3], ['0.85', 3], [F(4, 5), 3], [F(9, 10), 3], ['90%', 3], ['80%', 3], [F(3, 4), 3]]);
                const [disp, i] = P;
                const WHY = [
                    'A probability of 0 means the event cannot happen: impossible.',
                    disp + ' is between 0 and ' + F(1, 2) + ', close to 0, so the event is unlikely (but not impossible).',
                    disp + ' is exactly halfway between 0 and 1: an even chance, like a coin landing on heads.',
                    disp + ' is between ' + F(1, 2) + ' and 1, close to 1, so the event is likely (but not certain).',
                    'A probability of 1 means the event is sure to happen: certain.'
                ];
                return { q: 'An event has a probability of ' + disp + '. Which word describes it best?', a: [WORDS[i]].concat(R.sample(WORDS.filter((w, j) => j !== i), 3)), why: WHY[i] };
            }
            if (t === 2) {
                const E = R.pick([
                    ['rolling a 7 on an ordinary dice numbered 1 to 6', '0'],
                    ['picking a blue counter from a bag that only has red counters', '0'],
                    ['a fair coin landing on heads', F(1, 2)],
                    ['rolling an even number on an ordinary dice', F(1, 2)],
                    ['picking a red counter from a bag that only has red counters', '1'],
                    ['rolling a number less than 7 on an ordinary dice', '1'],
                    ['a spinner with 4 equal sections (1 red, 3 blue) landing on red', F(1, 4)],
                    ['picking the heart from 4 cards: a heart, a club, a diamond and a spade', F(1, 4)],
                    ['a spinner with 4 equal sections (3 red, 1 blue) landing on red', F(3, 4)],
                    ['picking a boy\'s name from a hat with 3 boys\' names and 1 girl\'s name', F(3, 4)]
                ]);
                const ALL = ['0', F(1, 4), F(1, 2), F(3, 4), '1'];
                const WHY = { '0': 'It cannot happen, so the probability is 0 (impossible).', '1': 'It is certain to happen, so the probability is 1.' };
                WHY[F(1, 2)] = '1 out of 2 equally likely outcomes (or 3 out of 6), so the probability is ' + F(1, 2) + ': an even chance.';
                WHY[F(1, 4)] = '1 out of 4 equally likely outcomes, so the probability is ' + F(1, 4) + ' — unlikely.';
                WHY[F(3, 4)] = '3 out of 4 equally likely outcomes, so the probability is ' + F(3, 4) + ' — likely.';
                return { q: 'What is the probability of ' + E[0] + '?', a: [E[1]].concat(R.sample(ALL.filter(x => x !== E[1]), 3)), why: WHY[E[1]] };
            }
            if (t === 3) {
                const f = R.int(1, 3);
                const ev = R.pick([['it rains tomorrow', 'it does **not** rain tomorrow'], ['a bus is late', 'the bus is **not** late'], ['a team wins its next match', 'the team does **not** win'], ['a seed grows', 'the seed does **not** grow']]);
                if (f === 1) {
                    const p = R.int(1, 99), ps = plain(p / 100), qs = plain((100 - p) / 100);
                    return { q: 'The probability that ' + ev[0] + ' is ' + ps + '. What is the probability that ' + ev[1] + '?', ans: qs, why: 'It either happens or it does not, so the two probabilities add up to 1: 1 − ' + ps + ' = ' + qs + '.' };
                }
                if (f === 2) {
                    const [a, b] = properFrac(R, 3, 12);
                    return { q: 'The probability that ' + ev[0] + ' is ' + F(a, b) + '. What is the probability that ' + ev[1] + '?', ans: (b - a) + '/' + b, why: 'The two probabilities add up to 1: 1 − ' + F(a, b) + ' = ' + F(b, b) + ' − ' + F(a, b) + ' = ' + F(b - a, b) + '.' };
                }
                const p = R.int(1, 19) * 5;
                return { q: 'The chance that ' + ev[0] + ' is ' + p + '%. What is the chance that ' + ev[1] + '?', ans: String(100 - p), alt: [plain((100 - p) / 100)], unit: '%', why: 'Happening and not happening add up to 100%: 100% − ' + p + '% = ' + (100 - p) + '%.' };
            }
            if (t === 4) {
                const bad = R.pick([['1.2', 'more than 1'], ['120%', 'more than 100%'], [MINUS + '0.3', 'less than 0'], [F(5, 4), 'more than 1'], ['1.5', 'more than 1'], ['150%', 'more than 100%'], [MINUS + '0.5', 'less than 0'], [F(7, 6), 'more than 1']]);
                const good = R.sample(['0', '1', '0.75', F(2, 3), '45%', '0.05', '30%', F(1, 8), '0.99'], 3);
                return { q: 'Which of these could **not** be a probability?', a: [bad[0]].concat(good), why: 'Probabilities go from 0 (impossible) to 1 (certain), or 0% to 100%. ' + bad[0] + ' is ' + bad[1] + ', so it cannot be a probability.' };
            }
            const items = mixedForms(R, 4), most = R.chance(0.5);
            const sorted = items.slice().sort((x, y) => x.p - y.p), c = most ? sorted[sorted.length - 1] : sorted[0];
            return {
                q: 'Four events have these probabilities. Which event is **' + (most ? 'most' : 'least') + '** likely?',
                a: mc(R, c.disp, items.filter(x => x !== c).map(x => x.disp), null),
                why: 'Change them all to decimals: ' + items.map(x => (x.kind === 'd' ? x.disp : x.disp + ' = ' + plain(x.p / 100))).join(', ') + '. The ' + (most ? 'biggest' : 'smallest') + ' is ' + c.disp + '.'
            };
        },

        // Calculating Simple Probability
        "mt_Zt30Gxi-qp": function (R) {
            const t = R.int(1, 4);
            const SIMP = ' Give your answer as a fraction in its simplest form.';
            const pWhy = (f, T) => { const [a, b] = simp(f, T); return F(f, T) + (a !== f ? ' = ' + F(a, b) : ''); };
            if (t === 1) {
                const k = R.int(2, 3), cols = R.sample(['red', 'blue', 'green', 'yellow', 'purple'], k), cnt = cols.map(() => R.int(1, 9));
                const i = R.int(0, k - 1), T = cnt.reduce((x, y) => x + y, 0), f = cnt[i];
                const spinner = R.chance(0.35);
                const list = listAnd(cols.map((c, j) => cnt[j] + ' ' + c));
                const q = spinner ? 'A spinner has ' + T + ' equal sections: ' + list + '. What is the probability that it lands on ' + cols[i] + '?' : 'A bag has ' + list + ' counters. One counter is picked at random. What is the probability that it is ' + cols[i] + '?';
                return { q: q + SIMP, ans: fplain(f, T), exact: true, why: 'There are ' + cnt.join(' + ') + ' = ' + T + ' ' + (spinner ? 'sections' : 'counters') + ' and ' + f + ' ' + (f === 1 ? 'is' : 'are') + ' ' + cols[i] + '. P(' + cols[i] + ') = ' + pWhy(f, T) + '.' };
            }
            if (t === 2) {
                const k = R.int(1, 5), m = R.int(2, 6);
                const EV = [['an even number', [2, 4, 6]], ['an odd number', [1, 3, 5]], ['a multiple of 3', [3, 6]], ['a prime number', [2, 3, 5]], ['a square number', [1, 4]], ['a factor of 6', [1, 2, 3, 6]], ['a 6', [6]],
                    ['a number greater than ' + k, [1, 2, 3, 4, 5, 6].filter(x => x > k)], ['a number less than ' + m, [1, 2, 3, 4, 5, 6].filter(x => x < m)]];
                const [ev, fav] = R.pick(EV), f = fav.length;
                const [sn, sd] = simp(f, 6);
                return {
                    q: 'You roll a fair dice numbered 1 to 6. What is the probability of rolling ' + ev + '?',
                    a: mc(R, F(sn, sd), [fshow(f, 6 - f), F(1, 6), fshow(6 - f, 6)].filter(x => x.startsWith('[[')), () => { const x = R.int(1, 5); return fshow(x, 6); }),
                    why: 'The outcomes that count are ' + listAnd(fav.map(String)) + ': ' + f + ' out of 6. P = ' + pWhy(f, 6) + '.'
                };
            }
            if (t === 3) {
                const N = R.pick([10, 12, 20]), k = R.int(2, N - 3);
                const EV = [['an even number', x => x % 2 === 0], ['an odd number', x => x % 2 === 1], ['a multiple of 3', x => x % 3 === 0], ['a multiple of 4', x => x % 4 === 0], ['a multiple of 5', x => x % 5 === 0], ['a prime number', isPrime], ['a square number', x => Number.isInteger(Math.sqrt(x))], ['a number greater than ' + k, x => x > k]];
                const [ev, test] = R.pick(EV), fav = []; for (let x = 1; x <= N; x++) if (test(x)) fav.push(x);
                return { q: 'Cards numbered 1 to ' + N + ' are shuffled and one is picked at random. What is the probability that it shows ' + ev + '?' + SIMP, ans: fplain(fav.length, N), exact: true, why: 'The cards that count are ' + (fav.length > 10 ? fav[0] + ' to ' + fav[fav.length - 1] : listAnd(fav.map(String))) + ': ' + fav.length + ' out of ' + N + '. P = ' + pWhy(fav.length, N) + '.' };
            }
            const b = R.int(2, 6), r = R.int(2, 8), add = R.int(1, 3), more = R.chance(0.5), s = add > 1 ? 's' : '';
            const ans = more ? 'Add ' + add + ' blue counter' + s : 'Add ' + add + ' red counter' + s;
            const wr = more ? ['Add ' + add + ' red counter' + s, 'Take out 1 blue counter', 'Swap 1 blue counter for a red one'] : ['Add ' + add + ' blue counter' + s, 'Take out 1 red counter', 'Swap 1 red counter for a blue one'];
            const nb = more ? b + add : b, nt = b + r + add;
            return {
                q: 'A bag has ' + b + ' blue and ' + r + ' red counters. Which change would make picking a blue counter **' + (more ? 'more' : 'less') + '** likely?',
                a: [ans].concat(wr),
                why: 'Now P(blue) = ' + F(b, b + r) + '. After "' + ans.toLowerCase() + '" it is ' + F(nb, nt) + ', which is ' + (more ? 'bigger' : 'smaller') + '. ' + (more ? 'More blue counters out of the total' : 'The same blue counters out of a bigger total') + ' changes the probability.'
            };
        },
    });
})();
