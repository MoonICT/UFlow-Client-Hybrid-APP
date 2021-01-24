/**
 * @create
 * @modify chonglye chang
 * TODO 1. 송장 이미지 업로드 필요 2. 입출고 상세 필터 수정 3. 이벤트 완료시 일러스트 이미지 삽입
 *
 *
 * @desc [description]
 */
// Global Imports
import React, {Component, Fragment} from 'react';
import Moment from 'moment';
import {dateStr, toStdCd} from '@Utils/StringUtils';
import {ToastShow} from '@Utils/Toast';
import ImageModal from 'react-native-image-modal';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';

import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Linking, Image
} from 'react-native';

import imgType0001 from '@Assets/images/type-0001.png';
import imgType0002 from '@Assets/images/type-0002.png';
import imgType0003 from '@Assets/images/type-0003.png';
import imgType0004 from '@Assets/images/type-0004.png';
import imgType9100 from '@Assets/images/type-9100.png';
import illust15 from '@Assets/images/illust15.png';
import {
  Appbar,
  Dialog,
  Text,
  Button,
  Paragraph,
  IconButton
} from 'react-native-paper';
import Select from '@Components/organisms/SelectFilter';
import FilterButton from '@Components/atoms/FilterButton';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';
import TextField from '@Components/organisms/TextField';

import {styles as S} from '../style';
import {styles as SS} from './style';
import {InOutManagerService} from '@Services/apis';
import DocumentPicker from 'react-native-document-picker';
import {StringUtils} from "../../../services/utils";
import { money, numberComma } from '@Services/utils/StringUtils';

