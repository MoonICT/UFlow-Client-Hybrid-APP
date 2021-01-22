import types from '../actions/types';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const defaultState = {
  pnImages: [],
  whImages: [],
  thImages: [],
  entrpNo: '',
  // data: {
  //   test: 1,
  // },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    // TODO Action 추가 시 아래에 정의.
    case types.DATA_IMAGE_REGISTER:
      return setWHImages(state, action.listImage);
    case types.UPLOAD_IMAGE_REGISTER:
      return upImage(state, action.image);
    case types.REMOVE_IMAGE_REGISTER:
      return removeImg(state, action.data);
    case types.CONTRACT_CONDITIONS:
      return ContractConditions(state, action.data);
    case types.UPDATE_INFO_WH:
      return updateInfo(state, action.data);
    case types.REMOVE_INFO_WH:
      return removeData(state, action.data);
    default:
      return state;
  }
};

let setWHImages = (state, listImage) => {
  // console.log('state', state);
  console.log('listImage', listImage);
  try {
    // let imageUpload = [...state.pimages];
    // imageUpload.push(image);
    let result = {
      ...state,
      whImages: listImage,
      thImages: [listImage[0]],
      // pnImages: listImage,
    };
    return result;
  } catch (e) {
    console.log('error_data_image', e);
    return state;
  }
};

let upImage = (state, image) => {
  console.log('state', state);
  console.log('listImage', image);
  try {
    let imageUpload = [...state.whImages];
    let imageTh = [...state.whImages];
    let imagePn = [...state.pnImages];

    if (image.value === 0) {
      imageUpload.push({ name: image.name, url: image.url });
    }
    if (image.value === 1) {
      imagePn = [{ name: image.name, url: image.url }];
      // imagePn.push({ name: image.name, url: image.url });
    }
    // imageTh.length > 0 ? imageTh : imageTh.push(image);
    let result = {
      ...state,
      thImages: [imageUpload[0]],
      whImages: imageUpload,
      pnImages: imagePn,
    };
    return result;
  } catch (e) {
    console.log('error_upImage', e);
    return state;
  }
};

let removeImg = (state, data) => {
  console.log('data :>> ', data);
  try {
    let imageList = [];
    if (data.value === 0) {
      imageList = [...state.whImages];
    }
    if (data.value === 1) {
      imageList = [...state.pnImages];
    }
    // imageList.slice(data.id);
    let imageL = imageList.filter((item, index) => {
      return index !== data.id;
    });
    let result = {
      ...state,
      whImages: data.value === 0 ? imageL : [...state.whImages],
      thImages: data.value === 0 ? imageL : [...state.whImages],
      pnImages: data.value === 1 ? imageL : [...state.pnImages],
    };
    return result;
  } catch (e) {
    console.log('error_remove_image', e);
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
  // console.log('stateRedux', state);
  // console.log('dataRedux', data);

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

let removeData = (state, data) => {
  // console.log('stateREdex :>> ', state);
  try {
    let result = {
      pnImages: [],
      whImages: [],
      thImages: [],
      entrpNo: '',
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};
