"use client";

import { useState } from "react";
import { oralSports, type OralSport } from "@/data/oral";

// 공통 3개 항목 (도핑/응급처치/성폭력·인권)을 전체 종목에서 추출 후 중복 제거
function getCommonSections(): OralSport[] {
  // 모든 종목에서 카테고리별 문항 수집
  const allByCategory: Record<string, { question: string; answer: string }[]> = {
    "도핑": [],
    "응급처치": [],
    "인권·성폭력": [],
  };

  for (const sport of oralSports) {
    for (const q of sport.questions) {
      if (q.category && allByCategory[q.category]) {
        allByCategory[q.category].push({ question: q.question, answer: q.answer });
      }
    }
  }

  // 중복 제거 (question 기준)
  const dedup = (qs: { question: string; answer: string }[]) => {
    const seen = new Set<string>();
    return qs.filter((q) => {
      if (seen.has(q.question)) return false;
      seen.add(q.question);
      return true;
    });
  };

  const strip = (qs: { question: string; answer: string }[]) =>
    dedup(qs).map((q, i) => ({ id: i + 1, question: q.question, answer: q.answer }));

  // 생활체육 공통 문항 (직접 정의)
  const lifeSportsQs = [
    { id: 1, question: "생활체육의 정의를 설명하시오.", answer: "생활체육이란 일상생활에서 여가시간을 활용하여 남녀노소 누구나 즐길 수 있는 체육활동을 말합니다. 엘리트 스포츠와 달리 승리보다는 참여와 즐거움, 건강 증진에 초점을 맞추며, 평생에 걸쳐 지속 가능한 스포츠 문화를 만드는 것이 핵심 목적입니다." },
    { id: 2, question: "생활체육(프로그램)의 구성요인을 말하시오.", answer: "생활체육 프로그램의 구성요인은 ① 참가자, ② 지도자, ③ 시설, ④ 프로그램, ⑤ 재정, ⑥ 안정성의 6가지입니다. 이 요소들이 균형 있게 갖춰져야 효과적인 생활체육 프로그램을 운영할 수 있습니다." },
    { id: 3, question: "생활체육 프로그램의 고려사항(주의사항)을 설명하시오.", answer: "생활체육 프로그램 구성 시에는 프로그램의 ① 목적, ② 목표, ③ 철학, ④ 세부운영사항, ⑤ 평가계획, ⑥ 개선계획을 고려해야 합니다. 참여자의 특성과 요구를 반영하고 체계적으로 계획·실행·평가하는 것이 중요합니다." },
    { id: 4, question: "생활체육 프로그램의 계획과정을 설명하시오.", answer: "생활체육 프로그램의 계획과정은 프로그램 목적이해 → 욕구조사 → 목표설정 → 계획수립 → 실행 → 평가 → 보완의 순서로 진행됩니다. 각 단계를 체계적으로 수행하여 참여자의 만족도와 프로그램의 효과를 높여야 합니다." },
    { id: 5, question: "생활체육 프로그램의 구성원리(계획원리)를 설명하시오.", answer: "생활체육 프로그램의 구성원리에는 ① 평가성: 프로그램을 평가할 수 있어야 하고, ② 전문성: 전문적인 내용을 담아야 하며, ③ 다양성: 다양한 운동을 포함해야 하고, ④ 개별성: 개별의 목적에 맞게 구성해야 하며, ⑤ 목적성: 명확한 목적이 있어야 하고, ⑥ 창조성: 창의적으로 구성할 수 있어야 합니다." },
    { id: 6, question: "생활체육의 기능 3가지를 설명하시오.", answer: "① 생리적 기능: 신체활동을 통한 건강과 체력증진, 근육량과 기초대사량 증가로 인한 비만과 같은 성인병 예방. ② 심리적 기능: 신체발달을 통한 자신감 상승, 스트레스 해소, 소속감 유발. ③ 사회적 기능: 사회의 생활원리와 조화를 이루어 살아가도록 사회화시키고, 이질적인 개인유기체를 공동체로 화합시키는 기능." },
    { id: 7, question: "생활체육의 필요성을 설명하시오.", answer: "① 주 5일제 등의 근로시간 단축으로 건전한 여가시간 활용이 필요합니다. ② 현대인의 고질적인 운동부족으로 사회구성원 전반의 체력이 저하되고 있습니다. ③ 엘리트체육에서 벗어나 국민 건강 유지를 위한 평생체육의 필요성이 대두되었습니다. ④ 스트레스와 우울감 같은 부정적 감정을 효과적으로 해소할 장치가 필요합니다. ⑤ 현대 사회의 개별화로 인한 공동체 의식이 약화되었습니다." },
    { id: 8, question: "생활체육 지도자의 자질을 설명하시오.", answer: "생활체육 지도자의 자질에는 ① 의사전달능력, ② 활달하고 강인한 성격, ③ 투철한 사명감, ④ 도덕적품성, ⑤ 칭찬의 미덕, ⑥ 공정성이 필요합니다. 참여자에게 신뢰를 주고 효과적으로 지도할 수 있는 인격적 소양을 갖추어야 합니다." },
    { id: 9, question: "생활체육 지도자의 역할을 설명하시오.", answer: "① 참가자의 욕구, 체력, 연령 등 개인별 특이성을 고려하여 지도합니다. ② 새롭고 효과적인 프로그램을 개발하여 참가자의 자발적인 참여와 흥미를 유도합니다. ③ 개인 및 집단을 대표하여 목표를 설정하고 동기부여, 평가를 돕습니다. ④ 안전사고를 예방하고 시설물 관리를 책임집니다." },
    { id: 10, question: "생활체육 지도자의 기능을 설명하시오.", answer: "생활체육 지도자의 기능은 체육활동을 조직하고 목표와 달성 방법을 제시하며 평가를 하고, 그 외에 동기를 부여하고 긍정적 분위기를 조성하며 동료의식을 강화시키는 기능을 합니다. (★생활체육의 기능과 분리하여 암기)" },
    { id: 11, question: "생활체육 지도의 원리를 설명하시오.", answer: "① 목적의 원리: 목적과 목표 설정 후 동기부여. ② 개성화의 원리: 참가자의 욕구나 참가자 간의 개인차를 고려하여 지도. ③ 창조의 원리: 창조적인 체육활동을 도모. ④ 계통성의 원리: 일정한 체계를 인지하고 통일되도록 훈련. ⑤ 평가의 원리: 지도 결과를 평가하여 참가자가 인지할 수 있도록 한다. ⑥ 사회화의 원리: 유대를 형성하여 집단생활을 배우도록 한다. ⑦ 자발성의 원리: 참가자들이 자발적으로 참여할 수 있도록 유도한다. ⑧ 요약 전달의 원리: 참가자에게 다양한 관련 정보를 전달해야 한다." },
    { id: 12, question: "생활체육 지도의 목표를 설명하시오.", answer: "생활체육 지도의 목표는 '기·운·의·합·조' 5가지입니다. ① 기: 기분전환과 즐거움을 통해 건전한 여가시간을 누리게 함. ② 운: 운동으로 체력을 증진시키고 건강유지에 힘씀. ③ 의: 의사전달능력과 독립심을 배양시킴. ④ 합: 협동성, 준법정신, 책임감을 배양하고 공동체 의식을 증진시킴. ⑤ 조: 조화로운 신체적, 정신적, 사회적 발달을 꾀함." },
    { id: 13, question: "생활체육 지도자가 유의할 점을 설명하시오.", answer: "시간을 지키고 복장에 유의하며 개인의 특성을 파악하여 훈련계획표를 지참하고 연습계획을 알고 있으며 칭찬과 질책을 분배하고 모든선수를 평등하게 대하며 긍정적인 대화와 적절한 언어를 사용한다." },
    { id: 14, question: "트레이닝 5가지 원리를 설명하시오.", answer: "① 과부하의 원리: 현재 수준보다 강한 자극을 주어야 체력이 향상됩니다. ② 점진성의 원리: 운동 강도를 서서히 단계적으로 증가시켜야 합니다. ③ 반복성의 원리: 꾸준한 반복을 통해 운동 효과가 나타납니다. ④ 개별성의 원리: 개인의 체력 수준과 목표에 맞는 프로그램이 필요합니다. ⑤ 특이성의 원리: 훈련한 부위와 방식에 맞는 적응이 일어납니다. (※ 다양성의 원리를 포함하여 6가지로 구분하기도 합니다.)" },
  ];

  return [
    { id: "_common_lifesports", name: "생활체육 (공통)", questions: lifeSportsQs },
    { id: "_common_doping", name: "도핑 (공통)", questions: strip(allByCategory["도핑"]) },
    { id: "_common_firstaid", name: "응급처치 (공통)", questions: strip(allByCategory["응급처치"]) },
    { id: "_common_rights", name: "성폭력·인권 (공통)", questions: strip(allByCategory["인권·성폭력"]) },
  ];
}

