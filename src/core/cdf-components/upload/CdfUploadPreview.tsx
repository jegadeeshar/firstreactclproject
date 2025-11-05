import React, { useState } from 'react';
import { Box, type BoxProps, Typography, IconButton, styled } from '@mui/material';
import type { CdfUploadPreviewProps } from '@core/types';
import VisibilityIcon from '@core/assets/Icons/VisibilityIcon.svg';
import DeleteIcon from '@core/assets/Icons/DeleteIcon.svg';
import { getThumbnailIcon } from '@core/utils/commonUtils';
import CdfPreview from '@cdf-components/preview/CdfPreview';

// Changed the Mui Box component to StyledUploadBox
const StyledUploadBox = styled((props: BoxProps) => <Box {...props} />)(({ theme }) => ({
  display: 'flex',
  width: 300,
  height: 50,
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}`,
  gap: theme.spacing(1),
}));

// Cdf Upload Preview Component
const CdfUploadPreview: React.FC<CdfUploadPreviewProps> = ({
  title, // Uploaded Document name EG: Aadhaar
  type, // Uploaded Document Type Eg: JPEG
  disabled = false, // Disables all action buttons when true
  onDelete, // Triggered when the delete icon is clicked
  previewUrl = '', // URL of the Image Document
}) => {
  const [openPreview, setOpenPreview] = useState(false);

  // Opens the Cdf-preview modal when the document view icon is clicked
  const handlePreview = () => {
    if (previewUrl) setOpenPreview(true);
  };

  // Closes the Cdf-preview modal
  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <>
      <StyledUploadBox>
        <Box sx={{ width: 44, height: 30, ml: 1.25 }}>
          <img src={getThumbnailIcon(title)} />
        </Box>

        <Box textAlign="left" sx={{ width: 180, height: 28 }}>
          <Typography
            variant="body2"
            sx={(theme) => ({
              m: 0,
              lineHeight: 0.7,
              color: theme.palette.primary.main,
            })}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={(theme) => ({
              color: theme.palette.secondary.main,
            })}
          >
            {type}
          </Typography>
        </Box>

        {previewUrl && (
          <IconButton onClick={handlePreview} disabled={disabled} size="small">
            <img src={VisibilityIcon} />
          </IconButton>
        )}

        {onDelete && (
          <IconButton
            onClick={onDelete}
            disabled={disabled}
            size="small"
            sx={(theme) => ({
              color: theme.palette.error.main,
            })}
          >
            <img src={DeleteIcon} />
          </IconButton>
        )}
      </StyledUploadBox>

      <CdfPreview
        open={openPreview}
        imageUrl={previewUrl}
        onClose={handleClosePreview}
        title={title}
      />
    </>
  );
};

export default CdfUploadPreview;
