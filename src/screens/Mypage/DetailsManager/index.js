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
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Appbar,
  Dialog,
  IconButton,
  Text,
  List,
  Button,
  Paragraph,
} from 'react-native-paper';
import Select from '@Components/organisms/Select';
import FilterButton from '@Components/atoms/FilterButton';

// Local Imports
import DefaultStyle from '@Styles/default';
// import TableInfo from '../TableInfo';
import TableInfo from '@Components/atoms/TableInfo';
import TextField from '@Components/organisms/TextField';

import Appbars from '@Components/organisms/AppBar';
import ActionCreator from '@Actions';
import Icon from 'react-native-vector-icons/Fontisto';

import { styles as S } from '../style';
import { styles as SS } from './style';

const dataStart = [
  {
    label: 'YYYY.MM.DD',
    value: 'YYYY.MM.DD',
  },
];
const dataEnd = [
  {
    label: 'YYYY.MM.DD',
    value: 'YYYY.MM.DD',
  },
  {
    label: 'YYYY.MM.DD2',
    value: 'YYYY.MM.DD2',
  },
];
const dataAll = [
  {
    label: '전체',
    value: '전체',
  },
  {
    label: '2전체',
    value: '2전체',
  },
];

const selectNumber = [
  {
    label: '10개씩 보기',
    value: '10개씩 보기',
  },
];
const selectRequest = [
  {
    label: '입고 요청',
    value: '입고 요청',
  },
];
const dataInfo = [
  {
    type: '창고명',
    value: '에이씨티앤코아물류',
  },
  {
    type: '창고주',
    value: '(주)에이씨티앤코아물류',
  },
  {
    type: '위치',
    value: '인천광역시 서구 석남동 650-31',
  },
  {
    type: '보관유형',
    value: '상온',
  },
  {
    type: '정산단위',
    value: '파렛트',
  },
  {
    type: '산정기준',
    value: '회',
  },
  {
    type: '물동량',
    value: '400',
  },
  {
    type: '수탁 기간',
    value: '2020.10.10 - 2021.10.10',
  },
  {
    type: '보관비',
    value: '5,000원',
  },
];
const dataProgress = [
  {
    type: '작성 일시',
    value: '2020.11.10 09:05:00',
  },
  {
    type: '작성자',
    value: '임차인(ID)',
  },
  {
    type: '구분',
    value: '입고 요청',
  },
  {
    type: '예정/ 확정 일시',
    value: '입고예정 : 2020.11.10 09:05:00',
  },
  {
    type: '입고량',
    value: '100',
  },
  {
    type: '출고량',
  },
  {
    type: '재고',
  },
  {
    type: '적용단가',
    value: '950/PLT',
  },
  {
    type: '입고비',
    value: '95,000원',
  },
  {
    type: '출고비',
  },
  {
    type: '보관비',
  },
];

