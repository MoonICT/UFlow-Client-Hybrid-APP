import axios from 'axios';
// import { getLocalStorage } from 'utils/localStorage';


// const { REACT_APP_SERVER_RESERVE_URL } = process.env;

/** Get token from sessionStorage */
// let token = getLocalStorage('UID', 0);
// if (token !== '' && token !== null && token !== undefined) token = token;

/** Create Header Request*/
const headerDict = {
  // Accept: 'application/json',
  // Authorization: `Bearer ${token}`
}

//http://3.34.253.144:8000
//https://api.hotel-laundry.com
export const mainAxios = axios.create({
  baseURL: `http://api.uflow.voltpage.net`,
  withCredentials: true,
});

/** Use if have token */
export const mainAxiosToken = axios.create({
  baseURL: `http://api.uflow.voltpage.net`,
  headers: headerDict,
  withCredentials: true,
});

export const reserveAxios = axios.create({
  // baseURL: `${REACT_APP_SERVER_RESERVE_URL}/api`,
  withCredentials: true,
});
