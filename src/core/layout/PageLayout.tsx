import { Box, useTheme, useMediaQuery } from '@mui/material';
import type { PageLayoutProps } from '@/core/types';

const PageLayout = ({
  children, // main content
  sidebar, // optional sidebar content
}: PageLayoutProps) => {
  // get theme
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="form"
      data-testid="pageLayout"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* ---------- BODY SECTION ---------- */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flex: 1,
          mt: `${theme.customProperties.headerHeight}px`,
          overflow: 'hidden',
        }}
      >
        {/* ---------- SIDEBAR ---------- */}
        {sidebar && (
          <Box
            sx={{
              width: isMobile ? '100%' : theme.customProperties.sidebarWidth,
              flexShrink: 0,
              borderRight: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
              borderBottom: isMobile ? `1px solid ${theme.palette.divider}` : 'none',
              overflowY: 'auto',
              maxHeight: isMobile ? '200px' : 'none', // prevents sidebar from being too tall on mobile
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {sidebar}
          </Box>
        )}
        {children}
      </Box>
    </Box>
  );
};
export default PageLayout;
