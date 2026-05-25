import type { CVDocument } from "@/types/cv";

// ── Font Family Mapping ──
// @react-pdf/renderer has built-in: Helvetica, Times-Roman, Courier
const FONT_FAMILY_MAP: Record<string, string> = {
  sans: "Helvetica",
  serif: "Times-Roman",
  mono: "Courier",
};

// ── Font Size Scales ──
const FONT_SIZE_SCALES = {
  sm: {
    headerName: 26,
    headerRole: 13,
    sectionTitle: 10,
    normal: 8.5,
    small: 7.5,
    subheading: 9.5,
  },
  md: {
    headerName: 32,
    headerRole: 16,
    sectionTitle: 12,
    normal: 10,
    small: 9,
    subheading: 11,
  },
  lg: {
    headerName: 38,
    headerRole: 19,
    sectionTitle: 14,
    normal: 11.5,
    small: 10.5,
    subheading: 12.5,
  },
} as const;

// ── Spacing Scales ──
const SPACING_SCALES = {
  compact: {
    sectionGap: 10,
    itemGap: 6,
    headerPadding: 10,
    pageMargin: 30,
  },
  normal: {
    sectionGap: 15,
    itemGap: 10,
    headerPadding: 15,
    pageMargin: 40,
  },
  relaxed: {
    sectionGap: 22,
    itemGap: 14,
    headerPadding: 20,
    pageMargin: 50,
  },
} as const;

// ── Static fallback (for backward compat) ──
export const PDF_STYLES = {
  fontSize: FONT_SIZE_SCALES.md,
  spacing: SPACING_SCALES.normal,
  colors: {
    muted: "#666",
    border: "#ccc",
  },
};

export interface FontSizeScale {
  headerName: number;
  headerRole: number;
  sectionTitle: number;
  normal: number;
  small: number;
  subheading: number;
}

export interface SpacingScale {
  sectionGap: number;
  itemGap: number;
  headerPadding: number;
  pageMargin: number;
}

// ── Design Token Resolver ──
export interface ResolvedDesignTokens {
  fontFamily: string;
  fontSize: FontSizeScale;
  spacing: SpacingScale;
  primaryColor: string;
  colors: {
    muted: string;
    border: string;
    lightBorder: string; // primaryColor at ~12% opacity (hex approximation)
    text: string;
    subtleText: string;
  };
}

/**
 * Converts CVDocument.settings.design into concrete values
 * that every PDF template can consume directly.
 */
export function resolveDesignTokens(
  design: CVDocument["settings"]["design"],
): ResolvedDesignTokens {
  const fontFamily = FONT_FAMILY_MAP[design.fontFamily] || "Helvetica";
  const fontSize = FONT_SIZE_SCALES[design.fontSize] || FONT_SIZE_SCALES.md;
  const spacing = SPACING_SCALES[design.spacing] || SPACING_SCALES.normal;
  const primaryColor = design.primaryColor || "#000000";

  // Build a faint version of the primary color for subtle borders.
  // @react-pdf doesn't support opacity, so we approximate by mixing with white.
  const lightBorder = `${primaryColor}20`; // works in many PDF renderers as hex+alpha

  return {
    fontFamily,
    fontSize,
    spacing,
    primaryColor,
    colors: {
      muted: "#666666",
      border: "#cccccc",
      lightBorder,
      text: "#000000",
      subtleText: "#999999",
    },
  };
}
