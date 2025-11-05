// Stage status types - using const object instead of enum for erasableSyntaxOnly compatibility
export const STAGE_STATUS = {
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  PENDING: 'pending',
} as const;

export type STAGE_STATUS = (typeof STAGE_STATUS)[keyof typeof STAGE_STATUS];

// Stage action types
export const STAGE_ACTION_TYPE = {
  UPDATE: 'update',
  SUMMARY: 'summary',
  CONTINUE: 'continue',
} as const;

export type STAGE_ACTION_TYPE = (typeof STAGE_ACTION_TYPE)[keyof typeof STAGE_ACTION_TYPE];

// Custom step connector for stepper components
import { StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: theme.palette.grey[200],
    minHeight: '8px',
  },
}));
