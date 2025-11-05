import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import CdfActionFooter from './CdfActionFooter';
import type { CdfButtonProps } from '@/core/types';

// ────────────────────────────────────────────────
// 🧩 Mock the useLoaderStore hook
// ────────────────────────────────────────────────
const mockShowLoader = vi.fn();
const mockHideLoader = vi.fn();

vi.mock('@/core/store', () => ({
  useLoaderStore: vi.fn(() => ({
    showLoader: mockShowLoader,
    hideLoader: mockHideLoader,
  })),
}));

// ────────────────────────────────────────────────
// 🧩 Mock button components to simplify testing
// (so we don't depend on MUI internals)
// ────────────────────────────────────────────────
vi.mock('@cdf-components/buttons/CdfButtons', () => ({
  CdfCancelButton: ({ label, onClick }: CdfButtonProps) => (
    <button onClick={onClick}>{label}</button>
  ),
  CdfDeleteButton: ({ label, onClick }: CdfButtonProps) => (
    <button onClick={onClick}>{label}</button>
  ),
  CdfSubmitButton: ({ label, onClick }: CdfButtonProps) => (
    <button onClick={onClick}>{label}</button>
  ),
}));

// ────────────────────────────────────────────────
// 🧪 Test setup
// ────────────────────────────────────────────────
const theme = createTheme();
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

// ────────────────────────────────────────────────
// 🧪 Test Suite
// ────────────────────────────────────────────────
describe('CdfActionFooter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all buttons when all handlers are provided', () => {
    renderWithTheme(
      <CdfActionFooter
        closeButtonLabel="Cancel"
        submitButtonLabel="Submit"
        deleteButtonLabel="Delete"
        onClose={() => {}}
        onSubmit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders only Submit when only onSubmit provided', () => {
    renderWithTheme(<CdfActionFooter onSubmit={() => {}} />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('renders only Cancel when only onClose provided', () => {
    renderWithTheme(<CdfActionFooter onClose={() => {}} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('renders only Delete when only onDelete provided', () => {
    renderWithTheme(<CdfActionFooter onDelete={() => {}} />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('calls onClose when Cancel clicked', () => {
    const onClose = vi.fn();
    renderWithTheme(<CdfActionFooter onClose={onClose} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit and toggles loader', async () => {
    const onSubmit = vi.fn();

    renderWithTheme(<CdfActionFooter onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockShowLoader).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(mockHideLoader).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onDelete and toggles loader', async () => {
    const onDelete = vi.fn();

    renderWithTheme(<CdfActionFooter onDelete={onDelete} />);

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockShowLoader).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(mockHideLoader).toHaveBeenCalledTimes(1);
    });
  });

  it('uses default labels if none provided', () => {
    renderWithTheme(<CdfActionFooter onClose={() => {}} onSubmit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders nothing if no handlers passed', () => {
    renderWithTheme(<CdfActionFooter />);
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});
