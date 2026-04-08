/* =========================================
   Plant Mixtures App – Main JavaScript
   CSV-driven, carousel, filtering, modal
   ========================================= */

// ===== CONFIGURATION =====
const CSV_PATH = 'data/plant_mixtures_recipes.csv';

// Target codes → Hebrew labels, icons, badge CSS class
const TARGET_MAP = {
  sleep_quality:              { he: 'שינה',                icon: '😴', cls: 'sleep' },
  anxiety_reduction:          { he: 'הפחתת חרדה',          icon: '🧘', cls: 'anxiety' },
  stress_reduction:           { he: 'הפחתת מתח',           icon: '🧘', cls: 'anxiety' },
  relaxation:                 { he: 'הרגעה',               icon: '🌙', cls: 'relax' },
  memory_support:             { he: 'זיכרון',              icon: '🧠', cls: 'memory' },
  working_memory:             { he: 'זיכרון עבודה',        icon: '🧠', cls: 'memory' },
  cognitive_performance:      { he: 'ביצועים קוגניטיביים', icon: '🧠', cls: 'memory' },
  speed_of_memory:            { he: 'מהירות זיכרון',       icon: '🧠', cls: 'memory' },
  executive_function_support: { he: 'תפקודים ניהוליים',    icon: '🧠', cls: 'memory' },
  attention:                  { he: 'קשב',                 icon: '🎯', cls: 'memory' },
  alertness:                  { he: 'ערנות',               icon: '⚡', cls: 'energy' },
  blood_pressure_reduction:   { he: 'לחץ דם',              icon: '❤️', cls: 'bp' },
  blood_pressure_support:     { he: 'תמיכה בלחץ דם',      icon: '❤️', cls: 'bp' },
  vascular_health:            { he: 'בריאות כלי הדם',      icon: '🫀', cls: 'vascular' },
  vascular_function:          { he: 'תפקוד כלי דם',       icon: '🫀', cls: 'vascular' },
  LDL_cholesterol_reduction:  { he: 'הורדת כולסטרול',      icon: '📉', cls: 'bp' },
  LDL_reduction:              { he: 'הורדת LDL',           icon: '📉', cls: 'bp' },
  lipid_profile_support:      { he: 'שומנים בדם',          icon: '📊', cls: 'bp' },
  fasting_glucose_reduction:  { he: 'סוכר בצום',           icon: '🩸', cls: 'glucose' },
  postprandial_glucose_support: { he: 'סוכר אחרי ארוחה',  icon: '🩸', cls: 'glucose' },
  insulin_resistance_support: { he: 'עמידות לאינסולין',    icon: '🩸', cls: 'glucose' },
  IBS_symptoms_relief:        { he: 'הקלה ב-IBS',          icon: '🫃', cls: 'digest' },
  nausea_reduction:           { he: 'הפחתת בחילה',         icon: '🤢', cls: 'digest' },
  general_digestion:          { he: 'עיכול',               icon: '🫃', cls: 'digest' },
  digestion_support:          { he: 'תמיכה בעיכול',        icon: '🫃', cls: 'digest' },
  hydration:                  { he: 'הידרציה',             icon: '💧', cls: 'hydration' },
  satiety_weight_management:  { he: 'שובע ומשקל',          icon: '⚖️', cls: 'weight' },
  antioxidant_support:        { he: 'נוגדי חמצון',         icon: '🛡️', cls: 'general' },
  anti_inflammatory:          { he: 'אנטי דלקתי',          icon: '🔥', cls: 'anti-inflam' },
  anti_inflammatory_support:  { he: 'תמיכה אנטי דלקתית',  icon: '🔥', cls: 'anti-inflam' },
  depressive_symptoms_support:{ he: 'תמיכה במצב רוח',      icon: '🌈', cls: 'anxiety' },
  joint_pain_support:         { he: 'כאבי מפרקים',         icon: '🦴', cls: 'anti-inflam' },
  exercise_performance_support:{ he: 'ביצועי ספורט',       icon: '🏃', cls: 'energy' },
  cardiometabolic_risk_reduction:{ he: 'בריאות מטבולית',   icon: '❤️', cls: 'bp' },
  cardiometabolic_support:    { he: 'תמיכה קרדיומטבולית',  icon: '❤️', cls: 'bp' },
  metabolic_health_support:   { he: 'בריאות מטבולית',      icon: '⚡', cls: 'energy' },
  general_micronutrient_support:{ he: 'מיקרו-נוטריינטים',  icon: '🌿', cls: 'general' },
  omega3_intake:              { he: 'אומגה 3',             icon: '🐟', cls: 'general' },
  mood_support:               { he: 'מצב רוח',             icon: '😊', cls: 'anxiety' },
  mild_cognitive_support:     { he: 'תמיכה קוגניטיבית',    icon: '🧠', cls: 'memory' },
  sustained_energy:           { he: 'אנרגיה מתמשכת',       icon: '🔋', cls: 'energy' },
  gentle_awakening:           { he: 'התעוררות עדינה',      icon: '🌅', cls: 'energy' },
  throat_soothing:            { he: 'הרגעת גרון',          icon: '🍯', cls: 'general' },
  general_comfort:            { he: 'נוחות כללית',         icon: '☕', cls: 'general' },
  sleep_support:              { he: 'תמיכה בשינה',         icon: '😴', cls: 'sleep' },
  nocturnal_satiety:          { he: 'שובע לילי',           icon: '🌙', cls: 'sleep' },
  cognitive_performance_support:{ he: 'תמיכה קוגניטיבית', icon: '🧠', cls: 'memory' },
  satiety:                    { he: 'שובע',                icon: '⚖️', cls: 'weight' },
};

