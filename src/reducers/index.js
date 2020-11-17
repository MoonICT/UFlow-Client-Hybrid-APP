import {combineReducers} from 'redux';
import HomeReducer from './homeReducer';
import PopupReducer from './popupReducer';
import SearchReducer from './searchReducer';

export default combineReducers({
  // HomeReducer,
  // PopupReducer,
  // SearchReducer,
  home: HomeReducer,
  popup: PopupReducer,
  search: SearchReducer,
  // TODO 분류된 리듀서를 아래에 추가.
});
