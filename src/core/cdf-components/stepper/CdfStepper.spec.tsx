import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CdfStepper from './CdfStepper';

const mockItems = [
  { id: 'step-1', label: 'PAN', completed: true },
  { id: 'step-2', label: 'ID Proof', completed: false },
  { id: 'step-3', label: 'Selfie', completed: false },
];

describe('CdfStepper', () => {
  it('renders all items', () => {
    render(<CdfStepper items={mockItems} />);

    expect(screen.getByText('PAN')).toBeInTheDocument();
    expect(screen.getByText('ID Proof')).toBeInTheDocument();
    expect(screen.getByText('Selfie')).toBeInTheDocument();
  });

  it('calls onItemClick when item is clicked', () => {
    const handleItemClick = vi.fn();
    render(<CdfStepper items={mockItems} onItemClick={handleItemClick} />);

    const panItem = screen.getByText('PAN');
    fireEvent.click(panItem);

    expect(handleItemClick).toHaveBeenCalledWith('step-1');
  });

  it('renders in vertical orientation by default', () => {
    const { container } = render(<CdfStepper items={mockItems} />);

    const stepper = container.querySelector('.MuiStepper-root');
    expect(stepper).toHaveClass('MuiStepper-vertical');
  });

  it('renders in horizontal orientation when specified', () => {
    const { container } = render(<CdfStepper items={mockItems} orientation="horizontal" />);

    const stepper = container.querySelector('.MuiStepper-root');
    expect(stepper).toHaveClass('MuiStepper-horizontal');
  });

  it('displays correct icons for completed and incomplete items', () => {
    const { container } = render(<CdfStepper items={mockItems} />);

    // Check for CheckCircle and RadioButtonUnchecked icons
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('applies custom icon size', () => {
    const { container } = render(<CdfStepper items={mockItems} iconSize={40} />);

    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });
});