// Filter groups – group related targets under one filter button
const FILTER_GROUPS = [
  { id: 'sleep',    he: 'שינה והרגעה',             icon: '😴', targets: ['sleep_quality','sleep_support','relaxation','nocturnal_satiety'] },
  { id: 'anxiety',  he: 'חרדה ומתח',               icon: '🧘', targets: ['anxiety_reduction','stress_reduction','depressive_symptoms_support','mood_support'] },
  { id: 'memory',   he: 'זיכרון ופוקוס',           icon: '🧠', targets: ['memory_support','working_memory','cognitive_performance','speed_of_memory','executive_function_support','attention','alertness','mild_cognitive_support','cognitive_performance_support'] },
  { id: 'bp',       he: 'לחץ דם ולב',              icon: '❤️', targets: ['blood_pressure_reduction','blood_pressure_support','vascular_health','vascular_function','LDL_cholesterol_reduction','LDL_reduction','lipid_profile_support','cardiometabolic_risk_reduction','cardiometabolic_support'] },
  { id: 'glucose',  he: 'סוכר וגלוקוז',            icon: '🩸', targets: ['fasting_glucose_reduction','postprandial_glucose_support','insulin_resistance_support'] },
  { id: 'digest',   he: 'עיכול',                    icon: '🫃', targets: ['IBS_symptoms_relief','nausea_reduction','general_digestion','digestion_support'] },
  { id: 'hydra',    he: 'הידרציה',                  icon: '💧', targets: ['hydration'] },
  { id: 'weight',   he: 'שובע ומשקל',              icon: '⚖️', targets: ['satiety_weight_management','satiety'] },
  { id: 'inflam',   he: 'דלקת ומפרקים',            icon: '🔥', targets: ['anti_inflammatory','anti_inflammatory_support','joint_pain_support'] },
];

// Type labels in Hebrew
const TYPE_MAP = {
  hot_drink:          'משקה חם',
  cold_drink:         'משקה קר',
  hot_or_cold_drink:  'משקה חם/קר',
  cold_or_room_temp_drink: 'משקה קר/חדר',
  soup:               'מרק',
  stew:               'תבשיל',
  snack:              'חטיף',
  guideline:          'הנחיה',
  meal_salad:         'סלט ארוחה',
  add_on:             'תוספת',
  hot_meal:           'ארוחה חמה',
};

