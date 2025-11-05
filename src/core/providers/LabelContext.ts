import type { Labels } from '@/core/types';
import { createContext } from 'react';

/**
 * React context for providing label data throughout the application.
 *
 * @remarks
 * This context holds an object of type {@link Labels}, or `undefined` if not provided.
 * Use this context to access and manage label-related state in your components.
 *
 * @see {@link Labels}
 */
const LabelContext = createContext<Labels | undefined>(undefined);
export default LabelContext;
