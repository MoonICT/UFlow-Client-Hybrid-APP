import types from '../actions/types';

const defaultState = {
  show: false,
  title: '',
  content: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.POPUP_SHOW:
      return {
        ...state, // show
        show: true,
        title: action.payload.title || '',
        content: action.payload.content || '',
      };
    case types.POPUP_HIDE:
      return {
        ...state, // hide
        show: false,
        title: '',
        content: '',
      };
    default:
      return state;
  }
};
