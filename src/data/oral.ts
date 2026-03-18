// 구술 - 종목별 질의응답 데이터
// 새 종목/질문 추가 시 아래 형식에 맞춰 붙여넣기

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

export const oralSports: OralSport[] = [
  // === 여기에 종목별 데이터를 붙여넣으세요 ===
  // 예시 형식:
  // {
  //   id: "bodybuilding",
  //   name: "보디빌딩",
  //   questions: [
  //     { id: 1, question: "질문 내용", answer: "정답 내용" },
  //     { id: 2, question: "질문 내용", answer: "정답 내용" },
  //   ],
  // },
];
