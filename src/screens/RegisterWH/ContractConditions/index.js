/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Card, Text, RadioButton } from 'react-native-paper';
import Select from '@Components/organisms/Select';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '../../../components/organisms/AppBar';
import ActionCreator from '../../../actions';
import { styles as S } from '../style';
import { styles as SS } from './style';
class RegisterContractConditions extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      system: 'UF 시스템',
      term: '1년',
      settlement: '',
      deadline: '',
      escrow: 'UF 에스크로',
    };

    this.navigation = props.navigation;
  }
  render() {
    const { imageStore, route } = this.props;
    const { checked } = this.state;
    const dataSelect = [
      {
        label: '1년',
        value: '1년',
      },
      {
        label: '2년',
        value: '2년',
      },
    ];
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title={
              route && route.params && route.params.type === 'ModifyWH'
                ? '계약 조건 수정'
                : '계약 조건'
            }
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={S.containerRegister}>
          <View style={S.bodyCard}>
            <View style={S.titleBody}>
              <Text style={[S.textTitleBody, SS.titleRadio]}>정산조건</Text>
            </View>
            <View style={S.options}>
              <View style={S.optionCheck}>
                <RadioButton
                  value="UF 시스템"
                  status={'checked'}
                  onPress={() => {}}
                />
                <Text style={S.labelCheck}>UF 시스템</Text>
              </View>
            </View>
          </View>
          <View style={S.bodyCard}>
            <View style={S.titleBody}>
              <Text style={[[S.textTitleBody, SS.titleRadio]]}>정산조건</Text>
            </View>
            <View style={S.options}>
              <View style={S.optionCheck}>
                <RadioButton
                  value="UF 책임형"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checked: 'first' });
                  }}
                />
                <Text style={S.labelCheck}>UF 책임형</Text>
              </View>
              <View style={S.optionCheck}>
                <RadioButton
                  value="보증금"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checked: 'second' });
                  }}
                />
                <Text style={S.labelCheck}>보증금</Text>
              </View>
              <View style={S.optionCheck}>
                <RadioButton
                  value="보증보험"
                  status={checked === 'three' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checked: 'three' });
                  }}
                />
                <Text style={S.labelCheck}>보증보험</Text>
              </View>
            </View>
          </View>
          <View style={S.bodyCard}>
            <View style={S.titleBody}>
              <Text style={S.textTitleBody}>거래조건</Text>
            </View>
            <View style>
              <Select
                data={dataSelect}
                labelSelected="계약기간"
                colorLabel="#000000"
                valueProps={e => this.setState({ term: e })}
              />
              <Select
                data={dataSelect}
                labelSelected="정산단위"
                colorLabel="#000000"
                valueProps={e => this.setState({ settlement: e })}
              />
              <Select
                data={dataSelect}
                labelSelected="마감기준"
                colorLabel="#000000"
                valueProps={e => this.setState({ deadline: e })}
              />
            </View>
          </View>

          <View style={[S.bodyCard, S.mrBottom0]}>
            <View style={S.titleBody}>
              <Text style={[S.textTitleBody, SS.titleRadio]}>청구조건</Text>
            </View>
            <View style={S.options}>
              <View style={S.optionCheck}>
                <RadioButton
                  value="UF 에스크로"
                  status={'checked'}
                  onPress={() => {}}
                />
                <Text style={S.labelCheck}>UF 에스크로</Text>
              </View>
            </View>
          </View>

          <View style={[S.footerRegister, S.footerIntro]}>
            <TouchableOpacity
              onPress={() => {
                this.navigation.navigate('RegisterWH');
                this.props.dataAction(this.state);
              }}
              style={[
                S.btnSubmit,
                this.state.checked ? S.activeBtnSubmit : null,
              ]}
              disabled={this.state.checked ? false : true}>
              <Text
                style={[
                  S.textSubmit,
                  this.state.checked ? S.textActiveSubmit : null,
                ]}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
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
    imageStore: state.registerWH.imageData,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    dataAction: action => {
      dispatch(ActionCreator.ContractConditions(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterContractConditions);
