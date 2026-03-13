export type ThemeMode = "light" | "dark";
export type TextSizeMode = "small" | "medium" | "large";

export type AccountDraft = {
  fullName?: string;
  email?: string;
  studentId?: string;
  utorid?: string;
};

const THEME_KEY = "utransit.theme";
const TEXT_SIZE_KEY = "utransit.text_size";
const ACCOUNT_DRAFT_KEY = "utransit.account_draft";

export function loadThemeMode(): ThemeMode {
  const raw = localStorage.getItem(THEME_KEY);
  if (raw === "light" || raw === "dark") return raw;
  return "light";
}

export function saveThemeMode(mode: ThemeMode): void {
  localStorage.setItem(THEME_KEY, mode);
}

export function applyThemeMode(mode: ThemeMode): void {
  const root = document.documentElement;
  const isDark = mode === "dark";
  root.classList.toggle("dark", isDark);
}

export function loadTextSizeMode(): TextSizeMode {
  const raw = localStorage.getItem(TEXT_SIZE_KEY);
  if (raw === "small" || raw === "medium" || raw === "large") return raw;
  return "medium";
}

export function saveTextSizeMode(mode: TextSizeMode): void {
  localStorage.setItem(TEXT_SIZE_KEY, mode);
}

export function applyTextSizeMode(mode: TextSizeMode): void {
  const root = document.documentElement;
  const valueMap: Record<TextSizeMode, string> = {
    small: "15px",
    medium: "16px",
    large: "18px",
  };
  root.style.fontSize = valueMap[mode];
}

export function loadAccountDraft(): AccountDraft {
  const raw = localStorage.getItem(ACCOUNT_DRAFT_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as AccountDraft;
    return parsed ?? {};
  } catch {
    return {};
  }
}

export function saveAccountDraft(draft: AccountDraft): void {
  localStorage.setItem(ACCOUNT_DRAFT_KEY, JSON.stringify(draft));
}
