import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import CdfPanCard from './CdfPanCard';
import type { CdfInputButtonProps } from '@/core/types';

// Mock logger to avoid real logging
vi.mock('@/core/utils/loggerUtils', () => ({
  default: { debug: vi.fn() },
}));

// Mock CdfInputButton to simplify testing
vi.mock('./CdfInputButton', () => {
  return {
    default: ({ label, handleVerify, value }: CdfInputButtonProps) => (
      <button onClick={() => handleVerify(value as string)}>{label}</button>
    ),
  };
});

describe('CdfPanCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders CdfInputButton when not verified', () => {
    render(<CdfPanCard value="ABCDE1234F" />);

    expect(screen.getByRole('button', { name: /PAN/i })).toBeInTheDocument();
  });

  it('renders read-only TextField when verified', () => {
    render(<CdfPanCard value="ABCDE1234F" isVerified />);

    const input = screen.getByDisplayValue('ABCDE1234F');
    expect(input).toBeDisabled();
  });
});
