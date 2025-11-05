import { BACKEND_DEFAULTS } from '@core/constants/backendDefault';
import type { AppConfig } from '@core/types';

// Application configuration settings
export const appConfig: AppConfig = {
  APP_BASE_URL: import.meta.env.VITE_BASE_URL || BACKEND_DEFAULTS.APP_BASE_URL, // Base URL of the frontend application
  API_URL: import.meta.env.VITE_API_URL || BACKEND_DEFAULTS.API_URL, // Base URL of the backend API
  TIMEOUT: Number(import.meta.env.VITE_TIMEOUT) || BACKEND_DEFAULTS.TIMEOUT, // in milliseconds
  RAZORPAY_KEY: 'rzp_test_yZiPehgkiWWmwp', // Hardcoded test key
  RAZORPAY_CHECKOUT_URL: 'https://checkout.razorpay.com/v1/checkout.js', // Razorpay checkout script URL
  RAZORPAY_CURRENCY: 'INR', // Currency
  RAZORPAY_AMOUNT: 10000, // Amount in paisa (e.g., 100 INR)
  RAZORPAY_NAME: 'CHOLA',
  RAZORPAY_DESCRIPTION: 'CHOLA',
  RAZORPAY_PREFILL: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    contact: '9999999999',
  },
};
