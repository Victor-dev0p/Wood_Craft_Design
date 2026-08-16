export interface ThemePalette {
  bgPage: string;
  bgCard: string;
  bgCard2: string;
  textMain: string;
  textMuted: string;
  accent: string;
  accentDeep: string;
  border: string;
  borderStrong: string;
  shadow: string;
}

export const themePalettes: Record<"light" | "dark", ThemePalette> = {
  light: {
    bgPage: "#f5f0e8",
    bgCard: "#faf8f4",
    bgCard2: "#f0ebe3",
    textMain: "#2a221c",
    textMuted: "#5c5048",
    accent: "#9a734d",
    accentDeep: "#7a5a3a",
    border: "rgba(42, 34, 28, 0.12)",
    borderStrong: "rgba(42, 34, 28, 0.2)",
    shadow: "0 24px 60px -28px rgba(0, 0, 0, 0.15)",
  },
  dark: {
    bgPage: "#1a1410",
    bgCard: "#241c16",
    bgCard2: "#2c231c",
    textMain: "#f4eadc",
    textMuted: "#d9cbb8",
    accent: "#c9a57a",
    accentDeep: "#b08a5c",
    border: "rgba(232, 216, 196, 0.1)",
    borderStrong: "rgba(232, 216, 196, 0.18)",
    shadow: "0 24px 60px -28px rgba(0, 0, 0, 0.55)",
  },
};

export type ThemeMode = keyof typeof themePalettes;

export const cssVariableMap: Record<ThemeMode, Record<string, string>> = {
  light: {
    "--bg-page": themePalettes.light.bgPage,
    "--bg-card": themePalettes.light.bgCard,
    "--bg-card-2": themePalettes.light.bgCard2,
    "--text-main": themePalettes.light.textMain,
    "--text-muted": themePalettes.light.textMuted,
    "--accent": themePalettes.light.accent,
    "--accent-deep": themePalettes.light.accentDeep,
    "--border": themePalettes.light.border,
    "--border-strong": themePalettes.light.borderStrong,
    "--shadow": themePalettes.light.shadow,
  },
  dark: {
    "--bg-page": themePalettes.dark.bgPage,
    "--bg-card": themePalettes.dark.bgCard,
    "--bg-card-2": themePalettes.dark.bgCard2,
    "--text-main": themePalettes.dark.textMain,
    "--text-muted": themePalettes.dark.textMuted,
    "--accent": themePalettes.dark.accent,
    "--accent-deep": themePalettes.dark.accentDeep,
    "--border": themePalettes.dark.border,
    "--border-strong": themePalettes.dark.borderStrong,
    "--shadow": themePalettes.dark.shadow,
  },
};

// Single source of truth for the FOUC-prevention inline script
export const themeInitScript = `
(function(){
  try{
    const s=localStorage.getItem('wood_craft_theme_mode');
    const d=window.matchMedia('(prefers-color-scheme: dark)').matches;
    const m=s==='dark'||(!s&&d)?'dark':'light';
    const r=document.documentElement;
    const v=${JSON.stringify(cssVariableMap)}[m];
    Object.entries(v).forEach(function([k,va]){r.style.setProperty(k,va);});
    r.style.colorScheme=m;
    if(m==='dark')r.classList.add('dark');
  }catch(e){}
})();
`.trim();
