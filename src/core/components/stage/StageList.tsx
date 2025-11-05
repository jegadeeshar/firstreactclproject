import { type FC, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import type { StageListProps } from '@core/types/stageTypes';
import StageItem from '@core/components/stage/StageItem';
import { CdfStepper } from '@core/cdf-components/stepper';

const StageList: FC<StageListProps> = ({
  stages,
  mode = 'timeline', // Default to timeline mode
  currentStep = 0,
  expandedStageIds: controlledExpandedIds,
  onStageToggle,
  onStepChange,
  onStageAction,
  onSubItemClick,
}) => {
  const theme = useTheme();
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>([]);
  const expandedIds =
    controlledExpandedIds !== undefined ? controlledExpandedIds : internalExpandedIds;

  const handleToggleExpand = (stageId: string) => {
    if (onStageToggle) {
      onStageToggle(stageId);
    } else {
      setInternalExpandedIds((prev) =>
        prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId]
      );
    }
  };

  const handleStageAction = (stageId: string, action: 'update' | 'summary' | 'continue') => {
    if (onStageAction) {
      onStageAction(stageId, action);
    }
  };

  const handleSubItemClick = (stageId: string, subItemId: string) => {
    if (onSubItemClick) {
      onSubItemClick(stageId, subItemId);
    }
  };

  const handleStepChange = (itemId: string) => {
    // Find the step index by item ID
    const stepIndex = stages.findIndex((stage) => stage.id === itemId);
    if (stepIndex !== -1 && onStepChange) {
      onStepChange(stepIndex);
    }
  };

  // Convert stages to stepper items
  const stepperItems = stages.map((stage) => ({
    id: stage.id,
    label: stage.title,
    completed: stage.status === 'completed',
  }));

  if (mode === 'stepper') {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: theme.customProperties?.sidebarWidth,
          mx: 'auto',
          py: 3,
        }}
      >
        {/* Stepper Navigation */}
        <Box sx={{ mb: 4 }}>
          <CdfStepper
            items={stepperItems}
            orientation="horizontal"
            onItemClick={handleStepChange}
            iconSize={40}
          />
        </Box>

        {/* Current Stage Content */}
        {stages[currentStep] && (
          <StageItem
            key={stages[currentStep].id}
            stage={stages[currentStep]}
            isExpanded={expandedIds.includes(stages[currentStep].id)}
            onToggleExpand={() => handleToggleExpand(stages[currentStep].id)}
            onUpdate={() => handleStageAction(stages[currentStep].id, 'update')}
            onSummary={() => handleStageAction(stages[currentStep].id, 'summary')}
            onContinue={() => handleStageAction(stages[currentStep].id, 'continue')}
            onSubItemClick={(subItemId) => handleSubItemClick(stages[currentStep].id, subItemId)}
            showConnector={false}
          />
        )}
      </Box>
    );
  }

  // Timeline mode (existing behavior)
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: theme.customProperties?.sidebarWidth,
        mx: 'auto',
        py: 3,
      }}
    >
      {stages.map((stage, index) => (
        <StageItem
          key={stage.id}
          stage={stage}
          isExpanded={expandedIds.includes(stage.id)}
          onToggleExpand={() => handleToggleExpand(stage.id)}
          onUpdate={() => handleStageAction(stage.id, 'update')}
          onSummary={() => handleStageAction(stage.id, 'summary')}
          onContinue={() => handleStageAction(stage.id, 'continue')}
          onSubItemClick={(subItemId) => handleSubItemClick(stage.id, subItemId)}
          showConnector={index < stages.length - 1}
        />
      ))}
    </Box>
  );
};

export default StageList;
