import type { SliderMark } from '@core/types';

// Generates an array of slider marks from min to max at a specified step
export const generateSteps = (min: number, max: number, step: number): SliderMark[] => {
  const marks: SliderMark[] = [];
  if (step <= 0) return marks;
  for (let i = min; i <= max; i += step) {
    marks.push({ value: i, label: i.toString() });
  }
  return marks;
};
