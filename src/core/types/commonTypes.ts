export type DataObject = Record<string, string>;

export type OptionType = {
  id: string | number;
  label: string;
};

export type FormDataType = {
  [name: string]: string;
};

export type DocumentName = 'Aadhaar' | 'PanCard' | 'Passport' | 'DrivingLicense' | 'VoterId';
