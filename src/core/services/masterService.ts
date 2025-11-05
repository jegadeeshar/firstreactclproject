import { get } from '@core/utils/httpUtils';
import { useMasterDataStore } from '@core/store';
import logger from '@core/utils/loggerUtils';
import { API } from '@core/constants';
import type { Branch } from '@core/types';

/**
 * Fetches master data from the specified URL and updates the master data store.
 *
 * @param url - The endpoint URL to fetch the master data from.
 * @param stateName - The key or state name under which the fetched data will be stored in the master data store.
 * @returns A promise that resolves to an array of objects representing the fetched master data.
 */
const fetchMasterData = async <T extends object>(url: string, stateName: string): Promise<T[]> => {
  // Log the fetch action
  logger.info(`Fetching master data from ${url} for state "${stateName}"`);
  // Perform the GET request
  const response = await get<T[]>(url);
  // Update the master data store
  useMasterDataStore.getState().setData(stateName, response);
  return response;
};

/**
 * Fetches branches and stores them in master data store under the "branches" key.
 */
const getBranches = async (): Promise<Branch[]> => {
  // Fetch branches from the API
  const branches = await fetchMasterData<Branch>(API.BRANCHES, 'branches');
  return branches;
};

const getProducts = async (): Promise<Branch[]> => {
  const products = await fetchMasterData<Branch>(API.PRODUCTS, 'products');
  return products;
};

const getLoanTypes = async (): Promise<Branch[]> => {
  const loanTypes = await fetchMasterData<Branch>(API.LOAN_TYPE, 'loanTypes');
  return loanTypes;
};

const getSourceName = async (): Promise<Branch[]> => {
  const sourceName = await fetchMasterData<Branch>(API.SOURCE_NAME, 'sourceName');
  return sourceName;
};
const getSourceType = async (): Promise<Branch[]> => {
  const sourceType = await fetchMasterData<Branch>(API.SOURCE_NAME, 'sourceType');
  return sourceType;
};
const getVendor = async (): Promise<Branch[]> => {
  const vendor = await fetchMasterData<Branch>(API.VENDOR, 'vendor');
  return vendor;
};
const getBank = async (): Promise<Branch[]> => {
  const bank = await fetchMasterData<Branch>(API.BANK, 'bank');
  return bank;
};

const getLoanPurpose = async (): Promise<Branch[]> => {
  const loanPurpose = await fetchMasterData<Branch>(API.LOAN_PURPOSE, 'loanPurpose');
  return loanPurpose;
};

const getPropertyTypes = async (): Promise<Branch[]> => {
  const propertyTypes = await fetchMasterData<Branch>(API.PROPERTY_TYPES, 'propertyTypes');
  return propertyTypes;
};
const getLanguages = async (): Promise<Branch[]> => {
  const languages = await fetchMasterData<Branch>(API.LANGUAGES, 'languages');
  return languages;
};
const getSubLoanType = async (): Promise<Branch[]> => {
  const subLoanType = await fetchMasterData<Branch>(API.SUB_LOAN_TYPE, 'subLoanType');
  return subLoanType;
};
const getPropertyUsage = async (): Promise<Branch[]> => {
  const propertyUsage = await fetchMasterData<Branch>(API.PROPERTY_USAGE, 'propertyUsage');
  return propertyUsage;
};
// Aggregate into a single service object
export const masterService = {
  getBranches,
  getProducts,
  getLoanTypes,
  getSourceName,
  getSourceType,
  getVendor,
  getBank,
  getLoanPurpose,
  getPropertyTypes,
  getLanguages,
  getSubLoanType,
  getPropertyUsage,
};
