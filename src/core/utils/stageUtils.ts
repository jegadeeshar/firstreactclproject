import type { Theme } from '@mui/material/styles';
import { STAGE_STATUS } from '@core/constants/stageConstants';

/**
 * Returns the display label for a given stage status.
 *
 * @param status - The stage status.
 * @returns The corresponding status label string.
 */
export const getStatusLabel = (status: STAGE_STATUS): string => {
  switch (status) {
    case STAGE_STATUS.IN_PROGRESS:
      return 'In-progress';
    case STAGE_STATUS.COMPLETED:
      return 'Completed';
    case STAGE_STATUS.PENDING:
      return 'Pending';
    default:
      return '';
  }
};

/**
 * Returns the theme color for a given stage status.
 *
 * @param status - The stage status.
 * @param theme - The MUI theme object.
 * @returns The corresponding color from the theme palette.
 */
export const getStatusColor = (status: STAGE_STATUS, theme: Theme): string => {
  switch (status) {
    case STAGE_STATUS.IN_PROGRESS:
      return theme.palette.info.main;
    case STAGE_STATUS.COMPLETED:
      return theme.palette.success.main;
    case STAGE_STATUS.PENDING:
      return theme.palette.grey[300];
    default:
      return theme.palette.grey[300];
  }
};
