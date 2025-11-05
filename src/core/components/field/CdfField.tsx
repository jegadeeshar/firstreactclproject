import React from 'react';
import type { ReactNode } from 'react';
import Grid from '@mui/material/Grid'; // Grid in v9 supports size prop

interface CdfFieldProps {
  children: ReactNode;
  size?: number | { xs?: number; sm?: number; md?: number };
  wide?: boolean;
}

const CdfField: React.FC<CdfFieldProps> = ({ children, size, wide = false }) => {
  const defaultSize = { xs: 12, sm: 4, md: 4 };
  const wideSize = { xs: 12, sm: 8, md: 8 };

  const computedSize = size ?? (wide ? wideSize : defaultSize);

  return <Grid size={computedSize}>{children}</Grid>;
};

export default CdfField;
