import types from '../actions/types';

const defaultState = {
  image: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.UPLOAD_IMAGE_REGISTER:
      console.log('state', state);
      return {
        ...state, // 기본 state값 포함.
        // image: state.count + action.payload,
      };
    // TODO Action 추가 시 아래에 정의.
    default:
      return state;
  }
};
