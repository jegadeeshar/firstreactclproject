export type EnquiryDetail = {
  id?: number;
  customerType: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  mobileNo: string;
  branchId: string;
  productId: string;
  pan: string;
  loanTypeId: string;
  email?: string;
  name?: string;
};

export type EnquirySlice = {
  enquiry: EnquiryDetail | null;
  setEnquiry: (enquiry: EnquiryDetail) => void;
};
