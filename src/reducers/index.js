import {combineReducers} from 'redux';
import HomeReducer from './homeReducer';

export default combineReducers({
  home: HomeReducer,
  // TODO 분류된 리듀서를 아래에 추가.
});
