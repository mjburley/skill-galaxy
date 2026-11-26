// Skill Galaxy — shared helpers for question banks and maths generators.
// Loaded by index.html and by tools/validate.js.
(function (root) {
    'use strict';

    const SG_R = {
        // Random whole number from min to max inclusive
        int(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); },
        pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
        shuffle(arr) {
            const a = arr.slice();
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        },
        sample(arr, n) { return SG_R.shuffle(arr).slice(0, n); },
        chance(p) { return Math.random() < p; },
        gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; },
        lcm(a, b) { return Math.abs(a * b) / SG_R.gcd(a, b); },
        // Round away floating-point noise (0.1 + 0.2 -> 0.3)
        clean(n) { return Math.round(n * 1e9) / 1e9; },
        // 1234567.5 -> "1,234,567.5"
        fmt(n, dp) {
            n = SG_R.clean(n);
            const opts = dp === undefined ? { maximumFractionDigits: 9 } : { minimumFractionDigits: dp, maximumFractionDigits: dp };
            return n.toLocaleString('en-GB', opts);
        },
        // 12.5 -> "£12.50"
        money(n) { return '£' + SG_R.fmt(n, Number.isInteger(SG_R.clean(n)) ? 0 : 2); },
        // Display markup for a stacked fraction: frac(3,4) -> "[[3/4]]"
        frac(n, d) { return '[[' + n + '/' + d + ']]'; },
        // mixed(2,1,3) -> "[[2 1/3]]"
        mixed(w, n, d) { return '[[' + w + ' ' + n + '/' + d + ']]'; },
        // Simplify a fraction: [6,8] -> [3,4]
        simplify(n, d) { const g = SG_R.gcd(n, d) || 1; return [n / g, d / g]; },
        // Build multiple-choice options: correct answer first, then up to `count`
        // distinct wrong answers taken from `wrong` (in order), topped up by calling
        // `filler()` until there are enough. Values are compared as strings.
        options(correct, wrong, filler, count) {
            count = count === undefined ? 3 : count;
            const out = [String(correct)];
            const seen = new Set(out);
            const add = (w) => {
                const s = String(w);
                if (out.length <= count && !seen.has(s) && s !== '' && !/NaN|undefined|Infinity/.test(s)) {
                    seen.add(s); out.push(s);
                }
            };
            (wrong || []).forEach(add);
            let guard = 0;
            while (out.length <= count && filler && guard++ < 200) add(filler());
            return out;
        }
    };

    // Typed-answer checking ------------------------------------------------
    function normalise(s, unit) {
        s = String(s).toLowerCase().trim()
            .replace(/[−–]/g, '-')     // minus signs and en dash
            .replace(/£/g, '')
            .replace(/(\d),(?=\d{3}\b)/g, '$1')  // 1,000 -> 1000
            .replace(/\s*\/\s*/g, '/')
            .replace(/\s+/g, ' ')
            .replace(/\.$/, '');
        if (unit) {
            const u = String(unit).toLowerCase();
            if (s.endsWith(u)) s = s.slice(0, -u.length).trim();
        }
        return s;
    }

    // "3/4" -> 0.75, "2 1/3" -> 2.333, "-4" -> -4, "40%" -> 40
    function toNumber(s) {
        s = s.replace(/%$/, '');
        let m = s.match(/^(-?)(\d+) (\d+)\/(\d+)$/);
        if (m) return (m[1] ? -1 : 1) * (Number(m[2]) + Number(m[3]) / Number(m[4]));
        m = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
        if (m) return Number(m[2]) === 0 ? NaN : Number(m[1]) / Number(m[2]);
        if (/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return Number(s);
        return NaN;
    }

    function checkTyped(input, item) {
        const given = normalise(input, item.unit);
        if (!given) return false;
        const answers = [item.ans].concat(item.alt || []).map(a => normalise(a, item.unit));
        if (answers.includes(given)) return true;
        if (item.exact) return false;
        const g = toNumber(given);
        if (Number.isNaN(g)) return false;
        return answers.some(a => { const n = toNumber(a); return !Number.isNaN(n) && Math.abs(n - g) < 1e-9; });
    }

    root.SG_R = SG_R;
    root.SG_checkTyped = checkTyped;
})(typeof window !== 'undefined' ? window : globalThis);
