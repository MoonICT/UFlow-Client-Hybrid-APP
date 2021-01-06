/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text, Dialog, Paragraph, Button } from 'react-native-paper';

// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import AppGrid from '@Components/organisms/AppGrid';
import Select from '@Components/organisms/Select';
import CardMypage from '@Components/organisms/CardMypage';
import TermsContract from './TermsContract';

import warehouse1 from '@Assets/images/warehouse-1.png';

import ActionCreator from '@Actions';

import card from '@Assets/images/card-img.png';
import { styles as S } from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Warehouse } from '@Services/apis';

class ContractInformation extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = { visible: false, visibleConfirm: false };
    this.navigation = props.navigation;
  }

  render() {
    const {
      status,
      warehouseRegNo,
      rentUserNo,
      warehSeq,
      type,
      warehouse,
      rentUser,
    } = this.props;
    let dataTable = [
      {
        type: '계약 요청일',
        value: '',
      },
      {
        type: '계약 승인일',
        value: '',
      },
      {
        type: '첨부 서류',
        value: '',
      },
    ];
    let viewComponent;
    switch (status) {
      case '1100':
        viewComponent = (
          <TouchableOpacity
            style={[
              DefaultStyle.btnSubmit,
              DefaultStyle.activeBtnSubmit,
              S.btnMess,
            ]}
            onPress={() =>
              this.navigation.navigate('Chatting', {
                warehouseRegNo,
                rentUserNo,
                warehSeq,
                type,
                warehouse,
                rentUser,
              })
            }>
            <Icon name="wechat" size={20} color="#fff" />
            <Text
              style={[
                DefaultStyle.textSubmit,
                DefaultStyle.textActiveSubmit,
                { paddingLeft: 10 },
              ]}>
              채팅 바로가기
            </Text>
          </TouchableOpacity>
        );
        break;

      case '2100':
        viewComponent = (
          <TermsContract
            status={status}
            warehouseRegNo={warehouseRegNo}
            rentUserNo={rentUserNo}
            warehSeq={warehSeq}
            type={type}
            warehouse={warehouse}
            rentUser={rentUser}
          />
        );
        break;

      case '4100':
        viewComponent = (
          <Fragment>
            <CardMypage
              onPressHeader={() => {}}
              headerTitle={'계약 정보'}
              data={dataTable}
              borderRow={false}
              styleLeft={DefaultStyle._leftTableCard}
              styleRight={DefaultStyle._rightTableCard}
              bgrImage={false}
            />
            <View
              style={[
                DefaultStyle._listBtn,
                { marginTop: 12, marginBottom: 8 },
              ]}>
              <TouchableOpacity
                style={[DefaultStyle._btnInline, DefaultStyle._btnLeft]}
                onPress={() => console.log('계약 요청 취소')}>
                <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>
                  전자계약
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
                onPress={() => this.navigation.navigate('StorageAgreement')}>
                <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>
                  오프라인 계약
                </Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        );
        break;
      case '5100':
        // code block
        break;
    }
    return <Fragment>{viewComponent}</Fragment>;
  }
}

export default ContractInformation;
