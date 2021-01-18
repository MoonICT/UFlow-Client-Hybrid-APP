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

export const keepTableDatas = (
  mode,
  {
    warehouseNameLabel = '창고명',
    ownerNameLabel = '창고주',
    rentUserLabel = '임차인',
    addressLabel = '위치',
    typeLabel = '계약유형',
    keepTypeLabel = '보관유형',
    prvtAreaLabel = '가용면적',
    usblYmdLabel = '임대 가능기간',
    splyAmountLabel = '보관단가',
    mgmtChrgLabel = '관리단가',
  },
  {
    warehouseName,
    ownerName,
    rentUser,
    address,
    type,
    keepType = '임대(보관)',
    prvtArea,
    usblYmd,
    splyAmount,
    mgmtChrg,
  }
) => {
  if (mode === 1) {
    // RQ00, RS00
    return [
      {
        type: warehouseNameLabel,
        value: warehouseName,
      },
      {
        type: ownerNameLabel,
        value: ownerName,
      },
      {
        type: rentUserLabel,
        value: rentUser,
      },
      {
        type: addressLabel,
        value: address,
      },
      {
        type: typeLabel,
        value: type,
        highlight: true,
      },
      {
        type: keepTypeLabel,
        value: keepType,
      },
      {
        type: prvtAreaLabel,
        value: prvtArea,
      },
      {
        type: usblYmdLabel,
        value: usblYmd,
      },
      {
        type: splyAmountLabel,
        value: splyAmount,
      },
      {
        type: mgmtChrgLabel,
        value: mgmtChrg,
      },
    ];
  } else if (mode == 2) {
    // 1100, 2100, 4100, 5100
    return [
      {
        type: warehouseNameLabel,
        value: warehouseName,
      },
      {
        type: ownerNameLabel,
        value: ownerName,
      },
      {
        type: addressLabel,
        value: address,
      },
      {
        type: typeLabel,
        value: type,
        highlight: true,
      },
      {
        type: keepTypeLabel,
        value: keepType,
      },
      {
        type: prvtAreaLabel,
        value: prvtArea,
      },
      {
        type: usblYmdLabel,
        value: usblYmd,
      },
      {
        type: splyAmountLabel,
        value: splyAmount,
      },
      {
        type: mgmtChrgLabel,
        value: mgmtChrg,
      },
    ];
  } else if (mode == 3) {
    // 5100 계약완료 정보
    return [
      {
        type: warehouseNameLabel,
        value: warehouseName,
      },
      {
        type: ownerNameLabel,
        value: ownerName,
      },
      {
        type: addressLabel,
        value: address,
      },
      {
        type: typeLabel,
        value: type,
        highlight: true,
      },
      {
        type: keepTypeLabel,
        value: keepType,
      },
      {
        type: prvtAreaLabel,
        value: prvtArea,
      },
      {
        type: usblYmdLabel,
        value: usblYmd,
      },
      {
        type: splyAmountLabel,
        value: splyAmount,
      },
      {
        type: mgmtChrgLabel,
        value: mgmtChrg,
      },
    ];
  }
  return [];
};


