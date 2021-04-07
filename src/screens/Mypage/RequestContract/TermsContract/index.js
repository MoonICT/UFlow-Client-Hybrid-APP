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

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

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
      title: getMsg(this.props.lang, 'ML0643', '계약 약관 동의'),
      type: 'confirm',
      content: getMsg(this.props.lang, 'ML0642', '계약 약관 동의가 처리되었습니다.'),
    });
    // 라우트 강제 새로고침.
    this.props.route.params.onRefresh('Mypage_cntr');
    this.navigation.navigate('Mypage', {
      title: getMsg(this.props.lang, 'ML0250', '견적･계약 관리'),
      tab: 'Mypage_cntr',
    });
  };

  /**
   * 약관 동의 및 계약협의 요청.
   * */
  useImperativeHandle = async () => {
    const { contractType, keepTrustContract, rentUserNo } = this.props;
    if (!this.state.isAgree) {
      alert(getMsg(this.props.lang, 'ML0641', '계약 약관에 동의해주세요.'))
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
        // console.debug('약관 동의 결과1 : ', res)
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
    const { isAgree, file, dataContent } = this.state;
    return (
      <View style={{ paddingBottom: 90 }}>

        {/** 계약 정보 */}
        <CardMypage
          onPressHeader={() => {
          }}
          headerTitle={getMsg(this.props.lang, 'ML0650', '계약 정보')}
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
              {getMsg(this.props.lang, 'ML0640', '위 내용을 확인했으며, 동의합니다.')}
            </Text>
          </View>
        </View>

        {/** 추가 서류 업로드 */}
        {type === 'owner' && (keepTrustContract && !keepTrustContract.entrpByOwner?.file2) && (
          <View style={DefaultStyle._card}>
            <View style={DefaultStyle._headerCard}>
              <Text style={DefaultStyle._headerCardTitle}>
                {getMsg(this.props.lang, 'ML0639', '추가 서류 등록')}
              </Text>
            </View>
            <View style={DefaultStyle._bodyCard}>
              <Text style={DefaultStyle._textDF2}>
                {getMsg(this.props.lang, 'ML0638', '통장사본')}
              </Text>
              <Text style={SS.describe}>
                {getMsg(this.props.lang, 'ML0637', 'jpg, png, pdf 확장자 파일만 업로드가 가능합니다.')}
              </Text>
              <View style={[SS.infoRegister, { marginBottom: 16 }]}>
                <Text style={SS.textRegister}>{file ? file.fileName : getMsg(this.props.lang, 'ML0636', '통장 사본을 첨부해주세요.')}</Text>
              </View>
              {/*<Text style={SS.textSuccess}>*/}
              {/*성공적으로 파일을 등록했습니다.*/}
              {/*</Text>*/}
              <TouchableOpacity style={SS.btnAttach}
                                onPress={() => this.handleLaunchImage()}>
                <Text style={SS.textAttach}>
                  {getMsg(this.props.lang, 'ML0330', '파일첨부')}
                </Text>
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
                {getMsg(this.props.lang, 'ML0643', '계약 약관 동의')}
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
                {getMsg(this.props.lang, 'ML0643', '계약 약관 동의')}
              </Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }

  /** when after render DOM */
  async componentDidMount () {
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
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }
}

/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
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
