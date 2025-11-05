export interface CdfDataTableProps<T = unknown> {
  columns: string[];
  data: T[];
  title?: string;
  pagination?: boolean;
}
export interface DataTableRow {
  leadId: number;
  sourceName: string;
  mobileNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
}
