import LabelContext from '@/core/providers/LabelContext';
import { useLoginUserStore } from '@/core/store';
import type { Labels, LabelProviderProps } from '@/core/types';
import logger from '@/core/utils/loggerUtils';
import { useEffect, useState } from 'react';

/**
 * Provides label data to its children based on the current user's domain.
 *
 * This provider dynamically imports label JSON files corresponding to the user's domain
 * from the `@labels` directory. If the import fails, it falls back to the default labels.
 *
 * @param children - React children components that will have access to the labels context.
 * @returns A React context provider that supplies label data to its descendants.
 *
 * @remarks
 * - Uses `useLoginUserStore` to determine the current domain.
 * - Handles asynchronous loading and error fallback for label data.
 */
const LabelProvider: React.FC<LabelProviderProps> = ({ children }) => {
  // get domain from user login state
  const domain = useLoginUserStore((state) => state.domain);
  const [labels, setLabels] = useState<Labels>({});

  // Preload all JSONs from the labels folder
  const labelModules = import.meta.glob('/src/core/labels/*.json', { eager: true });

  useEffect(() => {
    // load labels based on domain
    const loadLabels = async () => {
      try {
        // Try to find matching domain label file
        const matchedKey = Object.keys(labelModules).find((key) => key.includes(`${domain}.json`));

        logger.info(`Loaded labels for domain: ${domain}, matchedKey: ${matchedKey}`);

        // Pick matched or fallback to default
        const data =
          (matchedKey
            ? (labelModules[matchedKey] as Labels)
            : (labelModules['/src/core/labels/default.json'] as Labels)) ?? {};

        // Vite JSON imports wrap content in `.default`
        const labelData = typeof data.default === 'object' ? data.default : data;
        setLabels(labelData);
      } catch (err) {
        logger.error(`Failed to load labels for ${domain}`, err);
      }
    };

    loadLabels();
    // eslint-why: We only want to reload when domain changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  return <LabelContext.Provider value={labels}>{children}</LabelContext.Provider>;
};

export default LabelProvider;
