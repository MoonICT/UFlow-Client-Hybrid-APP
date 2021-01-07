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

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Warehouse } from '@Services/apis'


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
    this.state = {
      active: 0,
      checked: true,
      checked2: false,
      activeIndex: 0,
      whrgData: {},
    };
    this.navigation = props.navigation;
    console.log('navigation', props.navigation);

  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    //console.log('//::componentWillUnmount::');
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  _renderProductItem = ({ item }) => {
    return <ProductCard data={{ ...item, img: cardBG }} />;
  };

  render() {
    const { imageStore, workComplete } = this.props;
    const dataTab = [
      {
        title: 'TOP10',
        content: '* 중앙 탭 클릭 부터는 중앙 정렬 (ref. 배달의민족)',
      },
      {
        title: '회원가입',
        content: '회원가입',
      },
      {
        title: '창고조회',
        content: '창고조회',
      },
      {
        title: '창고등록',
        content: '창고등록',
      },
      {
        title: '창고등록5',
        content: '창고등록5',
      },
      {
        title: '창고등록6',
        content: '창고등록6',
      },
    ];

    const displayAreaUnit = (value) => {
      return `${value.toLocaleString()}㎡ (${ConvertUnits.toPyeong(value).toLocaleString()}평)`
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
        {console.log('vanlong', this.state.name)}
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
              {this.state.whrgData.typeCode && this.state.whrgData.typeCode}
            </Text>
            <Text style={S.describeTitle}>
              {`${this.state.whrgData.hasKeep ? "보관창고" : ""}`}
              {`${this.state.whrgData.hasKeep && this.state.whrgData.hasTrust ? ", " : ""}`}
              {`${this.state.whrgData.hasTrust ? "수탁창고" : ""}`}
            </Text>
            <Text style={S.header}>
              {this.state.whrgData.name}
            </Text>
            {/* <View style={S.labels}>
              <Text style={[S.textlabel, S.orange]}>상온</Text>
              <Text style={[S.textlabel, S.azure]}>상온</Text>
              <Text style={[S.textlabel, S.green]}>상온</Text>
              <Text style={[S.textlabel, S.gray]}>상온</Text>
              <Text style={S.textlabel}>12,345평</Text>
            </View> */}
            <View style={S.background}>
              <Image style={S.backgroundImage} source={card} />
              <Image style={S.iconBackground} source={circle} />
            </View>
            <View style={S.info}>
              <Text style={DefaultStyle._textTitleBody}>창고 정보</Text>
              <View style={DefaultStyle.row}>
                <TouchableOpacity
                  style={[
                    S.btnTabBarLeft,
                    this.state.active === 0 ? S.activeBtn : null,
                  ]}
                  onPress={() => this.setState({ active: 0 })}>
                  <Text
                    style={[
                      S.textBtn,
                      this.state.active === 0 ? S.activeText : null,
                    ]}>
                    보관
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    S.btnTabBarRight,
                    this.state.active === 1 ? S.activeBtn : null,
                  ]}
                  onPress={() => this.setState({ active: 1 })}>
                  <Text
                    style={[
                      S.textBtn,
                      this.state.active === 1 ? S.activeText : null,
                    ]}>
                    수탁
                  </Text>
                </TouchableOpacity>
              </View>

              {/***** Keep (보관) *****/}
              {(this.state.whrgData.keeps && this.state.whrgData.keeps.length > 0 ? (
                this.state.whrgData.keeps.map((keep, index) => (
                  <View key={"listKeep" + index} style={DefaultStyle._card}>
                    <View style={DefaultStyle._headerCard}>
                      <View style={S.imageHeader} />
                      {/* <Checkbox
                        checked={this.state.checked}
                        onPress={() =>
                          this.setState({ checked: !this.state.checked })
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
                              {this.state.whrgData.userTypeCode === '1100' ?
                                <View>
                                  <Text style={S.textTable}>
                                    {this.state.whrgData.relativeEntrp ? this.state.whrgData.relativeEntrp.entrpName : ''}
                                  </Text>
                                  <Text style={S.textTable}>
                                  {this.state.whrgData.relativeEntrp ? this.state.whrgData.relativeEntrp.phone.no1 + this.state.whrgData.relativeEntrp.phone.no2 + this.state.whrgData.relativeEntrp.phone.no3 : ''}
                                  </Text>
                                </View>
                                :
                                <TouchableOpacity
                                  style={[S.btnQuote]}
                                  onPress={() => this.checkContract("KEEP", keep)}>
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

              {(this.state.whrgData.trusts && this.state.whrgData.trusts.length > 0 ? (
                this.state.whrgData.trusts.map((trust, index) => (
                  <View key={"listTrusts" + index} style={DefaultStyle._card}>
                    <View style={DefaultStyle._headerCard}>
                      <View style={S.imageHeader} />
                      {/* <Checkbox
                        checked={this.state.checked}
                        onPress={() =>
                          this.setState({ checked: !this.state.checked })
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
                    <Text style={S.textBodyCard} source={{html: this.state.whrgData.description && this.state.whrgData.description.replace(/\n/g, '<br/>')}}>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>위치</Text>
              <Text style={S.titleDescribe}>인천광역시 서구 석남동 650-31</Text>
              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  <TouchableOpacity
                    onPress={() => {
                      this.navigation.navigate('DetailsLocationWH');
                    }}>
                    <ImageBackground source={mapLink} style={S.imageMap} />
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
                        {/* {formatDateV1(this.state.whrgData.cmpltYmd).isValid() ? formatDateV1(this.state.whrgData.cmpltYmd) : '-'} */}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        전용면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${this.state.whrgData.prvtArea ? displayAreaUnit(this.state.whrgData.prvtArea) : '-'}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        대지면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${this.state.whrgData.siteArea ? displayAreaUnit(this.state.whrgData.siteArea) : '-'}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        공용면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${this.state.whrgData.cmnArea ? displayAreaUnit(this.state.whrgData.cmnArea) : '-'}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        건축면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${this.state.whrgData.bldgArea ? displayAreaUnit(this.state.whrgData.bldgArea) : '-'}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>추가옵션</Text>
                      <Text style={S.textTable}>
                        {`${this.state.whrgData.addOptDvCodes && this.state.whrgData.addOptDvCodes.length > 0 ? this.state.whrgData.addOptDvCodes.map(code => code.stdDetailCodeName).join(",") : "-"}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                      연면적
                      </Text>
                      <Text style={S.textTable}>
                        {`${this.state.whrgData.totalArea ? displayAreaUnit(this.state.whrgData.totalArea) : '-'}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                      보험가입
                      </Text>
                      <Text style={S.textTable}>
                        {`${this.state.whrgData.insrDvCodes && this.state.whrgData.insrDvCodes.length > 0 ? this.state.whrgData.insrDvCodes.map(code => code.stdDetailCodeName).join(",") : "-"}`}
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
                <AppGrid data={dataTab} />
              </View>
              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  <View style={S.table}>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        창고면적
                      </Text>
                      <Text style={S.textTable}>1,234평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        사무실면적
                      </Text>
                      <Text style={S.textTable}>234평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        주차장면적
                      </Text>
                      <Text style={S.textTable}>567평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        공욤면적
                      </Text>
                      <Text style={S.textTable}>300평</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>유효고</Text>
                      <Text style={S.textTable}>8.5</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        접안 방식
                      </Text>
                      <Text style={S.textTable}>40FT 컨테이너</Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        도크 수
                      </Text>
                      <Text style={S.textTable}>29</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <View style={S.titleView}>
                <Text style={S.title}>문의 (123)</Text>
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
                  </View>
                  <TouchableOpacity
                    style={S.btnViewAll}
                    onPress={() => this.navigation.navigate('InquiryWH')}>
                    <Text style={S.textViewAll}>전체보기</Text>
                  </TouchableOpacity>
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
                  data={slidesProduct}
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

  async getDataWH() {
    let params = {
      id: 'RG20210105276'
    };
    await Warehouse.getWhrg(params).then((res) => {
      if (res) {
        this.setState({ whrgData: res })
      }
    })
  }
  /** when after render DOM */
  componentDidMount() {
    console.log('::componentDidMount::');
    SplashScreen.hide();
    this.getDataWH()
  }




  /** when update state or props */
  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
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
