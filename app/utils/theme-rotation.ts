export const LAST_LANDING_THEME_KEY = "portfolio-last-landing-theme";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function chooseLandingTheme(
  themeNames: readonly string[],
  previousTheme: string | null,
  random: () => number = Math.random,
): string {
  const candidates = previousTheme
    ? themeNames.filter((theme) => theme !== previousTheme)
    : [...themeNames];
  const pool = candidates.length > 0 ? candidates : [...themeNames];

  if (pool.length === 0) return "";

  const index = Math.min(pool.length - 1, Math.floor(random() * pool.length));
  return pool[index];
}

export function readLandingTheme(storage: StorageLike): string | null {
  try {
    return storage.getItem(LAST_LANDING_THEME_KEY);
  } catch {
    return null;
  }
}

export function writeLandingTheme(storage: StorageLike, themeName: string): void {
  try {
    storage.setItem(LAST_LANDING_THEME_KEY, themeName);
  } catch {}
}
