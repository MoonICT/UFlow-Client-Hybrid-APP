import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';

//Contants
import { TOKEN } from '@Constant';

export const getAllInquiry = async params => {
  const token = await AsyncStorage.getItem(TOKEN);

  let url = '/api/v1/warehouse/question/page';
  return await mainAxios.get(`${url}`, {
    params: {
      ...params,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
};

export const createAnswer = async data => {
  console.log('formData :>> ', data);
  const token = await AsyncStorage.getItem(TOKEN);
  let defaultParams = {
    content: data.content,
    upperQnaSeq: data.upperQnaSeq,
    warehouseRegNo: data.warehouseRegNo,
  };
  return await mainAxios.post(
    '/api/v1/warehouse/question/answer',
    defaultParams,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: 'application/json',
      },
    },
  );
};
