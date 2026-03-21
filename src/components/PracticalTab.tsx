"use client";

import { useState } from "react";
import { exercises, categories } from "@/data/practical";

export default function PracticalTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const allCategories = ["전체", ...categories];

  const filtered =
    selectedCategory === "전체"
      ? exercises
      : exercises.filter((e) => e.category === selectedCategory);

  return (
    <div className="pb-6">
      {/* 부위 필터 */}
      <div className="sticky top-[calc(env(safe-area-inset-top)+96px)] z-20 bg-background px-3 py-3 shadow-sm" style={{ boxShadow: "0 2px 8px var(--card-shadow)" }}>
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

      {/* 운동 동작 그리드 */}
      <div className="px-3 grid grid-cols-2 gap-3">
        {filtered.map((exercise) => (
          <a
            key={exercise.id}
            href={exercise.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface rounded-xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform block"
            style={{ boxShadow: "0 1px 3px var(--card-shadow)" }}
          >
            {/* 이미지 영역 */}
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
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="text-[10px]">이미지 준비중</span>
                </div>
              )}
            </div>
            {/* 동작 이름 */}
            <div className="px-3 py-2.5">
              <p className="text-[12px] font-bold text-foreground leading-tight line-clamp-2">
                {exercise.name}
              </p>
              <span className="inline-block mt-1 px-2 py-[1px] rounded-full bg-tag-bg text-tag-text text-[10px] font-medium">
                {exercise.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
