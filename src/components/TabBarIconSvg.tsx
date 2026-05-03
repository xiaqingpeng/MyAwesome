import React from 'react';
import Svg, { Path, Circle, Line } from 'react-native-svg';

interface TabBarIconProps {
  name: 'home' | 'settings' | 'discover' | 'network' | 'code';
  color: string;
  size?: number;
  focused?: boolean;
}

// SVG 图标路径数据
const iconPaths = {
  home: {
    filled: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    outline: 'M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z',
  },
  discover: {
    // Compass icon - filled
    filled: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    // Compass icon - outline
    outline: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  },
  code: {
    // Code brackets icon - filled
    filled: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    // Code brackets icon - outline
    outline: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  },
  settings: {
    filled: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
    outline: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  },
};

export function TabBarIconSvg({ name, color, size = 24, focused }: TabBarIconProps) {
  // Network 图标使用自定义渲染 - 网络连接节点图标
  if (name === 'network') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {focused ? (
          // Filled version - Network nodes with connections
          <>
            {/* Center node */}
            <Circle cx="12" cy="12" r="2.5" fill={color} />
            
            {/* Top node */}
            <Circle cx="12" cy="4" r="2" fill={color} />
            <Line x1="12" y1="6" x2="12" y2="9.5" stroke={color} strokeWidth="2" />
            
            {/* Bottom node */}
            <Circle cx="12" cy="20" r="2" fill={color} />
            <Line x1="12" y1="18" x2="12" y2="14.5" stroke={color} strokeWidth="2" />
            
            {/* Left node */}
            <Circle cx="4" cy="12" r="2" fill={color} />
            <Line x1="6" y1="12" x2="9.5" y2="12" stroke={color} strokeWidth="2" />
            
            {/* Right node */}
            <Circle cx="20" cy="12" r="2" fill={color} />
            <Line x1="18" y1="12" x2="14.5" y2="12" stroke={color} strokeWidth="2" />
            
            {/* Top-left node */}
            <Circle cx="6" cy="6" r="1.5" fill={color} />
            <Line x1="7.2" y1="7.2" x2="10.3" y2="10.3" stroke={color} strokeWidth="1.5" />
            
            {/* Top-right node */}
            <Circle cx="18" cy="6" r="1.5" fill={color} />
            <Line x1="16.8" y1="7.2" x2="13.7" y2="10.3" stroke={color} strokeWidth="1.5" />
            
            {/* Bottom-left node */}
            <Circle cx="6" cy="18" r="1.5" fill={color} />
            <Line x1="7.2" y1="16.8" x2="10.3" y2="13.7" stroke={color} strokeWidth="1.5" />
            
            {/* Bottom-right node */}
            <Circle cx="18" cy="18" r="1.5" fill={color} />
            <Line x1="16.8" y1="16.8" x2="13.7" y2="13.7" stroke={color} strokeWidth="1.5" />
          </>
        ) : (
          // Outline version - Network nodes with connections
          <>
            {/* Center node */}
            <Circle cx="12" cy="12" r="2.5" stroke={color} strokeWidth="1.5" fill="none" />
            
            {/* Top node */}
            <Circle cx="12" cy="4" r="2" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="12" y1="6" x2="12" y2="9.5" stroke={color} strokeWidth="1.5" />
            
            {/* Bottom node */}
            <Circle cx="12" cy="20" r="2" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="12" y1="18" x2="12" y2="14.5" stroke={color} strokeWidth="1.5" />
            
            {/* Left node */}
            <Circle cx="4" cy="12" r="2" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="6" y1="12" x2="9.5" y2="12" stroke={color} strokeWidth="1.5" />
            
            {/* Right node */}
            <Circle cx="20" cy="12" r="2" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="18" y1="12" x2="14.5" y2="12" stroke={color} strokeWidth="1.5" />
            
            {/* Top-left node */}
            <Circle cx="6" cy="6" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="7.2" y1="7.2" x2="10.3" y2="10.3" stroke={color} strokeWidth="1" />
            
            {/* Top-right node */}
            <Circle cx="18" cy="6" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="16.8" y1="7.2" x2="13.7" y2="10.3" stroke={color} strokeWidth="1" />
            
            {/* Bottom-left node */}
            <Circle cx="6" cy="18" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="7.2" y1="16.8" x2="10.3" y2="13.7" stroke={color} strokeWidth="1" />
            
            {/* Bottom-right node */}
            <Circle cx="18" cy="18" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <Line x1="16.8" y1="16.8" x2="13.7" y2="13.7" stroke={color} strokeWidth="1" />
          </>
        )}
      </Svg>
    );
  }

  const pathData = focused ? iconPaths[name].filled : iconPaths[name].outline;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d={pathData} />
    </Svg>
  );
}
