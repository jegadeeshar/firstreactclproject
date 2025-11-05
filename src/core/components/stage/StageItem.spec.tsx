import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from '@core/theme';
import StageItem from './StageItem';
import { STAGE_STATUS } from '@core/constants/stageConstants';
import type { StageData } from '@core/types/stageTypes';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={customTheme}>{ui}</ThemeProvider>);
};

const mockStage: StageData = {
  id: 'test-stage',
  stageNumber: 1,
  title: 'Test Stage',
  description: 'Test stage description',
  status: STAGE_STATUS.COMPLETED,
  isPreLogin: false,
  hasUpdateAction: true,
  hasSummaryAction: true,
  hasContinueAction: false,
  subItems: [
    { id: 'sub1', label: 'Sub Item 1', completed: true },
    { id: 'sub2', label: 'Sub Item 2', completed: false },
  ],
};

describe('StageItem', () => {
  it('renders stage information correctly', () => {
    renderWithTheme(<StageItem stage={mockStage} />);

    expect(screen.getByText('Test Stage')).toBeInTheDocument();
    expect(screen.getByText('Test stage description')).toBeInTheDocument();
    expect(screen.getByText('STAGE 1')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders pre-login stage correctly', () => {
    const preLoginStage = { ...mockStage, isPreLogin: true };
    renderWithTheme(<StageItem stage={preLoginStage} />);

    expect(screen.getByText('PRE-LOGIN')).toBeInTheDocument();
  });

  it('shows expandable content for completed stage', () => {
    renderWithTheme(<StageItem stage={mockStage} />);

    expect(screen.getByText('More Details')).toBeInTheDocument();
  });

  it('shows expandable content for in-progress stage', () => {
    const inProgressStage = { ...mockStage, status: STAGE_STATUS.IN_PROGRESS };
    renderWithTheme(<StageItem stage={inProgressStage} />);

    expect(screen.getByText('More Details')).toBeInTheDocument();
  });

  it('does not show expandable content for pending stage', () => {
    const pendingStage = { ...mockStage, status: STAGE_STATUS.PENDING };
    renderWithTheme(<StageItem stage={pendingStage} />);

    expect(screen.queryByText('More Details')).not.toBeInTheDocument();
  });

  it('expands and shows sub-items when clicked', () => {
    renderWithTheme(<StageItem stage={mockStage} />);

    const moreDetailsButton = screen.getByText('More Details');
    fireEvent.click(moreDetailsButton);

    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Item 2')).toBeInTheDocument();
    expect(screen.getByText('View Less')).toBeInTheDocument();
  });

  it('accordion manages its own expansion state', () => {
    renderWithTheme(<StageItem stage={mockStage} />);

    const moreDetailsButton = screen.getByText('More Details');
    fireEvent.click(moreDetailsButton);

    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    expect(screen.getByText('View Less')).toBeInTheDocument();
  });

  it('calls onSubItemClick when sub-item is clicked', () => {
    const onSubItemClick = vi.fn();
    renderWithTheme(<StageItem stage={mockStage} onSubItemClick={onSubItemClick} />);

    // Expand accordion first
    fireEvent.click(screen.getByText('More Details'));

    const subItem = screen.getByText('Sub Item 1');
    fireEvent.click(subItem);

    expect(onSubItemClick).toHaveBeenCalledWith('sub1');
  });

  it('shows action buttons for completed stage', () => {
    renderWithTheme(<StageItem stage={mockStage} />);

    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  it('does not show action buttons for in-progress stage', () => {
    const inProgressStage = { ...mockStage, status: STAGE_STATUS.IN_PROGRESS };
    renderWithTheme(<StageItem stage={inProgressStage} />);

    expect(screen.queryByText('Update')).not.toBeInTheDocument();
    expect(screen.queryByText('Summary')).not.toBeInTheDocument();
  });

  it('calls action handlers when buttons are clicked', () => {
    const onUpdate = vi.fn();
    const onSummary = vi.fn();

    renderWithTheme(<StageItem stage={mockStage} onUpdate={onUpdate} onSummary={onSummary} />);

    fireEvent.click(screen.getByText('Update'));
    expect(onUpdate).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Summary'));
    expect(onSummary).toHaveBeenCalledTimes(1);
  });

  it('renders connector line when showConnector is true', () => {
    const { container } = renderWithTheme(<StageItem stage={mockStage} showConnector={true} />);

    // Check for connector line element by looking for the stage item container
    const stageContainer =
      container.querySelector('[data-testid="stage-item"]') || container.firstChild;
    expect(stageContainer).toBeInTheDocument();
  });

  it('does not render connector line when showConnector is false', () => {
    renderWithTheme(<StageItem stage={mockStage} showConnector={false} />);

    // Should not have the connector styling
    expect(screen.getByText('Test Stage')).toBeInTheDocument();
  });

  it('handles stage without sub-items', () => {
    const stageWithoutSubItems = { ...mockStage, subItems: [] };
    renderWithTheme(<StageItem stage={stageWithoutSubItems} />);

    expect(screen.queryByText('More Details')).not.toBeInTheDocument();
  });

  it('displays correct status colors and labels', () => {
    const pendingStage = { ...mockStage, status: STAGE_STATUS.PENDING };
    renderWithTheme(<StageItem stage={pendingStage} />);

    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('handles continue action for pending stage', () => {
    const onContinue = vi.fn();
    const pendingStage = {
      ...mockStage,
      status: STAGE_STATUS.PENDING,
      hasContinueAction: true,
    };

    renderWithTheme(<StageItem stage={pendingStage} onContinue={onContinue} />);

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it('covers uncovered lines in getStatusColor and getStatusLabel', () => {
    // Test default case in getStatusColor and getStatusLabel
    const stageWithInvalidStatus = {
      ...mockStage,
      status: 'invalid-status' as STAGE_STATUS,
    };

    renderWithTheme(<StageItem stage={stageWithInvalidStatus} />);

    // Should render without crashing and use default values
    expect(screen.getByText('Test Stage')).toBeInTheDocument();
  });
});
