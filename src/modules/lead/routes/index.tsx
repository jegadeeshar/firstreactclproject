import type { AppRoute } from '@/core/types';
import ProductDetails from '@/modules/lead/pages/ProductDetails';

const leadRoutes: AppRoute[] = [
  {
    path: 'lead/create',
    element: <ProductDetails />,
    layout: 'main',
  },
];

export default leadRoutes;
