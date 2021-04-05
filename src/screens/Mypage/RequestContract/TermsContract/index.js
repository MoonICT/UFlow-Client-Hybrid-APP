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
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Text, Dialog, Paragraph, Button } from 'react-native-paper';
import moment from 'moment';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

// Local Imports
import DefaultStyle from '@Styles/default';
import Checkbox from '@Components/atoms/Checkbox';

import ActionCreator from '@Actions';
import illust11 from '@Assets/images/illust11.png';
import { styles as SS } from './style';
import { Contract, Terms } from '@Services/apis';
import CardMypage from '@Components/organisms/CardMypage';
import HTML from 'react-native-render-html';

class TermsContract extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {
      isAgree: false,
      file: null,
    };

    // console.debug('견적 약관 detailEstimate : ', props.detailEstimate)
    // console.debug('견적 약관 keepTrustContract : ', props.keepTrustContract)

    this.navigation = props.navigation;
  }

  /**
   * 약관 동의 핸들러
   * */
  handleCompplete = () => {
    this.props.showPopup({
      image: illust11,
      title: '계약 약관 동의',
      type: 'confirm',
      content: `계약 약관 동의가 처리되었습니다.`,
    });
    // 라우트 강제 새로고침.
    this.props.route.params.onRefresh('Mypage_cntr');
    this.navigation.navigate('Mypage');
  };

  /**
   * 약관 동의 및 계약협의 요청.
   * */
  useImperativeHandle = async () => {
    const { contractType, keepTrustContract, rentUserNo } = this.props;
    if (!this.state.isAgree) {
      alert('계약 약관에 동의해주세요.')
      return false;
    }

    if (this.props.type === 'owner') {
      let formData = new FormData();
      formData.append('file', this.state.file ? {
        uri: this.state.file.uri,
        type: this.state.file.type,
        name: this.state.file.fileName,
      } : '');
      formData.append('warehouseRegNo', keepTrustContract.id.warehouseRegNo);
      formData.append('rentUserNo', rentUserNo);
      formData.append('cntrYmdFrom', moment(keepTrustContract.id.cntrYmdFrom).format('YYYYMMDD'));
      Contract.owner4100(contractType.toLowerCase(), formData).then(res => {
        console.debug('약관 동의 결과1 : ', res)
        this.handleCompplete();
      });
    } else if (this.props.type === 'tenant') {
      Contract.tenant4100({
        contractType: contractType.toLowerCase(),
        warehouseRegNo: keepTrustContract.id.warehouseRegNo,
        rentUserNo: rentUserNo,
        cntrYmdFrom: moment(keepTrustContract.id.cntrYmdFrom).format('YYYYMMDD')
      }).then(res => {
        this.handleCompplete();
      }).catch(error => {
        alert('tenant4100:' + error);
      });
    }
  }

  /**
   * 앨범 이미지 선택 핸들러
   * */
  handleLaunchImage = () => {
    launchImageLibrary({}, (res) => {
      this.setState({
        file: res
      });
    });
  };

  /**
   * 파일 선택기
   * TODO iOS에서 갤러리 선택이 안됨.
   * */
  handlePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('res', res)
      this.setState({ file: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  render () {
    const {
      dataTable, // 계약 정보 테이블 데이
      keepTrustContract,
      type, // owner || tenant
    } = this.props;
    const { isAgree, file,dataContent } = this.state;
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
          <ScrollView nestedScrollEnabled={true} style={SS.bodyAgreement}>
            {/** <Text style={[DefaultStyle._textDF, { marginBottom: 20 }]}>
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
            </Text> */}
            <View style={{ flex: 1 }}>
              {dataContent && (
                <HTML
                  tagsStyles={{ p: { marginBottom: 0, marginTop: 0 } }}
                  source={{ html: dataContent }}
                />
              )}
            </View>
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
        {type === 'owner' && (keepTrustContract && !keepTrustContract.entrpByOwner?.file2) && (
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
                <Text style={SS.textAttach}>파일첨부</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/** 동의 버튼 */}
        <View
          style={[DefaultStyle._listBtn, { marginTop: 12, marginBottom: 8 }]}>

          {type === 'owner' ?
            <TouchableOpacity
              style={[
                DefaultStyle._btnInline,
                (!isAgree || !(keepTrustContract.entrpByOwner?.file2 || file)) ? DefaultStyle._oulineDisabled : '',
              ]}
              disabled={!isAgree || !(keepTrustContract.entrpByOwner?.file2 || file)}
              onPress={() => this.useImperativeHandle()}>
              <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>
                계약 약관 동의
              </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={[
                DefaultStyle._btnInline,
                !isAgree ? DefaultStyle._oulineDisabled : '',
              ]}
              disabled={!isAgree}
              onPress={() => this.useImperativeHandle()}>
              <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>
                계약 약관 동의
              </Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    // await Term.getCodeTerm({code: '0006'})
    await Terms.getTerms({ code: '0006' })
      .then(res => {
        if (res) {
          this.setState({ dataContent: res.contents });
        }
      })
      .catch(err => {
        console.log('errTerm', err);
      });
    SplashScreen.hide();
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
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
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
