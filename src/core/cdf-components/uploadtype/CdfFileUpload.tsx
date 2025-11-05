import React, { useRef } from 'react';
import { Box, Typography, styled } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UploadIcon from '@/core/assets/UploadIcon.svg';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';

type CdfFileUploadProps = {
  name: string;
  label?: string;
  required?: boolean;
  rules?: RegisterOptions;
  disabled?: boolean;
};

// Styled Boxes
const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledUploadBox = styled(Box)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  width: 300,
  height: 54,
  border: `1.5px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1.5),
  cursor: disabled ? 'not-allowed' : 'pointer',
}));

const StyledNoteBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  width: 300,
  justifyContent: 'flex-start',
}));

const CdfFileUpload: React.FC<CdfFileUploadProps> = ({
  name,
  label = 'Upload it from your files',
  required = false,
  rules = {},
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const control = useFormContext()?.control;

  const validationRules: RegisterOptions = {
    required: required ? 'File is required' : false,
    ...rules,
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  if (!control) {
    return (
      <Container>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => console.log(e.target.files?.[0])}
          accept=".jpeg,.jpg,.png"
          style={{ display: 'none' }}
        />
        <StyledUploadBox disabled={disabled} onClick={handleClick}>
          <img src={UploadIcon} alt="Upload icon" width={24} height={24} />
          <Typography>{label}</Typography>
        </StyledUploadBox>
        <StyledNoteBox>
          <InfoOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption">Note: Supported formats JPEG, JPG & PNG</Typography>
        </StyledNoteBox>
      </Container>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field, fieldState }) => (
        <Container>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => field.onChange(e.target.files?.[0] || null)}
            accept=".jpeg,.jpg,.png"
            style={{ display: 'none' }}
          />

          <StyledUploadBox disabled={disabled} onClick={handleClick}>
            <img src={UploadIcon} alt="Upload icon" width={24} height={24} />
            <Typography>{label}</Typography>
          </StyledUploadBox>

          {fieldState.error && (
            <Typography variant="caption" color="error" sx={{ mt: 1 }}>
              {fieldState.error.message}
            </Typography>
          )}

          <StyledNoteBox>
            <InfoOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">Note: Supported formats JPEG, JPG & PNG</Typography>
          </StyledNoteBox>
        </Container>
      )}
    />
  );
};

export default CdfFileUpload;
