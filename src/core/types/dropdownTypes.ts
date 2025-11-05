import type { AutocompleteProps } from '@mui/material';
import type { OptionType } from './commonTypes';

// TODO: update as per actual branch data structure
export interface Branch {
  id: number;
  label: string;
}

export interface BranchType {
  branchId: string;
  branchDesc: string;
}
export type CdfDropdownPropsType = Omit<
  AutocompleteProps<OptionType, false, false, false>,
  'renderInput'
> & {
  label?: string;
  name: string;
  required?: boolean;
  fullWidth?: boolean;
  handleChange?: (value: OptionType | null) => void;
};

export type CustomDropdownPropsType = Omit<CdfDropdownPropsType, 'options' | 'name'> & {
  name?: string;
};
export interface AutoCompletePropsType {
  options: OptionType[];
  value?: OptionType | null;
  onChange: (option: OptionType | null) => void;
  label?: string;
  required?: boolean;
}
