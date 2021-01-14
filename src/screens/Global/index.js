/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 14:57:42
 * @modify date 2020-11-24 19:22:01
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';

// Local Imports
import DefaultStyle from '../../styles/default';
import { styles as S } from './style';
import ActionCreator from '@Actions';
import { Menu } from '@Services/apis';

//---> Components
import Popup from '@Components/organisms/Popup';
import { connect } from "react-redux";

class Global extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { children } = this.props;

    return (
      <SafeAreaView style={[DefaultStyle.container, S.container]}>
        <Popup />
        {children}
      </SafeAreaView>
    );
  }

  async componentDidMount () {
    // 번역 로드.
    const data = await Menu.localization({ language: 'ko-KR', });
    let resultObj = {}
    if (data && data.length > 0) {
      data.map(item => {
        Object.assign(resultObj, item);
      });
    }
    this.props.setLangData(resultObj);
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps :', state);
  return {
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    setLangData: status => {
      dispatch(ActionCreator.setLangData(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Global);
