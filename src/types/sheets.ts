export interface SheetSubmissionData {
  name: string;
  email: string;
  mobile: string;
  slot: string;
  timestamp: string;
}

export interface SheetResponse {
  result: 'success' | 'error';
  message?: string;
}