export function formatDate(date: string) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth()+1;
    const year = d.getFullYear();
  
    let monthEndLish = '';
  
    switch(month) {
      case 1:
        monthEndLish = 'Jan'
        break;
      case 2:
        monthEndLish = 'February '
        break;
      case 3:
        monthEndLish = 'Mar'
        break;
      case 4:
        monthEndLish = 'April'
        break;
      case 5:
        monthEndLish = 'May'
        break;
      case 6:
        monthEndLish = 'Jun'
        break;
      case 7:
        monthEndLish = 'Jul'
        break;
      case 8:
        monthEndLish = 'Aug'
        break;
      case 9:
        monthEndLish = 'Sep'
        break;
      case 10:
        monthEndLish = 'Oct'
        break;
      case 11:
        monthEndLish = 'Nov'
        break;
      case 12:
        monthEndLish = 'Dec'
        break;
    }
  
    return `${monthEndLish} ${day}, ${year}`;
  }
  
  export function formatDateV1(date: string) {
    const d = new Date(date);
    return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}`;
  }
  
  export function formatDateV2(date: string) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }
  
  export function getDataTime(date: string) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();
    return { year , month, day, hour, minute, second}
  }