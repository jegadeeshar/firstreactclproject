import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { masterService } from './masterService';
import { useMasterDataStore } from '@core/store';
import { API } from '@core/constants';
import { MASTER_MOCK_DATA } from '@/core/constants/mockData';

vi.mock('@core/utils/httpUtils', () => ({
  get: vi.fn(),
}));

vi.mock('@core/utils/loggerUtils', () => ({
  default: {
    info: vi.fn(),
  },
}));

describe('masterService', () => {
  beforeEach(() => {
    useMasterDataStore.setState({
      branches: [],
      products: [],
      loanTypes: [],
      sourceName: [],
      sourceType: [],
      vendor: [],
      bank: [],
      loanPurpose: [],
      propertyTypes: [],
      languages: [],
      propertyUsage: [],
      subLoanType: [],
    });
    vi.clearAllMocks();
  });

  it('should fetch branches and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    const { default: logger } = await import('@core/utils/loggerUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.BRANCHES);

    const result = await masterService.getBranches();

    expect(result).toEqual(MASTER_MOCK_DATA.BRANCHES);
    expect(useMasterDataStore.getState().branches).toEqual(MASTER_MOCK_DATA.BRANCHES);
    expect(get).toHaveBeenCalledWith(API.BRANCHES);
    expect(logger.info).toHaveBeenCalledWith(
      `Fetching master data from ${API.BRANCHES} for state "branches"`
    );
  });

  it('should fetch products and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.PRODUCTS);

    const result = await masterService.getProducts();

    expect(result).toEqual(MASTER_MOCK_DATA.PRODUCTS);
    expect(useMasterDataStore.getState().products).toEqual(MASTER_MOCK_DATA.PRODUCTS);
    expect(get).toHaveBeenCalledWith(API.PRODUCTS);
  });

  it('should fetch loan types and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.LOAN_TYPE);

    const result = await masterService.getLoanTypes();

    expect(result).toEqual(MASTER_MOCK_DATA.LOAN_TYPE);
    expect(useMasterDataStore.getState().loanTypes).toEqual(MASTER_MOCK_DATA.LOAN_TYPE);
    expect(get).toHaveBeenCalledWith(API.LOAN_TYPE);
  });

  it('should fetch source names and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.SOURCE_NAME);

    const result = await masterService.getSourceName();

    expect(result).toEqual(MASTER_MOCK_DATA.SOURCE_NAME);
    expect(useMasterDataStore.getState().sourceName).toEqual(MASTER_MOCK_DATA.SOURCE_NAME);
    expect(get).toHaveBeenCalledWith(API.SOURCE_NAME);
  });

  it('should fetch vendors and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.VENDOR);

    const result = await masterService.getVendor();

    expect(result).toEqual(MASTER_MOCK_DATA.VENDOR);
    expect(useMasterDataStore.getState().vendor).toEqual(MASTER_MOCK_DATA.VENDOR);
    expect(get).toHaveBeenCalledWith(API.VENDOR);
  });

  it('should fetch banks and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.BANK);

    const result = await masterService.getBank();

    expect(result).toEqual(MASTER_MOCK_DATA.BANK);
    expect(useMasterDataStore.getState().bank).toEqual(MASTER_MOCK_DATA.BANK);
    expect(get).toHaveBeenCalledWith(API.BANK);
  });

  it('should fetch loan purposes and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.LOAN_PURPOSE);

    const result = await masterService.getLoanPurpose();

    expect(result).toEqual(MASTER_MOCK_DATA.LOAN_PURPOSE);
    expect(useMasterDataStore.getState().loanPurpose).toEqual(MASTER_MOCK_DATA.LOAN_PURPOSE);
    expect(get).toHaveBeenCalledWith(API.LOAN_PURPOSE);
  });

  it('should fetch property types and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.PROPERTY_TYPES);

    const result = await masterService.getPropertyTypes();

    expect(result).toEqual(MASTER_MOCK_DATA.PROPERTY_TYPES);
    expect(useMasterDataStore.getState().propertyTypes).toEqual(MASTER_MOCK_DATA.PROPERTY_TYPES);
    expect(get).toHaveBeenCalledWith(API.PROPERTY_TYPES);
  });

  it('should fetch preferred languages and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.LANGUAGES);

    const result = await masterService.getLanguages();

    expect(result).toEqual(MASTER_MOCK_DATA.LANGUAGES);
    expect(useMasterDataStore.getState().languages).toEqual(MASTER_MOCK_DATA.LANGUAGES);
    expect(get).toHaveBeenCalledWith(API.LANGUAGES);
  });

  it('should fetch sub loan types and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.SUB_LOAN_TYPE);

    const result = await masterService.getSubLoanType();

    expect(result).toEqual(MASTER_MOCK_DATA.SUB_LOAN_TYPE);
    expect(useMasterDataStore.getState().subLoanType).toEqual(MASTER_MOCK_DATA.SUB_LOAN_TYPE);
    expect(get).toHaveBeenCalledWith(API.SUB_LOAN_TYPE);
  });

  it('should fetch property usage and update store', async () => {
    const { get } = await import('@core/utils/httpUtils');
    (get as Mock).mockResolvedValueOnce(MASTER_MOCK_DATA.PROPERTY_USAGE);

    const result = await masterService.getPropertyUsage();

    expect(result).toEqual(MASTER_MOCK_DATA.PROPERTY_USAGE);
    expect(useMasterDataStore.getState().propertyUsage).toEqual(MASTER_MOCK_DATA.PROPERTY_USAGE);
    expect(get).toHaveBeenCalledWith(API.PROPERTY_USAGE);
  });
});
