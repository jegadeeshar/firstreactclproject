import { type FC } from 'react';
import { Box } from '@mui/material';
import { CdfIconButton } from '@core/cdf-components/buttons/CdfButtons';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { StageActionsProps } from '@core/types/stageTypes';
import { STAGE_STATUS } from '@core/constants/stageConstants';

const StageActions: FC<StageActionsProps & { stageStatus?: STAGE_STATUS }> = ({
  hasUpdateAction,
  hasSummaryAction,
  hasContinueAction,
  onUpdate,
  onSummary,
  onContinue,
  stageStatus,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {/* Continue button only for pending status */}
      {hasContinueAction && stageStatus === STAGE_STATUS.PENDING && (
        <CdfIconButton
          icon={<ArrowForwardIcon />}
          label="Continue"
          variant="contained"
          size="small"
          onClick={onContinue}
        />
      )}
      {/* Update button only for completed status */}
      {hasUpdateAction && stageStatus === STAGE_STATUS.COMPLETED && (
        <CdfIconButton icon={<EditIcon />} label="Update" size="small" onClick={onUpdate} />
      )}
      {/* Summary button for completed and in-progress statuses, not for pending */}
      {hasSummaryAction && stageStatus !== STAGE_STATUS.PENDING && (
        <CdfIconButton icon={<VisibilityIcon />} label="Summary" size="small" onClick={onSummary} />
      )}
    </Box>
  );
};

export default StageActions;
