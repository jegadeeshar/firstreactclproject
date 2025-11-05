import '@emotion/react';
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customProperties: {
      headerHeight: number;
      sidebarWidth: number;
      stageIconSize: number;
      stageConnectorWidth: number;
      stageSpacing: number;
    };

    cdf: {
      dialog: {
        Maxwidth: string | number;
        Maxheight: string | number;
        Minwidth: string | number;
        Minheight: string | number;
      };
    };
  }

  interface ThemeOptions {
    customProperties?: {
      headerHeight?: number;
      sidebarWidth?: number;
      stageIconSize?: number;
      stageConnectorWidth?: number;
      stageSpacing?: number;
    };

    cdf?: {
      dialog?: {
        Maxwidth?: string | number;
        Maxheight?: string | number;
        Minwidth?: string | number;
        Minheight?: string | number;
      };
    };
  }

  interface Palette {
    blue: Palette['primary'];
    blond: Palette['primary'];
    white: Palette['primary'];
  }

  interface PaletteOptions {
    blue?: PaletteOptions['primary'];
    blond?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
  }
}

// === (Optional) — Extend color props for Button, Chip, etc. ===
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blue: true;
    blond: true;
    white: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    blue: true;
    blond: true;
    white: true;
  }
}

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    customProperties: {
      headerHeight: number;
      sidebarWidth: number;
      stageIconSize: number;
      stageConnectorWidth: number;
      stageSpacing: number;
    };

    cdf: {
      dialog: {
        Maxwidth: string | number;
        Maxheight: string | number;
        Minwidth: string | number;
        Minheight: string | number;
      };
    };
  }
}
