import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LAST_LANDING_THEME_KEY } from '../../utils/theme-rotation';
import Portfolio from './Portfolio';

describe('Portfolio', () => {
  const storage = new Map<string, string>();

  beforeEach(() => {
    storage.clear();
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
        removeItem: (key: string) => storage.delete(key),
        clear: () => storage.clear(),
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    storage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('exposes premium navigation landmarks and labelled sections', () => {
    render(<Portfolio />);

    expect(screen.getByRole('navigation', { name: /portfolio navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('main', { name: /scrollable portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /about/i })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /selected work/i })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: /experience/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /skills/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /contact/i })).toBeInTheDocument();
    expect(screen.queryByText(/available for work/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /terminal/i }).length).toBeGreaterThanOrEqual(2);
  });

  it('links the theme toggle to its swatch panel and exposes status text', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.6);
    const user = userEvent.setup();
    render(<Portfolio />);

    const toggle = screen.getByRole('button', { name: /theme/i });
    expect(toggle).toHaveAttribute('aria-controls', 'theme-switcher-panel');
    expect(screen.getByText(/current theme/i)).toBeInTheDocument();

    await user.click(toggle);

    const panel = screen.getByRole('group', { name: /choose portfolio theme/i });
    expect(panel).toHaveAttribute('id', 'theme-switcher-panel');
    await waitFor(() => expect(screen.getByRole('button', { name: /gruvbox/i })).toHaveAttribute('aria-pressed', 'true'));
  });

  it('uses the pre-hydration landing theme without rotating a second time', async () => {
    window.localStorage.setItem(LAST_LANDING_THEME_KEY, 'blue-matrix');
    document.documentElement.setAttribute('data-theme', 'blue-matrix');
    vi.spyOn(Math, 'random').mockReturnValue(0.99);

    render(<Portfolio />);

    await waitFor(() => expect(document.documentElement).toHaveAttribute('data-theme', 'blue-matrix'));
    expect(window.localStorage.getItem(LAST_LANDING_THEME_KEY)).toBe('blue-matrix');
  });
});
