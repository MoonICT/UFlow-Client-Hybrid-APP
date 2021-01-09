import types from '../actions/types';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const defaultState = {
  pnImages: [],
  whImages: [],
  thImages: [],
  entrpNo: '987654321',
  // data: {
  //   test: 1,
  // },
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
    case types.UPDATE_INFO_WH:
      return updateInfo(state, action.data);
    default:
      return state;
  }
};

let dataImage = (state, listImage) => {
  console.log('state', state);
  console.log('listImage', listImage);
  try {
    // let imageUpload = [...state.pimages];
    // imageUpload.push(image);
    let result = {
      ...state,
      pnImages: listImage,
      whImages: listImage,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};

let upImage = (state, image) => {
  try {
    let imageUpload = [...state.whImages];
    imageUpload.push(image);
    let result = {
      ...state,
      pnImages: imageUpload,
      whImages: imageUpload,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};

let removeImg = (state, id) => {
  try {
    let imageList = [...state.whImages];
    imageList.slice(id);
    let imageL = imageList.filter((item, index) => {
      return index !== id;
    });
    let result = {
      ...state,
      whImages: imageL,
      pnImages: imageL,
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

let updateInfo = (state, data) => {
  console.log('stateRedux', state);
  console.log('dataRedux', data);

  try {
    let result = {
      ...state,
      ...data,
      // name: data.name,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};
