/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Appbar,
  Dialog,
  IconButton,
  Text,
  List,
  Button,
  Paragraph,
} from 'react-native-paper';
import Select from '@Components/organisms/Select';
import FilterButton from '@Components/atoms/FilterButton';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';
import TextField from '@Components/organisms/TextField';

import Appbars from '@Components/organisms/AppBar';
import DatePicker from '@react-native-community/datetimepicker';
import { formatDateV1 } from '@Utils/dateFormat';
import { styles as S } from '../style';
import { styles as SS } from './style';
import { InOutManagerService } from '@Services/apis';

const selectRequest = [
  {
    label: '입고 요청',
    value: '입고 요청',
  },
];

const viewProgress = [
  {
    type: '작성 일시',
    value: '2020.11.10 09:05:00',
  },
  {
    type: '작성자',
    value: '임차인(ID)',
  },
  {
    type: '구분',
    value: '입고 요청',
  },
  {
    type: '예정/ 확정 일시',
    value: '입고예정 : 2020.11.10 09:05:00',
  },
  {
    type: '입고량',
    value: '100',
  },
  {
    type: '출고량',
  },
  {
    type: '재고',
  },
  {
    type: '적용단가',
    value: '950/PLT',
  },
  {
    type: '입고비',
    value: '95,000원',
  },
  {
    type: '출고비',
  },
  {
    type: '보관비',
  },
];

