"""Select Marble taxonomy topics for Skill Galaxy and write topics.js.

Usage: python -I select.py <marble data dir> <output topics.js>
"""
import json, sys, collections

D, OUT = sys.argv[1], sys.argv[2]

CONSTELLATIONS = [
    # id, name, icon, colour, group, [id suffixes]
    ("number", "Number Nebula", "🔢", "#4f8cff", "Maths",
     ["wNggdU", "ygEB85", "zwYxbR", "dLy8vq", "v6dfhU", "VsIelg", "YlF-7Y", "Q4hR0g"]),
    ("fractions", "Fraction Frontier", "🍕", "#5b6cff", "Maths",
     ["lt-qAl", "CjOYUR", "kDwXfh", "3tCxiM", "yPXUq_", "isinfi", "hHsyYZ", "_RMg9o", "fH56eQ"]),
    ("shape", "Shape Sector", "📐", "#3fa7f5", "Maths",
     ["WKry-L", "C7EpTJ", "FlVdas", "-6pu6a", "7n2-U8", "owFJTF", "9JcajP", "HZ2zeR"]),
    ("pattern", "Pattern Pulsar", "🎲", "#7a5cff", "Maths",
     ["bst0ow", "X0N5u0", "a3SURC", "buFO3p", "DyIwSO", "cSuwdL", "SlP404", "Gxi-qp"]),
    ("space", "Starry Skies", "🔭", "#22b8cf", "Science",
     ["Gkf1Tp", "--Fb5H", "YhFUcm", "FPkVmH", "q39aj8", "HHFR76", "KEdAOj", "GGiHBL"]),
    ("forces", "Force Field", "🧲", "#12b886", "Science",
     ["PTCYm6", "DSy0mA", "auS_zX", "6G8BBT", "VXzRuq", "fSwyzQ", "pHjU19"]),
    ("spark", "Spark Cluster", "💡", "#40c057", "Science",
     ["7aoPgz", "923zvz", "JOuXrG", "DV-NGe", "IBwHB9", "oDE7gr", "uABT3E", "O-pKkP", "GbkP9m"]),
    ("life", "Life Lagoon", "🌿", "#82c91e", "Science",
     ["8cCFtQ", "-lyGPZ", "VCfzqt", "xo4kUv", "-c2DfV", "u31jgl", "8EVdIP", "bS3hhs", "wGLZgk", "bo1Fn6"]),
    ("matter", "Matter Moon", "🧪", "#20c997", "Science",
     ["dIHO8L", "Y6VhOf", "o5M3_c", "-fYRLX", "uAsSLN", "oPELM1", "B0w3Yx", "_77ybI", "JE6I0s"]),
    ("earth", "Planet Earth", "🌋", "#f08c00", "Geography",
     ["x5kUfO", "hdei6F", "T_PnGH", "nBWChW", "DD1SbV", "A986IQ", "LLIZh5", "MCE17H", "kNg_0R", "Al6DwW"]),
    ("grammar", "Grammar Galaxy", "✏️", "#e64980", "English",
     ["2b3d34", "6S_eT9", "eAhK5k", "KWABdC", "pzcLDl", "Xac3aP", "qPaiJ1", "zvnWzr", "bWdfDO"]),
    ("words", "Word Wormhole", "📚", "#d6336c", "English",
     ["LvMgLL", "IXqmAo", "430cU4", "Yt61cO", "cbhMci", "4RASVU", "jmRqv9", "hVflm3", "SAQ8bz"]),
    ("history", "Time Tunnel", "🏛️", "#f59f00", "History",
     ["jZZnf9", "YNP62H", "vgrPgD", "NkDrGJ", "YkDqZp", "QzPJZi", "hTx0jd", "bmLcbM", "aL6KwH", "TF-OkG"]),
    ("digital", "Digital Dock", "💻", "#be4bdb", "Computing",
     ["Usnd11", "0nxZvB", "eUK-Cd", "am8zcd", "j8gIRs", "twqSvP", "mdmjDb", "P8KHsM", "0P5P9R", "J49akv", "jiY5A5"]),
    ("money", "Money Meteor", "💷", "#fab005", "Life Skills",
     ["y5oAvR", "XTxVAx", "-KenpK", "sFmSAH", "dmP1-A", "nis3v3", "rubDH8", "SyU2sO"]),
]

topics = json.load(open(D + "/topics.json", encoding="utf-8"))["topics"]
deps = json.load(open(D + "/dependencies.json", encoding="utf-8"))["dependencies"]
by_id = {t["id"]: t for t in topics}
pre = collections.defaultdict(set)
for e in deps:
    pre[e["topicId"]].add(e["prerequisiteId"])


def resolve(suffix):
    hits = [i for i in by_id if i.endswith(suffix)]
    if len(hits) != 1:
        raise SystemExit(f"suffix {suffix!r} matched {hits}")
    return hits[0]


def ancestors(tid, memo={}):
    if tid in memo:
        return memo[tid]
    out = set()
    for p in pre[tid]:
        out.add(p)
        out |= ancestors(p)
    memo[tid] = out
    return out


def clean(s):
    return s.replace("�", "—").replace("�", "—").strip()


out_const, out_topics = [], {}
for cid, name, icon, colour, group, suffixes in CONSTELLATIONS:
    ids = [resolve(s) for s in suffixes]
    idset = set(ids)
    # in-set prerequisites via the full graph's transitive closure ...
    anc = {i: ancestors(i) & idset for i in ids}
    # ... then transitive reduction inside the set
    red = {}
    for i in ids:
        keep = set(anc[i])
        for p in anc[i]:
            keep -= anc[p]
        red[i] = sorted(keep, key=ids.index)
    depth = {}

    def d(i):
        if i not in depth:
            depth[i] = 0 if not red[i] else 1 + max(d(p) for p in red[i])
        return depth[i]

    for i in ids:
        d(i)
    out_const.append({"id": cid, "name": name, "icon": icon, "color": colour,
                      "group": group, "stars": ids})
    print(f"## {name}  ({len(ids)} stars)")
    for i in sorted(ids, key=lambda x: depth[x]):
        t = by_id[i]
        out_topics[i] = {
            "name": clean(t["name"]),
            "desc": clean(t["description"]),
            "evidence": [clean(e) for e in t.get("evidence", [])],
            "age": [t["ageRangeStart"], t["ageRangeEnd"]],
            "subject": t["subject"],
            "domain": t["domain"],
            "type": t["type"],
            "pre": red[i],
        }
        print(f"  d{depth[i]} {t['name']}  <- {[by_id[p]['name'] for p in red[i]]}")

header = """// Skill Galaxy — topic data.
// Adapted from the Marble Skill Taxonomy v1 (https://github.com/withmarbleapp/os-taxonomy),
// by Marble (https://withmarble.com), licensed CC BY-SA 4.0
// (https://creativecommons.org/licenses/by-sa/4.0/).
// Changes: a subset of topics was selected and grouped into constellations, and the
// prerequisite graph was reduced to edges between topics in the same constellation.
// This file is shared under the same CC BY-SA 4.0 licence.
"""
with open(OUT, "w", encoding="utf-8") as f:
    f.write(header)
    f.write("window.SG_CONSTELLATIONS = " + json.dumps(out_const, ensure_ascii=False, indent=1) + ";\n")
    f.write("window.SG_TOPICS = " + json.dumps(out_topics, ensure_ascii=False, indent=1) + ";\n")
print("stars:", len(out_topics))
