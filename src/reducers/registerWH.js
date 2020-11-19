import types from '../actions/types';
import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const defaultState = {
  imageData: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.UPLOAD_IMAGE_REGISTER:
      // var abc = handlePicker(state, action);
      // console.log('abc', abc);
      // return handlePicker(state, action);
      return upImage(state, action.image);
    case types.REMOVE_IMAGE_REGISTER:
      console.log('====>state', state, action);
      return removeImg(state, action.id);
    // TODO Action 추가 시 아래에 정의.
    default:
      return state;
  }
};

let upImage = (state, image) => {
  try {
    let imageUpload = [...state.imageData];
    imageUpload.push(image);
    let result = {
      ...state,
      imageData: imageUpload,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};

let removeImg = (state, id) => {
  try {
    let imageList = [...state.imageData];
    imageList.slice(id);
    let imageL = imageList.filter((item, index) => {
      return index !== id;
    });
    let result = {
      ...state,
      imageData: imageL,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};
