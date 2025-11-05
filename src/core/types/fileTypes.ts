import type { ButtonProps } from '@mui/material';
import type { DocumentName } from './commonTypes';
import type { FileUploadMethodType } from './configTypes';

export interface CdfUploadButtonProps extends ButtonProps {
  uploadType?: FileUploadMethodType;
  disabled?: boolean;
  showTick?: boolean;
  handleUpload?: (file: File) => void;
  handleScan?: (file: File) => void;
}

export interface CdfUploadPreviewProps {
  title: DocumentName;
  type: string;
  disabled?: boolean;
  onDelete?: () => void;
  previewUrl?: string;
}

export interface CdfPreviewProps {
  open: boolean;
  imageUrl: string;
  title?: string;
  onClose: () => void;
}

// Scan Upload Component Props
export type ScanUploadComponentProps = {
  noteText?: string;
  handleUpload?: (file: File) => void;
  handleScan?: (file: File) => void;
};
