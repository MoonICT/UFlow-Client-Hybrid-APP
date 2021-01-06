/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Card, Checkbox, Text, Button, IconButton } from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// Local Imports
import DefaultStyle from '@Styles/default';
import Select from '@Components/organisms/Select';
import TextField from '@Components/organisms/TextField';

import ActionCreator from '@Actions';
import ignore2 from '@Assets/images/ignore2x.png';
import ignore1 from '@Assets/images/ignore.png';
import ignore3 from '@Assets/images/ignore3x.png';
import { styles as S } from '../style';
import { styles as SS } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

class FormTrusts extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      title: 'Profile Photo',
      confirm: false,
      value: 1,
      dataForm: [
        {
          // id: 0,
          typeCode: '',
          calUnitDvCode: '',
          calculationStandard: '',
          exclusiveArea: '',
          exclusiveArea2: '',
          commonArea: '',
          commonArea2: '',
          rentalArea: '',
          rentalArea2: '',
          storagePeriod: '',
          storageUnitPrice: '',
          managementUnitCost: '',
          managementUnitCost2: '',
          remark: '',
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

  onChangeText = () => console.log('_addImage');
  _removeImage = () => console.log('_removeImage');

  render() {
    const { data, valueTab, number, valueForm, formData } = this.props;
    const { dataForm, commonAreaState, commonAreaState2 } = this.state;
    const dataSelect = [
      {
        label: '냉동',
        value: '0001',
      },
      {
        label: '냉장',
        value: '0002',
      },
      {
        label: '상온',
        value: '0003',
      },
      {
        label: '위험물',
        value: '0004',
      },
      {
        label: '기타',
        value: '9100',
      },
    ];

    const settlement = [
      {
        label: '제곱미터(㎡)',
        value: 'CU01',
      },
      {
        label: '평',
        value: 'CU02',
      },
      {
        label: '파렛트',
        value: 'CU03',
      },
      {
        label: '중량',
        value: 'CU04',
      },
      {
        label: 'BOX',
        value: 'CU05',
      },
      {
        label: 'PCS',
        value: 'CU06',
      },
      {
        label: 'CBM',
        value: 'CU07',
      },
      {
        label: '명수',
        value: 'CU08',
      },
      {
        label: '건수',
        value: 'CU09',
      },
      {
        label: '횟수',
        value: 'CU010',
      },
      {
        label: '일수',
        value: 'CU011',
      },
      {
        label: '월수',
        value: 'CU011',
      },
    ];
    const calculation = [
      {
        label: '회',
        value: 'CS01',
      },
      {
        label: '건',
        value: 'CS02',
      },
      {
        label: '일',
        value: 'CS03',
      },
      {
        label: '월',
        value: 'CS04',
      },
      {
        label: '분기',
        value: 'CS05',
      },
      {
        label: '반기',
        value: 'CS06',
      },
      {
        label: '연',
        value: 'CS07',
      },
    ];
    const time = [
      {
        label: '회',
        value: '회',
      },
      {
        label: '회2',
        value: '회2',
      },
    ];
    const storage = [
      {
        label: '2020.10.10 - 2021.10.10',
        value: '2020.10.10 - 2021.10.10',
      },
      {
        label: '2020.10.10 - 2021.10.10 2',
        value: '2020.10.10 - 2021.10.10 2',
      },
    ];

    const costs = [
      {
        label: '일반관리비',
        value: '일반관리비',
      },
      {
        label: '일반관리비 2',
        value: '일반관리비 2',
      },
    ];
    // let commonA = parseInt(commonAreaState) * 2;
    // console.log('commonAreaState2 :>> ', commonAreaState2);

    return (
      <Card style={S.cards}>
        <View style>
          <Select
            data={dataSelect}
            labelSelected="보관유형"
            selectedValue={formData.typeCode}
            valueProps={e => {
              let dataF = formData;
              dataF.typeCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={settlement}
            labelSelected="정산단위"
            selectedValue={formData.calUnitDvCode}
            valueProps={e => {
              // this.setState({ calUnitDvCode: e })
              let dataF = formData;
              dataF.calUnitDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <Select
            data={time}
            labelSelected="산정기준"
            selectedValue={formData.calStdDvCode}
            valueProps={e => {
              // this.setState({ calculationStandard: e });
              let dataF = formData;
              dataF.calStdDvCode = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="수탁 가능 기간"
            placeholder="YYYY.MM.DD"
            valueProps={e => {
              // this.setState({ usblYmdFrom: e });
              let d = new Date(e).getTime();
              let dataF = formData;
              dataF.usblYmdFrom = d;
              valueForm && valueForm(dataF);
              this.setState({ usblYmdFrom: d });
            }}
          />
          <TextField
            labelTextField="수탁 가능 기간"
            placeholder="YYYY.MM.DD"
            valueProps={e => {
              let d = new Date(e).getTime();
              let dataF = formData;
              dataF.usblYmdTo = d;
              valueForm && valueForm(dataF);
              this.setState({ usblYmdTo: d });
            }}
          />
          {/**    <View style={DefaultStyle._listElement}>
            <View style={[DefaultStyle._element, { marginRight: 12 }]}>
              <TextField
                labelTextField="전용면적"
                textRight="평"
                valueProps={e => console.log('e', e)}
              />
            </View>
            <IconButton
              style={{ marginBottom: 15 }}
              size={25}
              icon="plus-circle-outline"
              color={'rgba(0, 0, 0, 0.54)'}
              onPress={() => console.log('add')}
            />
          </View>  */}
          <TextField
            labelTextField="보관단가"
            textRight="개"
            value={formData.splyAmount}
            defaultValue="1000"
            valueProps={e => {
              this.setState({ splyAmount: e });
              let dataF = formData;
              dataF.splyAmount = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="입고단가"
            textRight="원"
            defaultValue="1000"
            value={formData.whinChrg}
            valueProps={e => {
              this.setState({ whinChrg: e });
              let dataF = formData;
              dataF.whinChrg = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="출고단가"
            textRight="원"
            defaultValue="1000"
            value={formData.whinChrg}
            valueProps={e => {
              this.setState({ whoutChrg: e });
              let dataF = formData;
              dataF.whinChrg = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="인건단가 (선택)"
            textRight="원"
            value={formData.psnChrg}
            valueProps={e => {
              this.setState({ psnChrg: e });
              let dataF = formData;
              dataF.psnChrg = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="가공단가 (선택)"
            value={formData.mnfctChrg}
            textRight="원"
            valueProps={e => {
              this.setState({ mnfctChrg: e });
              let dataF = formData;
              dataF.mnfctChrg = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="택배단가 (선택)"
            textRight="원"
            value={formData.dlvyChrg}
            valueProps={e => {
              this.setState({ dlvyChrg: e });
              let dataF = formData;
              dataF.dlvyChrg = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField
            labelTextField="운송단가 (선택)"
            textRight="원"
            value={formData.shipChrg}
            valueProps={e => {
              this.setState({ shipChrg: e });
              let dataF = formData;
              dataF.shipChrg = e;
              valueForm && valueForm(dataF);
            }}
          />
          <TextField labelTextField="기타" />

          <TextField
            labelTextField="비고"
            value={formData.remark}
            valueProps={e => {
              this.setState({ remark: e });
              let dataF = formData;
              dataF.remark = e;
              valueForm && valueForm(dataF);
            }}
          />
        </View>
      </Card>
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
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormTrusts);
