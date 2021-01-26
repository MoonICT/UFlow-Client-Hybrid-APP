/**
 * 입출고 관리
 * @create
 * @modify chonglye chang
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { styles as S } from '../style';
import { styles as SS } from './style';
import illust15 from '@Assets/images/illust15.png';

import Moment from 'moment';
import { moneyUnit, dateStr, toStdCd } from '@Utils/StringUtils';
import { View, TouchableOpacity, Image} from 'react-native';
import { Text, Dialog, Button, Paragraph } from 'react-native-paper';
import Select from '@Components/organisms/SelectFilter';
import AsyncStorage from "@react-native-community/async-storage";

// Local Imports
import DefaultStyle from '@Styles/default';
import CardMypage from '@Components/organisms/CardMypage';
import TextField from '@Components/organisms/TextField';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Fontisto';
import card from '@Assets/images/card-img.png';
import { InOutManagerService, WarehouseOut } from '@Services/apis';
import { MY_PAGE_TAB_STATUS_KEY } from '@Constant';
// import DatePicker from '@react-native-community/datetimepicker';


var searchTimerQuery;
var searchTimerQuery2;
var searchTimerQuery3;
export default class InOutManager extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      dataCard: [],
      valueTab: 'OWNER',
      typeCreate: 'import',
      rentWarehNoCurrent: -1,
      visibleImport: false,
      visibleExpert: false,
      isOpenTimeCreateImport: false,
      isOpenTimeCreateExpert: false,
      timeCreateImport: new Date().getTime(),
      timeCreateExpert: new Date().getTime(),
      confirm: false,
      confirmTitle: '',
      filter: {
        query: '',
        contractType: 2100,
        rangeTime: '',
        startDate: '',
        endDate: '',
      },
      isOpenStart: false,
      isOpenEnd: false,
      rangeDay: [
        {
          value: '',
          label: '전체',
        },
        {
          value: '7',
          label: '7일',
        },
        {
          value: '15',
          label: '15일',
        },
        {
          value: '30',
          label: '1개월',
        },
        {
          value: '90',
          label: '3개월',
        },
        {
          value: '180',
          label: '6개월',
        },
        {
          value: '365',
          label: '1년',
        },
      ],
    };

    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::: 입출고 관리 페이지 :::');
    // 탭 초기화.
    const tabStatus = await AsyncStorage.getItem(MY_PAGE_TAB_STATUS_KEY);
    this.setState(
      {
        valueTab: tabStatus && tabStatus === 'TENANT' ? 'TENANT' : 'OWNER',
      },
      () => {
        this.getAllData();
      },
    );
  }

  async getAllData() {
    let { filter, valueTab } = this.state;
    let { startDate, endDate, query, contractType } = filter;
    let params = {
      startDate,
      endDate,
      query,
      rangeDate: '',
      type: valueTab,
      contractType,
    };

    await InOutManagerService.getAll(params)
      .then(res => {
        let newData = res.data.data.content.map(item => {

          let status = '';
          let highlight = false;
          if (
            item.sttsDbCode === '5100' &&
            !item.expiredContract &&
            !item.notFoundContract
          ) {
            status = '계약체결';
            highlight = true;
          } else if (
            item.sttsDbCode === '5200' &&
            !item.expiredContract &&
            !item.notFoundContract
          ) {
            status = '계약만료';
          } else if (
            item.sttsDbCode === '5300' &&
            !item.expiredContract &&
            !item.notFoundContract
          ) {
            status = '계약해지';
          } else if (item.expiredContract) {
            status = '계약만료';
          } else if (item.notFoundContract) {
            status = '계약정보 없음';
          }
          console.log('item', item);
          return {
            image: item.whrgImg,
            statusCode: item.cntrDvCode,
            rentWarehNo: item.rentWarehNo,
            status: item.status,
            name: item.name,
            labelList: [
              {
                type: '창고 주소',
                value: item.address || '',
              },
              {
                type: '수탁 기간',
                value: `${item.cntrYmdFrom ? dateStr(item.cntrYmdFrom) : ''
                  } ~ ${item.cntrYmdTo ? dateStr(item.cntrYmdTo) : ''}`,
              },
              {
                type: '진행 상태',
                value: status,
                highlight: highlight,
              },
              {
                type: '입출고료 합계',
                value: item.totalWhrg ? moneyUnit(item.totalWhrg) : '0 원',
              },
            ],
          };
        });

        this.setState({
          dataCard: newData,
        });
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  onChangeTab(value) {
    this.setState(
      {
        valueTab: value,
      },
      () => {
        this.getAllData();
      },
    );
    AsyncStorage.setItem(MY_PAGE_TAB_STATUS_KEY, value);
  }

  showDateStart = () => {
    let { isOpenStart } = this.state;
    this.setState({
      isOpenStart: !isOpenStart,
    });
  };

  showDateEnd = () => {
    let { isOpenEnd } = this.state;
    this.setState({
      isOpenEnd: !isOpenEnd,
    });
  };

  onChangeStart = (event, selectedDate) => {
    let { isOpenStart } = this.state;
    let filter = { ...this.state.filter };
    filter.startDate = event;
    this.setState(
      {
        filter: filter,
        isOpenStart: !isOpenStart,
      },
      () => {
        this.getAllData();
      },
    );

    // if (event.type == 'dismissed') {
    //   this.setState({
    //     isOpenStart: !isOpenStart,
    //   });
    // } else {
    //   let filter = { ...this.state.filter };
    //   filter.startDate = event.nativeEvent.timestamp;
    //   this.setState(
    //     {
    //       filter: filter,
    //       isOpenStart: !isOpenStart,
    //     },
    //     () => {
    //       this.getAllData();
    //     },
    //   );
    // }
  };

  onChangeEnd = (event, selectedDate) => {
    let { isOpenEnd } = this.state;

    let filter = { ...this.state.filter };
    filter.endDate = event;
    this.setState(
      {
        filter: filter,
        isOpenEnd: !isOpenEnd,
      },
      () => {
        this.getAllData();
      },
    );

    // if (event.type == 'dismissed') {
    //   this.setState({
    //     isOpenEnd: !isOpenEnd,
    //   });
    // } else {
    //   let filter = { ...this.state.filter };
    //   filter.endDate = event.nativeEvent.timestamp;
    //   this.setState(
    //     {
    //       filter: filter,
    //       isOpenEnd: !isOpenEnd,
    //     },
    //     () => {
    //       this.getAllData();
    //     },
    //   );
    // }
  };

  onChangeRangeDay = value => {
    console.log('onChangeRangeDay', value);
    let filter = { ...this.state.filter };
    if (value) {
      const start = Moment()
        .subtract(value, 'days')
        .format('YYYY-MM-DD');
      const end = Moment().format('YYYY-MM-DD');

      filter.startDate = start;
      filter.endDate = end;
    } else {
      filter.startDate = null;
      filter.endDate = null;
    }
    this.setState(
      {
        filter: filter,
      },
      () => {
        this.getAllData();
      },
    );
  };

  onChangeKeyWord = e => {
    if (searchTimerQuery) {
      clearTimeout(searchTimerQuery);
    }
    searchTimerQuery = setTimeout(async () => {
      this.setState(
        {
          query: this.inputKeyWord.state.value,
        },
        () => {
          this.getAllData();
        },
      );
    }, 500);
  };

  // 입고
  onChangeTimeCreateImport = (selectedDate) => {
    let { isOpenTimeCreateImport } = this.state;

    alert(selectedDate);

    this.setState({
      timeCreateImport: selectedDate,
      isOpenTimeCreateImport: !isOpenTimeCreateImport,
    });
    // }
  };

  // 출고
  onChangeTimeCreateExpert = (selectedDate) => {
    let { isOpenTimeCreateExpert } = this.state;

    alert(selectedDate);

    this.setState({
      timeCreateExpert: selectedDate,
      isOpenTimeCreateExpert: !isOpenTimeCreateExpert,
    });
    // }
  };

  // 입고
  showTimeCreateImport = () => {
    let { isOpenTimeCreateImport } = this.state;
    this.setState({
      isOpenTimeCreateImport: !isOpenTimeCreateImport,
    });
  };

  // 출고
  showTimeCreateExpert = () => {
    let { isOpenTimeCreateExpert } = this.state;
    this.setState({
      isOpenTimeCreateExpert: !isOpenTimeCreateExpert,
    });
  };

  onChangeValueImport = e => {
    if (searchTimerQuery2) {
      clearTimeout(searchTimerQuery2);
    }
    searchTimerQuery2 = setTimeout(async () => {
      this.setState({
        valueCreateImport: this.inputValueCreateImport.state.value,
      });
    }, 500);
  };

  onChangeValueExpert = e => {
    if (searchTimerQuery3) {
      clearTimeout(searchTimerQuery3);
    }
    searchTimerQuery3 = setTimeout(async () => {
      this.setState({
        valueCreateExpert: this.inputValueCreateExpert.state.value,
      });
    }, 500);
  };

  async createImport() {
    let {
      rentWarehNoCurrent,
      timeCreateImport,
      valueCreateImport,
      typeCreate,
    } = this.state;

    if (!timeCreateImport) {
      alert('입고 예정일을 입력하세요.');
      return;
    }

    if (!valueCreateImport) {
      alert('입고 예정 수량을 입력하세요.');
      return;
    }

    await WarehouseOut.postImportTenant({
      rentWarehNo: rentWarehNoCurrent,
      whinExpct : timeCreateImport,
      whinExpctQty : valueCreateImport
    })
      .then((res) => {
        this.setState({
          confirmTitle: '입고 요청 완료'
        });
        this.showConfirm();
        this.hideDialogImport();
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  async createExpert() {
    let {
      rentWarehNoCurrent,
      timeCreateExpert,
      valueCreateExpert,
      typeCreate,
    } = this.state;

    console.log(rentWarehNoCurrent, 'rentWarehNoCurrent');
    console.log(timeCreateExpert, 'timeCreateExpert');
    console.log(valueCreateExpert, 'valueCreateExpert');

    if (!timeCreateExpert) {
      alert('출고 예정일을 입력하세요.');
      return;
    }

    if (!valueCreateExpert) {
      alert('출고 예정 수량을 입력하세요.');
      return;
    }

    await WarehouseOut.postExportTenant({
      rentWarehNo: rentWarehNoCurrent,
      whoutExpct : timeCreateExpert,
      expctQty : valueCreateExpert
    })
      .then((res) => {
        this.setState({
          confirmTitle: '출고 요청 완료'
        });
        this.showConfirm();
        this.hideDialogExpert();
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  showDialogExpert = () => this.setState({ visibleExpert: true });
  hideDialogExpert = () => {
    this.setState({ visibleExpert: false, valueCreateExpert: ''});
  } 
  showDialogImport = () => this.setState({ visibleImport: true });
  hideDialogImport = () => {
    console.log('object', object)
    this.setState({ visibleImport: false, valueCreateImport: '' })
  };

  showConfirm = () => this.setState({ confirm: true });
  hideConfirm = () => this.setState({ confirm: false });

  render() {
    const {
      valueTab,
      isOpenStart,
      isOpenEnd,
      rangeDay,
      dataCard,
      timeCreateImport,
      timeCreateExpert,
      isOpenTimeCreateImport,
      isOpenTimeCreateExpert,
    } = this.state;
    let { startDate, endDate } = this.state.filter;
    return (
      <>
      <View style={[DefaultStyle._cards, { marginBottom: 180 }]}>
        <View style={DefaultStyle._tabBar}>
          <TouchableOpacity
            style={valueTab === 'OWNER' ? DefaultStyle._btnTabBar : null}
            onPress={() => this.onChangeTab('OWNER')}>
            <Text
              style={
                valueTab === 'OWNER'
                  ? DefaultStyle._textActiveTab
                  : DefaultStyle._textTabBar
              }>
              요청 받은 견적･계약 (창고주)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={valueTab === 'TENANT' ? DefaultStyle._btnTabBar : null}
            onPress={() => this.onChangeTab('TENANT')}>
            <Text
              style={
                valueTab === 'TENANT'
                  ? DefaultStyle._textActiveTab
                  : DefaultStyle._textTabBar
              }>
              요청한 견적･계약 (임차인)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[DefaultStyle._titleCard, { marginBottom: 5 }]}>
          <Text
            style={[
              DefaultStyle._textTitleCard,
              S.textTitleTenant,
              { paddingBottom: 0 },
            ]}>
            입･출고 관리
          </Text>
        </View>
        <Text style={[SS.infoContent, { marginBottom: 14 }]}>
          수탁 계약이 완료된 창고의 입고, 출고 내역을 확인해 주세요.
        </Text>

        <View style={S.filter}>
          <View style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
            <View
              style={[
                S.optionSelect,
                S.optionSelectLeft,
                { marginBottom: 25, height: 36 },
              ]}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => this.showDateStart()}
                  style={DefaultStyle._btnDateFilter}>
                  <Text
                    style={[
                      DefaultStyle._textDate,
                      { fontSize: 12, paddingTop: 5, textAlign: 'center' },
                    ]}>
                    {dateStr(startDate) || 'YYYY-MM-DD'}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      { color: '#000000', fontSize: 12 },
                    ]}>
                    시작일
                  </Text>
                  {
                    isOpenStart && (
                      <DateTimePickerModal
                        mode="date"
                        isVisible={isOpenStart}
                        date={startDate ? startDate : new Date()}
                        onConfirm={date => this.onChangeStart(date)}
                        onCancel={() => {
                          this.setState({
                            isOpenStart: false,
                          });
                        }}
                      />
                    )}
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[S.hyphen, { height: 36, lineHeight: 36 }]}>-</Text>
            <View style={[S.optionSelect, S.optionSelectLeft, { height: 36 }]}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => this.showDateEnd()}
                  style={DefaultStyle._btnDateFilter}>
                  <Text
                    style={[
                      DefaultStyle._textDate,
                      { fontSize: 12, paddingTop: 5, textAlign: 'center' },
                    ]}>
                    {dateStr(endDate) || 'YYYY-MM-DD'}
                  </Text>
                  <Text
                    style={[
                      DefaultStyle._labelTextField,
                      { color: '#000000', fontSize: 12 },
                    ]}>
                    종료일
                  </Text>
                  {isOpenEnd && (

                    <DateTimePickerModal
                      mode="date"
                      isVisible={isOpenEnd}
                      date={endDate ? endDate : new Date()}
                      onConfirm={date => this.onChangeEnd(date)}
                      onCancel={() => {
                        this.setState({
                          isOpenEnd: false,
                        });
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={[S.optionSelect, S.optionSelectLeft, { height: 36 }]}>
              <Select
                data={rangeDay}
                valueProps={this.onChangeRangeDay}
                style={[S.select, { height: 36 }]}
              />
            </View>
          </View>
          <TextField
            styleProps={[DefaultStyle._inputSearch, { paddingRight: 50 }]}
            placeholder="검색어를 입력해 주세요."
            ref={el => (this.inputKeyWord = el)}
            onChange={this.onChangeKeyWord}
            rightComponent={
              <Icon
                name="search"
                color="rgba(0, 0, 0, 0.54)"
                size={17}
                style={DefaultStyle._searchRightIcon}
                onPress={() => this.onChangeKeyWord()}
              />
            }
          />
        </View>

        {dataCard.length > 0 &&
          dataCard.map((item, index) => {
            console.log(item,'item');
            return (
              <CardMypage
                key={index}
                onPressHeader={() =>
                  this.navigation.navigate('DetailsManager', {
                    rentWarehNo: item.rentWarehNo,
                    type: valueTab,
                  })
                }
                headerTitle={item.name}
                data={item.labelList}
                borderRow={false}
                styleLeft={S.styleLeftTable}
                styleRight={S.styleRightTable}
                bgrImage={{
                  uri: item.image
                }}
              />
            );
          })}

      </View>
      {/** 출고요청 팝업 **/}
      <Dialog
        style={[DefaultStyle.popup, SS.popup]}
        visible={this.state.visibleExpert}
        onDismiss={this.hideDialogExpert}>
        <Dialog.Title style={[DefaultStyle._titleDialog, SS.popupHeader]}>
          출고요청 fff
        </Dialog.Title>
        <Dialog.Content>
          <View style={SS.bodyPopup}>
            <Text style={DefaultStyle._textTitleCard}>출고 예정일</Text>

            <View
              style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
              <View
                style={[
                  S.optionSelect,
                  S.optionSelectLeft,
                  {
                    height: 40,
                    marginBottom: 45,
                    marginTop: 15,
                    width: '100%',
                  },
                ]}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => this.showTimeCreateExpert()}
                    style={DefaultStyle._btnDate}>
                    <Text style={DefaultStyle._textDate}>
                      {dateStr(timeCreateExpert)}
                    </Text>
                    {/*<Text*/}
                    {/*  style={[*/}
                    {/*    DefaultStyle._labelTextField,*/}
                    {/*    { color: '#000000' },*/}
                    {/*  ]}>*/}
                    {/*  출고 예정일*/}
                    {/*</Text>*/}
                    {isOpenTimeCreateExpert &&
                     <DateTimePickerModal
                        mode="date"
                        isVisible={isOpenTimeCreateExpert}
                        date={endDate ? endDate : new Date()}
                        onConfirm={date =>
                          this.onChangeTimeCreateExpert(date)
                        }
                        onCancel={() => {
                          this.setState({
                            isOpenTimeCreateExpert: false,
                          });
                        }}
                      />
                    }
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={DefaultStyle._textTitleCard}>출고 예정 수량</Text>
            <TextField
              ref={el => (this.inputValueCreateExpert = el)}
              textRight=""
              styleRight={{ top: 5 }}
              styleProps={SS.inputStyle}
              onChange={e => this.onChangeValueExpert(e)}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions style={DefaultStyle._buttonPopup}>
          <Button
            style={DefaultStyle._buttonElement}
            onPress={this.hideDialogExpert}>
            취소
          </Button>
          <Button
            style={DefaultStyle._buttonElement}
            onPress={() => {
              this.createExpert();
            }}>
            확인
          </Button>
        </Dialog.Actions>

    </Dialog>
        {/** END:출고요청 팝업 **/}

        {/** 입고요청 팝업 **/}
      <Dialog
          style={[DefaultStyle.popup, SS.popup]}
          visible={this.state.visibleImport}
          onDismiss={this.hideDialogImport}>
          <Dialog.Title style={[DefaultStyle._titleDialog, SS.popupHeader]}>
            입고요청
          </Dialog.Title>
          <Dialog.Content>
            <View style={SS.bodyPopup}>
              <Text style={DefaultStyle._textTitleCard}>입고 예정일</Text>

              <View
                style={[DefaultStyle._listElement, DefaultStyle._optionList]}>
                <View
                  style={[
                    S.optionSelect,
                    S.optionSelectLeft,
                    {
                      height: 40,
                      marginBottom: 45,
                      marginTop: 15,
                      width: '100%',
                    },
                  ]}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => this.showTimeCreateImport()}
                      style={DefaultStyle._btnDate}>
                      <Text style={DefaultStyle._textDate}>
                        {dateStr(timeCreateImport)}
                      </Text>
                      {isOpenTimeCreateImport &&
                      <DateTimePickerModal
                        mode="date"
                        isVisible={isOpenTimeCreateImport}
                        date={endDate ? endDate : new Date()}
                        onConfirm={date =>
                          this.onChangeTimeCreateImport(date)
                        }
                        onCancel={() => {
                          this.setState({
                            isOpenTimeCreateImport: false,
                          });
                        }}
                      />
                      }
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <Text style={DefaultStyle._textTitleCard}>입고 예정 수량</Text>
              <TextField
                ref={el => (this.inputValueCreateImport = el)}
                textRight=""
                styleRight={{ top: 5 }}
                styleProps={SS.inputStyle}
                onChange={e => this.onChangeValueImport(e)}
              />
            </View>
          </Dialog.Content>

          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={this.hideDialogImport}>
              취소
            </Button>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => {
                this.createImport();
              }}>
              확인
            </Button>
          </Dialog.Actions>

        </Dialog>
        {/** END:입고요청 팝업 **/}
        <Dialog
      style={DefaultStyle.popup}
      visible={this.state.confirm}
      onDismiss={this.hideConfirm}>
      <Dialog.Content style={[{justifyContent: 'center', alignItems: 'center'}]}>
        <Image source={illust15}/>
      </Dialog.Content>
      <Dialog.Title
        style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
        {this.state.confirmTitle}
      </Dialog.Title>
      <Dialog.Content>
        <Paragraph style={DefaultStyle.contentDialog}>
          {this.state.confirmTitle}을 완료했습니다.
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions style={DefaultStyle._buttonPopup}>
        <Button
          style={DefaultStyle._buttonElement}
          onPress={() => {
            this.hideConfirm();
            this.setState({ isProgress: true }, () => {
              this.getAllData();
            });
          }}>
          확인
        </Button>
      </Dialog.Actions>
    </Dialog>
    </>
    );
  }
}
