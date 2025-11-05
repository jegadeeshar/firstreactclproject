import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import CdfSlider from '@cdf-components/slider/CdfSlider';

const testCases = [
  { name: 'tenure', title: 'Request Tenure', minValue: 10, maxValue: 35, step: 1, marksStep: 5 },
  { name: 'tenure', title: 'Loan Duration', minValue: 5, maxValue: 50, step: 5, marksStep: 10 },
];

describe('CdfSlider Component', () => {
  testCases.forEach(({ name, title, minValue, maxValue, step, marksStep }) => {
    describe(`Testing slider: ${title}`, () => {
      let user: ReturnType<typeof userEvent.setup>;

      beforeEach(() => {
        user = userEvent.setup();
      });

      it('renders slider and input correctly', () => {
        render(
          <CdfSlider
            name={name}
            title={title}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            marksStep={marksStep}
          />
        );
        expect(screen.getByText(title)).toBeDefined();
        const input = screen.getByRole('spinbutton') as HTMLInputElement;
        expect(input.value).toBe(String(minValue));
        expect(screen.getByTestId('tenure-slider')).toBeDefined();
      });

      it('updates input when slider is changed', async () => {
        render(
          <CdfSlider
            name={name}
            title={title}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            marksStep={marksStep}
          />
        );
        const input = screen.getByRole('spinbutton') as HTMLInputElement;
        await user.clear(input);
        await user.type(input, String(minValue + step * 2));
        expect(input.value).toBe(String(minValue + step * 2));
      });

      it('updates slider when input is changed', async () => {
        render(
          <CdfSlider
            name={name}
            title={title}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            marksStep={marksStep}
          />
        );
        const input = screen.getByRole('spinbutton') as HTMLInputElement;
        await user.clear(input);
        await user.type(input, String(minValue + step * 3));
        expect(input.value).toBe(String(minValue + step * 3));
      });
    });
  });

  describe('Integration with react-hook-form', () => {
    it('works correctly with react-hook-form Controller', async () => {
      const Wrapper = (props: { children: React.ReactNode }) => {
        const methods = useForm({ defaultValues: { tenure: 15 } });
        return <FormProvider {...methods}>{props.children}</FormProvider>;
      };

      render(
        <Wrapper>
          <CdfSlider name="tenure" title="Controlled Tenure" minValue={10} maxValue={30} />
        </Wrapper>
      );

      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.value).toBe('15');

      await userEvent.clear(input);
      await userEvent.type(input, '20');
      expect(input.value).toBe('20');
    });
  });
});
