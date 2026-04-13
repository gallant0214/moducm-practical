"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { exercises, categories } from "@/data/practical";
import { practicalSports, type PracticalSport } from "@/data/practical_sports";

// 보디빌딩 상세 뷰 (기존 운동 그리드)
function BodybuildingView({ onBack }: { onBack: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const allCategories = ["전체", ...categories];

  const filtered =
    selectedCategory === "전체"
      ? exercises
      : exercises.filter((e) => e.category === selectedCategory);

  return (
    <div className="pb-6">
      {/* 헤더 + 부위 필터 (함께 sticky) */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="border-b border-divider px-3 py-3 flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-primary text-sm font-semibold py-1 px-1 -ml-1 active:opacity-70 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            종목 목록
          </button>
          <span className="text-divider-strong">|</span>
          <span className="text-sm font-bold text-foreground">보디빌딩</span>
        </div>
        <div className="px-3 py-3" style={{ boxShadow: "0 2px 8px var(--card-shadow)" }}>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {allCategories.map((cat) => {
            const count = cat === "전체" ? exercises.length : exercises.filter(e => e.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-[6px] rounded-full text-[13px] font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-on-primary"
                    : "bg-surface-variant text-text-secondary"
                }`}
              >
                {cat} <span className="text-[11px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
        </div>
      </div>

      {/* 핏모델 안내 문구 */}
      {(selectedCategory === "남자 핏모델" || selectedCategory === "여자 핏모델") && (
        <div className="mx-3 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-[12px] text-amber-700 font-medium text-center">
            시험에 출제되는 종목은 아닙니다. 신설 종목으로 참고용입니다.
          </p>
        </div>
      )}

      {/* 운동 동작 / 포즈 그리드 */}
      {(() => {
        const poseCategories = ["남자 보디빌딩", "남자 피지크", "클래식 보디빌딩", "남자 클래식 피지크", "남자 핏모델", "여자 피지크", "여자 보디피트니스", "여자 비키니", "여자 핏모델"];
        const isPose = poseCategories.includes(selectedCategory);

        if (isPose) {
          return (
            <div className="relative z-0 px-3 pt-3 grid grid-cols-2 gap-3">
              {filtered.map((exercise) => (
                <Link
                  key={exercise.id}
                  href={`/exercise/${exercise.id}`}
                  className="bg-surface rounded-2xl overflow-hidden active:scale-[0.97] transition-transform block border border-divider/50"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                >
                  <div className="aspect-[3/4] bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center relative p-2">
                    {exercise.image ? (
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="w-full h-full object-contain drop-shadow-sm"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-text-disabled">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span className="text-[10px]">이미지 준비중</span>
                      </div>
                    )}
                  </div>
                  <div className="px-3 py-3 bg-surface">
                    <p className="text-[13px] font-bold text-foreground leading-snug line-clamp-2 text-center">
                      {exercise.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          );
        }

        return (
          <div className="relative z-0 px-3 pt-3 grid grid-cols-2 gap-3">
            {filtered.map((exercise) => (
              <Link
                key={exercise.id}
                href={`/exercise/${exercise.id}`}
                className="bg-surface rounded-xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform block"
                style={{ boxShadow: "0 1px 3px var(--card-shadow)" }}
              >
                <div className="aspect-[3/2] bg-surface-variant flex items-center justify-center relative">
                  {exercise.image ? (
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-text-disabled">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span className="text-[10px]">이미지 준비중</span>
                    </div>
                  )}
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-[12px] font-bold text-foreground leading-tight line-clamp-2">
                    {exercise.name}
                  </p>
                  <span className="inline-block mt-1 px-2 py-[1px] rounded-full bg-tag-bg text-tag-text text-[10px] font-medium">
                    {exercise.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

// 일반 종목 실기 상세 뷰 (카드형 평가항목)
function SportPracticalView({ sport, onBack }: { sport: PracticalSport; onBack: () => void }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="pb-6">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-background border-b border-divider px-3 py-3 flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-primary text-sm font-semibold py-1 px-1 -ml-1 active:opacity-70 transition-opacity"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          종목 목록
        </button>
        <span className="text-divider-strong">|</span>
        <span className="text-sm font-bold text-foreground">{sport.name} 실기</span>
      </div>

      {/* 섹션별 카드 */}
      <div className="px-3 pt-4 flex flex-col gap-5">
        {sport.sections.map((section, sIdx) => (
          <div key={sIdx}>
            {/* 섹션 제목 */}
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="text-[13px] font-bold text-foreground">{section.title}</span>
              {section.points && (
                <span className="text-[11px] font-bold text-on-primary bg-primary px-2 py-[2px] rounded-full">
                  {section.points}
                </span>
              )}
              <div className="flex-1 h-[1px] bg-divider" />
            </div>

            {/* 항목 카드들 */}
            <div className="flex flex-col gap-2">
              {section.items.map((item, iIdx) => {
                const key = `${sIdx}-${iIdx}`;
                const isOpen = openItem === key;
                const hasDetail = !!item.detail || !!item.deduction;

                return (
                  <div
                    key={iIdx}
                    className="bg-surface rounded-xl overflow-hidden transition-all"
                    style={{ boxShadow: "0 1px 3px var(--card-shadow)" }}
                  >
                    <button
                      onClick={() => hasDetail && setOpenItem(isOpen ? null : key)}
                      className={`w-full text-left px-4 py-3.5 flex items-start gap-3 ${hasDetail ? "active:bg-surface-variant/50" : ""} transition-colors`}
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary mt-[1px]">
                        {iIdx + 1}
                      </span>
                      <span className="flex-1 text-[14px] font-semibold text-foreground leading-snug">
                        {item.label}
                      </span>
                      {hasDetail && (
                        <svg
                          width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2"
                          className={`shrink-0 text-text-disabled mt-[2px] transition-transform ${isOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      )}
                    </button>

                    {isOpen && hasDetail && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="border-t border-divider pt-3 ml-9 flex flex-col gap-2">
                          {item.detail && (
                            <p className="text-[13px] text-text-secondary leading-relaxed whitespace-pre-line">
                              {item.detail}
                            </p>
                          )}
                          {item.deduction && (
                            <div className="flex items-start gap-1.5 mt-1">
                              <span className="shrink-0 text-[10px] font-bold text-red-500 bg-red-50 px-[6px] py-[2px] rounded mt-[1px]">
                                감점
                              </span>
                              <p className="text-[12px] text-red-600 leading-relaxed">
                                {item.deduction}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 종목 선택 화면
export default function PracticalTab() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  // URL 해시에서 종목 상태 복원 (뒤로가기 시 유지)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setSelectedSport(hash);

    const onHashChange = () => {
      const h = window.location.hash.replace("#", "");
      setSelectedSport(h || null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const selectSport = (id: string) => {
    setSelectedSport(id);
    window.location.hash = id;
  };

  const goBack = () => {
    setSelectedSport(null);
    history.pushState(null, "", window.location.pathname + window.location.search);
  };

  // 보디빌딩 선택
  if (selectedSport === "bodybuilding") {
    return <BodybuildingView onBack={goBack} />;
  }

  // 기타 종목 선택
  const sport = practicalSports.find((s) => s.id === selectedSport);
  if (sport) {
    return <SportPracticalView sport={sport} onBack={goBack} />;
  }

  // 종목 선택 화면
  return (
    <div className="px-3 py-4">
      {/* 보디빌딩 최우선 */}
      <p className="text-text-hint text-xs px-1 mb-2 font-bold">보디빌딩</p>
      <button
        onClick={() => selectSport("bodybuilding")}
        className="w-full flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-4 mb-5 active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">보</span>
          </div>
          <div className="text-left">
            <p className="text-[15px] font-bold text-foreground">보디빌딩</p>
            <p className="text-[11px] text-text-hint mt-[2px]">{exercises.length}개 동작</p>
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-disabled">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* 나머지 종목 */}
      <p className="text-text-hint text-xs px-1 mb-2 font-bold">종목 선택</p>
      <div className="flex flex-col gap-2">
        {practicalSports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => selectSport(sport.id)}
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
                <p className="text-[15px] font-bold text-foreground">{sport.name}</p>
                <p className="text-[11px] text-text-hint mt-[2px]">
                  {sport.sections.reduce((acc, s) => acc + s.items.length, 0)}개 평가항목
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
