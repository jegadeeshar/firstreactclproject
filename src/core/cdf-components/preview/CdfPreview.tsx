import React from 'react';
import { Modal, Box, IconButton, Typography, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { CdfPreviewProps } from '@core/types';

// Styled Components to use in cdf preview component
const StyledModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[6],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  outline: 'none',
  maxWidth: '90vw',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const StyledImageContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
}));

// Cdf Preview Component
const CdfPreview: React.FC<CdfPreviewProps> = ({
  open = false, // Controls modal visibility
  imageUrl, // Image URL
  title = 'preview', // Modal title
  onClose, // Close callback
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="image-preview-title" closeAfterTransition>
      <StyledModalContainer>
        <StyledHeader>
          <Typography
            id="image-preview-title"
            variant="h6"
            sx={(theme) => ({
              color: theme.palette.primary.main,
            })}
          >
            {title}
          </Typography>

          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </StyledHeader>

        <StyledImageContainer>
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </StyledImageContainer>
      </StyledModalContainer>
    </Modal>
  );
};

export default CdfPreview;
