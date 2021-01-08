export const contractType = (type) => {

  if (type === '2100') {
    return 'TRUST'; // 수탁
  } else if (type === '1100') {
    return 'KEEP'; // 보관
  } else if (type === '3100') {
    return 'TRUST&KEEP'; // 보관&수탁
  }
  return '';
};

export const userType = (type) => {

  if (type === '2100') {
    return 'TENANT'; // 임차인
  } else if (type === '1100') {
    return 'OWNER'; // 창고주
  }
  return '';
};
