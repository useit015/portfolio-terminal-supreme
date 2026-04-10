import { describe, expect, it } from 'vitest';
import content from '../content';
import {
  getAutocomplete,
  getCommandSpec,
  getPublicCommands,
  parseCommand,
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
  });
});
