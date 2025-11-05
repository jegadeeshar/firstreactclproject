import { StageList } from '@/core/components/stage';
import { mockStageData } from '@/core/constants/mockData';
import Sidebar from '@/core/layout/Sidebar';
import React, { lazy } from 'react';

const PageLayout = lazy(() => import('./PageLayout'));

// Load layout based on the prop
const LayoutWrapper: React.FC<{ layout?: string; children: React.ReactNode }> = ({
  layout,
  children,
}) => {
  switch (layout) {
    case 'home':
    case 'auth':
      return <PageLayout>{children}</PageLayout>;
    case 'main':
    default:
      return (
        <PageLayout sidebar={<Sidebar children={<StageList stages={mockStageData.stages} />} />}>
          {children}
        </PageLayout>
      );
  }
};

export default LayoutWrapper;
