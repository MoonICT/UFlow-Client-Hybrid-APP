import types from '../actions/types';

const defaultState = {
  isLogin: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    // TODO Action 추가 시 아래에 정의.
    case types.LOGIN_ACCOUNT:
      return loginAccount(state, action.isLogin);
    default:
      return state;
  }
};

let loginAccount = (state, isLogin) => {
  console.log('state', state);
  console.log('isLogin', isLogin);
  try {
    // let imageUpload = [...state.pimages];
    // imageUpload.push(image);
    let result = {
      ...state,
      isLogin: isLogin,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};
