import types from '../actions/types';

const defaultState = {
  lang: null,
  progress: {
    is: false,
    type: 'CIRCLE', // CIRCLE|BAR
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGE_DATA:
      return {
        ...state,
        lang: action.payload
      };
    case types.SET_PROGRESS:
      return {
        ...state,
        progress: {
          is: action.payload.is,
          type: action.payload.type ? action.payload.type : 'BAR',
        }
      };
    default:
      return state;
  }
};
