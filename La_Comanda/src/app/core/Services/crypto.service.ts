import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private SECRET_KEY = 'padsjfosdfh876783&%$&$453oh246·$64665165346·$&·$&8235473424DSfSDfiygUI/T87y93824$%$(·%DFJBgDFG';
  constructor() { }

  encryptObject(data: any) {
    return crypto.AES.encrypt(JSON.stringify(data), this.SECRET_KEY).toString();
  }

  decryptObect(encryptedData: any) {
    const BYTES = crypto.AES.decrypt(encryptedData.toString(), this.SECRET_KEY);
    return JSON.parse(BYTES.toString(crypto.enc.Utf8));
  }

  hashString(key: string) {
    return crypto.SHA256(key).toString(crypto.enc.Base64);
  }

  Crypto64(data: string) {
    return crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(data));
  }
}
