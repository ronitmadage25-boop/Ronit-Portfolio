"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode, Theme, getTheme, saveTheme, loadTheme, applyThemeToCSSVariables } from '@/lib/themeSystem';

interface ThemeContextType {
  currentTheme: ThemeMode;
  theme: Theme;
  setTheme: (mode: ThemeMode) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('cyberpunk');
  const [theme, setThemeData] = useState<Theme>(getTheme('cyberpunk'));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = loadTheme();
    setCurrentTheme(savedTheme);
    setThemeData(getTheme(savedTheme));
    applyThemeToCSSVariables(getTheme(savedTheme));
    setIsInitialized(true);
  }, []);

  const setTheme = (mode: ThemeMode) => {
    if (mode === currentTheme) return;

    setIsTransitioning(true);
    
    // Short delay for transition effect
    setTimeout(() => {
      const newTheme = getTheme(mode);
      setCurrentTheme(mode);
      setThemeData(newTheme);
      saveTheme(mode);
      applyThemeToCSSVariables(newTheme);
      
      // End transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 100);
  };

  if (!isInitialized) {
    return null; // Prevent flash of wrong theme
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
