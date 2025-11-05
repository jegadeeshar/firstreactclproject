import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StageActions from './StageActions';
import { STAGE_STATUS } from '@core/constants/stageConstants';

describe('StageActions', () => {
  it('renders continue button for pending status', () => {
    const onContinue = vi.fn();
    render(
      <StageActions
        hasUpdateAction={false}
        hasSummaryAction={false}
        hasContinueAction={true}
        stageStatus={STAGE_STATUS.PENDING}
        onContinue={onContinue}
      />
    );

    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();

    fireEvent.click(continueButton);
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it('renders update button for completed status', () => {
    const onUpdate = vi.fn();
    render(
      <StageActions
        hasUpdateAction={true}
        hasSummaryAction={false}
        hasContinueAction={false}
        stageStatus={STAGE_STATUS.COMPLETED}
        onUpdate={onUpdate}
      />
    );

    const updateButton = screen.getByText('Update');
    expect(updateButton).toBeInTheDocument();

    fireEvent.click(updateButton);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('renders summary button for completed status', () => {
    const onSummary = vi.fn();
    render(
      <StageActions
        hasUpdateAction={false}
        hasSummaryAction={true}
        hasContinueAction={false}
        stageStatus={STAGE_STATUS.COMPLETED}
        onSummary={onSummary}
      />
    );

    const summaryButton = screen.getByText('Summary');
    expect(summaryButton).toBeInTheDocument();

    fireEvent.click(summaryButton);
    expect(onSummary).toHaveBeenCalledTimes(1);
  });

  it('renders summary button for in-progress status', () => {
    const onSummary = vi.fn();
    render(
      <StageActions
        hasUpdateAction={false}
        hasSummaryAction={true}
        hasContinueAction={false}
        stageStatus={STAGE_STATUS.IN_PROGRESS}
        onSummary={onSummary}
      />
    );

    const summaryButton = screen.getByText('Summary');
    expect(summaryButton).toBeInTheDocument();
  });

  it('does not render summary button for pending status', () => {
    render(
      <StageActions
        hasUpdateAction={false}
        hasSummaryAction={true}
        hasContinueAction={false}
        stageStatus={STAGE_STATUS.PENDING}
      />
    );

    expect(screen.queryByText('Summary')).not.toBeInTheDocument();
  });

  it('does not render update button for non-completed status', () => {
    render(
      <StageActions
        hasUpdateAction={true}
        hasSummaryAction={false}
        hasContinueAction={false}
        stageStatus={STAGE_STATUS.PENDING}
      />
    );

    expect(screen.queryByText('Update')).not.toBeInTheDocument();
  });

  it('does not render continue button for non-pending status', () => {
    render(
      <StageActions
        hasUpdateAction={false}
        hasSummaryAction={false}
        hasContinueAction={true}
        stageStatus={STAGE_STATUS.COMPLETED}
      />
    );

    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
  });

  it('renders multiple buttons when conditions are met', () => {
    render(
      <StageActions
        hasUpdateAction={true}
        hasSummaryAction={true}
        hasContinueAction={true}
        stageStatus={STAGE_STATUS.COMPLETED}
      />
    );

    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.queryByText('Continue')).not.toBeInTheDocument(); // Not for completed status
  });

  it('renders no buttons when no actions are enabled', () => {
    const { container } = render(
      <StageActions
        hasUpdateAction={false}
        hasSummaryAction={false}
        hasContinueAction={false}
        stageStatus={STAGE_STATUS.PENDING}
      />
    );

    expect(container.firstChild?.childNodes).toHaveLength(0);
  });
});
