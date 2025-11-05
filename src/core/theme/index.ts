import { createTheme } from '@mui/material/styles';

const sidebarWidth = 400;
const appBarHeight = 64;

// ===== Base Brand Colors =====
const primaryColor = '#4A39A3';
const secondaryColor = '#4A00E0';

// Stage-specific colors
const stageInProgressColor = '#0EA5E9'; // Sky blue for in-progress
const stageCompletedColor = '#16A34A'; // Green for completed
const stagePendingColor = '#9CA3AF'; // Gray for pending
const stageConnectorColor = '#E5E7EB'; // Light gray for connecting lines
const errorColor = '#D91F11';
const warningColor = '#ED6C02';

// ===== Custom Palettes =====
const bluePalette = {
  main: '#D9E7FF',
  dark: '#B4CEFA',
  light: '#EDF4FF',
  contrastText: '#26335D',
};

const blondPalette = {
  main: '#FFEFC3',
  dark: '#FFE49B',
  light: '#FFF7E1',
  contrastText: '#26335D',
};

const whitePalette = {
  main: '#FFFFFF',
  dark: '#F5F5F5',
  light: '#FAFAFA',
  contrastText: '#26335D',
};

// ======= THEME =======
const customTheme = createTheme({
  palette: {
    // ---- Core Palettes ----
    primary: {
      main: primaryColor,
      dark: '#273E70',
      light: '#D8E7FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: secondaryColor,
      dark: '#CC6C00',
      light: '#FFE8CC',
      contrastText: '#FFFFFF',
    },
    info: {
      main: stageInProgressColor,
      dark: '#01579B',
      light: '#E1F5FE',
      contrastText: '#FFFFFF',
    },
    error: {
      main: errorColor,
      dark: '#E7262B',
      light: '#FDECEA',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: warningColor,
      dark: '#E65100',
      light: '#FFF3E0',
      contrastText: '#FFFFFF',
    },
    success: {
      main: stageCompletedColor,
      dark: '#1B5E20',
      light: '#E8F5E9',
      contrastText: '#FFFFFF',
    },
    grey: {
      300: stagePendingColor,
      200: stageConnectorColor,
    },

    // ---- Custom Extended Palettes ----
    blue: bluePalette,
    blond: blondPalette,
    white: whitePalette,

    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1C1C',
      secondary: '#555555',
      disabled: '#9E9E9E',
    },
  },

  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: { fontWeight: 600, fontSize: '36px', '@media (max-width:960px)': { fontSize: '36px' } },
    h2: { fontWeight: 600, fontSize: '30px', '@media (max-width:960px)': { fontSize: '30px' } },
    h3: { fontWeight: 500, fontSize: '28px', '@media (max-width:960px)': { fontSize: '26px' } },
    h4: { fontWeight: 500, fontSize: '26px', '@media (max-width:960px)': { fontSize: '20px' } },
    h5: { fontWeight: 500, fontSize: '20px', '@media (max-width:960px)': { fontSize: '16px' } },
    h6: { fontWeight: 500, fontSize: '16px', '@media (max-width:960px)': { fontSize: '14px' } },
    body1: { fontSize: '14px', fontWeight: 400, '@media (max-width:960px)': { fontSize: '12px' } },
    body2: { fontSize: '12px', fontWeight: 400, '@media (max-width:960px)': { fontSize: '10px' } },
    subtitle1: { fontSize: '10px', fontWeight: 400 },
    subtitle2: { fontSize: '8px', fontWeight: 400 },
    button: { textTransform: 'none', fontSize: '14px', fontWeight: 500 },
    caption: { fontSize: '12px', fontWeight: 400 },
  },

  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 },
  },

  components: {
    MuiButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        outlined: { borderWidth: 1.5 },
      },
    },

    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },

    // Stage-specific component overrides
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 8,
          paddingBottom: 8,
          '& .MuiOutlinedInput-root': {
            position: 'relative',
            backgroundColor: '#FFFFFF',
            borderRadius: 4,
            height: 54,
            display: 'flex',
            alignItems: 'center',
            borderColor: '#CCD9E7',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#CCD9E7',
              transition: 'all 0.2s ease',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryColor,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryColor,
              boxShadow: '0 0 0 2px rgba(42,85,229,0.15)',
            },
            '& input[type=number]': {
              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: errorColor,
            },
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E1E1E1',
            },
          },
          '& .MuiInputLabel-outlined': {
            backgroundColor: '#FFFFFF',
            paddingRight: 4,
            paddingLeft: 4,
            zIndex: 1,
          },
          '& label.Mui-focused': { color: primaryColor },
          '& label.Mui-error': { color: errorColor },
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          height: 34,
          borderRadius: 4,
          fontSize: '14px',
          textTransform: 'none',
          padding: '0px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },

    MuiToggleButtonGroup: {
      defaultProps: { className: 'square' },
      styleOverrides: {
        root: {
          marginTop: '4px',
          borderColor: '#D4DDFA',
          color: '#666666',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px 8px',
          height: 30,
          '&.pill': {
            flexDirection: 'row',
            '.cdf-toggle-option': {
              borderRadius: '25px !important',
              border: `1px solid #D4DDFA`,
              color: '#666666',
              textTransform: 'none',
              padding: '0px 16px',
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              backgroundColor: 'transparent',
              '&.Mui-selected': {
                backgroundColor: '#EDECF6',
                color: primaryColor,
                borderColor: primaryColor,
              },
              '&:hover': { backgroundColor: '#e3f2fd' },
              '&.Mui-disabled': { opacity: 0.5, cursor: 'not-allowed' },
            },
          },
          '&.square': {
            flexDirection: 'row',
            '.cdf-toggle-option': {
              borderRadius: '4px !important',
              border: `1px solid #D4DDFA`,
              color: '#666666',
              textTransform: 'none',
              padding: '0px 16px',
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              backgroundColor: '#FFFFFF',
              '&.Mui-selected': {
                backgroundColor: '#EDECF6',
                color: primaryColor,
                border: `1px solid ${primaryColor}`,
              },
              '&:hover': { backgroundColor: '#EDECF6' },
              '&.Mui-disabled': { opacity: 0.5, cursor: 'not-allowed' },
            },
          },
        },
      },
    },
  },

  // ======= CUSTOM PROPERTIES =======
  customProperties: {
    headerHeight: appBarHeight,
    sidebarWidth: sidebarWidth,
    stageIconSize: 40,
    stageConnectorWidth: 2,
    stageSpacing: 16,
  },
  cdf: {
    dialog: {
      Maxwidth: '700px',
      Maxheight: '550px',
      Minwidth: '400px',
      Minheight: '400px',
    },
  },
});

export default customTheme;
