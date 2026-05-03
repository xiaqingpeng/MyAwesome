import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Appearance } from 'react-native';

// 主题模式类型
export type ThemeMode = 'light' | 'dark' | 'system';

// 实际显示的主题（light 或 dark）
export type DisplayTheme = 'light' | 'dark';

// 用户选择的主题模式（持久化存储）
export const themeModeAtom = atomWithStorage<ThemeMode>('theme-mode', 'system');

// 系统主题（可写 atom）
const getSystemTheme = (): DisplayTheme => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
};

export const systemThemeAtom = atom<DisplayTheme>(getSystemTheme());

// 当前实际显示的主题（派生 atom）
export const currentThemeAtom = atom<DisplayTheme>((get) => {
  const mode = get(themeModeAtom);
  if (mode === 'system') {
    return get(systemThemeAtom);
  }
  return mode;
});

// 是否为深色模式（派生 atom）
export const isDarkModeAtom = atom<boolean>((get) => {
  return get(currentThemeAtom) === 'dark';
});

// 主题颜色配置
export const themeColorsAtom = atom((get) => {
  const isDark = get(isDarkModeAtom);
  
  return {
    // 背景色
    background: isDark ? '#000000' : '#f5f5f5',
    surface: isDark ? '#1c1c1e' : '#ffffff',
    card: isDark ? '#2c2c2e' : '#ffffff',
    
    // 文字颜色
    text: isDark ? '#ffffff' : '#333333',
    textSecondary: isDark ? '#a0a0a0' : '#666666',
    textTertiary: isDark ? '#808080' : '#999999',
    
    // 主题色
    primary: isDark ? '#0a84ff' : '#007AFF',
    success: isDark ? '#30d158' : '#34C759',
    warning: isDark ? '#ff9f0a' : '#FF9500',
    error: isDark ? '#ff453a' : '#FF3B30',
    info: isDark ? '#64d2ff' : '#5AC8FA',
    
    // 边框和分隔线
    border: isDark ? '#38383a' : '#e0e0e0',
    separator: isDark ? '#38383a' : '#f0f0f0',
    
    // 阴影（深色模式下减弱）
    shadow: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)',
    
    // 遮罩
    overlay: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
    
    // 特殊颜色
    link: isDark ? '#0a84ff' : '#007AFF',
    placeholder: isDark ? '#636366' : '#c7c7cc',
  };
});
