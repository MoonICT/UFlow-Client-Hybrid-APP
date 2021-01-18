import types from './types';

export function setWHImages(listImage) {
  return {
    type: types.DATA_IMAGE_REGISTER,
    listImage: listImage, // Array
  };
}

export function uploadImage(image) {
  return {
    type: types.UPLOAD_IMAGE_REGISTER,
    image: image,
  };
}

export function removeImage(data) {
  return {
    type: types.REMOVE_IMAGE_REGISTER,
    data: data,
  };
}
// TODO 위 형식과 같이 Action 함수 작성.

export function ContractConditions(data) {
  return {
    type: types.CONTRACT_CONDITIONS,
    data: data,
  };
}

export function updateInfo(data) {
  return {
    type: types.UPDATE_INFO_WH,
    data: data,
  };
}

export function removeData(data) {
  return {
    type: types.REMOVE_INFO_WH,
    data: data,
  };
}
