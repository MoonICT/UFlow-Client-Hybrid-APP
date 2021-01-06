// [단위환산] 평수 => 제곱미터
export const toSquareMeter = (value) => {
  //return value ?  Math.ceil((Math.trunc(Number(value)*10)/10) * 3.305785) : ''
  return value ?  Number(Number(value) * 3.305785).toFixed(0) : ''
};

// [단위환산] 제곱미터 => 평수
export const toPyeong = (value) => {
  //return value ? Math.ceil((Math.trunc(Number(value)*10)/10) / 3.305785) : ''
  return value ? Number(Number(value) / 3.305785).toFixed(0) : ''
};