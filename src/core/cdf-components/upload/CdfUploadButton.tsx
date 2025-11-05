import React, { useState, useRef } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Typography, styled, Modal } from '@mui/material';
import { FileUploadMethodType, FileUploadVariant, type CdfUploadButtonProps } from '@core/types';
import ScanIcon from '@core/assets/Icons/ScanIcon.svg';
import UploadIcon from '@core/assets/Icons/UploadIcon.svg';
import { CdfSubmitButton, CdfCancelButton } from '@cdf-components/buttons/CdfButtons';
import Webcam from 'react-webcam';

// Styled Components

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variantColor',
})<{
  disabled?: boolean;
  variantColor?: FileUploadVariant;
}>(({ theme, disabled, variantColor }) => {
  const variantBgColorMap: Record<FileUploadVariant, string> = {
    blue: theme.palette.blue.main,
    blond: theme.palette.blond.main,
  };

  const variantColorMap: Record<FileUploadVariant, string> = {
    blue: theme.palette.blue.dark,
    blond: theme.palette.blond.dark,
  };

  const backgroundColor = disabled
    ? theme.palette.action.disabledBackground
    : variantBgColorMap[variantColor || 'blue'];

  const borderColor = disabled
    ? theme.palette.action.disabledBackground
    : variantColorMap[variantColor || 'blue'];

  return {
    position: 'relative',
    height: 48,
    border: `1px solid ${borderColor}`,
    borderRadius: Number(theme.shape.borderRadius) * 2,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
    textTransform: 'none',
    cursor: disabled ? 'default' : 'pointer',
    [theme.breakpoints.up('sm')]: {
      width: '144px',
      height: '56px',
    },
  };
});

const IconTextBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const StyledTypography = styled(Typography)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
  fontSize: '0.75rem',
}));

const TickIcon = styled(CheckCircleIcon)(({ theme }) => ({
  color: theme.palette.success.main,
  position: 'absolute',
  width: 16,
  height: 16,
  top: '5px',
  left: '122px',
}));

const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  padding: theme.spacing(3),
  width: 480,
  maxWidth: '90%',
  textAlign: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[2],
}));

// Component

const CdfUploadButton: React.FC<CdfUploadButtonProps> = ({
  uploadType = FileUploadMethodType.UPLOAD,
  disabled = false,
  handleUpload,
  handleScan,
  showTick = false,
  ...props
}) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  // UPLOAD Handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = event.target.files?.[0];
    if (file) {
      handleUpload?.(file);
    }
  };

  // SCAN Handler
  const openCamera = () => {
    if (disabled) return;
    setIsCameraOpen(true);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    // Convert base64 to file
    const byteString = atob(imageSrc.split(',')[1]);
    const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const file = new File([ab], 'scanned-image.png', { type: mimeString });

    handleScan?.(file);
    setIsCameraOpen(false);
  };

  // RENDER SCAN BUTTON
  if (uploadType === FileUploadMethodType.SCAN) {
    return (
      <>
        <StyledButton
          disabled={disabled}
          variantColor={FileUploadVariant.BLOND}
          onClick={openCamera}
          {...props}
        >
          <IconTextBox>
            <Box sx={{ opacity: disabled ? 0.6 : 1, display: 'flex', alignItems: 'center' }}>
              <img src={ScanIcon} alt="Scan" />
            </Box>
            <StyledTypography variant="subtitle2" disabled={disabled}>
              Scan <b>Cheque</b>
            </StyledTypography>
          </IconTextBox>
          {showTick && <TickIcon data-testid="TickIcon" fontSize="small" />}
        </StyledButton>

        {/* Camera Modal */}
        <Modal open={isCameraOpen} onClose={() => setIsCameraOpen(false)}>
          <StyledModalBox>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Scan Cheque
            </Typography>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              width="100%"
              videoConstraints={{ facingMode: 'environment' }}
            />
            <Box mt={3} display="flex" justifyContent="center" gap={2}>
              <CdfSubmitButton label="Capture" onClick={capturePhoto} />
              <CdfCancelButton label="Cancel" onClick={() => setIsCameraOpen(false)} />
            </Box>
          </StyledModalBox>
        </Modal>
      </>
    );
  }

  // RENDER UPLOAD BUTTON
  return (
    <StyledButton
      disabled={disabled}
      variantColor={FileUploadVariant.BLUE}
      component="label"
      {...props}
    >
      <IconTextBox>
        <Box sx={{ opacity: disabled ? 0.6 : 1, display: 'flex', alignItems: 'center' }}>
          <img src={UploadIcon} alt="Upload" />
        </Box>
        <StyledTypography variant="subtitle2" disabled={disabled}>
          Upload <b>Cheque</b>
        </StyledTypography>
      </IconTextBox>
      <input type="file" hidden disabled={disabled} onChange={handleFileUpload} />
      {showTick && <TickIcon data-testid="TickIcon" fontSize="small" />}
    </StyledButton>
  );
};

export default CdfUploadButton;