var searchTimerQuery;
export default class DetailsManager extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    let {rentWarehNo, type} = props.route.params
    this.state = {
      warehouseName: '',
      rentWarehNo,
      type,
      isExpired: false,
      totalMoney: 0,
      visible: false,
      confirm: false,
      dataInfo: [],
      responseFilter: [],
      isProgress: false,
      isCancel: false,
      completeRequestImport: false,
      completeRequestExport: false,
      confirmRequestImport: false,
      confirmRequestExport: false,
      cancelRequestImport: false,
      cancelRequestExport: false,
      isTypeCancel: 'IMPORT',
      isToggle: false,
      isEmpty: true,
      singleFile: null,
      uirDoneImport: '',
      resBody: {},
      receiptCancel: false,
      ExpctCurrent: -1,

      IOStatus: '',
      ExpctSeq: -1,
      ExpctYmd: '',
      ImageFilename: '',

      createDate: new Date(),
      createDateStr: dateStr(new Date()),
      createValue: 0,

      popUpTitle: '출고 확정',
      popUpDateLabel: '출고 확정일',
      popUpQtyLabel: '출고 확정 수량',

      typeCreate: 'import',
      filter: {
        query: '',
        contractType: 2100,
        rangeTime: '',
        startDate: new Date(),
        endDate: new Date()
      },
      isOpenStart: false,
      isOpenEnd: false,
      isOpenTimeCreateImport: false,
      timeCreateImport: new Date().getTime(),
      valueCreateImport: 0,
      rangeDay: [
        {
          value: 'all', label: '전체'
        },
        {
          value: '7', label: '7일'
        },
        {
          value: '15', label: '15일'
        },
        {
          value: '30', label: '1개월'
        },
        {
          value: '90', label: '3개월'
        },
        {
          value: '180', label: '6개월'
        },
        {
          value: '365', label: '1년'
        }
      ],
      limitRow: [
        {
          label: '5개씩 보기',
          value: '5',
        },
        {
          label: '10개씩 보기',
          value: '10',
        },
        {
          label: '15개씩 보기',
          value: '15',
        },
        {
          label: '20개씩 보기',
          value: '20',
        }
      ],

      imageUrl: '',
      openImagePopup: false,
      openImagePopupTitle: '',
    };

    this.navigation = props.navigation;
  }

  componentDidMount() {
    this.getAllData()
  }

  async getAllData() {
    let {filter, type, rentWarehNo} = this.state;
    console.log(rentWarehNo, 'rentWarehNo');
    let {startDate, endDate, query, contractType} = filter;
    let params = {
      startDate,
      endDate,
      query,
      id: rentWarehNo,
      rangeDate: '',
      type: type,
      contractType
    };

    console.log(type, 'type')

    await InOutManagerService.getDetail(params)
      .then((res) => {

        let header = res.data.header;
        let cntrTrustResBody = res.data.header.cntrTrustResBody;
        let isExpired = header.expired
        let totalMoney = res.data.total

        const dataInfo = [
          {
            type: '창고명',
            value: header.warehouse,
          },
          {
            type: type === 'OWNER' ? '임차인' : '창고주',
            value: type === 'OWNER' ? header.rentUser : header.owner,
          },
          {
            type: '위치',
            value: header.address,
          },
          {
            type: '보관유형',
            value: cntrTrustResBody.typeCode && cntrTrustResBody.typeCode.stdDetailCodeName,
          },
          {
            type: '정산단위',
            value: cntrTrustResBody && cntrTrustResBody.calUnitDvCode && cntrTrustResBody.calUnitDvCode.stdDetailCodeName,
          },
          {
            type: '산정기준',
            value: cntrTrustResBody && cntrTrustResBody.calStdDvCode && cntrTrustResBody.calStdDvCode.stdDetailCodeName,
          },
          {
            type: '물동량',
            value: cntrTrustResBody && cntrTrustResBody.cntrValue && (StringUtils.numberComma(cntrTrustResBody.cntrValue) + " " + (cntrTrustResBody && cntrTrustResBody.calUnitDvCode && cntrTrustResBody.calUnitDvCode.stdDetailCodeName)),
          },
          {
            type: '수탁 기간',
            value: `${dateStr(cntrTrustResBody.id?.cntrYmdFrom ?? '')} ~ ${dateStr(cntrTrustResBody?.cntrYmdTo ?? '')}`,
          },
          {
            type: '보관비',
            value: cntrTrustResBody && cntrTrustResBody.splyAmount && money(cntrTrustResBody.splyAmount),
          },
        ];

        let responseFilter = res.data.data.content.map((item, index) => {
          let status = ''
          let dateStr = ''
          let dateValue = ''
          let whinValue = ''
          let whoutValue = ''
          switch (true) {
            case item.type === 'IMPORT' && item.status === '1100':
              status = '입고 요청'
              dateStr = '입고예정 일자'
              dateValue = Moment(item.rtwhWhinResBody.id.whinExpct).format('YYYY.MM.DD')
              whinValue = item.rtwhWhinResBody.whinExpctQty !== null ? numberComma(item.rtwhWhinResBody.whinExpctQty) : "-"
              break;
            case item.type === 'IMPORT' && item.status === '1200':
              status = '입고 확정'
              dateStr = '입고확정 일자'
              dateValue = Moment(item.rtwhWhinResBody.whinDecis).format('YYYY.MM.DD')
              whinValue = item.rtwhWhinResBody.whinDecisQty !== null ? numberComma(item.rtwhWhinResBody.whinDecisQty) : "-"
              break;
            case item.type === 'IMPORT' && item.status === '9100':
              status = '입고 요청 취소'
              dateStr = '입고예정 일자'
              dateValue = ''
              whinValue = item.rtwhWhinResBody.whinExpctQty !== null ? numberComma(item.rtwhWhinResBody.whinExpctQty) : "-"
              break;
            case item.type === 'EXPORT' && item.status === '2100':
              status = '출고 요청'
              dateStr = '출고예정 일자'
              dateValue = Moment(item.rtwhWhoutResBody.id.whoutExpct).format('YYYY.MM.DD')
              whoutValue = item.rtwhWhoutResBody.expctQty !== null ? numberComma(item.rtwhWhoutResBody.expctQty) : "-"
              break;
            case item.type === 'EXPORT' && item.status === '2200':
              status = '출고 확정'
              dateStr = '출고확정 일자'
              dateValue = Moment(item.rtwhWhoutResBody.decis).format('YYYY.MM.DD')
              whoutValue = item.rtwhWhoutResBody.decisQty !== null ? numberComma(item.rtwhWhoutResBody.decisQty) : "-"
              break;
            case item.type === 'EXPORT' && item.status === '9500':
              status = '출고 요청 취소'
              dateStr = '출고예정 일자'
              dateValue = ''
              whoutValue = item.rtwhWhoutResBody.expctQty !== null ? numberComma(item.rtwhWhoutResBody.expctQty) : "-"
              break;
          }

          let inoutLabel = ''
          let inoutValue = ''
          if (item.type === 'IMPORT') {
            inoutLabel = '입고 단가';
            inoutValue = cntrTrustResBody.whinChrg ? (money(cntrTrustResBody.whinChrg)) : "-";
          } else if (item.type === 'EXPORT') {
            inoutLabel = '출고 단가';
            inoutValue = cntrTrustResBody.whoutChrg ? (money(cntrTrustResBody.whoutChrg)) : "-";
          }

          let whinUprice = ''
          let whoutUprice = ''
          if (item.type === 'IMPORT') {
            whinUprice = item.rtwhWhinResBody.whinDecisChrg ? money(item.rtwhWhinResBody.whinDecisChrg) : money(0);
          } else if (item.type === 'EXPORT') {
            whoutUprice = item.rtwhWhoutResBody.whoutDecisChrg ? money(item.rtwhWhoutResBody.whoutDecisChrg) : money(0);
          }

          let Expct = '';
          let ExpctSeq = -1;

          if (item.type === 'EXPORT') {
            Expct = item.rtwhWhoutResBody.id.whoutExpct;
            ExpctSeq = item.rtwhWhoutResBody.id.whoutExpctSeq;
          } else if (item.type === 'IMPORT') {
            Expct = item.rtwhWhinResBody.id.whinExpct;
            ExpctSeq = item.rtwhWhinResBody.id.whinExpctSeq;
          }

          return {
            Expct,
            ExpctSeq,
            imageUrl: item.imageUrl && item.imageUrl.replace(/\\\//g, "/"),
            status: item.status,
            stockQty: item.stockQty || 0,
            type: item.type,
            whinValue,
            whoutValue,
            dataProgress: [
              {
                type: '작성 일시',
                value: Moment(item.createdDate).format('YYYY-MM-DD'),
              },
              {
                type: '작성자',
                value: '임차인(ID)',
              },
              {
                type: '구분',
                value: status,
              },
              {
                type: dateStr,
                value: dateValue,
              },
              {
                type: '입고량',
                value: numberComma(whinValue),
              },
              {
                type: '출고량',
                value: numberComma(whoutValue)
              },
              {
                type: '재고',
                value: item.stockQty && numberComma(item.stockQty)
              },
              {
                type: inoutLabel,
                value: inoutValue
              },
              {
                type: '입고비',// 입고단가 X 입고확정수량
                value: money(whinUprice)
              },
              {
                type: '출고비',
                value: money(whoutUprice)
              },
              {
                type: '보관비',
                value: money(item.stockUprice) + " " + (item.stockUpriceRemark && ` (${item.stockUpriceRemark})`)
              }
            ]
          }
        })

        let isEmpty = responseFilter && responseFilter.length === 0;
        this.setState({
          dataInfo, responseFilter, cntrTrustResBody, isExpired, totalMoney, isEmpty
        })

        if (cntrTrustResBody && cntrTrustResBody.typeCode) {
          switch (cntrTrustResBody.typeCode) {
            case "0001":
              this.setState({
                imgType: imgType0001
              })
              break;
            case "0002":
              this.setState({
                imgType: imgType0002
              })
              break;
            case "0003":
              this.setState({
                imgType: imgType0003
              })
              break;
            case "0004":
              this.setState({
                imgType: imgType0004
              })
              break;
            default:
              this.setState({
                imgType: imgType9100
              })
              break;
          }
        }
      })
      .catch((err) => {
        console.log(err, 'err');
        if (err && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      })

  }


  showDialog = () => this.setState({visible: true});

  hideDialog = () => {
    this.setState({
      visible: false,
      valueCreateImport: '',
      createValue: ''
    });

  }
  showConfirm = () => this.setState({confirm: true});

  hideConfirm = () => this.setState({confirm: false});

  showDateStart = () => {
    let {isOpenStart} = this.state
    this.setState({
      isOpenStart: !isOpenStart
    })
  }
  showTimeCreateImport = () => {
    let {isOpenTimeCreateImport} = this.state
    this.setState({
      isOpenTimeCreateImport: !isOpenTimeCreateImport
    })
  }

  showDateEnd = () => {
    let {isOpenEnd} = this.state
    this.setState({
      isOpenEnd: !isOpenEnd
    })
  }


  onChangeStart = (selectedDate) => {
    let {isOpenStart} = this.state;

    let filter = {...this.state.filter}
    filter.startDate = selectedDate
    this.setState({
      filter: filter,
      isOpenStart: !isOpenStart
    }, () => {
      this.getAllData()
    })
  }

  onChangeEnd = (selectedDate) => {
    let {isOpenEnd} = this.state

    let filter = {...this.state.filter}
    filter.endDate = selectedDate
    this.setState({
      filter,
      isOpenEnd: !isOpenEnd
    }, () => {
      this.getAllData()
    })
  };

  onChangeTimeCreateImport = (selectedDate) => {
    this.setState({
      createDate: selectedDate,
      createDateStr: dateStr(selectedDate),
      isOpenTimeCreateImport: false
    });

    // let { isOpenTimeCreateImport } = this.state
    // if (event.type == 'dismissed') {
    //   this.setState({
    //     isOpenTimeCreateImport: !isOpenTimeCreateImport
    //   })
    // } else {
    //   this.setState({
    //     timeCreateImport: event.nativeEvent.timestamp,
    //     isOpenTimeCreateImport: !isOpenTimeCreateImport
    //   })
    // }
  };

  onChangeValueImport = (value) => {
    if (value) {
      value = value.replace(/[^0-9]/g, '')
    }
    this.setState({
      createValue: value
    });
  }


  onChangeRangeDay = (value) => {
    let filter = {...this.state.filter}
    if (value) {

      const start = Moment().subtract(value, 'days').format('YYYY-MM-DD');
      const end = Moment().format('YYYY-MM-DD');

      filter.startDate = start
      filter.endDate = end
    } else {
      filter.startDate = null
      filter.endDate = null
    }
    this.setState({
      filter: filter
    }, () => {
      this.getAllData()
    })
  };

  // TODO
  onChangeLimitRow = (value) => {
  };

  onChangeContractType = (value) => {
    let filter = {...this.state.filter}
    filter.contractType = value
    this.setState({
      filter
    }, () => {
      this.getAllData()
    })
  }


  async createImport() {

    let {
      rentWarehNo,
      createValue,
      createDate,
      createDateStr,
      typeCreate,
      ExpctSeq,
      ExpctYmd,
      type,
      ImageFilename
    } = this.state


    let errorMessage = ''

    // 수량 유효성
    if (!createValue || createValue === 0) {
      errorMessage = '수량은 0이상 입력해야합니다.'
      alert(errorMessage);
      return;
    }

    // 날짜 유효성
    if (!createDate || (!(Moment(createDate).isSame(Moment(), 'day')) && Moment(createDate).isBefore(Moment()))) {
      errorMessage = '오늘부터 입력이 가능합니다.'
      alert(errorMessage);
      return;
    }

    // 창고주
    if (type === 'OWNER') {

      const postIO = (filename, url) => {
        if (typeCreate === 'export') {
          // 출고 확정
          if (!ExpctYmd) {
            alert('일자 정보가 없습니다.');
            return;
          }
          if (!createDateStr) {
            alert('일자 정보가 없습니다.');
            return;
          } else if (!createValue) {
            alert('수량 정보가 없습니다.');
            return;
          } else if (!rentWarehNo || !ExpctSeq) {
            alert('공유창고 정보가 없습니다.');
            return;
          }
          let data = {
            rentWarehNo: rentWarehNo,
            whoutExpct: Moment(ExpctYmd).valueOf(),
            decisQty: Number(createValue),
            decis: Moment(createDateStr).valueOf(),
            whoutExpctSeq: ExpctSeq,
            reason: "",
            filename: filename ? filename : "",
          }
          console.log(data, 'data');
          InOutManagerService.postExportOwner(data)
            .then((res) => {
              if (res.status === 200) {
                this.setState({
                  ExpctYmd: '',
                  createValue: 0,
                  createDate: new Date(),
                  createDateStr: dateStr(new Date()),
                  ExpctSeq: -1,
                  ImageFilename: '',
                  visible: false,
                  confirmRequestExport: true,
                  uirDoneImport: url
                });
                this.getAllData()
              } else {
                ToastShow("출고 확정을 실패하였습니다. " + res);
              }
            }).catch(error => {
            alert(error.response.data.message);
          });
        } else if (typeCreate === 'import') {
          // 입고 확정
          if (!ExpctYmd) {
            alert('일자 정보가 없습니다.');
            return;
          }
          if (!createDateStr) {
            alert('일자 정보가 없습니다.');
            return;
          } else if (!createValue) {
            alert('수량 정보가 없습니다.');
            return;
          } else if (!rentWarehNo || !ExpctSeq) {
            alert('공유창고 정보가 없습니다.');
            return;
          }
          let data = {
            rentWarehNo: rentWarehNo,
            whinExpct: Moment(ExpctYmd).valueOf(),
            whinDecisQty: Number(createValue),
            whinDecis: Moment(createDateStr).valueOf(),
            expctSeq: ExpctSeq,
            reason: "",
            filename: filename,
          }
          console.log(data, 'data');
          InOutManagerService.postImportOwner(data)
            .then((res) => {
              if (res.status === 200) {
                this.setState({
                  ExpctYmd: '',
                  createValue: 0,
                  createDate: new Date(),
                  createDateStr: dateStr(new Date()),
                  ExpctSeq: -1,
                  ImageFilename: '',
                  visible: false,
                  confirmRequestImport: true,
                  uirDoneImport: url
                });
                this.getAllData()
              } else {
                ToastShow("입고 확정을 실패하였습니다. " + res);
              }
            }).catch(error => {
            alert(error.response.data.message);
          });
        }
      }

      let {singleFile} = this.state;
      if (singleFile !== null) {
        // If file selected then create FormData
        const data = new FormData();
        data.append('name', singleFile.name);
        data.append('file', singleFile);
        data.append('id', rentWarehNo);
        if (typeCreate === 'import')
          data.append('code', '0005');
        else if (typeCreate === 'expert')
          data.append('code', '0006');
        // Please change file upload URL
        InOutManagerService.uploadFileNew(data).then(respon => {
          if (respon.status === 200) {
            const {filename, url} = respon.data
            this.setState({
              uirDoneImport: url,
              ImageFilename: filename
            }, () => {
              postIO(filename, url)
            })

          }
        }).catch(error => {
          alert(error.response.data.message);
        });
      } else {
        // If no file selected the show alert
        postIO()
      }


    } else if (type === 'TENANT') {
      // 임차인
      if (typeCreate === 'import') {
        // 입고 요청

        if (!createDateStr) {
          alert('일자 정보가 없습니다.');
          return;
        } else if (!createValue) {
          alert('수량 정보가 없습니다.');
          return;
        } else if (!rentWarehNo) {
          alert('공유창고 정보가 없습니다.');
          return;
        }
        let data = {
          rentWarehNo: rentWarehNo,
          whinExpct: Moment(createDateStr).valueOf(),
          whinExpctQty: Number(createValue)
        }
        InOutManagerService.postImportTenant(data)
          .then((res) => {
            if (res.status === 200) {
              this.setState({
                ExpctYmd: '',
                createValue: 0,
                createDate: new Date(),
                createDateStr: dateStr(new Date()),
                ExpctSeq: -1,
                ImageFilename: '',
                visible: false,
                completeRequestImport: true
              });
              this.getAllData()
            } else {
              ToastShow("입고 요청이 실패하였습니다. " + res);
            }
          }).catch(error => {
          alert(error.response.data.message);
        });
      } else if (typeCreate === 'export') {
        if (!createDateStr) {
          alert('일자 정보가 없습니다.');
          return;
        } else if (!createValue) {
          alert('수량 정보가 없습니다.');
          return;
        } else if (!rentWarehNo) {
          alert('공유창고 정보가 없습니다.');
          return;
        }
        // 출고 요청
        let data = {
          rentWarehNo: rentWarehNo,
          whoutExpct: Moment(createDateStr).valueOf(),
          expctQty: Number(createValue)
        }
        InOutManagerService.postExportTenant(data)
          .then((res) => {
            if (res.status === 200) {
              this.setState({
                ExpctYmd: '',
                createValue: 0,
                createDateStr: '',
                ExpctSeq: -1,
                ImageFilename: '',
                visible: false,
                completeRequestExport: true
              });

              this.getAllData()
            } else {
              ToastShow("출고 요청이 실패하였습니다. " + res);
            }
          }).catch(error => {
          alert(error.response.data.message);
        });
      }
    }
  }

  async onCancelRequest() {
    let {rentWarehNo, ExpctYmd, ExpctSeq, typeCreate} = this.state


    if (typeCreate === 'import') {
      await InOutManagerService.postCancelImport({
        rentWarehNo: rentWarehNo,
        whinExpct: Moment(ExpctYmd).format('YYYYMMDD'),
        whinExpctSeq: ExpctSeq,
      }).then(res => {
        if (res.data.msg !== 'success') {
          ToastShow('입고 요청 취소가 실패하였습니다. ' + res)
          return
        }
        this.setState({cancelRequestImport: true, isCancel: false}, () => {
          this.getAllData()
        })
      }).catch(error => {
        alert(error.response.data.message);
      });
    } else if (typeCreate === 'export') {
      await InOutManagerService.postCancelExport({
        rentWarehNo: rentWarehNo,
        whoutExpct: Moment(ExpctYmd).format('YYYYMMDD'),
        whoutExpctSeq: ExpctSeq,
      }).then(res => {
        if (res.data.msg !== 'success') {
          ToastShow('출고 요청 취소가 실패하였습니다. ' + res)
          return
        }

        this.setState({cancelRequestExport: true, isCancel: false}, () => {
          this.getAllData()
        })
      }).catch(error => {
        alert(error.response.data.message);
      });
    }

  }

  handlePicker = (type) => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, (response) => {
      let file = {
        fileCopyUri: response.uri,
        name: response.fileName,
        size: response.fileSize,
        type: response.type,
        uri: response.uri
      }

      this.setState({singleFile: file});
    });
  };

  // upload image
  // handlePicker = async () => {
  //
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     });
  //     this.setState({singleFile: res})
  //
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  render() {
    const {isProgress, isToggle, isEmpty, dataInfo, responseFilter, totalMoney, isExpired, type} = this.state;
    const {isOpenStart, isOpenEnd, rangeDay, limitRow, isOpenTimeCreateImport, timeCreateImport} = this.state;
    const {ExpctSeq, ExpctYmd, IOType, IOStatus} = this.state;

    let {startDate, endDate} = this.state.filter;
    const processing =
      isProgress === true ? (
        <View style={DefaultStyle._bodyCard}>
          <Text style={SS.textBody}>등록한 입･출고 내역이 없습니다.</Text>
        </View>
      ) : (
        <Fragment>
          {
            responseFilter.length > 0 && responseFilter.map((item, index) => {

              return (
                <Fragment key={index}>
                  <View style={{
                    paddingBottom: 0,
                    marginBottom: 0
                  }}>
                    <View style={{paddingTop: 0, borderColor: '#e5e5ea', borderWidth:1, marginTop: 0, marginBottom: 20, paddingBottom:0}}>

                      <TableInfo
                        data={item.dataProgress}
                        style={{borderBottomWidth: 1, borderTopWidth: 0}}
                      />



                        {/** 출고 확정 **/}
                        {(type === 'OWNER' && item.type === 'EXPORT' && item.status === '2100') &&
                        <View style={[DefaultStyle._listBtn, SS.listBtnProcess, SS.wrapBtnGroup]}>
                          <TouchableOpacity
                            onPress={() => {

                              this.setState({
                                popUpTitle: '출고 확정',
                                popUpDateLabel: '출고 확정일',
                                popUpQtyLabel: '출고 확정 수량',
                                typeCreate: 'export',
                                ExpctSeq: item.ExpctSeq,
                                ExpctYmd: item.Expct,
                                createValue: item.whoutValue
                              }, () => {
                                this.showDialog()
                              })
                            }}
                            style={[
                              DefaultStyle._btnInline,
                              {backgroundColor: '#e64a19'},
                            ]}>
                            <Text
                              style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                              출고 확정
                            </Text>
                          </TouchableOpacity>
                        </View>
                        }

                        {/** 입고 확정 **/}
                        {(type === 'OWNER' && item.type === 'IMPORT' && item.status === '1100') &&
                        <View style={[DefaultStyle._listBtn, SS.listBtnProcess, SS.wrapBtnGroup]}>

                            <TouchableOpacity
                              onPress={() => {
                                this.setState({
                                  popUpTitle: '입고 확정',
                                  popUpDateLabel: '입고 확정일',
                                  popUpQtyLabel: '입고 확정 수량',
                                  typeCreate: 'import',
                                  ExpctSeq: item.ExpctSeq,
                                  ExpctYmd: item.Expct,
                                  createValue: item.whinValue
                                }, () => {
                                  this.showDialog()
                                })
                              }}
                              style={[DefaultStyle._btnInline, {marginRight: 8}]}>
                              <Text
                                style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                                입고 확정
                              </Text>
                            </TouchableOpacity>

                        </View>
                        }

                        {(type === 'TENANT' && item.type === 'IMPORT' && item.status === '1100') &&
                        <View style={[DefaultStyle._listBtn, SS.listBtnProcess, SS.wrapBtnGroup]}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                popUpTitle: '입고 요청 취소',
                                typeCreate: 'import',
                                ExpctSeq: item.ExpctSeq,
                                ExpctYmd: item.Expct,
                              }, () => {
                                this.setState({
                                  isCancel: true
                                })
                              })
                            }}
                            style={[
                              DefaultStyle._btnOutline,
                              DefaultStyle._btnLeft,
                              SS.btnProcess,
                            ]}>
                            <Text
                              style={[DefaultStyle._textButton, {color: '#000000'}]}>
                              입고 요청 취소
                            </Text>
                          </TouchableOpacity>
                        </View>
                        }

                        {(type === 'TENANT' && item.type === 'EXPORT' && item.status === '2100') &&
                        <View style={[DefaultStyle._listBtn, SS.listBtnProcess, SS.wrapBtnGroup]}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                popUpTitle: '출고 요청 취소',
                                typeCreate: 'export',
                                ExpctSeq: item.ExpctSeq,
                                ExpctYmd: item.Expct,
                              }, () => {
                                this.setState({
                                  isCancel: true
                                })
                              })
                            }}
                            style={[
                              DefaultStyle._btnOutline,
                              DefaultStyle._btnLeft,
                              SS.btnProcess,
                            ]}>
                            <Text
                              style={[DefaultStyle._textButton, {color: '#000000'}]}>
                              출고 요청 취소
                            </Text>
                          </TouchableOpacity>
                        </View>
                        }



                        {/**입고 사진 확인**/}
                        {item.type === 'IMPORT' && item.status === '1200' && item.imageUrl &&
                        <View style={[DefaultStyle._listBtn, SS.listBtnProcess, SS.wrapBtnGroup]}>
                          <TouchableOpacity
                            onPress={() => {
                              // Linking.canOpenURL(item.imageUrl).then(supported => {
                              //   if (supported) {
                              //     Linking.openURL(item.imageUrl);
                              //   } else {
                              //     console.log("Don't know how to open URI: " + res);
                              //   }})
                              this.setState({
                                imageUrl: item.imageUrl,
                                openImagePopup: true,
                                openImagePopupTitle: '입고 사진 확인',
                              })
                            }}
                            style={[
                              DefaultStyle._btnOutline,
                              DefaultStyle._btnLeft,
                              SS.btnProcess,
                            ]}>
                            <Text style={[DefaultStyle._textButton, {color: '#000000'}]}>
                              입고 사진 확인
                            </Text>
                          </TouchableOpacity>
                        </View>
                        }
                        {/**출고 사진 확인**/}
                        {item.type === 'EXPORT' && item.status === '2200' && item.imageUrl &&
                        <View style={[DefaultStyle._listBtn, SS.listBtnProcess, SS.wrapBtnGroup]}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                imageUrl: item.imageUrl,
                                openImagePopup: true,
                                openImagePopupTitle: '출고 사진 확인',
                              })
                            }}
                            style={[
                              DefaultStyle._btnOutline,
                              DefaultStyle._btnLeft,
                              SS.btnProcess,
                            ]}>
                            <Text style={[DefaultStyle._textButton, {color: '#000000'}]}>
                              출고 사진 확인
                            </Text>
                          </TouchableOpacity>
                        </View>
                        }

                    </View>
                  </View>
                </Fragment>

              )
            })
          }
        </Fragment>
      );

    return (
      <SafeAreaView style={S.container}>

        <HistoryBackActionBar
          title={this.state.warehouseName}
          navigation={this.navigation}
        />
        <ScrollView>
          <View style={[DefaultStyle._cards, {marginTop: 0, marginBottom: 180}]}>
            <View style={DefaultStyle._titleCard}>
              <Text
                style={[
                  DefaultStyle._textTitleCard,
                  S.textTitleTenant,
                  {paddingBottom: 0},
                ]}>
                입･출고 상세 내역
              </Text>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCard}>
                {this.state.imgType &&
                <Image source={this.state.imgType} style={DefaultStyle._avatarHeader}/>
                }
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo data={dataInfo}/>
              </View>
            </View>

            <View style={S.filter}>
              <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
                <View style={[S.optionSelect, S.optionSelectLeft, {marginBottom: 25, height: 36}]}>

                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      onPress={() => this.showDateStart()}
                      style={DefaultStyle._btnDateFilter}>
                      <Text style={[DefaultStyle._textDate, {fontSize: 12, paddingTop: 7, textAlign: 'center'}]}>
                        {dateStr(startDate) || 'YYYY-MM-DD'}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          {color: '#000000', fontSize: 12},
                        ]}>
                        시작일
                      </Text>
                      {
                        isOpenStart &&
                        <DateTimePickerModal
                          mode="date"
                          isVisible={isOpenStart}
                          date={startDate ? startDate : new Date()}
                          onConfirm={(date) => this.onChangeStart(date)}
                          onCancel={() => {
                            this.setState({
                              isOpenStart: false
                            });
                          }}
                        />

                      }
                    </TouchableOpacity>
                  </View>


                </View>
                <Text style={[S.hyphen, {height: 36, lineHeight: 36}]}>-</Text>
                <View style={[S.optionSelect, S.optionSelectLeft, {height: 36}]}>

                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      onPress={() => this.showDateEnd()}
                      style={DefaultStyle._btnDateFilter}>
                      <Text style={[DefaultStyle._textDate, {fontSize: 12, paddingTop: 7, textAlign: 'center'}]}>
                        {dateStr(endDate) || 'YYYY-MM-DD'}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          {color: '#000000', fontSize: 12},
                        ]}>
                        종료일
                      </Text>
                      {
                        isOpenEnd &&
                        <DateTimePickerModal
                          mode="date"
                          isVisible={isOpenEnd}
                          date={endDate ? endDate : new Date()}
                          onConfirm={(date) => this.onChangeEnd(date)}
                          onCancel={() => {
                            this.setState({
                              isOpenEnd: false
                            });
                          }}
                        />
                      }

                    </TouchableOpacity>
                  </View>


                </View>
                <View style={[S.optionSelect, S.optionSelectLeft, {height: 36}]}>
                  <Select data={rangeDay}
                          valueProps={this.onChangeRangeDay}
                          style={[S.select, {height: 36}]}
                  />
                </View>
              </View>
              {/** TODO 처리 아직 안됨 **/}
              {/*<View style={[DefaultStyle._listElement, {marginBottom: -10}]}>*/}
              {/*  */}
              {/*  <View style={[S.optionSelect, S.optionSelectLeft]}>*/}
              {/*    /!* <Select data={selectNumber} style={S.select} /> *!/*/}
              {/*    <Select data={limitRow} style={S.select} valueProps={this.onChangeLimitRow}/>*/}
              {/*  </View>*/}
              {/*  <View style={[S.optionSelect, S.optionSelectLeft]}>*/}
              {/*    <Select data={selectRequest} style={S.select} valueProps={this.onChangeContractType}/>*/}
              {/*  </View>*/}
              {/*</View>*/}
            </View>

            <View style={DefaultStyle._card}>

              <View
                style={[
                  DefaultStyle._headerCard,
                  DefaultStyle._borderBottom,
                ]}>
                <View
                  style={[DefaultStyle._titleCard, DefaultStyle._titleStatus]}>
                  <Text style={DefaultStyle._textTitleCard}>입출고 요청 정보</Text>
                  {
                    isExpired ?
                      <TouchableHighlight>
                        <Text style={DefaultStyle._statusProcessingFalse}>
                          수탁 기간 만료
                        </Text>
                      </TouchableHighlight>
                      :
                      <TouchableOpacity>
                        <Text style={DefaultStyle._statusProcessing}>
                          수탁 진행 중
                        </Text>
                      </TouchableOpacity>

                  }
                </View>
                <View style={SS.totalFees}>
                  <Text style={SS.textTotalFees}>입･출고료 합계</Text>
                  <Text style={SS.textTotal}> {money(totalMoney ? totalMoney : 0)}</Text>
                </View>
              </View>

            </View>

            { /** 임차인 전용 (입고요청 버튼, 출고요청 버튼) TODO Working **/
              type === 'TENANT' &&

              <View>
                <View style={[DefaultStyle._listBtn, SS.listBtnProcess, {marginTop: 0, marginBottom: 20}]}>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        popUpTitle: '입고 요청',
                        popUpDateLabel: '입고 예정일',
                        popUpQtyLabel: '입고 예정 수량',
                        typeCreate: 'import'
                      }, () => {
                        this.showDialog()
                      })
                    }}
                    style={[DefaultStyle._btnInline, {marginRight: 8}]}>
                    <Text
                      style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                      입고요청
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        popUpTitle: '출고 요청',
                        popUpDateLabel: '출고 예정일',
                        popUpQtyLabel: '출고 예정 수량',
                        typeCreate: 'export'
                      }, () => {
                        this.showDialog()
                      })
                    }}
                    style={[
                      DefaultStyle._btnInline,
                      {backgroundColor: '#e64a19'},
                    ]}>
                    <Text
                      style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                      출고 요청
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            }

            <View style={SS.processing}>
              <FilterButton
                label="진행 내역 보기"
                onPress={() => this.setState({isToggle: !isToggle})}
                isToggle={isToggle}
                style={[SS.toggle, {borderColor: '#e5e5ea', borderWidth:1}]}
                styleLabel={SS.textToggle}
              />
              {/*{isToggle === true &&*/}
              {/*  processing*/}
              {/*}*/}

              {isToggle !== true ? (

                isEmpty ?
                  <View style={DefaultStyle._bodyCard}>
                    <Text style={SS.textBody}>
                      등록한 입･출고 내역이 없습니다.
                    </Text>
                  </View>
                  :
                  processing


                // receiptCancel === true ? (
                //   <Fragment>
                //     <TableInfo
                //       data={viewProgress}
                //       style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                //     />
                //     <View style={SS.footerCheckInfo}>
                //       <TouchableOpacity
                //         onPress={() => {
                //           this.setState({ isCancel: true });
                //         }}
                //         style={[DefaultStyle._btnOutline, SS.btnProcess]}>
                //         <Text
                //           style={[
                //             DefaultStyle._textButton,
                //             { color: '#000000' },
                //           ]}>
                //           송장정보 확인
                //         </Text>
                //       </TouchableOpacity>
                //     </View>
                //   </Fragment>
              ) : null}
            </View>
          </View>


        </ScrollView>


        {/** 입/출고 팝업 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visible}
          onDismiss={this.hideDialog}>
          <Dialog.Title style={[DefaultStyle._titleDialog, SS.popupHeader]}>
            {this.state.popUpTitle}
          </Dialog.Title>
          <Dialog.Content>
            <View style={[]}>
              <Text style={[DefaultStyle._textTitleCard]}>{this.state.popUpDateLabel}</Text>


              <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
                <View style={[S.optionSelect, S.optionSelectLeft, {
                  height: 40,
                  marginBottom: 45,
                  marginTop: 5,
                  width: '100%'
                }]}>

                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      onPress={() => this.showTimeCreateImport()}
                      style={[DefaultStyle._btnDate, {marginTop: 0}]}>
                      <Text style={[{height: 36, lineHeight: 36, paddingLeft: 16}]}>
                        {dateStr(this.state.createDate)}
                      </Text>
                      {
                        isOpenTimeCreateImport &&
                        <DateTimePickerModal
                          mode="date"
                          isVisible={isOpenTimeCreateImport}
                          date={this.state.createDate ? this.state.createDate : new Date()}
                          onConfirm={(date) => this.onChangeTimeCreateImport(date)}
                          onCancel={() => {
                            this.setState({
                              isOpenTimeCreateImport: false
                            });
                          }}
                        />
                      }
                    </TouchableOpacity>
                  </View>
                </View>

              </View>

              <Text style={[DefaultStyle._textTitleCard, {marginBottom: 5}]}>
                {this.state.popUpQtyLabel}
              </Text>

              <TextField
                ref={el => this.inputValueCreateImport = el}
                value={this.state.createValue}
                styleRight={{top: 5}}
                styleProps={[{height: 36, lineHeight: 18, padding: 0, paddingLeft: 15, fontSize: 14}]}
                onChangeText={(text) => this.onChangeValueImport(text)}
              />

              {type === 'OWNER' &&
              <View>
                {
                  this.state.singleFile &&
                  <View style={SS.infoAttach}>
                    <Text style={SS.textAttach}>{this.state.singleFile.name}</Text>
                    <IconButton
                      style={SS.btnRemove}
                      icon="close-circle"
                      size={16}
                      color="rgba(0, 0, 0, 0.54)"
                      onPress={() => {
                        this.setState({
                          singleFile: null
                        })
                      }}
                    />
                  </View>
                }


                <View style={[DefaultStyle._listBtn, SS.listBtnProcess, {
                  marginTop: 11,
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0
                }]}>


                  <TouchableOpacity
                    onPress={() => this.handlePicker()}
                    style={[
                      DefaultStyle._btnOutline,
                      DefaultStyle._btnLeft,
                      SS.btnProcess,
                      {height: 36}
                    ]}>
                    <Text style={[DefaultStyle._textButton, {color: '#000000'}]}>
                      파일 첨부
                    </Text>
                  </TouchableOpacity>
                </View>


              </View>
              }

            </View>
          </Dialog.Content>
          <Dialog.Actions style={SS.footerPopup}>
            <Button
              style={[SS.btnPopup]}
              color={'rgba(0, 0, 0, 0.54)'}
              onPress={this.hideDialog}>
              취소
            </Button>

            <Button
              style={SS.btnPopup}
              onPress={() => {
                this.createImport()
              }}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.confirm}
          onDismiss={this.hideConfirm}>
          <Dialog.Content>
            <View style={DefaultStyle.imagePopup}/>
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            입고 요청 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              입고요청을 완료했습니다. 입출고내역에서 요청하신 내역을 확인해
              주세요.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => {
                this.hideConfirm();
                this.getAllData();
              }}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={this.state.isCancel}
          onDismiss={() => this.setState({isCancel: false})}>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            {this.state.popUpTitle}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              {this.state.popUpTitle}를 하시겠습니까?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              color="rgba(0, 0, 0, 0.54)"
              style={[DefaultStyle._buttonElement, {paddingTop: 10, paddingBottom: 10}]}
              onPress={() => this.setState({isCancel: false})}>
              아니오
            </Button>
            <Button
              style={[DefaultStyle._buttonElement, {paddingTop: 10, paddingBottom: 10}]}
              onPress={() => {
                this.onCancelRequest()
              }
              }>
              네
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/** 입고 요청 완료 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.completeRequestImport}
          onDismiss={() => this.setState({completeRequestImport: false})}>
          <Dialog.Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/*<View style={DefaultStyle.imagePopup}/>*/}
            <Image source={imgType0001}/>
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            입고 요청 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              입고 요청을 완료했습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement, {marginTop: 10, marginBottom: 10}]}
              onPress={() =>
                this.setState({completeRequestImport: false})
              }>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/** 출고 요청 완료 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.completeRequestExport}
          onDismiss={() => this.setState({completeRequestExport: false})}>
          <Dialog.Content>
            {/*<View style={DefaultStyle.imagePopup}/>*/}
            <Image source={illust15} style={DefaultStyle._avatarHeader}/>
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            출고 요청 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              출고 요청을 완료했습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement, {marginTop: 10, marginBottom: 10}]}
              onPress={() =>
                this.setState({completeRequestExport: false})
              }>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/** 입고 확정 완료 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.confirmRequestImport}
          onDismiss={() => this.setState({confirmRequestImport: false})}>
          <Dialog.Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/* <View style={DefaultStyle.imagePopup}/> */}
             <Image source={illust15}/>
            {/*<Image source={{uri: this.state.uirDoneImport}} style={{width: 150, height: 150}}/>*/}
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            입고 확정 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              입고 확정이 완료했습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement, {marginTop: 10, marginBottom: 10}]}
              onPress={() =>
                this.setState({confirmRequestImport: false})
              }>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/** 출고 확정 완료 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.confirmRequestExport}
          // visible={true}
          onDismiss={() => this.setState({confirmRequestExport: false})}>
          <Dialog.Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={illust15}/>
            {/*<Image source={{uri: this.state.uirDoneImport}} style={{width: 150, height: 150}}/>*/}
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            출고 확정 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              출고 확정이 완료했습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement, {marginTop: 10, marginBottom: 10}]}
              onPress={() =>
                this.setState({confirmRequestExport: false})
              }>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/** 입고 요청 취소 완료 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.cancelRequestImport}
          onDismiss={() => this.setState({cancelRequestImport: false})}>
          <Dialog.Content style={[{justifyContent: 'center', alignItems: 'center'}]}>
            <Image source={illust15}/>
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            입고 요청 취소 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              입고 요청 취소를 완료했습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement, {marginTop: 10, marginBottom: 10}]}
              onPress={() =>
                this.setState({cancelRequestImport: false})
              }>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/** 출고 요청 취소 완료 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.cancelRequestExport}
          onDismiss={() => this.setState({cancelRequestExport: false})}>
          <Dialog.Content style={[{justifyContent: 'center', alignItems: 'center'}]}>
            <Image source={illust15}/>
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            출고 요청 취소 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              출고 요청 취소를 완료했습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() =>
                this.setState({cancelRequestExport: false})
              }>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/** 이미지 팝업 **/}
        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.openImagePopup}
          onDismiss={() => this.setState({openImagePopup: false, imageUrl: ''})}>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog, {marginTop: 20}]}>
            {this.state.openImagePopupTitle}
          </Dialog.Title>
          <Dialog.Content style={[{
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
            <ImageModal
              resizeMode="contain"
              imageBackgroundColor="#fff"
              style={{
                width: 300,
                height: 250,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              source={{
                uri: this.state.imageUrl,
              }}
            />
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement, {fontSize: 20, paddingTop: 16, paddingBottom: 16}]}
              onPress={() =>
                this.setState({openImagePopup: false, imageUrl: ''})
              }>
              닫기
            </Button>
          </Dialog.Actions>
        </Dialog>


      </SafeAreaView>
    );
  }

}

