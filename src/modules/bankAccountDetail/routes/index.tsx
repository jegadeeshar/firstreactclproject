import type { AppRoute } from '@/core/types';
import PaymentPage from '@/modules/bankAccountDetail/pages/PaymentPage';

const bankAccountDetailRoutes: AppRoute[] = [
  {
    path: '/payment',
    element: <PaymentPage />,
  },
];

export default bankAccountDetailRoutes;
