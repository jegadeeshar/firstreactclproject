import { Box, Paper, FormControl } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import type { FormWrapperProps } from '@/core/types';

const FormWrapper = <T extends Record<string, unknown> = Record<string, unknown>>({
  methods, // optional form methods from react-hook-form
  children, // main content
  footer, // optional footer content
}: FormWrapperProps<T>) => {
  // Only return FormProvider if methods are provided
  return (
    <FormProvider {...methods}>
      {/* ---------- MAIN CONTENT AREA ---------- */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ---------- SCROLLABLE FORM SECTION ---------- */}
        <Paper
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            borderRadius: 0,
          }}
        >
          <FormControl component="fieldset" fullWidth sx={{ display: 'block', gap: 2 }}>
            {children}
          </FormControl>
        </Paper>

        {/* ---------- FIXED FOOTER (within main content only) ---------- */}
        {footer && (
          <Box
            sx={{
              flexShrink: 0,
              position: 'sticky',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              p: 0,
              m: 0,
            }}
          >
            {footer}
          </Box>
        )}
      </Box>
    </FormProvider>
  );
};

export default FormWrapper;
