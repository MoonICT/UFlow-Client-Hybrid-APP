import React, {Component, Fragment} from 'react';
import DefaultStyle from '@Styles/default';
import {TouchableOpacity, View} from "react-native";
import {Text} from "react-native-paper";
import {Contract} from '@Services/apis';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

class TenantRs00Keep extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completeContract: false,
      visible: false
    };
  }

  render() {
    /**
     * TENANT - RS00 - KEEP
     */

    const warehouseRegNo = this.props.warehouseRegNo;
    const warehSeq = this.props.warehSeq;
    const rentUserNo = this.props.rentUserNo;
    const type = this.props.type;
    const typeWH = this.props.typeWH;
    const status = this.props.status;
    const data = this.props.data;
    const calUnitDvCodes = this.props.calUnitDvCodes;
    const calStdDvCodes = this.props.calStdDvCodes;

    return <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
      <View style={DefaultStyle._listBtn}>
        <TouchableOpacity
          style={[DefaultStyle._btnOutline, DefaultStyle._btnLeft]}
          onPress={() => {
            this.navigation.navigate('ResponseQuotation', {
              typeWH,
              warehouseRegNo,
              warehSeq,
              rentUserNo,
              status,
              type,
            });
          }}>
          <Text style={DefaultStyle._textButton}>견적 재요청</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[DefaultStyle._btnInline, DefaultStyle._btnRight]}
          onPress={
            () => {
              console.log('계약요청 버튼 클릭')
              this.setState({visible: true});
            }}>
          <Text
            style={[
              DefaultStyle._textButton,
              DefaultStyle._textInline,
            ]}>
            계약 요청
          </Text>
        </TouchableOpacity>
      </View>
      <Dialog
        style={DefaultStyle.popup}
        visible={this.state.visible}
        onDismiss={() => {
          this.setState({visible: false});
        }}>
        <Dialog.Title style={DefaultStyle._titleDialog}>
          계약 요청
        </Dialog.Title>
        <Dialog.Content>
          견적 금액을 확정하고 계약을 요청하시겠습니까?
        </Dialog.Content>
        <Dialog.Actions style={DefaultStyle._buttonPopup}>
          <Button
            style={DefaultStyle._buttonElement}
            onPress={()=>{
              Contract.createKeep({
                idWarehouse: warehouseRegNo,
                mgmtTrustSeq: warehSeq,
                rentUserNo: rentUserNo
              }).then((res) => {
                if (res.status === 200) {
                  this.setState({
                    completeContract: true
                  });
                  alert('계약 요청이 완료되었습니다.');
                } else {
                  alert('계약 요청이 실패하였습니다.');
                }
              }).catch(error => {
                alert('createKeep:' + error);
              });
            }}>
            확인
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  componentDidMount() {

  }
}

export default TenantRs00Keep;
