import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ApplicantToggleSelector from './ApplicantToggleSelector';

describe('ApplicantToggleSelector', () => {
  it('renders with default options', () => {
    const handleChange = vi.fn();
    render(<ApplicantToggleSelector value="applicant" onChange={handleChange} />);

    expect(screen.getByText('Applicant')).toBeInTheDocument();
    expect(screen.getByText('Co-Applicant')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ApplicantToggleSelector value="applicant" onChange={handleChange} />);

    await user.click(screen.getByText('Co-Applicant'));
    expect(handleChange).toHaveBeenCalledWith('co-applicant');
  });

  it('renders with custom options', () => {
    const customOptions = [
      { value: 'primary', label: 'Primary' },
      { value: 'secondary', label: 'Secondary' },
    ];
    const handleChange = vi.fn();
    render(<ApplicantToggleSelector value="primary" onChange={handleChange} options={customOptions} />);

    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });
});
