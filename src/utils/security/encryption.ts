import { AES, enc } from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const encryption = {
  encrypt(text: string): string {
    return AES.encrypt(text, ENCRYPTION_KEY).toString();
  },

  decrypt(ciphertext: string): string {
    const bytes = AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return bytes.toString(enc.Utf8);
  }
};