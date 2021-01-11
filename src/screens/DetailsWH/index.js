/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { formatDateV1 } from '@Utils/dateFormat';

import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  DataTable,
  Appbar,
  Paragraph,
  Text,
  Button,
  IconButton,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import Dialogs from '@Components/organisms/Dialog';
import Checkbox from '@Components/atoms/Checkbox';
import AppGrid from '@Components/organisms/AppGrid';
import CarouselSnap from '@Components/organisms/CarouselSnap';
import ProductCard from '@Components/organisms/ProductCard';

import ActionCreator from '@Actions';
import card from '@Assets/images/card-img.png';
import circle from '@Assets/images/avatars-circle-icon.png';
import mainBG from '@Assets/images/main-bg.png';
import cardBG from '@Assets/images/card-img.png';
import mapLink from '@Assets/images/mapLink.png';

import WHType1 from "@Assets/images/icon-warehouse-1.png";
import WHType2 from "@Assets/images/icon-warehouse-2.png";
import WHType3 from "@Assets/images/icon-warehouse-3.png";
import WHType4 from "@Assets/images/icon-warehouse-4.png";
import WHType6 from "@Assets/images/icon-warehouse-6.png";

// import {ConvertUnits} from "@Service/utils";

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Warehouse } from '@Services/apis';


