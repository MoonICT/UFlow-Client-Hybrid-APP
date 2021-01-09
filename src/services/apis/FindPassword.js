import { Axios, parseQuery } from '@Services/http';
import { mainAxios } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Send Email
 * @returns
 *
 */

export const sendEmail = async payload => {
  console.log(payload)
  return await mainAxios.post(`/api/v1/find/reset/password`, payload);
};
