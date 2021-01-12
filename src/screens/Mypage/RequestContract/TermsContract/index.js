/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text, Dialog, Paragraph, Button } from 'react-native-paper';
import moment from 'moment';
import { launchImageLibrary } from 'react-native-image-picker';

// Local Imports
import DefaultStyle from '@Styles/default';
import Checkbox from '@Components/atoms/Checkbox';

import ActionCreator from '@Actions';
import illust11 from '@Assets/images/illust11.png';
import { styles as SS } from './style';
import { Warehouse, Contract } from '@Services/apis';
import CardMypage from '@Components/organisms/CardMypage';
import AsyncStorage from "@react-native-community/async-storage";

import DocumentPicker from 'react-native-document-picker';

class TermsContract extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {
      isSubmit: false,
      singleFile: null,
      isAgree: false,
      isComplete: false,
      file: null,
    };

    console.debug('견적 약관 detailEstimate : ', props.detailEstimate)
    console.debug('견적 약관 keepTrustContract : ', props.keepTrustContract)


    this.navigation = props.navigation;
  }

  /**
   * 약관 동의 및 계약협의 요청.
   * */
  useImperativeHandle = async () => {
    const {contractType, keepTrustContract, rentUserNo } = this.props
    await AsyncStorage.getItem('TOKEN').then(res => {
      console.log('토큰확인1:::::', res)
    });
    console.log(this.props.type)
    console.log('contractType', contractType.toLowerCase())
    console.log('warehouseRegNo', keepTrustContract.id.warehouseRegNo)
    console.log('rentUserNo', rentUserNo)
    console.log('cntrYmdFrom', moment(keepTrustContract.id.cntrYmdFrom).format('YYYYMMDD'))
    if (!this.state.isAgree) {
      alert('계약 약관에 동의해주세요.')
      return false;
    }
    if (this.props.type === 'OWNER') {
      let formData = new FormData();
      formData.append('file', {
        uri: this.state.file.uri,
        name: this.state.file.fileName,
        type: 'image/jpeg',
      });
      formData.append('warehouseRegNo', keepTrustContract.id.warehouseRegNo);
      formData.append('rentUserNo', rentUserNo);
      formData.append('cntrYmdFrom', moment(keepTrustContract.id.cntrYmdFrom).format('YYYYMMDD'));
      Contract.owner4100(contractType.toLowerCase(), formData).then(res => {
        console.debug('약관 동의 결과1 : ', res)
        this.setState({ isComplete: false });
      });
    } else if (this.props.type === 'TENANT') {
      Contract.tenant4100({
        contractType: contractType.toLowerCase(),
        warehouseRegNo: keepTrustContract.id.warehouseRegNo,
        rentUserNo: rentUserNo,
        cntrYmdFrom: moment(keepTrustContract.id.cntrYmdFrom).format('YYYYMMDD')
      }).then(res => {
        console.debug('약관 동의 결과2 : ', res)
        this.setState({ isComplete: false });
      }).catch(error => {
        alert('tenant4100:' + error);
      });
    }
  }

  handlePicker = async () => {
    try {
      const res = await DocumentPicker.pick({});
      console.log('res', res)
      this.setState({ singleFile: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  onSubmit = async () => {
    let { singleFile } = this.state;
    let { keepTrustContract, rentUserNo, contractType } = this.props
    var formData = new FormData();
    formData.append('file', singleFile);
    formData.append('warehouseRegNo', keepTrustContract.id.warehouseRegNo);
    formData.append('rentUserNo', rentUserNo);
    formData.append('cntrYmdFrom', keepTrustContract.id.cntrYmdFrom.replace(/-/g, ''));
    console.log('formData', formData)
    await Warehouse.termsContract(formData, contractType.toLowerCase()).then((res) => {
      console.log('res', res)
    }).catch(error => {
      alert('termsContract:' + error);
    });
    // this.setState({ isSubmit: !isSubmit });
    // this.props.showPopup({
    //   image: illust11,
    //   title: '계약서 등록 완료',
    //   type: 'confirm',
    //   content: `계약서 등록을 완료했습니다.\n  UFLOW 계약 담당자가\n  계약서를 확인 후 승인할 예정입니다.`,
    // });
  }

  /**
   * 앨범 이미지 선택 핸들러
   * */
  handleLaunchImage = () => {
    console.log('::: handleLaunchImage')
    launchImageLibrary({
      // includeBase64: true
    }, (res) => {
      console.log('이미지 선택 완료', res);
      this.setState({
        file: res
      });
    });
  };

  render () {
    const {
      dataTable, // 계약 정보 테이블 데이
      keepTrustContract,
      // TODO 확인 필요
      contractType, // KEEP || TRUST
      type, // owner || tenant

    } = this.props;
    const { isAgree, file } = this.state;
    return (
      <View style={{ paddingBottom: 90 }}>

        {/** 계약 정보 */}
        <CardMypage
          onPressHeader={() => {
          }}
          headerTitle={'계약 정보'}
          data={dataTable}
          borderRow={false}
          styleLeft={DefaultStyle._leftTableCard}
          styleRight={DefaultStyle._rightTableCard}
          bgrImage={false}
          rightHeader={<></>}
        />

        {/** 약관 */}
        <View style={DefaultStyle._card}>
          <ScrollView style={SS.bodyAgreement}>
            <Text style={[DefaultStyle._textDF, { marginBottom: 20 }]}>
              제01조 (정의)
            </Text>
            <Text style={DefaultStyle._textDF}>
              ① 이 계약에 달리 정의되지 않는 한, 다음의 용어와 표현은 각각
              다음과 같은 의미를 가진다.
            </Text>
            <Text style={DefaultStyle._textDF}>
              1. "계약제품"이란 첨부에 언급한 제품들을 말한다.
            </Text>
            <Text style={[DefaultStyle._textDF]}>제01조 (범례)</Text>

            <Text style={DefaultStyle._textDF}>
              ① 정의 조항 또는 계약 본문에서 정의된 용어는 따옴표(", ")로 묶어서
              표기하고, 따옴표로 묶이지 아니한 용어의 의미는 일반적이고 사전적
              의미로 해석한다. 다만, 따옴표가 누락된 것이 명백한 경우에는, 정의
              조항에서 정의된 의미대로 해석한다.
            </Text>

            <Text style={DefaultStyle._textDF}>
              ① 계약서에 부속된 문서를 인용하는 경우에는 홀인용표(「,」)를, 본
              계약서와는 독립된 또 다른 계약서나 문서를 인용하는 경우에는
              겹인용표(『, 』)를 사용하여 표기한다.
            </Text>
            <Text style={[DefaultStyle._textDF, DefaultStyle._textTitleDF]}>
              제01조(계약 기간)
            </Text>
            <Text style={DefaultStyle._textDF}>
              ① 제 조에 따라 본 계약이 조기 종료되지 않는 한, 본 계약의
              유효기간은 체결일로부터 00년으로 한다.
            </Text>
            <Text style={DefaultStyle._textDF}>
              ① 계약만료 X개월 전까지 갑 또는 을 중 어느 일방이 상대방에 대하여
              계약기간을 연장하지 않겠다는 취지를 기재한 서면의 통지를 하지 않은
              때에는 본 계약과 동일한 조건으로 00년씩 계약기간이 연장되는 것으로
              한다.
            </Text>
            <Text style={DefaultStyle._textDF}>
              ① 양 당사자의 명시적인 의사표시에 의하지 아니하고는 본 계약은
              자동으로 갱신되지 아니한다.
            </Text>
            <Text style={DefaultStyle._textDF}>
              ① 계약만료 X개월 전까지 갑 또는 을 중 어느 일방이 상대방에 대하여
              계약기간을 연장하지 않겠다는 취지를 기재한 서면의 통지를 하지 않은
              때에는 본 계약과 동일한 조건으로 00년씩 계약기간이 연장되는 것으로
              한다.
            </Text>
          </ScrollView>

          <View style={[SS.checkAccept, { borderBottomWidth: 1 }]}>
            <Checkbox
              checked={isAgree}
              onPress={() => this.setState({ isAgree: !isAgree })}
            />
            <Text style={DefaultStyle._textDF} onPress={() => this.setState({ isAgree: !isAgree })}>
              위 내용을 확인했으며, 동의합니다.
            </Text>
          </View>
        </View>

        {/** 추가 서류 업로드 */}
        {type === 'OWNER' && (keepTrustContract && !keepTrustContract.entrpByOwner?.file2) && (
          <View style={DefaultStyle._card}>
            <View style={DefaultStyle._headerCard}>
              <Text style={DefaultStyle._headerCardTitle}>추가 서류 등록</Text>
            </View>
            <View style={DefaultStyle._bodyCard}>
              <Text style={DefaultStyle._textDF2}>통장사본</Text>
              <Text style={SS.describe}>
                jpg, png, pdf 확장자 파일만 업로드가 가능합니다.
              </Text>
              <View style={[SS.infoRegister, { marginBottom: 16 }]}>
                <Text style={SS.textRegister}>{file ? file.fileName : '통장 사본을 첨부해주세요.'}</Text>
              </View>
              {/*<Text style={SS.textSuccess}>*/}
              {/*성공적으로 파일을 등록했습니다.*/}
              {/*</Text>*/}
              <TouchableOpacity style={SS.btnAttach}
                                onPress={() => this.handleLaunchImage()}>
                {/*<Text style={SS.textSuccess}>*/}
                {/*성공적으로 파일을 등록했습니다.*/}
                {/*</Text>*/}
                {/*<TouchableOpacity*/}
                {/*style={SS.btnAttach}*/}
                {/*onPress={() => this.handlePicker()}>*/}
                <Text style={SS.textAttach}>파일첨부</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/** 동의 버튼 */}
        <View
          style={[DefaultStyle._listBtn, { marginTop: 12, marginBottom: 8 }]}>
          <TouchableOpacity
            style={[
              DefaultStyle._btnInline,
              (!isAgree || !(keepTrustContract.entrpByOwner?.file2 || file)) ? DefaultStyle._oulineDisabled : '',
            ]}
            disabled={!isAgree || !(keepTrustContract.entrpByOwner?.file2 || file)}
            onPress={() => this.useImperativeHandle()}>
            {/*//   // (file && isAgree) ? '' : DefaultStyle._oulineDisabled,*/}
            {/*// ]}*/}
            {/*// // disabled={!file || !isAgree}*/}
            {/*// onPress={() => {*/}
            {/*//   this.onSubmit()*/}
            {/*//   // this.setState({*/}
            {/*//   //   isComplete: true*/}
            {/*//   // });*/}
            {/*// }}>*/}
            <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>
              계약 약관 동의
            </Text>
          </TouchableOpacity>
        </View>

        {/** 약관 동 확인 모달 */}
        <Dialog style={DefaultStyle.popup}
                visible={this.state.isComplete}
                onDismiss={() => this.setState({ isComplete: !this.state.isComplete })}>
          <Dialog.Title style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>계약 약관 동의</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              계약 약관 동의가 처리되었습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement, { borderLeftWidth: 0, }]}
              onPress={() => {
                this.setState({ isComplete: false });
                this.navigation.navigate('Mypage', { title: '견적･계약 관리' });
              }}>확인</Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
    console.log('::componentDidMount::');
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
    // if (prevState.isSubmit !== this.state.isSubmit) {
    // let warehSeq = this.props.route.params.warehSeq;
    // let warehouseRegNo = this.props.route.params.warehouseRegNo;
    // let rentUserNo = this.props.route.params.rentUserNo;
    // let type = this.props.route.params.type === 'OWNER' ? 'owner' : 'tenant';
    // let typeWH =
    //   this.props.route.params.typeWH === 'TRUST' ? 'trust' : 'keep';
    // let url = type + '/' + typeWH;

    // Warehouse.termsContract({ url, data })
    //   .then(res => {
    //     console.log('res', res);
    //     if (res.status === 200) {
    //       console.log('resRequestContract', res);
    //       this.navigation.navigate('RequestContract', {
    //         type,
    //         warehouseRegNo,
    //         warehSeq,
    //         typeWH: this.state.dataProps.typeWH,
    //         rentUserNo,
    //         status: '1100',
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
    // }
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    imageStore: state.registerWH.pimages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    dataAction: action => {
      dispatch(ActionCreator.ContractConditions(action));
    },
    hidePopup: status => {
      dispatch(ActionCreator.hide(status));
    },
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsContract);
