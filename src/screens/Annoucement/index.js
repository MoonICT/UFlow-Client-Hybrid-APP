/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';

import { styles as S } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Annoucement } from '@Services/apis';

class RegisterWH extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      active: 0,
      checked: true,
      checked2: false,
      activeIndex: 0,
      annoucementList: [],
    };
    this.navigation = props.navigation;
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {
    const { annoucementList } = this.state;

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
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
        </Appbars>
        <ScrollView>
          {annoucementList &&
            annoucementList.length > 0 &&
            annoucementList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={DefaultStyle.btnItem}
                  onPress={() =>
                    this.navigation.navigate('DetailAnnoucement', {
                      annoucementDetails: item,
                    })
                  }>
                  <View style={DefaultStyle.leftItem}>
                    <Text style={DefaultStyle.titleItem}>{item.title}</Text>
                    <Text style={DefaultStyle.contentItem}>
                      {item.createdDate}
                    </Text>
                  </View>
                  <View style={DefaultStyle.rightItem}>
                    <Icon
                      name="arrow-forward-ios"
                      size={12}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    //console.log('//::componentWillUnmount::');
  }

  /** when after render DOM */
  async componentDidMount() {
    Annoucement.getListAnnoucement()
      .then(res => {
        console.log('::::: Annoucement :::::', res);
        if (res.status === 200) {
          let annoucementList = res.data._embedded.Notice;

          this.setState({
            annoucementList,
          });
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
    imageStore: state.registerWH.pimages,
    workComplete: state.registerWH.workComplete,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    // countUp: diff => {
    //   dispatch(ActionCreator.countUp(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterWH);
