import React from 'react';
import { useAlertStore } from '@core/store';
import CdfAlert from '@cdf-components/alert/CdfAlert';

const CommonAlert: React.FC = () => {
  // Get alerts from the state
  const { alerts, hideAlert } = useAlertStore();

  return (
    <>
      {alerts.map((alertItem, index) => (
        <>
          <CdfAlert
            index={index}
            onClose={() => hideAlert(alertItem.id)}
            type={alertItem.type}
            message={alertItem.message}
            open={true}
          />
        </>
      ))}
    </>
  );
};

export default CommonAlert;
