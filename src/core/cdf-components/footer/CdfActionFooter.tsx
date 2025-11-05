import React from 'react';
import { Box, type BoxProps } from '@mui/material';
import {
  CdfCancelButton,
  CdfDeleteButton,
  CdfSubmitButton,
} from '@cdf-components/buttons/CdfButtons';
import styled from '@emotion/styled';
import type { CdfActionFooterProps } from '@core/types';
import { useLoaderStore } from '@/core/store';

// custom styled footer component
const StyledFooter = styled((props: BoxProps) => <Box component="footer" {...props} />)(
  ({ theme }) => ({
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.primary.light}`,
    width: '100%',
    margin: 0,
    boxSizing: 'border-box',
  })
);

// custom styled box for buttons alignment
const StyledBox = styled((props: BoxProps) => <Box {...props} />)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
}));

const CdfActionFooter: React.FC<CdfActionFooterProps> = ({
  closeButtonLabel = 'Cancel',
  submitButtonLabel = 'Submit',
  deleteButtonLabel = 'Delete',
  onClose,
  onSubmit,
  onDelete,
}) => {
  const { showLoader, hideLoader } = useLoaderStore();

  // Handle loader hide/show
  const handleAction =
    (actionFn?: (e?: React.MouseEvent) => Promise<void> | void) =>
    async (event: React.MouseEvent): Promise<void> => {
      event.preventDefault(); // stop the browser from submitting the form
      if (!actionFn) return;
      try {
        showLoader();
        await actionFn(event);
      } finally {
        hideLoader();
      }
    };

  return (
    <StyledFooter>
      <Box>{onClose && <CdfCancelButton label={closeButtonLabel} onClick={onClose} />}</Box>
      <StyledBox>
        {onDelete && <CdfDeleteButton label={deleteButtonLabel} onClick={handleAction(onDelete)} />}
        {onSubmit && <CdfSubmitButton label={submitButtonLabel} onClick={handleAction(onSubmit)} />}
      </StyledBox>
    </StyledFooter>
  );
};

export default CdfActionFooter;
