import { useMemo } from 'react';
import useLabelLookup from '@/core/hooks/useLabelLookup';
import { getNestedValue, toPascalCase } from '@/core/utils/commonUtils';

/**
 * Custom hook to fetch a label by key (supports nested keys).
 * Falls back to PascalCase of the key if not found.
 *
 * @example
 * const t = useLabel();
 * console.log(t('user.profile.name')); // "John Doe" (from nested JSON)
 * console.log(t('unknown.key'));       // "Unknown Key" (PascalCase fallback)
 */
const useLabel = () => {
  const labels = useLabelLookup();

  return useMemo(
    () =>
      (key: string, skipPascalCase = false): string => {
        if (!key) return '';

        // ✅ Try to resolve nested key (supports "a.b.c" paths)
        const found = getNestedValue(labels, key);

        if (typeof found === 'string') return found;

        // ✅ Fallbacks
        return skipPascalCase ? key : toPascalCase(key);
      },
    [labels]
  );
};

export default useLabel;
