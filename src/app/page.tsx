"use client";

import { useState } from "react";
import PracticalTab from "@/components/PracticalTab";
import OralTab from "@/components/OralTab";

type Tab = "practical" | "oral";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("practical");

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-surface border-b border-divider px-4 pt-[env(safe-area-inset-top)] pb-0">
        <h1 className="text-lg font-bold text-foreground py-3">
          실기 / 구술
        </h1>
        {/* 탭 */}
        <div className="flex gap-0">
          <button
            onClick={() => setActiveTab("practical")}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors relative ${
              activeTab === "practical"
                ? "text-primary"
                : "text-text-hint"
            }`}
          >
            실기
            {activeTab === "practical" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("oral")}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors relative ${
              activeTab === "oral"
                ? "text-primary"
                : "text-text-hint"
            }`}
          >
            구술
            {activeTab === "oral" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
            )}
          </button>
        </div>
      </header>

      {/* 콘텐츠 */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "practical" ? <PracticalTab /> : <OralTab />}
      </main>
    </div>
  );
}
