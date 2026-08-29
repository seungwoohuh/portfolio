// Builds a Google Fonts CSS2 stylesheet URL for one or more family names,
// requesting a spread of weights (400/500/600/700) so bold/medium text
// within richtext or headings actually has a matching weight to render.
export function googleFontsHref(families: (string | undefined)[]): string | null {
  const clean = Array.from(
    new Set(families.map((f) => f?.trim()).filter((f): f is string => !!f)),
  );
  if (clean.length === 0) return null;

  const params = clean
    .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@400;500;600;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
