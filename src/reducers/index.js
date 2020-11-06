import {combineReducers} from 'redux';
import HomeReducer from './homeReducer';
import PopupReducer from './popupReducer';

export default combineReducers({
  home: HomeReducer,
  popup: PopupReducer,
  // TODO 분류된 리듀서를 아래에 추가.
});
