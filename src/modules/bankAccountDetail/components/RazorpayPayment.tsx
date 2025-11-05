import React, { useEffect, useState } from 'react';
import { CdfSubmitButton } from '@cdf-components/buttons/CdfButtons';
import { appConfig } from '@core/config';
import alertUtils from '@core/utils/alertUtils';
import type {
  RazorpaySuccessResponse,
  RazorpayFailureResponse,
} from '@/modules/bankAccountDetail/types/razorpayTypes';

const RazorpayPayment: React.FC = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = appConfig.RAZORPAY_CHECKOUT_URL;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      alertUtils.error('Failed to load Razorpay');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!window.Razorpay) {
      alertUtils.error('Failed to load Razorpay Script');
      return;
    }

    try {
      const options = {
        key: appConfig.RAZORPAY_KEY,
        amount: appConfig.RAZORPAY_AMOUNT,
        currency: appConfig.RAZORPAY_CURRENCY,
        name: appConfig.RAZORPAY_NAME,
        description: appConfig.RAZORPAY_DESCRIPTION,
        //order_id: undefined, // For test payments, order_id can be undefined
        handler: (response: RazorpaySuccessResponse) => {
          alertUtils.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Handle success, e.g., send to backend later
        },
        prefill: appConfig.RAZORPAY_PREFILL,

        modal: {
          ondismiss: () => {},
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (response: RazorpayFailureResponse) => {
        alertUtils.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      alertUtils.error(`Error initializing payment: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <CdfSubmitButton
        label="Pay Now"
        onClick={(e) => {
          e.preventDefault();
          handlePayment();
        }}
        disabled={!isScriptLoaded}
      />
    </div>
  );
};

export default RazorpayPayment;
