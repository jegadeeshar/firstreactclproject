/**
 * A fallback component for error boundaries.
 *
 * This component provides a user-friendly UI to display when a JavaScript error occurs in a child component
 * of an error boundary. It receives the error and a function to reset the boundary, allowing users to
 * attempt a recovery without a full page reload.
 *
 */
import React from 'react';
import type { FallbackProps } from 'react-error-boundary';
// TODO: Design needs to be changed according to figma
const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid red', borderRadius: '5px' }} role="alert">
      <h2>Something went wrong!</h2>
      <div>
        Error message: <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
