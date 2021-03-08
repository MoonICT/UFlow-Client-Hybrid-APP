/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Text, Button, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import validator from 'validator';

import Bgr from '@Assets/images/bgr-consulting.png';
// Local Imports
import DefaultStyle from '@Styles/default';
import Appbars from '@Components/organisms/AppBar';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';
import Checkbox from '@Components/atoms/Checkbox';
import { ConsultingApi } from '@Services/apis';
import { styles as S } from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Consulting extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      step: 0,
      limitIndex: 0,
      listQuest: [],
      listAnswer: [],

      company: '',
      name: '',
      email: '',

      startStep:false,
    };
    this.navigation = props.navigation;
  }
  /** when after render DOM */

  //  ================================
  componentDidMount() {
    this.getAllData();
  }

  async getAllData() {
    await ConsultingApi.getListQuestion().then(res => {
      const { listAnswer } = this.state;
      if (res) {
        let data = res?._embedded?.mgmtquests;
        let newListQuestion = [...data];
        let newListAnswer = [...listAnswer];
        newListQuestion.forEach(function(item) {
          [
            newListAnswer.push({
              userAnswer: '',
              srvyMgmtNo: item.id.srvyMgmtNo,
              questSeq: item.id.questSeq,
            }),
          ];
        });
        this.setState({
          listQuest: data,
          listAnswer: newListAnswer,
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }
  handleChange = (e, index, checkbox) => {
    const { listAnswer } = this.state;
    let newArr = [...listAnswer];
    if (checkbox) {
      const isAnswer = newArr[index].userAnswer.indexOf(e);
      if (isAnswer === -1) {
        newArr[index].userAnswer = newArr[index].userAnswer
          ? `${newArr[index].userAnswer}|${e}`
          : `${e}`;
      } else {
        let ar = newArr[index].userAnswer.split('|');
        let newA = ar.filter(item => item !== e.toString());
        newArr[index].userAnswer = newA.join('|');
      }
    } else {
      newArr[index].userAnswer = e.toString();
    }
    this.setState({ listAnswer: newArr });
  };

  handleStep = () => {
    const { step, listQuest, listAnswer } = this.state;
    this.setState({ limitIndex: step });
    if (step < listQuest.length) {
      this.setState({ step: step + 1 });
    } else if (step === listQuest.length) {
      ConsultingApi.submitAdvisory({
        listAnswer: listAnswer,
        name: '',
        company: '',
        email: ''
      })
        .then(res => {
          this.setState({ step: step + 1 });
          console.log('res', res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  renderQuestion = (item, index) => {
    const { step, listAnswer } = this.state;
    let _index = index + 1;
    return (
      step === _index && (
        <View>
          {/* input text */}
          {item.type === '1100' && (
            <View>
              <View style={S.contentAlignLeft}>
                <Text style={S.styleTextTitleNomarl}>
                  {index + 1}. {item.quest}
                </Text>
                <TextInput
                  placeholderTextColor="#979797"
                  style={S.inputNomarl}
                  value={listAnswer[index] && listAnswer[index].userAnswer}
                  placeholder=""
                  onChangeText={e => this.handleChange(e, index)}
                />
                <TouchableOpacity
                  mode="contained"
                  style={[S.styleButton, { marginTop: 30 }]}
                  onPress={() => {
                    if (listAnswer[index].userAnswer !== '') {
                      this.handleStep();
                    }
                  }}>
                  <Text style={[S.textButton, { marginTop: 8 }]}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* one selection */}
          {item.type === '2100' && item.qty === '1' && (
            <View style={S.contentAlignLeft}>
              <Text style={[S.styleTextTitleNomarl, { marginBottom: 20 }]}>
                {index + 1}. {item.quest}
              </Text>
              {item.answers &&
                item.answers.map((a, i) => (
                  <View
                    key={i}
                    style={[
                      DefaultStyle.row,
                      { alignItems: 'center', marginBottom: 10 },
                    ]}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        this.handleChange(a.id.answerSeq, index);
                      }}>
                      <Checkbox
                        value={a.id.answerSeq}
                        onPress={() => {
                          this.handleChange(a.id.answerSeq, index);
                        }}
                        checked={
                          listAnswer[index].userAnswer.toString() ===
                          a.id.answerSeq.toString()
                            ? true
                            : false
                        }
                        borderUnchecked={S.borderStyle}
                        borderChecked={S.borderChecked}
                        iconColor={S.iconColor}
                      />
                      {/* <RadioButton
                        value={a.id.answerSeq}
                        color="#ff6d00"
                        uncheckedColor="white"
                        onPress={() => {
                          this.handleChange(a.id.answerSeq, index);
                        }}
                        status={
                          listAnswer[index].userAnswer.toString() ===
                          a.id.answerSeq.toString()
                            ? 'checked'
                            : 'unchecked'
                        }
                      /> */}
                      <Text style={{ color: 'white', fontSize: 15 }}>
                        {a.answer}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              <TouchableOpacity
                mode="contained"
                style={[S.styleButton, { marginTop: 30 }]}
                onPress={() => {
                  if (listAnswer[index].userAnswer) {
                    this.handleStep();
                  }
                }}>
                <Text style={[S.textButton, { marginTop: 8 }]}>확인</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* multiple selection */}
          {item.type === '2100' && item.qty !== '1' && (
            <View style={S.contentAlignLeft}>
              <Text style={[S.styleTextTitleNomarl, { marginBottom: 20 }]}>
                {index + 1}. {item.quest}
              </Text>
              {item.answers &&
                item.answers.map((a, i) => (
                  <View style={S.optionRow} key={i}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        this.handleChange(a.id.answerSeq, index, true)
                      }>
                      <Checkbox
                        checked={
                          listAnswer[index].userAnswer.indexOf(
                            a.id.answerSeq.toString(),
                          ) === -1
                            ? false
                            : true
                        }
                        // color="#ff6d00"
                        // uncheckedColor="white"
                        onPress={() =>
                          this.handleChange(a.id.answerSeq, index, true)
                        }
                      />
                      <Text style={{ color: 'white', fontSize: 15 }}>
                        {a.answer}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              <Button
                mode="contained"
                style={[S.styleButton, { marginTop: 30 }]}
                onPress={() => {
                  if (listAnswer[index].userAnswer !== '') {
                    this.handleStep();
                  }
                }}>
                <Text style={[S.textButton, { marginTop: 8 }]}>확인</Text>
              </Button>
            </View>
          )}
        </View>
      )
    );
  };

  // navigation topbar
  handleNavigation = () => {
    const { step } = this.state;
    if (step > 0) {
      this.setState({ step: step - 1 });
    } else {
      this.navigation.goBack();
    }
  };
  validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: { text: text, validate: false } });
      return false;
    } else {
      this.setState({ email: { text: text, validate: true } });
    }
  };
  // startStep = () => {
  //   this.setState({ step: 1  }), this.getAllData;
  // };
  render() {
    const {
      step,
      limitIndex,
      listQuest,
      startStep,

      company,
      name,
      email,
    } = this.state;
    return (
      <View style={S.container}>
        <View>
          <Image source={Bgr} style={S.bgrImage} />
        </View>
        <Appbars customStyle={{ borderBottomColor: '#d7d7d7' }}>
          <Appbar.Action
            icon="arrow-left"
            color="white"
            onPress={() => this.handleNavigation()}
          />
          <Appbar.Content
            title="물류컨설팅"
            titleStyle={DefaultStyle.headerTitleWhite}
          />
        </Appbars>
        {/* <HistoryBackActionBar
          title={'물류컨설팅'}
          navigation={this.navigation}
        /> */}
        {/* step 0 */}
        {step === 0 && (
          <View style={S.contentCenter}>
            <Text style={S.styleH3}>물류 컨설팅</Text>
            <Text style={S.styleTextNomarl}>
              유플로우 물류창고에 임대 관심이 있으시면{'\n'}시작 버튼을
              눌러주세요.
            </Text>
            <View
              style={{
                width: windowWidth - 32,
                paddingLeft: 16,
                paddingRight: 16,
                marginBottom: 15,
                marginTop: 15,
              }}>
              <TextInput
                placeholderTextColor="#979797"
                style={S.inputNomarl}
                value={company}
                placeholder="회사명"
                onChangeText={e => this.setState({ company: e })}
              />
              <TextInput
                placeholderTextColor="#979797"
                style={S.inputNomarl}
                value={name}
                placeholder="담당자명"
                onChangeText={e => this.setState({ name: e })}
              />
              <TextInput
                placeholderTextColor="#979797"
                style={S.inputNomarl}
                placeholder="이메일"
                value={email}
                onChangeText={e => this.setState({ email: e })}
              />
              { !!email && !validator.isEmail(email) && (
                <Text style={{color:'#ff6d00',marginTop:10}}>메일 주소가 맞지 않습니다.</Text>
              )}
            </View>
            <Button
              mode="contained"
              pointerEvents={
                email !== '' && company !== '' && name !== ''
                  ? 'auto'
                  : 'none'
              }
              style={[
                S.styleButton,
                {
                  margin: 'auto',
                  backgroundColor: `${
                    email !== '' && company !== '' && name !== ''
                      ? '#ff6d00'
                      : '#cccccc'
                  }`,
                },
              ]}
              onPress={() => {this.setState({ step: 1  }), this.getAllData;}}>
              <Text style={[S.textButton]}>물류 컨설팅 시작하기</Text>
            </Button>
          </View>
        )}
        {listQuest.map((item, index) => this.renderQuestion(item, index))}
        {step !== 1 && step === listQuest.length + 1 && (
          <View style={S.contentCenter}>
            <Text style={[S.styleTextTitleNomarl, { textAlign: 'center' }]}>
              물류 컨설팅 등록되었습니다.{'\n'}감사합니다.
            </Text>
            <Button
              mode="contained"
              style={[S.styleButton, { marginTop: 30 }]}
              onPress={() => {
                this.setState({ step: 0 }),
                  this.getAllData,
                  this.navigation.navigate('ConsultingComplete', {
                    email: email
                  });
              }}>
              <Text style={[S.textButton, { width: 175 }]}>
                컨설팅 결과 확인하기

              </Text>
            </Button>
          </View>
        )}
        {step !== 0 && step !== listQuest.length + 1 && (
          <View style={S.contentProgress}>
            <View>
              <Text style={S.valueProgress}>
                {Math.floor(((step - 1) * 100) / listQuest.length)}%
              </Text>
              <View style={S.lineDefault}>
                {step !== 0 ? (
                  <View
                    style={[
                      S.lineMove,
                      { width: `${((step - 1) * 100) / listQuest.length}%` },
                    ]}
                  />
                ) : (
                  <View style={[S.lineMove, { width: 0 }]} />
                )}
              </View>
            </View>
            <View style={S.boxBottom}>
              <View pointerEvents={step > 1 ? 'auto' : 'none'}>
                <Icon.Button
                  size={20}
                  onPress={() =>
                    step !== 0 && this.setState({ step: step - 1 })
                  }
                  backgroundColor="transparent"
                  color={step > 1 ? 'white' : 'rgba(215, 215, 215, 0.5)'}
                  style={
                    step > 1
                      ? [S.itemNavigation, { marginRight: 4 }]
                      : [S.itemNavigationNone, { marginRight: 4 }]
                  }
                  name="chevron-down"
                />
              </View>
              <View
                pointerEvents={
                  step < listQuest.length && step <= limitIndex
                    ? 'auto'
                    : 'none'
                }>
                <Icon.Button
                  size={20}
                  color={
                    step < listQuest.length && step <= limitIndex
                      ? 'white'
                      : 'rgba(215, 215, 215, 0.5)'
                  }
                  backgroundColor="transparent"
                  style={
                    step < listQuest.length && step <= limitIndex
                      ? S.itemNavigation
                      : S.itemNavigationNone
                  }
                  onPress={() =>
                    step <= limitIndex &&
                    step !== listQuest.length &&
                    this.setState({ step: step + 1 })
                  }
                  name="chevron-up"
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Consulting);
