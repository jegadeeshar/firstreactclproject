import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logger from '@core/utils/loggerUtils';
import useLabel from '@/core/hooks/useLabel';
import CdfPanCard from '@/core/cdf-components/input/CdfPanCard';
import CdfToggleButton from '@/core/cdf-components/togglebutton/CdfToggleButton';
import CdfNumberInput from '@/core/cdf-components/input/CdfNumberInput';
import CdfSlider from '@/core/cdf-components/slider/CdfSlider';
import CdfContainer from '@/core/components/Container/CdfContainer';
import CdfField from '@/core/components/field/CdfField';
import {
  ProductDropdown,
  BranchDropdown,
  LoanTypeDropdown,
  SourceTypeDropdown,
  SubLoanTypeDropdown,
  SourceNameDropdown,
  PropertyTypeDropdown,
  PropertyUsageDropdown,
  LoanPurposeDropdown,
  LanguageDropdown,
} from '@/core/components/dropdown';

const ProductDetailsForm: React.FC = () => {
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

      <CdfContainer>
        <CdfField>
          <CdfToggleButton
            label="Customer Type ?"
            name="customerType"
            options={[
              {
                title: 'Individual',
                value: 'Individual',
              },
              {
                title: 'Non-Individual',
                value: 'Non-Individual',
              },
            ]}
            variant="square"
            required
          />
        </CdfField>
        <CdfField>
          <CdfPanCard name="pan" label={'PAN Number / CKYC ID'} required fullWidth />
        </CdfField>
      </CdfContainer>

      <CdfContainer>
        <CdfField>
          <ProductDropdown name="product" label={t('Product')} required fullWidth />
        </CdfField>
        <CdfField>
          <BranchDropdown name="branch" label={t('branch')} required fullWidth />
        </CdfField>
        <CdfField>
          <LoanTypeDropdown name="loanType" label={t('Loan Type')} required fullWidth />
        </CdfField>
        <CdfField>
          <SubLoanTypeDropdown name="subLoanType" label={t('Sub-Loan Type')} required fullWidth />
        </CdfField>
        <CdfField>
          <SourceTypeDropdown name="sourceType" label={t('Source Type')} required fullWidth />
        </CdfField>
        <CdfField>
          <SourceNameDropdown name="sourceName" label={t(' Source Name')} required fullWidth />
        </CdfField>
        <CdfField>
          <PropertyTypeDropdown
            name="propertyType"
            label={t(' Property Type')}
            required
            fullWidth
          />
        </CdfField>
        <CdfField>
          <PropertyUsageDropdown
            name="propertyUsage"
            label={t(' Property Usage')}
            required
            fullWidth
          />
        </CdfField>
        <CdfField>
          <CdfNumberInput name="amount" label="Request Loan Amount" required fullWidth />
        </CdfField>
        <CdfField>
          <LoanPurposeDropdown name="loanPurpose" label={t(' Loan Purpose')} required fullWidth />
        </CdfField>
        <CdfField>
          <LanguageDropdown name="language" label={t(' Preferred Language ')} required fullWidth />
        </CdfField>
      </CdfContainer>

      <CdfContainer>
        <CdfField wide>
          <CdfSlider
            marksStep={5}
            maxValue={35}
            minValue={10}
            step={1}
            title="Request Tenure (in Years)"
            name={''}
          />
        </CdfField>
      </CdfContainer>
    </>
  );
};

export default ProductDetailsForm;