const slidesProduct = [
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
  {
    key: 'somethun',
    type: '보관창고',
    title: `과천동 상온 50평`,
    img: mainBG,
    backgroundColor: '#59b2ab',
    price: '12,345평',
    address: '경기도 화천시 부평읍',
    totalPrice: '60,000원/평',
  },
];
class DetailWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    let { id } = props.route.params
    // let { } = props.route.qnaParams
    // console.log('id', id);
    this.state = {
      id: id,
      active: 0,
      checked: true,
      checked2: false,
      activeIndex: 0,
      whrgData: {},
      qnaParams: {},
      qnaList: [],
      pageInfo: {},
      showAll: false,
      floors:1,
      whList: [],
    };
    this.navigation = props.navigation;
  }

  hiddenName = (name) => {
    if (name && name.length > 0) {
      let nameArr = name.split('');
      nameArr = nameArr.map((item, index) => {
        return index > 0 ? '*' : item
      })
      return nameArr.join('')
    }
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  // _renderProductItem = ({ item }) => {
  //   return <ProductCard data={{ ...item, img: cardBG }} />;
  // };

  _renderDialogBox = ({ item }) => {
    return <ProductCard data={{ ...item, img: cardBG }} />;
  };

  _renderProductItem = ({ item }) => {
    const cardItem = [];   
      cardItem.push(
        <View>
          {item?.thumbnail !== null ? (
            <ProductCard navigation={this.navigation} data={item} />
          ) : (
            <ProductCard
              navigation={this.navigation}
              data={{ ...item, img: cardBG }}
            />
          )}
        </View>,
      );

    return cardItem;
  };

  render() {
    const { imageStore, workComplete } = this.props;
    const { active, whrgData, pageInfo ,qnaList, showAll, floors, whList} = this.state;

    const dataTab = [
      {
        title: '지하 1층',
        id: 0,
        content: ''
      },
      {
        title: '지상 2층',
        id: 1,
        content: ''
      },
      {
        title: '지상 3층',
        id: 2,
        content: ''
      },
      {
        title: '지상 4층',
        id: 3,
        content: ''
      },
    ];

    const toSquareMeter = (value) => {
      //return value ?  Math.ceil((Math.trunc(Number(value)*10)/10) * 3.305785) : ''
      return value ? Number(Number(value) * 3.305785).toFixed(0) : ''
    };

    const toPyeong = (value) => {
      //return value ? Math.ceil((Math.trunc(Number(value)*10)/10) / 3.305785) : ''
      return value ? Number(Number(value) / 3.305785).toFixed(0) : ''
    };

    const displayAreaUnit = (value) => {
      return `${value.toLocaleString()}㎡ (${toPyeong(value).toLocaleString()}평)`
    };


    const displayUsblValue = (usblValue, calUnitDvCode) => {
      let resultStr = '-'
      if (usblValue) {
        if (calUnitDvCode.stdDetailCode === 'CU01') {
          resultStr = displayAreaUnit(usblValue)
        } else {
          resultStr = usblValue.toLocaleString() + (calUnitDvCode.stdDetailCodeName ? calUnitDvCode.stdDetailCodeName : '')
        }
      }
      return resultStr;
    }

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title=""
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
          <Appbar.Action
            icon="heart-outline"
            color="black"
            onPress={() => {
              this.handlePicker();
              // this.props.registerAction('44444');
            }}
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={DefaultStyle._cards}>
            <Text
              style={[DefaultStyle._titleWH, { backgroundColor: '#4caf50' }]}>
              {whrgData.typeCode && whrgData.typeCode}
            </Text>
            <Text style={S.describeTitle}>
              {`${whrgData.hasKeep ? "보관창고" : ""}`}
              {`${whrgData.hasKeep && whrgData.hasTrust ? ", " : ""}`}
              {`${whrgData.hasTrust ? "수탁창고" : ""}`}
            </Text>
            <Text style={S.header}>
              {whrgData.name}
            </Text>
            <View style={S.labels}>
              <Text style={[S.textlabel, S.orange]}>상온</Text>
              <Text style={[S.textlabel, S.azure]}>상온</Text>
              <Text style={[S.textlabel, S.green]}>상온</Text>
              <Text style={[S.textlabel, S.gray]}>상온</Text>
              {/* <Text style={S.textlabel}>12,345평</Text> */}
            </View>
            <View style={S.background}>
              <Image style={S.backgroundImage} source={ whrgData.whImages && whrgData.whImages.length > 0 ? {uri:whrgData.whImages[0].url}  : ''} />
              <Image style={S.iconBackground} source={circle} />
            </View>
            <View style={S.info}>
              <Text style={DefaultStyle._textTitleBody}>창고 정보</Text>
              <View style={DefaultStyle.row}>
                <TouchableOpacity
                  style={[
                    S.btnTabBarLeft,
                    active === 0 ? S.activeBtn : null,
                  ]}
                  onPress={() => this.setState({ active: 0 })}>
                  <Text
                    style={[
                      S.textBtn,
                      active === 0 ? S.activeText : null,
                    ]}>
                    보관
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    S.btnTabBarRight,
                    active === 1 ? S.activeBtn : null,
                  ]}
                  onPress={() => this.setState({ active: 1 })}>
                  <Text
                    style={[
                      S.textBtn,
                      active === 1 ? S.activeText : null,
                    ]}>
                    수탁
                  </Text>
                </TouchableOpacity>
              </View>

              {/***** Keep (보관) *****/}
              {active === 0 &&
                (whrgData.keeps && whrgData.keeps.length > 0 ? (
                  whrgData.keeps.map((keep, index) => (
                    <View key={"listKeep" + index} style={DefaultStyle._card}>
                      <View style={DefaultStyle._headerCard}>
                        {keep.typeCode.stdDetailCode === "0001" && <Image style={S.imgWarehouse} source={WHType2} />}
                        {keep.typeCode.stdDetailCode === "0002" && <Image style={S.imgWarehouse} source={WHType3} />}
                        {keep.typeCode.stdDetailCode === "0003" && <Image style={S.imgWarehouse} source={WHType1} />}
                        {keep.typeCode.stdDetailCode === "0004" && <Image style={S.imgWarehouse} source={WHType4} />}
                        {keep.typeCode.stdDetailCode === "9100" && <Image style={S.imgWarehouse} source={WHType6} />}
                        {/* <View style={S.imageHeader} /> */}
                        {/* <Checkbox
                        checked={checked}
                        onPress={() =>
                          this.setState({ checked: !checked })
                        }
                      /> */}
                      </View>
                      <View style={S.bodyCard}>
                        <View style={S.table}>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              보관유형
                          </Text>
                            <Text style={S.textTable}>
                              {keep.typeCode ? keep.typeCode.stdDetailCodeName : "-"}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              정산단위
                          </Text>
                            <Text style={S.textTable}>
                              {keep.calUnitDvCode ? keep.calUnitDvCode.stdDetailCodeName : "-"}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              산정기준
                          </Text>
                            <Text style={S.textTable}>
                              {keep.calStdDvCode ? keep.calStdDvCode.stdDetailCodeName : "-"}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              관리비구분
                          </Text>
                            <Text style={S.textTable}>
                              {keep.mgmtChrgDvCode ? keep.mgmtChrgDvCode.stdDetailCodeName : "-"}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              가용일자
                          </Text>
                            <Text style={S.textTable}>
                              {`${formatDateV1(keep.usblYmdFrom)}~${formatDateV1(keep.usblYmdTo)}`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              가용수치
                          </Text>
                            <Text style={S.textTable}>
                              {displayUsblValue(keep.usblValue, keep.calUnitDvCode)}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              공용면적
                          </Text>
                            <Text style={S.textTable}>
                              {`${keep.cmnArea ? displayAreaUnit(keep.cmnArea) : '-'}`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              보관단가
                          </Text>
                            <Text style={S.textTable}>
                              {`${keep.splyAmount ? keep.splyAmount.toLocaleString() + '원' : '-'}`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>관리단가</Text>
                            <Text style={S.textTable}>
                              {`${keep.mgmtChrg ? keep.mgmtChrg.toLocaleString() + '원' : '-'}`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>비고</Text>
                            <Text style={S.textTable}>
                              {keep.remark}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            {keep.enable ?
                              <View style={S.rowBtn}>
                                {whrgData.userTypeCode === '1100' ?
                                  <View>
                                    <Text>
                                      {whrgData.relativeEntrp ? whrgData.relativeEntrp.entrpName : ''}
                                    </Text>
                                    <Text>
                                      {whrgData.relativeEntrp ? whrgData.relativeEntrp.phone.no1 + whrgData.relativeEntrp.phone.no2 + whrgData.relativeEntrp.phone.no3 : ''}
                                    </Text>
                                  </View>
                                  :
                                  <TouchableOpacity
                                    style={[S.btnQuote]}
                                    onPress={() => this.navigation.navigate('DetailRegisterTenant')}>
                                    <Text style={[S.textBtnQuote]}>
                                      견적 요청하기
                                  </Text>
                                  </TouchableOpacity>
                                }
                              </View>
                              :
                              <Text style={[S.textBtnQuote]}>
                                계약 완료된 정보입니다.
                            </Text>
                            }
                          </View>
                        </View>
                      </View>
                    </View>
                  )))
                  :
                  (
                    <View style={DefaultStyle._card} >
                      <Text style={S.textTable}>등록된 창고정보가 없습니다.</Text>
                    </View>
                  )
                )}

              {/***** Trust (수탁) *****/}

              {active === 1 &&
                (whrgData.trusts && whrgData.trusts.length > 0 ? (
                  whrgData.trusts.map((trust, index) => (
                    <View key={"listTrusts" + index} style={DefaultStyle._card}>
                      <View style={DefaultStyle._headerCard}>
                        {trust.typeCode.stdDetailCode === "0001" && <Image style={S.imgWarehouse} source={WHType2} />}
                        {trust.typeCode.stdDetailCode === "0002" && <Image style={S.imgWarehouse} source={WHType3} />}
                        {trust.typeCode.stdDetailCode === "0003" && <Image style={S.imgWarehouse} source={WHType1} />}
                        {trust.typeCode.stdDetailCode === "0004" && <Image style={S.imgWarehouse} source={WHType4} />}
                        {trust.typeCode.stdDetailCode === "9100" && <Image style={S.imgWarehouse} source={WHType6} />}
                        {/* <View style={S.imageHeader} /> */}
                        {/* <Checkbox
                        checked={checked}
                        onPress={() =>
                          this.setState({ checked: !checked })
                        }
                      /> */}
                      </View>
                      <View style={S.bodyCard}>
                        <View style={S.table}>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              보관유형
                          </Text>
                            <Text style={S.textTable}>
                              {trust.typeCode ? trust.typeCode.stdDetailCodeName : "-"}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              정산단위
                          </Text>
                            <Text style={S.textTable}>
                              {trust.calUnitDvCode ? trust.calUnitDvCode.stdDetailCodeName : "-"}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              산정기준
                          </Text>
                            <Text style={S.textTable}>
                              {trust.calStdDvCode ? trust.calStdDvCode.stdDetailCodeName : "-"}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              관리비구분
                          </Text>
                            <Text style={S.textTable}>
                              {trust.mgmtChrgDvCode ? trust.mgmtChrgDvCode.stdDetailCodeName : "-"}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              가용일자
                          </Text>
                            <Text style={S.textTable}>
                              {`${formatDateV1(trust.usblYmdFrom)}~${formatDateV1(trust.usblYmdTo)}`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              가용수치
                          </Text>
                            <Text style={S.textTable}>
                              {displayUsblValue(trust.usblValue, trust.calUnitDvCode)}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              공용면적
                          </Text>
                            <Text style={S.textTable}>
                              {`${trust.cmnArea ? displayAreaUnit(trust.cmnArea) : '-'}`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              보관단가
                          </Text>
                            <Text style={S.textTable}>
                              {`${trust.splyAmount ? trust.splyAmount.toLocaleString() + '원' : '-'}`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>관리단가</Text>
                            <Text style={S.textTable}>
                              {`${trust.mgmtChrg ? trust.mgmtChrg.toLocaleString() + '원' : '-'}`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>비고</Text>
                            <Text style={S.textTable}>
                              {trust.remark}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            {trust.enable ?
                              <View style={S.rowBtn}>
                                {whrgData.userTypeCode === '1100' ?
                                  <View>
                                    <Text>
                                      {whrgData.relativeEntrp ? whrgData.relativeEntrp.entrpName : ''}
                                    </Text>
                                    <Text>
                                      {whrgData.relativeEntrp ? whrgData.relativeEntrp.phone.no1 + whrgData.relativeEntrp.phone.no2 + whrgData.relativeEntrp.phone.no3 : ''}
                                    </Text>
                                  </View>
                                  :
                                  <TouchableOpacity
                                    style={[S.btnQuote]}
                                    onPress={() => this.navigation.navigate('DetailRegisterTenant')}>
                                    <Text style={[S.textBtnQuote]}>
                                      견적 요청하기
                                  </Text>
                                  </TouchableOpacity>
                                }
                              </View>
                              :
                              <Text style={[S.textBtnQuote]}>
                                계약 완료된 정보입니다.
                            </Text>
                            }
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                )
                  :
                  (
                    <View style={DefaultStyle._card} >
                      <Text style={S.textTable}>등록된 창고정보가 없습니다.</Text>
                    </View>
                  )
                )}
            </View>
          </View>
          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>창고 소개</Text>
              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  <View style={S.viewBody}>
                    <Text style={S.textBodyCard}>
                      {whrgData.description}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>위치</Text>
              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  <TouchableOpacity
                    onPress={() => {
                      this.navigation.navigate('DetailsLocationWH');
                    }}>
                    {/* <View>
                      {whrgData.gps.latitude > 0 && whrgData.gps.longitude > 0 ? (
                        <Text>
                          Kakao Map
                        </Text>
                      ) : (
                          <Text>
                            등록된 좌표가 없습니다.
                          </Text>
                        )}
                    </View> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>추가 정보</Text>
              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  <View style={S.table}>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>준공일자</Text>
                      <Text style={S.textTable}>
                        {`${formatDateV1(whrgData.cmpltYmd)}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        전용면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${whrgData.prvtArea ? whrgData.prvtArea.toLocaleString() : 0}㎡`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        대지면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${whrgData.siteArea ? whrgData.siteArea.toLocaleString() : 0}㎡`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        공용면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${whrgData.cmnArea ? whrgData.cmnArea.toLocaleString() : 0}㎡`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        건축면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${whrgData.bldgArea ? whrgData.bldgArea.toLocaleString() : 0}㎡`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>추가옵션</Text>
                      <Text style={S.textTable}>
                        {`${whrgData.addOptDvCodes ? whrgData.addOptDvCodes.map(code => code.stdDetailCodeName).join(",") : ""}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        연면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${whrgData.totalArea}㎡`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        보험가입
                      </Text>
                      <Text style={S.textTable}>
                        {`${whrgData.insrDvCodes ? whrgData.insrDvCodes.map(code => code.stdDetailCodeName).join(",") : ""}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>층별 상세 정보</Text>
              <View style>
                <AppGrid data={dataTab} valueProps={(e)=> this.setState({floors: e})}/>
              </View>
              {whrgData.floors
                ? whrgData.floors.map((floor, index) => {
                  return (
                      floors === index &&
                      <View key={"floor" + index} style={DefaultStyle._card}>
                      <View style={S.bodyCard}>
                        <View style={S.table}>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              층 수
                            </Text>
                            <Text style={S.textTable}>
                              {floor.flrDvCode ? floor.flrDvCode.stdDetailCodeName : ""}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              층면적
                            </Text>
                            <Text style={S.textTable}>
                              {`${floor.flrArea ? floor.flrArea.toLocaleString() : 0}㎡`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              사무실면적
                            </Text>
                            <Text style={S.textTable}>
                              {`${floor.opcArea ? floor.opcArea.toLocaleString() : 0}㎡`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              주차장면적
                            </Text>
                            <Text style={S.textTable}>
                              {`${floor.parkArea ? floor.parkArea.toLocaleString() : 0}㎡`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>전용면적</Text>
                            <Text style={S.textTable}>
                              {`${floor.prvtArea ? floor.prvtArea.toLocaleString() : 0}㎡`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              공용면적
                            </Text>
                            <Text style={S.textTable}>
                              {`${floor.cmnArea ? floor.cmnArea.toLocaleString() : 0}㎡`}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              층고
                            </Text>
                            <Text style={S.textTable}>
                              {floor.flrHi}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              유효고
                            </Text>
                            <Text style={S.textTable}>
                              {floor.efctvHi}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              접안방식
                            </Text>
                            <Text style={S.textTable}>
                              {floor.aprchMthdDvCode ? floor.aprchMthdDvCode.stdDetailCodeName : ""}
                            </Text>
                          </View>
                          <View style={S.tableRow}>
                            <Text style={[S.textTable, S.textLeftTable]}>
                              도크 수
                            </Text>
                            <Text style={S.textTable}>
                              {floor.dockQty}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                   )
                })
                :
                <Text style={S.textTable}></Text>
              }
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <View style={S.titleView}>
                <Text style={S.title}>문의 ({pageInfo.totalElements ? pageInfo.totalElements : 0})</Text>
                <View style={S.rightTitle}>
                  <TouchableOpacity
                    style={S.btnInquiry}
                    onPress={() => console.log('add')}>
                    <Text style={S.textInquiry}>문의하기</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  {(qnaList && qnaList.length === 0) &&
                    <Text key={'empty'} style={S.titleInquiry}>문의 내역이 없습니다.</Text>
                  }
                  {/* List */}
                  {qnaList && qnaList.map((qnaItem, index) =>
                    <View key={'qnaItem' + index} style={S.inquirys}>
                      <View style={S.leftInquiry}>
                      {console.log('answer', qnaItem?.answer)}
                        {qnaItem.answer ?
                          <Text style={S.titleCompleted}>답변완료</Text>
                          :
                          <Text style={S.titleInquiry}>미답변</Text>
                        }
                        <Text style={S.contentInquiry}>비밀글입니다.</Text>
                        <Text style={S.footerInquiry}>
                        {qnaItem.writer}
                        {console.log('writer', qnaItem.writer)}
                        {this.hiddenName(qnaItem.writer)} | {formatDateV1(qnaItem.date)}
                        </Text>
                      </View>
                      <View style={S.rightInquiry}>
                        {qnaItem.me ? '' : (
                          (qnaItem.secret || true) ?
                            <IconButton
                              style={S.btnIcon}
                              icon="lock"
                              onPress={() => console.log('remove')}
                            />
                            :
                            <Text></Text>
                        )}
                      </View>
                    </View>
                  )}
                  {/* <View style={S.inquirys}>
                    <View style={S.leftInquiry}>
                      <Text style={S.titleInquiry}>미답변</Text>
                      <Text style={S.contentInquiry}>비밀글입니다.</Text>
                      <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
                    </View>
                    <View style={S.rightInquiry}>
                      <IconButton
                        style={S.btnIcon}
                        icon="lock"
                        onPress={() => console.log('remove')}
                      />
                    </View>
                  </View>
                  <View style={S.inquirys}>
                    <View style={S.leftInquiry}>
                      <Text style={[S.titleInquiry, S.titleCompleted]}>
                        답변완료
                      </Text>
                      <Text style={S.contentInquiry}>비밀글입니다.</Text>
                      <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
                    </View>
                    <View style={S.rightInquiry}>
                      <IconButton
                        style={S.btnIcon}
                        icon="lock"
                        onPress={() => console.log('remove')}
                      />
                    </View>
                  </View>
                  <View style={S.inquirys}>
                    <View style={S.leftInquiry}>
                      <Text style={S.titleInquiry}>미답변</Text>
                      <Text style={S.contentInquiry}>비밀글입니다.</Text>
                      <Text style={S.footerInquiry}> hah*** | 2020.11.22</Text>
                    </View>
                    <View style={S.rightInquiry}>
                      <IconButton
                        style={S.btnIcon}
                        icon="lock"
                        onPress={() => console.log('remove')}
                      />
                    </View>
                  </View> */}
                  
                  {
                    (!showAll && pageInfo.totalElements > 4) &&
                    <TouchableOpacity
                      style={S.btnViewAll}
                      onPress={() => {this.handleRequestQnaList(100), this.setState({showAll: true})}}>
                      <Text style={S.textViewAll}>전체보기</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>유사한 창고</Text>
              <View style={S.mainProductList}>
                <CarouselSnap
                  layout={'default'}
                  data={whList}
                  sliderWidth={328}
                  itemWidth={160}
                  renderItem={this._renderProductItem}
                  onSnapToItem={index => this.setState({ activeIndex: index })}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[DefaultStyle.btnSubmit, DefaultStyle.activeBtnSubmit]}
              onPress={() => {
                // this.showDialog();
              }}>
              <Text
                onPress={() => this.navigation.navigate('DetailRegisterTenant')}
                style={[
                  DefaultStyle.textSubmit,
                  DefaultStyle.textActiveSubmit,
                ]}>
                견적 요청하기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView >
    );
  }


  /** when after render DOM */
  async componentDidMount() {
    SplashScreen.hide();
    this.getDataWH()
    this.handleRequestQnaList(4)
    this.hiddenName()
  }

  async getDataWH() {
    const { id } = this.state;

    let params = {
      id: id
    };
    const warehouse = await Warehouse.getWhrg(params);

    this.setState({whrgData: warehouse.data});
      
        // 유사창고 파라미터 조건
        let typeCodeNames = []
        let gdsKeepTypeCodeNames = []
        if (warehouse.data.keeps && warehouse.data.keeps.length > 0) {
          typeCodeNames.push('KEEP')
          warehouse.data.keeps.map(item => {
            if (gdsKeepTypeCodeNames.indexOf(item.typeCode.stdDetailCode.toString()) < 0) {
              gdsKeepTypeCodeNames.push(item.typeCode.stdDetailCode.toString())
            }
          })
        }
        if (warehouse.data.trusts && warehouse.data.trusts.length > 0) {
          typeCodeNames.push('TRUST')
          warehouse.data.trusts.map(item => {
            console.debug(gdsKeepTypeCodeNames, item.typeCode.stdDetailCode)
            if (gdsKeepTypeCodeNames.indexOf(item.typeCode.stdDetailCode.toString()) < 0) {
              gdsKeepTypeCodeNames.push(item.typeCode.stdDetailCode.toString())
            }
          })
        }

        await Warehouse.listRecommend(
        {
          typeCodes: typeCodeNames.join(','),
          gdsKeepTypeCodes: gdsKeepTypeCodeNames.join(','),
        }
       ).then(res => {
          let list =
          res.data?._embedded && res.data?._embedded?.warehouses
              ? res.data?._embedded?.warehouses
              : [];

          this.setState({ whList: list });
        })
  }

  handleRequestQnaList = (q_size) => {
    const { id } = this.state;
    let qnaParams = {
      id: id,
      size: q_size,
      page: 0,
      requiresToken: false
    }
    Warehouse.pageWhrgQnA(qnaParams).then(res => {
      if (res && res._embedded && res._embedded) {
        let newFQAList = res._embedded.questions.map(item => {
          return {
            status: item.complete,
            title: item.content,
            name: item.writer,
            date: formatDateV1(item.date),
            lock: item.secret,
          }
        })

        this.setState({ qnaList: newFQAList })
        this.setState({ pageInfo: res.page })
      }
    })
  }
  
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailWH);
