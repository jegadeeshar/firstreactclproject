import { get, post, put } from '@core/utils/httpUtils';
import { API } from '@core/constants/endpoints';
import type { EnquiryDetail } from '@modules/enquiry/types/enquiryTypes';

/**
 * Fetch all enquiries
 */
const getEnquiries = async (): Promise<EnquiryDetail[]> => {
  try {
    const response = await get<EnquiryDetail[]>(API.ENQUIRY.BASE);
    return response;
  } catch (error) {
    console.error('Failed to fetch enquiries:', error);
    throw error;
  }
};

/**
 * Fetch a single enquiry by ID
 * @param id - enquiry identifier
 */
const getEnquiryById = async (id: number): Promise<EnquiryDetail> => {
  try {
    if (!id) throw new Error('Enquiry ID is required');
    const response = await get<EnquiryDetail>(API.ENQUIRY.byId(id));
    return response;
  } catch (error) {
    console.error(`Failed to fetch enquiry with id ${id}:`, error);
    throw error;
  }
};

/**
 * Save a new enquiry
 * @param payload - enquiry details to save
 */
const saveEnquiry = async (payload: EnquiryDetail): Promise<EnquiryDetail> => {
  try {
    if (!payload) throw new Error('Enquiry payload is required');
    const response = await post<EnquiryDetail>(API.ENQUIRY.BASE, payload);
    return response;
  } catch (error) {
    console.error('Failed to save enquiry:', error);
    throw error;
  }
};

/**
 * Update an existing enquiry
 * @param id - enquiry identifier
 * @param payload - enquiry details to update
 */
const updateEnquiry = async (id: number, payload: EnquiryDetail): Promise<EnquiryDetail> => {
  try {
    if (!id) throw new Error('Enquiry ID is required');
    if (!payload) throw new Error('Enquiry payload is required');
    const response = await put<EnquiryDetail>(API.ENQUIRY.byId(id), payload);
    return response;
  } catch (error) {
    console.error(`Failed to update enquiry with id ${id}:`, error);
    throw error;
  }
};

// Aggregate into a single service object
export const enquiryService = {
  getEnquiries,
  getEnquiryById,
  saveEnquiry,
  updateEnquiry,
};
