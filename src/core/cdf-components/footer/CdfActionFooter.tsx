import React from 'react';
import { Box } from '@mui/material';
import {
  CdfCancelButton,
  CdfDeleteButton,
  CdfSubmitButton,
} from '@cdf-components/buttons/CdfButtons';
import type { CdfActionFooterProps } from '@core/types';
import { useLoaderStore } from '@/core/store';

const CdfActionFooter: React.FC<CdfActionFooterProps> = ({
  closeButtonLabel = 'Cancel',
  submitButtonLabel = 'Submit',
  deleteButtonLabel = 'Delete',
  onClose,
  onSubmit,
  onDelete,
}) => {
  const { showLoader, hideLoader } = useLoaderStore();

  const handleAction =
    (actionFn?: (e?: React.MouseEvent) => Promise<void> | void) =>
    async (event: React.MouseEvent): Promise<void> => {
      event.preventDefault();
      if (!actionFn) return;
      try {
        showLoader();
        await actionFn(event);
      } finally {
        hideLoader();
      }
    };

  return (
    <Box
      component="footer"
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        paddingX: 3,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'primary.light',
        width: '100%',
        margin: 0,
        boxSizing: 'border-box',
      }}
    >
      <Box>{onClose && <CdfCancelButton label={closeButtonLabel} onClick={onClose} />}</Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {onDelete && <CdfDeleteButton label={deleteButtonLabel} onClick={handleAction(onDelete)} />}
        {onSubmit && <CdfSubmitButton label={submitButtonLabel} onClick={handleAction(onSubmit)} />}
      </Box>
    </Box>
  );
};

export default CdfActionFooter;
