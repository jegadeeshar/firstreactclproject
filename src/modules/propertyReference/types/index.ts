export type PropertyDetails = {
  propertyUsage: string;
  propertyType: string;
  propertyTitle: string;
  propertyOwnership: string;
  propertyOwner: string;
  typeOfDocument: string;
  uploadDoc: File;
  uploadedDoc: File;
  buyerName: string;
  sellerName: string;
  propertyTypeAsPerTheAboveDeed: string;
  north: string;
  east: string;
  south: string;
  west: string;
  areaOfProperty: string;
  bua: string;
  approvedPlanAvailable: string;
  anyAdditionalDocFivenForValuation: string;
  isItAPurchaseTranscation: string;
  nameOfPurposedPropertyOwner: string;
  nameOfPresentPropertyOwner: string;
};

export type ReferenceDetail = {
  id?: number;
  referenceFullName: string;
  mobileNo: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pinCode: string;
};
