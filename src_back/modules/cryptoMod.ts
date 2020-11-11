import * as cryptoNode from 'crypto';
import { v4 } from 'uuid';
import { DataSinkOutput, MsgToKafkaFromFront } from '../backInterfaces';
import { redisAdapter } from './redisAdapter';

// todo define TS types and logger

export class CryptoMod {
  algorithm: string;

  iv: string;

  constructor(algorithm: string) {
    this.algorithm = algorithm;
    this.iv = '73123c141d77af14e17f57934989a584';
  }

  encrypt(inputText: MsgToKafkaFromFront) {
    const { transactionId } = inputText;
    const text = JSON.stringify(inputText.frontData);
    const data: DataSinkOutput = {
      transactionId: '',
      token: ''
    };
    const secretKey = `${v4()}${v4()}`.replace('-', '').slice(0, 32);
    try {
      const cipher = cryptoNode.createCipheriv(this.algorithm, secretKey, Buffer.from(this.iv, 'hex'));
      const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
      data.transactionId = transactionId;
      data.token = encrypted.toString('hex');
      return redisAdapter.set({ secret: secretKey, transactionId })
        .then(() => JSON.stringify(data));
    } catch (e) {
      console.log('Encrypt Error:', e);
    }
    return Promise.resolve();
  }

  decrypt(inputText: DataSinkOutput) {
    try {
      return redisAdapter.get(inputText.transactionId)
        .then(res => {
          const decipher = cryptoNode.createDecipheriv(this.algorithm, res, Buffer.from(this.iv, 'hex'));
          const decrypted = Buffer.concat([decipher.update(Buffer.from(inputText.token, 'hex')), decipher.final()]);
          return decrypted.toString();
        })
        .catch(e => console.log('DECRYPT redis error', e));
    } catch (e) {
      console.log('Decrypt function Error:', e);
      return null;
    }
  }
}
