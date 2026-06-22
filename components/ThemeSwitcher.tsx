"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { themes, ThemeMode } from '@/lib/themeSystem';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeList: ThemeMode[] = ['cyberpunk', 'glass', 'terminal', 'matrix', 'minimal'];

  return (
    <div className="fixed top-6 right-6 z-[60]">
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 rounded-2xl border px-5 py-3 backdrop-blur-xl transition-all hover:scale-105"
        style={{
          borderColor: theme.colors.cardBorder,
          background: theme.colors.cardBackground,
          boxShadow: theme.effects.glow ? theme.effects.shadow : 'none',
        }}
      >
        <Palette className="h-5 w-5" style={{ color: theme.colors.primary }} />
        <div className="hidden md:block text-left">
          <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: theme.colors.textMuted }}>
            Experience Mode
          </p>
          <p className="text-sm font-bold" style={{ color: theme.colors.text }}>
            {themes[currentTheme].icon} {themes[currentTheme].name}
          </p>
        </div>
        <ChevronDown 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: theme.colors.textSecondary }}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[55] bg-black/20"
              style={{ pointerEvents: 'auto' }}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute top-full right-0 mt-3 w-80 rounded-2xl border p-3 z-[70]"
              style={{
                borderColor: theme.colors.cardBorder,
                background: theme.colors.cardBackground,
                boxShadow: theme.effects.shadow,
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                pointerEvents: 'auto',
              }}
            >
              {/* Header */}
              <div className="mb-4 px-3 pt-2">
                <h3 className="text-sm font-mono uppercase tracking-widest" style={{ color: theme.colors.textMuted }}>
                  Choose Your Experience
                </h3>
              </div>

              {/* Theme Options */}
              <div className="space-y-2">
                {themeList.map((themeMode) => {
                  const t = themes[themeMode];
                  const isActive = currentTheme === themeMode;

                  return (
                    <motion.button
                      key={themeMode}
                      onClick={() => {
                        setTheme(themeMode);
                        setIsOpen(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full rounded-xl border p-4 text-left transition-all"
                      style={{
                        borderColor: isActive ? theme.colors.primary : theme.colors.cardBorder,
                        background: isActive 
                          ? `${theme.colors.primary}15` 
                          : theme.colors.cardBackground,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{t.icon}</span>
                          <div>
                            <h4 className="font-bold" style={{ color: theme.colors.text }}>
                              {t.name}
                            </h4>
                            <p className="mt-1 text-xs" style={{ color: theme.colors.textMuted }}>
                              {t.description}
                            </p>
                          </div>
                        </div>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <Check className="h-5 w-5" style={{ color: theme.colors.primary }} />
                          </motion.div>
                        )}
                      </div>

                      {/* Theme Preview Bar */}
                      <div className="mt-3 flex gap-2">
                        <div 
                          className="h-2 flex-1 rounded-full"
                          style={{ background: t.colors.primary }}
                        />
                        <div 
                          className="h-2 flex-1 rounded-full"
                          style={{ background: t.colors.secondary }}
                        />
                        <div 
                          className="h-2 flex-1 rounded-full"
                          style={{ background: t.colors.accent }}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Minimal Mode Badge */}
              {currentTheme === 'minimal' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-xl border p-3"
                  style={{
                    borderColor: theme.colors.primary,
                    background: `${theme.colors.primary}10`,
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.primary }}>
                    ✓ Recruiter Friendly View
                  </p>
                  <p className="mt-1 text-xs" style={{ color: theme.colors.textMuted }}>
                    Optimized for professional review
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
