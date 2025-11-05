import type { Meta, StoryObj } from '@storybook/react-vite';
import CdfTable from './CdfTable';

const meta: Meta<typeof CdfTable> = {
  title: 'Components/Table/CdfTable',
  component: CdfTable,
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: 'object',
      table: {
        type: { summary: 'readonly string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    rows: {
      control: 'object',
      table: {
        type: { summary: 'Record<string, string>[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CdfTable>;

// Common headers
const headers = [
  'FIRST NAME',
  'LAST NAME',
  'GENDER',
  'MARITAL STATUS',
  'DOB',
  'FATHER NAME',
  'PAN',
  'ACTION',
  'SOURCING NAME',
];

// ------------------- No Data -------------------
export const Default: Story = {
  args: {
    headers,
    rows: [],
  },
};

// ------------------- Table With Data -------------------
export const WithData: Story = {
  args: {
    headers,
    rows: [
      {
        'FIRST NAME': 'ABCDEFG',
        'LAST NAME': 'A',
        GENDER: 'MALE',
        'MARITAL STATUS': 'SINGLE',
        DOB: 'XX-YY-ZZZZ',
        'FATHER NAME': 'HIJKL',
        PAN: '490264',
        ACTION: 'NULL',
        'SOURCING NAME': 'NULL',
      },
    ],
  },
};

// ------------------- Table With Missing Cells -------------------
export const WithMissingCells: Story = {
  args: {
    headers,
    rows: [
      {
        'FIRST NAME': 'ABCDEFG',
        'LAST NAME': 'A',
        'MARITAL STATUS': 'SINGLE',
        DOB: 'XX-YY-ZZZZ',
        ACTION: 'NULL',
        'SOURCING NAME': 'NULL',
      },
    ],
  },
};
