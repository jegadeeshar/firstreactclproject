import type { SidebarProps } from '@/core/types';
import { useTheme } from '@mui/material';
import React from 'react';

/* ---------- SIDEBAR LAYOUT ---------- */
const Sidebar: React.FC<SidebarProps> = ({ children, className = '' }) => {
  const theme = useTheme();

  return (
    <aside
      data-testid="sidebarLayout"
      className={`sidebar ${className}`}
      style={{
        width: `${theme.customProperties.sidebarWidth}px`,
        height: '100vh',
      }}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
