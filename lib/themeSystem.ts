// Dynamic Portfolio Theme System
// Multiple premium visual experiences with smooth transitions

export type ThemeMode = 'cyberpunk' | 'glass' | 'terminal' | 'matrix' | 'minimal';

export interface Theme {
  id: ThemeMode;
  name: string;
  icon: string;
  description: string;
  colors: {
    background: string;
    backgroundGradient: string;
    cardBackground: string;
    cardBorder: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
    textMuted: string;
  };
  effects: {
    glow: boolean;
    particles: boolean;
    glassmorphism: boolean;
    scanlines: boolean;
    glitch: boolean;
    blur: string;
    shadow: string;
  };
  typography: {
    fontFamily: string;
    headingWeight: string;
    bodyWeight: string;
  };
  ai: {
    systemName: string;
    persona: string;
  };
}

export const themes: Record<ThemeMode, Theme> = {
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    icon: '⚡',
    description: 'The futuristic engineering universe',
    colors: {
      background: '#03050C',
      backgroundGradient: 'linear-gradient(to bottom, #03050C, #0a0f1e)',
      cardBackground: 'rgba(3, 5, 12, 0.6)',
      cardBorder: 'rgba(255, 255, 255, 0.1)',
      primary: '#06B6D4',
      secondary: '#A855F7',
      accent: '#EC4899',
      text: '#FFFFFF',
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      textMuted: 'rgba(255, 255, 255, 0.6)',
    },
    effects: {
      glow: true,
      particles: true,
      glassmorphism: false,
      scanlines: false,
      glitch: false,
      blur: '24px',
      shadow: '0 0 30px rgba(6, 182, 212, 0.3)',
    },
    typography: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      headingWeight: '700',
      bodyWeight: '400',
    },
    ai: {
      systemName: 'RONIT.AI',
      persona: 'Holographic AI Assistant',
    },
  },

  glass: {
    id: 'glass',
    name: 'Glass',
    icon: '💎',
    description: 'Elegant and premium',
    colors: {
      background: '#0F1419',
      backgroundGradient: 'linear-gradient(135deg, #0F1419 0%, #1a1f2e 100%)',
      cardBackground: 'rgba(255, 255, 255, 0.05)',
      cardBorder: 'rgba(255, 255, 255, 0.15)',
      primary: '#60A5FA',
      secondary: '#C084FC',
      accent: '#F472B6',
      text: '#FFFFFF',
      textSecondary: 'rgba(255, 255, 255, 0.85)',
      textMuted: 'rgba(255, 255, 255, 0.5)',
    },
    effects: {
      glow: false,
      particles: false,
      glassmorphism: true,
      scanlines: false,
      glitch: false,
      blur: '20px',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
    typography: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      headingWeight: '600',
      bodyWeight: '400',
    },
    ai: {
      systemName: 'RONIT.AI',
      persona: 'Modern AI Assistant',
    },
  },

  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: '🖥',
    description: 'Developer environment',
    colors: {
      background: '#000000',
      backgroundGradient: 'linear-gradient(to bottom, #000000, #0a0a0a)',
      cardBackground: 'rgba(0, 255, 0, 0.03)',
      cardBorder: 'rgba(0, 255, 0, 0.3)',
      primary: '#00FF00',
      secondary: '#00FF00',
      accent: '#00FF00',
      text: '#00FF00',
      textSecondary: 'rgba(0, 255, 0, 0.8)',
      textMuted: 'rgba(0, 255, 0, 0.5)',
    },
    effects: {
      glow: true,
      particles: false,
      glassmorphism: false,
      scanlines: true,
      glitch: false,
      blur: '0px',
      shadow: '0 0 20px rgba(0, 255, 0, 0.2)',
    },
    typography: {
      fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
      headingWeight: '700',
      bodyWeight: '400',
    },
    ai: {
      systemName: 'SYSTEM TERMINAL',
      persona: 'Command Console',
    },
  },

  matrix: {
    id: 'matrix',
    name: 'Matrix',
    icon: '🟢',
    description: 'The machine world',
    colors: {
      background: '#000000',
      backgroundGradient: 'linear-gradient(to bottom, #000000, #001a00)',
      cardBackground: 'rgba(0, 20, 0, 0.8)',
      cardBorder: 'rgba(0, 255, 65, 0.3)',
      primary: '#00FF41',
      secondary: '#00FF41',
      accent: '#39FF14',
      text: '#00FF41',
      textSecondary: 'rgba(0, 255, 65, 0.85)',
      textMuted: 'rgba(0, 255, 65, 0.5)',
    },
    effects: {
      glow: true,
      particles: true,
      glassmorphism: false,
      scanlines: false,
      glitch: true,
      blur: '0px',
      shadow: '0 0 30px rgba(0, 255, 65, 0.3)',
    },
    typography: {
      fontFamily: '"Courier New", monospace',
      headingWeight: '700',
      bodyWeight: '400',
    },
    ai: {
      systemName: 'MATRIX CORE',
      persona: 'Machine Intelligence',
    },
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal',
    icon: '⚪',
    description: 'Professional recruiter mode',
    colors: {
      background: '#FAFAFA',
      backgroundGradient: 'linear-gradient(to bottom, #FAFAFA, #F5F5F5)',
      cardBackground: '#FFFFFF',
      cardBorder: 'rgba(0, 0, 0, 0.08)',
      primary: '#0066FF',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      text: '#1A1A1A',
      textSecondary: 'rgba(26, 26, 26, 0.8)',
      textMuted: 'rgba(26, 26, 26, 0.6)',
    },
    effects: {
      glow: false,
      particles: false,
      glassmorphism: false,
      scanlines: false,
      glitch: false,
      blur: '0px',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
    typography: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      headingWeight: '600',
      bodyWeight: '400',
    },
    ai: {
      systemName: 'RONIT.AI',
      persona: 'Professional Career Assistant',
    },
  },
};

// Theme utilities
export const getTheme = (mode: ThemeMode): Theme => themes[mode];

export const saveTheme = (mode: ThemeMode): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-theme', mode);
  }
};

export const loadTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved && saved in themes) {
      return saved as ThemeMode;
    }
  }
  return 'cyberpunk';
};

export const applyThemeToCSSVariables = (theme: Theme): void => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  
  // Apply color variables
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-card-bg', theme.colors.cardBackground);
  root.style.setProperty('--color-card-border', theme.colors.cardBorder);
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--color-text-muted', theme.colors.textMuted);
  
  // Apply effect variables
  root.style.setProperty('--effect-blur', theme.effects.blur);
  root.style.setProperty('--effect-shadow', theme.effects.shadow);
  
  // Apply typography variables
  root.style.setProperty('--font-family', theme.typography.fontFamily);
  root.style.setProperty('--font-heading-weight', theme.typography.headingWeight);
  root.style.setProperty('--font-body-weight', theme.typography.bodyWeight);
  
  // Apply background gradient
  document.body.style.background = theme.colors.backgroundGradient;
};
