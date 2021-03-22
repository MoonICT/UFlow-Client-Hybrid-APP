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
import { Term, Terms } from '@Services/apis';
import HTML from 'react-native-render-html';

import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

//---> Assets
class TermsScreen extends Component {
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
    let { terms, dataType, code, dataContent, dataDefault } = this.state;
    // console.log('selectedValue', selectedValue);
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.BackAction onPress={() => this.navigation.goBack()} />
          <Appbar.Content
            title={getMsg(this.props.lang, 'ML0249', '이용약관')}
            color="rgba(0, 0, 0, 0.76)"
            style={S.appBarTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={S.content}>
            <View style={S.selectTerms}>
              <Select
                data={dataType}
                dataDefault={dataDefault && dataDefault}
                valueProps={e => {
                  this.setState({ code: e });
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              {dataContent && (
                <HTML
                  tagsStyles={{ p: { marginBottom: 0, marginTop: 0 } }}
                  source={{ html: dataContent }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    let codeParam = this.props.route.params && this.props.route.params.id;
    await Term.getTypeTerm()
      // await Terms.getTerms({code: '0001'})
      .then(res => {
        console.log('res=====>', res);
        if (res) {
          let data = res.map(el => {
            return {
              label: el.stdDetailCodeName,
              value: el.stdDetailCode,
            };
          });
          let dataDefault =
            data && data.find(el => el.value === codeParam);
          this.setState({ dataType: data, dataDefault:dataDefault });
        }
      })
      .catch(err => {
        console.log('errTerm', err);
      });

    await Term.getCodeTerm({ code: codeParam })
      // await Terms.getTerms({code: '0001'})
      .then(res => {
        console.log('resCode=====>', res);
        if (res) {
          let data = res.contents;
          this.setState({ dataContent: data });
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
      Term.getCodeTerm({ code: this.state.code })
        .then(res => {
          if (res) {
            let data = res.contents;
            this.setState({ dataContent: data });
          }
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
)(TermsScreen);
