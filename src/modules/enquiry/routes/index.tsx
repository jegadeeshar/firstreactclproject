import SampleEnquiry from '@/modules/enquiry/pages/SampleEnquiry';
import type { AppRoute } from '@/core/types';

const enquiryRoutes: AppRoute[] = [
  {
    path: 'enquiry',
    element: <SampleEnquiry />,
  },
];

export default enquiryRoutes;
