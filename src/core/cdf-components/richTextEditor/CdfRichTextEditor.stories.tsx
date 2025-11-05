import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { CdfRichTextEditor } from './CdfRichTextEditor';
import type { CdfRichTextEditorProps } from '@core/types';

const meta: Meta<typeof CdfRichTextEditor> = {
  title: 'Components/RichTextEditor/CdfRichTextEditor',
  component: CdfRichTextEditor,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CdfRichTextEditor>;

const WithForm: React.FC<CdfRichTextEditorProps> = (props) => {
  const methods = useForm<{ [key: string]: string }>({
    defaultValues: {
      [props.name]: props.value || '',
    },
  });

  const onSubmit = (data: Record<string, unknown>) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CdfRichTextEditor {...props} />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: () => (
    <WithForm
      name="richText"
      value="<p>Hello, this is <strong>rich text</strong>!</p>"
      label="Description"
    />
  ),
};

export const Required: Story = {
  render: () => <WithForm name="richText" value="" required label="Required Description" />,
};

export const Prefilled: Story = {
  render: () => (
    <WithForm
      name="richText"
      value="<h2>Prefilled Content</h2><p>This editor is initialized with content.</p>"
      label="Prefilled Content"
    />
  ),
};