export const trustTableDatas = (
  mode,
  {
    warehouseNameLabel = '창고명',
    ownerNameLabel = '창고주',
    addressLabel = '위치',
    typeLabel = '계약유형',
    keepTypeLabel = '보관유형',

    calUnitDvCodeLabel = '정산단위',
    calStdDvCodeLabel = '산정기준',
    usblYmdLabel = '수탁 가능기간',
    usblValueLabel = '수탁 가용수량',
    splyAmountLabel = '보관단가',
    mnfctChrgLabel = '가공단가',
    psnChrgLabel = '인건단가',
    whinChrgLabel = '입고단가',
    whoutChrgLabel = '출고단가',
    dlvyChrgLabel = '택배단가',
    shipChrgLabel = '운송단가'
  },
  {
    warehouseName,
    ownerName,
    address,
    type,
    keepType = '수탁',

    calUnitDvCode,
    calStdDvCode,
    usblYmd,
    usblValue,
    splyAmount,
    mnfctChrg,
    psnChrg,
    whinChrg,
    whoutChrg,
    dlvyChrg,
    shipChrg,
  }
) => {
  if (mode === 1) {
    // RQ00, RS00
    return [
      {
        type: warehouseNameLabel,
        value: warehouseName,
      },
      {
        type: ownerNameLabel,
        value: ownerName,
      },
      {
        type: addressLabel,
        value: address,
      },
      {
        type: typeLabel,
        value: type,
        highlight: true,
      },
      {
        type: keepTypeLabel,
        value: keepType,
      },
      {
        type: calUnitDvCodeLabel,
        value: calUnitDvCode,
      },
      {
        type: calStdDvCodeLabel,
        value: calStdDvCode,
      },
      {
        type: usblYmdLabel,
        value: usblYmd,
      },
      {
        type: usblValueLabel,
        value: usblValue,
      },
      {
        type: splyAmountLabel,
        value: splyAmount,
      },
      {
        type: whinChrgLabel,
        value: whinChrg,
      },
      {
        type: whoutChrgLabel,
        value: whoutChrg,
      },
      {
        type: mnfctChrgLabel,
        value: mnfctChrg,
      },
      {
        type: psnChrgLabel,
        value: psnChrg,
      },
      {
        type: dlvyChrgLabel,
        value: dlvyChrg,
      },
      {
        type: shipChrgLabel,
        value: shipChrg,
      },
    ];
  } else if (mode === 2) {
    // 1100, 2100, 4100, 5100
    return [
      {
        type: warehouseNameLabel,
        value: warehouseName,
      },
      {
        type: ownerNameLabel,
        value: ownerName,
      },
      {
        type: addressLabel,
        value: address,
      },
      {
        type: typeLabel,
        value: type,
        highlight: true,
      },
      {
        type: keepTypeLabel,
        value: keepType,
      },
      {
        type: usblYmdLabel,
        value: usblYmd,
      },
      {
        type: usblValueLabel,
        value: usblValue,
      },
      {
        type: splyAmountLabel,
        value: splyAmount,
      },
      {
        type: whinChrgLabel,
        value: whinChrg,
      },
      {
        type: whoutChrgLabel,
        value: whoutChrg,
      },
      {
        type: mnfctChrgLabel,
        value: mnfctChrg,
      },
      {
        type: psnChrgLabel,
        value: psnChrg,
      },
      {
        type: dlvyChrgLabel,
        value: dlvyChrg,
      },
      {
        type: shipChrgLabel,
        value: shipChrg,
      },
    ];
  } else if (mode === 3) {
    // 5100 계약완료 정보
    return [
      {
        type: warehouseNameLabel,
        value: warehouseName,
      },
      {
        type: ownerNameLabel,
        value: ownerName,
      },
      {
        type: addressLabel,
        value: address,
      },
      {
        type: typeLabel,
        value: type,
        highlight: true,
      },
      {
        type: keepTypeLabel,
        value: keepType,
      },
      {
        type: usblYmdLabel,
        value: usblYmd,
      },
      {
        type: usblValueLabel,
        value: usblValue,
      },
      {
        type: splyAmountLabel,
        value: splyAmount,
      },
      {
        type: whinChrgLabel,
        value: whinChrg,
      },
      {
        type: whoutChrgLabel,
        value: whoutChrg,
      },
      {
        type: mnfctChrgLabel,
        value: mnfctChrg,
      },
      {
        type: psnChrgLabel,
        value: psnChrg,
      },
      {
        type: dlvyChrgLabel,
        value: dlvyChrg,
      },
      {
        type: shipChrgLabel,
        value: shipChrg,
      },
    ];
  }
  return [];
};
