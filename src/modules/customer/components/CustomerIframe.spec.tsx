import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CustomerIframe from '@modules/customer/components/CustomerIfame';

const expectedIframeUrl =
  'https://stgleapkycfe.chola.murugappa.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJDRjAxMDM1IiwidXNlclR5cGUiOiJwZXJzb24iLCJtcyI6NjQ4LCJpYXQiOjE3NjEyMjE3MzgsImV4cCI6MTc2MTMwNzczOCwiaXNzIjoiY2hvbGFMZWFwIn0.Nk1Wg7tpG_KzhaH9lPdN1fePzHbH-_5CRpiLJiqr4FE&leadID=bbbc92c0-ab4b-11f0-9b6b-1b6164cb0529&leadDisplayID=16507418&role=sfe&roleID=ROL002&currentWorkStatus=Pending&customer_workstatus=completed&Box=leapdev01&needPipelineDedupe=true&channel=&isFastTrackUser=true';

describe('CustomerIframe Component', () => {
  it('should render the loading indicator on initial mount', () => {
    render(<CustomerIframe />);
    expect(screen.getByText('Loading Verification...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render the iframe with the correct title and src attributes', () => {
    render(<CustomerIframe />);
    const iframeElement = screen.getByTitle('Customer Content');
    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement).toHaveAttribute('src', expectedIframeUrl);
  });

  it('should initially render the iframe as not visible', () => {
    render(<CustomerIframe />);
    const iframeElement = screen.getByTitle('Customer Content');
    expect(iframeElement).not.toBeVisible();
  });

  it('should hide the loading indicator and show the iframe after it loads', () => {
    render(<CustomerIframe />);
    expect(screen.getByText('Loading Verification...')).toBeInTheDocument();
    const iframeElement = screen.getByTitle('Customer Content');
    fireEvent.load(iframeElement);
    expect(screen.queryByText('Loading Verification...')).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(iframeElement).toBeVisible();
  });
});
