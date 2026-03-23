// 실기 - 보디빌딩 웨이트 트레이닝 실기 종목
// 스포츠지도사 2급 실기시험 기준 48개 동작

export interface Exercise {
  id: number;
  name: string;
  image: string;
  category: string;
}

export const exercises: Exercise[] = [
  // === 가슴 (6) ===
  { id: 1, name: "플랫 바벨 벤치 프레스", image: "/exercises/플랫-바벨-벤치-프레스.jpg", category: "가슴" },
  { id: 2, name: "인클라인 바벨 벤치프레스", image: "/exercises/인클라인-바벨-벤치프레스.jpg", category: "가슴" },
  { id: 3, name: "플랫 덤벨 벤치프레스", image: "/exercises/플랫-덤벨-벤치프레스.jpg", category: "가슴" },
  { id: 4, name: "플랫 덤벨 플라이", image: "/exercises/플랫-덤벨-플라이.jpg", category: "가슴" },
  { id: 5, name: "인클라인 덤벨 벤치프레스", image: "/exercises/인클라인-덤벨-벤치프레스.jpg", category: "가슴" },
  { id: 6, name: "플랫 덤벨 풀오버", image: "/exercises/플랫-덤벨-풀오버.jpg", category: "가슴" },

  // === 이두 (8) ===
  { id: 7, name: "스탠딩 바벨 컬", image: "/exercises/스탠딩-바벨-컬.jpg", category: "이두" },
  { id: 8, name: "스탠딩 리버스 바벨 컬", image: "/exercises/스탠딩-리버스-바벨-컬.jpg", category: "이두" },
  { id: 9, name: "스탠딩 덤벨 컬", image: "/exercises/스탠딩-덤벨-컬.jpg", category: "이두" },
  { id: 10, name: "스탠딩 얼터네이트 덤벨 컬", image: "/exercises/스탠딩-얼터네이트-덤벨-컬.jpg", category: "이두" },
  { id: 11, name: "덤벨 컨센트레이션 컬", image: "/exercises/덤벨-컨센트레이션-컬.jpg", category: "이두" },
  { id: 12, name: "스탠딩 덤벨 해머 컬", image: "/exercises/스탠딩-덤벨-해머-컬.jpg", category: "이두" },
  { id: 13, name: "스탠딩 얼터네이트 해머 컬", image: "/exercises/스탠딩-얼터네이트-해머-컬.jpg", category: "이두" },
  { id: 14, name: "스쿼팅 바벨 컬", image: "/exercises/스쿼팅-바벨-컬.jpg", category: "이두" },

  // === 삼두 (5) ===
  { id: 15, name: "스탠딩 바벨 오버헤드 트라이셉스 익스텐션", image: "/exercises/스탠딩-바벨-오버헤드-트라이셉스-익스텐션.jpg", category: "삼두" },
  { id: 16, name: "라잉 바벨 트라이셉스 익스텐션", image: "/exercises/라잉-바벨-트라이셉스-익스텐션.jpg", category: "삼두" },
  { id: 17, name: "스탠딩 원암 덤벨 오버헤드 트라이셉스 익스텐션", image: "/exercises/스탠딩-원암-덤벨-오버헤드-트라이셉스-익스텐션.jpg", category: "삼두" },
  { id: 18, name: "덤벨 킥백", image: "/exercises/덤벨-킥백.jpg", category: "삼두" },
  { id: 19, name: "벤치 딥스", image: "/exercises/벤치-딥스.jpg", category: "삼두" },

  // === 전완 (4) ===
  { id: 20, name: "바벨 리스트 컬", image: "/exercises/바벨-리스트-컬.jpg", category: "전완" },
  { id: 21, name: "바벨 리버스 리스트 컬", image: "/exercises/바벨-리버스-리스트-컬.jpg", category: "전완" },
  { id: 22, name: "덤벨 리스트 컬", image: "/exercises/덤벨-리스트-컬.jpg", category: "전완" },
  { id: 23, name: "덤벨 리버스 리스트 컬", image: "/exercises/덤벨-리버스-리스트-컬.jpg", category: "전완" },

  // === 등 (9) ===
  { id: 24, name: "벤트오버 바벨 로우", image: "/exercises/벤트오버-바벨-로우.jpg", category: "등" },
  { id: 25, name: "언더그립 바벨 로우", image: "/exercises/언더그립-바벨-로우.jpg", category: "등" },
  { id: 26, name: "벤트오버 원암 덤벨 로우", image: "/exercises/벤트오버-원암-덤벨-로우.jpg", category: "등" },
  { id: 27, name: "뉴트럴그립 투암 덤벨 로우", image: "/exercises/뉴트럴그립-투암-덤벨-로우.jpg", category: "등" },
  { id: 28, name: "바벨 굿모닝 엑서사이즈", image: "/exercises/바벨-굿모닝-엑서사이즈.jpg", category: "등" },
  { id: 29, name: "컨벤셔널 데드리프트", image: "/exercises/컨벤셔널-데드리프트.jpg", category: "등" },
  { id: 30, name: "루마니안 데드리프트", image: "/exercises/루마니안-데드리프트.jpg", category: "등" },
  { id: 31, name: "덤벨 쉬러그", image: "/exercises/덤벨-쉬러그.jpg", category: "등" },
  { id: 32, name: "바벨 쉬러그", image: "/exercises/바벨-쉬러그.jpg", category: "등" },

  // === 어깨 (7) ===
  { id: 33, name: "스탠딩 밀리터리 프레스", image: "/exercises/스탠딩-밀리터리-프레스.jpg", category: "어깨" },
  { id: 34, name: "스탠딩 비하인드 넥 프레스", image: "/exercises/스탠딩-비하인드-넥-프레스.jpg", category: "어깨" },
  { id: 35, name: "스탠딩 덤벨 숄더 프레스", image: "/exercises/스탠딩-덤벨-숄더-프레스.jpg", category: "어깨" },
  { id: 36, name: "스탠딩 바벨 프런트 레이즈", image: "/exercises/스탠딩-바벨-프런트-레이즈.jpg", category: "어깨" },
  { id: 37, name: "스탠딩 덤벨 프런트 레이즈", image: "/exercises/스탠딩-덤벨-프런트-레이즈.jpg", category: "어깨" },
  { id: 38, name: "덤벨 벤트오버 레터럴 레이즈", image: "/exercises/덤벨-벤트오버-레터럴-레이즈.jpg", category: "어깨" },
  { id: 39, name: "바벨 업라이트 로우", image: "/exercises/바벨-업라이트-로우.jpg", category: "어깨" },

  // === 하체 (9) ===
  { id: 40, name: "백 스쿼트", image: "/exercises/백-스쿼트.jpg", category: "하체" },
  { id: 41, name: "바벨 와이드 스탠스 스쿼트", image: "/exercises/바벨-와이드-스탠스-스쿼트.jpg", category: "하체" },
  { id: 42, name: "바벨 프런트 스쿼트", image: "/exercises/바벨-프런트-스쿼트.jpg", category: "하체" },
  { id: 43, name: "고블릿 스쿼트", image: "/exercises/고블릿-스쿼트.jpg", category: "하체" },
  { id: 44, name: "바벨 불가리안 스플릿 스쿼트", image: "/exercises/바벨-불가리안-스플릿-스쿼트.jpg", category: "하체" },
  { id: 45, name: "덤벨 불가리안 스플릿 스쿼트", image: "/exercises/덤벨-불가리안-스플릿-스쿼트.jpg", category: "하체" },
  { id: 46, name: "스티프 레그 데드리프트", image: "/exercises/스티프-레그-데드리프트.jpg", category: "하체" },
  { id: 47, name: "바벨 런지", image: "/exercises/바벨-런지.jpg", category: "하체" },
  { id: 48, name: "덤벨 런지", image: "/exercises/덤벨-런지.jpg", category: "하체" },
];

export const categories = ["전체", "가슴", "이두", "삼두", "전완", "등", "어깨", "하체"] as const;
