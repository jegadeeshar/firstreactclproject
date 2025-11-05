import { type FC } from 'react';
import { Box, useTheme } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { STAGE_STATUS } from '@core/constants/stageConstants';
import type { StageStatusIconProps } from '@core/types/stageTypes';

const StageStatusIcon: FC<StageStatusIconProps> = ({ status, size = 30 }) => {
  const theme = useTheme();

  const getStatusIcon = () => {
    switch (status) {
      case STAGE_STATUS.IN_PROGRESS:
        return (
          <Box
            sx={{
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: theme.palette.info.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HourglassEmptyIcon sx={{ color: theme.palette.white.main, fontSize: size * 0.6 }} />
          </Box>
        );
      case STAGE_STATUS.COMPLETED:
        return <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: size }} />;
      case STAGE_STATUS.PENDING:
        return <ScheduleIcon sx={{ color: theme.palette.grey[500], fontSize: size }} />;
      default:
        return null;
    }
  };

  return <>{getStatusIcon()}</>;
};

export default StageStatusIcon;