// Curated image URLs per recipe ID (free Pexels photos, reliable CDN)
const IMAGE_URLS = {
  R1:  'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=600',   // chamomile tea
  R2:  'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=600',   // hibiscus/red tea
  R3:  'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600',   // mint ginger tea
  R4:  'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600',    // cocoa latte
  R5:  'https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=600',   // turmeric latte
  R6:  'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=600',   // green tea
  R7:  'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600',    // lentil soup
  R8:  'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=600',   // cinnamon oat drink
  R9:  'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=600',   // herbal blend tea
  R10: 'https://images.pexels.com/photos/1327215/pexels-photo-1327215.jpeg?auto=compress&cs=tinysrgb&w=600',   // tomato juice
  R11: 'https://images.pexels.com/photos/1232152/pexels-photo-1232152.jpeg?auto=compress&cs=tinysrgb&w=600',   // lemon water
  R12: 'https://images.pexels.com/photos/3679974/pexels-photo-3679974.jpeg?auto=compress&cs=tinysrgb&w=600',   // pomegranate juice
  R13: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=600',   // blueberry smoothie
  R14: 'https://images.pexels.com/photos/1232152/pexels-photo-1232152.jpeg?auto=compress&cs=tinysrgb&w=600',   // infused water
  R15: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=600',   // green smoothie
  R16: 'https://images.pexels.com/photos/1309061/pexels-photo-1309061.jpeg?auto=compress&cs=tinysrgb&w=600',   // beetroot juice
  R17: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',   // chia flax topping
  R18: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',   // lentil salad
  R19: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600',    // vegetable soup
  R20: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=600',   // green tea mint
  R21: 'https://images.pexels.com/photos/1232152/pexels-photo-1232152.jpeg?auto=compress&cs=tinysrgb&w=600',   // water glass
  R22: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600',   // sage tea
  R23: 'https://images.pexels.com/photos/1232152/pexels-photo-1232152.jpeg?auto=compress&cs=tinysrgb&w=600',   // ACV lemon water
  R24: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=600',   // banana smoothie
  R25: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=600',   // date energy balls
  R26: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600',    // chickpea stew
  R27: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=600',   // oat porridge
  R28: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600',   // ginger lemon tea
  R29: 'https://images.pexels.com/photos/5946623/pexels-photo-5946623.jpeg?auto=compress&cs=tinysrgb&w=600',   // oat bedtime drink
  R30: 'https://images.pexels.com/photos/1232152/pexels-photo-1232152.jpeg?auto=compress&cs=tinysrgb&w=600',   // warm lemon water
};

// Emoji fallbacks per recipe type
const TYPE_EMOJI = {
  hot_drink:          '☕',
  cold_drink:         '🥤',
  hot_or_cold_drink:  '🍵',
  cold_or_room_temp_drink: '🥤',
  soup:               '🍲',
  stew:               '🍛',
  snack:              '🍪',
  guideline:          '📋',
  meal_salad:         '🥗',
  add_on:             '🥣',
  hot_meal:           '🥣',
};

