/**
 * Axios Service
 * Deokin 2019.1.24
 * */
import AbstractHttpRequest from './AbstractHttpRequest';
import axios from 'axios';

export default class AxiosService extends AbstractHttpRequest {
  constructor(...args) {
    super(...args);
    // Set config defaults when creating the instance
    const _axos = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });
    this.axios = _axos;
    this.axios.defaults.withCredentials = true;
  }

  // Initialize axios config
  // set default configuration
  initConfig(config) {
    let conf = config || {
      headers: {},
    };
    // conf.headers['accept-language'] = this.language;
    return conf;
  }

  // Catch Error (implement)
  catchError(err) {
    console.log(err);
    // 에러 전이를 위한 throw(다음 catch 구문을 위함.)
    throw err;
  }

  // Request Get (implement)
  requestGet({url, config} = {}) {
    console.debug('::: Axios Request Get :::');
    return this.axios.get(
      url, this.initConfig(config),
    ).then(resp => {
      return resp;
    }).catch(err => {
      this.catchError(err);
    });
  }

  // Request Post (implement)
  requestPost({url, body, config} = {}) {
    console.debug('::: Axios Request Post :::');
    return this.axios.post(
      url, body, this.initConfig(config),
    ).then(resp => {
      return resp;
    }).catch(err => {
      this.catchError(err);
    });
  }

  // Request Put (implement)
  requestPut({url, body, config} = {}) {
    console.debug('::: Axios Request Put :::');
    return this.axios.put(
      url, body, this.initConfig(config),
    ).then(resp => {
      return resp;
    }).catch(err => {
      this.catchError(err);
    });
  }

  // Request Patch (implement)
  requestPatch({url, body, config} = {}) {
    console.debug('::: Axios Request Patch :::');
    return this.axios.patch(
      url, body, this.initConfig(config),
    ).then(resp => {
      return resp;
    }).catch(err => {
      this.catchError(err);
    });
  }

  // Request Delete (implement)
  requestDelete({url, config} = {}) {
    console.debug('::: Axios Request Delete :::');
    return this.axios.delete(
      url, this.initConfig(config),
    ).then(resp => {
      return resp;
    }).catch(err => {
      this.catchError(err);
    });
  }
}
