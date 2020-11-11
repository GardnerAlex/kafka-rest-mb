import axios from 'axios';
import { PerformTransactionRequest, PerformTransactionResponse } from '../interfaces';

const apiHost = process.env.API_HOST;
const apiRestPort = process.env.API_REST_PORT;
const apiBaseUrl = process.env.API_BASE_URL;
const apiEndPoint = process.env.API_DATASOURCE_URL;

export const sendData = (inputParams: PerformTransactionRequest):Promise<PerformTransactionResponse> => {
  const url = `${apiHost}:${apiRestPort}${apiBaseUrl}${apiEndPoint}`;
  // const url = '';
  const ax = axios.create();
  const error = {
    code: 0,
    description: ''
  };
  const numCheck = new RegExp('^[0-9]+$');
  if (!numCheck.test(inputParams.card)) {
    error.code = -1;
    error.description = 'Invalid card number';
  } else if (!numCheck.test(inputParams.cvv)) {
    error.code = -2;
    error.description = 'Invalid card CVV number';
  }
  // todo validate date: a bit complicated depending from local date-time formats settings and dangerous, test and fix
  if (error.code === 0) {
    try {
      return ax({
        method: 'post',
        url,
        data: JSON.stringify(inputParams),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res);
    } catch (error) {
      console.log(error);
    }
  }
  console.log('validation error ');
  return Promise.resolve<PerformTransactionResponse>({
    data: {
      result: {
        success: false,
        transactionId: null
      },
      error
    }
  });
};
