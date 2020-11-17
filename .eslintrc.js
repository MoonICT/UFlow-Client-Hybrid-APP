module.exports = {
  root: true,
  extends: '@react-native-community',
  // add your custom rules here
  // 0: off, 1: warn, 2: error
  rules: {
    'prettier/prettier': 0, //prettier 에 대한 경고 끄기
    // 'indent': ['error', 2], // 2칸 들여쓰기 여부
    'semi': 2, // 세미콜론 허용 여부
    'no-unused-vars': 1, // 사용하지 않는 변수명 허용 여부
    'keyword-spacing': 2, // 키워드 별로 공백 허용 여부 if 문 통일할 때 쓰임
    'no-multiple-empty-lines': 1, // 여러줄 공백 허용 여부
    'space-before-function-paren': 0, // function () <- 인자값 공백 허용 여부
    'space-after-function-name': 0,
    'eol-last': 1, // 파일 끝 개행 여부
  },
};
