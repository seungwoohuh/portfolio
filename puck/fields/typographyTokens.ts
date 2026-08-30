import type { CSSProperties } from "react";
import type { ObjectField } from "@puckeditor/core";
import { numberField } from "./NumberField";

// Page-wide typography "design tokens" — one font/color/size/line-height/
// letter-spacing set per text role (h1/h2/h3/body), configured once at the
// page root and consumed by every block instance via CSS custom properties.
// Individual blocks can still opt out per-instance (see overrideStyleFields)
// when one heading needs to look different from the rest.
export type TypographyToken = {
  font: string;
  color: string;
  size: number;
  lineHeight: number;
  letterSpacing: number;
};

export type TypographyRole = "h1" | "h2" | "h3" | "body";

export const defaultTypographyTokens: Record<TypographyRole, TypographyToken> = {
  h1: { font: "", color: "", size: 40, lineHeight: 1.2, letterSpacing: 0 },
  h2: { font: "", color: "", size: 32, lineHeight: 1.2, letterSpacing: 0 },
  h3: { font: "", color: "", size: 24, lineHeight: 1.2, letterSpacing: 0 },
  body: { font: "", color: "", size: 16, lineHeight: 1.6, letterSpacing: 0 },
};

export function typographyTokenField(label: string): ObjectField<TypographyToken> {
  return {
    type: "object",
    label,
    objectFields: {
      font: { type: "text", label: "폰트 (Google Fonts 이름)" },
      color: { type: "text", label: "색상" },
      size: numberField({ label: "크기 (px)", min: 8, max: 160 }),
      lineHeight: numberField({ label: "행간", min: 0.8, max: 3, step: 0.1 }),
      letterSpacing: numberField({
        label: "자간 (px)",
        min: -10,
        max: 40,
        step: 0.1,
      }),
    },
  };
}

// CSS custom properties for one role, e.g. role="h1" -> --h1-font, --h1-color, ...
export function tokenCssVars(role: TypographyRole, token: TypographyToken): CSSProperties {
  const t = { ...defaultTypographyTokens[role], ...token };
  return {
    [`--${role}-font`]: t.font ? `"${t.font}", sans-serif` : "inherit",
    [`--${role}-color`]: t.color || "inherit",
    [`--${role}-size`]: `${t.size}px`,
    [`--${role}-line-height`]: `${t.lineHeight}`,
    [`--${role}-letter-spacing`]: `${t.letterSpacing}px`,
  } as CSSProperties;
}

// Per-instance override toggle mixed into text blocks (Heading/Paragraph).
// When off (default), the block renders using the role's CSS vars so it
// stays in sync with the global typography settings. When on, the block's
// own color/size/lineHeight/letterSpacing fields take over.
export type StyleOverrideProps = {
  overrideStyle: boolean;
  color: string;
  size: number;
  lineHeight: number;
  letterSpacing: number;
};

export const overrideStyleFields = {
  overrideStyle: {
    type: "radio",
    label: "스타일",
    options: [
      { label: "전역 설정 따르기", value: false },
      { label: "이 요소만 다르게", value: true },
    ],
  },
  color: { type: "text", label: "색상 (개별 지정 시)" },
  size: numberField({ label: "크기 px (개별 지정 시)", min: 8, max: 160 }),
  lineHeight: numberField({
    label: "행간 (개별 지정 시)",
    min: 0.8,
    max: 3,
    step: 0.1,
  }),
  letterSpacing: numberField({
    label: "자간 px (개별 지정 시)",
    min: -10,
    max: 40,
    step: 0.1,
  }),
} as const;

export function defaultOverrideProps(size: number, lineHeight: number): StyleOverrideProps {
  return { overrideStyle: false, color: "", size, lineHeight, letterSpacing: 0 };
}

// Resolves the CSS for a text role given the per-instance override state —
// shared by HeadingBlock/ParagraphBlock so both honor the same on/off rule.
export function resolveTypographyCss(
  role: TypographyRole,
  override: StyleOverrideProps,
): CSSProperties {
  if (override.overrideStyle) {
    return {
      color: override.color || undefined,
      fontSize: `${override.size}px`,
      lineHeight: override.lineHeight,
      letterSpacing: `${override.letterSpacing}px`,
    };
  }
  return {
    fontFamily: `var(--${role}-font, inherit)`,
    color: `var(--${role}-color, inherit)`,
    fontSize: `var(--${role}-size)`,
    lineHeight: `var(--${role}-line-height)`,
    letterSpacing: `var(--${role}-letter-spacing)`,
  };
}
