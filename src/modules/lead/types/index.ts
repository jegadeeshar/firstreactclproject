export interface ProductDetail extends Record<string, unknown> {
  customerType: string;
  pan: string;
  product: string;
  branch: string;
  loanType: string;
  subLoanType: string;
  sourceType: string;
  sourceName: string;
  propertyType: string;
  propertyUsage: string;
  loanPurpose: string;
  amount: number;
  language: string;
}
