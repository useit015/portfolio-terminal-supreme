import { describe, expect, it } from 'vitest';
import { chooseLandingTheme, readLandingTheme, writeLandingTheme } from './theme-rotation';

const themes = ['dark', 'light', 'blue-matrix', 'espresso'];

describe('theme rotation', () => {
  it('chooses a valid landing theme different from the previous landing theme', () => {
    const next = chooseLandingTheme(themes, 'espresso', () => 0.99);

    expect(themes).toContain(next);
    expect(next).not.toBe('espresso');
  });

  it('falls back to the only available theme when no alternate exists', () => {
    expect(chooseLandingTheme(['espresso'], 'espresso', () => 0)).toBe('espresso');
  });

  it('persists only the last automatic landing theme', () => {
    const storage = new Map<string, string>();
    const localStorageLike = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    };

    writeLandingTheme(localStorageLike, 'gruvbox');

    expect(readLandingTheme(localStorageLike)).toBe('gruvbox');
  });
});
