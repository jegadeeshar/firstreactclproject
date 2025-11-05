import React, { useState, type MouseEvent } from 'react';
import { MENU_ITEMS } from '@/core/constants/menuItems';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import ProfileIcon from '@mui/icons-material/AccountCircleOutlined';
import CholaLogo from '@/core/assets/images/CholaLogo.svg';
import LogoSymbol from '@/core/assets/images/LogoSymbol.svg';
import { getInitials, getDisplayName } from '@/core/utils/commonUtils';
import type { AppBarCustomProps } from '@/core/types';

const CdfAppBar: React.FC<AppBarCustomProps> = ({
  title, //title of the
  userName, // user's name
  branch, // branch name
  notificationCount, // number of notifications
}) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  // Profile dropdown menu
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorElUser);

  // Mobile menu dropdown
  const [anchorElMobile, setAnchorElMobile] = useState<null | HTMLElement>(null);
  const openMobileMenu = Boolean(anchorElMobile);

  // Handlers
  const handleOpenProfileMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseProfileMenu = () => setAnchorElUser(null);

  const handleOpenMobileMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElMobile(event.currentTarget);
  const handleCloseMobileMenu = () => setAnchorElMobile(null);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            {/* Left Section */}
            <Box display="flex" alignItems="center" gap={2}>
              {isMobileView ? (
                <>
                  <IconButton data-testid="menu-btn" color="inherit" onClick={handleOpenMobileMenu}>
                    <MenuIcon />
                  </IconButton>
                  <img src={LogoSymbol} alt="logo1" />
                  <Box display="flex" gap={2}>
                    {MENU_ITEMS.PAGES.map((page) => (
                      <Button key={page} color="inherit">
                        {page}
                      </Button>
                    ))}
                  </Box>
                </>
              ) : (
                <>
                  <img src={CholaLogo} data-testid="logo2" alt="logo2" />
                  <Divider orientation="vertical" component="span" flexItem sx={{ mx: 1 }} />
                  <Typography variant="h6">{title}</Typography>
                  <IconButton data-testid="menu-btn" color="inherit" onClick={handleOpenMobileMenu}>
                    <MenuIcon />
                  </IconButton>
                  <Box display="flex" gap={2}>
                    {MENU_ITEMS.PAGES.map((page) => (
                      <Button key={page} color="inherit">
                        {page}
                      </Button>
                    ))}
                  </Box>
                </>
              )}
            </Box>

            {/* Right Section */}
            <Box display="flex" alignItems="center" gap={1}>
              {/* Notifications */}
              <IconButton data-testid="notification-btn" color="inherit" size="large">
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* Profile - Avatar for desktop, ProfileIcon for mobile */}
              <IconButton
                data-testid="avatar-btn"
                color="inherit"
                onClick={handleOpenProfileMenu}
                sx={{ p: 0 }}
              >
                {isMobileView ? (
                  <ProfileIcon fontSize="large" />
                ) : (
                  <Avatar>{getInitials(userName)}</Avatar>
                )}
              </IconButton>

              {/* Desktop only: Name and branch */}
              {!isMobileView && (
                <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                  <Typography variant="body2">Hi, {getDisplayName(userName)}</Typography>
                  <Typography variant="body2">Branch: {branch || 'N/A'}</Typography>
                </Box>
              )}

              {/* Profile Dropdown */}
              <Menu
                anchorEl={anchorElUser}
                open={openUserMenu}
                onClose={handleCloseProfileMenu}
                anchorOrigin={{
                  vertical: 'bottom', // opens below the icon
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {MENU_ITEMS.PROFILE.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseProfileMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorElMobile}
        open={openMobileMenu}
        onClose={handleCloseMobileMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {MENU_ITEMS.MENU.map((item) => (
          <MenuItem key={item} onClick={handleCloseMobileMenu}>
            <Typography textAlign="center">{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CdfAppBar;
