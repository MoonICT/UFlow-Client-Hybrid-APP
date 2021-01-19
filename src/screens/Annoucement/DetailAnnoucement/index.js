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
  useWindowDimensions,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import { WebView } from 'react-native-webview';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from '../style';
import { Annoucement } from '@Services/apis';
import HTML from 'react-native-render-html';

class RegisterInfo extends Component {
  constructor(props) {
    super(props);
    // this.webView = null;
    this.state = { isSwitchOn: false };

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
    const { route } = this.props;
    const { data } = this.state;
    console.log('data -> ', data);

    let contentDetail = route?.params?.annoucementDetails;

    let title = contentDetail?.title;
    let date = contentDetail?.createdDate;
    let field1 = contentDetail?.fileName1;
    let field2 = contentDetail?.fileName2;
    let field3 = contentDetail?.fileName3;
    let field4 = contentDetail?.fileName4;
    let field5 = contentDetail?.fileName5;
    return (
      <SafeAreaView style={S.container}>
        {/* <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="공지사항"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars> */}
          <HistoryBackActionBar
            title={'공지사항'}
            navigation={this.navigation}
          />
        <ScrollView>
          <View style={S.bodyView}>
            <Text style={DefaultStyle.titleItem}>{data && data.title}</Text>
            <Text style={DefaultStyle.contentItem}>
              {data && data.createdDate}
            </Text>
            <View style={S.content}>
              <View style={{ flex: 1 }}>
                <HTML
                  tagsStyles={{p: { marginBottom: 0, marginTop: 0 }}}
                  source={{ html:(data && data.content) ? data.content : 'empty content' }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    let idProps =
      this.props.route && this.props.route.params.annoucementDetails.id;
    Annoucement.getListAnnoucement(idProps)
      .then(res => {
        console.log('::::: Annoucement Detail :::::', res);
        if (res.status === 200) {
          this.setState({
            data: res.data,
          });
            console.log('data =>>>', data)
        }
      })
      .catch(err => {
        console.log('err', err);
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
