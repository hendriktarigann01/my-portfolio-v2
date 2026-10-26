export const ACCENT_COLOR = "var(--accent)";
export const ACCENT_RGB = "239, 209, 195";

export const rgbaAccent = (opacity: number): string =>
  `rgba(var(--accent-rgb), ${opacity})`;
