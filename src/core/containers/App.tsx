import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@core/routes';
import CommonAlert from '@core/components/Alert';
import CdfAppBar from '@/core/cdf-components/appbar/CdfAppBar';
import { useLoginUserStore } from '@/core/store';
import useLabel from '@/core/hooks/useLabel';
import LayoutWrapper from '@/core/layout/LayoutWrapper';
import type { AppRoute } from '@/core/types';
import LoaderOverlay from '@/core/layout/LoaderOverlay';

const App: React.FC = () => {
  // load labels
  const t = useLabel();
  // get user info from store
  const { username, branch } = useLoginUserStore();

  // map layout
  const routeElement = useRoutes(
    routes.map((route: AppRoute) => ({
      ...route,
      element: <LayoutWrapper layout={route.layout}>{route.element}</LayoutWrapper>,
    }))
  );

  return (
    <>
      <CdfAppBar
        title={t('appTitle')}
        userName={username || ''}
        branch={branch || ''}
        notificationCount={0}
      />
      {routeElement}
      <CommonAlert />
      {/* Loader overlay sits above everything when isLoading === true */}
      <LoaderOverlay />
    </>
  );
};

export default App;
