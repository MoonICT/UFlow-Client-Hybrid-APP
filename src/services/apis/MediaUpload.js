/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-12-31 14:44:10
 * @modify date 2020-12-31 16:23:04
 * @desc [description]
 */

import { mainMediaAxios } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';
import {TOKEN} from '@Constant'

// /**
//  * Upload Image
//  * @returns {Promise<unknown>}
//  **/
// export const uploadImage =  (body) => {
//   mainMediaAxios.body = body;
//   const data =  mainMediaAxios.request({
//     method: 'POST',
//     url: '/api/v1/file/images',
//   });
//   return data;
// };

/**
 * 20210121 장종례 /api/v1/warehouse/busi-file/upload -> /api/v1/warehouse/busi-file/upload/new
 * 사업자등록증, 업로드 API
 */
export const uploadFile = async (body) => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.post(`/api/v1/warehouse/busi-file/upload/new`, body,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'multipart/form-data'
    }
  });
};

