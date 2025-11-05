import React from 'react';
import { CircularProgress, Box, styled } from '@mui/material';
import { useLoaderStore } from '@/core/store';

const LoaderOverlay: React.FC = () => {
  const { isLoading } = useLoaderStore();
  if (!isLoading) return null;

  const StyledBox = styled(Box)(({ theme }) => ({
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    opacity: 0.7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.modal + 1,
  }));

  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
};

export default LoaderOverlay;
