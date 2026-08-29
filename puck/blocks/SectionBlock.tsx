import type { ComponentConfig, Slot } from "@puckeditor/core";

export type SectionBlockProps = {
  background: string;
  maxWidth: number;
  paddingY: number;
  gap: number;
  content: Slot;
};

// A full-bleed background band with a max-width, centered inner slot —
// the common "alternating section" pattern that neither Columns (no
// standalone background band) nor the page root (single, page-wide
// background) covers on its own.
export const SectionBlock: ComponentConfig<SectionBlockProps> = {
  fields: {
    background: { type: "text" },
    maxWidth: { type: "number", min: 320, max: 1600 },
    paddingY: { type: "number", min: 0, max: 200 },
    gap: { type: "number", label: "요소 간 자동 간격 (px)", min: 0, max: 160 },
    content: { type: "slot" },
  },
  defaultProps: {
    background: "",
    maxWidth: 960,
    paddingY: 48,
    gap: 0,
    content: [],
  },
  render: ({ background, maxWidth, paddingY, gap = 0, content: Content }) => (
    <div style={{ background: background || undefined }}>
      <div
        style={{
          maxWidth: `${maxWidth}px`,
          margin: "0 auto",
          padding: `${paddingY}px 24px`,
        }}
      >
        <Content style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }} />
      </div>
    </div>
  ),
};
