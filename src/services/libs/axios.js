import axios from 'axios';
// import { getLocalStorage } from 'utils/localStorage';
import AsyncStorage from '@react-native-community/async-storage';
import configURL from '../http/ConfigURL';

// const { REACT_APP_SERVER_RESERVE_URL } = process.env;

/** Get token from sessionStorage */
let token = AsyncStorage.getItem('token');
// if (token !== '' && token !== null && token !== undefined) token = token;
console.log('tokenGet :>> ', token);
/** Create Header Request*/
const headerDict = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
};

const headerMediaDict = {
  // Accept: 'application/json',
  'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
};

export const mainAxios = axios.create({
  baseURL: `${configURL.API_SERVER_ADDRESS}`,
  withCredentials: true,
});

/** Use if have token */
export const mainAxiosToken = axios.create({
  baseURL: `${configURL.API_SERVER_ADDRESS}`,
  headers: headerDict,
  withCredentials: true,
});

export const reserveAxios = axios.create({
  // baseURL: `${REACT_APP_SERVER_RESERVE_URL}/api`,
  withCredentials: true,
});

export const mainMediaAxios = axios.create({
  baseURL: `${configURL.API_SERVER_ADDRESS}`,
  headers: { 'Content-Type': 'multipart/form-data' },
  // withCredentials: true,
});
