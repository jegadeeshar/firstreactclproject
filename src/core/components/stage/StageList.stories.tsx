import type { Meta, StoryObj } from '@storybook/react-vite';
import { StageList } from './index';
import { mockStageData } from '@core/constants/mockData';
import { STAGE_STATUS } from '@core/constants/stageConstants';

const meta: Meta<typeof StageList> = {
  title: 'CDF Components/Stage/StageList',
  component: StageList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StageList>;

export const Default: Story = {
  args: {
    stages: mockStageData.stages,
  },
};

export const WithExpandedStages: Story = {
  args: {
    stages: mockStageData.stages,
    expandedStageIds: ['stage-1'],
  },
};

export const WithActions: Story = {
  args: {
    stages: mockStageData.stages,
    onStageAction: (stageId, action) => {
      console.log(`Stage ${stageId} - Action: ${action}`);
    },
    onSubItemClick: (stageId, subItemId) => {
      console.log(`Stage ${stageId} - Sub-item: ${subItemId}`);
    },
  },
};

export const ButtonVisibilityDemo: Story = {
  args: {
    stages: [
      {
        id: 'pending-stage',
        stageNumber: 1,
        title: 'Pending Stage',
        description: 'This stage is pending',
        status: STAGE_STATUS.PENDING,
        isPreLogin: false,
        hasUpdateAction: false,
        hasSummaryAction: false,
        hasContinueAction: true,
        subItems: [],
      },
      {
        id: 'in-progress-stage',
        stageNumber: 2,
        title: 'In-Progress Stage',
        description: 'This stage is in progress',
        status: STAGE_STATUS.IN_PROGRESS,
        isPreLogin: false,
        hasUpdateAction: false,
        hasSummaryAction: true,
        hasContinueAction: false,
        subItems: [
          { id: 'step-1', label: 'Step 1', completed: true },
          { id: 'step-2', label: 'Step 2', completed: false },
        ],
      },
      {
        id: 'completed-stage',
        stageNumber: 3,
        title: 'Completed Stage',
        description: 'This stage is completed',
        status: STAGE_STATUS.COMPLETED,
        isPreLogin: false,
        hasUpdateAction: true,
        hasSummaryAction: true,
        hasContinueAction: false,
        subItems: [
          { id: 'step-1', label: 'Step 1', completed: true },
          { id: 'step-2', label: 'Step 2', completed: true },
        ],
      },
    ],
    onStageAction: (stageId, action) => {
      console.log(`Stage ${stageId} - Action: ${action}`);
    },
    onSubItemClick: (stageId, subItemId) => {
      console.log(`Stage ${stageId} - Sub-item: ${subItemId}`);
    },
  },
};

export const StepperMode: Story = {
  args: {
    stages: mockStageData.stages,
    mode: 'stepper',
    currentStep: 0,
    onStepChange: (step) => {
      console.log(`Step changed to: ${step}`);
    },
    onStageAction: (stageId, action) => {
      console.log(`Stage ${stageId} - Action: ${action}`);
    },
  },
};

export const StepperModeWithProgress: Story = {
  args: {
    stages: mockStageData.stages.map((stage, index) => ({
      ...stage,
      status: index === 0 ? 'completed' : index === 1 ? 'in-progress' : 'pending',
    })),
    mode: 'stepper',
    currentStep: 1,
    onStepChange: (step) => {
      console.log(`Step changed to: ${step}`);
    },
    onStageAction: (stageId, action) => {
      console.log(`Stage ${stageId} - Action: ${action}`);
    },
  },
};

export const StageItemUsage: Story = {
  args: {
    stages: [
      {
        id: 'demo-stage',
        stageNumber: 1,
        title: 'Document Verification',
        description:
          'Upload and verify your identity documents to proceed with the application process.',
        status: STAGE_STATUS.COMPLETED,
        isPreLogin: false,
        hasUpdateAction: true,
        hasSummaryAction: true,
        hasContinueAction: false,
        subItems: [
          { id: 'upload-id', label: 'Upload ID Document', completed: true },
          { id: 'verify-address', label: 'Verify Address Proof', completed: true },
          { id: 'selfie-check', label: 'Selfie Verification', completed: true },
        ],
      },
    ],
    expandedStageIds: ['demo-stage'],
    onStageAction: (stageId, action) => {
      console.log(`Stage ${stageId} - Action: ${action}`);
    },
    onSubItemClick: (stageId, subItemId) => {
      console.log(`Stage ${stageId} - Sub-item: ${subItemId}`);
    },
    onStageToggle: (stageId) => {
      console.log(`Stage ${stageId} - Accordion toggled`);
    },
  },
};
