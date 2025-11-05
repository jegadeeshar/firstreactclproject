import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from '@core/theme';
import StageStatusIcon from './StageStatusIcon';
import { STAGE_STATUS } from '@core/constants/stageConstants';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={customTheme}>{ui}</ThemeProvider>);
};

describe('StageStatusIcon', () => {
  it('renders completed status icon', () => {
    const { container } = renderWithTheme(<StageStatusIcon status={STAGE_STATUS.COMPLETED} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders in-progress status icon', () => {
    const { container } = renderWithTheme(<StageStatusIcon status={STAGE_STATUS.IN_PROGRESS} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders pending status icon', () => {
    const { container } = renderWithTheme(<StageStatusIcon status={STAGE_STATUS.PENDING} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = renderWithTheme(
      <StageStatusIcon status={STAGE_STATUS.COMPLETED} size={60} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles invalid status (default case)', () => {
    const { container } = renderWithTheme(<StageStatusIcon status={'invalid' as STAGE_STATUS} />);
    expect(container.firstChild).toBeNull();
  });
});
