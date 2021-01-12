
export const coverStatus = value => {
  switch (value) {

    case 'RQ00':
      // code block
      return {
        processing: '견적요청',
        data: []
      };

    case 'RS00':
      // code block
      return {
        data: [],
        processing: '견적응답',
      };

    case '1100':
      // code block
      return {
        data: [],
        processing: '계약협의',
      };

    case '2100':
      // code block
      return {
        data: [],
        processing: '계약요청대기',
      };

    case '4100':
      // code block
      return {
        data: [],
        processing: '계약중',
      };

    case '5100':
      // code block
      return {
        data: [],
        processing: '계약완료',
      };

    // code block
  }
};
