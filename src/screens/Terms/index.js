/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:48
 * @modify date 2020-11-24 17:21:07
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
// import DefaultStyle from '../../styles/default';
import Appbars from '@Components/organisms/AppBar';
import Select from '@Components/organisms/Select';
import ActionCreator from '@Actions';
import { styles as S } from './style';
import { Term } from '@Services/apis';

//---> Assets

//Data Terms Select
const data = [
  {
    label: '창고 등록',
    value: '창고 등록',
  },
  {
    label: '창고 찾기',
    value: '창고 찾기',
  },
  {
    label: '이용 방법',
    value: '이용 방법',
  },
  {
    label: '고객센터',
    value: '고객센터',
  },
  {
    label: '패밀리사이트',
    value: '패밀리사이트',
  },
];

class Terms extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      terms: '',
    };
    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    //console.log('//::componentWillUnmount::');
  }

  render() {
    let { terms, dataType, code } = this.state;
    console.log('code', code);
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.BackAction onPress={() => this.navigation.goBack()} />
          <Appbar.Content
            title="이용약관"
            color="rgba(0, 0, 0, 0.76)"
            style={S.appBarTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={S.content}>
            <View style={S.selectTerms}>
              <Select
                data={dataType}
                valueProps={e => {
                  this.setState({ code: e });
                }}
              />
            </View>
            <Text style={[S.titleTerm, S.fontMedium, S.fontS16]}>
              {'제 1조 (목적)'}
            </Text>

            <Text style={[S.contentTerm, S.fontRegular, S.fontS14]}>
              이 약관은 주식회사 워시업코리아 (이하 “회사”라 합니다)가 제공하는
              워시업코리아 서비스(이하 “서비스”라 합니다)와 관련하여, 회사와
              이용 고객간에 서비스의 이용조건 및 절차, 회사와 회원간의 권리,
              의무 및 기타 필요한 사항을 규정함을 목적으로 합니다. 본 약관은
              PC통신, 스마트폰(안드로이드폰, 아이폰 등) 앱 등을 이용하는
              전자상거래에 대해서도 그 성질에 반하지 않는 한 준용됩니다.
            </Text>

            <Text style={[S.titleTerm, S.fontMedium, S.fontS16]}>
              {'제 2조 (용어의 정리)'}
            </Text>

            <Text style={[S.contentTerm, S.fontRegular, S.fontS14]}>
              1. 이 약관은 주식회사 워시업코리아 (이하 “회사”라 합니다)이
              제공하는 워시업코리아 서비스(이하 “서비스”라 합니다)와 관련하여,
              회사와 이용 고객간에 서비스의 이용조건 및 절차, 회사와 회원간의
              권리, 의무 및 기타 필요한 사항을 규정함을 목적으로 합니다.{'\n'}{' '}
              2. 본 약관은 PC통신, 스마트폰(안드로이드폰, 아이폰 등) 앱 등을
              이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한
              준용됩니다. {'\n'}3. 이 약관은 주식회사 워시업코리아 (이하
              “회사”라 합니다)이 제공하는 워시업코리아 서비스(이하 “서비스”라
              합니다)와 관련하여, 회사와 이용 고객간에 서비스의 이용조건 및
              절차, 회사와 회원간의 권리, 의무 및 기타 필요한 사항을 규정함을
              목적으로 합니다.{'\n'} 4. 이 약관은 주식회사 워시업코리아 (이하
              “회사”라 합니다)이 제공하는워시업코리아 서비스(이하 “서비스”라
              합니다)와 관련하여, 회사와 이용 고객간에 서비스의 이용조건 및
              절차, 회사와 회원간의 권리, 의무 및 기타 필요한 사항을 규정함을
              목적으로 합니다.{'\n'} 5. 이 약관은 주식회사 워시업코리아 (이하
              “회사”라 합니다)이 제공하는 워시업코리아 서비스(이하 “서비스”라
              합니다)와 관련하여, 회사와 이용 고객간에 서비스의 이용조건 및
              절차, 회사와 회원간의 권리, 의무 및 기타 필요한 사항을 규정함을
              목적으로 합니다.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    await Term.getTypeTerm()
      .then(res => {
        if (res) {
          let data = res.map(el => {
            return {
              label: el.stdDetailCodeName,
              value: el.stdDetailCode,
            };
          });
          this.setState({ dataType: data });
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
    if (this.state.code !== prevState.code) {
      Term.getCodeTerm(this.state.code)
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.log('errCodeTerm', err);
        });
    }
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    count: state.home.count,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    countUp: diff => {
      dispatch(ActionCreator.countUp(diff));
    },
    countDown: diff => {
      dispatch(ActionCreator.countDown(diff));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Terms);
