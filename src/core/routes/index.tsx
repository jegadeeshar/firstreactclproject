import enquiryRoutes from '@modules/enquiry/routes';
import SampleEnquiry from '@/modules/enquiry/pages/SampleEnquiry';
import bankAccountDetailRoutes from '@/modules/bankAccountDetail/routes';
import bureauDedupeFiRoutes from '@/modules/bureauDedupeFi/routes';
import customerRoutes from '@/modules/customer/routes';
import documentCollectionRoutes from '@/modules/documentCollection/routes';
import leadRoutes from '@/modules/lead/routes';
import propertyReferenceRoutes from '@/modules/propertyReference/routes';
import type { AppRoute } from '@/core/types';
import propertyRoutes from '@/modules/propertyReference/routes';

const routes: AppRoute[] = [
  {
    path: '/',
    element: <SampleEnquiry />, // for demo purposes
    // layout: 'main', // optionally pass if custom `layout` required, default value is taken as `main`
  },
  ...enquiryRoutes,
  ...bankAccountDetailRoutes,
  ...bureauDedupeFiRoutes,
  ...customerRoutes,
  ...documentCollectionRoutes,
  ...leadRoutes,
  ...propertyReferenceRoutes,
  ...propertyRoutes,
];

export default routes;
