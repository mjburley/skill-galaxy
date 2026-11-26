// Skill Galaxy — topic data.
// Adapted from the Marble Skill Taxonomy v1 (https://github.com/withmarbleapp/os-taxonomy),
// by Marble (https://withmarble.com), licensed CC BY-SA 4.0
// (https://creativecommons.org/licenses/by-sa/4.0/).
// Changes: a subset of topics was selected and grouped into constellations, and the
// prerequisite graph was reduced to edges between topics in the same constellation.
// This file is shared under the same CC BY-SA 4.0 licence.
window.SG_CONSTELLATIONS = [
 {
  "id": "number",
  "name": "Number Nebula",
  "icon": "🔢",
  "color": "#4f8cff",
  "group": "Maths",
  "stars": [
   "mt_XNmGwNggdU",
   "mt__casygEB85",
   "mt_1KkvzwYxbR",
   "mt_To9HdLy8vq",
   "mt_FHIAv6dfhU",
   "mt_y1XCVsIelg",
   "mt_hCVPYlF-7Y",
   "mt_jHgRQ4hR0g"
  ]
 },
 {
  "id": "fractions",
  "name": "Fraction Frontier",
  "icon": "🍕",
  "color": "#5b6cff",
  "group": "Maths",
  "stars": [
   "mt_ebPelt-qAl",
   "mt_b7T-CjOYUR",
   "mt_PL9VkDwXfh",
   "mt_o_p-3tCxiM",
   "mt_14T5yPXUq_",
   "mt_AabJisinfi",
   "mt_ZM9mhHsyYZ",
   "mt_4ubP_RMg9o",
   "mt_PNSyfH56eQ"
  ]
 },
 {
  "id": "shape",
  "name": "Shape Sector",
  "icon": "📐",
  "color": "#3fa7f5",
  "group": "Maths",
  "stars": [
   "mt_oqziWKry-L",
   "mt_cdMlC7EpTJ",
   "mt_J03RFlVdas",
   "mt_eiB3-6pu6a",
   "mt_ML5t7n2-U8",
   "mt_nTL-owFJTF",
   "mt_d8al9JcajP",
   "mt_xq3YHZ2zeR"
  ]
 },
 {
  "id": "pattern",
  "name": "Pattern Pulsar",
  "icon": "🎲",
  "color": "#7a5cff",
  "group": "Maths",
  "stars": [
   "mt_hBZwbst0ow",
   "mt_Jvg8X0N5u0",
   "mt_vHzVa3SURC",
   "mt_i9rJbuFO3p",
   "mt_QhFEDyIwSO",
   "mt_h0gJcSuwdL",
   "mt_t0g2SlP404",
   "mt_Zt30Gxi-qp"
  ]
 },
 {
  "id": "space",
  "name": "Starry Skies",
  "icon": "🔭",
  "color": "#22b8cf",
  "group": "Science",
  "stars": [
   "mt_5l7iGkf1Tp",
   "mt_q15w--Fb5H",
   "mt_4V-vYhFUcm",
   "mt_lFiDFPkVmH",
   "mt_aulwq39aj8",
   "mt_ae-cHHFR76",
   "mt_iTjrKEdAOj",
   "mt_H9RAGGiHBL"
  ]
 },
 {
  "id": "forces",
  "name": "Force Field",
  "icon": "🧲",
  "color": "#12b886",
  "group": "Science",
  "stars": [
   "mt_F3ATPTCYm6",
   "mt_3WMADSy0mA",
   "mt_AvrQauS_zX",
   "mt_Y9k86G8BBT",
   "mt_sUVeVXzRuq",
   "mt_Q2k3fSwyzQ",
   "mt_56aspHjU19"
  ]
 },
 {
  "id": "spark",
  "name": "Spark Cluster",
  "icon": "💡",
  "color": "#40c057",
  "group": "Science",
  "stars": [
   "mt_6w2g7aoPgz",
   "mt_qZro923zvz",
   "mt_PifbJOuXrG",
   "mt_qzGADV-NGe",
   "mt_ydtcIBwHB9",
   "mt_DQk9oDE7gr",
   "mt_NzCNuABT3E",
   "mt_d-EKO-pKkP",
   "mt_vFT_GbkP9m"
  ]
 },
 {
  "id": "life",
  "name": "Life Lagoon",
  "icon": "🌿",
  "color": "#82c91e",
  "group": "Science",
  "stars": [
   "mt_BX4D8cCFtQ",
   "mt_Ruk2-lyGPZ",
   "mt_sDmrVCfzqt",
   "mt_VfA4xo4kUv",
   "mt_bABr-c2DfV",
   "mt_zM5vu31jgl",
   "mt_oB-L8EVdIP",
   "mt_URTJbS3hhs",
   "mt_IY3KwGLZgk",
   "mt_LRzjbo1Fn6"
  ]
 },
 {
  "id": "matter",
  "name": "Matter Moon",
  "icon": "🧪",
  "color": "#20c997",
  "group": "Science",
  "stars": [
   "mt_YQkUdIHO8L",
   "mt_ylruY6VhOf",
   "mt_Qkewo5M3_c",
   "mt_Mf-T-fYRLX",
   "mt_UKmtuAsSLN",
   "mt_rbPioPELM1",
   "mt_2b6CB0w3Yx",
   "mt_Z_Wu_77ybI",
   "mt_AN2kJE6I0s"
  ]
 },
 {
  "id": "earth",
  "name": "Planet Earth",
  "icon": "🌋",
  "color": "#f08c00",
  "group": "Geography",
  "stars": [
   "mt_XrvPx5kUfO",
   "mt_-JnOhdei6F",
   "mt_W4j7T_PnGH",
   "mt_mdZ3nBWChW",
   "mt_bqL8DD1SbV",
   "mt_vAP_A986IQ",
   "mt_-YYnLLIZh5",
   "mt_TMOzMCE17H",
   "mt_DbI1kNg_0R",
   "mt_eDaSAl6DwW"
  ]
 },
 {
  "id": "grammar",
  "name": "Grammar Galaxy",
  "icon": "✏️",
  "color": "#e64980",
  "group": "English",
  "stars": [
   "mt_LN_g2b3d34",
   "mt_J5cx6S_eT9",
   "mt_-tcJeAhK5k",
   "mt_0QJoKWABdC",
   "mt_YQ64pzcLDl",
   "mt_m3-eXac3aP",
   "mt_uycuqPaiJ1",
   "mt_gbTyzvnWzr",
   "mt_k7VtbWdfDO"
  ]
 },
 {
  "id": "words",
  "name": "Word Wormhole",
  "icon": "📚",
  "color": "#d6336c",
  "group": "English",
  "stars": [
   "mt_E5YbLvMgLL",
   "mt_u3OuIXqmAo",
   "mt_9hBs430cU4",
   "mt_XK7NYt61cO",
   "mt_y8sicbhMci",
   "mt_x_Lg4RASVU",
   "mt_SUOhjmRqv9",
   "mt_hJW7hVflm3",
   "mt_IoGOSAQ8bz"
  ]
 },
 {
  "id": "history",
  "name": "Time Tunnel",
  "icon": "🏛️",
  "color": "#f59f00",
  "group": "History",
  "stars": [
   "mt_PCX1jZZnf9",
   "mt__qlBYNP62H",
   "mt_vFYFvgrPgD",
   "mt_H4bLNkDrGJ",
   "mt_cUMUYkDqZp",
   "mt_lzCcQzPJZi",
   "mt_8ShghTx0jd",
   "mt_UMOjbmLcbM",
   "mt_rf23aL6KwH",
   "mt_TTzJTF-OkG"
  ]
 },
 {
  "id": "digital",
  "name": "Digital Dock",
  "icon": "💻",
  "color": "#be4bdb",
  "group": "Computing",
  "stars": [
   "mt_GKL5Usnd11",
   "mt_Hft-0nxZvB",
   "mt_el7qeUK-Cd",
   "mt_sHMpam8zcd",
   "mt_WQiVj8gIRs",
   "mt_nfGAtwqSvP",
   "mt_6XbAmdmjDb",
   "mt_YZOjP8KHsM",
   "mt_y8-x0P5P9R",
   "mt_0XHRJ49akv",
   "mt__BbOjiY5A5"
  ]
 },
 {
  "id": "money",
  "name": "Money Meteor",
  "icon": "💷",
  "color": "#fab005",
  "group": "Life Skills",
  "stars": [
   "mt_udgPy5oAvR",
   "mt_cSz7XTxVAx",
   "mt_r1hw-KenpK",
   "mt_Qe2PsFmSAH",
   "mt_bAy4dmP1-A",
   "mt_UXMNnis3v3",
   "mt_3BDMrubDH8",
   "mt_W5euSyU2sO"
  ]
 }
];
window.SG_TOPICS = {
 "mt__casygEB85": {
  "name": "Rounding whole numbers and decimals",
  "desc": "Round decimals to any place using place-value understanding; round any whole number to a required degree of accuracy",
  "evidence": [
   "Round 3.4567 to 2 decimal places (3.46)",
   "Round 7,654,321 to the nearest 100,000 (7,700,000)",
   "Use rounding to estimate 4.83 × 2.17 ≈ 5 × 2 = 10"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Number Representation & Place Value",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_1KkvzwYxbR": {
  "name": "Negative numbers in context",
  "desc": "Interpret negative numbers in context (temperature, sea level, bank balance); count forwards and backwards with positive and negative whole numbers, including through zero",
  "evidence": [
   "Place –3, –1, 0, 2, 5 on a number line",
   "The temperature is –4°C and rises by 7 degrees — what is the new temperature?",
   "Count backwards from 3 in ones: 3, 2, 1, 0, –1, –2"
  ],
  "age": [
   9,
   13
  ],
  "subject": "Mathematics",
  "domain": "Number Representation & Place Value",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_To9HdLy8vq": {
  "name": "Roman numerals to 1000",
  "desc": "Read Roman numerals to 1000 (M) and recognise years written in Roman numerals",
  "evidence": [
   "Read MCMXCIX as 1999",
   "Write 2024 in Roman numerals (MMXXIV)",
   "Explain the subtractive principle: IV = 4 not IIII"
  ],
  "age": [
   9,
   10
  ],
  "subject": "Mathematics",
  "domain": "Number Representation & Place Value",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_FHIAv6dfhU": {
  "name": "Factors, multiples, and primes",
  "desc": "Find all factor pairs for a whole number in the range 1–100; identify common factors and common multiples of two numbers; use these concepts to solve problems",
  "evidence": [
   "List all factor pairs of 36: (1,36), (2,18), (3,12), (4,9), (6,6)",
   "State the first five multiples of 7",
   "Find the common factors of 24 and 36",
   "Find all common factors of 36 and 48",
   "Identify the first three common multiples of 6 and 8",
   "Determine whether a given number (e.g. 97) is prime and justify the reasoning"
  ],
  "age": [
   9,
   13
  ],
  "subject": "Mathematics",
  "domain": "Multiplication & Division",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_jHgRQ4hR0g": {
  "name": "Order of operations",
  "desc": "Understand and apply the conventional order of operations (PEMDAS/BODMAS) to carry out calculations involving the four operations",
  "evidence": [
   "Explain why 8 + 2 × 5 = 18 (not 50) by referencing multiplication before addition",
   "Evaluate a multi-step expression like 12 ÷ 3 + 4 × 2 correctly as 12",
   "State the correct order: brackets, then orders/exponents, then multiplication/division (L→R), then addition/subtraction (L→R)"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Multiplication & Division",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_XNmGwNggdU": {
  "name": "Numbers to Ten Million",
  "desc": "Solve number and practical problems involving reading, writing, ordering, comparing, rounding, and negative numbers up to 10,000,000",
  "evidence": [
   "A country's population is 8,274,500 — round to the nearest million for a headline",
   "Order the depths of three ocean trenches given in metres including negative values",
   "Estimate the total attendance at three events by rounding each to the nearest 100,000"
  ],
  "age": [
   10,
   11
  ],
  "subject": "Mathematics",
  "domain": "Number Representation & Place Value",
  "type": "PROCEDURAL",
  "pre": [
   "mt__casygEB85",
   "mt_1KkvzwYxbR"
  ]
 },
 "mt_y1XCVsIelg": {
  "name": "Prime numbers",
  "desc": "Know and use the vocabulary of prime numbers, prime factors, and composite numbers; establish whether a number up to 100 is prime; recall prime numbers up to 19",
  "evidence": [
   "Explain that a prime number has exactly two factors: 1 and itself",
   "Determine whether 51 is prime or composite and justify the answer",
   "List all prime numbers up to 19 from memory"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Mathematics",
  "domain": "Multiplication & Division",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_FHIAv6dfhU"
  ]
 },
 "mt_hCVPYlF-7Y": {
  "name": "Square and cube numbers",
  "desc": "Use integer powers and associated real roots (square, cube, and higher); recognise powers of 2, 3, 4, and 5; distinguish between exact representations of roots and their decimal approximations",
  "evidence": [
   "Calculate squares, cubes, and higher integer powers of whole numbers",
   "Find square roots and cube roots of perfect squares and perfect cubes",
   "Recognise key powers (powers of 2 up to 2¹⁰, powers of 3 up to 3⁵, etc.) and distinguish exact roots from approximations"
  ],
  "age": [
   11,
   14
  ],
  "subject": "Mathematics",
  "domain": "Number Representation & Place Value",
  "type": "PROCEDURAL",
  "pre": [
   "mt_jHgRQ4hR0g"
  ]
 },
 "mt_ebPelt-qAl": {
  "name": "Equivalent fractions (age 9+)",
  "desc": "Explain why a fraction a/b is equivalent to (n×a)/(n×b) using visual models; use this principle to recognise and generate equivalent fractions, including tenths and hundredths",
  "evidence": [
   "Use a fraction strip to show 2/3 = 4/6 = 6/9",
   "Explain that multiplying numerator and denominator by the same number gives an equivalent fraction because the size of the whole is unchanged",
   "Generate three fractions equivalent to 3/5 and verify with diagrams"
  ],
  "age": [
   9,
   13
  ],
  "subject": "Mathematics",
  "domain": "Fractions",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_o_p-3tCxiM": {
  "name": "Mixed numbers and improper fractions",
  "desc": "Recognise mixed numbers and improper fractions; convert from one form to the other (e.g. 2/5 + 4/5 = 6/5 = 1 1/5)",
  "evidence": [
   "Convert 11/4 to 2 3/4",
   "Convert 3 2/5 to 17/5",
   "Write 6/5 + 4/5 = 10/5 = 2 as both improper fraction and whole number"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Mathematics",
  "domain": "Fractions",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_b7T-CjOYUR": {
  "name": "Simplifying Fractions",
  "desc": "Use common factors to simplify fractions to their simplest form; use common multiples to express fractions with a common denominator",
  "evidence": [
   "Simplify 18/24 to 3/4 by identifying the HCF of 18 and 24",
   "Express 2/3 and 5/8 with a common denominator of 24",
   "Explain why dividing numerator and denominator by a common factor produces an equivalent fraction"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Fractions",
  "type": "PROCEDURAL",
  "pre": [
   "mt_ebPelt-qAl"
  ]
 },
 "mt_ZM9mhHsyYZ": {
  "name": "Understanding Percentages",
  "desc": "Understand the per cent symbol (%); know that per cent means ‘number of parts per hundred’; write percentages as a fraction with denominator 100 and as a decimal",
  "evidence": [
   "Write 35% as 35/100 and as 0.35",
   "Shade 40% of a 10×10 grid and write the fraction 40/100",
   "Explain that 100% means the whole, 50% means half"
  ],
  "age": [
   9,
   13
  ],
  "subject": "Mathematics",
  "domain": "Fractions",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_ebPelt-qAl"
  ]
 },
 "mt_PL9VkDwXfh": {
  "name": "Comparing fractions (age 10+)",
  "desc": "Compare and order fractions including fractions greater than 1, by converting to common denominators or using benchmarks",
  "evidence": [
   "Order 3/4, 7/8, 5/6, and 11/12 from smallest to largest",
   "Compare 7/5 and 4/3 using common denominators",
   "Place improper fractions and mixed numbers on a number line in correct order"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Fractions",
  "type": "PROCEDURAL",
  "pre": [
   "mt_b7T-CjOYUR"
  ]
 },
 "mt_14T5yPXUq_": {
  "name": "Adding Fractions (Unlike Denominators)",
  "desc": "Add and subtract fractions with unlike denominators (including mixed numbers) by replacing given fractions with equivalent fractions to produce a common denominator",
  "evidence": [
   "Compute 2/3 + 5/4 by converting to twelfths: 8/12 + 15/12 = 23/12",
   "Subtract 1 3/5 from 3 1/4 using a common denominator",
   "Explain the strategy of finding a common denominator and verify using a visual model"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Fractions",
  "type": "PROCEDURAL",
  "pre": [
   "mt_b7T-CjOYUR",
   "mt_o_p-3tCxiM"
  ]
 },
 "mt_AabJisinfi": {
  "name": "Multiplying fractions (age 10+)",
  "desc": "Multiply a fraction or whole number by a fraction, including proper fractions by proper fractions; interpret (a/b) × q as a parts of q partitioned into b equal parts; write answers in simplest form",
  "evidence": [
   "Compute (2/3) × (4/5) = 8/15 and show with an area model",
   "Use a visual model to demonstrate (2/3) × 4 = 8/3 = 2 2/3",
   "Simplify the product 3/4 × 2/3 = 6/12 = 1/2"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Fractions",
  "type": "PROCEDURAL",
  "pre": [
   "mt_b7T-CjOYUR"
  ]
 },
 "mt_4ubP_RMg9o": {
  "name": "Percentage and decimal equivalents",
  "desc": "Solve problems requiring knowledge of percentage and decimal equivalents of 1/2, 1/4, 1/5, 2/5, 4/5 and fractions with denominators that are multiples of 10 or 25",
  "evidence": [
   "State that 1/5 = 20% = 0.2 and use this to find 20% of 60",
   "Convert 3/4 to 75% and to 0.75",
   "A shop offers 25% off a £40 item — what is the sale price?"
  ],
  "age": [
   9,
   13
  ],
  "subject": "Mathematics",
  "domain": "Fractions",
  "type": "PROCEDURAL",
  "pre": [
   "mt_ZM9mhHsyYZ"
  ]
 },
 "mt_PNSyfH56eQ": {
  "name": "Calculating Percentages",
  "desc": "Solve problems involving the calculation of percentages of amounts (e.g. 15% of 360) and the use of percentages for comparison",
  "evidence": [
   "Calculate 15% of 360 by finding 10% and 5% and combining",
   "Compare two discounts given as percentages of different original prices",
   "Explain a strategy for finding any percentage of an amount using known percentage facts"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Ratio & Proportion",
  "type": "PROCEDURAL",
  "pre": [
   "mt_4ubP_RMg9o"
  ]
 },
 "mt_oqziWKry-L": {
  "name": "Angle Sum Rules",
  "desc": "Know that angles at a point sum to 360° (one whole turn), angles on a straight line sum to 180°, and vertically opposite angles are equal; use these facts to find missing angles",
  "evidence": [
   "State that two angles on a straight line add to 180°",
   "Explain that four right angles at a point make 360°",
   "Identify 270° as three right angles"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Mathematics",
  "domain": "Geometry",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_eiB3-6pu6a": {
  "name": "Area and perimeter of rectangles",
  "desc": "Apply the area formula (l × w) and perimeter formula (2l + 2w) for rectangles including squares in real-world and mathematical problems; calculate and compare areas using standard units (cm², m²) and estimate areas of irregular shapes",
  "evidence": [
   "Find the width of a room given area = 48 m² and length = 8 m",
   "Calculate the area of a square with side 7.5 cm",
   "Estimate the area of an irregular pond drawn on a cm² grid"
  ],
  "age": [
   8,
   13
  ],
  "subject": "Mathematics",
  "domain": "Measurement",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_nTL-owFJTF": {
  "name": "Volume of cuboids",
  "desc": "Find the volume of right rectangular prisms by packing with unit cubes and show it equals l × w × h (or base area × height); apply V = l × w × h and V = B × h to solve real-world problems; calculate, estimate, and compare volumes of cubes and cuboids in standard units (cm³, m³); and recognise that the formula applies to cuboids, while an irregular solid built from cubes must be counted or split into cuboids",
  "evidence": [
   "Use V = l × w × h to find the volume of a cuboid 4 cm × 3 cm × 5 cm = 60 cm³",
   "Explain why packing a prism with unit cubes gives the same result as multiplying edge lengths",
   "Compare the 60 cm³ cuboid with an irregular model built from 58 centimetre cubes, explaining that the formula works for the cuboid but the model's cubes must be counted"
  ],
  "age": [
   8,
   13
  ],
  "subject": "Mathematics",
  "domain": "Measurement",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_d8al9JcajP": {
  "name": "Converting measurement units",
  "desc": "Convert between related measurement units using their unit relationship and the relative sizes of the units to choose multiplication or division. Handle whole-number and decimal measurements at the task’s specified precision, including three-decimal-place examples, compound measures and reverse conversions with remainders; explain equivalents and record them in conversion tables. Include metric length, mass and capacity, and time relationships (hours/minutes, minutes/seconds, years/months and weeks/days), distinguishing fixed rates from variable month lengths.",
  "evidence": [
   "Convert 3.25 kg to 3250 g and 45 cm to 0.45 m, explaining why the count grows or shrinks; convert 5 g to 0.005 kg without adding or deleting zeros mechanically",
   "Convert 2 hours 35 minutes to 155 minutes and 150 seconds to 2 minutes 30 seconds, preserving the mixed part or remainder and explaining why the rate is 60 rather than 100",
   "Convert 8 weeks 3 days to 59 days and 2 years 3 months to 27 months; explain why an unspecified month cannot be converted to one fixed number of days",
   "Build and interpret a two-column equivalence table for cm and mm, explain the factor, and use the same relationship to convert in either direction",
   "Convert 2.5 hours to 9000 seconds through minutes, tracking the unit at each step and checking by reversing the conversion"
  ],
  "age": [
   8,
   13
  ],
  "subject": "Mathematics",
  "domain": "Measurement",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_xq3YHZ2zeR": {
  "name": "Parts of a circle",
  "desc": "Illustrate and name parts of circles, including radius, diameter, and circumference; know that the diameter is twice the radius",
  "evidence": [
   "Label the radius, diameter, and circumference on a circle diagram",
   "Calculate the diameter given a radius of 4.5 cm (diameter = 9 cm)",
   "Explain the relationship between radius and diameter in their own words"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Geometry",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_cdMlC7EpTJ": {
  "name": "Angles in triangles (age 10+)",
  "desc": "Find unknown angles in triangles, quadrilaterals, and regular polygons using angle sum properties",
  "evidence": [
   "Find a missing angle in a triangle given two angles (using angle sum = 180°)",
   "Calculate a missing angle in a quadrilateral (angle sum = 360°)",
   "Calculate the interior angle of a regular hexagon from the angle sum formula"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Mathematics",
  "domain": "Geometry",
  "type": "PROCEDURAL",
  "pre": [
   "mt_oqziWKry-L"
  ]
 },
 "mt_ML5t7n2-U8": {
  "name": "Area of Triangles & Parallelograms",
  "desc": "Find the area of parallelograms and triangles by relating them to rectangles: rearrange a parallelogram (cut off a triangle and move it) into a rectangle with the same base and perpendicular height; see a right triangle as half of a rectangle and any triangle as half of a parallelogram (or as two right triangles); use the resulting formulae A = b × h for parallelograms and A = ½ × b × h for triangles, always using the perpendicular height rather than a slanted side, including when the height falls outside an obtuse triangle; and recognise when an area formula can be used (rectangles, parallelograms, triangles) and when another method is needed, such as counting or estimating squares for an irregular shape",
  "evidence": [
   "Cut a right-angled triangle off one end of a parallelogram with base 8 cm and perpendicular height 5 cm, move it to the other end to make an 8 cm × 5 cm rectangle, and state the area as 40 cm²",
   "Show that a right triangle with legs 6 cm and 4 cm is half of a 6 cm × 4 cm rectangle (12 cm²), and that an obtuse triangle with base 12 cm and perpendicular height 7 cm, drawn outside the triangle, is half of a parallelogram (42 cm²)",
   "Decide that a formula gives the area of a parallelogram with base 10 cm and perpendicular height 5 cm (50 cm², not the 60 cm² from its slanted 6 cm side) but not of an irregular leaf shape, whose area must be estimated by counting squares"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Measurement",
  "type": "PROCEDURAL",
  "pre": [
   "mt_eiB3-6pu6a"
  ]
 },
 "mt_J03RFlVdas": {
  "name": "Angle sums in triangles and polygons",
  "desc": "Derive and use the angle sum in a triangle (180°), use it to deduce the angle sum in any polygon ((n−2) × 180°), and calculate interior and exterior angles of regular polygons",
  "evidence": [
   "Calculate a missing angle in a triangle by subtracting the known angles from 180°",
   "Find the sum of interior angles in a hexagon by dividing it into triangles",
   "Calculate each interior and exterior angle of a regular polygon given the number of sides"
  ],
  "age": [
   11,
   14
  ],
  "subject": "Mathematics",
  "domain": "Geometry",
  "type": "PROCEDURAL",
  "pre": [
   "mt_cdMlC7EpTJ"
  ]
 },
 "mt_hBZwbst0ow": {
  "name": "Linear number sequences",
  "desc": "Generate and describe constant-step (linear) number sequences whose terms include negative values (counting through and past zero) or whose step is a decimal, using signed-number and decimal addition and subtraction; state the term-to-term rule, continue the sequence and use the rule to find a later term",
  "evidence": [
   "Continue the sequence 2.5, 4.0, 5.5, ... and state the rule as 'add 1.5', calculating each decimal term",
   "Continue the sequence 5, 2, −1, −4, ... past zero into negative values and state its rule as 'subtract 3'",
   "Use the rule to find a later term of a sequence with negative values or a decimal step, e.g. the 6th term of 4, 1.5, −1, −3.5, ..."
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Algebra",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_Jvg8X0N5u0": {
  "name": "Using Simple Formulae",
  "desc": "Use simple formulae expressed in words or symbols to calculate values (e.g. perimeter = 2 × (length + width))",
  "evidence": [
   "Substitute values into P = 2(l + w) to find the perimeter of a rectangle",
   "Use the formula for area of a triangle (A = 1/2 × b × h) given base and height values",
   "Interpret a formula expressed in words and use it to compute an output"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Algebra",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_i9rJbuFO3p": {
  "name": "Writing Algebraic Equations",
  "desc": "Express missing number problems algebraically using letters for unknowns; translate word problems into equations",
  "evidence": [
   "Write 'I think of a number, double it, and add 5 to get 17' as 2n + 5 = 17",
   "Solve a one-step equation such as 3x = 24 and explain the reasoning",
   "Express a word problem as an algebraic equation and find the unknown value"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Mathematics",
  "domain": "Algebra",
  "type": "REPRESENTATIONAL",
  "pre": []
 },
 "mt_h0gJcSuwdL": {
  "name": "Ratio Problems",
  "desc": "Solve problems involving the relative sizes of two quantities where missing values can be found by using integer multiplication and division facts",
  "evidence": [
   "If the ratio of red to blue beads is 3:5 and there are 15 blue beads, find the number of red beads",
   "Use multiplication facts to find the missing value: 'For every 2 apples there are 5 oranges; if there are 20 oranges, how many apples?'",
   "Explain the multiplicative relationship between two quantities in a ratio context"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Ratio & Proportion",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_t0g2SlP404": {
  "name": "The 0-to-1 Probability Scale",
  "desc": "Understand probability as a measure expressed as a number between 0 (impossible) and 1 (certain); place events on the probability scale; express probabilities as fractions, decimals, and percentages",
  "evidence": [
   "Place events on a number line from 0 (impossible) to 1 (certain), expressing positions as fractions or decimals",
   "Explain that a probability of 0.5 means 'even chance' and connect this to the informal word 'likely'",
   "Convert between informal language ('very unlikely') and a numerical position on the 0-to-1 scale"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Mathematics",
  "domain": "Probability",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_vHzVa3SURC": {
  "name": "Substituting into Formulae",
  "desc": "Substitute numerical values into formulae and expressions including scientific formulae; evaluate expressions by replacing variables with given values and computing the result using correct order of operations",
  "evidence": [
   "Substitute positive and negative values into algebraic expressions and evaluate",
   "Substitute values into formulae involving multiple operations and powers",
   "Use correct order of operations when evaluating expressions after substitution"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Mathematics",
  "domain": "Algebra",
  "type": "PROCEDURAL",
  "pre": [
   "mt_Jvg8X0N5u0",
   "mt_i9rJbuFO3p"
  ]
 },
 "mt_Zt30Gxi-qp": {
  "name": "Calculating Simple Probability",
  "desc": "Calculate the probability of a simple event with equally likely outcomes using the formula: probability = number of favourable outcomes ÷ total number of possible outcomes; express the result as a fraction in its simplest form; apply to rolling dice, drawing from bags, and other simple chance situations",
  "evidence": [
   "Calculate the probability of drawing a blue marble from a bag of 3 blue and 7 red as 3/10",
   "Use the formula P(event) = favourable outcomes ÷ total outcomes to solve at least three different problems",
   "Explain why increasing the number of favourable outcomes increases the probability"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Mathematics",
  "domain": "Probability",
  "type": "PROCEDURAL",
  "pre": [
   "mt_t0g2SlP404"
  ]
 },
 "mt_QhFEDyIwSO": {
  "name": "Solving Linear Equations",
  "desc": "Use algebraic methods to solve linear equations in one variable, including equations that require rearrangement, expanding brackets, and collecting terms on both sides; solve equations with rational number coefficients",
  "evidence": [
   "Solve one-step and two-step linear equations in one variable",
   "Solve equations requiring expansion of brackets and collection of like terms",
   "Solve equations with the unknown on both sides and with fractional or negative coefficients"
  ],
  "age": [
   11,
   14
  ],
  "subject": "Mathematics",
  "domain": "Algebra",
  "type": "PROCEDURAL",
  "pre": [
   "mt_vHzVa3SURC"
  ]
 },
 "mt_5l7iGkf1Tp": {
  "name": "The solar system",
  "desc": "Describe the sun, Earth, and moon as approximately spherical bodies, and describe the movement of the Earth and other planets orbiting the sun in the solar system",
  "evidence": [
   "State that the sun, Earth, and moon are approximately spherical",
   "Name the planets in order from the sun and explain they all orbit the sun",
   "Describe the moon orbiting the Earth while both orbit the sun"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Science",
  "domain": "Space Systems & Earth's History",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_aulwq39aj8": {
  "name": "The Vast Scale of Space",
  "desc": "Describe the scale of the universe in nested layers: Earth is one planet in our solar system, the Sun is one star among billions in the Milky Way galaxy, and the Milky Way is one galaxy among billions in the universe",
  "evidence": [
   "State that the Milky Way is our galaxy and it contains billions of stars",
   "Explain the hierarchy: planet → solar system → galaxy → universe",
   "Use a comparison to convey cosmic scale (e.g. if the Sun were a football, Earth would be a peppercorn 26 metres away)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Space Exploration",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_ae-cHHFR76": {
  "name": "Why the Sun Looks Brightest",
  "desc": "Explain why the Sun appears much brighter than other stars: it is the nearest star to Earth, not the biggest or brightest star in the universe — understanding the difference between apparent brightness (how bright something looks) and actual brightness",
  "evidence": [
   "State that the Sun is a medium-sized star that appears brightest because it is the closest star to Earth",
   "Explain the difference between apparent brightness (how bright it looks) and actual brightness (how much light it gives off)",
   "Give an example: a torch held close looks brighter than a distant floodlight, even though the floodlight is more powerful"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Space Exploration",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_H9RAGGiHBL": {
  "name": "Space Exploration Milestones",
  "desc": "Describe key milestones in human space exploration: the Space Race (Sputnik, Yuri Gagarin, Apollo 11 Moon landing), the Space Shuttle era, the International Space Station, and current missions (Artemis programme, Mars exploration plans, commercial spaceflight)",
  "evidence": [
   "Name Sputnik as the first satellite (1957) and Yuri Gagarin as the first person in space (1961)",
   "Describe the Apollo 11 Moon landing (1969) with Neil Armstrong and Buzz Aldrin",
   "Name at least one current space programme (Artemis, SpaceX, ISS) and describe its goal"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Space Exploration",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_q15w--Fb5H": {
  "name": "Earth's rotation and day/night",
  "desc": "Use the idea of the Earth's rotation to explain day and night and the apparent movement of the sun across the sky",
  "evidence": [
   "Explain that the Earth rotates (spins) on its axis once every 24 hours",
   "Describe how this rotation causes day (facing the sun) and night (facing away)",
   "Explain that the sun appears to move across the sky because we are rotating, not the sun"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Science",
  "domain": "Space Systems & Earth's History",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_5l7iGkf1Tp"
  ]
 },
 "mt_iTjrKEdAOj": {
  "name": "Life Cycle of Stars",
  "desc": "Understand the basics of a star’s life cycle: stars are born in clouds of gas and dust (nebulae), shine for millions or billions of years by fusing hydrogen, and eventually die — massive stars explode as supernovae while smaller stars fade into white dwarfs",
  "evidence": [
   "Describe that stars form from clouds of gas and dust called nebulae",
   "State that stars produce energy by fusing hydrogen into helium in their cores",
   "Explain that massive stars end in a supernova explosion while smaller stars shrink to become white dwarfs"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Space Exploration",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_ae-cHHFR76"
  ]
 },
 "mt_4V-vYhFUcm": {
  "name": "Phases of the Moon",
  "desc": "Explain the phases of the Moon as the changing angle of sunlight on the lunar surface as seen from Earth, and describe how solar and lunar eclipses occur",
  "evidence": [
   "Explains that the phases of the Moon arise from the changing geometry of Sun, Earth, and Moon, not Earth's shadow",
   "Describes the sequence of Moon phases over approximately 28 days",
   "Distinguishes between a solar eclipse (Moon between Sun and Earth) and a lunar eclipse (Earth between Sun and Moon)"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Space Systems & Earth's History",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_q15w--Fb5H"
  ]
 },
 "mt_lFiDFPkVmH": {
  "name": "Why We Have Seasons",
  "desc": "Explain that the seasons are caused by the tilt of Earth's axis during its orbit around the Sun, distinguishing this from the common misconception that seasons are caused by changing distance from the Sun",
  "evidence": [
   "Explains that Earth's axis is tilted at about 23.5° relative to its orbit",
   "Describes how the tilted axis causes one hemisphere to receive more direct sunlight in summer and less in winter",
   "Refutes the misconception that distance from the Sun causes seasons by noting Earth is actually slightly closer to the Sun in January"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Space Systems & Earth's History",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_q15w--Fb5H"
  ]
 },
 "mt_F3ATPTCYm6": {
  "name": "Force & Motion Vocabulary",
  "desc": "Use technical vocabulary for force and motion — balanced forces, unbalanced forces, resultant force, acceleration, deceleration, speed, moment, lever, fulcrum, mechanical advantage — and apply these when explaining and predicting how forces affect the motion and position of objects",
  "evidence": [
   "Distinguish between balanced and unbalanced forces and describe the effect of each on an object's motion",
   "Use 'resultant force' correctly when describing the net effect of two or more forces acting on an object",
   "Apply 'moment', 'lever', and 'fulcrum' correctly when describing how simple machines work"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Forces & Motion",
  "type": "LANGUAGE",
  "pre": []
 },
 "mt_3WMADSy0mA": {
  "name": "Balanced & Unbalanced Forces",
  "desc": "Plan and conduct an investigation to provide evidence of the effects of balanced and unbalanced forces on the motion of an object",
  "evidence": [
   "Define balanced forces (equal in size, opposite in direction — no change in motion) and unbalanced forces (cause motion to change)",
   "Plan a fair test investigating how different force sizes affect an object's motion",
   "Use results as evidence to explain when forces are balanced versus unbalanced"
  ],
  "age": [
   8,
   12
  ],
  "subject": "Science",
  "domain": "Forces & Motion",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_56aspHjU19": {
  "name": "Magnetic Fields",
  "desc": "Describe magnetic poles (north and south), explain attraction and repulsion between poles, describe magnetic field lines plotted using a compass, and explain the Earth's magnetic field and its practical uses",
  "evidence": [
   "States the rule for attraction and repulsion of magnetic poles",
   "Draws the magnetic field pattern around a bar magnet from memory or compass readings",
   "Explains why a compass needle points north",
   "Explains that the Earth has a magnetic field and describes how it is used for navigation"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Forces & Motion",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_AvrQauS_zX": {
  "name": "Gravity & Falling Objects",
  "desc": "Explain that unsupported objects fall towards the Earth because of the force of gravity acting between the Earth and the falling object",
  "evidence": [
   "Define gravity as a force of attraction between the Earth and objects",
   "Explain that unsupported objects fall because gravity pulls them towards the Earth",
   "Give examples showing gravity in action (dropping objects, jumping, water flowing downhill)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Forces & Motion",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_3WMADSy0mA"
  ]
 },
 "mt_Y9k86G8BBT": {
  "name": "Air Resistance & Friction",
  "desc": "Identify the effects of air resistance, water resistance, and friction, and understand that these forces act between moving surfaces to oppose motion",
  "evidence": [
   "Define air resistance, water resistance, and friction as forces that oppose motion",
   "Give everyday examples of each force and explain how they slow things down",
   "Describe how these forces depend on factors like speed, surface area, or surface texture"
  ],
  "age": [
   8,
   12
  ],
  "subject": "Science",
  "domain": "Forces & Motion",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_AvrQauS_zX"
  ]
 },
 "mt_sUVeVXzRuq": {
  "name": "Mass vs Weight",
  "desc": "Distinguish between mass (amount of matter, measured in kg) and weight (gravitational force, measured in N), use the equation weight = mass × gravitational field strength, and explain why g differs on other planets and stars",
  "evidence": [
   "Explains the difference between mass and weight with correct units for each",
   "Calculates weight using W = mg with g = 10 N/kg on Earth",
   "Predicts what would happen to an object's weight on the Moon or Jupiter",
   "Explains why mass stays constant but weight changes in different gravitational fields"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Forces & Motion",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_AvrQauS_zX"
  ]
 },
 "mt_Q2k3fSwyzQ": {
  "name": "Levers, Pulleys & Gears",
  "desc": "Recognise that some mechanisms including levers, pulleys, and gears allow a smaller force to have a greater effect",
  "evidence": [
   "Describe how a lever works: effort at one end moves a load at the other, with a pivot in between",
   "Explain how a pulley changes the direction of a force and can make lifting easier",
   "Describe how gears transfer and change the size or direction of forces"
  ],
  "age": [
   8,
   12
  ],
  "subject": "Science",
  "domain": "Forces & Motion",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_F3ATPTCYm6",
   "mt_AvrQauS_zX"
  ]
 },
 "mt_6w2g7aoPgz": {
  "name": "How We See Objects",
  "desc": "Develop a model to describe that light reflecting from objects and entering the eye allows objects to be seen",
  "evidence": [
   "Draw a diagram showing light source → light hits object → reflects into eye",
   "Explain that we see objects because reflected light enters our eyes, not because our eyes send out light",
   "Use this model to explain why we can't see in total darkness (no light to reflect)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Waves, Light & Sound",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_ydtcIBwHB9": {
  "name": "Sound Travels Through Materials",
  "desc": "Recognise that vibrations from sounds travel through a medium (solid, liquid, or gas) to the ear",
  "evidence": [
   "Explain that sound vibrations need a material (medium) to travel through — they can't travel in a vacuum",
   "Give examples of sound travelling through different media: air, water, solid objects",
   "Describe how a string telephone works: voice vibrates the cup, vibrations travel along the string to the other cup"
  ],
  "age": [
   8,
   10
  ],
  "subject": "Science",
  "domain": "Waves, Light & Sound",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_NzCNuABT3E": {
  "name": "Circuit vocabulary",
  "desc": "Use technical vocabulary for electrical circuits — circuit, component, cell, battery, current, voltage, resistance, conductor, insulator, switch, series circuit, parallel circuit — and apply these when describing, drawing, and designing working circuits",
  "evidence": [
   "Use 'series' and 'parallel' correctly to describe two different circuit configurations and explain the key difference",
   "Apply 'current', 'voltage', and 'resistance' correctly in a written description of how a circuit works",
   "Name at least six standard circuit components and describe what each one does"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Science",
  "domain": "Energy",
  "type": "LANGUAGE",
  "pre": []
 },
 "mt_d-EKO-pKkP": {
  "name": "Conductors and insulators",
  "desc": "Recognise some common conductors and insulators, and associate metals with being good conductors of electricity",
  "evidence": [
   "Define conductors (allow electricity to flow through) and insulators (block electricity)",
   "Test at least six materials and correctly classify them as conductors or insulators",
   "State that metals are generally good conductors and explain why wires are made of metal with plastic coating"
  ],
  "age": [
   8,
   12
  ],
  "subject": "Science",
  "domain": "Energy",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_qZro923zvz": {
  "name": "Light Travels in Straight Lines",
  "desc": "Recognise that light appears to travel in straight lines and use this to explain how we see objects and why shadows have the same shape as the objects that cast them",
  "evidence": [
   "State and demonstrate that light travels in straight lines (e.g. can't see around corners, laser pointer)",
   "Use straight-line light to explain why shadows have the same outline shape as the object",
   "Draw ray diagrams showing light travelling from source, being blocked by object, creating shadow on screen"
  ],
  "age": [
   10,
   11
  ],
  "subject": "Science",
  "domain": "Waves, Light & Sound",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_6w2g7aoPgz"
  ]
 },
 "mt_DQk9oDE7gr": {
  "name": "How Sound Waves Travel",
  "desc": "Explain that sound is produced by vibrating objects and travels as a longitudinal pressure wave through solids, liquids, and gases; describe reflection of sound (echoes) and absorption; explain why sound cannot travel through a vacuum",
  "evidence": [
   "Explains how a vibrating object creates regions of compression and rarefaction in air",
   "Explains why sound travels fastest in solids and cannot travel in a vacuum",
   "Describes how an echo is produced and gives a practical application (sonar, ultrasound)",
   "Explains what sound absorption means and why soft furnishings reduce echoes"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Waves, Light & Sound",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_ydtcIBwHB9"
  ]
 },
 "mt_vFT_GbkP9m": {
  "name": "More batteries, brighter bulb",
  "desc": "Associate the brightness of a lamp or volume of a buzzer with the number and voltage of cells used in a series circuit",
  "evidence": [
   "Describe the pattern: more cells (or higher voltage) = brighter bulb / louder buzzer",
   "Explain that more cells provide more energy to the circuit",
   "Predict the effect of changing the number of cells on a component's behaviour"
  ],
  "age": [
   10,
   11
  ],
  "subject": "Science",
  "domain": "Energy",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_NzCNuABT3E"
  ]
 },
 "mt_PifbJOuXrG": {
  "name": "Reflection & Refraction",
  "desc": "State the law of reflection (angle of incidence = angle of reflection) and explain refraction as the change in speed and direction when light crosses a boundary between two media; apply ray diagrams for plane mirrors and refracting surfaces",
  "evidence": [
   "States the law of reflection and applies it to draw a reflected ray correctly",
   "Draws a ray diagram for a plane mirror showing a virtual image",
   "Explains why a pencil looks bent in a glass of water using refraction",
   "Explains qualitatively why light bends towards the normal when entering a denser medium"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Waves, Light & Sound",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_qZro923zvz"
  ]
 },
 "mt_qzGADV-NGe": {
  "name": "White Light & Colour",
  "desc": "Explain that white light is a mixture of all visible colours (ROYGBIV), describe dispersion through a prism, explain why objects appear coloured (selective reflection and absorption of wavelengths), and describe colour mixing with filters",
  "evidence": [
   "Lists the colours of the visible spectrum in order of increasing frequency",
   "Explains why a prism disperses white light into a spectrum",
   "Explains why a red object looks red under white light but black under blue light",
   "Predicts the colour of an object seen through a colour filter"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Waves, Light & Sound",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_PifbJOuXrG"
  ]
 },
 "mt_Ruk2-lyGPZ": {
  "name": "The Digestive System",
  "desc": "Describe the simple functions of the basic parts of the human digestive system: mouth, oesophagus, stomach, small intestine, large intestine",
  "evidence": [
   "Name the main organs in order: mouth, oesophagus, stomach, small intestine, large intestine",
   "Describe the function of each (mouth chews, stomach breaks down, small intestine absorbs nutrients)",
   "Draw or label a simple diagram of the digestive system"
  ],
  "age": [
   8,
   11
  ],
  "subject": "Science",
  "domain": "Organisms & Life Processes",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_sDmrVCfzqt": {
  "name": "Nutrients in a Healthy Diet",
  "desc": "Identify the seven components of a healthy diet — carbohydrates, lipids, proteins, vitamins, minerals, dietary fibre, and water — and explain the role of each in the body",
  "evidence": [
   "Names all seven dietary components and a food source for each",
   "Explains what each nutrient does in the body (e.g. proteins for growth and repair)",
   "Identifies which nutrients provide energy and which do not"
  ],
  "age": [
   11,
   13
  ],
  "subject": "Science",
  "domain": "Organisms & Life Processes",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_VfA4xo4kUv": {
  "name": "Cells Under the Microscope",
  "desc": "Understand that all living organisms are made of cells and use a light microscope to observe, interpret, and record cell structure",
  "evidence": [
   "States that all living things are made of cells",
   "Prepares or examines a slide of cells (e.g. onion skin, cheek cells) under a microscope",
   "Draws and labels a diagram of cells observed",
   "Identifies nucleus, cytoplasm, and cell membrane in a microscope image"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Organisms & Life Processes",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_oB-L8EVdIP": {
  "name": "Food Chains & Energy Transfer",
  "desc": "Construct and interpret food chains identifying producers, predators, and prey, and understand energy transfer between trophic levels",
  "evidence": [
   "Construct a food chain with at least four organisms, labelling producer, primary consumer, predator",
   "Define producer, predator, and prey with examples",
   "Interpret a given food chain to predict what happens if one organism is removed"
  ],
  "age": [
   8,
   10
  ],
  "subject": "Science",
  "domain": "Ecosystems & Habitats",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_IY3KwGLZgk": {
  "name": "Classifying Organisms",
  "desc": "Describe how living things are classified into broad groups (micro-organisms, plants, animals) according to common observable characteristics, similarities, and differences",
  "evidence": [
   "Name the broad classification groups: micro-organisms, plants, animals (and fungi if known)",
   "Describe observable characteristics used for classification (e.g. plants make own food, animals move and eat)",
   "Give examples of organisms in each group, including micro-organisms like bacteria"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Science",
  "domain": "Ecosystems & Habitats",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_LRzjbo1Fn6": {
  "name": "How animals adapt to environments",
  "desc": "Identify how animals and plants are adapted to suit their environment and understand that adaptation may lead to evolution over time",
  "evidence": [
   "Define adaptation as a feature that helps an organism survive in its environment",
   "Give at least three examples of adaptations in different organisms and explain how each helps survival",
   "Explain that over many generations, organisms with helpful adaptations survive and reproduce more, leading to evolution"
  ],
  "age": [
   8,
   11
  ],
  "subject": "Science",
  "domain": "Organisms & Life Processes",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_BX4D8cCFtQ": {
  "name": "The Circulatory System",
  "desc": "Identify and name the main parts of the human circulatory system and describe the functions of the heart, blood vessels, and blood",
  "evidence": [
   "Name the main components: heart, arteries, veins, capillaries, blood",
   "Describe the heart as a pump that pushes blood around the body in a continuous loop",
   "Explain that blood carries oxygen and nutrients to cells and removes waste products like carbon dioxide"
  ],
  "age": [
   10,
   11
  ],
  "subject": "Science",
  "domain": "Organisms & Life Processes",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_Ruk2-lyGPZ"
  ]
 },
 "mt_bABr-c2DfV": {
  "name": "Parts of Plant and Animal Cells",
  "desc": "Describe the functions of the main components of plant and animal cells: cell wall, cell membrane, cytoplasm, nucleus, vacuole, mitochondria, ribosomes, and chloroplasts",
  "evidence": [
   "Names the main organelles in plant and animal cells",
   "Explains the function of each organelle in their own words",
   "Links organelle function to the needs of the whole cell (e.g. mitochondria produce energy for cell activities)"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Organisms & Life Processes",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_VfA4xo4kUv"
  ]
 },
 "mt_URTJbS3hhs": {
  "name": "Food Webs & Interdependence",
  "desc": "Construct and interpret food webs showing the interdependence of organisms in an ecosystem, explaining how a change in one population affects others",
  "evidence": [
   "Draws a food web from given data with arrows showing energy flow direction",
   "Predicts how the population of one species would change if another species increased or decreased",
   "Distinguishes a food web from a food chain and explains why webs are more realistic",
   "Identifies producers, primary consumers, secondary consumers, and apex predators"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Ecosystems & Habitats",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_oB-L8EVdIP"
  ]
 },
 "mt_zM5vu31jgl": {
  "name": "Photosynthesis",
  "desc": "Explain photosynthesis as the process by which plants use light energy to convert carbon dioxide and water into glucose and oxygen, and describe how mineral nutrients are absorbed through roots",
  "evidence": [
   "Writes and explains the word equation for photosynthesis",
   "Identifies the raw materials needed and the products made",
   "Explains the role of chlorophyll in capturing light energy",
   "Distinguishes between what plants get from the air (CO₂), soil (water and minerals), and light"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Organisms & Life Processes",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_bABr-c2DfV"
  ]
 },
 "mt_YQkUdIHO8L": {
  "name": "Solids, Liquids & Gases",
  "desc": "Compare and group materials as solids, liquids, or gases based on their observable properties and behaviour",
  "evidence": [
   "Define solids (fixed shape, hard to compress), liquids (flow, take shape of container), gases (spread out, fill space)",
   "Sort at least eight everyday materials into solid, liquid, or gas categories",
   "Explain tricky cases like sand (solid particles) or steam (gas, not visible water droplets)"
  ],
  "age": [
   8,
   11
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_Qkewo5M3_c": {
  "name": "Evaporation & the Water Cycle",
  "desc": "Identify the role of evaporation and condensation in the water cycle, and associate the rate of evaporation with temperature",
  "evidence": [
   "Describe evaporation as liquid turning to gas and condensation as gas turning to liquid",
   "Explain the water cycle: evaporation from seas/lakes → condensation into clouds → precipitation",
   "Explain why evaporation happens faster at higher temperatures (e.g. puddles dry faster on hot days)"
  ],
  "age": [
   8,
   10
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_ylruY6VhOf": {
  "name": "Matter Is Made of Particles",
  "desc": "Develop a model to describe that matter is made of particles too small to be seen, and that this explains properties of solids, liquids, and gases",
  "evidence": [
   "Describe matter as made of particles too small to see with the naked eye",
   "Use a particle model to explain differences: particles tightly packed (solid), loosely arranged (liquid), spread far apart (gas)",
   "Use the particle model to explain a state change (e.g. heating makes particles move faster and spread apart)"
  ],
  "age": [
   10,
   11
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_YQkUdIHO8L"
  ]
 },
 "mt_Mf-T-fYRLX": {
  "name": "Dissolving & Solutions",
  "desc": "Understand that some materials dissolve in liquid to form a solution, and describe how to recover a substance from a solution by evaporation",
  "evidence": [
   "Explain that dissolving means a solid mixes completely into a liquid to form a solution",
   "Describe how to recover a dissolved substance by evaporating the liquid",
   "Distinguish between a mixture (can see separate parts) and a solution (looks clear, fully dissolved)"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_YQkUdIHO8L",
   "mt_Qkewo5M3_c"
  ]
 },
 "mt_UKmtuAsSLN": {
  "name": "Reversible Changes",
  "desc": "Demonstrate selected recoverable physical changes — dissolving an appropriate solid, mixing separable materials and changes of state — in which no new substances form, and explain the specific operation that recovers the original materials",
  "evidence": [
   "Define a reversible change as one where the original materials can be recovered",
   "Give at least three examples of reversible changes: melting, freezing, dissolving, evaporating",
   "Explain how to reverse each example (e.g. freeze melted chocolate, evaporate a solution)"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_Mf-T-fYRLX"
  ]
 },
 "mt_2b6CB0w3Yx": {
  "name": "Separating Mixtures",
  "desc": "Use knowledge of solids, liquids, and gases to decide how mixtures might be separated through filtering, sieving, and evaporating",
  "evidence": [
   "Choose the correct separation method for a given mixture (sieving for large particles, filtering for small, evaporating for dissolved)",
   "Describe a multi-step separation plan for a complex mixture like sand, salt, and water",
   "Explain why each method works based on the properties of the materials"
  ],
  "age": [
   9,
   10
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "PROCEDURAL",
  "pre": [
   "mt_Mf-T-fYRLX"
  ]
 },
 "mt_Z_Wu_77ybI": {
  "name": "Atoms, Elements & Compounds",
  "desc": "Explain the differences between atoms, elements, and compounds; describe the simple Bohr model of the atom (nucleus with protons and neutrons, electrons in shells); and write and interpret chemical symbols and simple formulae",
  "evidence": [
   "Defines atom, element, and compound and distinguishes between them with examples",
   "Draws a simple Bohr model of an atom labelling nucleus (protons/neutrons) and electron shells",
   "Reads a chemical formula to identify the elements and number of each atom (e.g. H₂O, CO₂, NaCl)",
   "Identifies the difference between a mixture and a compound"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_ylruY6VhOf"
  ]
 },
 "mt_rbPioPELM1": {
  "name": "Irreversible Changes",
  "desc": "Explain that some changes result in the formation of new materials and are not usually reversible, such as burning, rusting, and reactions with acid",
  "evidence": [
   "Explain that the selected changes form new substances and cannot normally be undone by simple physical actions such as cooling, filtering or evaporating",
   "Give at least three examples: burning, rusting, mixing bicarbonate of soda with vinegar",
   "Describe observable signs of irreversible change: gas produced, colour change, heat given off, new substance formed"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_UKmtuAsSLN"
  ]
 },
 "mt_AN2kJE6I0s": {
  "name": "Acids, Alkalis & pH",
  "desc": "Define acids and alkalis in terms of hydrogen ion concentration, describe the pH scale (0–14), and explain how indicators are used to identify and measure acidity or alkalinity",
  "evidence": [
   "States that acids have pH below 7, alkalis have pH above 7, and neutral is pH 7",
   "Explains what hydrogen ions (H⁺) have to do with acidity",
   "Names common indicators (litmus, universal indicator) and describes colour changes",
   "Identifies everyday acids (vinegar, lemon juice) and alkalis (bleach, bicarbonate of soda)"
  ],
  "age": [
   12,
   13
  ],
  "subject": "Science",
  "domain": "Matter & Materials",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_Z_Wu_77ybI"
  ]
 },
 "mt_mdZ3nBWChW": {
  "name": "Measuring Earthquake Strength",
  "desc": "Know that scientists measure earthquakes using seismometers, that earthquakes release energy that travels as waves through the ground, and that a magnitude scale describes their strength",
  "evidence": [
   "Explain that a seismometer is an instrument that detects and records ground shaking",
   "Describe earthquake energy as waves that travel outward from where rocks broke",
   "Interpret a magnitude number as a measure of an earthquake's strength"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Volcanoes & Earthquakes",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_bqL8DD1SbV": {
  "name": "Types of rocks",
  "desc": "Use vocabulary for Earth's geological processes and rock types — igneous, sedimentary, metamorphic, erosion, weathering, deposition, fossil, sediment, strata, permeable, impermeable — and apply these when explaining how rocks form and how landscapes change over time",
  "evidence": [
   "Correctly classify igneous, sedimentary, and metamorphic rocks and explain in one sentence how each type forms",
   "Use 'erosion', 'weathering', and 'deposition' correctly as three distinct stages in a sequence",
   "Explain how fossils form using 'sediment' and 'sedimentary rock' correctly"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Earth's Systems",
  "type": "LANGUAGE",
  "pre": []
 },
 "mt_-YYnLLIZh5": {
  "name": "Sun-Driven Weather Systems",
  "desc": "Understand how the Sun drives weather: the Sun heats Earth's surface unevenly (land heats faster than water, equator gets more heat than poles), creating differences in air pressure that cause wind patterns, ocean currents, and large-scale weather systems",
  "evidence": [
   "Explain that the Sun heats land and water at different rates",
   "Describe how temperature differences create air pressure differences that drive wind",
   "Connect uneven heating to large-scale weather patterns"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Weather & Climate",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_eDaSAl6DwW": {
  "name": "Locating places with latitude and longitude",
  "desc": "Use a labelled latitude/longitude graticule on a map or globe to locate and describe positions from the Equator and a stated zero-longitude reference. Interpret north/south and east/west degree values together and keep the same geographic position across changed views or representations. Read the stated coordinate labels, order and resolution rather than impose a Cartesian x-first rule or treat grid spacing as ground distance.",
  "evidence": [
   "Identify latitude as north/south of the Equator and longitude as east/west of the stated zero meridian, with the correct degree values and directional labels. Distinguish a line’s direction on the model from the direction its value measures.",
   "Locate a supplied latitude/longitude position at the appropriate intersection and read both named coordinates of marked positions, including opposite-hemisphere contrasts and a zero-reference point, using the provided resolution.",
   "Use supplied coordinates for a named place on a suitable map/globe and explain the approximation/precision given. A place label, guessed continent or one coordinate alone is not a complete geographic location.",
   "Transfer to a new, turned or differently centred labelled representation, retaining the geographic references and stated field convention; do not infer equal physical distances from equal-looking flat-grid intervals."
  ],
  "age": [
   11,
   12
  ],
  "subject": "Geography",
  "domain": "Maps & Spatial Skills",
  "type": "REPRESENTATIONAL",
  "pre": []
 },
 "mt_vAP_A986IQ": {
  "name": "Erosion and weathering",
  "desc": "Make observations and measurements to provide evidence of the effects of weathering or the rate of erosion by water, ice, wind, or vegetation",
  "evidence": [
   "Define weathering (breaking down of rock in place) and erosion (movement of broken rock/soil, which is dropped elsewhere as deposition)",
   "Describe the effects of at least three agents of weathering/erosion: water, ice, wind, vegetation",
   "Provide evidence from observations showing how weathering or erosion has changed a landscape"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Earth's Systems",
  "type": "PROCEDURAL",
  "pre": [
   "mt_bqL8DD1SbV"
  ]
 },
 "mt_TMOzMCE17H": {
  "name": "Climate Zones",
  "desc": "Understand that Earth has distinct climate zones — tropical (hot and wet near the equator), temperate (moderate, with four seasons), polar (freezing cold), arid/desert (very dry), and mountain (cold at high altitude) — and that each zone supports different ecosystems and ways of life",
  "evidence": [
   "Name and describe at least four climate zones",
   "Explain what determines which zone a place belongs to (mainly latitude and geography)",
   "Give an example of how a climate zone affects the plants, animals, or people living there"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Weather & Climate",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_-YYnLLIZh5"
  ]
 },
 "mt_XrvPx5kUfO": {
  "name": "Tectonic Plates",
  "desc": "Understand that Earth's crust is broken into large pieces called tectonic plates that float on hotter, softer rock beneath and move very slowly — a few centimetres per year",
  "evidence": [
   "Describe Earth's crust as broken into large plates",
   "Explain that the plates float on hotter, partially melted rock underneath",
   "State that plates move very slowly, typically a few centimetres per year"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Volcanoes & Earthquakes",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_vAP_A986IQ"
  ]
 },
 "mt_DbI1kNg_0R": {
  "name": "Climate Change Basics",
  "desc": "Understand the basics of climate change: Earth’s atmosphere traps some of the Sun's heat (the greenhouse effect), burning fossil fuels adds extra greenhouse gases (especially CO₂), this is making Earth gradually warmer, and this warming changes weather patterns, melts ice, and raises sea levels",
  "evidence": [
   "Describe the greenhouse effect: the atmosphere traps heat from the Sun",
   "Explain that burning fossil fuels increases CO₂ in the atmosphere",
   "Name at least two consequences of global warming: changing weather patterns, melting ice, rising seas"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Science",
  "domain": "Weather & Climate",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_TMOzMCE17H"
  ]
 },
 "mt_-JnOhdei6F": {
  "name": "Plate Boundaries",
  "desc": "Explain how plate boundaries cause earthquakes and volcanoes: plates pushing together, pulling apart, or sliding past each other create the forces that trigger these events, and mountains form where plates collide",
  "evidence": [
   "Describe three types of plate boundary movement: convergent, divergent, and transform",
   "Explain that earthquakes occur when plates grind or collide at boundaries",
   "Explain that volcanoes form where plates pull apart or one slides under another, allowing magma to rise"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Volcanoes & Earthquakes",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_XrvPx5kUfO"
  ]
 },
 "mt_W4j7T_PnGH": {
  "name": "Eruption Types & Volcano Shape",
  "desc": "Understand that not all volcanic eruptions are the same: some flow gently (effusive) and some explode violently (explosive), depending on the properties of the magma, and that volcano shape is related to eruption type",
  "evidence": [
   "Contrast effusive eruptions (gentle lava flows) with explosive eruptions (violent blasts of ash and rock)",
   "Explain that eruption type depends on properties of the magma such as thickness and gas content",
   "Connect volcano shape to eruption style: shield volcanoes from runny lava, steep cones from thick explosive magma"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Science",
  "domain": "Volcanoes & Earthquakes",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_-JnOhdei6F"
  ]
 },
 "mt_LN_g2b3d34": {
  "name": "Conjunctions, Prepositions and Interjections",
  "desc": "Explain the function of conjunctions, prepositions, and interjections in general and in particular sentences, understanding how each word class contributes to meaning",
  "evidence": [
   "Identify conjunctions, prepositions, and interjections in sentences and explain their function",
   "Explain how removing a preposition or conjunction changes the meaning of a sentence",
   "Use interjections appropriately to convey emotion in dialogue or informal writing"
  ],
  "age": [
   8,
   12
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_J5cx6S_eT9": {
  "name": "Grammar Terms: Pronouns and Determiners",
  "desc": "Know and use Year 4 grammar terminology including determiner, pronoun, possessive pronoun, and adverbial",
  "evidence": [
   "Label the determiner, pronoun, and adverbial in 'She quickly opened her present on the table'",
   "Explain the difference between a possessive pronoun ('mine', 'theirs') and other pronouns ('I', 'they')",
   "Use the terms 'determiner' and 'adverbial' accurately when discussing a classmate's writing"
  ],
  "age": [
   8,
   10
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "LANGUAGE",
  "pre": []
 },
 "mt_0QJoKWABdC": {
  "name": "Fronted Adverbials and Commas",
  "desc": "Use fronted adverbials to vary sentence openings and punctuate them with commas",
  "evidence": [
   "Write a sentence beginning with a time adverbial, e.g. 'Later that day, the children ran home'",
   "Rewrite 'The fox crept through the garden at midnight' with the adverbial fronted and a comma placed correctly",
   "Identify and correct a missing comma after a fronted adverbial in 'Before breakfast she packed her bag'"
  ],
  "age": [
   8,
   12
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_YQ64pzcLDl": {
  "name": "Relative Clauses",
  "desc": "Form and use relative clauses beginning with relative pronouns (who, whose, whom, which, that) and relative adverbs (where, when, why) to add detail, qualify nouns, and create complex sentences",
  "evidence": [
   "Combine a main clause with a relative clause using 'who' or 'which' to add information about a noun, e.g. 'The dog, which had a red collar, barked loudly'",
   "Choose the correct relative pronoun (who for people, which for things, where for places, when for times) and identify the noun it refers back to",
   "Recognise that a relative clause beginning with 'that' can often replace 'who' or 'which' in defining clauses, e.g. 'The book that I read' vs 'The book which I read'"
  ],
  "age": [
   9,
   12
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_m3-eXac3aP": {
  "name": "Brackets and dashes for parenthesis",
  "desc": "Use brackets, dashes, and commas to indicate parenthesis — additional information inserted into a sentence that could be removed without changing the sentence's core meaning",
  "evidence": [
   "Insert a parenthetical phrase using paired brackets, e.g. 'The oldest building (built in 1642) stands in the town square'",
   "Use paired dashes to add an aside or extra detail within a sentence, e.g. 'My brother — who is older than me — lives in London'",
   "Choose between brackets, dashes, and commas for parenthesis based on how much emphasis the aside should receive, recognising that dashes give most prominence and brackets give least"
  ],
  "age": [
   9,
   12
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_uycuqPaiJ1": {
  "name": "Colons and Semicolons in Lists",
  "desc": "Use a colon to introduce a list and semi-colons to separate items within lists, particularly when list items contain internal commas or are complex phrases",
  "evidence": [
   "Introduce a list with a colon after an independent clause such as 'You will need the following items:'",
   "Use semi-colons to separate list items that contain commas such as locations with city and country",
   "Punctuate complex lists in formal writing maintaining clarity and consistency"
  ],
  "age": [
   10,
   12
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_gbTyzvnWzr": {
  "name": "Active and passive voice",
  "desc": "Use the passive voice to shift focus from the agent to the action or recipient, understanding how passive constructions affect the presentation of information in formal and objective writing",
  "evidence": [
   "Convert active sentences to passive voice and explain the change in emphasis",
   "Identify passive constructions in news reports and scientific writing",
   "Choose between active and passive voice based on purpose and audience"
  ],
  "age": [
   10,
   12
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_k7VtbWdfDO": {
  "name": "The subjunctive mood",
  "desc": "Use the subjunctive form in formal writing and speech to express wishes, demands, suggestions, or hypothetical situations (e.g., 'If I were you', 'I suggest that he go', 'Were they to arrive')",
  "evidence": [
   "Write sentences using 'If I were' to express hypothetical conditions",
   "Transform informal sentences into formal equivalents using subjunctive forms such as 'I recommend that she attend'",
   "Identify subjunctive mood in formal texts such as legal documents or formal letters"
  ],
  "age": [
   10,
   12
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_-tcJeAhK5k": {
  "name": "Grammar Terms: Modal Verbs and Clauses",
  "desc": "Know and use Year 5 grammar terminology accurately when discussing reading and writing: modal verb, relative pronoun, relative clause, parenthesis, bracket, dash, cohesion, ambiguity",
  "evidence": [
   "Label a relative clause in a sentence and identify the relative pronoun that introduces it, using correct terminology",
   "Explain why a pair of brackets or dashes creates a parenthesis and describe its function using the term 'parenthesis'",
   "Use the terms 'modal verb', 'cohesion', and 'ambiguity' when discussing how a writer has achieved particular effects in a text"
  ],
  "age": [
   9,
   10
  ],
  "subject": "English",
  "domain": "Grammar & Punctuation",
  "type": "LANGUAGE",
  "pre": [
   "mt_J5cx6S_eT9"
  ]
 },
 "mt_E5YbLvMgLL": {
  "name": "Antonyms & Synonyms",
  "desc": "Demonstrate understanding of words by relating them to their antonyms (opposites) and synonyms (words with similar meanings), using synonym and antonym relationships to refine vocabulary and improve precision in writing",
  "evidence": [
   "Generate synonyms and antonyms for given words and explain subtle differences between synonyms, e.g. happy/joyful/ecstatic differ in intensity",
   "Use a thesaurus to find synonyms and select the most precise word for a given context, e.g. choosing 'sprinted' rather than 'ran' to convey speed",
   "Replace overused words in writing with more precise synonyms and explain how the substitution changes the tone or emphasis"
  ],
  "age": [
   9,
   11
  ],
  "subject": "English",
  "domain": "Vocabulary",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_u3OuIXqmAo": {
  "name": "Homophones (age 9+)",
  "desc": "Distinguish and correctly spell homophones and commonly confused words at Y5-6 level (e.g., affect/effect, practice/practise, advice/advise, complement/compliment, aisle/isle, led/lead), including confused words such as to/too/two and there/their/they're",
  "evidence": [
   "Select the correct spelling from a pair of homophones by analysing meaning in context, e.g. 'The doctor's advice (noun) was to practise (verb) daily'",
   "Spell commonly confused words accurately by applying word-class clues: advise/advice, practise/practice, licence/license (verb ends in -ise, noun ends in -ice)",
   "Identify and correct homophone errors in extended writing, including to/too/two, there/their/they're, whose/who's, and its/it's"
  ],
  "age": [
   9,
   10
  ],
  "subject": "English",
  "domain": "Spelling & Word Study",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_9hBs430cU4": {
  "name": "Spelling -able & -ible",
  "desc": "Spell words ending in -able/-ible and the corresponding adverb forms -ably/-ibly, applying patterns to determine which suffix to use based on the root word",
  "evidence": [
   "Apply the guideline that -able is typically used with complete root words (enjoyable, comfortable) while -ible is used with incomplete roots (visible, possible), noting key exceptions",
   "Convert -able/-ible adjectives into adverbs by changing the ending to -ably/-ibly, e.g. comfortable → comfortably, possible → possibly, terrible → terribly",
   "Determine whether to drop or retain the final -e of the root when adding -able, e.g. adorable (drop e) vs changeable (keep e before soft g)"
  ],
  "age": [
   9,
   12
  ],
  "subject": "English",
  "domain": "Spelling & Word Study",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_y8sicbhMci": {
  "name": "Spellings from Greek, French and Latin",
  "desc": "Spell words with etymological letter patterns from Greek (ch = /k/), French (ch = /ʃ/, -gue, -que), and Latin (sc = /s/) origins",
  "evidence": [
   "Spell words with Greek ch such as 'scheme', 'chorus', 'chemist', 'echo' and explain the /k/ sound pattern",
   "Spell words with French ch such as 'chef', 'chalet', 'machine' and -gue/-que endings like 'league', 'unique'",
   "Spell words with Latin sc such as 'science', 'scene', 'discipline' and identify the silent letter pattern"
  ],
  "age": [
   8,
   12
  ],
  "subject": "English",
  "domain": "Spelling & Word Study",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_x_Lg4RASVU": {
  "name": "Greek and Latin Roots for Word Meaning",
  "desc": "Use knowledge of Greek and Latin affixes (prefixes and suffixes) and roots as clues to determine the meaning of unfamiliar words, building a bank of common roots and their meanings",
  "evidence": [
   "Identify common Greek and Latin roots in unfamiliar words and use root meaning to infer word meaning, e.g. 'aqua' (water) in aquarium/aquatic, 'dict' (say) in predict/dictionary",
   "Break a multi-morpheme word into prefix + root + suffix to determine meaning, e.g. un- (not) + believe + -able = not able to be believed",
   "Use knowledge of Greek-origin prefixes (auto-, tele-, micro-) and Latin-origin prefixes (inter-, trans-, sub-) to decode and define unfamiliar vocabulary in context"
  ],
  "age": [
   9,
   12
  ],
  "subject": "English",
  "domain": "Vocabulary",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_SUOhjmRqv9": {
  "name": "Literal vs Figurative Language",
  "desc": "Distinguish literal from nonliteral (figurative) language in context and interpret common idioms and phrases",
  "evidence": [
   "Identify whether 'It's raining cats and dogs' is literal or nonliteral and explain what it means",
   "Read a passage and circle three phrases used nonliterally, restating each in literal terms",
   "Explain the difference between 'She was on fire' (figurative — performing well) and 'The log was on fire' (literal)"
  ],
  "age": [
   8,
   12
  ],
  "subject": "English",
  "domain": "Vocabulary",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_XK7NYt61cO": {
  "name": "Silent Letters in Words",
  "desc": "Spell words containing silent letters that are remnants of earlier pronunciation or etymology, recognising common silent-letter patterns and using word origins to remember them",
  "evidence": [
   "Identify and spell words with silent initial consonants: knight, know, write, wrap, gnaw, psalm, applying knowledge that these letters were once pronounced",
   "Spell words with silent internal letters: doubt (b), island (s), muscle (c), solemn (n), using etymological connections to aid memory (e.g. doubt from Latin dubitare)",
   "Use word families and etymology to remember silent letters, e.g. sign is related to signal where the g is pronounced"
  ],
  "age": [
   9,
   12
  ],
  "subject": "English",
  "domain": "Spelling & Word Study",
  "type": "PROCEDURAL",
  "pre": [
   "mt_y8sicbhMci"
  ]
 },
 "mt_hJW7hVflm3": {
  "name": "Similes & Metaphors",
  "desc": "Understand and identify similes (comparisons using like or as) and metaphors (direct comparisons stating something is something else) in texts, explaining how each creates imagery and conveys meaning",
  "evidence": [
   "Identify similes in a text by locating comparisons using 'like' or 'as' and explain what two things are being compared and what quality is highlighted, e.g. 'The snow was like a white blanket'",
   "Identify metaphors in a text and explain the implied comparison, e.g. in 'Time is a thief', explain that time is compared to a thief because it takes things away",
   "Explain how a simile or metaphor in a poem or story creates a particular image or feeling for the reader that a literal description would not achieve"
  ],
  "age": [
   8,
   12
  ],
  "subject": "English",
  "domain": "Vocabulary",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_SUOhjmRqv9"
  ]
 },
 "mt_IoGOSAQ8bz": {
  "name": "Idioms & Proverbs",
  "desc": "Recognise and interpret common idioms (break the ice, hit the nail on the head), adages (actions speak louder than words), and proverbs (a stitch in time saves nine), understanding their figurative meanings and when to use them",
  "evidence": [
   "Explain the figurative meaning of common idioms encountered in texts, e.g. 'let the cat out of the bag' means to reveal a secret, not literally releasing a cat",
   "Interpret the meaning and intended lesson of adages and proverbs, e.g. explain that 'the early bird catches the worm' advises that acting promptly gives an advantage",
   "Use context clues to determine the meaning of an unfamiliar idiom or proverb encountered during reading and verify using a reference source"
  ],
  "age": [
   9,
   12
  ],
  "subject": "English",
  "domain": "Vocabulary",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_SUOhjmRqv9"
  ]
 },
 "mt_PCX1jZZnf9": {
  "name": "The Pharaoh as Living God",
  "desc": "Understand that the pharaoh was not just a ruler but was believed to be a living god — the intermediary between the gods and the people — and that the concept of Ma'at (truth, justice, and cosmic order) guided Egyptian law and government, with viziers and officials administering the kingdom on the pharaoh's behalf",
  "evidence": [
   "Explain the pharaoh's dual role as both political ruler and divine figure",
   "Describe Ma'at as the principle of truth, justice, and order that governed Egyptian society",
   "Identify the role of viziers and officials in running the government day to day"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Ancient Egypt",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt__qlBYNP62H": {
  "name": "Egyptian Art and Architecture",
  "desc": "Analyse Egyptian art and architecture: understand that Egyptian paintings followed strict conventions (people shown from the side with eyes from the front, size indicating importance), that tomb and temple design evolved from mastabas to step pyramids to smooth pyramids to rock-cut temples like Abu Simbel, and that obelisks, colossal statues, and temples like Karnak demonstrated the pharaoh's power and devotion to the gods",
  "evidence": [
   "Identify at least two conventions used in Egyptian painting and explain their purpose",
   "Describe how monument design changed over the course of Egyptian history",
   "Explain why pharaohs built such enormous structures (power, religion, afterlife)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Ancient Egypt",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_vFYFvgrPgD": {
  "name": "Roman Republic and Empire",
  "desc": "Explain how Rome was first governed as a republic — with elected consuls, a powerful Senate, and a distinction between patricians and plebeians — before becoming an empire ruled by emperors like Augustus (who brought peace, the Pax Romana) and Nero, and compare republican government with Athenian direct democracy",
  "evidence": [
   "Describe the Roman Republic's structure: consuls, Senate, patricians, and plebeians",
   "Explain how Rome changed from a republic to an empire under Augustus",
   "Compare Athenian direct democracy (citizens vote on decisions) with Roman republican government (citizens elect representatives)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Ancient Greece & Rome",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_cUMUYkDqZp": {
  "name": "Greek Philosophers and Medicine",
  "desc": "Know that Greek thinkers called philosophers developed ways of understanding the world that still influence us today — Socrates asked challenging questions to test ideas (the Socratic method), Plato imagined the ideal society, Aristotle observed and classified the natural world — and that Hippocrates is called the father of medicine for insisting on natural causes of illness rather than blaming the gods",
  "evidence": [
   "Describe what Socrates, Plato, and Aristotle each contributed to thinking and learning",
   "Explain the Socratic method as learning by asking questions rather than just being told answers",
   "Say why Hippocrates is called the father of medicine"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Ancient Greece & Rome",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_lzCcQzPJZi": {
  "name": "Greek and Roman Architecture",
  "desc": "Identify Greek column styles — Doric (plain and sturdy), Ionic (scroll-shaped capitals), and Corinthian (ornate leafy capitals) — and Roman architectural innovations — the arch, the dome, and concrete — and spot their influence in modern public buildings such as courthouses, museums, government buildings, and monuments",
  "evidence": [
   "Identify the three Greek column orders (Doric, Ionic, Corinthian) from pictures",
   "Name Roman architectural innovations: the arch, the dome, and concrete",
   "Point out Greek or Roman architectural features in a modern public building"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Ancient Greece & Rome",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_8ShghTx0jd": {
  "name": "Magna Carta and Limiting Royal Power",
  "desc": "King John, the barons' revolt, and the sealing of the Magna Carta in 1215; what the Magna Carta said about limiting the king's power; its lasting importance for democracy and rights",
  "evidence": [
   "Explain why the barons rebelled against King John",
   "Describe what the Magna Carta said (the king must follow the law too, fair trial rights)",
   "Explain why the Magna Carta still matters today (foundation of democracy and human rights)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Medieval Times",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_UMOjbmLcbM": {
  "name": "Towns & Trade",
  "desc": "The growth of medieval towns: markets, guilds, the merchant class; how towns won charters of self-governance; the shift from purely rural to partly urban life",
  "evidence": [
   "Describe how medieval towns were different from villages (markets, walls, guilds, more people)",
   "Explain what a guild was and why it mattered for tradespeople",
   "Describe one way towns changed medieval society (new merchant class, more freedom for townspeople)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Medieval Times",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_TTzJTF-OkG": {
  "name": "Questioning Historical Sources",
  "desc": "Before trusting a historical source, ask: who made this, when, and why? — the answers shape how much weight the source should carry",
  "evidence": [
   "Wineburg sourcing heuristic",
   "Teaching Historical Thinking Using Primary Sources (Library of Congress)"
  ],
  "age": [
   8,
   10
  ],
  "subject": "History",
  "domain": "Historical Thinking",
  "type": "META",
  "pre": []
 },
 "mt_H4bLNkDrGJ": {
  "name": "Fall of the Western Roman Empire",
  "desc": "Describe how the Western Roman Empire gradually declined due to a combination of factors — military pressure from invading peoples, political instability, economic problems, and an overstretched empire — and finally fell in AD 476, while the Eastern Roman (Byzantine) Empire continued for nearly a thousand more years",
  "evidence": [
   "Name at least two reasons why the Western Roman Empire declined and fell",
   "State the date AD 476 as when the last Western Roman emperor was removed",
   "Explain that the Eastern (Byzantine) Empire survived for nearly 1,000 years after the West fell"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Ancient Greece & Rome",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_vFYFvgrPgD"
  ]
 },
 "mt_rf23aL6KwH": {
  "name": "Printing Press & Renaissance",
  "desc": "The invention of the printing press by Gutenberg and its arrival in England with William Caxton; how printed books changed everything; the transition from the Middle Ages to the Renaissance",
  "evidence": [
   "Explain what the printing press was and why it was revolutionary",
   "Describe William Caxton's role in bringing printing to England",
   "Give at least one way printed books changed society (more people could read, ideas spread faster)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "History",
  "domain": "Medieval Times",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_lzCcQzPJZi",
   "mt_UMOjbmLcbM"
  ]
 },
 "mt_GKL5Usnd11": {
  "name": "Inside a computer",
  "desc": "Investigate the main internal components of common digital systems — processor (CPU), memory (RAM), storage, circuit board, battery or power supply and wireless adaptor — and explain the function of each",
  "evidence": [
   "Identify the processor, memory, storage and battery in a photo or teardown of a computer, tablet or phone",
   "Explain the job of each part using an analogy (e.g. the processor does the work, memory is the desk for things in use, storage is the cupboard for files)",
   "Compare two devices' specifications (e.g. storage size and memory) and explain how they affect what each device can do"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Computing",
  "domain": "Digital Systems",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_sHMpam8zcd": {
  "name": "All data as numbers",
  "desc": "Explain how digital systems represent all data — text, images and sound — using numbers: each pixel's colour is stored as numbers, each letter has a number code and sound is stored as a series of number samples",
  "evidence": [
   "Colour a pixel grid from a list of numbers (e.g. 0 = white, 1 = black) to reveal a hidden picture",
   "Encode a short word using a number code for letters (e.g. A = 65, B = 66 in ASCII) and decode a partner's word",
   "Explain how a photo, a text message and a song are all stored as numbers in a device"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Computing",
  "domain": "Data Representation",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_nfGAtwqSvP": {
  "name": "Decisions and input in programs",
  "desc": "Use input (key presses, mouse clicks, sensors or typed answers) and branching blocks (if ... then, if ... then ... else) with comparison operators to make a visual program respond to the user",
  "evidence": [
   "Program a character to move left and right when the arrow keys are pressed",
   "Write a quiz question that asks for an answer and uses 'if answer = 12 then say Correct, else say Try again'",
   "Use a comparison such as 'if score > 5' or 'if touching colour red' to change what the program does and explain the condition"
  ],
  "age": [
   8,
   13
  ],
  "subject": "Computing",
  "domain": "Algorithms & Programming",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_6XbAmdmjDb": {
  "name": "Loops in programs",
  "desc": "Use loop blocks in a visual program to repeat actions a set number of times, forever, or until a condition is true, and identify where a loop makes a program shorter",
  "evidence": [
   "Rewrite a program that repeats 'move 10 steps' four times so that it uses one repeat block",
   "Use a 'repeat until' block so a quiz keeps asking until the correct answer is given, or a sprite moves until it touches the edge",
   "Explain the difference between 'repeat 10', 'forever' and 'repeat until' blocks with an example of when to use each"
  ],
  "age": [
   8,
   13
  ],
  "subject": "Computing",
  "domain": "Algorithms & Programming",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_y8-x0P5P9R": {
  "name": "Strong, memorable passwords",
  "desc": "Create passwords or passphrases that are easy for them to remember but hard for others to guess — long, made of random words, avoiding names, birthdays and simple patterns — and explain why",
  "evidence": [
   "Sort example passwords into weak (e.g. 'password', 'ben2015', '1234') and strong (e.g. 'purple-kangaroo-jumps') and explain what makes each easy or hard to guess",
   "Create a passphrase from three or four random words (e.g. 'violin-cactus-ocean-ladder') and explain why its length makes it hard to guess",
   "Explain why a password must be easy for them to remember but hard for others to guess"
  ],
  "age": [
   8,
   10
  ],
  "subject": "Computing",
  "domain": "Privacy & Security",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_0XHRJ49akv": {
  "name": "My digital footprint",
  "desc": "Explain how their digital footprint is created — posts, photos, comments, searches and data collected by apps — and why it can be permanent, because content can be copied, shared and stored even after it is deleted",
  "evidence": [
   "List the parts of their digital footprint from one day (e.g. a search, a game score, a comment, a photo a family member uploaded)",
   "Explain why deleting a post does not guarantee it is gone (others may have copied or shared it, and services keep backups)",
   "Decide whether to post a given photo or comment by thinking about who might see it in five years and justify the choice"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Computing",
  "domain": "Privacy & Security",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt__BbOjiY5A5": {
  "name": "Bias in AI Systems",
  "desc": "If training data is biased, AI will be biased; examples: facial recognition working better for some skin tones, translation assuming gender; where bias comes from and whether we can fix it",
  "evidence": [
   "Explain what bias in AI means using a real-world example",
   "Describe how biased training data leads to biased AI results",
   "Suggest one way to reduce bias in an AI system (use more diverse data, test with different groups)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Computing",
  "domain": "Artificial Intelligence",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_Hft-0nxZvB": {
  "name": "Computer networks",
  "desc": "Examine how digital systems connect and transmit data — text, images, sound and video sent by cable or wirelessly (e.g. USB, Bluetooth, Wi-Fi, mobile networks) through home or school networks with routers and servers — so they can share data and resources, noticing that larger files take longer to send",
  "evidence": [
   "Send a photo from a tablet to a printer or another device (by cable or wirelessly) and describe the path the data took",
   "Draw a diagram of the school or home network showing devices, the router and wired and wireless links, and explain how it lets devices share data and resources",
   "Compare sending a text message, a photo and a short video and explain which takes longest and why, and compare a wired and a wireless connection"
  ],
  "age": [
   9,
   12
  ],
  "subject": "Computing",
  "domain": "Digital Systems",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_GKL5Usnd11"
  ]
 },
 "mt_WQiVj8gIRs": {
  "name": "Binary on and off",
  "desc": "Explore how digital systems represent data using two states — on and off, written as 1 and 0 — called bits, and use binary numbers to represent whole numbers and letters",
  "evidence": [
   "Show every number from 0 to 31 using five binary cards (16, 8, 4, 2, 1) turned face up for 1 and face down for 0",
   "Convert binary numbers such as 1010 and 10011 to ordinary numbers and back",
   "Explain why computers use two states (a switch, light or current is either on or off) and show a letter as a string of bits using a given code"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Computing",
  "domain": "Data Representation",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_sHMpam8zcd"
  ]
 },
 "mt_YZOjP8KHsM": {
  "name": "Variables in programs",
  "desc": "Create and use variables in visual programs to store and change values — such as a score, a timer, a counter or a user's answer — and use them in conditions",
  "evidence": [
   "Create a 'score' variable in a game that starts at 0 and increases by 1 each time the player catches an object",
   "Store a user's typed name in a variable and use it in a message (e.g. 'Hello Sam!')",
   "Use a variable in a condition (e.g. 'if lives = 0 then game over') and explain what the variable holds at each stage"
  ],
  "age": [
   10,
   13
  ],
  "subject": "Computing",
  "domain": "Algorithms & Programming",
  "type": "PROCEDURAL",
  "pre": [
   "mt_nfGAtwqSvP"
  ]
 },
 "mt_el7qeUK-Cd": {
  "name": "How the internet sends data",
  "desc": "Explain that the internet is a network of networks and that data is broken into small packets, addressed, sent along different routes and reassembled at its destination",
  "evidence": [
   "Explain that the internet connects millions of smaller networks around the world",
   "Act out sending a message as packets: split a sentence into numbered cards, pass them by different routes and reassemble them in order",
   "Describe what happens when a packet is lost or arrives late (e.g. a video call freezes) and how numbering helps rebuild the message"
  ],
  "age": [
   10,
   12
  ],
  "subject": "Computing",
  "domain": "Digital Systems",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_Hft-0nxZvB"
  ]
 },
 "mt_udgPy5oAvR": {
  "name": "How the Economy Works",
  "desc": "What an economy is; producers and consumers; supply and demand; why prices change; the basics of how markets work",
  "evidence": [
   "Explain what 'supply and demand' means using a simple example (ice cream on a hot day)",
   "Describe the difference between a producer and a consumer",
   "Give a reason why the price of something might go up or down"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Life Skills",
  "domain": "Money & Finance",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_r1hw-KenpK": {
  "name": "Financial Planning",
  "desc": "Setting longer-term financial goals; planning and prioritising spending; how saving regularly adds up over time; the value of thinking ahead with money",
  "evidence": [
   "Set a realistic savings goal and calculate how long it would take saving a fixed amount each week",
   "Create a simple financial plan for a specific purpose (birthday party, school trip, gift)",
   "Explain why planning ahead with money is better than spending everything as it comes in"
  ],
  "age": [
   9,
   13
  ],
  "subject": "Life Skills",
  "domain": "Money & Finance",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_Qe2PsFmSAH": {
  "name": "Comparing best buys",
  "desc": "Compare the value of products sold in different quantities or prices by working out and comparing unit prices (price per item or per unit of mass or volume), using a calculator where appropriate, and explain which is the better buy",
  "evidence": [
   "Decide whether a 2 kg bag of rice for $5.80 or a 500 g bag for $1.60 is better value and explain why",
   "Work out the price per 100 g of two pack sizes of cereal and say which is cheaper per 100 g",
   "Explain why the bigger pack is not always the better buy (e.g. when the unit price is higher or the food would be wasted)"
  ],
  "age": [
   9,
   13
  ],
  "subject": "Mathematics",
  "domain": "Measurement",
  "type": "PROCEDURAL",
  "pre": []
 },
 "mt_bAy4dmP1-A": {
  "name": "Borrowing & Debt",
  "desc": "What borrowing money means; that borrowed money must be repaid and interest or fees may be charged under the agreement; what credit is; why too much debt can be risky; responsible borrowing",
  "evidence": [
   "Explain what a loan is, that borrowed money must be repaid, and that any interest or fees depend on the agreement",
   "Give an example of when borrowing might be sensible (buying a house) versus risky (buying luxuries you can't afford)",
   "Describe what happens if someone borrows too much money and can't repay it"
  ],
  "age": [
   9,
   13
  ],
  "subject": "Life Skills",
  "domain": "Money & Finance",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_W5euSyU2sO": {
  "name": "Scams & Online Safety",
  "desc": "Recognising financial scams and tricks; phishing emails and fake websites; protecting personal and financial information online; 'if it seems too good to be true, it probably is'",
  "evidence": [
   "Identify at least two warning signs of a scam (asking for personal details, too-good-to-be-true offers, urgency)",
   "Explain why you should never share passwords or bank details online",
   "Describe what to do if they receive a suspicious message or email (don't click, tell an adult)"
  ],
  "age": [
   8,
   13
  ],
  "subject": "Life Skills",
  "domain": "Money & Finance",
  "type": "CONCEPTUAL",
  "pre": []
 },
 "mt_cSz7XTxVAx": {
  "name": "Taxes & Public Services",
  "desc": "What taxes are and why people pay them; how taxes fund schools, hospitals, roads, and emergency services; that governments decide how to spend tax money",
  "evidence": [
   "Explain what tax is and that most working adults pay it",
   "Name at least three things that taxes pay for (schools, hospitals, roads, police, fire service)",
   "Describe why taxes are needed (everyone chips in so everyone benefits)"
  ],
  "age": [
   9,
   11
  ],
  "subject": "Life Skills",
  "domain": "Money & Finance",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_udgPy5oAvR"
  ]
 },
 "mt_UXMNnis3v3": {
  "name": "Interest rates and bank fees",
  "desc": "Explain interest as money earned or charged for the use of money, based on the balance, the interest rate (a percent) and the stated period it applies to (for example, per year), and distinguish interest earned on savings from interest charged on loans and credit; explain fees as charges for an account, a service or an event, which may be a flat amount (such as a monthly account fee) or depend on the amount or the number of transactions; and identify the interest rates and fees on given fictional account and loan information, recognising that rates, fees and product types vary between banks and other financial institutions",
  "evidence": [
   "Read a fictional savings-account card and a fictional loan card and identify each interest rate, the period it applies to, and each fee and what it is charged for",
   "For a given balance, rate and period (for example, $200 at 3% per year with a $2 monthly fee), explain whether the account holder earns or pays the interest, why a larger balance changes the interest but not a flat monthly fee, and why keeping the account for more months adds more monthly fees",
   "Compare two fictional accounts or loans over the same given period and explain which features (rate, flat fee, transaction-based fee) matter most for a described use, without calculating compound interest"
  ],
  "age": [
   11,
   13
  ],
  "subject": "Life Skills",
  "domain": "Money & Finance",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_bAy4dmP1-A"
  ]
 },
 "mt_3BDMrubDH8": {
  "name": "Comparing ways to pay",
  "desc": "Describe advantages and disadvantages of different ways of paying for goods and services — for example cash, debit card, credit card, prepaid or gift card, or mobile and online payment — using criteria such as convenience, where the method is accepted, what happens if it is lost or stolen, how easily spending can be tracked, and any charges stated in the given situation, and use given information about a purchase to choose a suitable method and explain the choice",
  "evidence": [
   "For at least two payment methods, give an advantage and a disadvantage of each (for example, cash needs no card reader but is hard to get back if lost)",
   "Using a given fictional scenario, explain how two chosen methods differ in keeping a record of spending and in any stated charges or where the money comes from (for example, an ordinary debit payment draws from the payer's account, though account terms matter; credit is borrowing that must be repaid, if credit is one of the methods compared)",
   "Given a purchase scenario (such as a bus fare, a present bought online, or lunch at a market stall), choose a payment method and justify the choice using at least two criteria"
  ],
  "age": [
   11,
   12
  ],
  "subject": "Life Skills",
  "domain": "Money & Finance",
  "type": "CONCEPTUAL",
  "pre": [
   "mt_bAy4dmP1-A",
   "mt_W5euSyU2sO"
  ]
 }
};
