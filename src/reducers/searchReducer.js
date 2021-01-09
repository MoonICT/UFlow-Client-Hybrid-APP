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
    },
    {
      type: 'STORAGE',
      label: '보관 유형',
      toggle: false,
    },
    {
      type: 'PERIOD',
      label: '보관 기간',
      toggle: false,
    },
    {
      type: 'PRICE',
      label: '가격대',
      toggle: false,
    },
    {
      type: 'SCALE',
      label: '규모',
      toggle: false,
    },
    {
      type: 'OTHER',
      label: '추가 필터',
      toggle: false,
    },
  ],
  filterCodes: {
    listTypeCodes: [ // 창고유
      { name: '보관', value: 'KEEP' },
      { name: '수탁', value: 'TRUST' },
    ],
    listGdsTypeCode: [], // 보관유형
    listCalUnitDvCode: [], // 정산단위
    listCalStdDvCode: [], // 산정기준
    listFlrDvCode: [], // 층수
    listAprchMthdDvCode: [], // 접안방식
    listInsrDvCode: [], // 보험 가입
    listCmpltTypes: [], // 준공연차
  }
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
    case types.SEARCH_SET_FILTER:
      return {
        ...state,
        whFilter: {
          ...state.whFilter,
          ...action.payload,
        }
      }
    case types.SEARCH_SET_FILTER_CODES:
      console.log('Redxt $$$$', action.payload)
      return {
        ...state,
        filterCodes: {
          ...state.filterCodes,
          ...action.payload,
        }
      }
    // TODO Action 추가 시 아래에 정의.
    default:
      return state;
  }
};
