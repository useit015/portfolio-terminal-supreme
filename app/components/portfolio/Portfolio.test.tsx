import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Portfolio from './Portfolio';

describe('Portfolio', () => {
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
    const user = userEvent.setup();
    render(<Portfolio />);

    const toggle = screen.getByRole('button', { name: /theme/i });
    expect(toggle).toHaveAttribute('aria-controls', 'theme-switcher-panel');
    expect(screen.getByText(/current theme/i)).toBeInTheDocument();

    await user.click(toggle);

    const panel = screen.getByRole('group', { name: /choose portfolio theme/i });
    expect(panel).toHaveAttribute('id', 'theme-switcher-panel');
    expect(screen.getByRole('button', { name: /espresso/i })).toHaveAttribute('aria-pressed', 'true');
  });
});
