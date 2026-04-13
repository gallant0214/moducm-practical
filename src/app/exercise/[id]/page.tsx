"use client";

import { useParams, useRouter } from "next/navigation";
import { exercises } from "@/data/practical";

export default function ExerciseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const exercise = exercises.find((e) => e.id === id);

  const goBack = () => {
    router.push("/#bodybuilding");
  };

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh bg-background">
        <p className="text-text-hint">운동 정보를 찾을 수 없습니다.</p>
        <button
          onClick={goBack}
          className="mt-4 text-primary text-sm font-semibold"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* 상단 바 */}
      <header className="sticky top-0 z-30 bg-surface border-b border-divider px-4 pt-[env(safe-area-inset-top)] pb-0">
        <div className="flex items-center gap-2 py-3">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-primary text-sm font-semibold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            목록
          </button>
          <span className="text-divider-strong">|</span>
          <span className="text-sm font-bold text-foreground truncate">{exercise.name}</span>
          <span className="ml-auto shrink-0 px-2 py-[2px] rounded-full bg-tag-bg text-tag-text text-[11px] font-medium">
            {exercise.category}
          </span>
        </div>
      </header>

      <main className="flex-1 pb-8">
        {/* 운동 이미지 */}
        {(() => {
          const poseCategories = ["남자 보디빌딩", "남자 피지크", "클래식 보디빌딩", "남자 클래식 피지크", "남자 핏모델", "여자 피지크", "여자 보디피트니스", "여자 비키니", "여자 핏모델"];
          const isPose = poseCategories.includes(exercise.category);
          return (
        <div className={`w-full flex items-center justify-center ${isPose ? "bg-gradient-to-b from-slate-100 to-slate-200 py-4" : "bg-surface-variant"}`} style={{ minHeight: isPose ? "360px" : "220px" }}>
          {exercise.image ? (
            <img
              src={exercise.image}
              alt={exercise.name}
              className={isPose ? "max-h-[420px] object-contain drop-shadow-md" : "w-full max-h-[320px] object-contain"}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 py-12 text-text-disabled">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-sm">이미지 준비중</span>
            </div>
          )}
        </div>
          );
        })()}

        {/* 체크리스트 */}
        <div className="px-4 pt-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[13px] font-bold text-foreground">채점 체크리스트</span>
            <div className="flex-1 h-[1px] bg-divider" />
            {exercise.checklist && (
              <span className="text-[11px] text-text-hint">{exercise.checklist.length}항목</span>
            )}
          </div>

          {exercise.checklist && exercise.checklist.length > 0 ? (
            <div className="flex flex-col gap-3">
              {exercise.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-surface rounded-xl px-4 py-3.5"
                  style={{ boxShadow: "0 1px 3px var(--card-shadow)" }}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary mt-[1px]">
                    {idx + 1}
                  </span>
                  <p className="text-[14px] text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-hint text-sm text-center py-6">체크리스트 준비중입니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}
