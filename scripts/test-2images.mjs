import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-3-pro-image-preview";
const OUT_DIR = path.resolve("public/exercises");
fs.mkdirSync(OUT_DIR, { recursive: true });

const TEST = [
  {
    ko: "인클라인 바벨 벤치프레스",
    image: "https://weighttraining.guide/wp-content/uploads/2016/11/incline-barbell-bench-press-resized-768x512.png",
  },
  {
    ko: "스탠딩 리버스 바벨 컬",
    image: "https://weighttraining.guide/wp-content/uploads/2016/10/Barbell-Reverse-Curl-resized-768x512.png",
  },
];

async function downloadImage(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Download failed: ${resp.status}`);
  return Buffer.from(await resp.arrayBuffer());
}

async function generate(imageBuffer, koreanName) {
  const base64 = imageBuffer.toString("base64");

  const prompt = `You are an exercise illustration editor. I am providing a reference exercise image.

STRICT RULES:
1. COPY the reference image EXACTLY - same pose, same angle, same number of figures
2. Keep the EXACT same hand grip, palm direction, finger positions, barbell/dumbbell angle and position
3. If the reference shows TWO phases (start + end of movement), you MUST show both phases in the same layout
4. Restyle ONLY the colors: body = teal/cyan, target muscles = orange/red highlight, background = clean light gray
5. REMOVE all watermarks and website text
6. Write ONLY the title "${koreanName}" in bold Korean text at the top center
7. Do NOT add any muscle name labels, arrows, lines, or annotations
8. Do NOT change the composition, poses, or equipment positions AT ALL`;

  const response = await ai.models.generateContent({
    model: MODEL,
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
  throw new Error(`No image. finishReason=${response.candidates?.[0]?.finishReason}`);
}

for (let i = 0; i < TEST.length; i++) {
  const ex = TEST[i];
  const slug = ex.ko.replace(/[^가-힣a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
  const outPath = path.join(OUT_DIR, `${slug}.png`);

  console.log(`[${i + 1}/2] ${ex.ko} ...`);
  try {
    const imgBuf = await downloadImage(ex.image);
    console.log(`  Downloaded reference: ${(imgBuf.length / 1024).toFixed(0)}KB`);
    const result = await generate(imgBuf, ex.ko);
    fs.writeFileSync(outPath, result);
    console.log(`  ✓ Saved: ${slug}.png (${(result.length / 1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
  }

  if (i < TEST.length - 1) await new Promise((r) => setTimeout(r, 3000));
}

console.log("\nDone! Check public/exercises/");
