import type { AppRoute } from '@/core/types';
import Customer from '@/modules/customer/pages/Customer';

const customerRoutes: AppRoute[] = [
  // Add your routes here
  {
    path: 'customer',
    element: <Customer />,
  },
];

export default customerRoutes;
