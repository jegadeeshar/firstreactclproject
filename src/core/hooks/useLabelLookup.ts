import { useContext } from 'react';
import LabelContext from '@/core/providers/LabelContext';
import type { Labels } from '@/core/types';

/**
 * Custom hook to access the `Labels` context.
 *
 * @returns {Labels} The current labels from the `LabelContext`.
 * @throws {Error} If used outside of a `LabelsProvider`.
 *
 * @example
 * const labels = useLabelLookup();
 * console.log(labels.someLabel);
 */
const useLabelLookup = (): Labels => {
  const context = useContext(LabelContext);

  if (!context) {
    throw new Error('useLabelLookup must be used within a LabelsProvider');
  }
  return context;
};
export default useLabelLookup;
