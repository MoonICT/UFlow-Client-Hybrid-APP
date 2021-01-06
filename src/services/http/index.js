/**
 * Http service with axios
 * Created by Deokin on 2020-10-28.
 */
// Global Imports
import axios, { AxiosResponse } from "axios";
import configURL from './ConfigURL';
import AsyncStorage from '@react-native-community/async-storage';

// Local Imports

// TODO  언어 쿠키 설정 필요.
// const lang = Cookies.get(LANGUAGE_KEY_NAME) ? Cookies.get(LANGUAGE_KEY_NAME) : 'ko-KR'

// eslint-disable-next-line no-underscore-dangle
const _axios = axios.create({
  baseURL: `${configURL.API_SERVER_ADDRESS}`,
});

const Axios = {
  request: async parameter => {
    const {
      methodType,
      url,
      payload,
      requiresToken,
      language,
      config,
    } = parameter;

    return new Promise((resolve, reject) => {
      // axios request default options
      const headers = (config && config.headers) ? config.headers : {};

      // if accept language
      if (language) {
        headers["accept-language"] = language;
      }

      if (headers.contentType) {
        headers["Content-Type"] = headers.contentType;
        delete headers.contentType;
      } else {
        headers["Content-Type"] = 'application/json';
      }

      // if API endpoint requires a token
      if (requiresToken) {
        AsyncStorage.getItem('token').then(value=>{
          headers['Authorization'] = `Bearer ${value}`;
        });
      }

      // Request with axios
      _axios
        .request({
          url,
          method: methodType,
          data: payload,
          headers,
          withCredentials: true,
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status >= 400 && err.response.status < 500) {
              const errData = err.response.data;
              console.log('::: Error Code :', errData.code);
              console.log('::: Error Message :', errData.message);
              // alert(errData.message)
            } else {
              const errData = err.response.data;
              console.log('::: Error Code :', errData.code);
              // alert('서버에러:' + errData.message)
            }
          }
          reject(err);
        });
    });
  },

  getTokenByReqHeader: (req) => {
    const cookieSrc = req ? { cookie: req.headers.cookie } : '';
    const cookies = cookieSrc.cookie.split(";").filter((item, index, array) => {
      return item.trim().indexOf('uflow-access-token') !== -1;
    });
    return cookies[0].split("=")[1];
  },

  getRequest: async function (parameter) {
    parameter.methodType = 'GET';
    return this.request(parameter);
  },

  postRequest: async function (parameter) {
    parameter.methodType = 'POST';
    return this.request(parameter);
  },

  putRequest: async function (parameter) {
    parameter.methodType = 'PUT';
    return this.request(parameter);
  },

  patchRequest: async function (parameter) {
    parameter.methodType = 'PATCH';
    return this.request(parameter);
  },

  deleteRequest: async function (parameter) {
    parameter.methodType = 'DELETE';
    return this.request(parameter);
  },
};

// Parse Query String
const parseQuery = (params) => {
  if (typeof params === 'object') {
    return '?' + Object.keys(params).reduce(function (a, k) {
      a.push(k + '=' + encodeURIComponent(params[k]))
      return a
    }, []).join('&')
  } else {
    return ''
  }
}

export { Axios, parseQuery };

