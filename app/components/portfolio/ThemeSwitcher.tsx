"use client";

import { useState } from "react";
import type { ThemePreset } from "../../types";

type Props = {
  themes: ThemePreset[];
  active: string;
  onChange: (name: string) => void;
};

function swatches(p: ThemePreset): string[] {
  const { panel, accent, accentSoft } = p.tokens;
  return [panel, accent, accentSoft];
}

export default function ThemeSwitcher({ themes, active, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const activePreset = themes.find((t) => t.name === active);

  return (
    <div className={`theme-switcher${open ? " ts-open" : ""}`}>
      <button
        type="button"
        className="ts-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="ts-toggle-label">theme</span>
        {!open && activePreset && (
          <span className="ts-dots ts-preview">
            {swatches(activePreset).map((s, i) => (
              <span key={i} className="ts-dot" style={{ background: s }} />
            ))}
          </span>
        )}
        <span className="ts-chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="ts-grid">
          {themes.map((t) => (
            <button
              key={t.name}
              type="button"
              className="ts-swatch"
              aria-pressed={active === t.name}
              aria-label={t.label}
              title={t.label}
              onClick={() => onChange(t.name)}
            >
              <span className="ts-dots">
                {swatches(t).map((s, i) => (
                  <span key={i} className="ts-dot" style={{ background: s }} />
                ))}
              </span>
              <span className="ts-name">{t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
