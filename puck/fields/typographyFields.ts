// Shared line-height / letter-spacing controls for text blocks. Letter
// spacing is in px (not em) — simpler for a plain number field, and
// predictable for someone used to px-based tracking in design tools.
export type TypographyProps = {
  lineHeight: number;
  letterSpacing: number;
};

export const typographyFields = {
  lineHeight: { type: "number", min: 0.8, max: 3, step: 0.1 } as const,
  letterSpacing: { type: "number", min: -10, max: 40, step: 0.5 } as const,
};

export function defaultTypographyProps(lineHeight: number): TypographyProps {
  return { lineHeight, letterSpacing: 0 };
}
