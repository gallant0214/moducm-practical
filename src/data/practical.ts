// 실기 - 보디빌딩 웨이트 트레이닝 실기 종목
// 스포츠지도사 2급 실기시험 기준 48개 동작

export interface Exercise {
  id: number;
  name: string;
  image: string | null;
  url: string;
  category: string;
}

export const exercises: Exercise[] = [
  // === 가슴 (6) ===
  { id: 1, name: "플랫 바벨 벤치 프레스", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Bench-Press-resized-768x512.png", url: "https://weighttraining.guide/exercises/bench-press/", category: "가슴" },
  { id: 2, name: "인클라인 바벨 벤치프레스", image: "https://weighttraining.guide/wp-content/uploads/2016/11/incline-barbell-bench-press-resized-768x512.png", url: "https://weighttraining.guide/exercises/incline-barbell-bench-press/", category: "가슴" },
  { id: 3, name: "플랫 덤벨 벤치프레스", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Bench-Press-resized-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-bench-press/", category: "가슴" },
  { id: 4, name: "플랫 덤벨 플라이", image: "https://weighttraining.guide/wp-content/uploads/2016/11/dumbbell-fly-resized-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-fly/", category: "가슴" },
  { id: 5, name: "인클라인 덤벨 벤치프레스", image: "https://weighttraining.guide/wp-content/uploads/2016/11/incline-dumbbell-bench-press-resized-768x512.png", url: "https://weighttraining.guide/exercises/incline-dumbbell-bench-press/", category: "가슴" },
  { id: 6, name: "플랫 덤벨 풀오버", image: "https://weighttraining.guide/wp-content/uploads/2016/06/Dumbbell-Pullover-resized-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-pullover/", category: "가슴" },

  // === 이두 (8) ===
  { id: 7, name: "스탠딩 바벨 컬", image: "https://weighttraining.guide/wp-content/uploads/2016/05/barbell-curl-resized-768x512.png", url: "https://weighttraining.guide/exercises/barbell-curl/", category: "이두" },
  { id: 8, name: "스탠딩 리버스 바벨 컬", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Barbell-Reverse-Curl-resized-768x512.png", url: "https://weighttraining.guide/exercises/barbell-reverse-curl/", category: "이두" },
  { id: 9, name: "스탠딩 덤벨 컬", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Alternate-Biceps-Curl-resized-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-curl/", category: "이두" },
  { id: 10, name: "스탠딩 얼터네이트 덤벨 컬", image: "https://weighttraining.guide/wp-content/uploads/2021/09/Seated-Alternating-dumbbell-Curl-768x512.png", url: "https://weighttraining.guide/exercises/seated-alternating-dumbbell-curl/", category: "이두" },
  { id: 11, name: "덤벨 컨센트레이션 컬", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Concentration-Curl-resized-768x512.png", url: "https://weighttraining.guide/exercises/concentration-curl/", category: "이두" },
  { id: 12, name: "스탠딩 덤벨 해머 컬", image: "https://weighttraining.guide/wp-content/uploads/2016/11/Dumbbell-Hammer-Curl-resized-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-hammer-curl/", category: "이두" },
  { id: 13, name: "스탠딩 얼터네이트 해머 컬", image: "https://weighttraining.guide/wp-content/uploads/2016/11/Dumbbell-Hammer-Curl-resized-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-hammer-curl/", category: "이두" },
  { id: 14, name: "스쿼팅 바벨 컬", image: "https://weighttraining.guide/wp-content/uploads/2022/04/Standing-barbell-concentration-curl-768x512.png", url: "https://weighttraining.guide/exercises/standing-barbell-concentration-curl/", category: "이두" },

  // === 삼두 (5) ===
  { id: 15, name: "스탠딩 바벨 오버헤드 트라이셉스 익스텐션", image: "https://weighttraining.guide/wp-content/uploads/2023/07/Standing-overhead-barbell-triceps-extension-768x512.png", url: "https://weighttraining.guide/exercises/standing-overhead-barbell-triceps-extension/", category: "삼두" },
  { id: 16, name: "라잉 바벨 트라이셉스 익스텐션", image: "https://weighttraining.guide/wp-content/uploads/2017/08/lying-barbell-triceps-extension-resized-768x512.png", url: "https://weighttraining.guide/exercises/lying-barbell-triceps-extension/", category: "삼두" },
  { id: 17, name: "스탠딩 원암 덤벨 오버헤드 트라이셉스 익스텐션", image: "https://weighttraining.guide/wp-content/uploads/2022/07/Standing-one-arm-overhead-dumbbell-triceps-extension-768x512.png", url: "https://weighttraining.guide/exercises/standing-one-arm-overhead-dumbbell-triceps-extension/", category: "삼두" },
  { id: 18, name: "덤벨 킥백", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Kickback-resized-768x512.png", url: "https://weighttraining.guide/exercises/triceps-dumbbell-kickback/", category: "삼두" },
  { id: 19, name: "벤치 딥스", image: "https://weighttraining.guide/wp-content/uploads/2016/10/bench-dip-resized-768x512.png", url: "https://weighttraining.guide/exercises/bench-dip/", category: "삼두" },

  // === 전완 (4) ===
  { id: 20, name: "바벨 리스트 컬", image: "https://weighttraining.guide/wp-content/uploads/2019/03/Seated-barbell-wrist-curl-resized-768x512.png", url: "https://weighttraining.guide/exercises/seated-barbell-wrist-curl/", category: "전완" },
  { id: 21, name: "바벨 리버스 리스트 컬", image: "https://weighttraining.guide/wp-content/uploads/2021/08/Barbell-reverse-wrist-curl-over-bench-768x512.png", url: "https://weighttraining.guide/exercises/barbell-reverse-wrist-curl-over-bench/", category: "전완" },
  { id: 22, name: "덤벨 리스트 컬", image: "https://weighttraining.guide/wp-content/uploads/2017/06/seated-dumbbell-wrist-curl-resized-768x512.png", url: "https://weighttraining.guide/exercises/seated-dumbbell-wrist-curl/", category: "전완" },
  { id: 23, name: "덤벨 리버스 리스트 컬", image: "https://weighttraining.guide/wp-content/uploads/2022/04/Dumbbell-reverse-wrist-curl-over-bench-1-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-reverse-wrist-curl-over-bench/", category: "전완" },

  // === 등 (9) ===
  { id: 24, name: "벤트오버 바벨 로우", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Bent-over-barbell-row-768x512.png", url: "https://weighttraining.guide/exercises/bent-over-barbell-row/", category: "등" },
  { id: 25, name: "언더그립 바벨 로우", image: "https://weighttraining.guide/wp-content/uploads/2021/06/Barbell-underhand-Grip-Bent-Over-Row-768x512.png", url: "https://weighttraining.guide/exercises/barbell-underhand-grip-bent-over-row/", category: "등" },
  { id: 26, name: "벤트오버 원암 덤벨 로우", image: "https://weighttraining.guide/wp-content/uploads/2016/10/bent-over-one-arm-dumbbell-row-resized-768x512.png", url: "https://weighttraining.guide/exercises/bent-over-dumbbell-row/", category: "등" },
  { id: 27, name: "뉴트럴그립 투암 덤벨 로우", image: "https://weighttraining.guide/wp-content/uploads/2017/01/bent-over-two-arm-dumbbell-row-resized-768x512.png", url: "https://weighttraining.guide/exercises/bent-over-two-arm-dumbbell-row/", category: "등" },
  { id: 28, name: "바벨 굿모닝 엑서사이즈", image: "https://weighttraining.guide/wp-content/uploads/2021/03/Barbell-good-morning-768x512.png", url: "https://weighttraining.guide/exercises/barbell-good-morning/", category: "등" },
  { id: 29, name: "컨벤셔널 데드리프트", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Deadlift-1-768x512.png", url: "https://weighttraining.guide/exercises/barbell-deadlift/", category: "등" },
  { id: 30, name: "루마니안 데드리프트", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Barbell-Romanian-Deadlift-768x512.png", url: "https://weighttraining.guide/exercises/romanian-deadlift/", category: "등" },
  { id: 31, name: "덤벨 쉬러그", image: "https://weighttraining.guide/wp-content/uploads/2016/10/dumbbell-shrug-resized-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-shrug/", category: "등" },
  { id: 32, name: "바벨 쉬러그", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Shrug-resized-768x512.png", url: "https://weighttraining.guide/exercises/barbell-shrug/", category: "등" },

  // === 어깨 (7) ===
  { id: 33, name: "스탠딩 밀리터리 프레스 (바벨 오버헤드 프레스)", image: "https://weighttraining.guide/wp-content/uploads/2016/10/barbell-military-press-resized-768x512.png", url: "https://weighttraining.guide/exercises/barbell-overhead-press/", category: "어깨" },
  { id: 34, name: "스탠딩 비하인드 넥 프레스", image: "https://weighttraining.guide/wp-content/uploads/2017/08/behind-the-neck-barbell-overhead-press-resized-768x512.png", url: "https://weighttraining.guide/exercises/behind-the-neck-barbell-overhead-press/", category: "어깨" },
  { id: 35, name: "스탠딩 덤벨 숄더 프레스", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Shoulder-Press-resized-768x512.png", url: "https://weighttraining.guide/exercises/seated-dumbbell-overhead-press/", category: "어깨" },
  { id: 36, name: "스탠딩 바벨 프런트 레이즈", image: "https://weighttraining.guide/wp-content/uploads/2021/06/Barbell-Front-Raise-768x512.png", url: "https://weighttraining.guide/exercises/barbell-front-raise/", category: "어깨" },
  { id: 37, name: "스탠딩 덤벨 프런트 레이즈", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Dumbbell-Standing-Alternate-Front-Raise-resized-768x512.png", url: "https://weighttraining.guide/exercises/alternating-dumbbell-front-raise/", category: "어깨" },
  { id: 38, name: "덤벨 벤트오버 레터럴 레이즈", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Dumbbell-Rear-Lateral-Raise-resized-768x512.png", url: "https://weighttraining.guide/exercises/bent-over-lateral-raise/", category: "어깨" },
  { id: 39, name: "바벨 업라이트 로우", image: "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Wide-Grip-Upright-Row-resized-768x512.png", url: "https://weighttraining.guide/exercises/barbell-wide-grip-upright-row/", category: "어깨" },

  // === 하체 (9) ===
  { id: 40, name: "백 스쿼트 (바벨 스쿼트)", image: "https://weighttraining.guide/wp-content/uploads/2016/10/barbell-squat-resized-FIXED-2-768x512.png", url: "https://weighttraining.guide/exercises/barbell-squat/", category: "하체" },
  { id: 41, name: "바벨 와이드 스탠스 스쿼트", image: "https://weighttraining.guide/wp-content/uploads/2017/05/barbell-sumo-squat-resized-new-768x512.png", url: "https://weighttraining.guide/exercises/barbell-sumo-squat/", category: "하체" },
  { id: 42, name: "바벨 프런트 스쿼트", image: "https://weighttraining.guide/wp-content/uploads/2016/10/barbell-front-squat-new-resized-768x512.png", url: "https://weighttraining.guide/exercises/barbell-front-squat/", category: "하체" },
  { id: 43, name: "고블릿 스쿼트 (덤벨 프런트 스쿼트)", image: "https://weighttraining.guide/wp-content/uploads/2022/01/Dumbbell-front-squat-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-front-squat/", category: "하체" },
  { id: 44, name: "바벨 불가리안 스플릿 스쿼트", image: "https://weighttraining.guide/wp-content/uploads/2017/02/Barbell-Bulgarian-Split-Squat-resized-fixed-768x512.png", url: "https://weighttraining.guide/exercises/barbell-bulgarian-split-squat/", category: "하체" },
  { id: 45, name: "덤벨 불가리안 스플릿 스쿼트", image: "https://weighttraining.guide/wp-content/uploads/2016/11/Dumbbell-Bulgarian-Split-Squat-resized-FIXED-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-bulgarian-split-squat/", category: "하체" },
  { id: 46, name: "스티프 레그 데드리프트", image: "https://weighttraining.guide/wp-content/uploads/2017/03/barbell-straight-leg-deadlift-resized-768x512.png", url: "https://weighttraining.guide/exercises/barbell-straight-back-stiff-leg-deadlift/", category: "하체" },
  { id: 47, name: "바벨 런지", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Barbell-Lunge-resized-fixed-768x512.png", url: "https://weighttraining.guide/exercises/barbell-lunge/", category: "하체" },
  { id: 48, name: "덤벨 런지", image: "https://weighttraining.guide/wp-content/uploads/2016/10/Dumbbell-Lunge-resized-fixed-768x512.png", url: "https://weighttraining.guide/exercises/dumbbell-lunge/", category: "하체" },
];

export const categories = [...new Set(exercises.map((e) => e.category))];
