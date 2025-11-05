import React from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import img from '@/core/assets/images/verified.png';
import type { VerifiedModalPopupProps } from '@core/types';

// 🔹 Styled Components

const StyledOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  inset: 0, // shorthand for top/left/right/bottom: 0
  backgroundColor: theme.palette.action.disabledBackground, // semi-transparent overlay tone
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: theme.zIndex.modal,
}));

const StyledModal = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: (theme.shape.borderRadius as number) * 2,
  width: theme.spacing(45), // responsive 360px = 8px * 45
  textAlign: 'center',
  boxShadow: theme.shadows[6],
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(4),
  paddingInline: theme.spacing(3),
  transition: theme.transitions.create(['transform', 'opacity'], {
    duration: theme.transitions.duration.short,
  }),
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '55%',
  height: 'auto',
  objectFit: 'contain',
  margin: theme.spacing(2, 0),
}));

const StyledActionButton = styled(Button)(({ theme }) => ({
  height: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  fontWeight: theme.typography.button.fontWeight,
  fontSize: theme.typography.button.fontSize,
  fontFamily: theme.typography.fontFamily,
  textTransform: 'none',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.getContrastText(theme.palette.secondary.main),
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

// 🔹 Main Component
const VerifiedModalPopup: React.FC<VerifiedModalPopupProps> = ({
  titleText = 'Thank you for updating your Corporate KYC!',
  descriptionText = 'Click the button below to get started with dedupe',
  actionButtonLabel = 'Initiate Dedupe',
  onAction,
}) => {
  const theme = useTheme();

  const handleAction = () => {
    onAction?.();
  };

  return (
    <StyledOverlay data-testid="overlay">
      <StyledModal onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>
          {/* Title */}
          <Grid>
            <Typography
              variant="h6"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontWeight: theme.typography.h6?.fontWeight,
                fontSize: theme.typography.h6?.fontSize,
                color: theme.palette.text.primary,
              }}
            >
              {titleText}
            </Typography>
          </Grid>

          {/* Image */}
          <Grid>
            <StyledImage src={img} alt="Popup Illustration" />
          </Grid>

          {/* Description */}
          <Grid>
            <Typography
              variant="body2"
              align="center"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.body2?.fontSize,
                fontWeight: theme.typography.body2?.fontWeight,
                color: theme.palette.text.secondary,
                marginTop: theme.spacing(1),
              }}
            >
              {descriptionText}
            </Typography>
          </Grid>

          {/* Action Button */}
          <Grid sx={{ width: '100%', marginTop: theme.spacing(2) }}>
            <StyledActionButton
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleAction}
            >
              {actionButtonLabel}
            </StyledActionButton>
          </Grid>
        </Grid>
      </StyledModal>
    </StyledOverlay>
  );
};

export default VerifiedModalPopup;
