import type { CheckboxProps, TextFieldProps, ToggleButtonGroupProps } from '@mui/material';
import type { RegisterOptions } from 'react-hook-form';
import type { ToggleButtonVariantType } from './configTypes';

export interface CdfInputProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  rules?: RegisterOptions; // Accept custom rules from parent
}
export interface CdfDatePickerProps {
  name: string;
  label: string;
  format?: string;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  rules?: RegisterOptions;
  value?: string | null;
}

export interface CdfRichTextEditorProps {
  name: string;
  label?: string;
  value?: string;
  required?: boolean;
  rules?: RegisterOptions;
  fullWidth?: boolean;
  disabled?: boolean;
}

export interface InputValue {
  search: string;
}

export interface CdfNumberInputProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  rules?: RegisterOptions; // Accept custom rules from parent
}

export interface CdfSearchInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  rules?: RegisterOptions;
  fullWidth?: boolean;
  onSearch: (query: string) => Promise<void>;
}

export interface CdfInputButtonProps {
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: RegisterOptions; // custom validation rules
  handleVerify: (value: string) => void;
  isVerified?: boolean;
  fullWidth?: boolean;
}
export type CustomInputButtonProps = Partial<CdfInputButtonProps>;

export interface CdfCheckboxProps
  extends Omit<CheckboxProps, 'name' | 'onChange' | 'checked' | 'defaultValue'> {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: RegisterOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  checked?: boolean;
}

export interface CdfSliderProps {
  name: string;
  title: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  marksStep?: number;
  sliderColor?: string;
  sx?: object;
}

export interface SliderMark {
  value: number;
  label?: string | React.ReactNode;
}

export interface CdfToggleButtonOption {
  title: string;
  value: string;
}

export interface CdfToggleButtonProps extends Omit<ToggleButtonGroupProps, 'name' | 'onChange'> {
  name: string;
  label?: string;
  options: CdfToggleButtonOption[];
  variant?: ToggleButtonVariantType;
  value?: string;
  onChange?: (event: React.MouseEvent<HTMLElement>, value: string | number | boolean) => void;
  rules?: RegisterOptions;
  required?: boolean;
}
