import { describe, it, expect, beforeEach } from 'vitest';
import type { EnquiryDetail } from '@modules/enquiry/types/enquiryTypes';
import useEnquiryStore from './enquiryStore';

describe('useEnquiryStore', () => {
  const mockEnquiry: EnquiryDetail = { id: 1, name: 'Test Enquiry' } as EnquiryDetail;

  beforeEach(() => {
    // Reset the store before each test to avoid state leakage
    useEnquiryStore.setState({ enquiry: null });
  });

  it('should initialize with enquiry as null', () => {
    const state = useEnquiryStore.getState();
    expect(state.enquiry).toBeNull();
  });

  it('should set enquiry using setEnquiry', () => {
    useEnquiryStore.getState().setEnquiry(mockEnquiry);
    const state = useEnquiryStore.getState();
    expect(state.enquiry).toEqual(mockEnquiry);
  });
});