// Hebrew translations for common ingredient terms
const INGREDIENT_HE = {
  'chamomile flowers': 'פרחי קמומיל',
  'chamomile': 'קמומיל',
  'lemon balm leaves (optional)': 'עלי מליסה (אופציונלי)',
  'lemon balm leaves': 'עלי מליסה',
  'lemon balm': 'מליסה',
  'lavender flowers (optional)': 'פרחי לבנדר (אופציונלי)',
  'lavender flowers': 'פרחי לבנדר',
  'lavender': 'לבנדר',
  'oat drink or water': 'משקה שיבולת שועל או מים',
  'oat drink': 'משקה שיבולת שועל',
  'dried hibiscus calyces': 'גביעי היביסקוס מיובשים',
  'hibiscus': 'היביסקוס',
  'water': 'מים',
  'optional: lemon juice': 'אופציונלי: מיץ לימון',
  'lemon juice': 'מיץ לימון',
  'lemon slice': 'פרוסת לימון',
  'lemon slices': 'פרוסות לימון',
  'lemon': 'לימון',
  'small amount of non-sugar sweetener or small amount of honey/date syrup': 'מעט ממתיק ללא סוכר או מעט דבש/סילאן',
  'fresh or dried peppermint leaves': 'עלי נענע טריים או מיובשים',
  'fresh ginger root slices': 'פרוסות שורש ג\'ינג\'ר טרי',
  'fresh ginger': 'ג\'ינג\'ר טרי',
  'ginger': 'ג\'ינג\'ר',
  'lemon slice (optional)': 'פרוסת לימון (אופציונלי)',
  'unsweetened cocoa powder': 'אבקת קקאו ללא סוכר',
  'cocoa powder (optional)': 'אבקת קקאו (אופציונלי)',
  'cocoa powder': 'אבקת קקאו',
  'oat drink rich in beta-glucan': 'משקה שיבולת שועל עשיר בבטא-גלוקן',
  'cinnamon': 'קינמון',
  'cinnamon powder (preferably ceylon)': 'אבקת קינמון (רצוי צילוני)',
  'small amount of sweetener if needed': 'מעט ממתיק לפי הצורך',
  'turmeric powder': 'אבקת כורכום',
  'turmeric': 'כורכום',
  'fresh grated ginger': 'ג\'ינג\'ר טרי מגורד',
  'black pepper': 'פלפל שחור',
  'oat or soy drink': 'משקה שיבולת שועל או סויה',
  'small amount of fat (e.g., tahini or small amount of oil)': 'מעט שומן (למשל טחינה או מעט שמן)',
  'green tea leaves or bag': 'עלי תה ירוק או שקיק',
  'green tea': 'תה ירוק',
  'small sprig of fresh rosemary or 0.25-0.5 tsp dried': 'ענף קטן של רוזמרין טרי או 0.25-0.5 כפית מיובש',
  'rosemary': 'רוזמרין',
  'red or brown lentils': 'עדשים אדומות או חומות',
  'lentils': 'עדשים',
  'onion': 'בצל',
  'garlic': 'שום',
  'carrot': 'גזר',
  'celery': 'סלרי',
  'olive oil': 'שמן זית',
  'salt and pepper': 'מלח ופלפל',
  'fine oats': 'שיבולת שועל דקה',
  'oats': 'שיבולת שועל',
  'water or unsweetened oat/soy drink': 'מים או משקה שיבולת שועל/סויה ללא סוכר',
  'optional: small amount of valerian root if available': 'אופציונלי: מעט שורש ולריאן אם זמין',
  'valerian': 'ולריאן',
  'low-sodium tomato juice': 'מיץ עגבניות דל נתרן',
  'dried rosemary powder': 'אבקת רוזמרין מיובשת',
  'ground flaxseed': 'זרעי פשתן טחונים',
  'flaxseed': 'זרעי פשתן',
  'optional: small amount of honey': 'אופציונלי: מעט דבש',
  'honey': 'דבש',
  '100% pomegranate juice': 'מיץ רימונים 100%',
  'pomegranate juice': 'מיץ רימונים',
  'frozen or fresh blueberries': 'אוכמניות קפואות או טריות',
  'blueberries': 'אוכמניות',
  'oat drink or water + oats': 'משקה שיבולת שועל או מים + שיבולת שועל',
  'banana or apple': 'בננה או תפוח',
  'banana': 'בננה',
  'ground flaxseed (optional)': 'זרעי פשתן טחונים (אופציונלי)',
  'still water': 'מים שקטים',
  'handful of blueberries': 'חופן אוכמניות',
  'fresh spinach': 'תרד טרי',
  'spinach': 'תרד',
  'beetroot juice (or cooked beetroot blended with water)': 'מיץ סלק (או סלק מבושל מעורבב עם מים)',
  'beetroot juice': 'מיץ סלק',
  'whole chia seeds': 'זרעי צ\'יה שלמים',
  'chia seeds': 'זרעי צ\'יה',
  'crushed walnuts (optional)': 'אגוזי מלך כתושים (אופציונלי)',
  'walnuts': 'אגוזי מלך',
  'cooked lentils': 'עדשים מבושלות',
  'tomato': 'עגבנייה',
  'cucumber': 'מלפפון',
  'red onion': 'בצל סגול',
  'parsley': 'פטרוזיליה',
  'zucchini or eggplant': 'קישוא או חציל',
  'zucchini': 'קישוא',
  'handful of oats': 'חופן שיבולת שועל',
  'herbs (parsley, thyme)': 'עשבי תיבול (פטרוזיליה, טימין)',
  'fresh mint': 'נענע טרייה',
  'mint': 'נענע',
  'plain water': 'מים רגילים',
  'dried sage leaves': 'עלי מרווה מיובשים',
  'sage': 'מרווה',
  'optional: small amount of honey': 'אופציונלי: מעט דבש',
  'apple cider vinegar': 'חומץ תפוחים',
  'almonds or almond butter': 'שקדים או חמאת שקדים',
  'almonds': 'שקדים',
  'water or almond drink': 'מים או משקה שקדים',
  'dates': 'תמרים',
  'pitted dates': 'תמרים ללא גלעיניות',
  'cooked chickpeas': 'חומוס מבושל',
  'chickpeas': 'חומוס',
  'spices (turmeric, cumin)': 'תבלינים (כורכום, כמון)',
  'apple': 'תפוח',
  'fresh ginger root': 'שורש ג\'ינג\'ר טרי',
  'honey (optional, vegetarian but not vegan)': 'דבש (אופציונלי, צמחוני אך לא טבעוני)',
  'oat drink': 'משקה שיבולת שועל',
  'small amount of vanilla': 'מעט וניל',
  'optional: chamomile extract or tea bag': 'אופציונלי: תמצית קמומיל או שקיק תה',
  'warm water': 'מים חמימים',
  'optional: small amount of green tea or hibiscus concentrate': 'אופציונלי: מעט תה ירוק מרוכז או היביסקוס',
  'fresh mint leaves': 'עלי נענע טריים',
  'rosemary or sage': 'רוזמרין או מרווה',
};

