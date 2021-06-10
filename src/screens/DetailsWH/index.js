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
  Image,
  Dimensions,
} from 'react-native';
import { Image as Image2 } from 'react-native-elements';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Appbar, Text, IconButton } from 'react-native-paper';
import ImageView from 'react-native-image-view';
import { Account } from '@Services/apis';
// Local Imports
import { Warehouse, WarehouseTenant, MyPage } from '@Services/apis';
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import { formatDateV1 } from '@Utils/dateFormat';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { StringUtils, ContractUtils } from '@Services/utils';
import ProductCard from '@Components/organisms/ProductCard';
import { TOKEN } from '@Constant';
import WebviewMap from '@Components/organisms/WebviewMap';
import ActionCreator from '@Actions';
import { styles as S } from './style';
import Progress from '@Components/organisms/Progress';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang
// Image
import panoIcon from '@Assets/images/iconback.png';
import cardBG from '@Assets/images/card-img.jpeg';
import WHType1 from '@Assets/images/icon-warehouse-1.png';
import WHType2 from '@Assets/images/icon-warehouse-2.png';
import WHType3 from '@Assets/images/icon-warehouse-3.png';
import WHType4 from '@Assets/images/icon-warehouse-4.png';
import WHType6 from '@Assets/images/icon-warehouse-6.png';
import WHPlaceholder from '@Assets/images/WHPlaceholder.jpeg';
import { toSquareMeter, toPyeong } from '@Services/utils/unit';
import { PanoramaView } from '@lightbase/react-native-panorama-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DetailWH extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.myRef = React.createRef();
    let { id } = props.route.params;
    this.state = {
      toggleImage: false, // 창고이미지 || 파노라마이미지 토클.
      isImageViewVisible: false, // 창고이미지 자세히 보기.
      id: id,
      userId: -1,
      active: 0,
      checked: true,
      checked2: false,
      activeIndex: 0,
      whrgData: {},
      qnaParams: {},
      qnaList: [],
      pageInfo: {},
      isLogin: false,
      showAll: false,
      floors: '',
      whList: [],
      favorite: false,
      rentUserNo: '',
      dataTab: [],
      checkTrust: false,
      loading: false,
    };
    this.navigation = props.navigation;
  }

  hiddenName = name => {
    if (name && name.length > 0) {
      let nameArr = name.split('');
      nameArr = nameArr.map((item, index) => {
        return index > 0 ? '*' : item;
      });
      return nameArr.join('');
    }
  };

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps?.route?.params?.id !== prevState.id) {
      return { id: nextProps?.route?.params?.id };
    }
    return null;
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.route?.params?.id !== this.props?.route?.params?.id) {
      this.setState({ id: this.props?.route?.params?.id });
      this.myRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      this.getDataWH();
    }
  }

  /** when after render DOM */
  componentDidMount () {
    // Progress
    this.props.setProgress({ is: true });

    const { route } = this.props;
    this.getDataWH();
    this.handleRequestQnaList(4);
    this.hiddenName();
    AsyncStorage.getItem(TOKEN)
      .then(v => {
        this.setState({ isLogin: v !== '' && v !== null });
        if (v) {
          Account.me()
            .then(res => {
              // console.log('User info :;;;;; ', res);
              this.setState({
                userId: res.id,
              });
            })
            .catch(error => {
              console.log('error', error);
            });
        }
      })
      .catch(error => {

        this.props.showPopup({ title: 'UFLOW', content: 'DetailWH componentDidMount error:' + error, type: 'confirm' });

      });
    MyPage.getDetailCodes('WHRG0010')
      .then(res => {
        if (res.data && res.data._embedded && res.data._embedded.detailCodes) {
          // console.log('detailCodes', res.data._embedded.detailCodes);
          let dataCode = res.data._embedded.detailCodes;
          let dataCover =
            dataCode &&
            dataCode.map((item, index) => {
              return {
                title: item.stdDetailCodeName,
                value: item.stdDetailCod,
              };
            });
          this.setState({
            dataCover: dataCover,
            floors: dataCover[0].title,
          });
        }

        // Progress
        setTimeout(() => {
          this.props.setProgress({ is: false });
        }, 300);
      })
      .catch(error => {

        this.props.showPopup({ title: 'UFLOW', content: error, type: 'confirm' });

        this.props.setProgress({ is: false });
      });
  }

  /**
   * 관심창고 토글
   * */
  toggleFavoriteWH = () => {
    const { isLogin, id } = this.state;

    if (isLogin) {
      Warehouse.toggleFav(id)
        .then(res => {
          this.setState({
            favorite: res.data.favorite,
          });
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    } else {
      this.props.showPopup({
        title: 'UFLOW',
        content: getMsg(this.props.lang, 'ML0099', '로그인 후 이용해주세요.'),
        type: 'confirm'
      });
    }
  };

  /**
   * 창고 견적요청 가능 유/무 확인.
   * @Params type: [String] KEEP|TRUST.
   * @Params typeInfo: [Object] type info.
   * */
  checkContract = async (type, typeInfo) => {
    const { isLogin, id } = this.state;
    if (!type || !typeInfo) {
      return false;
    }
    if (!isLogin) {
      // TODO Change to dialog UI
      alert(getMsg(this.props.lang, 'ML0099', '로그인 후 이용해주세요.'));
      return false;
    }
    await WarehouseTenant.possibleContract({
      contractType: type,
      warehouseRegNo: typeInfo.id.warehouseRegNo,
      seq: typeInfo.id.seq,
    })
      .then(res => {
        // 견적 등록 가능.
        // console.log('possibleContract', res);
        if (res.data.status === 'PSB_CNT') {
          // console.log('res.data.status', res.data.status);
          this.handleRouteRequestQuotation(typeInfo, type);
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            // TODO Change to dialog UI
            alert(getMsg(this.props.lang, 'ML0130', '로그인 세션이 만료되었습니다.\n다시 로그인해주세요.'));
          }
        }
        switch (error.response.data.status) {
          case 'NONE': // 등록된 사업자가 없음, 최초 임차인 등록
            // TODO Change to dialog UI
            alert(getMsg(this.props.lang, 'ML0131', '사업자정보 등록 후 견적 요청이 가능합니다.'));
            this.navigation.navigate('DetailRegisterTenant', {
              typeInfo: typeInfo,
              typeWH: type,
              warehouseRegNo: typeInfo.id.warehouseRegNo,
              warehSeq: typeInfo.id.seq,
              rentUserNo: '',
              status: 'RQ00',
              type: 'TENANT',
            });
            break;
          case 'IMP_CNT': // 견적등록 불가능, 창고가 공실상태가 아님.
            // TODO Change to dialog UI
            alert(getMsg(this.props.lang, 'ML0132', '견적요청이 불가능합니다.\n현재 공실 상태가 아닙니다.'));
            break;
        }
      });
  };

  // handleRouteRequestQuotation = (idWarehouse, type, seq) => {
  handleRouteRequestQuotation = (typeInfo, type) => {
    // typeInfo.id.warehouseRegNo,
    //             type,
    //             typeInfo.id.seq,
    // this.navigation.navigate('ResponseQuotation', {
    //   typeWH: type,
    //   warehouseRegNo: idWarehouse,
    //   warehSeq: seq,
    //   rentUserNo: '',
    //   status: 'RQ00',
    //   type: 'TENANT',
    // });
    // console.log(typeInfo, 'typeInfo');
    // console.log(type, 'type');
    this.navigation.navigate('RequestQuotation', {
      data: {
        whrgMgmtTrust: type === 'TRUST' ? typeInfo : null,
        whrgMgmtKeep: type === 'KEEP' ? typeInfo : null,
      },
      typeWH: type,
      warehouseRegNo: typeInfo.id.warehouseRegNo,
      warehSeq: typeInfo.id.seq,
      rentUserNo: 0,
      status: 'RQ00',
      type: 'TENANT',
    });
  };

  // _renderDialogBox = ({ item }) => {
  //   return <ProductCard data={{ ...item, img: cardBG }} />;
  // };

  _renderProductItem = ({ item }) => {
    const cardItem = [];
    cardItem.push(
      <View
        onPress={() => this.navigation.replace('DetailsWH', { id: item.id })}>
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

  /**
   * 이름 비공개 처리
   * */
  hiddenName = name => {
    if (name && name.length > 0) {
      let nameArr = name.split('');
      nameArr = nameArr.map((item, index) => {
        return index > 0 ? '*' : item;
      });
      return nameArr.join('');
    }
  };

  render () {
    const {
      active,
      whrgData,
      pageInfo,
      qnaList,
      showAll,
      floors,
      whList,
      favorite,
      activeIndex,
      id,
      dataTab,
      userId,
      checkTrust,
      pnImagesUrl,
      loading
    } = this.state;
    // console.log('whrgData', whrgData)

    const toSquareMeter = value => {
      //return value ?  Math.ceil((Math.trunc(Number(value)*10)/10) * 3.305785) : ''
      return value ? Number(Number(value) * 3.305785).toFixed(0) : '';
    };

    const displayUsblValue = (usblValue, calUnitDvCode) => {
      let resultStr = '-';
      if (usblValue) {
        if (calUnitDvCode && calUnitDvCode?.stdDetailCode === 'CU01') {
          resultStr = StringUtils.displayAreaUnit(usblValue);
        } else {
          resultStr =
            StringUtils.numberComma(usblValue) +
            (calUnitDvCode && calUnitDvCode?.stdDetailCodeName
              ? calUnitDvCode?.stdDetailCodeName
              : '');
        }
      }
      return resultStr;
    };

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          {/* <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 상세"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          /> */}

          <HistoryBackActionBar
            title={getMsg(this.props.lang, 'ML0133', '창고 상세')}
            navigation={this.navigation}
            rightComponent={
              favorite ? (
                <Appbar.Action
                  icon="heart"
                  color="#f2453d"
                  onPress={() => {
                    this.toggleFavoriteWH();
                  }}
                />
              ) : (
                <Appbar.Action
                  icon="heart-outline"
                  color="black"
                  onPress={() => {
                    this.toggleFavoriteWH();
                  }}
                />
              )
            }
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray} ref={this.myRef}>
          <View style={DefaultStyle._cards}>
            <Text
              style={[DefaultStyle._titleWH, { backgroundColor: '#4caf50' }]}>
              {whrgData.typeCode && whrgData.typeCode}
            </Text>
            <View style={S.titleView}>
              <Text style={[S.describeTitle, { textAlign: 'left' }]}>
                {`${whrgData.hasKeep ? getMsg(this.props.lang, 'ML0134', '임대창고') : ''}`}
                {`${whrgData.hasKeep && whrgData.hasTrust ? ', ' : ''}`}
                {`${whrgData.hasTrust ? getMsg(this.props.lang, 'ML0135', '수탁창고') : ''}`}
              </Text>

              <Text style={[S.describeTitle, S.rightTitle, { textAlign: 'right' }]}>
                {
                  ((whrgData.userTypeCode !== "8000") && (whrgData.userTypeCode === "1100" || whrgData.relativeEntrp === null))
                    ? (whrgData.userTypeCode === "1100")
                    ? whrgData.userName + " " + whrgData.mobile.no1 + "-" + whrgData.mobile.no2 + "-" + whrgData.mobile.no3
                    : whrgData.mobile.no1 + "-" + whrgData.mobile.no2 + "-" + whrgData.mobile.no3
                    : ""
                }

              </Text>

            </View>
            <Text style={S.header}>{whrgData.name} </Text>
            <View style={S.labels}>
              {whrgData.keeps &&
              whrgData.keeps.length > 0 &&
              whrgData.keeps.map((keep, index) => (
                <View key={index}>
                  {keep.typeCode &&
                  keep.typeCode?.stdDetailCodeName && (
                    <Text style={[S.textlabel, S.gray]}>{keep.typeCode?.stdDetailCodeName}</Text>
                  )}
                  {/*{keep.typeCode &&*/}
                  {/*keep.typeCode?.stdDetailCodeName === '상온' && (*/}
                  {/*  <Text style={[S.textlabel, S.orange]}>상온</Text>*/}
                  {/*)}*/}
                  {/*{keep.typeCode &&*/}
                  {/*keep.typeCode?.stdDetailCodeName === '냉동' && (*/}
                  {/*  <Text style={[S.textlabel, S.azure]}>냉동</Text>*/}
                  {/*)}*/}
                  {/*{keep.typeCode &&*/}
                  {/*keep.typeCode?.stdDetailCodeName === '냉장' && (*/}
                  {/*  <Text style={[S.textlabel, S.green]}>냉장</Text>*/}
                  {/*)}*/}
                  {/*{keep.typeCode &&*/}
                  {/*keep.typeCode?.stdDetailCodeName === '야적' && (*/}
                  {/*  <Text style={[S.textlabel, S.gray]}>야적</Text>*/}
                  {/*)}*/}
                  {/*{keep.typeCode &&*/}
                  {/*keep.typeCode?.stdDetailCodeName === '위험물' && (*/}
                  {/*  <Text style={[S.textlabel, S.gray]}>위험물</Text>*/}
                  {/*)}*/}
                  {/*{keep.typeCode &&*/}
                  {/*keep.typeCode?.stdDetailCodeName === '기타' && (*/}
                  {/*  <Text style={[S.textlabel, S.gray]}>기타</Text>*/}
                  {/*)}*/}
                </View>
              ))}

              {whrgData.trusts &&
              whrgData.trusts.length > 0 &&
              whrgData.trusts.map((trust, index) => (
                <View key={index}>
                  {trust.typeCode &&
                  trust.typeCode?.stdDetailCodeName && (
                    <Text style={[S.textlabel, S.orange]}>{trust.typeCode?.stdDetailCodeName}</Text>
                  )}
                  {/*{trust.typeCode &&*/}
                  {/*trust.typeCode?.stdDetailCodeName === '상온' && (*/}
                  {/*  <Text style={[S.textlabel, S.orange]}>상온</Text>*/}
                  {/*)}*/}
                  {/*{trust.typeCode &&*/}
                  {/*trust.typeCode?.stdDetailCodeName === '냉동' && (*/}
                  {/*  <Text style={[S.textlabel, S.orange]}>냉동</Text>*/}
                  {/*)}*/}
                  {/*{trust.typeCode &&*/}
                  {/*trust.typeCode?.stdDetailCodeName === '냉장' && (*/}
                  {/*  <Text style={[S.textlabel, S.orange]}>냉장</Text>*/}
                  {/*)}*/}
                  {/*{trust.typeCode &&*/}
                  {/*trust.typeCode?.stdDetailCodeName === '야적' && (*/}
                  {/*  <Text style={[S.textlabel, S.orange]}>야적</Text>*/}
                  {/*)}*/}
                  {/*{trust.typeCode &&*/}
                  {/*trust.typeCode?.stdDetailCodeName === '위험물' && (*/}
                  {/*  <Text style={[S.textlabel, S.orange]}>위험물</Text>*/}
                  {/*)}*/}
                  {/*{trust.typeCode &&*/}
                  {/*trust.typeCode?.stdDetailCodeName === '기타' && (*/}
                  {/*  <Text style={[S.textlabel, S.orange]}>기타</Text>*/}
                  {/*)}*/}
                </View>
              ))}

              {/* <Text style={S.textlabel}>12,345평</Text> */}
            </View>

            {/** 창고 이미지
             *  이미지가 없는경우 기본이미지로 처리.
             */}
            {whrgData.whImages && whrgData.whImages.length == 0 && (
              <View style={S.background}>
                <TouchableOpacity onPress={() => this.setState({ isImageViewVisible: true })}>
                  <Image
                    style={S.backgroundImage}
                    source={WHPlaceholder}
                  />
                </TouchableOpacity>
              </View>
            )}
            {whrgData.whImages && whrgData.whImages.length > 0 && (
              <>

                <View style={S.background}>

                  {this.state.toggleImage ?
                    <TouchableOpacity onPress={() =>
                      this.navigation.navigate('ViewPanoramaImage', {
                        image: whrgData.pnImages && whrgData.pnImages.length > 0 ? whrgData.pnImages[0].url : ''
                      })}>
                      {/**    <PanoramaView
                       style={S.backgroundImage}
                       dimensions={{ height: 230, width:windowWidth }}
                       inputType="mono"
                       imageUrl={whrgData.pnImages[0].url}
                       />*/}
                      {/*<Loading loading={loading} />*/}
                      <Image2
                        style={[S.backgroundImage,]}
                        source={{ uri: whrgData.pnImages && whrgData.pnImages.length > 0 ? whrgData.pnImages[0].url : '' }}
                        // source={pnImagesUrl ? { uri: pnImagesUrl } : ''}
                        PlaceholderContent={<View style={[S.bgrRegister, {
                          position: 'absolute',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: 238,
                        }]}>
                          <View style={{ height: 40 }}><Progress /></View>
                        </View>}
                      />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.setState({ isImageViewVisible: true })}>
                      <Image
                        style={S.backgroundImage}
                        source={
                          whrgData.whImages && whrgData.whImages.length > 0
                            ? { uri: whrgData.whImages[0].url }
                            : ''
                        }
                      />
                    </TouchableOpacity>}
                  {/* 이미지 타입 토글 */}
                  {whrgData.pnImages && whrgData.pnImages.length > 0 &&
                  <TouchableOpacity style={S.btnImageToggle}
                                    onPress={() => this.setState({ toggleImage: !this.state.toggleImage })}>
                    {this.state.toggleImage ?
                      <IconButton size={20} icon="image-multiple" />
                      :
                      <Image style={{ width: 25, height: 25, }} source={panoIcon} />}
                  </TouchableOpacity>}
                </View>
                {/* 이미지 슬라이드 팝업 */}
                <ImageView
                  images={whrgData.whImages.map(item => {
                    return {
                      source: {
                        uri: item.url,
                      },
                    };
                  })}
                  imageIndex={0}
                  isVisible={this.state.isImageViewVisible}
                  onClose={() => this.setState({ isImageViewVisible: false })}
                  renderFooter={currentImage => (
                    <View>
                      <Text>My footer</Text>
                    </View>
                  )}
                />
              </>
            )}


            {/** 창고 정보 */}
            <View style={S.info}>
              <Text style={DefaultStyle._textTitleBody}>
                {getMsg(this.props.lang, 'ML0136', '창고 정보')}
              </Text>
              <View style={DefaultStyle.row}>
                {
                  checkTrust === true ?
                    <Fragment>

                      <TouchableOpacity
                        style={[S.btnTabBarLeft, active === 1 ? S.activeBtn : null]}
                        onPress={() => this.setState({ active: 1 })}>
                        <Text style={[S.textBtn, active === 1 ? S.activeText : null]}>
                          {getMsg(this.props.lang, 'ML0137', '수탁')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[S.btnTabBarRight, active === 0 ? S.activeBtn : null]}
                        onPress={() => this.setState({ active: 0 })}>
                        <Text style={[S.textBtn, active === 0 ? S.activeText : null]}>
                          {getMsg(this.props.lang, 'ML0138', '임대')}
                        </Text>
                      </TouchableOpacity>
                    </Fragment> :
                    <Fragment>
                      <TouchableOpacity
                        style={[S.btnTabBarLeft, active === 0 ? S.activeBtn : null]}
                        onPress={() => this.setState({ active: 0 })}>
                        <Text style={[S.textBtn, active === 0 ? S.activeText : null]}>
                          {getMsg(this.props.lang, 'ML0138', '임대')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[S.btnTabBarRight, active === 1 ? S.activeBtn : null]}
                        onPress={() => this.setState({ active: 1 })}>
                        <Text style={[S.textBtn, active === 1 ? S.activeText : null]}>
                          {getMsg(this.props.lang, 'ML0137', '수탁')}
                        </Text>
                      </TouchableOpacity>
                    </Fragment>
                }

              </View>

              {/***** Keep (임대) *****/}
              {active === 0 &&
              (whrgData.keeps && whrgData.keeps.length > 0 ? (
                whrgData.keeps.map((keep, index) => (
                  <View key={'listKeep' + index} style={DefaultStyle._card}>
                    <View style={DefaultStyle._headerCard}>
                      {keep.typeCode &&
                      keep.typeCode?.stdDetailCode === '0001' && (
                        <Image style={S.imgWarehouse} source={WHType2} />
                      )}
                      {keep.typeCode &&
                      keep.typeCode?.stdDetailCode === '0002' && (
                        <Image style={S.imgWarehouse} source={WHType3} />
                      )}
                      {keep.typeCode &&
                      keep.typeCode?.stdDetailCode === '0003' && (
                        <Image style={S.imgWarehouse} source={WHType1} />
                      )}
                      {keep.typeCode &&
                      keep.typeCode?.stdDetailCode === '0004' && (
                        <Image style={S.imgWarehouse} source={WHType4} />
                      )}
                      {keep.typeCode &&
                      keep.typeCode?.stdDetailCode === '9100' && (
                        <Image style={S.imgWarehouse} source={WHType6} />
                      )}
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
                            {getMsg(this.props.lang, 'ML0129', '창고유형')}
                          </Text>
                          <Text style={S.textTable}>
                            {keep.typeCode
                              ? keep.typeCode?.stdDetailCodeName
                              : '-'}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0139', '정산단위')}
                          </Text>
                          <Text style={S.textTable}>
                            {keep.calUnitDvCode
                              ? keep.calUnitDvCode?.stdDetailCodeName
                              : '-'}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0140', '산정기준')}
                          </Text>
                          <Text style={S.textTable}>
                            {keep.calStdDvCode
                              ? keep.calStdDvCode?.stdDetailCodeName
                              : '-'}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0141', '관리비구분')}
                          </Text>
                          <Text style={S.textTable}>
                            {keep.mgmtChrgDvCode
                              ? keep.mgmtChrgDvCode?.stdDetailCodeName
                              : '-'}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0142', '가용일자')}
                          </Text>
                          <Text style={S.textTable}>
                            {`${formatDateV1(
                              keep.usblYmdFrom,
                            )}~${formatDateV1(keep.usblYmdTo)}`}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0143', '가용수치')}
                          </Text>
                          <Text style={S.textTable}>
                            {keep.usblValue ? StringUtils.displayAreaUnit(keep.usblValue) : '-'}
                          </Text>
                        </View>
                        {/* <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            공용면적 fffffffff
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              keep.cmnArea
                                ? StringUtils.displayAreaUnit(keep.cmnArea)
                                : '-'
                              }`}
                          </Text>
                        </View> */}
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0144', '임대단가')}
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              keep.splyAmount
                                ? StringUtils.money(keep.splyAmount)
                                : '-'
                            }`}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0145', '관리단가')}
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              keep.mgmtChrg
                                ? StringUtils.money(keep.mgmtChrg)
                                : '-'
                            }`}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0146', '비고')}
                          </Text>
                          <Text style={S.textTable}>{keep.remark ? keep.remark : '-'}</Text>
                        </View>
                        <View style={S.tableRow}>
                          {/* 견적 요청 가능 상태인지 체크 */}
                          {keep.enable ? (
                            <View style={S.rowBtn}>
                              {whrgData.warehMgmtType === '0001' ? (
                                /*오픈형인 경우*/
                                <View>
                                  <Text>
                                    {whrgData.relativeEntrp
                                      ? whrgData.relativeEntrp.entrpName
                                      : ''}
                                  </Text>
                                  <Text>
                                    {whrgData.relativeEntrp &&
                                    whrgData.relativeEntrp.phone
                                      ? whrgData.relativeEntrp.phone.no1 +
                                      whrgData.relativeEntrp.phone.no2 +
                                      whrgData.relativeEntrp.phone.no3
                                      : ''}
                                  </Text>
                                </View>
                              ) : (
                                <View>
                                  {/**/}
                                  {userId != whrgData.ownerUserNo ?
                                    <TouchableOpacity
                                      style={[S.btnQuote, { minWidth: 100, }]}
                                      onPress={() =>
                                        this.checkContract('KEEP', keep)
                                      }>
                                      <Text style={[S.textBtnQuote]}>
                                        {getMsg(this.props.lang, 'ML0152', '견적 요청하기')}
                                      </Text>
                                    </TouchableOpacity>
                                    :
                                    <Text>
                                      {getMsg(this.props.lang, 'ML0153', '내가 등록한 창고입니다.(견적 요청 불가)')}
                                    </Text>
                                  }

                                </View>
                              )}
                            </View>
                          ) : (
                            <Text
                              style={[
                                S.textBtnQuote,
                                { color: '#ff0000', padding: 16 },
                              ]}>
                              {getMsg(this.props.lang, 'ML0147', '계약 완료된 정보입니다.')}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View style={DefaultStyle._card}>
                  <Text style={S.textTable}>
                    {getMsg(this.props.lang, 'ML0148', '등록된 창고정보가 없습니다.')}
                  </Text>
                </View>
              ))}

              {/***** Trust (수탁) *****/}

              {active === 1 &&
              (whrgData.trusts && whrgData.trusts.length > 0 ? (
                whrgData.trusts.map((trust, index) => (
                  <View key={'listTrusts' + index} style={DefaultStyle._card}>
                    <View style={DefaultStyle._headerCard}>
                      {trust.typeCode?.stdDetailCode === '0001' && (
                        <Image style={S.imgWarehouse} source={WHType2} />
                      )}
                      {trust.typeCode?.stdDetailCode === '0002' && (
                        <Image style={S.imgWarehouse} source={WHType3} />
                      )}
                      {trust.typeCode?.stdDetailCode === '0003' && (
                        <Image style={S.imgWarehouse} source={WHType1} />
                      )}
                      {trust.typeCode?.stdDetailCode === '0004' && (
                        <Image style={S.imgWarehouse} source={WHType4} />
                      )}
                      {trust.typeCode?.stdDetailCode === '9100' && (
                        <Image style={S.imgWarehouse} source={WHType6} />
                      )}
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
                            {getMsg(this.props.lang, 'ML0129', '창고유형')}
                          </Text>
                          <Text style={S.textTable}>
                            {trust.typeCode
                              ? trust.typeCode?.stdDetailCodeName
                              : '-'}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0139', '정산단위')}
                          </Text>
                          <Text style={S.textTable}>
                            {trust.calUnitDvCode
                              ? trust.calUnitDvCode?.stdDetailCodeName
                              : '-'}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0140', '산정기준')}
                          </Text>
                          <Text style={S.textTable}>
                            {trust.calStdDvCode
                              ? trust.calStdDvCode?.stdDetailCodeName
                              : '-'}
                          </Text>
                        </View>
                        {/*<View style={S.tableRow}>*/}
                        {/*  <Text style={[S.textTable, S.textLeftTable]}>*/}
                        {/*    관리비구분*/}
                        {/*  </Text>*/}
                        {/*  <Text style={S.textTable}>*/}
                        {/*    {trust.mgmtChrgDvCode*/}
                        {/*      ? trust.mgmtChrgDvCode?.stdDetailCodeName*/}
                        {/*      : '-'}*/}
                        {/*  </Text>*/}
                        {/*</View>*/}
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0142', '가용일자')}
                          </Text>
                          <Text style={S.textTable}>
                            {`${formatDateV1(
                              trust.usblYmdFrom,
                            )}~${formatDateV1(trust.usblYmdTo)}`}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0143', '가용수치')}
                          </Text>
                          <Text style={S.textTable}>
                            {displayUsblValue(
                              trust.usblValue,
                              trust.calUnitDvCode,
                            )}
                          </Text>
                        </View>
                        {/* <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            공용면적
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              trust.cmnArea
                                ? StringUtils.displayAreaUnit(trust.cmnArea)
                                : '-'
                              }`}
                          </Text>
                        </View> */}
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0149', '보관단가')}
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              trust.splyAmount
                                ? StringUtils.money(trust.splyAmount)
                                : '-'
                            }`}
                          </Text>
                        </View>

                        {/** 정보 수정 시작 **/}
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0150', '입고단가')}
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              trust.whinChrg
                                ? StringUtils.money(trust.whinChrg)
                                : '-'
                            }`}
                          </Text>
                        </View>
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0151', '출고단가')}
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              trust.whoutChrg
                                ? StringUtils.money(trust.whoutChrg)
                                : '-'
                            }`}
                          </Text>
                        </View>
                        {/* <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            인건단가
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              trust.psnChrg
                                ? StringUtils.money(trust.psnChrg)
                                : '-'
                              }`}
                          </Text>
                        </View> */}
                        {/* <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            가공단가
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              trust.mnfctChrg
                                ? StringUtils.money(trust.mnfctChrg)
                                : '-'
                              }`}
                          </Text>
                        </View> */}
                        {/* <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            택배단가
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              trust.dlvyChrg
                                ? StringUtils.money(trust.dlvyChrg)
                                : '-'
                              }`}
                          </Text>
                        </View> */}
                        {/* <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            운송단가
                          </Text>
                          <Text style={S.textTable}>
                            {`${
                              trust.shipChrg
                                ? StringUtils.money(trust.shipChrg)
                                : '-'
                              }`}
                          </Text>
                        </View> */}

                        {/** 정보 수정 시작 **/}
                        <View style={S.tableRow}>
                          <Text style={[S.textTable, S.textLeftTable]}>
                            {getMsg(this.props.lang, 'ML0146', '비고')}
                          </Text>
                          <Text style={S.textTable}>{trust.remark ? trust.remark : '-'}</Text>
                        </View>
                        <View style={S.tableRow}>
                          {trust.enable ? (
                            <View style={S.rowBtn}>
                              {whrgData.warehMgmtType === '0001' ? (
                                <View>
                                  <Text>
                                    {whrgData.relativeEntrp
                                      ? whrgData.relativeEntrp.entrpName
                                      : ''}
                                  </Text>
                                  <Text>
                                    {whrgData.relativeEntrp &&
                                    whrgData.relativeEntrp.phone
                                      ? whrgData.relativeEntrp.phone.no1 +
                                      whrgData.relativeEntrp.phone.no2 +
                                      whrgData.relativeEntrp.phone.no3
                                      : ''}
                                  </Text>
                                </View>
                              ) : (
                                <View>
                                  {
                                    userId != whrgData.ownerUserNo ?
                                      <TouchableOpacity
                                        style={[S.btnQuote, { minWidth: 100, }]}
                                        onPress={() =>
                                          this.checkContract('TRUST', trust)
                                        }>
                                        <Text style={[S.textBtnQuote]}>
                                          {getMsg(this.props.lang, 'ML0152', '견적 요청하기')}
                                        </Text>
                                      </TouchableOpacity>
                                      :
                                      <Text>
                                        {getMsg(this.props.lang, 'ML0153', '내가 등록한 창고입니다.(견적 요청 불가)')}
                                      </Text>
                                  }
                                </View>

                              )}
                            </View>
                          ) : (
                            <Text
                              style={[
                                S.textBtnQuote,
                                { color: '#ff0000', padding: 16 },
                              ]}>
                              {getMsg(this.props.lang, 'ML0147', '계약 완료된 정보입니다.')}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View style={DefaultStyle._card}>
                  <Text style={S.textTable}>
                    {getMsg(this.props.lang, 'ML0148', '등록된 창고정보가 없습니다.')}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>
                {getMsg(this.props.lang, 'ML0174', '창고 소개')}
              </Text>
              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  <View style={S.viewBody}>
                    <Text style={[S.textBodyCard, DefaultStyle.p_16]}>
                      {whrgData.description}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>
                {getMsg(this.props.lang, 'ML0175', '위치')}
              </Text>
              <Text style={S.describeTitle}>
                {whrgData.roadAddr
                  ? `${whrgData.roadAddr.address} ${
                    whrgData.roadAddr.detail === null ||
                    whrgData.roadAddr.detail === undefined ||
                    whrgData.relativeEntrp === null ||
                    whrgData.relativeEntrp === undefined
                      ? ''
                      : whrgData.roadAddr.detail
                  }`
                  : '-'}
              </Text>
              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  <TouchableOpacity
                    onPress={() => {
                      this.navigation.navigate('DetailsLocationWH', {
                        latitude:
                          whrgData.gps && whrgData.gps.latitude > 0
                            ? whrgData.gps.latitude
                            : 0,
                        longitude:
                          whrgData.gps && whrgData.gps.longitude > 0
                            ? whrgData.gps.longitude
                            : 0,
                        address: whrgData.roadAddr
                          ? `${whrgData.roadAddr.address} ${
                            whrgData.roadAddr.detail
                          }`
                          : '',
                      });
                    }}>
                    <View style={{ height: 220 }}>
                      {whrgData.gps &&
                      whrgData.gps.latitude > 0 &&
                      whrgData.gps.longitude > 0 && (
                        <WebviewMap
                          latitude={whrgData.gps.latitude}
                          longitude={whrgData.gps.longitude}
                          isToggleBtn={false}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>
                {getMsg(this.props.lang, 'ML0176', '추가 정보')}
              </Text>
              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  <View style={S.table}>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        {getMsg(this.props.lang, 'ML0154', '준공일자')}
                      </Text>
                      <Text style={S.textTable}>
                        {`${whrgData.cmpltYmd ? formatDateV1(whrgData.cmpltYmd) : '-'}`}
                      </Text>
                    </View>
                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        {getMsg(this.props.lang, 'ML0155', '전용면적')}
                      </Text>
                      <Text style={S.textTable}>
                        {whrgData.prvtArea
                          ? StringUtils.displayAreaUnit(whrgData.prvtArea)
                          : '-'}
                      </Text>
                    </View>

                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        {getMsg(this.props.lang, 'ML0156', '대지면적')}
                      </Text>
                      <Text style={S.textTable}>
                        {whrgData.siteArea
                          ? StringUtils.displayAreaUnit(whrgData.siteArea)
                          : '-'}
                      </Text>
                    </View>

                    {/* <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        공용면적
                      </Text>
                      <Text style={S.textTable}>
                        {whrgData.cmnArea
                          ? StringUtils.displayAreaUnit(whrgData.cmnArea)
                          : '-'}
                      </Text>
                    </View> */}

                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        {getMsg(this.props.lang, 'ML0157', '건축면적')}
                      </Text>
                      <Text style={S.textTable}>
                        {whrgData.bldgArea
                          ? StringUtils.displayAreaUnit(whrgData.bldgArea)
                          : '-'}
                      </Text>
                    </View>

                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        {getMsg(this.props.lang, 'ML0158', '추가옵션')}
                      </Text>
                      <Text style={S.textTable}>
                        {`${
                          whrgData.addOptDvCodes && whrgData.addOptDvCodes.length > 0
                            ? whrgData.addOptDvCodes
                              .map(code => code?.stdDetailCodeName)
                              .join(',')
                            : '-'
                        }`}
                      </Text>
                    </View>

                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        {getMsg(this.props.lang, 'ML0177', '연면적')}
                      </Text>
                      <Text style={S.textTable}>
                        {whrgData.totalArea
                          ? StringUtils.displayAreaUnit(whrgData.totalArea)
                          : '-'}
                      </Text>
                    </View>

                    <View style={S.tableRow}>
                      <Text style={[S.textTable, S.textLeftTable]}>
                        {getMsg(this.props.lang, 'ML0159', '보험가입')}
                      </Text>
                      <Text style={S.textTable}>
                        {`${
                          whrgData.insrDvCodes && whrgData.insrDvCodes.length > 0
                            ? whrgData.insrDvCodes
                              .map(code => code?.stdDetailCodeName)
                              .join(',')
                            : '-'
                        }`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {whrgData.floors && whrgData.floors.length > 0 ?
            (<View style={DefaultStyle._cards}>
                <View style={S.info}>
                  <Text style={S.title}>{getMsg(this.props.lang, 'ML0178', '층별 상세 정보')}</Text>
                  <View style>
                    <AppGrid
                      data={dataTab && dataTab}
                      title={floors}
                      titleProps={(e, index) =>
                        this.setState({ floors: e, activeIndex: index })
                      }
                    />
                  </View>
                  {whrgData.floors ? (
                    whrgData.floors.map((floor, index) => {
                      return (
                        activeIndex === index && (
                          <View key={'floor' + index} style={DefaultStyle._card}>
                            <View style={S.bodyCard}>
                              <View style={S.table}>
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0116', '층수')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.flrDvCode
                                      ? floor.flrDvCode?.stdDetailCodeName
                                      : ''}
                                  </Text>
                                </View>
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0160', '층면적')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.flrArea
                                      ? StringUtils.displayAreaUnit(floor.flrArea)
                                      : '-'}
                                  </Text>
                                </View>
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0161', '사무실면적')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.opcArea
                                      ? StringUtils.displayAreaUnit(floor.opcArea)
                                      : '-'}
                                  </Text>
                                </View>
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0162', '주차장면적')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.parkArea
                                      ? StringUtils.displayAreaUnit(floor.parkArea)
                                      : '-'}
                                  </Text>
                                </View>
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0163', '전용면적')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.prvtArea
                                      ? StringUtils.displayAreaUnit(floor.prvtArea)
                                      : '-'}
                                  </Text>
                                </View>
                                {/* <View style={S.tableRow}>
                              <Text style={[S.textTable, S.textLeftTable]}>
                                공용면적
                              </Text>
                              <Text style={S.textTable}>
                                {floor.cmnArea
                                  ? StringUtils.displayAreaUnit(floor.cmnArea)
                                  : '-'}
                              </Text>
                            </View> */}
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0115', '층고')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.flrHi
                                      ? StringUtils.numberComma(floor.flrHi)
                                      : '-'}
                                  </Text>
                                </View>
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0164', '유효고')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.efctvHi
                                      ? StringUtils.numberComma(floor.efctvHi)
                                      : '-'}
                                  </Text>
                                </View>
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0117', '접안방식')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.aprchMthdDvCode
                                      ? floor.aprchMthdDvCode?.stdDetailCodeName
                                      : ''}
                                  </Text>
                                </View>
                                <View style={S.tableRow}>
                                  <Text style={[S.textTable, S.textLeftTable]}>
                                    {getMsg(this.props.lang, 'ML0165', '도크 수')}
                                  </Text>
                                  <Text style={S.textTable}>
                                    {floor.dockQty
                                      ? StringUtils.numberComma(floor.dockQty)
                                      : '-'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        )
                      );
                    })
                  ) : (
                    <Text style={S.textTable} />
                  )}
                </View>
              </View>
            ) : <View />}

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <View style={S.titleView}>
                <Text style={S.title}>
                  {getMsg(this.props.lang, 'ML0166', '문의')}
                  {/* ({pageInfo.totalElements ? pageInfo.totalElements : 0}) */}
                </Text>
                <View style={S.rightTitle}>
                  <TouchableOpacity
                    style={S.btnInquiry}
                    onPress={() => {
                      if (this.state.isLogin) {
                        this.navigation.navigate('CreateInquiryWH', {
                          idWH: id,
                          onReloadQna: () => {
                            this.handleRequestQnaList()
                          },
                        })
                      } else {
                        alert(getMsg(this.props.lang, 'ML0099', '로그인 후 이용해주세요.'))
                      }
                    }
                    }>
                    <Text style={S.textInquiry}>{getMsg(this.props.lang, 'ML0167', '문의하기')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={DefaultStyle._card}>
                <View style={S.bodyCard}>
                  {qnaList && qnaList.length === 0 && (
                    <View style={[DefaultStyle.d_center, DefaultStyle.p_16]}>
                      <Text key={'empty'} style={S.titleInquiry}>
                        {getMsg(this.props.lang, 'ML0168', '문의 내역이 없습니다.')}
                      </Text>
                    </View>
                  )}
                  {/* List */}
                  {qnaList && qnaList.map((qnaItem, index) => (
                    <View key={'qnaItem' + index} style={S.inquirys}>
                      <TouchableOpacity onPress={() => {
                        // TODO 기본 비밀글로 처리. 추후 변경.
                        if (qnaItem.me || !(qnaItem.secret || true)) {
                          this.navigation.navigate('DetailInquiry', {
                            inquiryDetails: qnaItem,
                            answerMode: false, // 답변 가능 모드
                          });
                        }
                      }}>
                        <View style={S.leftInquiry}>
                          {qnaItem.answer ?
                            <Text style={S.titleCompleted}>{getMsg(this.props.lang, 'ML0169', '답변완료')}</Text> :
                            <Text style={S.titleInquiry}>{getMsg(this.props.lang, 'ML0170', '미답변')}</Text>}
                          <View>
                            {/** TODO 기본 비밀글로 처리. 추후 변경.*/}
                            {qnaItem.me || !(qnaItem.secret || true) ?
                              <>
                                <Text style={S.contentInquiry}>
                                  {qnaItem.content}
                                </Text>
                                <Text style={[S.contentInquiry, { marginTop: 4, }]}>
                                  {qnaItem.answer ? `\n${getMsg(this.props.lang, 'ML0179', '답변')} :\n${qnaItem.answer.content}` : ''}
                                </Text>
                              </>
                              :
                              <Text style={S.contentInquiry}>
                                <IconButton style={S.btnIcon} size={16} icon="lock" />
                                {getMsg(this.props.lang, 'ML0171', '비밀글 입니다.')}
                              </Text>
                            }
                          </View>
                          <Text style={S.footerInquiry}>
                            {/** TODO 기본 비밀글로 처리. 추후 변경.*/}
                            {qnaItem.me || !(qnaItem.secret || true) ? qnaItem.writer : this.hiddenName(qnaItem.writer)} | {formatDateV1(qnaItem.date)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
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

                  {!showAll && pageInfo.totalElements > 4 && (
                    <TouchableOpacity
                      style={S.btnViewAll}
                      onPress={() => {
                        this.handleRequestQnaList(100),
                          this.setState({ showAll: true });
                      }}>
                      <Text style={S.textViewAll}> {getMsg(this.props.lang, 'ML0172', '전체보기')}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>

          <View style={DefaultStyle._cards}>
            <View style={S.info}>
              <Text style={S.title}>{getMsg(this.props.lang, 'ML0173', '유사한 창고')}</Text>
              <View style={S.mainProductList}>
                {/*<CarouselSnap*/}
                {/*layout={'default'}*/}
                {/*data={whList}*/}
                {/*sliderWidth={328}*/}
                {/*itemWidth={160}*/}
                {/*renderItem={this._renderProductItem}*/}
                {/*onSnapToItem={index => this.setState({ activeIndex: index })}*/}
                {/*/>*/}

                {whList && whList.length > 0 &&
                <>
                  {whList.slice(0, 4).map((item, index) =>
                    <View style={S.mainProductItem} key={index}>
                      <TouchableOpacity onPress={() => this.navigation.replace('DetailsWH', { id: item.id })}>
                        {item.thumbnail !== null ? (
                          <ProductCard navigation={this.navigation} data={item} />
                        ) : (
                          <ProductCard
                            navigation={this.navigation}
                            data={{ ...item, img: cardBG }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </>}

              </View>
            </View>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  async getDataWH () {
    const { id } = this.state;

    let params = {
      id: id,
    };
    const warehouse = await Warehouse.getWhrg(params);
    // console.log('warehouse :>> ', warehouse);
    this.setState({
      whrgData: warehouse.data,
      favorite: warehouse.data.fav,
      active: warehouse.data.hasKeep === false && warehouse.data.hasTrust === true ? 1 : 0,
      checkTrust: warehouse.data.hasKeep === false && warehouse.data.hasTrust === true ? true : false,
    });
    if (warehouse.data.pnImages[0]) {
      // this.setState({ loading: true })
      // this.infoImage(warehouse.data.pnImages[0].url);
    }
    const dataTabs = [];
    warehouse.data.floors.forEach(element => {
      dataTabs.push({
        title: element.flrDvCode?.stdDetailCodeName ?? '',
        content: '',
      });
    });

    this.setState({
      dataTab: dataTabs,
      floors: (dataTabs && dataTabs.length) > 0 ? dataTabs[0]?.title : 'null',
    });
    // 유사창고 파라미터 조건
    let typeCodeNames = [];
    let gdsKeepTypeCodeNames = [];
    if (warehouse.data.keeps && warehouse.data.keeps.length > 0) {
      typeCodeNames.push('KEEP');
      warehouse.data.keeps.map(item => {
        if (
          gdsKeepTypeCodeNames.indexOf(
            item.typeCode?.stdDetailCode.toString(),
          ) < 0
        ) {
          gdsKeepTypeCodeNames.push(item.typeCode?.stdDetailCode.toString());
        }
      });
    }
    if (warehouse.data.trusts && warehouse.data.trusts.length > 0) {
      typeCodeNames.push('TRUST');
      warehouse.data.trusts.map(item => {
        if (
          gdsKeepTypeCodeNames.indexOf(
            item.typeCode?.stdDetailCode.toString(),
          ) < 0
        ) {
          gdsKeepTypeCodeNames.push(item.typeCode?.stdDetailCode.toString());
        }
      });
    }

    await Warehouse.listRecommend({
      typeCodes: typeCodeNames.join(','),
      gdsKeepTypeCodes: gdsKeepTypeCodeNames.join(','),
      warehRegNo: id
    })
      .then(res => {
        let list =
          res.data?._embedded && res.data?._embedded?.warehouses
            ? res.data?._embedded?.warehouses
            : [];

        this.setState({ whList: list });
      })
      .catch(error => {
        alert('DetailWH listRecommend error:' + error);
      });
  }

  handleRequestQnaList = q_size => {
    // console.log(':::::::::::::::::::::::::::::::::::::::::::::REFRESH QNA');
    const { id } = this.state;
    let qnaParams = {
      id: id,
      size: q_size,
      page: 0,
      requiresToken: false,
    };
    // console.log(qnaParams, 'qnaParams');
    Warehouse.pageWhrgQnA(qnaParams)
      .then(res => {
        if (res && res._embedded && res._embedded) {
          let newFQAList = res._embedded.questions.map(item => {
            return {
              status: item.complete,
              title: item.content,
              name: item.writer,
              date: formatDateV1(item.date),
              lock: item.secret,
            };
          });

          // console.log('newFQAList', res._embedded.questions);
          this.setState({ qnaList: res && res._embedded && res._embedded.questions ? res._embedded.questions : [] });
          // this.setState({ qnaList: newFQAList });
          this.setState({ pageInfo: res.page });
        }
      })
      .catch(error => {
        alert('DetailWH pageWhrgQnA error:' + error);
      });
  };
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {};
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailWH);
