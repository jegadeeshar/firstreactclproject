import type { StateCreator } from 'zustand';
import type { EnquirySlice } from '@modules/enquiry/types/enquiryTypes';

export const createEnquirySlice: StateCreator<EnquirySlice, [], [], EnquirySlice> = (set) => ({
  enquiry: null,
  setEnquiry: (enquiry) => set({ enquiry }),
});
