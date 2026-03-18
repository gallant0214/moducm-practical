"use client";

import { useState } from "react";
import { oralSports } from "@/data/oral";

export default function OralTab() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const currentSport = oralSports.find((s) => s.id === selectedSport);

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
        <p className="text-text-hint text-xs px-1 mb-3">
          종목을 선택하세요
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-text-disabled"
              >
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
      <div className="sticky top-[calc(env(safe-area-inset-top)+96px)] z-5 bg-background px-3 py-3 flex items-center gap-2">
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
