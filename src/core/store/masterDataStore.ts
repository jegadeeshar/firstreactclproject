import { MASTER_MOCK_DATA } from '@/core/constants';
import type { BranchType, OptionType } from '@core/types';
import { create } from 'zustand';

type MasterDataStore = {
  branches: BranchType[];
  products: OptionType[];
  loanTypes: OptionType[];
  sourceName: OptionType[];
  sourceType: OptionType[];
  vendor: OptionType[];
  bank: OptionType[];
  loanPurpose: OptionType[];
  propertyTypes: OptionType[];
  languages: OptionType[];
  subLoanType: OptionType[];
  propertyUsage: OptionType[];
  setData: (stateName: string, data: object[]) => void;
  setBranches: (branches: BranchType[]) => void;
  setProducts: (products: OptionType[]) => void;
  setLoanTypes: (loanTypes: OptionType[]) => void;
  setSourceName: (sourceName: OptionType[]) => void;
  setSourceType: (sourceType: OptionType[]) => void;
  setVendor: (vendor: OptionType[]) => void;
  setBank: (bank: OptionType[]) => void;
  setLoanPurpose: (loanPurpose: OptionType[]) => void;
  setPropertyTypes: (propertyTypes: OptionType[]) => void;
  setLanguages: (languages: OptionType[]) => void;
  setSubLoanType: (subLoanType: OptionType[]) => void;
  setPropertyUsage: (propertyUsage: OptionType[]) => void;
};

const useMasterDataStore = create<MasterDataStore>((set) => ({
  branches: MASTER_MOCK_DATA.BRANCHES,
  products: MASTER_MOCK_DATA.PRODUCTS,
  loanTypes: MASTER_MOCK_DATA.LOAN_TYPE,
  sourceName: MASTER_MOCK_DATA.SOURCE_NAME,
  sourceType: MASTER_MOCK_DATA.SOURCE_TYPE,
  vendor: MASTER_MOCK_DATA.VENDOR,
  bank: MASTER_MOCK_DATA.BANK,
  loanPurpose: MASTER_MOCK_DATA.LOAN_PURPOSE,
  propertyTypes: MASTER_MOCK_DATA.PROPERTY_TYPES,
  languages: MASTER_MOCK_DATA.LANGUAGES,
  subLoanType: MASTER_MOCK_DATA.SUB_LOAN_TYPE,
  propertyUsage: MASTER_MOCK_DATA.PROPERTY_USAGE,
  setData: (stateName: string, data: object[]) => set({ [stateName]: data }),
  setBranches: (branches) => set({ branches }),
  setProducts: (products) => set({ products }),
  setLoanTypes: (loanTypes) => set({ loanTypes }),
  setSourceName: (sourceName) => set({ sourceName }),
  setSourceType: (sourceType) => set({ sourceType }),
  setVendor: (vendor) => set({ vendor }),
  setBank: (bank) => set({ bank }),
  setLoanPurpose: (loanPurpose) => set({ loanPurpose }),
  setPropertyTypes: (propertyTypes) => set({ propertyTypes }),
  setLanguages: (languages) => set({ languages }),
  setSubLoanType: (subLoanType) => set({ subLoanType }),
  setPropertyUsage: (propertyUsage) => set({ propertyUsage }),
}));

export default useMasterDataStore;
