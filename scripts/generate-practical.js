const fs = require("fs");
const path = require("path");

// Read the JSON data - passed as argument or from stdin
const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error("Usage: node generate-practical.js <exercises.json>");
  process.exit(1);
}

const exercises = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
console.log(`Loaded ${exercises.length} exercises`);

// Auto-categorize exercises by keywords in the title
function categorize(title) {
  const t = title.toLowerCase();

  // 하체
  if (/squat|lunge|leg press|leg extension|leg curl|calf raise|hip thrust|glute|deadlift|step-up|pistol|hack squat|split squat|good morning|hip extension|hip abduction|hip adduction|frog pump/.test(t)) return "하체";

  // 가슴
  if (/bench press|push-up|push up|chest press|fly|flye|pullover|svend press|cable cross|chest dip/.test(t)) return "가슴";

  // 등
  if (/row|pull-up|pull up|chin-up|chin up|lat pull|pulldown|pull-down|inverted|back extension|hyperextension|superman|dead hang|shrug|t-bar/.test(t)) return "등";

  // 어깨
  if (/shoulder press|overhead press|lateral raise|front raise|arnold|rear delt|face pull|upright row|y-raise|cuban|pike press|handstand|scott press|w-press|reverse fly|reverse raise/.test(t)) return "어깨";

  // 팔 (이두)
  if (/curl/.test(t)) return "팔";

  // 팔 (삼두)
  if (/triceps|kickback|skull crush|push-down|pushdown|tate press|jm press|dip/.test(t)) return "팔";

  // 코어
  if (/crunch|plank|sit-up|situp|v-up|leg raise|twist|rollout|roll-out|wood chop|side bend|dead bug|scissor|jackknife|wiper|pallof|bird dog/.test(t)) return "코어";

  // 전완/그립
  if (/wrist|forearm|pronation|supination|wrist roller/.test(t)) return "전완";

  // 전신/기능성
  if (/carry|swing|kettlebell|stairmill|cable squat|clean|snatch/.test(t)) return "전신";

  return "기타";
}

// Generate exercises with categories
const categorized = exercises.map((ex, idx) => ({
  id: idx + 1,
  name: ex.title,
  image: ex.image,
  url: ex.url,
  category: categorize(ex.title),
}));

// Count per category
const counts = {};
categorized.forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
console.log("\nCategory breakdown:");
Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([cat, n]) => {
  console.log(`  ${cat}: ${n}`);
});

// Generate TypeScript
let ts = `// 실기 - 웨이트 트레이닝 동작 데이터 (518개)
// 자동 생성됨 (scripts/generate-practical.js)
// 이미지: weighttraining.guide 외부 URL

export interface Exercise {
  id: number;
  name: string;
  image: string | null;
  url: string;
  category: string;
}

export const exercises: Exercise[] = [\n`;

for (const ex of categorized) {
  const escapedName = ex.name.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  ts += `  { id: ${ex.id}, name: "${escapedName}", image: "${ex.image}", url: "${ex.url}", category: "${ex.category}" },\n`;
}

ts += `];\n\n`;
ts += `export const categories = [...new Set(exercises.map((e) => e.category))];\n`;

const outPath = path.join(__dirname, "../src/data/practical.ts");
fs.writeFileSync(outPath, ts, "utf-8");
console.log(`\nGenerated ${outPath} with ${categorized.length} exercises`);
