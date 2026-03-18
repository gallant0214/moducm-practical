const fs = require("fs");
const path = require("path");

const RAW_DIR = path.join(__dirname, "../src/data/raw");
const OUTPUT = path.join(__dirname, "../src/data/oral.ts");

// Map filename prefix to sport ID and display name
const SPORT_MAP = {
  "골프": { id: "golf", name: "골프" },
  "농구": { id: "basketball", name: "농구" },
  "당구": { id: "billiards", name: "당구" },
  "레크레이션": { id: "recreation", name: "레크리에이션" },
  "배구": { id: "volleyball", name: "배구" },
  "배드민턴": { id: "badminton", name: "배드민턴" },
  "보디빌딩": { id: "bodybuilding", name: "보디빌딩" },
  "볼링": { id: "bowling", name: "볼링" },
  "수영": { id: "swimming", name: "수영" },
  "승마": { id: "horseriding", name: "승마" },
  "승무도": { id: "seungmudo", name: "승무도" },
  "양궁": { id: "archery", name: "양궁" },
  "육상": { id: "athletics", name: "육상" },
  "자전거": { id: "cycling", name: "자전거" },
  "조깅": { id: "jogging", name: "조깅" },
  "축구": { id: "football", name: "축구" },
  "탁구": { id: "tabletennis", name: "탁구" },
  "태권도": { id: "taekwondo", name: "태권도" },
  "테니스": { id: "tennis", name: "테니스" },
  "핸드볼": { id: "handball", name: "핸드볼" },
};

function parseFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);
  const questions = [];
  let currentQ = null;
  let qCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match question line: X-XXX. question text
    const qMatch = line.match(/^(\d+-\d+)\.\s+(.+)/);
    if (qMatch) {
      const qId = qMatch[1];
      const qText = qMatch[2];

      // Look for answer on next line(s): X-XXX : answer text
      let answer = "";
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();
        const aMatch = nextLine.match(/^(\d+-\d+)\s*:\s*(.+)/);
        if (aMatch && aMatch[1] === qId) {
          answer = aMatch[2];
          // Collect continuation lines (lines that don't match new question or answer patterns)
          for (let k = j + 1; k < lines.length; k++) {
            const contLine = lines[k].trim();
            if (!contLine || contLine.startsWith("=") || contLine.match(/^\d+-\d+\./) || contLine.match(/^Part\s/) || contLine.startsWith("※") || contLine.startsWith("END")) break;
            if (contLine.match(/^\d+-\d+\s*:/)) break;
            answer += "\n" + contLine;
          }
          break;
        }
        if (nextLine === "" || nextLine.startsWith("=")) continue;
        break;
      }

      if (answer) {
        qCounter++;
        questions.push({
          id: qCounter,
          question: qText,
          answer: answer,
        });
      }
    }
  }

  return questions;
}

// Process all files
const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith(".txt") && f.includes("구술답변"));
const sports = [];

for (const file of files) {
  const prefix = file.split("_")[0];
  const sport = SPORT_MAP[prefix];
  if (!sport) {
    console.warn(`Unknown sport prefix: ${prefix} in file ${file}`);
    continue;
  }

  const filePath = path.join(RAW_DIR, file);
  const questions = parseFile(filePath);
  console.log(`${sport.name}: ${questions.length} questions`);

  sports.push({
    id: sport.id,
    name: sport.name,
    questions,
  });
}

// Sort by name
sports.sort((a, b) => a.name.localeCompare(b.name, "ko"));

// Generate TypeScript
let ts = `// 구술 - 종목별 질의응답 데이터
// 자동 생성됨 (scripts/parse-oral.js)

export interface OralQuestion {
  id: number;
  question: string;
  answer: string;
}

export interface OralSport {
  id: string;
  name: string;
  questions: OralQuestion[];
}

export const oralSports: OralSport[] = [\n`;

for (const sport of sports) {
  ts += `  {\n`;
  ts += `    id: "${sport.id}",\n`;
  ts += `    name: "${sport.name}",\n`;
  ts += `    questions: [\n`;
  for (const q of sport.questions) {
    const escapedQ = q.question.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    const escapedA = q.answer.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    ts += `      { id: ${q.id}, question: "${escapedQ}", answer: "${escapedA}" },\n`;
  }
  ts += `    ],\n`;
  ts += `  },\n`;
}

ts += `];\n`;

fs.writeFileSync(OUTPUT, ts, "utf-8");
console.log(`\nGenerated ${OUTPUT} with ${sports.length} sports, ${sports.reduce((sum, s) => sum + s.questions.length, 0)} total questions`);
