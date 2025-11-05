export interface AppConfig {
  APP_BASE_URL: string;
  API_URL: string;
  TIMEOUT: number;
  RAZORPAY_KEY: string;
  RAZORPAY_CHECKOUT_URL: string;
  RAZORPAY_CURRENCY: string;
  RAZORPAY_AMOUNT: number; // in paisa
  RAZORPAY_NAME: string;
  RAZORPAY_DESCRIPTION: string;
  RAZORPAY_PREFILL: {
    name: string;
    email: string;
    contact: string;
  };
}

// Define the domains
export type DomainType = 'lap' | 'default';

// To handle file upload methods and button variants
export type FileUploadMethodType = 'upload' | 'scan';
export type FileUploadVariant = 'blue' | 'blond';

export const FileUploadMethodType = {
  UPLOAD: 'upload' as FileUploadMethodType,
  SCAN: 'scan' as FileUploadMethodType,
};

export const FileUploadVariant = {
  BLUE: 'blue' as FileUploadVariant,
  BLOND: 'blond' as FileUploadVariant,
};

export type ToggleButtonVariantType = 'square' | 'pill';

export const ToggleButtonVariantType = {
  SQUARE: 'square' as ToggleButtonVariantType,
  PILL: 'pill' as ToggleButtonVariantType,
};
