import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CdfAppBar from './CdfAppBar';
import * as MUI from '@mui/material';
import { MENU_ITEMS } from '@/core/constants/menuItems';

// Mock useMediaQuery
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof import('@mui/material')>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

describe('CdfAppBar Component', () => {
  const mockProps = {
    userName: 'Dhanu Varsha R',
    branch: 'Pattukottai',
    notificationCount: 3,
    title: 'LAP',
  };

  it('renders correctly in desktop view', () => {
    vi.spyOn(MUI, 'useMediaQuery').mockReturnValue(false);
    render(<CdfAppBar {...mockProps} />);
    expect(screen.getByTestId('logo2')).toBeInTheDocument();
    expect(screen.getByText('LAP')).toBeInTheDocument();
    expect(screen.getByText('DV')).toBeInTheDocument();
    expect(screen.getByText(/Branch: Pattukottai/)).toBeInTheDocument();
    MENU_ITEMS.PAGES.forEach((page) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    });
  });

  it('renders correctly in mobile view', () => {
    vi.spyOn(MUI, 'useMediaQuery').mockReturnValue(true); // Mobile mode
    render(<CdfAppBar {...mockProps} />);
    expect(screen.getByTestId('menu-btn')).toBeInTheDocument();
    expect(screen.getByAltText('logo1')).toBeInTheDocument();
    expect(screen.queryByTestId('logo2')).not.toBeInTheDocument();
    const profileBtn = screen.getByTestId('avatar-btn');
    expect(profileBtn.querySelector('svg')).toBeTruthy();
    MENU_ITEMS.PAGES.forEach((page) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    });
  });

  it('opens and closes profile menu on avatar click', () => {
    vi.spyOn(MUI, 'useMediaQuery').mockReturnValue(false);
    render(<CdfAppBar {...mockProps} />);
    const avatarButton = screen.getByTestId('avatar-btn');
    fireEvent.click(avatarButton);
    MENU_ITEMS.PROFILE.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('opens and closes mobile menu on icon click', () => {
    vi.spyOn(MUI, 'useMediaQuery').mockReturnValue(true);
    render(<CdfAppBar {...mockProps} />);
    const menuButton = screen.getByTestId('menu-btn');
    fireEvent.click(menuButton);
    MENU_ITEMS.MENU.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
  it('shows notification badge with correct count', () => {
    vi.spyOn(MUI, 'useMediaQuery').mockReturnValue(false);
    render(<CdfAppBar {...mockProps} />);
    const notifButton = screen.getByTestId('notification-btn');
    expect(notifButton).toBeInTheDocument();
    expect(screen.getByText(mockProps.notificationCount.toString())).toBeInTheDocument();
  });
});
