import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import content from '../content';
import {
  getAutocomplete,
  getCommandSpec,
  getPublicCommands,
  parseCommand,
  renderCommandOutput,
} from './commands';

describe('command registry', () => {
  it('resolves aliases to canonical commands', () => {
    expect(getCommandSpec('stack')?.name).toBe('skills');
    expect(getCommandSpec('exp')?.name).toBe('experience');
    expect(getCommandSpec('contact')?.name).toBe('socials');
  });

  it('keeps hinted and hidden commands out of the public registry', () => {
    const publicNames = getPublicCommands().map((command) => command.name);

    expect(publicNames).not.toContain('morocco');
    expect(publicNames).not.toContain('souk');
    expect(publicNames).toContain('skills');
  });

  it('validates usage and shell path lookups', () => {
    const invalidSudo = parseCommand('sudo nope', content, { currentPath: '/' });
    expect(invalidSudo.status).toBe('usage');

    const cdProjects = parseCommand('cd projects', content, { currentPath: '/' });
    expect(cdProjects.status).toBe('valid');
    expect(cdProjects.resolvedPath).toBe('/projects');

    const catProject = parseCommand('cat projects/whichmodel', content, {
      currentPath: '/',
    });
    expect(catProject.status).toBe('valid');
    expect(catProject.resolvedPath).toBe('/projects/whichmodel');

    const missingNode = parseCommand('cat does-not-exist', content, {
      currentPath: '/',
    });
    expect(missingNode.status).toBe('error');

    const cdIntoFile = parseCommand('cd projects/whichmodel', content, {
      currentPath: '/',
    });
    expect(cdIntoFile.status).toBe('error');

    const lsUnknownPath = parseCommand('ls nothing-here', content, {
      currentPath: '/',
    });
    expect(lsUnknownPath.status).toBe('error');

    const manUnknownCommand = parseCommand('man unknown-command', content, {
      currentPath: '/',
    });
    expect(manUnknownCommand.status).toBe('error');
  });

  it('applies visibility rules to autocomplete', () => {
    expect(getAutocomplete('s', content, { currentPath: '/' }).hints).not.toContain(
      'sudo'
    );

    expect(getAutocomplete('su', content, { currentPath: '/' }).nextInput).toBe(
      'sudo'
    );

    expect(getAutocomplete('re', content, { currentPath: '/' }).hints).not.toContain(
      'rescue'
    );

    expect(getAutocomplete('cd pr', content, { currentPath: '/' }).nextInput).toBe(
      'cd projects'
    );

    expect(getAutocomplete('ls l', content, { currentPath: '/' }).nextInput).toBe(
      'ls lab'
    );
    expect(getAutocomplete('cat l', content, { currentPath: '/' }).hints).not.toContain(
      'lab'
    );
    expect(getAutocomplete('mo', content, { currentPath: '/' }).nextInput).toBe(
      'morocco'
    );
    expect(getAutocomplete('r', content, { currentPath: '/' }).hints).not.toContain(
      'rescue'
    );
  });

  it('renders command output dispatch for navigation and shell commands', () => {
    const renderForInput = (
      raw: string,
      currentPath = '/',
      history: string[] = []
    ) => {
      const parsed = parseCommand(raw, content, { currentPath });
      const output = renderCommandOutput(parsed, content, {
        history,
        currentPath: parsed.resolvedPath ?? currentPath,
      });
      render(<>{output}</>);
      return parsed;
    };

    renderForInput('tree');
    expect(screen.getByTestId('tree-output')).toBeInTheDocument();

    renderForInput('ls');
    expect(screen.getByTestId('ls-output')).toBeInTheDocument();

    renderForInput('man cd');
    expect(screen.getByTestId('man-output')).toHaveTextContent('cd <path>');

    renderForInput('grep react');
    expect(screen.getByTestId('grep-output')).toBeInTheDocument();

    renderForInput('themes set gruvbox');
    expect(screen.getByTestId('themes-output')).toHaveTextContent('Theme: gruvbox');

    renderForInput('whoami');
    expect(screen.getByTestId('whoami-output')).toHaveTextContent('visitor');

    renderForInput('cat source');
    expect(screen.getByTestId('source-of-truth')).toHaveTextContent(
      'Evidence-backed'
    );

    renderForInput('python');
    expect(screen.getByTestId('not-found-output')).toHaveTextContent(
      'Python is in `skills`, not in the shell runtime.'
    );
  });
});
