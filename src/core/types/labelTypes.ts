import type { AlertColor } from '@mui/material';
import type { ReactNode } from 'react';

// default label schema
export interface Labels {
  [key: string]: string;
}

// Define the provider component
export interface LabelProviderProps {
  children: ReactNode;
}

export interface CdfAlertProps {
  message: string;
  type: AlertColor;
  open: boolean;
  onClose: () => void;
  index?: number; // optional stacking index
  autoHideDuration?: number;
}

export interface VerifiedModalPopupProps {
  titleText?: string;
  descriptionText?: string;
  actionButtonLabel?: string;
  imageSrc?: string;
  onAction?: () => void;
}

export interface DynamicGridProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  subheading?: string;
  buttonLabel?: string;
  data?: Record<string, string | number | null>;
}
