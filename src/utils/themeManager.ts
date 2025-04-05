export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeColors {
  bg: string;
  bgHighlight: string;
  terminalBlack: string;
  fg: string;
  fgDark: string;
  fgGutter: string;
  comment: string;
  blue: string;
  cyan: string;
  green: string;
  magenta: string;
  purple: string;
  red: string;
  orange: string;
  yellow: string;
}

export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: ThemeMode = 'system';
  private systemPrefersDark: boolean = false;
  private observers: ((theme: string) => void)[] = [];

  // Tokyo Night Dark theme colors
  private readonly darkColors: ThemeColors = {
    bg: '#1a1b26',
    bgHighlight: '#292e42',
    terminalBlack: '#414868',
    fg: '#a9b1d6',
    fgDark: '#565f89',
    fgGutter: '#3b4261',
    comment: '#565f89',
    blue: '#7aa2f7',
    cyan: '#7dcfff',
    green: '#9ece6a',
    magenta: '#bb9af7',
    purple: '#9d7cd8',
    red: '#f7768e',
    orange: '#ff9e64',
    yellow: '#e0af68',
  };

  // Tokyo Night Light theme colors
  private readonly lightColors: ThemeColors = {
    bg: '#e1e2e7',
    bgHighlight: '#c8cad6',
    terminalBlack: '#9699a3',
    fg: '#343b58',
    fgDark: '#565a6e',
    fgGutter: '#a8aecb',
    comment: '#848cb5',
    blue: '#2e7de9',
    cyan: '#007197',
    green: '#587539',
    magenta: '#9854f1',
    purple: '#7847bd',
    red: '#f52a65',
    orange: '#b15c00',
    yellow: '#8c6c3e',
  };

  private constructor() {
    // Initialize with stored preference or system default
    this.currentTheme = this.getSavedTheme();
    this.systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.systemPrefersDark = e.matches;
      if (this.currentTheme === 'system') {
        this.applyTheme();
      }
    });

    // Apply theme immediately
    this.applyTheme();
  }

  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private getSavedTheme(): ThemeMode {
    return (localStorage.getItem('theme') as ThemeMode) || 'system';
  }

  public getCurrentTheme(): ThemeMode {
    return this.currentTheme;
  }

  public getCurrentEffectiveTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'system') {
      return this.systemPrefersDark ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  public setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  public subscribe(callback: (theme: string) => void): () => void {
    this.observers.push(callback);
    // Call immediately with current theme
    callback(this.getCurrentEffectiveTheme());

    // Return unsubscribe function
    return () => {
      this.observers = this.observers.filter(cb => cb !== callback);
    };
  }

  private applyTheme(): void {
    const effectiveTheme = this.getCurrentEffectiveTheme();
    const colors = effectiveTheme === 'dark' ? this.darkColors : this.lightColors;

    // Apply theme colors to CSS variables
    document.documentElement.style.setProperty('--theme-bg', colors.bg);
    document.documentElement.style.setProperty('--theme-bg-highlight', colors.bgHighlight);
    document.documentElement.style.setProperty('--theme-terminal-black', colors.terminalBlack);
    document.documentElement.style.setProperty('--theme-fg', colors.fg);
    document.documentElement.style.setProperty('--theme-fg-dark', colors.fgDark);
    document.documentElement.style.setProperty('--theme-fg-gutter', colors.fgGutter);
    document.documentElement.style.setProperty('--theme-comment', colors.comment);
    document.documentElement.style.setProperty('--theme-blue', colors.blue);
    document.documentElement.style.setProperty('--theme-cyan', colors.cyan);
    document.documentElement.style.setProperty('--theme-green', colors.green);
    document.documentElement.style.setProperty('--theme-magenta', colors.magenta);
    document.documentElement.style.setProperty('--theme-purple', colors.purple);
    document.documentElement.style.setProperty('--theme-red', colors.red);
    document.documentElement.style.setProperty('--theme-orange', colors.orange);
    document.documentElement.style.setProperty('--theme-yellow', colors.yellow);

    // Add/remove theme class from html element
    document.documentElement.classList.remove('theme-dark', 'theme-light');
    document.documentElement.classList.add(`theme-${effectiveTheme}`);

    // Notify all observers
    this.observers.forEach(callback => callback(effectiveTheme));
  }
}