// Translate an ingredient string to Hebrew
function translateIngredient(eng) {
  const lower = eng.toLowerCase().trim();
  // Exact match
  if (INGREDIENT_HE[lower]) return INGREDIENT_HE[lower];
  // Partial match – find the longest matching key
  let best = null;
  let bestLen = 0;
  for (const [key, val] of Object.entries(INGREDIENT_HE)) {
    if (lower.includes(key) && key.length > bestLen) {
      best = val;
      bestLen = key.length;
    }
  }
  return best || eng; // Return original if no translation found
}

// ===== STATE =====
let allRecipes = [];
let filteredRecipes = [];
let currentSlide = 0;
let activeFilter = 'all';
let touchStartX = 0;
let touchEndX = 0;
let viewMode = 'carousel'; // 'carousel' or 'grid'

// ===== DOM REFERENCES =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

// ===== CSV PARSER =====
function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const recipes = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = (values[idx] || '').trim();
    });

    // Parse targets into an array
    if (obj.targets) {
      obj.targetsArray = obj.targets.split(/[;,]/).map(t => t.trim()).filter(Boolean);
    } else {
      obj.targetsArray = [];
    }

    // Parse ingredients into an array
    if (obj.ingredients) {
      obj.ingredientsArray = obj.ingredients.split(/[;]/).map(i => i.trim()).filter(Boolean);
    } else {
      obj.ingredientsArray = [];
    }

    // Parse main ingredients with evidence
    if (obj.main_ingredients_with_evidence) {
      obj.evidenceIngredients = obj.main_ingredients_with_evidence.split(/[;,]/).map(i => i.trim()).filter(Boolean);
    } else {
      obj.evidenceIngredients = [];
    }

    // Parse references
    if (obj.primary_refs) {
      obj.refsArray = obj.primary_refs.split(/[;,]/).map(r => r.trim()).filter(Boolean);
    } else {
      obj.refsArray = [];
    }

    recipes.push(obj);
  }

  return recipes;
}

// CSV line parser that handles quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ===== REFERENCE URL BUILDER =====
function buildRefURL(ref) {
  ref = ref.trim();

  // PubMed ID patterns
  const pubmedMatch = ref.match(/^(?:pubmed\/?)(\d+)$/i);
  if (pubmedMatch) return { url: `https://pubmed.ncbi.nlm.nih.gov/${pubmedMatch[1]}/`, label: `PubMed ${pubmedMatch[1]}` };

  // PMC ID
  const pmcMatch = ref.match(/^(PMC\d+)$/i);
  if (pmcMatch) return { url: `https://www.ncbi.nlm.nih.gov/pmc/articles/${pmcMatch[1]}/`, label: pmcMatch[1] };

  // DOI pattern
  if (ref.startsWith('10.')) return { url: `https://doi.org/${ref}`, label: `DOI: ${ref}` };

  // Already a URL
  if (ref.includes('.') && (ref.includes('/') || ref.includes('http'))) {
    const url = ref.startsWith('http') ? ref : `https://${ref}`;
    // Shorten label
    let label = ref.replace(/^https?:\/\/(www\.)?/, '');
    if (label.length > 50) label = label.substring(0, 47) + '…';
    return { url, label };
  }

  // Pure number – assume PubMed ID
  if (/^\d{5,}$/.test(ref)) return { url: `https://pubmed.ncbi.nlm.nih.gov/${ref}/`, label: `PubMed ${ref}` };

  // Descriptive text (e.g., "PREDIMED Mediterranean diet")
  return { url: `https://scholar.google.com/scholar?q=${encodeURIComponent(ref)}`, label: ref };
}

// ===== IMAGE LOADER =====
function getImageURL(recipe) {
  return IMAGE_URLS[recipe.recipe_id] || '';
}

// ===== RENDER FUNCTIONS =====

function renderTargetBadge(targetCode) {
  const info = TARGET_MAP[targetCode] || { he: targetCode.replace(/_/g, ' '), icon: '🏷️', cls: 'general' };
  return `<span class="target-badge target-badge--${info.cls}" title="${targetCode}">${info.icon} ${info.he}</span>`;
}

