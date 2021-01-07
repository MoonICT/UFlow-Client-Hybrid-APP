import types from '../actions/types';
import { WarehouseSearchFilterModel } from '@Services/apis/models/warehouse';

const defaultState = {
  isSearchToggle: false,
  isFilterToggle: false,
  whFilter: JSON.parse(JSON.stringify(WarehouseSearchFilterModel)),
  filterList: [
    {
      type: 'WAREHOUSE',
      label: '창고 유형',
      toggle: false,
      value: '',
    },
    {
      type: 'STORAGE',
      label: '보관 유형',
      toggle: false,
      value: '',
    },
    {
      type: 'PERIOD',
      label: '보관 기간',
      toggle: false,
      value: '',
    },
    {
      type: 'PRICE',
      label: '가격대',
      toggle: false,
      value: '',
    },
    {
      type: 'SCALE',
      label: '규모',
      toggle: false,
      value: '',
    },
    {
      type: 'OTHER',
      label: '추가 필터',
      toggle: false,
      value: '',
    },
  ]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SEARCH_OVERLAY_TOGGLE:
      return {
        ...state, // 기본 state값 포함.
        isSearchToggle: action.payload,
      };
    case types.SEARCH_FILTER_UPDATE:
      console.log('VALUE::::::::::::', action.payload)
      let resultList = defaultState.filterList.map((el, i) => {
        return {
          ...defaultState.filterList[i],
          toggle: action.payload.type === el.type ? !defaultState.filterList[i].toggle : false,
          value: action.payload.value ? action.payload.value : defaultState.filterList[i].value,
        };
      })
      let resultToggle = resultList.some(item => {
        return item.toggle;
      });
      return {
        ...state, // 기본 state값 포함.
        isFilterToggle: resultToggle,
        filterList: resultList,
      };
    // TODO Action 추가 시 아래에 정의.
    default:
      return state;
  }
};
