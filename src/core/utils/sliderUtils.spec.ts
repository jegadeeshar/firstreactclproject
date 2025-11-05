import { describe, it, expect } from 'vitest';
import { generateSteps } from '@core/utils/sliderUtils';
import { type SliderMark } from '@core/types';

describe('generateMarks', () => {
  it('should return an empty array if step <= 0', () => {
    const marks = generateSteps(0, 10, 0);
    expect(marks).toEqual([]);
  });

  it('should generate marks correctly for positive step', () => {
    const marks: SliderMark[] = generateSteps(0, 10, 2);
    expect(marks).toEqual([
      { value: 0, label: '0' },
      { value: 2, label: '2' },
      { value: 4, label: '4' },
      { value: 6, label: '6' },
      { value: 8, label: '8' },
      { value: 10, label: '10' },
    ]);
  });

  it('should include the max value if it aligns with step', () => {
    const marks = generateSteps(1, 5, 1);
    expect(marks[marks.length - 1].value).toBe(5);
  });
});
