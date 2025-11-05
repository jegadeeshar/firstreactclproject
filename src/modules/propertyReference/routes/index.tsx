import type { AppRoute } from '@/core/types';
import Property from '@/modules/propertyReference/pages/Property';
import ReferenceDetails from '@/modules/propertyReference/pages/ReferenceDetails';

const propertyReferenceRoutes: AppRoute[] = [
  {
    path: 'property',
    element: <Property />,
  },
  {
    path: 'referenceDetail',
    element: <ReferenceDetails />,
  },
];

export default propertyReferenceRoutes;
