/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component, Fragment } from 'react';
import {
  View,
  TouchableOpacity,
  Platform, Linking,
} from 'react-native';
import { Appbar, Text, Dialog, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

// Local Imports
import DefaultStyle from '@Styles/default';
import CardMypage from '@Components/organisms/CardMypage';
import TermsContract from './TermsContract';
import { styles as S } from '../style';
import { Warehouse, Contract } from '@Services/apis';
import configURL from '@Services/http/ConfigURL';

class ContractInformation extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: false,
      visibleConfirm: false,
      isOnLineDialog: false,
      isOffLineDialog: false
    };

    // console.debug('견적 약관 detailEstimate : ', props.detailEstimate)
    // console.debug('견적 약관 keepTrustContract : ', props.keepTrustContract)

    this.navigation = props.navigation;
  }

  /**
   * 오프라인 견적 요청하기
   * */
  requestOffLineContract = () => {
    const { keepTrustContract } = this.props
    Contract.ozContractURl({
      type: this.props.contractType.toLowerCase(),
      warehouseRegNo: keepTrustContract.id.warehouseRegNo,
      cntrDvCd: keepTrustContract.id.cntrDvCode,
      cntrYmdFrom: moment(keepTrustContract.id.cntrYmdFrom).format('YYYYMMDD')
    }).then(res => {
      Linking.openURL(res.url);
    }).catch(error => {
      alert('requestOffLineContract:' + error);
    });
    this.setState({ isOffLineDialog: false });
  };

  render () {
    const {
      type, // owner || tenant
      contractType, // KEEP || TRUST

      detailEstimate,
      keepTrustContract,

      status,
      rentUserNo,
      warehSeq,
      thumbnail,
    } = this.props;
    let dataTable = [
      {
        type: '계약 요청일자',
        value: keepTrustContract.id.cntrYmdFrom,
      },
      {
        type: '계약 승인일자',
        value: keepTrustContract.cntrYmdTo,
      },
    ];
    if (type === 'owner') {
      dataTable.push({
        type: '첨부 서류',
        isImageLink: keepTrustContract?.entrpByOwner?.file2,
        fileName: keepTrustContract?.entrpByOwner?.file2 ? '통장 사본.jpg' : '-',
        value: keepTrustContract?.entrpByOwner?.file2 ? `${configURL.FILE_SERVER_ADDRESS}/${keepTrustContract?.entrpByOwner?.file2}` : '',
      });
    }

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
                warehouseRegNo: keepTrustContract.id.warehouseRegNo,
                rentUserNo,
                warehSeq,
                type,
                thumbnail,
                warehouse: detailEstimate.warehouse,
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
            navigation={this.navigation}
            route={this.props.route}
            detailEstimate={detailEstimate}
            keepTrustContract={keepTrustContract}
            dataTable={dataTable}
            type={type} // owner || tenant
            contractType={contractType} // KEEP || TRUST
            rentUserNo={rentUserNo}
            warehSeq={warehSeq}
            thumbnail={thumbnail}
          />
        );
        break;
      case '4100':
        viewComponent = (
          <Fragment>
            <CardMypage
              onPressHeader={() => {
              }}
              headerTitle={'계약 정보'}
              data={dataTable}
              borderRow={false} 정
              styleLeft={DefaultStyle._leftTableCard}
              styleRight={DefaultStyle._rightTableCard}
              bgrImage={false}
              rightHeader={<></>}
            />
            <View
              style={[
                DefaultStyle._listBtn,
                { marginTop: 12, marginBottom: Platform.OS === 'ios' ? 90 : 12 },
              ]}>

              {/*<TouchableOpacity*/}
              {/*  style={[DefaultStyle._btnInline, DefaultStyle._btnLeft]}*/}
              {/*  onPress={() => this.setState({ isOnLineDialog: !this.state.isOnLineDialog })}>*/}
              {/*  <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>*/}
              {/*    전자계약*/}
              {/*  </Text>*/}
              {/*</TouchableOpacity>*/}
              <TouchableOpacity
                style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
                onPress={() => this.setState({ isOffLineDialog: !this.state.isOffLineDialog })}>
                <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>
                  오프라인 계약서
                </Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        );
        break;
      case '5100':
        viewComponent = (
          <Fragment>
            <CardMypage
              onPressHeader={() => {
              }}
              headerTitle={'계약 정보'}
              data={dataTable}
              borderRow={false}
              styleLeft={DefaultStyle._leftTableCard}
              styleRight={DefaultStyle._rightTableCard}
              bgrImage={false}
              rightHeader={
                <TouchableOpacity onPress={() => this.requestOffLineContract()}
                                  style={[DefaultStyle._btnOutlineMuted,]}>
                  <Text>계약서 확인</Text>
                </TouchableOpacity>
              }
            />
            <View
              style={[
                DefaultStyle._listBtn,
                { marginTop: 12, marginBottom: Platform.OS === 'ios' ? 90 : 12 },
              ]}>
              {contractType === 'TRUST' &&
              <TouchableOpacity
                style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
                onPress={() => {
                  this.navigation.goBack();
                  // this.navigation.navigate('More', { to: '입･출고 관리', })
                }}>
                <Text style={[DefaultStyle._textButton, { color: '#ffffff' }]}>
                  {/*입･출고 관리*/}
                  목록으로
                </Text>
              </TouchableOpacity>}
            </View>
          </Fragment>
        );
        break;
    }
    return (
      <>
        {/* Body */}
        {viewComponent && <Fragment>{viewComponent}</Fragment>}

        {/** 전자 결제 확인 모달 */}
        <Dialog style={DefaultStyle.popup}
                visible={this.state.isOnLineDialog}
                onDismiss={() => this.setState({ isOnLineDialog: !this.state.isOnLineDialog })}>
          <Dialog.Title style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            전자 계약 요청
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              선택하신 계약 방식으로{'\n'}계약을 요청하시겠습니까?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement]}
              onPress={() => this.setState({ isOnLineDialog: false })}>
              <Text style={{ color: 'rgba(0, 0, 0, 0.54)' }}>취소</Text>
            </Button>
            <Button
              style={[DefaultStyle._buttonElement, { borderLeftWidth: 0, }]}
              onPress={() => {
                this.setState({ isOnLineDialog: false })
                alert('준비중입니다.');
              }}>확인</Button>
          </Dialog.Actions>
        </Dialog>

        {/** 오프라인 결제 확인 모달 */}
        <Dialog style={DefaultStyle.popup}
                visible={this.state.isOffLineDialog}
                onDismiss={() => this.setState({ isOffLineDialog: !this.state.isOffLineDialog })}>
          <Dialog.Title style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            오프라인 계약 요청
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              선택하신 계약 방식으로{'\n'}계약을 요청하시겠습니까?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={[DefaultStyle._buttonElement]}
              onPress={() => this.setState({ isOffLineDialog: false })}>
              <Text style={{ color: 'rgba(0, 0, 0, 0.54)' }}>취소</Text>
            </Button>
            <Button
              style={[DefaultStyle._buttonElement, { borderLeftWidth: 0, }]}
              onPress={this.requestOffLineContract}>확인</Button>
          </Dialog.Actions>
        </Dialog>
      </>
    );

  }
}

export default ContractInformation;
