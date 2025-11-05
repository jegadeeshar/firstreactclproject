import { create } from 'zustand';
import { createEnquirySlice } from './enquirySlice';
import type { EnquirySlice } from '@modules/enquiry/types/enquiryTypes';

// Add other slices here Eg: `EnquirySlice & OtherSlice`
type Store = EnquirySlice;

const useEnquiryStore = create<Store>((...a) => ({
  ...createEnquirySlice(...a),
  // Add other slices here
}));

export default useEnquiryStore;
