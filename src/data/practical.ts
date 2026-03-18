// 실기 - 보디빌딩(웨이트 트레이닝) 동작 데이터
// 이미지는 추후 추가 예정 (image 필드에 경로 입력)

export interface Exercise {
  id: number;
  name: string;
  image: string | null; // 추후 이미지 경로 추가
  category: string; // 부위 분류
}

export const exercises: Exercise[] = [
  // === 가슴 ===
  { id: 1, name: "벤치 프레스", image: null, category: "가슴" },
  { id: 2, name: "인클라인 벤치 프레스", image: null, category: "가슴" },
  { id: 3, name: "디클라인 벤치 프레스", image: null, category: "가슴" },
  { id: 4, name: "덤벨 플라이", image: null, category: "가슴" },
  { id: 5, name: "케이블 크로스오버", image: null, category: "가슴" },
  { id: 6, name: "펙 덱 플라이", image: null, category: "가슴" },
  { id: 7, name: "딥스", image: null, category: "가슴" },

  // === 등 ===
  { id: 8, name: "데드리프트", image: null, category: "등" },
  { id: 9, name: "바벨 로우", image: null, category: "등" },
  { id: 10, name: "덤벨 로우", image: null, category: "등" },
  { id: 11, name: "랫 풀다운", image: null, category: "등" },
  { id: 12, name: "시티드 로우", image: null, category: "등" },
  { id: 13, name: "풀업", image: null, category: "등" },
  { id: 14, name: "티바 로우", image: null, category: "등" },

  // === 어깨 ===
  { id: 15, name: "오버헤드 프레스", image: null, category: "어깨" },
  { id: 16, name: "덤벨 숄더 프레스", image: null, category: "어깨" },
  { id: 17, name: "사이드 레터럴 레이즈", image: null, category: "어깨" },
  { id: 18, name: "프론트 레이즈", image: null, category: "어깨" },
  { id: 19, name: "벤트오버 레터럴 레이즈", image: null, category: "어깨" },
  { id: 20, name: "업라이트 로우", image: null, category: "어깨" },
  { id: 21, name: "페이스 풀", image: null, category: "어깨" },

  // === 팔 ===
  { id: 22, name: "바벨 컬", image: null, category: "팔" },
  { id: 23, name: "덤벨 컬", image: null, category: "팔" },
  { id: 24, name: "해머 컬", image: null, category: "팔" },
  { id: 25, name: "트라이셉스 푸시다운", image: null, category: "팔" },
  { id: 26, name: "오버헤드 트라이셉스 익스텐션", image: null, category: "팔" },
  { id: 27, name: "클로즈그립 벤치 프레스", image: null, category: "팔" },
  { id: 28, name: "프리처 컬", image: null, category: "팔" },

  // === 하체 ===
  { id: 29, name: "바벨 스쿼트", image: null, category: "하체" },
  { id: 30, name: "프론트 스쿼트", image: null, category: "하체" },
  { id: 31, name: "레그 프레스", image: null, category: "하체" },
  { id: 32, name: "레그 익스텐션", image: null, category: "하체" },
  { id: 33, name: "레그 컬", image: null, category: "하체" },
  { id: 34, name: "런지", image: null, category: "하체" },
  { id: 35, name: "힙 쓰러스트", image: null, category: "하체" },
  { id: 36, name: "카프 레이즈", image: null, category: "하체" },
];

export const categories = [...new Set(exercises.map((e) => e.category))];
