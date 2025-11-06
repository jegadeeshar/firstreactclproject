import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider, CssBaseline } from '@mui/material';
import customTheme from '@core/theme';
import App from '@core/containers/App.tsx';
import ErrorFallback from '@core/containers/ErrorFallback';
import LabelProvider from '@/core/providers/LabelProvider';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <ThemeProvider theme={customTheme}>
            <LabelProvider>
              <CssBaseline />
              <App />
            </LabelProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
