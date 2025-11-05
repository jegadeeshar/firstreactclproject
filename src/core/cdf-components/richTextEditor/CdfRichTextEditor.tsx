import React, { useEffect, useMemo } from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { Box, Typography, useTheme } from '@mui/material';
import type { CdfRichTextEditorProps } from '@core/types';
import {
  RichTextEditorProvider,
  RichTextField,
  MenuControlsContainer,
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonUnderline,
  MenuDivider,
  MenuSelectHeading,
  MenuButtonAlignLeft,
  MenuButtonAlignCenter,
  MenuButtonAlignRight,
  MenuButtonAlignJustify,
} from 'mui-tiptap';
import { useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';

const EditorControls: React.FC<{ disabled?: boolean }> = ({ disabled }) => (
  <MenuControlsContainer>
    <MenuSelectHeading disabled={disabled} />
    <MenuDivider />
    <MenuButtonBold disabled={disabled} />
    <MenuButtonItalic disabled={disabled} />
    <MenuButtonUnderline disabled={disabled} />
    <MenuDivider />
    <MenuButtonAlignLeft disabled={disabled} />
    <MenuButtonAlignCenter disabled={disabled} />
    <MenuButtonAlignRight disabled={disabled} />
    <MenuButtonAlignJustify disabled={disabled} />
  </MenuControlsContainer>
);

export const CdfRichTextEditor: React.FC<CdfRichTextEditorProps & { label?: string }> = ({
  name,
  value,
  required = false,
  rules = {},
  fullWidth = false,
  disabled = false,
  label,
}) => {
  const control = useFormContext()?.control;
  const theme = useTheme();

  const editorExtensions = useMemo(
    () => [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    []
  );

  const editor = useEditor({
    extensions: editorExtensions,
    content: value || '',
    editable: !disabled,
  });

  if (!control) {
    return (
      <RichTextEditorProvider editor={editor}>
        {label && (
          <Typography
            component={'label'}
            variant="body2"
            sx={{
              mt: 1,
              color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
              textAlign: 'left',
              display: 'block',
            }}
          >
            {label}
          </Typography>
        )}
        <RichTextField
          controls={<EditorControls disabled={disabled} />}
          RichTextContentProps={{
            sx: {
              minHeight: 200,
              padding: 1,
              border: `1px solid ${theme.palette.grey[400]}`,
              borderRadius: 1,
              width: fullWidth ? '100%' : 'auto',
              opacity: disabled ? 0.6 : 1,
              pointerEvents: disabled ? 'none' : undefined,
            },
          }}
        />
      </RichTextEditorProvider>
    );
  }

  const ControlledEditor: React.FC<{
    value: string;
    onChange: (val: string) => void;
    errorMessage?: string;
    label?: string;
  }> = React.memo(({ value, onChange, errorMessage, label }) => {
    useEffect(() => {
      if (editor && value !== undefined && editor.getHTML() !== value) {
        editor.commands.setContent(value);
      }
    }, [value]);

    useEffect(() => {
      if (!editor || disabled) return;

      const handleUpdate = ({ editor }: { editor: Editor }) => {
        onChange(editor.getHTML());
      };

      editor.on('update', handleUpdate);
      return () => {
        editor.off('update', handleUpdate);
      };
    }, [onChange]);

    return (
      <>
        {label && (
          <Typography
            variant="body2"
            component={'label'}
            sx={{
              mt: 1,
              color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
              textAlign: 'left',
              display: 'block',
            }}
          >
            {label}
          </Typography>
        )}

        <RichTextEditorProvider editor={editor}>
          <RichTextField
            controls={<EditorControls disabled={disabled} />}
            RichTextContentProps={{
              sx: {
                minHeight: 200,
                padding: 1,
                border: `1px solid ${
                  errorMessage && !disabled ? theme.palette.error.main : theme.palette.grey[400]
                }`,
                borderRadius: 1,
                width: fullWidth ? '100%' : 'auto',
                opacity: disabled ? 0.6 : 1,
                pointerEvents: disabled ? 'none' : undefined,
                '&:focus-within': {
                  borderColor:
                    errorMessage && !disabled
                      ? theme.palette.error.main
                      : theme.palette.primary.main,
                },
              },
            }}
          />
        </RichTextEditorProvider>

        {errorMessage && !disabled && (
          <Box sx={{ width: fullWidth ? '100%' : 'auto', mt: 0.5, pl: '14px', textAlign: 'left' }}>
            <Typography variant="caption" color="error" role="alert">
              {errorMessage}
            </Typography>
          </Box>
        )}
      </>
    );
  });

  const finalValidationRules: RegisterOptions = disabled
    ? {}
    : {
        required: required ? `${name} is required` : false,
        validate: (val: string) => {
          const stripped = val?.replace(/<[^>]*>/g, '').trim();
          return stripped.length > 0 || `${name} is required`;
        },
        ...rules,
      };

  return (
    <Controller
      name={name}
      control={control}
      rules={finalValidationRules}
      defaultValue={value}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <ControlledEditor
          value={value}
          onChange={onChange}
          errorMessage={error?.message}
          label={label}
        />
      )}
    />
  );
};