const commonSections = getCommonSections();

export default function OralTab() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const allItems = [...commonSections, ...oralSports];
  const currentSport = allItems.find((s) => s.id === selectedSport);

  const toggleQuestion = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  // 종목이 없을 때
  if (oralSports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="text-text-disabled mb-3">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <p className="text-text-hint text-sm">
          아직 등록된 종목이 없습니다
        </p>
        <p className="text-text-disabled text-xs mt-1">
          oral.ts 파일에 종목 데이터를 추가해주세요
        </p>
      </div>
    );
  }

  // 종목 선택 화면
  if (!selectedSport) {
    return (
      <div className="px-3 py-4">
        {/* 공통 영역 (상단 고정) */}
        <p className="text-text-hint text-xs px-1 mb-2 font-bold">
          공통 영역
        </p>
        <div className="flex flex-col gap-2 mb-5">
          {commonSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setSelectedSport(section.id);
                setOpenQuestionId(null);
              }}
              className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3.5 active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">
                    {section.name.includes("생활") ? "L" : section.name.includes("도핑") ? "D" : section.name.includes("응급") ? "F" : "H"}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-bold text-foreground">
                    {section.name}
                  </p>
                  <p className="text-[11px] text-text-hint mt-[1px]">
                    {section.questions.length}개 문항
                  </p>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-disabled">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>

        {/* 종목별 */}
        <p className="text-text-hint text-xs px-1 mb-2 font-bold">
          종목 선택
        </p>
        <div className="flex flex-col gap-2">
          {oralSports.map((sport) => (
            <button
              key={sport.id}
              onClick={() => {
                setSelectedSport(sport.id);
                setOpenQuestionId(null);
              }}
              className="flex items-center justify-between bg-surface rounded-xl px-4 py-4 active:scale-[0.98] transition-transform"
              style={{ boxShadow: "0 1px 3px var(--card-shadow)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {sport.name.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-bold text-foreground">
                    {sport.name}
                  </p>
                  <p className="text-[11px] text-text-hint mt-[2px]">
                    {sport.questions.length}개 문항
                  </p>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-disabled">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 질문 목록 화면
  return (
    <div className="pb-6">
      {/* 뒤로가기 + 종목 이름 */}
      <div className="sticky top-0 z-10 bg-background border-b border-divider px-3 py-3 flex items-center gap-2">
        <button
          onClick={() => setSelectedSport(null)}
          className="flex items-center gap-1 text-primary text-sm font-semibold"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          종목 목록
        </button>
        <span className="text-divider-strong">|</span>
        <span className="text-sm font-bold text-foreground">
          {currentSport?.name}
        </span>
        <span className="ml-auto text-[11px] text-text-hint">
          {currentSport?.questions.length}문항
        </span>
      </div>

      {/* Q&A 카드 목록 */}
      <div className="px-3 flex flex-col gap-2">
        {currentSport?.questions.map((q, idx) => {
          // Show category section header when category changes
          const prevQ = idx > 0 ? currentSport.questions[idx - 1] : null;
          const showCategoryHeader = q.category && (!prevQ || prevQ.category !== q.category);

          return (
          <div key={q.id}>
            {showCategoryHeader && (
              <div className="flex items-center gap-2 mt-4 mb-2 px-1">
                <span className="text-[11px] font-bold text-on-primary bg-primary/80 px-2 py-[2px] rounded-full">
                  공통
                </span>
                <span className="text-[12px] font-bold text-text-secondary">
                  {q.category}
                </span>
                <div className="flex-1 h-[1px] bg-divider" />
              </div>
            )}
          <div
            className="bg-surface rounded-xl overflow-hidden transition-all"
            style={{ boxShadow: "0 1px 3px var(--card-shadow)" }}
          >
            {/* 질문 */}
            <button
              onClick={() => toggleQuestion(q.id)}
              className="w-full text-left px-4 py-4 flex items-start gap-3 active:bg-surface-variant/50 transition-colors"
            >
              <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold mt-[1px] ${
                q.category ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
              }`}>
                {idx + 1}
              </span>
              <div className="flex-1">
                {q.category && (
                  <span className="inline-block text-[10px] font-medium text-text-hint bg-tag-bg px-[6px] py-[1px] rounded mb-1">
                    {q.category}
                  </span>
                )}
                <p className="text-[14px] font-semibold text-foreground leading-relaxed">
                  {q.question}
                </p>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 text-text-disabled mt-[2px] transition-transform ${
                  openQuestionId === q.id ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* 정답 (토글) */}
            {openQuestionId === q.id && (
              <div className="px-4 pb-4 pt-0">
                <div className="border-t border-divider pt-3 ml-9">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[11px] font-bold text-primary">
                      A.
                    </span>
                    <span className="text-[11px] font-semibold text-primary">
                      정답
                    </span>
                  </div>
                  <p className="text-[13px] text-text-secondary leading-relaxed whitespace-pre-line">
                    {q.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