const viewProgress = [
  {
    type: '작성 일시',
    value: '2020.11.10 09:05:00',
  },
  {
    type: '작성자',
    value: '임차인(ID)',
  },
  {
    type: '구분',
    value: '입고 요청',
  },
  {
    type: '예정/ 확정 일시',
    value: '입고예정 : 2020.11.10 09:05:00',
  },
  {
    type: '입고량',
    value: '100',
  },
  {
    type: '출고량',
  },
  {
    type: '재고',
  },
  {
    type: '적용단가',
    value: '950/PLT',
  },
  {
    type: '입고비',
    value: '95,000원',
  },
  {
    type: '출고비',
  },
  {
    type: '보관비',
  },
];
class DetailsManager extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      visible: false,
      confirm: false,
      isProgress: false,
      isCancel: false,
      cancelRequest: false,
      isToggle: false,
      receiptCancel: false,
    };

    this.navigation = props.navigation;
  }
  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });
  showConfirm = () => this.setState({ confirm: true });

  hideConfirm = () => this.setState({ confirm: false });
  render() {
    // const { imageStore } = this.props;
    const { route } = this.props;
    const { isProgress, isToggle, receiptCancel } = this.state;

    const processing =
      isProgress === true ? (
        <View style={DefaultStyle._bodyCard}>
          <Text style={SS.textBody}>등록한 입･출고 내역이 없습니다.</Text>
        </View>
      ) : (
        <Fragment>
          <TableInfo
            data={dataProgress}
            style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
          />
          <View style={[DefaultStyle._listBtn, SS.listBtnProcess]}>
            <TouchableOpacity
              onPress={() => {
                console.log('송장정보 확인');
              }}
              style={[
                DefaultStyle._btnOutline,
                DefaultStyle._btnLeft,
                SS.btnProcess,
              ]}>
              <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
                송장정보 확인
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isCancel: true });
              }}
              style={[
                DefaultStyle._btnOutline,
                DefaultStyle._btnRight,
                SS.btnProcess,
              ]}>
              <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
                입고요청 취소
              </Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      );

    return (
      <SafeAreaView style={S.container}>
        <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="마이페이지"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars>
        <ScrollView>
          <View style={[DefaultStyle._cards, DefaultStyle._margin0]}>
            <View style={DefaultStyle._titleCard}>
              <Text
                style={[
                  DefaultStyle._textTitleCard,
                  S.textTitleTenant,
                  { paddingBottom: 0 },
                ]}>
                입･출고 상세 내역
              </Text>
            </View>

            <View style={DefaultStyle._card}>
              <View style={DefaultStyle._headerCardTitle}>
                <View style={S.avatarHeader} />
              </View>
              <View style={DefaultStyle._infoTable}>
                <TableInfo data={dataInfo} />
              </View>
            </View>

            <View style={S.filter}>
              <View style={[DefaultStyle._listElement, { marginBottom: -10 }]}>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={dataStart} style={[S.select]} />
                </View>
                <Text style={S.hyphen}>-</Text>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={dataEnd} style={S.select} />
                </View>
              </View>
              <View style={[DefaultStyle._listElement, { marginBottom: -10 }]}>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={dataAll} style={S.select} />
                </View>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={selectNumber} style={S.select} />
                </View>
                <View style={[S.optionSelect, S.optionSelectLeft]}>
                  <Select data={selectRequest} style={S.select} />
                </View>
              </View>
            </View>

            <View style={[DefaultStyle._listBtn]}>
              <TouchableOpacity
                style={[
                  DefaultStyle._btnOutline,
                  { marginRight: 8, borderColor: 'rgba(19, 19, 20, 0.5)' },
                ]}>
                <Text style={[DefaultStyle._textButton, { color: '#000000' }]}>
                  엑셀 다운
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[DefaultStyle._btnInline, { marginRight: 8 }]}>
                <Text
                  style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                  입고요청
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.showDialog()}
                style={[
                  DefaultStyle._btnInline,
                  { backgroundColor: '#e64a19' },
                ]}>
                <Text
                  style={[DefaultStyle._textButton, DefaultStyle._textInline]}>
                  출고 요청
                </Text>
              </TouchableOpacity>
            </View>

            <View style={DefaultStyle._card}>
              <View
                style={[
                  DefaultStyle._headerCard,
                  DefaultStyle._borderBottom,
                ]}>
                <View
                  style={[DefaultStyle._titleCard, DefaultStyle._titleStatus]}>
                  <Text style={DefaultStyle._textTitleCard}>진행 상황</Text>
                  <Text style={DefaultStyle._statusProcessing}>
                    수탁 진행 중
                  </Text>
                </View>
                <View style={SS.totalFees}>
                  <Text style={SS.textTotalFees}>입･출고 료 합계</Text>
                  <Text style={SS.textTotal}>-원</Text>
                </View>
              </View>
              {processing}
            </View>

            <View style={SS.processing}>
              <FilterButton
                label="진행 내역 보기"
                onPress={() => this.setState({ isToggle: !isToggle })}
                isToggle={isToggle}
                style={SS.toggle}
                styleLabel={SS.textToggle}
              />
              {isToggle === true ? (
                receiptCancel === true ? (
                  <Fragment>
                    <TableInfo
                      data={viewProgress}
                      style={{ borderBottomWidth: 1, borderTopWidth: 0 }}
                    />
                    <View style={SS.footerCheckInfo}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ isCancel: true });
                        }}
                        style={[DefaultStyle._btnOutline, SS.btnProcess]}>
                        <Text
                          style={[
                            DefaultStyle._textButton,
                            { color: '#000000' },
                          ]}>
                          송장정보 확인
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Fragment>
                ) : (
                  <View style={DefaultStyle._bodyCard}>
                    <Text style={SS.textBody}>
                      등록한 입･출고 내역이 없습니다.
                    </Text>
                  </View>
                )
              ) : null}
            </View>
          </View>
        </ScrollView>

        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.visible}
          onDismiss={this.hideDialog}>
          <Dialog.Title style={[DefaultStyle._titleDialog, SS.popupHeader]}>
            입고정보 등록
          </Dialog.Title>
          <Dialog.Content>
            <View style={SS.bodyPopup}>
              <Text style={DefaultStyle._textTitleCard}>입고 예정일</Text>
              <Select data={dataStart} style={S.select} />
              <Select data={dataStart} style={S.select} />

              <Text style={DefaultStyle._textTitleCard}>
                입고 예정 파렛트 수량
              </Text>
              <TextField
                textRight="P"
                styleRight={{ top: 5 }}
                styleProps={SS.inputStyle}
              />
              <Text style={DefaultStyle._textTitleCard}>송장 등록하기</Text>
              <View style={SS.attachments}>
                <TouchableOpacity
                  style={[
                    DefaultStyle._btnOutline,
                    { borderColor: 'rgba(0, 0, 0, 0.5)', width: '100%' },
                  ]}>
                  <Text
                    style={[DefaultStyle._textButton, { color: '#000000' }]}>
                    엑셀 다운
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={SS.infoAttach}>
                <Text style={SS.textAttach}>20201111_파일명.jpg</Text>
                <IconButton
                  style={SS.btnRemove}
                  icon="close-circle"
                  size={16}
                  color="rgba(0, 0, 0, 0.54)"
                  onPress={() => console.log('remove')}
                />
              </View>
              <View style={SS.infoAttach}>
                <Text style={SS.textAttach}>20201111_파일명.jpg</Text>
                <IconButton
                  style={SS.btnRemove}
                  icon="close-circle"
                  size={16}
                  color="rgba(0, 0, 0, 0.54)"
                  onPress={() => console.log('remove')}
                />
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions style={SS.footerPopup}>
            <Button
              style={[SS.btnPopup]}
              color={'rgba(0, 0, 0, 0.54)'}
              onPress={this.hideDialog}>
              취소
            </Button>

            <Button
              style={SS.btnPopup}
              onPress={() => {
                this.showConfirm();
                this.hideDialog();
              }}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.confirm}
          onDismiss={this.hideConfirm}>
          <Dialog.Content>
            <View style={DefaultStyle.imagePopup} />
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            입고 요청 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              입고요청을 완료했습니다. 입출고내역에서 요청하신 내역을 확인해
              주세요.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() => {
                this.hideConfirm();
                this.setState({ isProgress: true });
              }}>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          visible={this.state.isCancel}
          onDismiss={() => this.setState({ isCancel: false })}>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, , DefaultStyle.titleDialog]}>
            입고 요청 취소
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              입고 요청을 취소하시겠습니까?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              color="rgba(0, 0, 0, 0.54)"
              style={[DefaultStyle._buttonElement]}
              onPress={() => this.setState({ isCancel: false })}>
              아니오
            </Button>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() =>
                this.setState({ cancelRequest: true, isCancel: false })
              }>
              네
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={DefaultStyle.popup}
          visible={this.state.cancelRequest}
          onDismiss={() => this.setState({ cancelRequest: false })}>
          <Dialog.Content>
            <View style={DefaultStyle.imagePopup} />
          </Dialog.Content>
          <Dialog.Title
            style={[DefaultStyle._titleDialog, DefaultStyle.titleDialog]}>
            입고 요청 취소 완료
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={DefaultStyle.contentDialog}>
              입고 요청 취소를 완료했습니다.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={DefaultStyle._buttonPopup}>
            <Button
              style={DefaultStyle._buttonElement}
              onPress={() =>
                this.setState({ cancelRequest: false, receiptCancel: true })
              }>
              확인
            </Button>
          </Dialog.Actions>
        </Dialog>
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
    dataAction: action => {
      dispatch(ActionCreator.ContractConditions(action));
    },
    // countDown: diff => {
    //   dispatch(ActionCreator.countDown(diff));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsManager);
