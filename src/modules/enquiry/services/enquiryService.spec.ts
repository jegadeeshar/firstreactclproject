import { describe, it, vi, expect, beforeEach } from 'vitest';
import { enquiryService } from './enquiryService';
import * as httpUtils from '@core/utils/httpUtils';
import { API } from '@core/constants/endpoints';
import type { EnquiryDetail } from '@modules/enquiry/types/enquiryTypes';

// Typed mocks
const getMock = vi.spyOn(httpUtils, 'get');
const postMock = vi.spyOn(httpUtils, 'post');
const putMock = vi.spyOn(httpUtils, 'put');

describe('enquiryService', () => {
  const mockEnquiry: EnquiryDetail = {
    id: 1,
    customerType: 'Individual',
    firstName: 'Test',
    lastName: 'User',
    middleName: 'Middle',
    mobileNo: '9876543210',
    branchId: 'BR001',
    productId: 'PR001',
    pan: 'ABCDE1234F',
    loanTypeId: 'LT001',
    email: 'test@test.com',
    name: 'Test Enquiry',
  };
  const mockEnquiries: EnquiryDetail[] = [mockEnquiry];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getEnquiries should fetch all enquiries', async () => {
    getMock.mockResolvedValue(mockEnquiries);
    const res = await enquiryService.getEnquiries();
    expect(res).toEqual(mockEnquiries);
    expect(getMock).toHaveBeenCalledWith(API.ENQUIRY.BASE);
  });

  it('getEnquiryById should fetch a single enquiry', async () => {
    getMock.mockResolvedValue(mockEnquiry);
    const res = await enquiryService.getEnquiryById(1);
    expect(res).toEqual(mockEnquiry);
    expect(getMock).toHaveBeenCalledWith(API.ENQUIRY.byId(1));
  });

  it('getEnquiryById should throw error if id is missing', async () => {
    await expect(enquiryService.getEnquiryById(0)).rejects.toThrow('Enquiry ID is required');
  });

  it('saveEnquiry should POST new enquiry', async () => {
    postMock.mockResolvedValue(mockEnquiry);
    const res = await enquiryService.saveEnquiry(mockEnquiry);
    expect(res).toEqual(mockEnquiry);
    expect(postMock).toHaveBeenCalledWith(API.ENQUIRY.BASE, mockEnquiry);
  });

  it('saveEnquiry should throw error if payload is missing', async () => {
    // @ts-expect-error Testing missing payload
    await expect(enquiryService.saveEnquiry(undefined)).rejects.toThrow(
      'Enquiry payload is required'
    );
  });

  it('updateEnquiry should PUT update an enquiry', async () => {
    putMock.mockResolvedValue(mockEnquiry);
    const res = await enquiryService.updateEnquiry(1, mockEnquiry);
    expect(res).toEqual(mockEnquiry);
    expect(putMock).toHaveBeenCalledWith(API.ENQUIRY.byId(1), mockEnquiry);
  });

  it('updateEnquiry should throw error if id or payload is missing', async () => {
    // Missing id
    await expect(enquiryService.updateEnquiry(0, mockEnquiry)).rejects.toThrow(
      'Enquiry ID is required'
    );

    // @ts-expect-error Testing missing payload
    await expect(enquiryService.updateEnquiry(1, undefined)).rejects.toThrow(
      'Enquiry payload is required'
    );
  });
});
