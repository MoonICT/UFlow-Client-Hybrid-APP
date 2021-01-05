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
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Paragraph, Text, Dialog, Button } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';
import Checkbox from '@Components/atoms/Checkbox';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import Icon from 'react-native-vector-icons/Entypo';
import illust11 from '@Assets/images/illust11.png';

import { styles as S } from '../../style';
import { styles as SS } from './style';

class TermsContract extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      checkedAll: false,
      checked: false,
      checked2: false,
    };

    this.navigation = props.navigation;
  }

  render() {
    const {
      route,
      status,
      warehouseRegNo,
      rentUserNo,
      warehSeq,
      type,
      warehouse,
      rentUser,
    } = this.props;
    const { checkedAll, checked2, checked } = this.state;
    return (
      <View>
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
              checked={checked}
              onPress={() => this.setState({ checked: !checked })}
            />
            <Text style={DefaultStyle._textDF}>
              위 내용을 확인했으며, 동의합니다.
            </Text>
          </View>
          <View style={SS.listInfo}>
            <Text style={[DefaultStyle._textDF, { marginBottom: 16 }]}>
              임차인
            </Text>
            <Text style={[DefaultStyle._textDF, { marginBottom: 16 }]}>
              대표자명
            </Text>
            <Text style={[DefaultStyle._textDF, { marginBottom: 16 }]}>
              싱호명
            </Text>
            <Text style={[DefaultStyle._textDF, { marginBottom: 16 }]}>
              사업자등록번호
            </Text>
            <Text style={[DefaultStyle._textDF]}>사업장 주소</Text>
          </View>
          <View
          // style={DefaultStyle._bodyCard}
          >
            <View style={DefaultStyle._infoTable} />
          </View>
        </View>

        <View style={DefaultStyle._card}>
          <View style={DefaultStyle._headerCard}>
            <Text style={DefaultStyle._headerCardTitle}>보험 계약 가입</Text>
          </View>
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
          <View style={SS.checkAccept}>
            <Checkbox
              checked={checked2}
              onPress={() => this.setState({ checked2: !checked2 })}
            />
            <Text style={DefaultStyle._textDF}>
              위 내용을 확인했으며, 동의합니다.
            </Text>
          </View>
          <View>
            <View style={DefaultStyle._infoTable} />
          </View>
        </View>

        <View style={SS.checkAccept}>
          <Checkbox
            checked={checkedAll}
            onPress={() =>
              this.setState({
                checkedAll: !checkedAll,
                checked2: !checkedAll,
                checked: !checkedAll,
              })
            }
          />
          <Text style={DefaultStyle._textDF}>
            위 내용을 모두 확인했으며, 동의합니다.
          </Text>
        </View>

        {type === 'TENANT' ? null : (
          <View style={DefaultStyle._card}>
            <View style={DefaultStyle._headerCard}>
              <Text style={DefaultStyle._headerCardTitle}>추가 서류 등록</Text>
            </View>
            <View style={DefaultStyle._bodyCard}>
              <Text style={DefaultStyle._textDF2}>사업자 등록증</Text>
              <Text style={SS.describe}>
                jpg, png, pdf 확장자 파일만 업로드가 가능합니다.
              </Text>
              <View style={SS.infoRegister}>
                <Text style={SS.textRegister}>사업자등록증...</Text>
              </View>
              <Text style={SS.textSuccess}>
                성공적으로 파일을 등록했습니다.
              </Text>

              <TouchableOpacity
                style={SS.btnAttach}
                onPress={() => console.log('attach')}>
                <Text style={SS.textAttach}>파일첨부</Text>
              </TouchableOpacity>
            </View>

            <View style={DefaultStyle._bodyCard}>
              <Text style={DefaultStyle._textDF2}>통장사본</Text>
              <Text style={SS.describe}>
                jpg, png, pdf 확장자 파일만 업로드가 가능합니다.
              </Text>
              <View style={SS.infoRegister}>
                <Text style={SS.textRegister}>사업자등록증...</Text>
              </View>
              <Text style={SS.textSuccess}>
                성공적으로 파일을 등록했습니다.
              </Text>

              <TouchableOpacity
                style={SS.btnAttach}
                onPress={() => console.log('attach')}>
                <Text style={SS.textAttach}>파일첨부</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View
          style={[DefaultStyle._listBtn, { marginTop: 12, marginBottom: 8 }]}>
          <TouchableOpacity
            style={[DefaultStyle._btnInline]}
            onPress={() => {
              this.props.showPopup({
                image: illust11,
                title: '견적 등록 완료',
                type: 'confirm',
                content: `계약서 등록을 완료했습니다.\n  UFLOW 계약 담당자가\n  계약서를 확인 후 승인할 예정입니다.`,
              });
            }}>
            <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>
              계약 약관 동의
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    console.log('::componentDidMount::');
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
    // count: state.home.count,
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
