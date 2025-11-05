// src/core/components/layout/CdfContainer.tsx

import React from 'react';
import type { ReactNode } from 'react';
import Grid from '@mui/material/Grid'; // assume v9 supports Grid with rowSpacing/columnSpacing
import { styled } from '@mui/material/styles';

interface CdfContainerProps {
  children: ReactNode;
  rowSpacing?: number | { [breakpoint: string]: number | string };
  columnSpacing?: number | { [breakpoint: string]: number | string };
  marginBottom?: number | string;
}

const StyledContainer = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'marginBottom',
})<CdfContainerProps>(({ theme, marginBottom = 4 }) => ({
  marginBottom: typeof marginBottom === 'number' ? theme.spacing(marginBottom) : marginBottom,
}));

const CdfContainer: React.FC<CdfContainerProps> = ({
  children,
  rowSpacing = 4,
  columnSpacing = 4,
  marginBottom = 4,
}) => {
  return (
    <StyledContainer
      container
      rowSpacing={rowSpacing}
      columnSpacing={columnSpacing}
      marginBottom={marginBottom}
    >
      {children}
    </StyledContainer>
  );
};

export default CdfContainer;
