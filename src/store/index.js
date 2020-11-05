import reducers from '../reducers';
import {createStore} from 'redux';

export default function initSotre() {
  const store = createStore(reducers);
  return store;
}
