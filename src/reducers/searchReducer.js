import types from '../actions/types';

const defaultState = {
  isSearchToggle: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SEARCH_OVERLAY_TOGGLE:
      return {
        ...state, // 기본 state값 포함.
        isSearchToggle: action.payload,
      };
    // TODO Action 추가 시 아래에 정의.
    default:
      return state;
  }
};
