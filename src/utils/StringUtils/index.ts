import Moment from 'moment';

// export const money = (value, unitStr = '원') => {
//   return value ? (value.toLocaleString() + ' ' + unitStr) : 0 + ' ' + unitStr;
// };

const moneyUnit = (value: string, unitStr = '원') => {
    // return value ? (value.toLocaleString() + ' ' + unitStr) : 0 + ' ' + unitStr;
    return value ? (value.toLocaleString() + ' ' + unitStr) : 0 + ' ' + unitStr;
}

const numberComma = (value: string) => {
    return value ? value.toLocaleString() : 0;
};

const dateStr = (date:Date, format = 'YYYY-MM-DD') => {
    return date ? Moment(date).format(format) : '';
}

const toStdCd = (array:[], stdCd:string) => {

    let maps = array ? array.filter( (item:any) => {
        return item.stdDetailCode === stdCd;
    }) : [];

    if(maps && maps.length > 0) {
        return maps[0];
    }
    return null;
}

const toStdName = (array:[], stdCd:string) => {

    let maps = array ? array.filter((item:any) => {
        return item.stdDetailCode === stdCd;
    }) : [];

    if(maps && maps.length > 0) {
        // @ts-ignore
        return maps[0].stdDetailCodeName;
    }
    return stdCd;
}

const toPyeong = (value:any) => {
    //return value ? Math.ceil((Math.trunc(Number(value)*10)/10) / 3.305785) : ''
    return value ? Number(Number(value) / 3.305785).toFixed(0) : '';
};

const displayAreaUnit = (value:any) => {
    return `${numberComma(value)}㎡ (${numberComma(toPyeong(
        value,
    ))}평)`;
};


export  {
    moneyUnit,
    numberComma,
    dateStr,
    toStdCd,
    toStdName,
    displayAreaUnit,
    toPyeong
}
