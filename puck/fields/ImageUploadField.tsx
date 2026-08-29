"use client";

import { useState } from "react";
import type { CustomFieldRender } from "@puckeditor/core";

// Puck's `custom` field contract: render({ value, onChange, ... }). This
// uploads directly to /api/upload (which is env-gated to non-production —
// see proxy.ts) and writes the returned Blob URL back into the field.
export const ImageUploadField: CustomFieldRender<string | undefined> = ({
  value,
  onChange,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) {
        throw new Error(`Upload failed (${res.status})`);
      }
      const data: { url: string } = await res.json();
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          style={{ maxWidth: "100%", borderRadius: 4 }}
        />
      ) : null}
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {uploading ? <span>업로드 중…</span> : null}
      {error ? <span style={{ color: "red" }}>{error}</span> : null}
      {value ? (
        <button type="button" onClick={() => onChange(undefined)}>
          이미지 제거
        </button>
      ) : null}
    </div>
  );
};
