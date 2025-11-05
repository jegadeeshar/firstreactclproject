import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CdfUploadButton from '@cdf-components/upload/CdfUploadButton';
import { FileUploadMethodType } from '@core/types';
import type { ScanUploadComponentProps } from '@core/types';

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
  boxSizing: 'border-box',
}));

const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
  '& > *': {
    minWidth: '144px',
    height: '56px',
  },
}));

const StyledNoteRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.5),
  flexWrap: 'wrap',
  textAlign: 'left',
  color: theme.palette.text.secondary,

  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const StyledErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: 'left',
  fontSize: theme.typography.fontSize,
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

// Component
const ScanUploadComponent: React.FC<ScanUploadComponentProps> = ({
  noteText = 'Note: Support the format JPEG, JPG & PNG',
  handleUpload,
  handleScan,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type! Please upload only JPG or PNG images.');
      return;
    }
    setError('');
    handleUpload?.(file);
  };

  const handleFileScan = (file: File) => {
    setError('');
    handleScan?.(file);
  };

  return (
    <StyledContainer>
      {/* Buttons */}
      <StyledButtonContainer>
        <CdfUploadButton
          uploadType={FileUploadMethodType.SCAN}
          handleScan={handleFileScan}
          data-testid="scan-button"
        />
        <CdfUploadButton
          uploadType={FileUploadMethodType.UPLOAD}
          handleUpload={handleFileUpload}
          data-testid="upload-button"
        />
      </StyledButtonContainer>

      {/* Note */}
      {noteText && (
        <StyledNoteRow>
          <InfoOutlinedIcon fontSize="small" color="action" />
          <Typography variant="caption">{noteText}</Typography>
        </StyledNoteRow>
      )}

      {/* Error */}
      {error && <StyledErrorText variant="caption">{error}</StyledErrorText>}
    </StyledContainer>
  );
};

export default ScanUploadComponent;
