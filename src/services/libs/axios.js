import axios from 'axios';
// import { getLocalStorage } from 'utils/localStorage';
import AsyncStorage from '@react-native-community/async-storage';
import configURL from '../http/ConfigURL';

// const { REACT_APP_SERVER_RESERVE_URL } = process.env;

//Contants
import { TOKEN, LANG_STATUS_KEY } from '@Constant';

/** Get token from sessionStorage */
let token = AsyncStorage.getItem(TOKEN);
let langData = AsyncStorage.getItem(LANG_STATUS_KEY);
// if (token !== '' && token !== null && token !== undefined) token = token;
// console.log('tokenGet :>> ', token);
/** Create Header Request*/
const headerDict = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
  "accept-language": langData ? langData : 'ko-KR',
};

const headerMediaDict = {
  // Accept: 'application/json',
  'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
};

export const mainAxios = axios.create({
  baseURL: `${configURL.API_SERVER_ADDRESS}`,
  withCredentials: true,
  headers: {
    "accept-language": langData ? langData : 'ko-KR',
  }
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
  headers: {
    "accept-language": langData ? langData : 'ko-KR',
  }
});

export const mainMediaAxios = axios.create({
  baseURL: `${configURL.API_SERVER_ADDRESS}`,
  headers: {
    'Content-Type': 'multipart/form-data',
    "accept-language": langData ? langData : 'ko-KR',
  },
  // withCredentials: true,
});
