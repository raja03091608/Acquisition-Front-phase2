import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private secretKey = 'my-super-secret-key';

  setItem(key: string, value: any) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.secretKey,
    ).toString();

    localStorage.setItem(key, encrypted);
  }

  getItem(key: string) {
    const encrypted = localStorage.getItem(key);

    if (!encrypted) return null;

    const bytes = CryptoJS.AES.decrypt(encrypted, this.secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
