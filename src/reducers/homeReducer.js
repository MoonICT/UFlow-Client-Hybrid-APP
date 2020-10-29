import types from '../actions/types';

const defaultState = {
  count: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.HOME_COUNT_UP:
      return {
        ...state, // 기본 state값 포함.
        count: state.count + action.payload,
      };
    case types.HOME_COUNT_DOWN:
      return {
        ...state, // 기본 state값 포함.
        count: state.count - action.payload,
      };
    // TODO Action 추가 시 아래에 정의.
    default:
      return state;
  }
};
