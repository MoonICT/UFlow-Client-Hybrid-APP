import types from '../actions/types';

const defaultState = {
  show: false,
  title: '',
  content: '',
  type: '',
  image: '',
};

export default (state = defaultState, action) => {
  console.log('action :>> ', action);
  switch (action.type) {
    case types.POPUP_SHOW:
      return {
        ...state, // show
        show: true,
        type: action.payload.type || '',
        title: action.payload.title || '',
        content: action.payload.content || '',
        image: action.payload.image || '',
      };
    case types.POPUP_HIDE:
      return {
        ...state, // hide
        show: false,
        title: '',
        content: '',
        type: '',
        image: '',
      };
    default:
      return state;
  }
};
