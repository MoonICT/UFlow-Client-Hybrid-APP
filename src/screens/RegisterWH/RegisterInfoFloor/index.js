/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  Dimensions,
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
import { MyPage } from '@Services/apis';

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
                // flrDvCode: 'F1',
                // flrArea: '',
                // parkArea: '',
                // opcArea: '',
                // prvtArea: '',
                // cmnArea: '',
                // flrHi: '',
                // efctvHi: '',
                // aprchMthdDvCode: '',
                // dockQty: '',
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
    //console.log('//::componentWillUnmount::');
  }

  goToSlider = index => {
    console.log(index, 'goToSlider');
    this.slider.goTo(index);
  };

  _addForm = () => {
    let list = this.state.floors;
    list.push({});
    console.log(list.length, 'list.length 1111');
    this.setState({ floors: list, numberSlide: list.length - 1 });
    setTimeout(() => {
      this.goToSlider(list.length - 1);
    }, 100);
  };
  _removeForm = () => {
    let listFloors = this.state.floors;
    let numberSlide = this.state.numberSlide;
    let slideStart = numberSlide > 0 ? numberSlide - 1 : 0;
    let filterFloors =
      listFloors && listFloors.filter(item => item !== listFloors[slideStart]);

    this.setState({
      floors: filterFloors ? filterFloors : [],
      numberSlide: slideStart,
    });
    setTimeout(() => {
      this.goToSlider(slideStart);
    }, 100);
  };

  onToggleSwitch = () => this.setState({ isSwitchOn: !this.state.isSwitchOn });
  _renderItem = ({ item }) => {
    return (
      <Form
        flrDvCodes={this.state.flrDvCodes}
        aprchMthdDvCodes={this.state.aprchMthdDvCodes}
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
    const { dataInfoFloor } = this.props;
    const { floors } = this.state;

    console.log('dataInfoFloor', dataInfoFloor);
    // console.log('floors', floors);
    let isSubmitUpdate = true;
    // let filterflrArea = floors && floors.filter(item => item.flrArea === '');
    // let filterparkArea = floors && floors.filter(item => item.parkArea === '');
    // let filteropcArea = floors && floors.filter(item => item.opcArea === '');
    // let filtercmnArea = floors && floors.filter(item => item.cmnArea === '');
    // let filterflrHi = floors && floors.filter(item => item.flrHi === '');
    // let filterefctvHi = floors && floors.filter(item => item.efctvHi === '');
    // let filteraprchMthdDvCode =
    //   floors && floors.filter(item => item.aprchMthdDvCode === '');
    // let filterdockQty = floors && floors.filter(item => item.dockQty === '');
    // if (
    //   filterflrArea.length === 0 &&
    //   filterparkArea.length === 0 &&
    //   filteropcArea.length === 0 &&
    //   filtercmnArea.length === 0 &&
    //   filterflrHi.length === 0 &&
    //   filterefctvHi.length === 0 &&
    //   filteraprchMthdDvCode.length === 0 &&
    //   filterdockQty.length === 0
    // ) {
    //   isSubmitUpdate = true;
    // }
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
          <View style={{ backgroundColor: '#ffffff' }}>
            <View
              style={[
                {
                  paddingLeft: 16,
                  paddingRight: 16,
                  marginBottom: !floors || floors.length === 0 ? 60 : 0,
                },
              ]}>
              <View style={S.titleBody}>
                <Text style={S.textTitleBody}>
                  층별 상세 정보
                  {this.state.floors.length > 0 && (
                    <Text style={{ color: '#777777' }}>
                      {' '}
                      ({this.state.numberSlide + 1}/{this.state.floors.length})
                    </Text>
                  )}
                </Text>
                <View style={S.rightTitle}>
                  <TouchableOpacity
                    style={S.btnAdd}
                    onPress={() => {
                      // console.log('추가');
                      this._addForm();
                    }}>
                    <Text style={DefaultStyle._textButton}>추가</Text>
                  </TouchableOpacity>
                  <IconButton
                    style={S.btnIcon}
                    icon="delete"
                    onPress={() => this._removeForm()}
                  />
                </View>
              </View>
            </View>

            <View style={[S.bodyCard, SS.bodyInfoFloor]}>
              <Carousel
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
                ref={ref => (this.slider = ref)}
              />
            </View>
            {floors && floors.length > 0 && (
              <View
                style={[DefaultStyle._bodyCard, DefaultStyle.footerRegister]}>
                <TouchableOpacity
                  disabled={isSubmitUpdate === true ? false : true}
                  onPress={() => {
                    this.navigation.navigate('RegisterWH', {
                      completeFloor: true,
                    });
                    this.props.updateInfo({
                      floors: floors,
                    });
                  }}
                  style={[
                    DefaultStyle.btnSubmit,
                    isSubmitUpdate === true
                      ? DefaultStyle.activeBtnSubmit
                      : null,
                  ]}
                  // disabled={isSubmitUpdate === true ? false : true}
                >
                  <Text
                    style={[
                      DefaultStyle.textSubmit,
                      isSubmitUpdate === true
                        ? DefaultStyle.textActiveSubmit
                        : null,
                    ]}>
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /** when after render DOM */
  async componentDidMount() {
    await MyPage.getDetailCodes('WHRG0010')
      .then(res => {
        if (res.status === 200) {
          let data = res.data._embedded.detailCodes;
          let flrDvCodes =
            data &&
            data.map((item, index) => {
              return {
                label: item.stdDetailCodeName,
                value: item.stdDetailCode,
              };
            });
          this.setState({ flrDvCodes });
        }
      })
      .catch(err => {
        console.log('errflrDvCodes', err);
      });
    await MyPage.getDetailCodes('WHRG0011')
      .then(res => {
        if (res.status === 200) {
          let data = res.data._embedded.detailCodes;
          let aprchMthdDvCodes =
            data &&
            data.map((item, index) => {
              return {
                label: item.stdDetailCodeName,
                value: item.stdDetailCode,
              };
            });
          this.setState({ aprchMthdDvCodes });
        }
      })
      .catch(err => {
        console.log('errINFO', err);
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
