import React from 'react';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarIcon from '@/core/assets/Icons/CalendarIcon.svg';
import { IconButton, type IconButtonProps } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { CdfDatePickerProps } from '@/core/types';

dayjs.extend(customParseFormat);

// Custom calendar icon button
const CalendarButton = (props: IconButtonProps) => (
  <IconButton {...props}>
    <img src={CalendarIcon} alt="Calendar" />
  </IconButton>
);

const CdfDatePicker: React.FC<CdfDatePickerProps> = ({
  name,
  label = 'Date',
  format = 'MM-DD-YYYY',
  placeholder = 'Select Date',
  required = false,
  fullWidth = false,
  rules = {},
  value,
  ...rest
}) => {
  const control = useFormContext()?.control;

  const validationRules: RegisterOptions = {
    required: required ? `${label || 'Date'} is required` : false,
    ...rules,
  };
  if (!control) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...rest}
          label={label}
          format={format}
          value={value ? dayjs(value) : undefined}
          slots={{ openPickerButton: CalendarButton }}
          slotProps={{
            textField: {
              value: { value },
              fullWidth,
              placeholder,
            },
          }}
        />
      </LocalizationProvider>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={validationRules}
        defaultValue={value}
        render={({ field, fieldState: { error } }) => {
          // Convert JS Date (from form defaultValues) to Dayjs
          const pickerValue: Dayjs | null = field.value ? dayjs(field.value) : null;

          return (
            <DatePicker
              {...field}
              {...rest}
              label={label}
              format={format}
              value={pickerValue}
              onChange={(newValue: Dayjs | null) => {
                if (newValue) {
                  // store as JS Date
                  field.onChange(newValue.toDate());
                } else {
                  field.onChange(null);
                }
              }}
              slots={{ openPickerButton: CalendarButton }}
              slotProps={{
                textField: {
                  fullWidth,
                  placeholder,
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default CdfDatePicker;
