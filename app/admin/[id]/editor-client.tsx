"use client";

import { useState } from "react";
import Link from "next/link";
import { Puck, type Data } from "@puckeditor/core";
import { config } from "@/puck/config";

export function EditorClient({
  itemId,
  title,
  initialData,
}: {
  itemId: number;
  title: string;
  initialData: Data;
}) {
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  async function handlePublish(data: Data) {
    await fetch(`/api/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layout: data }),
    });
    setSavedAt(new Date());
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "8px 16px",
          background: "#fffbe6",
          borderBottom: "1px solid #eee",
          fontSize: "0.85rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          <Link href="/admin">← {title}</Link> 편집 중 — 여기 헤더의{" "}
          <strong>Publish</strong> 버튼은 레이아웃 저장만 합니다. 실제 사이트
          공개 여부는 대시보드의 &quot;Published&quot; 체크박스로 따로
          켜야 합니다.
        </span>
        {savedAt ? <span>저장됨 {savedAt.toLocaleTimeString()}</span> : null}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Puck config={config} data={initialData} onPublish={handlePublish} />
      </div>
    </div>
  );
}
