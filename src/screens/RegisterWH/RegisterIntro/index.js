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
import {
  Appbar,
  Searchbar,
  Text,
  List,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import { styles as S } from '../style';
import { styles as SS } from './style';
import { Warehouse } from '@Services/apis';
import Postcode from 'react-native-daum-postcode';

class RegisterIntro extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      name: props.dataIntro && props.dataIntro.name ? props.dataIntro.name : '',
      description:
        props.dataIntro && props.dataIntro.description
          ? props.dataIntro.description
          : '',
      address: {
        zipNo: '',
        sidoName: '',
        skkCd: '',
        skkName: '',
        bjdongCd: '',
        bjdongName: '',
        hjdongCd: '',
        hjdongName: '',
        roadNmCd: '',
        address: '',
        detail: '',
      },
      roadAddr: {
        zipNo: '',
        address: '',
        detail: '',
      },
      gps:
        props.dataIntro && props.dataIntro.gps
          ? props.dataIntro.gps
          : {
              latitude: 0,
              longitude: 0,
            },
      isActive: false,
      visible: false,
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
  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });
  _addImage = () => console.log('_addImage');
  _removeImage = () => console.log('_removeImage');

  onChangeTitle = textTitle => {
    this.setState({ textTitle });
    console.log('textTitle', textTitle);
  };
  onChangeLocation = textLocation => {
    this.setState({ textLocation });
    console.log('textLoca', textLocation);
  };
  onChangeLogistic = e => {
    let addressUpdate = this.state.address;
    let roadUpdate = this.state.roadAddr;
    addressUpdate.detail = e;
    roadUpdate.detail = e;
    this.setState({ address: addressUpdate, roadAddr: roadUpdate });
  };

  render() {
    const { route, dataIntro } = this.props;
    const {
      name,
      description,
      gps,
      address,
      roadAddr,
      listSearch,
    } = this.state;

    let isActive;
    if (name !== '' && description !== '') {
      isActive = true;
    }
    console.log('listSearch', this.state);
    console.log('dataIntro', dataIntro);
    // console.log('this.state', this.state);
    // console.log('this.state.value', this.state.value);
    return (
      <SafeAreaView style={DefaultStyle._container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="창고 소개"
            color="black"
            fontSize="12"
            titleStyle={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView style={DefaultStyle.backgroundGray}>
          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleBody}>
              <Text style={DefaultStyle._textTitleBody}>
                {route && route.params.type === 'ModifyWH' ? '제목' : '창고명'}
                <Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <TextInput
              style={SS.inputIntro}
              multiline={true}
              numberOfLines={2}
              // onChangeText={text => this.onChangeTitle(text)}
              onChangeText={e => this.setState({ name: e })}
              value={this.state.name}
              placeholder={'예)신논혁역 도보 5분 거리, 깨끗한 창고입니다.'}
            />
          </View>

          <View style={DefaultStyle._cards}>
            <View style={DefaultStyle._titleBody}>
              <Text style={DefaultStyle._textTitleBody}>
                창고 소개<Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <TextInput
              style={SS.inputIntro}
              multiline={true}
              numberOfLines={4}
              // onChangeText={text => this.onChangeIntro(text)}
              value={this.state.description}
              onChangeText={e => this.setState({ description: e })}
              placeholder={`상세 설명 작성 주의사항

  - 창고 정보와 관련없는 홍보성 정보는 입력하실 수 없습니다. (홈페이지 주소, 블로그, SNS, 메신저ID, 전화번호, 이메일 등)
  - 중개수수료를 언급한 내용은 입력할 수 없습니다. (중개수수료 무료, 공짜, 반값 등)

  * 주의사항 위반시 허위정보로 간주되어 게시물 삭제 및 이용의 제한이 있을 수 있습니다.
  * 유플로우의 창고 등록 규정에 위반되는 금칙어는 등록이 블가합니다. `}
            />
          </View>

          <View style={DefaultStyle._body}>
            <View style={DefaultStyle._titleBody}>
              <Text style={DefaultStyle._textTitleBody}>
                위치<Text style={S.textNote}>*</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={this._showDialog}>
              <Searchbar
                inputStyle={S.searchRegister}
                placeholder="예)번동10-1, 강북구 번동"
                editable={false}
                selectTextOnFocus={false}
                onChangeText={query => {
                  this.setState({ firstQuery: query });
                }}
                value={this.state.firstQuery}
              />
            </TouchableOpacity>
            <TextInput
              style={[SS.inputIntro, SS.inputLoction]}
              onChangeText={text => this.onChangeLocation(text)}
              value={this.state.textIntro}
              placeholder={'인천광역시 중구 서해대로94번길 100'}
            />
            <TextInput
              style={[SS.inputIntro, SS.inputLoction]}
              onChangeText={text => this.onChangeLogistic(text)}
              value={this.state.textIntro}
              placeholder={'에이씨티앤코아물류'}
            />
          </View>

          <View style={[DefaultStyle._bodyCard, DefaultStyle.footerRegister]}>
            <TouchableOpacity
              disabled={isActive === true ? false : true}
              onPress={() => {
                this.navigation.navigate('RegisterWH', { completeIntro: true });
                this.props.updateInfo({
                  name,
                  description,
                  gps,
                  address,
                  roadAddr,
                });
              }}
              style={[
                DefaultStyle.btnSubmit,
                isActive === true ? DefaultStyle.activeBtnSubmit : '',
              ]}
              // disabled={imageStore.length > 2 ? false : true}
            >
              <Text
                style={[
                  DefaultStyle.textSubmit,
                  isActive === true ? DefaultStyle.textActiveSubmit : '',
                ]}>
                확인
              </Text>
            </TouchableOpacity>
          </View>

          <Portal>
            <Dialog
              style={DefaultStyle._postCode}
              visible={this.state.visible}
              onDismiss={this._hideDialog}>
              <Dialog.Content style={DefaultStyle._postCodeContent}>
                <Postcode
                  style={DefaultStyle._postCodeContent}
                  jsOptions={{ animated: true }}
                  onSelected={data => {
                    // alert(JSON.stringify(data));
                    console.log('data :>> ', data);
                    let firstQuery = data.address;
                    console.log('query :>> ', firstQuery);
                    let address = {
                      zipNo: data.zonecode,
                      sidoName: data.sido,
                      skkCd: '',
                      skkName: data.sigungu,
                      bjdongCd: data.sigunguCode,
                      bjdongName: data.bname,
                      hjdongCd: '',
                      hjdongName: data.bname2,
                      roadNmCd: data.roadnameCode,
                      address: data.address,
                    };
                    let roadAddr = {
                      zipNo: data.zonecode,
                      address: data.address,
                    };
                    this.setState({
                      firstQuery: firstQuery,
                      address,
                      roadAddr,
                    });
                    this._hideDialog();
                  }}
                />
              </Dialog.Content>
            </Dialog>
          </Portal>
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
    console.log('::prevState.firstQuery::', prevState.firstQuery);
    console.log('::this.state.firstQuery::', this.state.firstQuery);
    if (prevState.firstQuery !== this.state.firstQuery) {
      Warehouse.searchAddressKakao({ query: this.state.firstQuery })
        .then(res => {
          console.log('resIntroWH', res);
          if (res.status === 200) {
            let data = res.data.documents[0];
            let gps = {
              latitude: data.x,
              longitude: data.y,
            };
            this.setState({ gps });
            // this.props.quotationData(res.data);
          }
        })
        .catch(err => {
          console.log('errIntroWH', err);
        });
    }
  }
}

/** map state with store states redux store */
function mapStateToProps(state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    // count: state.home.count,
    dataIntro: state.registerWH,
  };
}

/** dispatch action to redux */
function mapDispatchToProps(dispatch) {
  return {
    updateInfo: action => {
      dispatch(ActionCreator.updateInfo(action));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterIntro);
