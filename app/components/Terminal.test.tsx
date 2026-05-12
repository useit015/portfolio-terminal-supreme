import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AppShell from './AppShell';

const renderTerminal = () => {
  const user = userEvent.setup();
  const view = render(<AppShell />);
  const input = screen.getByTitle('terminal-input');

  return { user, input, ...view };
};

const setScrollMetrics = ({
  scrollElement,
  clientHeight,
  scrollHeight,
  scrollTop,
}: {
  scrollElement: HTMLElement;
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}) => {
  let currentScrollTop = scrollTop;
  const currentScrollHeight = scrollHeight;

  Object.defineProperty(scrollElement, 'clientHeight', {
    configurable: true,
    value: clientHeight,
  });

  Object.defineProperty(scrollElement, 'scrollHeight', {
    configurable: true,
    get: () => currentScrollHeight,
  });

  Object.defineProperty(scrollElement, 'scrollTop', {
    configurable: true,
    get: () => currentScrollTop,
    set: (value: number) => {
      currentScrollTop = value;
    },
  });

  return {
    getScrollTop: () => currentScrollTop,
  };
};

describe('Terminal', () => {
  beforeEach(() => {
    vi.stubGlobal('open', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the welcome command by default without the old live navbar badge', () => {
    renderTerminal();

    expect(screen.getByTestId('welcome')).toBeInTheDocument();
    expect(screen.getByText(/Version 1.1.0/i)).toBeInTheDocument();
    expect(screen.getByText(/Try `ls`, `tree`, `cat source`, or `grep react`/i)).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: /terminal session is live/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/^live$/i)).not.toBeInTheDocument();
  });

  it('renders the expanded public command surface', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'help{enter}');
    expect(await screen.findByTestId('help')).toBeInTheDocument();
    expect(screen.queryByText(/souk/i)).not.toBeInTheDocument();

    await user.type(input, 'now{enter}');
    expect(await screen.findByTestId('now')).toBeInTheDocument();

    await user.type(input, 'values{enter}');
    expect(await screen.findByTestId('values')).toBeInTheDocument();

    await user.type(input, 'stats{enter}');
    expect(await screen.findByTestId('stats')).toBeInTheDocument();

    await user.type(input, 'cat source{enter}');
    expect(await screen.findByTestId('source-of-truth')).toHaveTextContent(
      'Evidence-backed'
    );

    await user.type(input, 'skills{enter}');
    expect(await screen.findByTestId('skills')).toBeInTheDocument();

    await user.type(input, 'experience{enter}');
    expect(await screen.findByTestId('experience')).toBeInTheDocument();

    await user.type(input, 'lab{enter}');
    expect(await screen.findByTestId('lab')).toBeInTheDocument();

    await user.type(input, 'tree{enter}');
    expect(await screen.findByTestId('tree-output')).toBeInTheDocument();

    await user.type(input, 'ls{enter}');
    expect(await screen.findByTestId('ls-output')).toHaveTextContent('projects/');
  });

  it('supports filesystem-style navigation and content lookup', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'cd projects{enter}');
    expect(screen.getByText(/Path: ~\/projects/i)).toBeInTheDocument();

    await user.type(input, 'pwd{enter}');
    expect(await screen.findByTestId('pwd-output')).toHaveTextContent(
      '/home/oussama/portfolio/projects'
    );

    await user.type(input, 'ls{enter}');
    expect(await screen.findByTestId('ls-output')).toHaveTextContent('whichmodel');

    await user.type(input, 'cat whichmodel{enter}');
    expect(await screen.findByTestId('project-1')).toBeInTheDocument();

    await user.type(input, 'cd ..{enter}');
    expect(screen.getByText(/^Path: ~$/i)).toBeInTheDocument();

    await user.type(input, 'cat about{enter}');
    expect(await screen.findByTestId('about')).toBeInTheDocument();
  });

  it('renders search, manual pages, and hinted commands', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'grep react{enter}');
    expect(await screen.findByTestId('grep-output')).toHaveTextContent('projects');

    await user.type(input, 'man cd{enter}');
    expect(await screen.findByTestId('man-output')).toHaveTextContent('cd <path>');

    await user.type(input, '42{enter}');
    expect(await screen.findByTestId('42-output')).toBeInTheDocument();

    await user.type(input, 'morocco{enter}');
    expect(await screen.findByTestId('morocco-output')).toBeInTheDocument();

    await user.type(input, 'sudo hire-me{enter}');
    expect(await screen.findByTestId('sudo-output')).toHaveTextContent(
      'useit015@gmail.com'
    );
  });

  it('runs redirect-style commands', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'email{enter}');
    expect(window.open).toHaveBeenCalledWith('mailto:useit015@gmail.com', '_self');
    expect(await screen.findByTestId('email-output')).toHaveTextContent(
      'useit015@gmail.com'
    );

    await user.type(input, 'gui{enter}');
    expect(window.open).toHaveBeenCalledWith('/', '_self');

    await user.type(input, 'projects go 1{enter}');
    expect(window.open).toHaveBeenCalledWith(
      'https://github.com/useit015/whichmodel',
      '_blank',
      'noopener,noreferrer'
    );

    await user.type(input, 'socials go 1{enter}');
    expect(window.open).toHaveBeenLastCalledWith(
      'https://github.com/useit015',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('supports autocomplete while keeping hidden commands hidden', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'sk');
    await user.tab();
    expect(input).toHaveValue('skills');

    await user.keyboard('{Escape}');
    await user.type(input, 'su');
    await user.tab();
    expect(input).toHaveValue('sudo');

    await user.keyboard(' ');
    await user.tab();
    expect(input).toHaveValue('sudo hire-me');

    await user.keyboard('{Escape}');
    await user.type(input, 're');
    await user.tab();
    expect(input).toHaveValue('resume');

    await user.keyboard('{Escape}');
    await user.type(input, 'cd pr');
    await user.tab();
    expect(input).toHaveValue('cd projects');

    await user.clear(input);
    await user.type(input, 'themes set gr');
    await user.tab();
    expect(input).toHaveValue('themes set gruvbox');
  });

  it('preserves draft input while navigating command history', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'about{enter}');
    await user.type(input, 'whoami{enter}');
    await user.type(input, 'draft');

    await user.keyboard('{ArrowUp}');
    expect(input).toHaveValue('whoami');

    await user.keyboard('{ArrowUp}');
    expect(input).toHaveValue('about');

    await user.keyboard('{ArrowDown}');
    expect(input).toHaveValue('whoami');

    await user.keyboard('{ArrowDown}');
    expect(input).toHaveValue('draft');
  });

  it('clears the terminal with Ctrl+L', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'about{enter}');
    expect(await screen.findByTestId('about')).toBeInTheDocument();

    await user.keyboard('{Control>}l{/Control}');

    expect(screen.queryByTestId('about')).not.toBeInTheDocument();
    expect(screen.queryByTestId('welcome')).not.toBeInTheDocument();
  });

  it('lists the curated theme presets', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'themes{enter}');

    expect(await screen.findByTestId('themes')).toBeInTheDocument();
    expect(screen.getByText('gruvbox')).toBeInTheDocument();
    expect(screen.getByText('material-palenight')).toBeInTheDocument();
    expect(screen.getByText('atom-one-dark')).toBeInTheDocument();
  });

  it('switches the active theme tokens across the full shell palette', async () => {
    const { user, input } = renderTerminal();

    await user.type(input, 'themes set gruvbox{enter}');

    const shell = screen.getByTestId('app-shell');

    expect(shell.style.getPropertyValue('--bg-color')).toBe('#282828');
    expect(shell.style.getPropertyValue('--page-glow')).toBe(
      'rgba(250, 189, 47, 0.14)'
    );
    expect(shell.style.getPropertyValue('--chrome-close')).toBe('#fb4934');
    expect(document.documentElement.style.getPropertyValue('--bg-color')).toBe(
      '#282828'
    );
    expect(document.documentElement.style.getPropertyValue('--page-glow')).toBe(
      'rgba(250, 189, 47, 0.14)'
    );
    expect(
      document.documentElement.style.getPropertyValue('--chrome-close')
    ).toBe('#fb4934');
    expect(screen.getByText(/Theme: gruvbox/i)).toBeInTheDocument();
    expect(screen.getByText('Gruvbox Dark')).toBeInTheDocument();
  });

  it('keeps document scrolling disabled and uses the transcript as the scroller', () => {
    const { container } = renderTerminal();

    const shell = container.firstElementChild as HTMLElement;
    const scrollRegion = screen.getByTestId('terminal-scroll-region');

    expect(shell).toHaveClass('h-full', 'overflow-hidden');
    expect(shell).not.toHaveClass('min-h-screen');
    expect(scrollRegion).toHaveClass('overflow-y-auto');
  });

  it('auto-scrolls when the transcript is already near the bottom', async () => {
    const { user, input } = renderTerminal();
    const scrollRegion = screen.getByTestId('terminal-scroll-region');
    const scrollState = setScrollMetrics({
      scrollElement: scrollRegion,
      clientHeight: 320,
      scrollHeight: 960,
      scrollTop: 600,
    });

    fireEvent.scroll(scrollRegion);

    await user.type(input, 'about{enter}');
    await screen.findByTestId('about');

    await waitFor(() => {
      expect(scrollState.getScrollTop()).toBe(960);
    });
  });

  it('keeps the reader position when scrolled away from the bottom', async () => {
    const { user, input } = renderTerminal();
    const scrollRegion = screen.getByTestId('terminal-scroll-region');
    const scrollState = setScrollMetrics({
      scrollElement: scrollRegion,
      clientHeight: 320,
      scrollHeight: 960,
      scrollTop: 180,
    });

    fireEvent.scroll(scrollRegion);

    await user.type(input, 'about{enter}');
    await screen.findByTestId('about');

    await waitFor(() => {
      expect(scrollState.getScrollTop()).toBe(180);
    });
  });
});
