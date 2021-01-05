import types from '../actions/types';

const defaultState = {
  isLogin: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.LOGIN_ACCOUNT:
      return { ...state, isLogin: action };
    default:
      return state;
  }
};
