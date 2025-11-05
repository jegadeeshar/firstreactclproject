import type { Meta, StoryObj, StoryFn, StoryContext } from '@storybook/react-vite';
import DataTableView from '@core/components/dataTable/DataTableView';
import type { CdfDataTableProps } from '@core/types/DataTableViewTypes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import LabelContext from '@/core/providers/LabelContext';
import { mockLeadData } from '@/core/constants';

const theme = createTheme();

const MockLabelsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultLabels = {
    leadId: 'Lead ID',
    sourceName: 'Source Name',
    mobileNo: 'Mobile No',
    firstName: 'First Name',
    middleName: 'Middle Name',
    lastName: 'Last Name',
  };

  return <LabelContext.Provider value={defaultLabels}>{children}</LabelContext.Provider>;
};

// Use generic 'object' type for rows
type RowType = object;

// Decorator
const withProviders = (
  Story: StoryFn<CdfDataTableProps<RowType>>,
  context: StoryContext<CdfDataTableProps<RowType>>
) => (
  <ThemeProvider theme={theme}>
    <MockLabelsProvider>{Story({ ...context.args }, context)}</MockLabelsProvider>
  </ThemeProvider>
);

// Meta
const meta: Meta<CdfDataTableProps<RowType>> = {
  title: 'Components/DataTableView/DataTableView',
  component: DataTableView as unknown as React.FC<CdfDataTableProps<RowType>>,
  decorators: [withProviders],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'DataTableView displays tabular data for leads with sorting, pagination, and custom labels.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<CdfDataTableProps<RowType>>;

// Default story
export const Default: Story = {
  args: {
    columns: ['leadId', 'sourceName', 'mobileNo', 'firstName', 'middleName', 'lastName'],
    data: mockLeadData,
    title: 'Leads Table',
    pagination: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<DataTableView<object>
  columns={['leadId','sourceName','mobileNo','firstName','middleName','lastName']}
  data={mockLeadData}
  title="Leads Table"
  pagination={true}
/>`,
      },
    },
  },
};

// Empty table story
export const EmptyTable: Story = {
  args: {
    columns: ['leadId', 'sourceName', 'mobileNo', 'firstName', 'middleName', 'lastName'],
    data: [],
    title: 'No Records Found',
    pagination: true,
  },
};
