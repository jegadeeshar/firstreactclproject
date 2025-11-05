import { STAGE_STATUS } from '@core/constants/stageConstants';

// Sub-item within a stage
export interface StageSubItem {
  /** Unique identifier for the sub-item */
  id: string;
  /** Display text for the sub-item */
  label: string;
  /** Whether the sub-item is completed */
  completed: boolean;
  /** Optional reason or additional context for the sub-item */
  reason?: string;
}

// Individual stage data
export interface StageData {
  /** Unique identifier for the stage */
  id: string;
  /** Optional stage number for ordering */
  stageNumber?: number;
  /** Main title of the stage */
  title: string;
  /** Detailed description of the stage */
  description: string;
  /** Current status of the stage */
  status: STAGE_STATUS;
  /** Whether this stage is accessible before login */
  isPreLogin: boolean;
  /** Whether the stage has an update action button */
  hasUpdateAction: boolean;
  /** Whether the stage has a summary action button */
  hasSummaryAction: boolean;
  /** Whether the stage has a continue action button */
  hasContinueAction: boolean;
  /** List of sub-items within this stage */
  subItems: StageSubItem[];
  /** Side of the timeline where stage appears */
  side?: 'left' | 'right';
}

// Props for individual stage item component
export interface StageItemProps {
  /** Stage data to display */
  stage: StageData;
  /** Whether the stage is currently expanded */
  isExpanded?: boolean;
  /** Callback when stage expand/collapse is toggled */
  onToggleExpand?: () => void;
  /** Callback when update action is clicked */
  onUpdate?: () => void;
  /** Callback when summary action is clicked */
  onSummary?: () => void;
  /** Callback when continue action is clicked */
  onContinue?: () => void;
  /** Callback when a sub-item is clicked */
  onSubItemClick?: (subItemId: string) => void;
  /** Whether to show connector line to next stage */
  showConnector?: boolean;
}

// Props for stage list container component
export interface StageListProps {
  /** Array of stages to display */
  stages: StageData[];
  /** Display mode - timeline or stepper */
  mode?: 'timeline' | 'stepper';
  /** Current active step (for stepper mode) */
  currentStep?: number;
  /** Array of expanded stage IDs */
  expandedStageIds?: string[];
  /** Callback when stage is toggled */
  onStageToggle?: (stageId: string) => void;
  /** Callback when step changes (for stepper mode) */
  onStepChange?: (step: number) => void;
  /** Callback when stage action is performed */
  onStageAction?: (stageId: string, action: 'update' | 'summary' | 'continue') => void;
  /** Callback when sub-item is clicked */
  onSubItemClick?: (stageId: string, subItemId: string) => void;
}

// Props for stage status icon component
export interface StageStatusIconProps {
  /** Status to display icon for */
  status: STAGE_STATUS;
  /** Size of the icon in pixels */
  size?: number;
}

// Props for stage actions component
export interface StageActionsProps {
  /** Whether to show update action button */
  hasUpdateAction: boolean;
  /** Whether to show summary action button */
  hasSummaryAction: boolean;
  /** Whether to show continue action button */
  hasContinueAction: boolean;
  /** Callback when update is clicked */
  onUpdate?: () => void;
  /** Callback when summary is clicked */
  onSummary?: () => void;
  /** Callback when continue is clicked */
  onContinue?: () => void;
}

// Props for stage sub-item component
export interface StageSubItemProps {
  /** Sub-item data to display */
  subItem: StageSubItem;
  /** Callback when sub-item is clicked */
  onClick?: () => void;
  /** Size of the icon in pixels */
  iconSize?: number;
}

// Props for stepper component
export interface CdfStepperItem {
  /** Unique identifier for the step */
  id: string;
  /** Display label for the step */
  label: string;
  /** Whether the step is completed */
  completed: boolean;
}

export interface CdfStepperProps {
  /** Array of stepper items to display */
  items: CdfStepperItem[];
  /** Orientation of the stepper */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when an item is clicked */
  onItemClick?: (itemId: string) => void;
  /** Size of the icons in pixels */
  iconSize?: number;
}
