import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const IMAGE_MODEL = "gemini-3-pro-image-preview";

const OUT_DIR = path.resolve("public/exercises");
fs.mkdirSync(OUT_DIR, { recursive: true });

const EXERCISES = [
  // 가슴
  { ko: "플랫 바벨 벤치 프레스", category: "가슴", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Bench-Press-resized-768x512.png" },
  { ko: "인클라인 바벨 벤치프레스", category: "가슴", image: "https://weighttraining.guide/wp-content/uploads/2016/11/incline-barbell-bench-press-resized-768x512.png" },
  { ko: "플랫 덤벨 벤치프레스", category: "가슴", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Bench-Press-resized-768x512.png" },
  { ko: "플랫 덤벨 플라이", category: "가슴", image: "https://weighttraining.guide/wp-content/uploads/2016/11/dumbbell-fly-resized-768x512.png" },
  { ko: "인클라인 덤벨 벤치프레스", category: "가슴", image: "https://weighttraining.guide/wp-content/uploads/2016/11/incline-dumbbell-bench-press-resized-768x512.png" },
  { ko: "플랫 덤벨 풀오버", category: "가슴", image: "https://weighttraining.guide/wp-content/uploads/2016/06/Dumbbell-Pullover-resized-768x512.png" },
  // 이두
  { ko: "스탠딩 바벨 컬", category: "이두", image: "https://weighttraining.guide/wp-content/uploads/2016/05/barbell-curl-resized-768x512.png" },
  { ko: "스탠딩 리버스 바벨 컬", category: "이두", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Barbell-Reverse-Curl-resized-768x512.png" },
  { ko: "스탠딩 덤벨 컬", category: "이두", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Alternate-Biceps-Curl-resized-768x512.png" },
  { ko: "스탠딩 얼터네이트 덤벨 컬", category: "이두", image: "https://weighttraining.guide/wp-content/uploads/2021/09/Seated-Alternating-dumbbell-Curl-768x512.png" },
  { ko: "덤벨 컨센트레이션 컬", category: "이두", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Concentration-Curl-resized-768x512.png" },
  { ko: "스탠딩 덤벨 해머 컬", category: "이두", image: "https://weighttraining.guide/wp-content/uploads/2016/11/Dumbbell-Hammer-Curl-resized-768x512.png" },
  { ko: "스탠딩 얼터네이트 해머 컬", category: "이두", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Dumbbell-cross-body-hammer-curl-768x512.png" },
  { ko: "스쿼팅 바벨 컬", category: "이두", image: "https://weighttraining.guide/wp-content/uploads/2022/04/Standing-barbell-concentration-curl-768x512.png" },
  // 삼두
  { ko: "스탠딩 바벨 오버헤드 트라이셉스 익스텐션", category: "삼두", image: "https://weighttraining.guide/wp-content/uploads/2023/07/Standing-overhead-barbell-triceps-extension-768x512.png" },
  { ko: "라잉 바벨 트라이셉스 익스텐션", category: "삼두", image: "https://weighttraining.guide/wp-content/uploads/2017/08/lying-barbell-triceps-extension-resized-768x512.png" },
  { ko: "스탠딩 원암 덤벨 오버헤드 트라이셉스 익스텐션", category: "삼두", image: "https://weighttraining.guide/wp-content/uploads/2022/07/Standing-one-arm-overhead-dumbbell-triceps-extension-768x512.png" },
  { ko: "덤벨 킥백", category: "삼두", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Kickback-resized-768x512.png" },
  { ko: "벤치 딥스", category: "삼두", image: "https://weighttraining.guide/wp-content/uploads/2016/10/bench-dip-resized-768x512.png" },
  // 전완
  { ko: "바벨 리스트 컬", category: "전완", image: "https://weighttraining.guide/wp-content/uploads/2019/03/Seated-barbell-wrist-curl-resized-768x512.png" },
  { ko: "바벨 리버스 리스트 컬", category: "전완", image: "https://weighttraining.guide/wp-content/uploads/2021/08/Barbell-reverse-wrist-curl-over-bench-768x512.png" },
  { ko: "덤벨 리스트 컬", category: "전완", image: "https://weighttraining.guide/wp-content/uploads/2017/06/seated-dumbbell-wrist-curl-resized-768x512.png" },
  { ko: "덤벨 리버스 리스트 컬", category: "전완", image: "https://weighttraining.guide/wp-content/uploads/2022/04/Dumbbell-reverse-wrist-curl-over-bench-1-768x512.png" },
  // 등
  { ko: "벤트오버 바벨 로우", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Bent-over-barbell-row-768x512.png" },
  { ko: "언더그립 바벨 로우", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2021/06/Barbell-underhand-Grip-Bent-Over-Row-768x512.png" },
  { ko: "벤트오버 원암 덤벨 로우", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2016/10/bent-over-one-arm-dumbbell-row-resized-768x512.png" },
  { ko: "뉴트럴그립 투암 덤벨 로우", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2017/01/bent-over-two-arm-dumbbell-row-resized-768x512.png" },
  { ko: "바벨 굿모닝 엑서사이즈", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2021/03/Barbell-good-morning-768x512.png" },
  { ko: "컨벤셔널 데드리프트", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Deadlift-1-768x512.png" },
  { ko: "루마니안 데드리프트", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Barbell-Romanian-Deadlift-768x512.png" },
  { ko: "덤벨 쉬러그", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2016/10/dumbbell-shrug-resized-768x512.png" },
  { ko: "바벨 쉬러그", category: "등", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Shrug-resized-768x512.png" },
  // 어깨
  { ko: "스탠딩 밀리터리 프레스", category: "어깨", image: "https://weighttraining.guide/wp-content/uploads/2016/10/barbell-military-press-resized-768x512.png" },
  { ko: "스탠딩 비하인드 넥 프레스", category: "어깨", image: "https://weighttraining.guide/wp-content/uploads/2017/08/behind-the-neck-barbell-overhead-press-resized-768x512.png" },
  { ko: "스탠딩 덤벨 숄더 프레스", category: "어깨", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Shoulder-Press-resized-768x512.png" },
  { ko: "스탠딩 바벨 프런트 레이즈", category: "어깨", image: "https://weighttraining.guide/wp-content/uploads/2021/06/Barbell-Front-Raise-768x512.png" },
  { ko: "스탠딩 덤벨 프런트 레이즈", category: "어깨", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Dumbbell-Standing-Alternate-Front-Raise-resized-768x512.png" },
  { ko: "덤벨 벤트오버 레터럴 레이즈", category: "어깨", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Rear-Lateral-Raise-resized-768x512.png" },
  { ko: "바벨 업라이트 로우", category: "어깨", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Wide-Grip-Upright-Row-resized-768x512.png" },
  // 하체
  { ko: "백 스쿼트", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2016/10/barbell-squat-resized-FIXED-2-768x512.png" },
  { ko: "바벨 와이드 스탠스 스쿼트", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2017/05/barbell-sumo-squat-resized-new-768x512.png" },
  { ko: "바벨 프런트 스쿼트", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2016/10/barbell-front-squat-new-resized-768x512.png" },
  { ko: "고블릿 스쿼트", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2022/01/Dumbbell-front-squat-768x512.png" },
  { ko: "바벨 불가리안 스플릿 스쿼트", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2017/02/Barbell-Bulgarian-Split-Squat-resized-fixed-768x512.png" },
  { ko: "덤벨 불가리안 스플릿 스쿼트", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2016/11/Dumbbell-Bulgarian-Split-Squat-resized-FIXED-768x512.png" },
  { ko: "스티프 레그 데드리프트", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2017/03/barbell-straight-leg-deadlift-resized-768x512.png" },
  { ko: "바벨 런지", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Barbell-Lunge-resized-fixed-768x512.png" },
  { ko: "덤벨 런지", category: "하체", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Dumbbell-Lunge-resized-fixed-768x512.png" },
];

const PROMPT = `Edit this reference exercise illustration. Copy the EXACT same pose, hand grip direction, palm/back-of-hand orientation, finger positions, dumbbell/barbell angle and position from the reference. Show BOTH the contraction and extension phases of the movement exactly as shown in the reference. Redraw with teal/cyan body color and orange highlighted target muscles on plain light gray background. Remove all watermarks. Write only the title "KOREAN_NAME" in bold Korean at the top. Do NOT add any muscle labels, arrows, or annotation lines.`;

async function downloadImage(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Download failed: ${resp.status}`);
  return Buffer.from(await resp.arrayBuffer());
}

async function generateImage(imageBuffer, koreanName) {
  const base64 = imageBuffer.toString("base64");
  const prompt = PROMPT.replace("KOREAN_NAME", koreanName);

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType: "image/png", data: base64 } },
          { text: prompt },
        ],
      },
    ],
    config: {
      responseModalities: ["IMAGE", "TEXT"],
    },
  });

  const parts = response.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData) {
      return Buffer.from(part.inlineData.data, "base64");
    }
  }

  throw new Error(`No image returned. finishReason=${response.candidates?.[0]?.finishReason}`);
}

async function processExercise(exercise, index) {
  const slug = exercise.ko.replace(/[^가-힣a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
  const outPath = path.join(OUT_DIR, `${slug}.png`);

  if (fs.existsSync(outPath)) {
    console.log(`[${index + 1}/${EXERCISES.length}] SKIP (exists): ${exercise.ko}`);
    return;
  }

  try {
    console.log(`[${index + 1}/${EXERCISES.length}] ${exercise.ko} ...`);
    const imageBuffer = await downloadImage(exercise.image);
    const newImage = await generateImage(imageBuffer, exercise.ko);
    fs.writeFileSync(outPath, newImage);
    console.log(`  ✓ Saved: ${slug}.png (${(newImage.length / 1024).toFixed(1)}KB)`);
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
    fs.appendFileSync(path.join(OUT_DIR, "../errors.log"), `${index}|${exercise.ko}|${err.message}\n`);
  }
}

async function main() {
  const startIdx = parseInt(process.argv[2] || "0", 10);
  const endIdx = parseInt(process.argv[3] || String(EXERCISES.length), 10);

  console.log(`\n=== Generating Korean exercise images ===`);
  console.log(`Range: ${startIdx}-${endIdx} of ${EXERCISES.length}`);
  console.log(`Model: ${IMAGE_MODEL}`);
  console.log(`Output: ${OUT_DIR}\n`);

  for (let i = startIdx; i < endIdx; i++) {
    await processExercise(EXERCISES[i], i);
    // Rate limit: wait 2s between requests
    if (i + 1 < endIdx) await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\n✅ Done!");
}

main().catch(console.error);
