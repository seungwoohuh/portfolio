import type { CSSProperties } from "react";
import { numberField } from "./NumberField";

// Shared padding/background controls mixed into most blocks' props/fields —
// avoids redefining the same two fields (and the div wrapper that applies
// them) in every block file.
export type StyleProps = {
  padding: number;
  background: string;
};

export const styleFields = {
  padding: numberField({ min: 0, max: 200 }),
  background: { type: "text" } as const,
};

export const defaultStyleProps: StyleProps = { padding: 0, background: "" };

export function styleWrapperCss(style: StyleProps): CSSProperties {
  return {
    padding: style.padding ? `${style.padding}px` : undefined,
    background: style.background || undefined,
  };
}
