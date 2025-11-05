import { describe, it, expect, beforeEach } from 'vitest';
import useMasterDataStore from './masterDataStore';
import type { BranchType, OptionType } from '@core/types';

describe('useMasterDataStore', () => {
  // Reset store before each test to avoid state leakage
  beforeEach(() => {
    const { setState } = useMasterDataStore;
    setState({
      branches: [],
      products: [],
      loanTypes: [],
      sourceName: [],
      vendor: [],
      bank: [],
      loanPurpose: [],
      propertyTypes: [],
      languages: [],
    });
  });

  it('should initialize with empty arrays', () => {
    const state = useMasterDataStore.getState();
    expect(state.branches).toEqual([]);
    expect(state.products).toEqual([]);
    expect(state.loanTypes).toEqual([]);
    expect(state.sourceName).toEqual([]);
    expect(state.vendor).toEqual([]);
    expect(state.bank).toEqual([]);
    expect(state.loanPurpose).toEqual([]);
    expect(state.propertyTypes).toEqual([]);
    expect(state.languages).toEqual([]);
  });

  it('should set branches using setBranches', () => {
    const mockBranches: BranchType[] = [
      {
        branchId: '1',
        branchDesc: 'KALYANI VF',
      },
    ];

    useMasterDataStore.getState().setBranches(mockBranches);

    expect(useMasterDataStore.getState().branches).toEqual(mockBranches);
  });

  it('should set products using setProducts', () => {
    const mockProducts: OptionType[] = [
      { id: 101, label: 'Product 1' },
      { id: 102, label: 'Product 2' },
    ];

    useMasterDataStore.getState().setProducts(mockProducts);

    expect(useMasterDataStore.getState().products).toEqual(mockProducts);
  });

  it('should set state dynamically using setData', () => {
    const mockBranches: OptionType[] = [{ id: 3, label: 'Dynamic Branch' }];
    const mockProducts: OptionType[] = [{ id: 201, label: 'Dynamic Product' }];

    // dynamically update branches
    useMasterDataStore.getState().setData('branches', mockBranches);
    expect(useMasterDataStore.getState().branches).toEqual(mockBranches);

    // dynamically update products
    useMasterDataStore.getState().setData('products', mockProducts);
    expect(useMasterDataStore.getState().products).toEqual(mockProducts);
  });
  it('should set loanTypes using setLoanTypes', () => {
    const mockLoanTypes: OptionType[] = [{ id: 1, label: 'Home Loan' }];
    useMasterDataStore.getState().setLoanTypes(mockLoanTypes);
    expect(useMasterDataStore.getState().loanTypes).toEqual(mockLoanTypes);
  });

  it('should set sourceName using setSourceName', () => {
    const mockSourceBy: OptionType[] = [{ id: 1, label: 'Online' }];
    useMasterDataStore.getState().setSourceName(mockSourceBy);
    expect(useMasterDataStore.getState().sourceName).toEqual(mockSourceBy);
  });
  it('should set sourceName using setSourceName', () => {
    const mockSourceBy: OptionType[] = [{ id: 1, label: 'Online' }];
    useMasterDataStore.getState().setSourceName(mockSourceBy);
    expect(useMasterDataStore.getState().sourceName).toEqual(mockSourceBy);
  });

  it('should set vendorName using setVendorName', () => {
    const mockVendorName: OptionType[] = [{ id: 1, label: 'Vendor A' }];
    useMasterDataStore.getState().setVendor(mockVendorName);
    expect(useMasterDataStore.getState().vendor).toEqual(mockVendorName);
  });

  it('should set bankName using setBankName', () => {
    const mockBankName: OptionType[] = [{ id: 1, label: 'Bank X' }];
    useMasterDataStore.getState().setBank(mockBankName);
    expect(useMasterDataStore.getState().bank).toEqual(mockBankName);
  });

  it('should set loanPurposes using setLoanPurposes', () => {
    const mockLoanPurposes: OptionType[] = [{ id: 1, label: 'Education' }];
    useMasterDataStore.getState().setLoanPurpose(mockLoanPurposes);
    expect(useMasterDataStore.getState().loanPurpose).toEqual(mockLoanPurposes);
  });

  it('should set propertyTypes using setPropertyTypes', () => {
    const mockPropertyTypes: OptionType[] = [{ id: 1, label: 'Apartment' }];
    useMasterDataStore.getState().setPropertyTypes(mockPropertyTypes);
    expect(useMasterDataStore.getState().propertyTypes).toEqual(mockPropertyTypes);
  });

  it('should set preferredLanguages using setPreferredLanguages', () => {
    const mockPreferredLanguages: OptionType[] = [{ id: 1, label: 'English' }];
    useMasterDataStore.getState().setLanguages(mockPreferredLanguages);
    expect(useMasterDataStore.getState().languages).toEqual(mockPreferredLanguages);
  });

  it('should set data dynamically using setData', () => {
    const mockDynamic: OptionType[] = [{ id: 99, label: 'Dynamic Item' }];
    useMasterDataStore.getState().setData('propertyTypes', mockDynamic);
    expect(useMasterDataStore.getState().propertyTypes).toEqual(mockDynamic);
  });
});
