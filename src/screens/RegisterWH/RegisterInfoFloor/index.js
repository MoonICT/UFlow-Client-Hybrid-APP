/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  TextInput,
  Appbar,
  Checkbox,
  Text,
  Switch,
  IconButton,
} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import Carousel from '@Components/organisms/Carousel';
import CarouselSnap from '@Components/organisms/CarouselSnap';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Form from './form';
class RegisterInfoFloor extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      isSwitchOn: false,
      numberSlide: 0,
      floors:
        props.dataInfoFloor && props.dataInfoFloor.floors
          ? props.dataInfoFloor.floors
          : [
              {
                flrDvCode: 'F1',
                flrArea: '',
                opcArea: '',
                parkArea: '',
                cmnArea: '',
                efctvHi: '',
                dockQty: '',
                prvtArea: '',
              },
            ],
    };

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

  _addForm = valueTab => {

    let list = this.state.floors;

    list.push({
      flrDvCode: 'F1',
      flrArea: '',
      opcArea: '',
      parkArea: '',
      cmnArea: '',
      efctvHi: '',
      dockQty: '',
      prvtArea: '',
    });

    this.setState({ floors: list });
  };
  _removeImage = () => console.log('_removeImage');

  onToggleSwitch = () => this.setState({ isSwitchOn: !this.state.isSwitchOn });
  _renderItem = ({ item }) => {
    return (
      <Form
        valueTab={this.state.valueTab}
        number={this.state.numberSlide}
        key={item.key}
        formData={this.state.floors[this.state.numberSlide]}
        valueForm={e => {
          let index = this.state.numberSlide;
          this.setState({
            ...(this.state.floors[index] = e),
          });
        }}
      />
    );
  };
  render() {
    const { imageStore, dataInfoFloor } = this.props;
    const { floors } = this.state;
    // console.log('this.state.value', this.state.value);
    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="층별 상세 정보"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={[S.bodyCard, SS.bodyInfoFloor]}>
            <View style={S.titleBody}>
              <Text style={S.textTitleBody}>층별 상세 정보</Text>
              <View style={S.rightTitle}>
                <TouchableOpacity
                  style={S.btnAdd}
                  onPress={() => this._addForm()}>
                  <Text style={DefaultStyle._textButton}>추가</Text>
                </TouchableOpacity>
                <IconButton
                  style={S.btnIcon}
                  icon="delete"
                  onPress={() => console.log('remove')}
                />
              </View>
            </View>
            <Carousel
              // style={styles.carousel}
              custom={{
                data: floors,
                renderItem: this._renderItem,
                showNextButton: false,
                showDoneButton: false,
                onSlideChange: e => {
                  this.setState({ numberSlide: e });
                },
                dotStyle: {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  width: 8,
                  height: 8,
                  marginTop: 100,
                },
                activeDotStyle: {
                  backgroundColor: 'rgba(0, 0, 0, 0.54)',
                  width: 8,
                  height: 8,
                  marginTop: 100,
                },
              }}
            />
          </View>
          <View style={[DefaultStyle._bodyCard, DefaultStyle.footerRegister]}>
            <TouchableOpacity
              onPress={() => {
                this.navigation.navigate('RegisterWH');
                this.props.updateInfo({
                  floors: floors,
                });
              }}
              style={[
                DefaultStyle.btnSubmit,
                imageStore.length > 2 ? DefaultStyle.activeBtnSubmit : null,
              ]}
              // disabled={imageStore.length > 2 ? false : true}
            >
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  imageStore.length > 2 ? DefaultStyle.textActiveSubmit : null,
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
    imageStore: state.registerWH.pimages,
    dataInfoFloor: state.registerWH,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    updateInfo: action => {
      dispatch(ActionCreator.updateInfo(action));
    },
    removeAction: action => {
      dispatch(ActionCreator.removeImage(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterInfoFloor);
