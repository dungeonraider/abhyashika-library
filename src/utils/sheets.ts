import { FormData } from '../types/form';
import { SheetResponse } from '../types/sheets';
import { sheetsConfig } from '../config/sheets';
import { logger } from './logger';

const prepareSubmissionData = (formData: FormData) => {
  // Create a URLSearchParams object to properly encode the data
  const params = new URLSearchParams();
  
  // Add each field to the params
  params.append('timestamp', new Date().toISOString());
  params.append('name', formData.name);
  params.append('email', formData.email);
  params.append('mobile', formData.mobile);
  params.append('slot', formData.slot);
  
  return params;
};

export const submitToGoogleSheets = async (formData: FormData): Promise<SheetResponse> => {
  try {
    logger.info('Preparing form submission', formData);
    const params = prepareSubmissionData(formData);
    
    logger.info('Submitting to Google Sheets', Object.fromEntries(params));
    
    // Submit data using URL encoded form data
    const response = await fetch(sheetsConfig.scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    
    // Since we're using no-cors, we won't get a proper response
    // We'll assume success if no error is thrown
    logger.info('Form submission completed');
    return { result: 'success' };
  } catch (error) {
    logger.error('Failed to submit form', error);
    throw new Error('Failed to submit form. Please try again later.');
  }
};