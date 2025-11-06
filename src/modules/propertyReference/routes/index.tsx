import type { AppRoute } from '@/core/types';
import Property from '@/modules/propertyReference/pages/Property';
import ReferenceDetails from '@/modules/propertyReference/pages/ReferenceDetails';
import PropertyDetailsView from '@/modules/propertyReference/pages/PropertyDetailsView';

const propertyReferenceRoutes: AppRoute[] = [
  {
    path: 'property',
    element: <Property />,
  },
  {
    path: 'referenceDetail',
    element: <ReferenceDetails />,
  },
  {
    path: 'propertyDetailsView',
    element: <PropertyDetailsView />,
  },
];

export default propertyReferenceRoutes;
