import types from './types';

export function uploadImage(image) {
  return {
    type: types.UPLOAD_IMAGE_REGISTER,
    image: image, // Boolean
  };
}

export function removeImage(id) {
  return {
    type: types.REMOVE_IMAGE_REGISTER,
    id: id, // Boolean
  };
}
// TODO 위 형식과 같이 Action 함수 작성.
