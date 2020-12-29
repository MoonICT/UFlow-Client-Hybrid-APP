/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from '../style';

class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { isSwitchOn: false };

    this.navigation = props.navigation;
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    console.log('::componentWillUnmount::');
  }

  render() {
    const { route } = this.props;
    console.log('route -> ', route);

    let contentDetail = route.params.annoucementDetails;
    
    let title = contentDetail.title;
    let date = contentDetail.createdDate;
    let field1 = contentDetail.fileName1;
    let field2 = contentDetail.fileName2;
    let field3 = contentDetail.fileName3;
    let field4 = contentDetail.fileName4;
    let field5 = contentDetail.fileName5;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 위치"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={S.bodyView}>
            <Text style={DefaultStyle.titleItem}>{title}</Text>
            <Text style={DefaultStyle.contentItem}>{date}</Text>
            <View style={S.content}>
              <Text style={S.textContent}>{field1}</Text>
              <Text style={S.textContent}>{field2}</Text>
              <Text style={S.textContent}>{field3}</Text>
              <Text style={S.textContent}>{field4}</Text>
              <Text style={S.textContent}>{field5}</Text>
            </View>
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
    imageStore: state.registerWH.pimages,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    registerAction: action => {
      dispatch(ActionCreator.uploadImage(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterInfo);
