import { Axios, parseQuery } from '@Services/http';

export const exGet = ({ param1 = '' }) => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/test/crud${parseQuery({
      query: param1,
    })}`,
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: 'application/json',
      },
    },
  });
};

export const exPost = ({ param1 = '', param2 = 0, param3 = false }) => {
  return Axios.request({
    methodType: 'POST',
    url: `/api/v1/test/crud`,
    payload: {
      test1: param1,
      test2: param2,
      test3: param3,
    },
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: 'application/json',
      },
    },
  });
};

export const exDelete = ({ id = 1 }) => {
  return Axios.request({
    methodType: 'DELETE',
    url: `/api/v1/test/crud/${id}`,
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: 'application/json',
      },
    },
  });
};

export const exPut = ({ id = 1, param1 = '', param2 = 0, param3 = false }) => {
  return Axios.request({
    methodType: 'PUT',
    url: `/api/v1/test/crud/${id}`,
    payload: {
      test1: param1,
      test2: param2,
      test3: param3,
    },
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: 'application/json',
      },
    },
  });
};
