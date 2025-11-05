import { render, screen } from '@testing-library/react';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import '@testing-library/jest-dom';
import CdfLinkButton from './CdfLinkButton';

describe('CdfLinkButton Component', () => {
  test('renders the label correctly', () => {
    render(<CdfLinkButton label="VERIFIED" href="https://google.com" />);
    expect(screen.getByText(/VERIFIED/i)).toBeInTheDocument();
  });

  test('renders with the correct href', () => {
    render(<CdfLinkButton label="Go" href="https://example.com" />);
    const link = screen.getByRole('link', { name: /Go/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  test('renders icon when provided', () => {
    render(
      <CdfLinkButton
        label="VERIFIED"
        href="https://google.com"
        icon={<VerifiedOutlinedIcon data-testid="verify-icon" />}
      />
    );
    expect(screen.getByTestId('verify-icon')).toBeInTheDocument();
  });

  test('applies styling from theme', () => {
    render(<CdfLinkButton label="Styled" href="#" />);
    // MUI renders <a> tag for href, so use 'link' role
    const link = screen.getByRole('link', { name: /Styled/i });
    expect(link).toHaveClass('MuiButton-outlined');
  });
});
