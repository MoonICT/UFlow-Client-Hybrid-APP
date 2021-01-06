import types from './types';

export function dataImage(listImage) {
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

export function removeImage(id) {
  return {
    type: types.REMOVE_IMAGE_REGISTER,
    id: id,
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
