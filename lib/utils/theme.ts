/**
 * Theme utilities for Konva primitives
 * Converts theme variant colors to hex values for canvas rendering
 */

import type { VisualizationVariant } from '~/types/visualization/theme'

/**
 * Theme color definitions mapped to hex values
 * These match the CSS variables in visualize-theme.css
 */
export const THEME_COLORS: Record<VisualizationVariant, {
  border: string
  bg: string
  bgHover: string
  bgSelected: string
  itemBg: string
  itemBgHover: string
  textPrimary: string
  textSecondary: string
}> = {
  emerald: {
    border: '#10b981',
    bg: 'rgba(16, 185, 129, 0.08)',
    bgHover: 'rgba(16, 185, 129, 0.12)',
    bgSelected: 'rgba(16, 185, 129, 0.2)',
    itemBg: 'rgba(16, 185, 129, 0.15)',
    itemBgHover: 'rgba(16, 185, 129, 0.25)',
    textPrimary: '#6ee7b7',
    textSecondary: '#34d399',
  },
  orange: {
    border: '#f97316',
    bg: 'rgba(249, 115, 22, 0.08)',
    bgHover: 'rgba(249, 115, 22, 0.12)',
    bgSelected: 'rgba(249, 115, 22, 0.2)',
    itemBg: 'rgba(249, 115, 22, 0.15)',
    itemBgHover: 'rgba(249, 115, 22, 0.25)',
    textPrimary: '#fdba74',
    textSecondary: '#fb923c',
  },
  rose: {
    border: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.08)',
    bgHover: 'rgba(244, 63, 94, 0.12)',
    bgSelected: 'rgba(244, 63, 94, 0.2)',
    itemBg: 'rgba(244, 63, 94, 0.15)',
    itemBgHover: 'rgba(244, 63, 94, 0.25)',
    textPrimary: '#fda4af',
    textSecondary: '#fb7185',
  },
  violet: {
    border: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.08)',
    bgHover: 'rgba(139, 92, 246, 0.12)',
    bgSelected: 'rgba(139, 92, 246, 0.2)',
    itemBg: 'rgba(139, 92, 246, 0.15)',
    itemBgHover: 'rgba(139, 92, 246, 0.25)',
    textPrimary: '#c4b5fd',
    textSecondary: '#a78bfa',
  },
  amber: {
    border: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
    bgHover: 'rgba(245, 158, 11, 0.12)',
    bgSelected: 'rgba(245, 158, 11, 0.2)',
    itemBg: 'rgba(245, 158, 11, 0.15)',
    itemBgHover: 'rgba(245, 158, 11, 0.25)',
    textPrimary: '#fcd34d',
    textSecondary: '#fbbf24',
  },
  pink: {
    border: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.08)',
    bgHover: 'rgba(236, 72, 153, 0.12)',
    bgSelected: 'rgba(236, 72, 153, 0.2)',
    itemBg: 'rgba(236, 72, 153, 0.15)',
    itemBgHover: 'rgba(236, 72, 153, 0.25)',
    textPrimary: '#f9a8d4',
    textSecondary: '#f472b6',
  },
  cyan: {
    border: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.08)',
    bgHover: 'rgba(6, 182, 212, 0.12)',
    bgSelected: 'rgba(6, 182, 212, 0.2)',
    itemBg: 'rgba(6, 182, 212, 0.15)',
    itemBgHover: 'rgba(6, 182, 212, 0.25)',
    textPrimary: '#67e8f9',
    textSecondary: '#22d3ee',
  },
  blue: {
    border: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.08)',
    bgHover: 'rgba(59, 130, 246, 0.12)',
    bgSelected: 'rgba(59, 130, 246, 0.2)',
    itemBg: 'rgba(59, 130, 246, 0.15)',
    itemBgHover: 'rgba(59, 130, 246, 0.25)',
    textPrimary: '#93c5fd',
    textSecondary: '#60a5fa',
  },
  indigo: {
    border: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.08)',
    bgHover: 'rgba(99, 102, 241, 0.12)',
    bgSelected: 'rgba(99, 102, 241, 0.2)',
    itemBg: 'rgba(99, 102, 241, 0.15)',
    itemBgHover: 'rgba(99, 102, 241, 0.25)',
    textPrimary: '#a5b4fc',
    textSecondary: '#818cf8',
  },
  teal: {
    border: '#14b8a6',
    bg: 'rgba(20, 184, 166, 0.08)',
    bgHover: 'rgba(20, 184, 166, 0.12)',
    bgSelected: 'rgba(20, 184, 166, 0.2)',
    itemBg: 'rgba(20, 184, 166, 0.15)',
    itemBgHover: 'rgba(20, 184, 166, 0.25)',
    textPrimary: '#5eead4',
    textSecondary: '#2dd4bf',
  },
}

/**
 * Get style object for a primitive based on its variant
 * 
 * @param variant - The color variant to use
 * @returns Style object with colors for Konva primitives
 */
export function getThemeStyle(variant: VisualizationVariant) {
  const colors = THEME_COLORS[variant]
  
  return {
    background: colors.bg,
    border: colors.border,
    borderWidth: 2,
    borderRadius: 8,
    text: colors.textPrimary,
    textSecondary: colors.textSecondary,
    itemBg: colors.itemBg,
  }
}

/**
 * Neutral colors for non-themed elements
 */
export const NEUTRAL_COLORS = {
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  background: '#1e293b',
  backgroundLight: '#334155',
  border: '#475569',
}

