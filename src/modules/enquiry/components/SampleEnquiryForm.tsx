import React from 'react';
import logger from '@core/utils/loggerUtils';
import CdfMobile from '@cdf-components/input/CdfMobile';
import CdfEmail from '@cdf-components/input/CdfEmail';
import { useMediaQuery, useTheme, Grid } from '@mui/material';
import useLabel from '@/core/hooks/useLabel';
import {
  BranchDropdown,
  BankDropdown,
  LanguageDropdown,
  LoanPurposeDropdown,
  LoanTypeDropdown,
  ProductDropdown,
  PropertyTypeDropdown,
  SourceNameDropdown,
  TimePeriodDropdown,
  VendorDropdown,
  LoanAmountDropdown,
} from '@/core/components/dropdown';

const SampleEnquiryForm: React.FC = () => {
  const theme = useTheme();

  // Hook for localization
  const t = useLabel();

  // Check if it's mobile view
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  logger.debug('Is Mobile View: ', isMobileView);

  return (
    <>
      {/* Test Form Fields */}
      <h2 style={{ marginBottom: 16 }}>{t('appTitle')}</h2>

      <Grid container spacing={2}>
        {/* Email Input */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <CdfEmail name="email" label={t('email')} required fullWidth />
        </Grid>

        {/* Mobile Input */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <CdfMobile name="mobileNo" label={t('mobile')} required fullWidth />
        </Grid>

        {/* Branch Dropdown */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <BranchDropdown name="branchId" label={t('branch')} required fullWidth />
        </Grid>
        <BankDropdown label="bank" fullWidth />
        <LanguageDropdown label="Language" fullWidth />
        <LoanPurposeDropdown label="Loan purpose" fullWidth />
        <LoanTypeDropdown label="loan type" fullWidth />
        <ProductDropdown label="products" fullWidth />
        <PropertyTypeDropdown label="property type" fullWidth />
        <LoanAmountDropdown label="loan amount" fullWidth />
        <SourceNameDropdown label="source by" fullWidth />
        <TimePeriodDropdown label="time period" fullWidth />
        <VendorDropdown label="vendors" fullWidth />
      </Grid>
    </>
  );
};

export default SampleEnquiryForm;
