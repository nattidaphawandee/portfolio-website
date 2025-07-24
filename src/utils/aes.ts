import CryptoJS from 'crypto-js';
export default {
  EncryptionAES: EncryptionAES,
  DecryptionAES: DecryptionAES,
  AESEncryption: AESEncryption
};

// TODO เป็น Method สำหรับการ Encryption Message Algorithm AES256
function EncryptionAES(key: string = '', message: string = '') {
  return CryptoJS.AES.encrypt(message, key).toString();
}

// TODO เป็น Method สำหรับการ Decryption Message Algorithm AES256
function DecryptionAES(key: string = '', encMessage: string = '') {
  return CryptoJS.AES.decrypt(encMessage, key).toString(CryptoJS.enc.Utf8);
}
// TODO เป็น Method สำหรับการ Encryption Message Algorithm AES256
function AESEncryption(signature: string = '', plaintext: string = '') {
  const iv = CryptoJS.lib.WordArray.random(16); // Generate random IV

  const key = CryptoJS.enc.Utf8.parse(signature);
  const mode = CryptoJS.mode.CBC; // Use CFB mode for decryption
  const padding = CryptoJS.pad.Pkcs7; // Use Padding Mode

  const cipherText = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
    mode: mode,
    padding: padding
  });

  // Combine IV and ciphertext and encode as base64
  const combined = CryptoJS.lib.WordArray.create().concat(iv).concat(cipherText.ciphertext);
  return CryptoJS.enc.Base64.stringify(combined);
}