function renderCarouselCard(recipe) {
  const emoji = TYPE_EMOJI[recipe.type] || '🌿';
  const typeLabel = TYPE_MAP[recipe.type] || recipe.type;
  const targets = recipe.targetsArray.slice(0, 4).map(renderTargetBadge).join('');
  const ingredientsHe = recipe.ingredientsArray.slice(0, 4).map(translateIngredient).join(' · ');
  const imgURL = getImageURL(recipe);

  return `
    <div class="recipe-card" data-id="${recipe.recipe_id}">
      <div class="recipe-card__inner" onclick="openModal('${recipe.recipe_id}')">
        <div class="recipe-card__image-container">
          <div class="recipe-card__image-placeholder">${emoji}</div>
          <img class="recipe-card__image" src="${imgURL}" alt="${recipe.name_en}" loading="lazy"
               onerror="this.style.display='none'">
          <span class="recipe-card__type-badge">${typeLabel}</span>
        </div>
        <div class="recipe-card__content">
          <h3 class="recipe-card__title">${recipe.name_he}</h3>
          <div class="recipe-card__targets">${targets}</div>
          <p class="recipe-card__ingredients">${ingredientsHe}</p>
          <button class="recipe-card__cta" aria-label="לפרטים נוספים">
            לפרטים נוספים ←
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderGridCard(recipe) {
  const emoji = TYPE_EMOJI[recipe.type] || '🌿';
  const typeLabel = TYPE_MAP[recipe.type] || recipe.type;
  const targets = recipe.targetsArray.slice(0, 3).map(renderTargetBadge).join('');
  const imgURL = getImageURL(recipe);

  return `
    <div class="grid-card" onclick="openModal('${recipe.recipe_id}')">
      <div class="grid-card__image-container">
        <div class="grid-card__image-placeholder">${emoji}</div>
        <img class="grid-card__image" src="${imgURL}" alt="${recipe.name_en}" loading="lazy"
             onerror="this.style.display='none'">
        <span class="grid-card__type-badge">${typeLabel}</span>
      </div>
      <div class="grid-card__content">
        <h3 class="grid-card__title">${recipe.name_he}</h3>
        <div class="grid-card__targets">${targets}</div>
      </div>
    </div>
  `;
}

// ===== CAROUSEL =====

function renderCarousel() {
  const track = $('#carousel-track');
  const dotsContainer = $('#carousel-dots');

  if (filteredRecipes.length === 0) {
    track.innerHTML = '<div class="recipe-card" style="min-width:100%;text-align:center;padding:3rem;"><p style="color:var(--clr-text-muted);">לא נמצאו תרכובות לסינון הנבחר</p></div>';
    dotsContainer.innerHTML = '';
    return;
  }

  track.innerHTML = filteredRecipes.map(renderCarouselCard).join('');
  dotsContainer.innerHTML = filteredRecipes.map((_, i) =>
    `<button class="carousel__dot${i === 0 ? ' carousel__dot--active' : ''}" data-index="${i}" aria-label="שקופית ${i + 1}"></button>`
  ).join('');

  currentSlide = 0;
  updateCarouselPosition();
  updateCarouselCount();

  // Dot click handlers
  dotsContainer.querySelectorAll('.carousel__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentSlide = parseInt(dot.dataset.index);
      updateCarouselPosition();
    });
  });
}

function updateCarouselPosition() {
  const track = $('#carousel-track');
  // RTL: positive translateX to go "right" (which is the start in RTL)
  const offset = currentSlide * 100;
  track.style.transform = `translateX(${offset}%)`;

  // Update dots
  $$('.carousel__dot').forEach((dot, i) => {
    dot.classList.toggle('carousel__dot--active', i === currentSlide);
  });

  // Update arrows
  const prev = $('#carousel-prev');
  const next = $('#carousel-next');
  if (prev) prev.disabled = currentSlide === 0;
  if (next) next.disabled = currentSlide >= filteredRecipes.length - 1;
}

function updateCarouselCount() {
  const count = $('#carousel-count');
  count.textContent = `${filteredRecipes.length} תרכובות`;
}

function nextSlide() {
  if (currentSlide < filteredRecipes.length - 1) {
    currentSlide++;
    updateCarouselPosition();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarouselPosition();
  }
}

// ===== GRID =====

function renderGrid() {
  const gridEl = $('#recipe-grid');
  if (filteredRecipes.length === 0) {
    gridEl.innerHTML = '<p style="text-align:center;color:var(--clr-text-muted);grid-column:1/-1;padding:2rem;">לא נמצאו תרכובות לסינון הנבחר</p>';
    return;
  }
  gridEl.innerHTML = filteredRecipes.map(renderGridCard).join('');
}

// ===== FILTERS =====

function renderFilters() {
  const filterBar = $('#filter-bar');

  // Keep the "All" chip
  let html = `<button class="filter-chip filter-chip--active" data-target="all" role="tab" aria-selected="true" id="filter-all">
    <span class="filter-chip__icon">🔄</span><span>הכל</span>
  </button>`;

  FILTER_GROUPS.forEach(group => {
    // Only show filter if at least one recipe matches
    const hasRecipes = allRecipes.some(r =>
      r.targetsArray.some(t => group.targets.includes(t))
    );
    if (!hasRecipes) return;

    html += `<button class="filter-chip" data-target="${group.id}" role="tab" aria-selected="false">
      <span class="filter-chip__icon">${group.icon}</span><span>${group.he}</span>
    </button>`;
  });

  filterBar.innerHTML = html;

  // Attach click handlers
  filterBar.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      applyFilter(chip.dataset.target);
      // Update active state
      filterBar.querySelectorAll('.filter-chip').forEach(c => {
        c.classList.remove('filter-chip--active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('filter-chip--active');
      chip.setAttribute('aria-selected', 'true');
    });
  });
}

function applyFilter(targetId) {
  activeFilter = targetId;

  if (targetId === 'all') {
    filteredRecipes = [...allRecipes];
  } else {
    const group = FILTER_GROUPS.find(g => g.id === targetId);
    if (group) {
      filteredRecipes = allRecipes.filter(r =>
        r.targetsArray.some(t => group.targets.includes(t))
      );
    } else {
      filteredRecipes = [...allRecipes];
    }
  }

  // Update title
  if (targetId === 'all') {
    $('#carousel-title').textContent = 'כל התרכובות';
  } else {
    const group = FILTER_GROUPS.find(g => g.id === targetId);
    $('#carousel-title').textContent = group ? `תרכובות ל${group.he}` : 'כל התרכובות';
  }

  renderCarousel();
  renderGrid();
}

// ===== MODAL =====

function openModal(recipeId) {
  const recipe = allRecipes.find(r => r.recipe_id === recipeId);
  if (!recipe) return;

  const modal = $('#recipe-modal');
  const typeLabel = TYPE_MAP[recipe.type] || recipe.type;
  const imgURL = getImageURL(recipe);

  // Fill modal content
  $('#modal-image').src = imgURL;
  $('#modal-image').alt = recipe.name_en;
  $('#modal-title').textContent = recipe.name_he;
  $('#modal-subtitle').textContent = recipe.name_en;
  $('#modal-type').textContent = typeLabel;

  // Targets
  $('#modal-targets').innerHTML = recipe.targetsArray.map(renderTargetBadge).join('');

  // Ingredients – translate to Hebrew
  $('#modal-ingredients').innerHTML = recipe.ingredientsArray
    .map(ing => `<li>${translateIngredient(ing)}</li>`)
    .join('');

  // Preparation
  $('#modal-preparation').textContent = recipe.preparation || '';

  // Frequency
  $('#modal-frequency').textContent = recipe.frequency_duration || '';

  // Evidence
  $('#modal-evidence').textContent = recipe.evidence_summary || '';

  // Key ingredients with evidence
  $('#modal-key-ingredients').innerHTML = recipe.evidenceIngredients
    .map(ing => `<span class="key-ingredient-badge">${ing}</span>`)
    .join('');

  // References
  $('#modal-refs').innerHTML = recipe.refsArray
    .map(ref => {
      const { url, label } = buildRefURL(ref);
      return `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`;
    })
    .join('');

  // Show modal
  modal.classList.add('modal-overlay--open');
  document.body.classList.add('modal-open');

  // Focus trap
  setTimeout(() => $('#modal-close').focus(), 100);
}

function closeModal() {
  const modal = $('#recipe-modal');
  modal.classList.remove('modal-overlay--open');
  document.body.classList.remove('modal-open');
}

// Make openModal globally accessible
window.openModal = openModal;

// ===== NAVIGATION =====

function initNavbar() {
  const hamburger = $('#hamburger-btn');
  const mobileMenu = $('#mobile-menu');
  const overlay = $('#mobile-menu-overlay');
  const closeBtn = $('#mobile-menu-close');
  const navbar = $('#navbar');

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('mobile-menu--open');
    mobileMenu.classList.toggle('mobile-menu--open');
    hamburger.classList.toggle('navbar__hamburger--open');
    hamburger.setAttribute('aria-expanded', !isOpen);
    mobileMenu.setAttribute('aria-hidden', isOpen);
    if (!isOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
  });

  // Close mobile menu
  const closeMobileMenu = () => {
    mobileMenu.classList.remove('mobile-menu--open');
    hamburger.classList.remove('navbar__hamburger--open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  overlay.addEventListener('click', closeMobileMenu);
  closeBtn.addEventListener('click', closeMobileMenu);

  // Mobile menu links
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ===== TOUCH / SWIPE SUPPORT =====

function initSwipe() {
  const track = $('#carousel-track');

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  const threshold = 50;

  // RTL: swipe left (negative diff in LTR) means "next" in LTR but "prev" in RTL
  if (Math.abs(diff) < threshold) return;

  if (diff > 0) {
    // Swiped left → in RTL this goes to previous (right-to-left reading)
    prevSlide();
  } else {
    // Swiped right → in RTL this goes to next
    nextSlide();
  }
}

// ===== MODAL EVENTS =====

function initModal() {
  const modal = $('#recipe-modal');
  const closeBtn = $('#modal-close');

  closeBtn.addEventListener('click', closeModal);

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ===== CAROUSEL ARROWS =====

function initCarouselControls() {
  $('#carousel-prev').addEventListener('click', prevSlide);
  $('#carousel-next').addEventListener('click', nextSlide);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if ($('#recipe-modal').classList.contains('modal-overlay--open')) return;
    if (e.key === 'ArrowRight') prevSlide(); // RTL
    if (e.key === 'ArrowLeft') nextSlide();  // RTL
  });
}

// ===== VIEW TOGGLE =====

function initViewToggle() {
  const carouselBtn = $('#view-carousel-btn');
  const gridBtn = $('#view-grid-btn');
  const carouselSection = $('#carousel-section');
  const gridSection = $('#grid-section');

  carouselBtn.addEventListener('click', () => {
    viewMode = 'carousel';
    carouselSection.style.display = '';
    gridSection.classList.remove('grid-section--visible');
    carouselBtn.classList.add('view-toggle-btn--active');
    gridBtn.classList.remove('view-toggle-btn--active');
  });

  gridBtn.addEventListener('click', () => {
    viewMode = 'grid';
    carouselSection.style.display = 'none';
    gridSection.classList.add('grid-section--visible');
    gridBtn.classList.add('view-toggle-btn--active');
    carouselBtn.classList.remove('view-toggle-btn--active');
    renderGrid();
  });
}

// ===== HERO STATS =====

function updateHeroStats() {
  const totalRecipes = allRecipes.length;
  const allTargets = new Set();
  let totalRefs = 0;
  allRecipes.forEach(r => {
    r.targetsArray.forEach(t => allTargets.add(t));
    totalRefs += r.refsArray.length;
  });

  $('#stat-recipes').textContent = totalRecipes;
  $('#stat-targets').textContent = `${allTargets.size}+`;
  $('#stat-refs').textContent = `${totalRefs}+`;
}

// ===== INITIALIZATION =====

async function init() {
  try {
    const response = await fetch(CSV_PATH);
    if (!response.ok) throw new Error(`Failed to load CSV: ${response.status}`);

    const csvText = await response.text();
    allRecipes = parseCSV(csvText);
    filteredRecipes = [...allRecipes];

    if (allRecipes.length === 0) {
      throw new Error('No recipes found in CSV');
    }

    // Initialize UI
    renderFilters();
    renderCarousel();
    renderGrid();
    updateHeroStats();
    initNavbar();
    initModal();
    initCarouselControls();
    initSwipe();
    initViewToggle();

    console.log(`✅ Loaded ${allRecipes.length} recipes`);
  } catch (error) {
    console.error('Error initializing app:', error);
    $('#carousel-track').innerHTML = `
      <div class="recipe-card" style="min-width:100%;text-align:center;padding:3rem;">
        <p style="color:#d32f2f;">שגיאה בטעינת הנתונים: ${error.message}</p>
        <p style="color:var(--clr-text-muted);margin-top:1rem;">אנא ודאו שקובץ ה-CSV נמצא ב-<code>data/plant_mixtures_recipes.csv</code></p>
      </div>
    `;
  }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