var searchTimerQuery;
export default class DetailsManager extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    let { rentWarehNo, type } = props.route.params
    this.state = {
      rentWarehNo,
      type,
      visible: false,
      confirm: false,
      dataInfo: [],
      responseFilter: [],
      isProgress: false,
      isCancel: false,
      cancelRequest: false,
      isToggle: false,
      resBody: {},
      receiptCancel: false,
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
      timeCreateImport: new Date(),
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
      limitRow : [
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
      ]
    };

    this.navigation = props.navigation;
  }

  componentDidMount() {
    this.getAllData()
  }


  async getAllData() {
    let { filter, type, rentWarehNo } = this.state;
    let { startDate, endDate, query, contractType } = filter;
    let params = {
      startDate,
      endDate,
      query,
      id: rentWarehNo,
      rangeDate: '',
      type: type,
      contractType
    };
    await InOutManagerService.getDetail(params).then((res) => {
      let header = res.data.header;
      let resBody = res.data.header.cntrTrustResBody;
      const dataInfo = [
        {
          type: '창고명',
          value: header.warehouse,
        },
        {
          type: '창고주',
          value: header.owner,
        },
        {
          type: '위치',
          value: header.address,
        },
        {
          type: '보관유형',
          value: header.gdsTypeCode,
        },
        {
          type: '정산단위',
          value: header.cntrTrustResBody.calUnitDvCode.stdDetailCode,
        },
        {
          type: '산정기준',
          value: header.cntrTrustResBody.calStdDvCode.stdDetailCode,
        },
        {
          type: '물동량',
          value: '400',
        },
        {
          type: '수탁 기간',
          value: ` ${formatDateV1(header?.cntrTrustResBody?.id?.cntrYmdForm ?? '')} ~ ${formatDateV1(header?.cntrTrustResBody?.id?.cntrYmdTo ?? '')}`,
        },
        {
          type: '보관비',
          value: header.cntrTrustResBody?.value ?? '-',
        },
      ];


      let responseFilter = res.data.data.content.map((item, index) => {
        var division = ''
        switch (true) {
          case item.type === 'IMPORT' && item.status === '1100':
            devision = '입고 요청'
            break;
          case item.type === 'IMPORT' && item.status === '1200':
            '입고 확정'
            break;
          case item.type === 'IMPORT' && item.status === '9100':
            devision = '입고 요청 취소'
            break;
          case item.type === 'EXPORT' && item.status === '2100':
            devision = '출고 요청'
            break;
          case item.type === 'EXPORT' && item.status === '2200':
            devision = '출고 확정'
            break;
          case item.type === 'EXPORT' && item.status === '9500':
            devision = '출고 요청 취소'
            break;
        }
        return {
          dataProgress: [
            {
              type: '작성 일시',
              value: ` ${formatDateV1(item.createdDate ?? '')}`,
            },
            {
              type: '작성자',
              value: '임차인(ID)',
            },
            {
              type: '구분',
              value: devision,
            },
            {
              type: '예정/ 확정 일시',
              value: item.type === 'IMPORT' ? `출고예정1 : ${formatDateV1(item.rtwhWhinResBody.whinExpct)}` : `입고 확정 : ${formatDateV1(item.rtwhWhoutResBody.decis)}`,
            },
            {
              type: '입고량',
              value: item.type === 'IMPORT' && item.rtwhWhinResBody.whinExpctQty !== null ? item.rtwhWhinResBody.whinExpctQty : item.type === 'EXPORT' && item.rtwhWhoutResBody.decisQty !== null ? item.rtwhWhoutResBody.decisQty : "-",
            },
            {
              type: '출고량',
              value: item.type === 'IMPORT' && item.rtwhWhinResBody.whinDecisQty !== null ? item.rtwhWhinResBody.whinDecisQty : item.type === 'EXPORT' && item.rtwhWhoutResBody.expctQty !== null ? item.rtwhWhoutResBody.expctQty : "-"
            },
            {
              type: '재고',
              value: item.stockQty
            },
            {
              type: '적용단가',
              value: resBody.whinChrg ? resBody.whinChrg : "-" + '/PLT',
            },
            {
              type: '입고비',
              value: resBody.whinChrg ? resBody.whinChrg + '원' : "-",
            },
            {
              type: '출고비',
              value: resBody.whoutChrg ? resBody.whoutChrg + '원' : "-"
            },
            {
              type: '보관비',
              value: '-'
            }
          ]
        }
      })
      this.setState({
        dataInfo, responseFilter, resBody
      })
    })
  }


  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });
  showConfirm = () => this.setState({ confirm: true });

  hideConfirm = () => this.setState({ confirm: false });

  showDateStart = () => {
    let { isOpenStart } = this.state
    this.setState({
      isOpenStart: !isOpenStart
    })
  }
  showTimeCreateImport = () => {
    let { isOpenTimeCreateImport } = this.state
    this.setState({
      isOpenTimeCreateImport: !isOpenTimeCreateImport
    })
  }

  showDateEnd = () => {
    let { isOpenEnd } = this.state
    this.setState({
      isOpenEnd: !isOpenEnd
    })
  }


  onChangeStart = (event, selectedDate) => {
    let { isOpenStart } = this.state;
    if (event.type == 'dismissed') {
      this.setState({
        isOpenStart: !isOpenStart
      })
    } else {
      let filter =  {...this.state.filter}
      filter.startDate = event.nativeEvent.timestamp
      this.setState({
        filter: filter,
        isOpenStart: !isOpenStart
      }, () => {
        this.getAllData()
      })
    }
  }

  onChangeEnd = (event, selectedDate) => {
    let { isOpenEnd } = this.state
    if (event.type == 'dismissed') {
      this.setState({
        isOpenEnd: !isOpenEnd
      })
    } else {
      let filter =  {...this.state.filter}
      filter.endDate = event.nativeEvent.timestamp
      this.setState({
        filter,
        isOpenEnd: !isOpenEnd
      }, () => {
        this.getAllData()
      })
    }
  };

  onChangeEnd = (event, selectedDate) => {
    let { isOpenEnd } = this.state
    if (event.type == 'dismissed') {
      this.setState({
        isOpenEnd: !isOpenEnd
      })
    } else {
      this.setState({
        endDate: event.nativeEvent.timestamp,
        isOpenEnd: !isOpenEnd
      }, () => {
        this.getAllData()
      })
    }
  };
  onChangeTimeCreateImport = (event, selectedDate) => {
    let { isOpenTimeCreateImport } = this.state
    if (event.type == 'dismissed') {
      this.setState({
        isOpenTimeCreateImport: !isOpenTimeCreateImport
      })
    } else {
      this.setState({
        timeCreateImport: event.nativeEvent.timestamp,
        isOpenTimeCreateImport: !isOpenTimeCreateImport
      })
    }
  };

  onChangeRangeDay = (event, selectedDate) => {
  };
  onChangeLimitRow = (event, selectedDate) => {
  };

  onChangeValueImport = (e) => {
    if (searchTimerQuery) {
      clearTimeout(searchTimerQuery);
    }
    searchTimerQuery = setTimeout(async () => {
      this.setState({
        valueCreateImport: this.inputValueCreateImport.state.value
      }, () => {
        this.getAllData()
      })
    }, 500);
  }

  async createImport() {
    let {rentWarehNo, timeCreateImport, valueCreateImport, typeCreate} = this.state
    let body = {
      rentWarehNo,
      whinExpct: timeCreateImport.getTime(),
      whinExpctQty: valueCreateImport,
      typeCreate
    }
      await InOutManagerService.createImport(body).then(res => {
        if(res.data.msg !== 'success') {
          return
        }
        this.showConfirm();
        this.hideDialog();
      })
  }


  render() {
    const { route } = this.props;
    const { isProgress, isToggle, receiptCancel, dataInfo, responseFilter } = this.state;

    const { isOpenStart, isOpenEnd, rangeDay, limitRow, isOpenTimeCreateImport, timeCreateImport } = this.state;
    let { startDate, endDate } = this.state.filter;

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
                  <View style={{ paddingTop: 40 }}>
                    <TableInfo
                      data={item.dataProgress}
                      style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                    />
                  </View>

                )
              })
            }

            <View style={[DefaultStyle._listBtn, SS.listBtnProcess]}>
              <TouchableOpacity
                onPress={() => {
                  console.log('송장정보 확인');
                }}
                style={[
                  DefaultStyle._btnOutline,
                  DefaultStyle._btnLeft,
                  SS.btnProcess,
                ]}>
                <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
                  송장정보 확인
              </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isCancel: true });
                }}
                style={[
                  DefaultStyle._btnOutline,
                  DefaultStyle._btnRight,
                  SS.btnProcess,
                ]}>
                <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
                  입고요청 취소
              </Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        );

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="마이페이지"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            <View style={DefaultStyle._titleCard}>
              <Text
                style={[
                  DefaultStyle._textTitleCard,
                  S.textTitleTenant,
                  { paddingBottom: 0 },
                ]}>
                입･출고 상세 내역
              </Text>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCardTitle}>
                <View style={S.avatarHeader} />
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo data={dataInfo} />
              </View>
            </View>

            <View style={S.filter}>
              <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
                <View style={[S.optionSelect, S.optionSelectLeft, { height: 40, marginBottom: 45 }]}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => this.showDateStart()}
                      style={DefaultStyle._btnDate}>
                      <Text style={DefaultStyle._textDate}>
                        {formatDateV1(startDate)}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          { color: '#000000' },
                        ]}>
                        수탁 기간
                      </Text>
                      {
                        isOpenStart &&
                        <DatePicker
                          mode={'date'}
                          show={isOpenStart}
                          onChange={(e) => this.onChangeStart(e)}
                          value={startDate}
                          testID="dateTimePicker"
                        />
                      }
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={S.hyphen}>-</Text>

                <View style={[S.optionSelect, S.optionSelectLeft]}>

                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => this.showDateEnd()}
                      style={DefaultStyle._btnDate}>
                      <Text style={DefaultStyle._textDate}>
                        {formatDateV1(endDate)}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          { color: '#000000' },
                        ]}>
                        수탁 기간
                      </Text>
                      {
                        isOpenEnd &&
                        <DatePicker
                          mode={'date'}
                          show={isOpenEnd}
                          onChange={(e) => this.onChangeEnd(e)}
                          value={endDate}
                          testID="dateTimePicker"
                        />
                      }

                    </TouchableOpacity>
                  </View>
                </View>

              </View>
              <View style={[DefaultStyle._listElement, { marginBottom: -10 }]}>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={rangeDay} style={S.select} onChange={this.onChangeRangeDay} />
                </View>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  {/* <Select data={selectNumber} style={S.select} /> */}
                  <Select data={limitRow} style={S.select} onChange={this.onChangeLimitRow} />
                </View>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={selectRequest} style={S.select} />
                </View>
              </View>
            </View>

            <View style={[DefaultStyle._listBtn]}>
              <TouchableOpacity
                style={[
                  DefaultStyle._btnOutline,
                  { marginRight: 8, borderColor: 'rgba(19, 19, 20, 0.5)' },
                ]}>
                <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
                  엑셀 다운
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({typeCreate: 'import'}, ()=>{
                    this.showDialog()
                  })
                } }
                style={[DefaultStyle._btnInline, { marginRight: 8 }]}>
                <Text
                  style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                  입고요청
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                this.setState({typeCreate: 'export'}, ()=>{
                  this.showDialog()
                })
              }}
                style={[
                  DefaultStyle._btnInline,
                  { backgroundColor: '#e64a19' },
                ]}>
                <Text
                  style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                  출고 요청
                </Text>
              </TouchableOpacity>
            </View>

            <View style={DefaultStyle._card}>
              <View
                style={[
                  DefaultStyle._headerCard,
                  DefaultStyle._borderBottom,
                ]}>
                <View
                  style={[DefaultStyle._titleCard, DefaultStyle._titleStatus]}>
                  <Text style={DefaultStyle._textTitleCard}>진행 상황</Text>
                  <Text style={DefaultStyle._statusProcessing}>
                    수탁 진행 중
                  </Text>
                </View>
                <View style={SS.totalFees}>
                  <Text style={SS.textTotalFees}>입･출고 료 합계</Text>
                  <Text style={SS.textTotal}>-원</Text>
                </View>
              </View>
              {processing}
            </View>

            <View style={SS.processing}>
              <FilterButton
                label="진행 내역 보기"
                onPress={() => this.setState({ isToggle: !isToggle })}
                isToggle={isToggle}
                style={SS.toggle}
                styleLabel={SS.textToggle}
              />
              {isToggle === true ? (
                receiptCancel === true ? (
                  <Fragment>
                    <TableInfo
                      data={viewProgress}
                      style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                    />
                    <View style={SS.footerCheckInfo}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ isCancel: true });
                        }}
                        style={[DefaultStyle._btnOutline, SS.btnProcess]}>
                        <Text
                          style={[
                            DefaultStyle._textButton,
                            { color: '#000000' },
                          ]}>
                          송장정보 확인
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Fragment>
                ) : (
                    <View style={DefaultStyle._bodyCard}>
                      <Text style={SS.textBody}>
                        등록한 입･출고 내역이 없습니다.
                    </Text>
                    </View>
                  )
              ) : null}
            </View>
          </View>
        </ScrollView>

        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visible}
          onDismiss={this.hideDialog}>
          <Dialog.Title style={[DefaultStyle._titleDialog, SS.popupHeader]}>
            입고정보 등록
          </Dialog.Title>
          <Dialog.Content>
            <View style={SS.bodyPopup}>
              <Text style={DefaultStyle._textTitleCard}>입고 예정일</Text>


              <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
                <View style={[S.optionSelect, S.optionSelectLeft, { height: 40, marginBottom: 45, marginTop: 15, width: '100%' }]}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => this.showTimeCreateImport()}
                      style={DefaultStyle._btnDate}>
                      <Text style={DefaultStyle._textDate}>
                        {formatDateV1(timeCreateImport)}
                      </Text>
                      <Text
                        style={[
                          DefaultStyle._labelTextField,
                          { color: '#000000' },
                        ]}>
                        수탁 기간
                      </Text>
                      {
                        isOpenTimeCreateImport &&
                        <DatePicker
                          mode={'date'}
                          show={isOpenTimeCreateImport}
                          onChange={(e) => this.onChangeTimeCreateImport(e)}
                          value={timeCreateImport}
                          testID="dateTimePicker"
                        />
                      }
                    </TouchableOpacity>
                  </View>
                </View>

              </View>


              <Text style={DefaultStyle._textTitleCard}>
              입고 예정 수량


              </Text>
              <TextField
                ref={el => this.inputValueCreateImport = el}
                textRight="P"
                styleRight={{ top: 5 }}
                styleProps={SS.inputStyle}
                onChange={(e) => this.onChangeValueImport(e)}
              />
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
            <View style={DefaultStyle.imagePopup} />
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
                this.setState({ isProgress: true }, ()=>{
                  this.getAllData();
                });
              }}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={this.state.isCancel}
          onDismiss={() => this.setState({ isCancel: false })}>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, , DefaultStyle.titleDialog]}>
            입고 요청 취소
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              입고 요청을 취소하시겠습니까?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              color="rgba(0, 0, 0, 0.54)"
              style={[DefaultStyle._buttonElement]}
              onPress={() => this.setState({ isCancel: false })}>
              아니오
            </Button>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() =>
                this.setState({ cancelRequest: true, isCancel: false })
              }>
              네
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.cancelRequest}
          onDismiss={() => this.setState({ cancelRequest: false })}>
          <Dialog.Content>
            <View style={DefaultStyle.imagePopup} />
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
              style={DefaultStyle._buttonElement}
              onPress={() =>
                this.setState({ cancelRequest: false, receiptCancel: true })
              }>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>
      </SafeAreaView>
    );
  }

}

