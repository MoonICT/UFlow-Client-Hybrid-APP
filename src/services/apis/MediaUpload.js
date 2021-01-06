/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-12-31 14:44:10
 * @modify date 2020-12-31 16:23:04
 * @desc [description]
 */

import { mainMediaAxios } from '../libs/axios';

/**
 * Upload Image
 * @returns {Promise<unknown>}
 **/
export const uploadImage =  (body) => {
  mainMediaAxios.body = body;
  const data =  mainMediaAxios.request({
    method: 'POST',
    url: '/api/v1/file/images',
  });
  return data;
};
