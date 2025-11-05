import React from 'react';
import { Grid, Typography } from '@mui/material';
import type { DynamicGridProps } from '@core/types';
import useLabel from '@/core/hooks/useLabel';

const DynamicGrid: React.FC<DynamicGridProps> = ({ title, data }) => {
  const t = useLabel();

  const hasData = data && Object.keys(data).length > 0;

  if (!hasData) {
    return null;
  }

  return (
    <>
      {title && (
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
      )}

      <Grid container rowSpacing={2} columnSpacing={2}>
        {Object.entries(data).map(([key, value]) => (
          <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 0.25 }}>
              {/**Skip pascal case for the keys */}
              {t(key, true)}
            </Typography>
            <Typography variant="caption">{String(value)}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DynamicGrid;
