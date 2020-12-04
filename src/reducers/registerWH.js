import types from '../actions/types';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const defaultState = {
  imageData: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    // TODO Action 추가 시 아래에 정의.
    case types.DATA_IMAGE_REGISTER:
      return dataImage(state, action.listImage);
    case types.UPLOAD_IMAGE_REGISTER:
      return upImage(state, action.image);
    case types.REMOVE_IMAGE_REGISTER:
      return removeImg(state, action.id);
    case types.CONTRACT_CONDITIONS:
      return ContractConditions(state, action.data);
    default:
      return state;
  }
};

let dataImage = (state, listImage) => {
  console.log('state', state);
  console.log('listImage', listImage);
  try {
    // let imageUpload = [...state.imageData];
    // imageUpload.push(image);
    let result = {
      ...state,
      imageData: listImage,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
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

let ContractConditions = (state, data) => {
  console.log('action', data);
  try {
    let result = {
      ...state,
      workComplete: data,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};
