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
  let qCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    const qMatch = line.match(/^(\d+-\d+)\.\s+(.+)/);
    if (qMatch) {
      const qId = qMatch[1];
      const qText = qMatch[2];

      let answer = "";
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();
        const aMatch = nextLine.match(/^(\d+-\d+)\s*:\s*(.+)/);
        if (aMatch && aMatch[1] === qId) {
          answer = aMatch[2];
          for (let k = j + 1; k < lines.length; k++) {
            const contLine = lines[k].trim();
            if (!contLine || contLine.startsWith("=") || contLine.startsWith("━") || contLine.match(/^\d+-\d+\./) || contLine.match(/^Part\s/) || contLine.startsWith("※") || contLine.startsWith("END")) break;
            if (contLine.match(/^\d+-\d+\s*:/)) break;
            answer += "\n" + contLine;
          }
          break;
        }
        if (nextLine === "" || nextLine.startsWith("=") || nextLine.startsWith("━")) continue;
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

// Extract common sections from bodybuilding file
function extractCommonSections(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split(/\r?\n/);

  // Find Part boundaries
  const parts = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].trim().match(/^Part\s+(\d+)\.\s+(.+)/);
    if (match) {
      parts.push({ partNum: parseInt(match[1]), title: match[2], startLine: i });
    }
  }

  // Set end lines
  for (let i = 0; i < parts.length; i++) {
    parts[i].endLine = i + 1 < parts.length ? parts[i + 1].startLine : lines.length;
  }

  const commonSections = {
    firstAid: [],  // Part 1: 응급처치
    doping: [],    // Part 5: 도핑 questions (5-090 ~ 5-146)
    humanRights: [], // Part 6: 스포츠 인권
  };

  // Part 1: 응급처치 - all questions
  const part1 = parts.find(p => p.title.includes("응급처치"));
  if (part1) {
    const section = lines.slice(part1.startLine, part1.endLine).join("\n");
    const tmpFile = filePath + ".tmp_part1";
    fs.writeFileSync(tmpFile, section);
    commonSections.firstAid = parseFile(tmpFile);
    fs.unlinkSync(tmpFile);
    // Prefix questions
    commonSections.firstAid.forEach(q => {
      q.category = "응급처치";
    });
  }

  // Part 5: 도핑 - only doping-specific questions (5-090+)
  // Search entire file for doping questions starting from 5-090
  const dopingStartIdx = lines.findIndex(l => l.trim().match(/^5-090\./));
  if (dopingStartIdx >= 0) {
    // Find end: Part 6 start or end of file
    let dopingEndIdx = lines.length;
    for (let i = dopingStartIdx; i < lines.length; i++) {
      if (lines[i].trim().match(/^Part\s+6\./)) { dopingEndIdx = i; break; }
    }
    const section = lines.slice(dopingStartIdx, dopingEndIdx).join("\n");
    const tmpFile = filePath + ".tmp_part5";
    fs.writeFileSync(tmpFile, section, "utf-8");
    commonSections.doping = parseFile(tmpFile);
    fs.unlinkSync(tmpFile);
    commonSections.doping.forEach(q => {
      q.category = "도핑";
    });
  }

  // Part 6: 스포츠 인권
  const part6 = parts.find(p => p.title.includes("인권"));
  if (part6) {
    const section = lines.slice(part6.startLine, part6.endLine).join("\n");
    const tmpFile = filePath + ".tmp_part6";
    fs.writeFileSync(tmpFile, section);
    commonSections.humanRights = parseFile(tmpFile);
    fs.unlinkSync(tmpFile);
    commonSections.humanRights.forEach(q => {
      q.category = "인권·성폭력";
    });
  }

  return commonSections;
}

// Get common sections from bodybuilding file
const bbFile = path.join(RAW_DIR, "보디빌딩_스포츠지도사2급_구술답변_전체.txt");
const common = extractCommonSections(bbFile);

console.log(`공통(보디빌딩) - 응급처치: ${common.firstAid.length}문항`);
console.log(`공통(보디빌딩) - 도핑: ${common.doping.length}문항`);
console.log(`공통(보디빌딩) - 인권·성폭력: ${common.humanRights.length}문항`);

