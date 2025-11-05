import { type FC } from 'react';
import { Stepper, Step, StepLabel, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { CustomStepConnector } from '@core/constants/stageConstants';
import type { CdfStepperProps, CdfStepperItem } from '@core/types/stageTypes';

// Re-export types for external use
export type { CdfStepperProps, CdfStepperItem };

const CdfStepper: FC<CdfStepperProps> = ({
  items,
  orientation = 'vertical',
  onItemClick,
  iconSize = 18,
}) => {
  return (
    <Stepper
      orientation={orientation}
      connector={<CustomStepConnector />}
      sx={{
        '& .MuiStepConnector-root': {
          marginLeft: orientation === 'vertical' ? '12px' : 0,
        },
      }}
    >
      {items.map((item) => (
        <Step
          key={item.id}
          completed={item.completed}
          sx={{
            cursor: onItemClick ? 'pointer' : 'default',
            '&:hover': onItemClick && {
              backgroundColor: 'action.hover',
              borderRadius: 1,
            },
            '& .MuiStepLabel-root': {
              py: 1,
            },
            '& .MuiStepLabel-iconContainer': {
              pr: orientation === 'vertical' ? 2 : 1,
            },
          }}
          onClick={onItemClick ? () => onItemClick(item.id) : undefined}
        >
          <StepLabel
            icon={
              item.completed ? (
                <CheckCircleIcon
                  sx={{
                    color: 'success.main',
                    fontSize: iconSize,
                  }}
                />
              ) : (
                <ScheduleIcon
                  sx={{
                    color: 'grey.300',
                    fontSize: iconSize,
                  }}
                />
              )
            }
          >
            <Typography
              variant="body2"
              sx={{
                color: 'info.main',
                fontWeight: item.completed ? 'medium' : 'regular',
              }}
            >
              {item.label}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CdfStepper;
