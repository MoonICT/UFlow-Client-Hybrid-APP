/**
 * Abstract Http Request
 *
 * Deokin 2019.1.24(완료)
 * */
export default class AbstractHttpRequest {
  constructor({accessToken = '', language = 'ko-KR', baseUrl = ''} = {}) {
    this.baseUrl = baseUrl;
    this.language = language;
    this.accessToken = accessToken;
  }

  // Request Get
  requestGet() {
    throw new Error('requestGet() must be implement.');
  }

  // Request Post
  requestPost() {
    throw new Error('requestPost() must be implement.');
  }

  // Request Put
  requestPut() {
    throw new Error('requestPut() must be implement.');
  }

  // Request Patch
  requestPatch() {
    throw new Error('requestPatch() must be implement.');
  }

  // Request Delete
  requestDelete() {
    throw new Error('requestDelete() must be implement.');
  }

  // Catch Error
  catchError() {
    throw new Error('catchError() must be implement.');
  }

  // Parse Query String
  parseQuery(params) {
    if (typeof params === 'object') {
      return (
        '?' +
        Object.keys(params)
          .reduce(function(a, k) {
            a.push(k + '=' + encodeURIComponent(params[k]));
            return a;
          }, [])
          .join('&')
      );
    } else {
      return '';
    }
  }
}
