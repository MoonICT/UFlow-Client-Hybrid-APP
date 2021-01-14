import types from '../actions/types';

const defaultState = {
  lang: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGE_DATA:
      return {
        ...state,
        lang: action.payload
      };
    default:
      return state;
  }
};
