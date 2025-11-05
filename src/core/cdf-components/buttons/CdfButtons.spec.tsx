import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CdfSubmitButton, CdfDeleteButton, CdfCancelButton, CdfIconButton } from './CdfButtons';
import { Add, Edit } from '@mui/icons-material';

// 🧩 Basic render tests
describe('CdfButtons', () => {
  it('renders CdfSubmitButton with default label', () => {
    render(<CdfSubmitButton />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders CdfDeleteButton with default label', () => {
    render(<CdfDeleteButton />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders CdfCancelButton with default label', () => {
    render(<CdfCancelButton />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<CdfSubmitButton label="Save" />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders CdfIconButton with icon only', () => {
    render(<CdfIconButton icon={<Add />} label="Add" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders CdfIconButton with label and variant', () => {
    render(<CdfIconButton icon={<Edit />} label="Edit" variant="contained" />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('renders CdfIconButton with label only (no variant)', () => {
    render(<CdfIconButton icon={<Add />} label="Add Item" />);
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('renders buttons with custom colors', () => {
    render(<CdfSubmitButton color="success" />);
    render(<CdfDeleteButton color="warning" />);
    render(<CdfCancelButton color="info" />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
});

// 🧪 Interaction tests
describe('CdfButtons interactions', () => {
  it('calls onClick when CdfSubmitButton is clicked', () => {
    const handleClick = vi.fn();
    render(<CdfSubmitButton onClick={handleClick} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when CdfDeleteButton is clicked', () => {
    const handleClick = vi.fn();
    render(<CdfDeleteButton onClick={handleClick} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when CdfCancelButton is clicked', () => {
    const handleClick = vi.fn();
    render(<CdfCancelButton onClick={handleClick} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when CdfIconButton is clicked', () => {
    const handleClick = vi.fn();
    render(<CdfIconButton icon={<Add />} label="Add" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
