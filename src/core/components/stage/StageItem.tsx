import { type FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { StageItemProps } from '@core/types/stageTypes';
import { STAGE_STATUS } from '@core/constants/stageConstants';
import StageStatusIcon from '@core/components/stage/StageStatusIcon';
import StageActions from '@core/components/stage/StageActions';
import { CdfStepper } from '@core/cdf-components/stepper';
import CdfLinkAccordion from '@/core/cdf-components/accordion/CdfLinkAccordion';
import { getStatusLabel, getStatusColor } from '@core/utils/stageUtils';

const StageItem: FC<StageItemProps> = ({
  stage,
  onUpdate,
  onSummary,
  onContinue,
  onSubItemClick,
  showConnector = true,
}) => {
  const theme = useTheme();
  const hasExpandableContent = stage.subItems && stage.subItems.length > 0;

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Vertical connector line */}
      {showConnector && (
        <Box
          sx={{
            position: 'absolute',
            left: 30,
            top: 80,
            bottom: -1,
            width: 2,
            backgroundColor: theme.palette.grey[200],
            zIndex: 0,
          }}
        />
      )}

      {/* Stage content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          backgroundColor:
            stage.status === STAGE_STATUS.IN_PROGRESS ? theme.palette.grey[100] : 'white',
          borderRadius: 2,
          p: 2,
          mb: 2,
        }}
      >
        {/* Stage header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          {/* Status icon */}
          <StageStatusIcon status={stage.status} size={32} />

          {/* Stage content */}
          <Box sx={{ flex: 1, position: 'relative' }}>
            {/* Status label and stage number */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: getStatusColor(stage.status, theme),
                  textTransform: 'capitalize',
                }}
              >
                {getStatusLabel(stage.status)}
              </Typography>
            </Box>

            {/* Stage title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <Typography variant="h6">
                {stage.isPreLogin ? 'PRE-LOGIN' : `STAGE ${stage.stageNumber}`}
              </Typography>
            </Box>

            {/* Stage name and info icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <Typography variant="body1">{stage.title}</Typography>
              <InfoOutlinedIcon sx={{ fontSize: 16, color: theme.palette.grey[300] }} />
            </Box>

            {/* Stage description */}
            <Typography variant="body2" sx={{ color: theme.palette.grey[500], mb: 1 }}>
              {stage.description}
            </Typography>

            {/* Expandable sub-items - show for in-progress and completed stages */}
            {hasExpandableContent &&
              (stage.status === STAGE_STATUS.IN_PROGRESS ||
                stage.status === STAGE_STATUS.COMPLETED) && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CdfLinkAccordion expandedText="View Less" collapsedText="More Details">
                    <Box sx={{ mt: 1 }}>
                      <CdfStepper
                        items={stage.subItems}
                        orientation="vertical"
                        onItemClick={onSubItemClick}
                        iconSize={24}
                      />
                    </Box>
                  </CdfLinkAccordion>
                </Box>
              )}
          </Box>

          {/* Action buttons - show for all stages except in-progress */}
          {stage.status !== STAGE_STATUS.IN_PROGRESS && (
            <StageActions
              hasUpdateAction={stage.hasUpdateAction}
              hasSummaryAction={stage.hasSummaryAction}
              hasContinueAction={stage.hasContinueAction}
              onUpdate={onUpdate}
              onSummary={onSummary}
              onContinue={onContinue}
              stageStatus={stage.status}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StageItem;