// Get common "생활체육" section
const commonLifeFile = path.join(RAW_DIR, "공통_생활체육.txt");
const commonLifeSections = { lifeSports: [], lifeSportsFirstAid: [] };
if (fs.existsSync(commonLifeFile)) {
  const content = fs.readFileSync(commonLifeFile, "utf-8");
  const lines = content.split(/\r?\n/);

  // Find Part boundaries
  const parts = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].trim().match(/^Part\s+(\d+)\.\s+(.+)/);
    if (match) parts.push({ partNum: parseInt(match[1]), title: match[2], startLine: i });
  }
  for (let i = 0; i < parts.length; i++) {
    parts[i].endLine = i + 1 < parts.length ? parts[i + 1].startLine : lines.length;
  }

  // Part 1: 생활체육 공통
  const part1 = parts.find(p => p.title.includes("생활체육 공통"));
  if (part1) {
    const section = lines.slice(part1.startLine, part1.endLine).join("\n");
    const tmpFile = commonLifeFile + ".tmp1";
    fs.writeFileSync(tmpFile, section, "utf-8");
    commonLifeSections.lifeSports = parseFile(tmpFile);
    fs.unlinkSync(tmpFile);
    commonLifeSections.lifeSports.forEach(q => { q.category = "생활체육"; });
  }

  // Part 2: 응급처치 공통 구술
  const part2 = parts.find(p => p.title.includes("응급처치 공통"));
  if (part2) {
    const section = lines.slice(part2.startLine, part2.endLine).join("\n");
    const tmpFile = commonLifeFile + ".tmp2";
    fs.writeFileSync(tmpFile, section, "utf-8");
    commonLifeSections.lifeSportsFirstAid = parseFile(tmpFile);
    fs.unlinkSync(tmpFile);
    commonLifeSections.lifeSportsFirstAid.forEach(q => { q.category = "응급처치(공통구술)"; });
  }
}

console.log(`공통(생활체육) - 생활체육: ${commonLifeSections.lifeSports.length}문항`);
console.log(`공통(생활체육) - 응급처치 공통구술: ${commonLifeSections.lifeSportsFirstAid.length}문항`);

const totalCommon = common.firstAid.length + common.doping.length + common.humanRights.length + commonLifeSections.lifeSports.length + commonLifeSections.lifeSportsFirstAid.length;
console.log(`공통 합계: ${totalCommon}문항\n`);

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
  const sportQuestions = parseFile(filePath);

  // For non-bodybuilding sports, append common sections
  // For bodybuilding, the questions already include them
  let allQuestions;
  if (sport.id === "bodybuilding") {
    allQuestions = sportQuestions;
  } else {
    // Check if sport already has similar common content (avoid duplicates)
    const hasFirstAid = sportQuestions.some(q =>
      q.question.includes("응급처치") || q.question.includes("RICE") || q.question.includes("CPR")
    );
    const hasDoping = sportQuestions.some(q =>
      q.question.includes("도핑") || q.question.includes("doping")
    );
    const hasHumanRights = sportQuestions.some(q =>
      q.question.includes("인권침해") || q.question.includes("성희롱") || q.question.includes("성폭력")
    );

    allQuestions = [...sportQuestions];

    // Add 생활체육 공통 (always add for all non-bodybuilding sports)
    if (commonLifeSections.lifeSports.length > 0) {
      allQuestions.push(...commonLifeSections.lifeSports.map(q => ({ ...q })));
    }
    if (commonLifeSections.lifeSportsFirstAid.length > 0) {
      allQuestions.push(...commonLifeSections.lifeSportsFirstAid.map(q => ({ ...q })));
    }

    // Add common sections from bodybuilding
    if (!hasFirstAid && common.firstAid.length > 0) {
      allQuestions.push(...common.firstAid.map(q => ({ ...q })));
    }
    if (!hasDoping && common.doping.length > 0) {
      allQuestions.push(...common.doping.map(q => ({ ...q })));
    }
    if (!hasHumanRights && common.humanRights.length > 0) {
      allQuestions.push(...common.humanRights.map(q => ({ ...q })));
    }
  }

  // Re-number IDs
  allQuestions.forEach((q, idx) => { q.id = idx + 1; });

  console.log(`${sport.name}: ${sportQuestions.length} 고유 + 공통 = ${allQuestions.length}문항`);

  sports.push({
    id: sport.id,
    name: sport.name,
    questions: allQuestions,
  });
}

// Sort by name
sports.sort((a, b) => a.name.localeCompare(b.name, "ko"));

// Generate TypeScript
let ts = `// 구술 - 종목별 질의응답 데이터
// 자동 생성됨 (scripts/parse-oral.js)
// 공통 영역(응급처치/도핑/인권·성폭력)이 각 종목에 포함됨

export interface OralQuestion {
  id: number;
  question: string;
  answer: string;
  category?: string; // "응급처치" | "도핑" | "인권·성폭력" for common sections
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
    const catStr = q.category ? `, category: "${q.category}"` : "";
    ts += `      { id: ${q.id}, question: "${escapedQ}", answer: "${escapedA}"${catStr} },\n`;
  }
  ts += `    ],\n`;
  ts += `  },\n`;
}

ts += `];\n`;

fs.writeFileSync(OUTPUT, ts, "utf-8");
const totalQ = sports.reduce((sum, s) => sum + s.questions.length, 0);
console.log(`\nGenerated ${OUTPUT}`);
console.log(`${sports.length}개 종목, 총 ${totalQ}문항 (공통 포함)`);
