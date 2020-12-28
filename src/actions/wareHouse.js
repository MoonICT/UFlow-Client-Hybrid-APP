import types from './types';

export function contractData(data) {
  return {
    type: types.DATA_CONTRACT_MANAGER,
    data: data,
  };
}

export function filterContractData(value) {
  return {
    type: types.FILTER_CONTRACT_MANAGER,
    value: value,
  };
}
