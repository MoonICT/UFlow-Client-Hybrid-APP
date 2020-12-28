import types from '../actions/types';
import { Platform } from 'react-native';

const defaultState = {
  dataContractWH: [],
  dataFilter: [],
  type: '',
  statusState: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    // TODO Action 추가 시 아래에 정의.
    case types.DATA_CONTRACT_MANAGER:
      return getData(state, action.data);
    case types.FILTER_CONTRACT_MANAGER:
      return filterType(state, action.value);
    default:
      return state;
  }
};

let getData = (state, data) => {
  try {
    let result = {
      ...state,
      dataContractWH: data.dataApi,
      dataFilter: data.dataApi,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};

let filterType = (state, data) => {
  let type = data.type ? data.type : '';
  let status = data.status ? data.type : '';
  let typeFliter;
  let statusState;
  let dataApi = state.dataContractWH.filter(el => {
    if (type === '') {
      typeFliter = el.type2 === 'KEEP' || el.type2 === 'TRUST';
    } else {
      typeFliter = el.type2 === data;
    }

    if (status === '') {
      statusState =
        el.status === 'RQ00' ||
        el.status === 'RS00' ||
        el.status === '1100' ||
        el.status === '2100' ||
        el.status === '4100' ||
        el.status === '5100';
    } else {
      statusState = el.status === data.status;
    }

    return typeFliter && statusState;
  });
  try {
    let result = {
      ...state,
      dataFilter: dataApi,
      type: typeFliter,
      statusState: statusState,
    };
    return result;
  } catch (e) {
    console.log('error_origin_reducer', e);
    return state;
  }
};
