import React, { useState } from 'react';
import { Slider, Box, Typography, Grid, TextField, type TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { generateSteps } from '@core/utils/sliderUtils';
import type { SliderMark } from '@core/types';
import customTheme from '@core/theme/index';
import type { CdfSliderProps } from '@core/types';
import { Controller, useFormContext } from 'react-hook-form';

// ---------- Styled Components -----------

// Container
const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: `calc(${theme.shape.borderRadius} * 2)`,
  boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
  boxSizing: 'border-box',
}));

// Grid container for label + input
const StyledGridContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'left',
  flexWrap: 'nowrap',
  marginBottom: theme.spacing(3),
}));

// Grid item for label
const StyledGridItemLabel = styled(Grid)(() => ({
  flexBasis: '50%',
}));

// Grid item for input
const StyledGridItemInput = styled(Grid)(() => ({
  flexBasis: '50%',
}));

// TextField styled to remove number input arrows
const StyledTextField = styled((props: TextFieldProps) => <TextField {...props} />)(() => ({
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    appearance: 'none',
    margin: 0,
  },
  '& input[type=number]': {
    appearance: 'textfield',
  },
}));

// ---------- Styled Slider ----------

// Box wrapping the slider
const StyledSliderBox = styled(Box)(() => ({
  width: '100%',
}));

// Styled Slider with fixed color
const StyledSlider = styled(Slider)(() => ({
  color: customTheme.palette.error.main,
  '& .MuiSlider-thumb': {
    border: `3px solid ${customTheme.palette.error.dark}`,
    backgroundColor: '#fff',
    width: 20,
    height: 20,
  },
  '& .MuiSlider-rail': { color: '#ddd' },
  '& .MuiSlider-mark': { height: 0, width: 0 },
}));

// ---------- Component ----------

const CdfSlider: React.FC<CdfSliderProps> = ({
  name = 'tenure', // name of the slider and input
  title, // Label/title displayed above the slider
  minValue = 10, // Minimum value allowed for slider and input
  maxValue = 35, // Maximum value allowed for slider and input
  step = 1, // Step increment for slider values
  marksStep = 5, // Interval for marks displayed along the slider track
  sx = {}, // Optional: custom styles to override or extend the outer container styling
}) => {
  const [tenure, setTenure] = useState<number>(minValue);
  const marks: SliderMark[] = generateSteps(minValue, maxValue, marksStep);

  const control = useFormContext()?.control;
  const setValue = useFormContext()?.setValue;

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const val = newValue as number;
    setTenure(val);
    setValue('tenure', val, { shouldValidate: true });
  };

  return (
    <StyledContainer sx={{ ...sx }}>
      <StyledGridContainer container spacing={2}>
        <StyledGridItemLabel size={{ xs: 6 }}>
          <Typography variant="subtitle1" sx={{ lineHeight: 1.2 }}>
            {title}
          </Typography>
        </StyledGridItemLabel>
        <StyledGridItemInput size={{ xs: 6 }}>
          {control ? (
            <Controller
              name={name}
              control={control}
              defaultValue={minValue}
              rules={{
                required: 'This field is required',
                min: { value: minValue, message: `Minimum is ${minValue}` },
                max: { value: maxValue, message: `Maximum is ${maxValue}` },
              }}
              render={({ field, fieldState }) => (
                <StyledTextField
                  {...field}
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{ inputProps: { min: minValue, max: maxValue } }}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                    const numVal = Number(val);
                    if (!isNaN(numVal)) setTenure(numVal);
                  }}
                />
              )}
            />
          ) : (
            <StyledTextField
              type="number"
              variant="outlined"
              size="small"
              value={tenure}
              fullWidth
              InputProps={{ inputProps: { min: minValue, max: maxValue } }}
              onChange={(e) => {
                const val = e.target.value;
                const numVal = Number(val);
                if (!isNaN(numVal)) setTenure(numVal);
              }}
            />
          )}
        </StyledGridItemInput>
      </StyledGridContainer>

      <StyledSliderBox>
        <StyledSlider
          data-testid="tenure-slider"
          value={tenure}
          onChange={handleSliderChange}
          step={step}
          min={minValue}
          max={maxValue}
          marks={marks}
          valueLabelDisplay="auto"
        />
      </StyledSliderBox>
    </StyledContainer>
  );
};

export default CdfSlider;
