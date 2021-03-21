/**
 * @create
 * @modify
 * @desc [description]
 */

// Global Imports
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Appbar, Text } from 'react-native-paper';
import HistoryBackActionBar from '@Components/organisms/HistoryBackActionBar';

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import Appbars from '@Components/organisms/AppBar';
import { styles as S } from '../style';
import { InquiryAPI } from '@Services/apis';
import HTML from 'react-native-render-html';
import ActionCreator from '@Actions';
import { connect } from "react-redux";
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang


class DetailInquiry extends Component {
  constructor (props) {
    super(props);
    this.webView = null;
    this.state = {
      isSwitchOn: false,
      answer: '',
    };

    this.navigation = props.navigation;
  }

  /** when after render DOM */
  async componentDidMount () {
    console.log('::componentDidMount::');
    SplashScreen.hide();
  }

  /** when update state or props */
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
  }

  /** listener when change props */
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount () {
    //console.log('//::componentWillUnmount::');
  }

  createAnswer (params) {
    let defaultParams = {
      content: this.state.answer,
      ...params,
    };

    this.props.setProgress({ is: true, type: 'CIRCLE' });
    InquiryAPI.createAnswer(defaultParams)
      .then(res => {
        console.log('::::: createAnswer :::::', res);
        setTimeout(() => {
          this.props.setProgress({ is: false, });
        }, 300)
        setTimeout(() => {
          if (res.status === 200) {
            this.props.showPopup({
              title: getMsg(this.props.lang, 'ML0062', '답변 등록 완료'),
              type: 'confirm',
              content: getMsg(this.props.lang, 'ML0063', '답변 등록을 완료하였습니다.'),
              navigation: () => {
                this.setState({ answer: '', });
                this.props.route.params.doRefresh();
                this.navigation.navigate('Inquiry')
              }
            })
          }
        }, 400)
      })
      .catch(err => {
        console.log('err', err);
        this.props.setProgress({ is: false, });
      });
  }

  onSubmit = (upperQnaSeq, warehouseRegNo) => {
    this.createAnswer({
      upperQnaSeq: upperQnaSeq,
      warehouseRegNo: warehouseRegNo,
    });
  };


  render () {

    const { params } = this.props.route;
    console.log('params truyen', params);

    let upperQnaSeq = params?.inquiryDetails?.id?.qnaSeq ?? null;
    let warehouseRegNo = params?.inquiryDetails?.id?.warehouseRegNo ?? null;
    console.log('upperQnaSeq', upperQnaSeq);


    let dateTime = new Date(params?.inquiryDetails?.date ?? '');
    let dateStr =
      dateTime.getFullYear() +
      '.' +
      dateTime.getMonth() +
      '.' +
      dateTime.getDate();

    return (
      <SafeAreaView style={S.container}>
        {/* <Appbars>
          <Appbar.Action
            icon="arrow-left"
            color="black"
            onPress={() => this.navigation.goBack()}
          />
          <Appbar.Content
            title="문의내역"
            color="black"
            fontSize="12"
            style={DefaultStyle.headerTitle}
          />
        </Appbars> */}
        
        <HistoryBackActionBar
            title={getMsg(this.props.lang, 'ML0057', '문의내역')}
            navigation={this.navigation}
          />
        <ScrollView>
          {(params && params.inquiryDetails && params.inquiryDetails.complete === true)
          &&
          <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
            <Text style={[S.status, S.statusComplete]}>{getMsg(this.props.lang, 'ML0061', '답변 완료')}</Text>
            <Text style={S.titleItem}>
              {params?.inquiryDetails?.content ?? ''}
            </Text>
            <Text style={DefaultStyle.contentItem}>{dateStr ?? ''}</Text>
            <View style={[S.answers, S.answerContents]}>
              {/* <Text style={[S.textAnswers, { marginBottom: 15 }]}>
                  {params?.inquiryDetails?.answer?.content ?? ''}
                </Text> */}
              <HTML
                tagsStyles={{ p: { marginBottom: 0, marginTop: 0 } }}
                source={{ html: params?.inquiryDetails?.answer?.content ? params?.inquiryDetails?.answer?.content : 'empty content' }}
              />
            </View>
          </View>
          }
          {/* {(params && params.inquiryDetails && params.type === 'TENANT' && params.inquiryDetails.complete === true)
            &&
            <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
              <Text style={[S.status, S.statusComplete]}>답변 완료</Text>
              <Text style={S.titleItem}>
                {params?.inquiryDetails?.content ?? ''}
              </Text>
              <Text style={DefaultStyle.contentItem}>{dateStr ?? ''}</Text>
              <View style={[S.answers, S.answerContents]}>
                <Text style={[S.textAnswers, { marginBottom: 15 }]}>
                  {params?.inquiryDetails?.answer?.content ?? ''}
                </Text>
              </View>
            </View>
          } */}
          {(params && params.inquiryDetails && params.inquiryDetails.complete === false) &&
          <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
            <Text style={[S.status]}>{getMsg(this.props.lang, 'ML0060', '답변 대기 중')}</Text>
            <Text style={S.titleItem}>
              {params?.inquiryDetails?.content ?? ''}
            </Text>
            <Text style={DefaultStyle.contentItem}>{dateStr ?? ''}</Text>

            {params.answerMode &&
            <View style={S.answers}>
              <TextField
                placeholder={getMsg(this.props.lang, 'ML0055', '답변 내용을 입력해 주세요.')}
                colorLabel="#000000"
                valueProps={e => this.setState({ answer: e })}
                numberOfLines={5}
                multiline
                style={DefaultStyle._textAreaStyle}
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[
                  DefaultStyle.btnSubmit,
                  DefaultStyle.activeBtnSubmit,
                ]}
                onPress={() => this.onSubmit(upperQnaSeq, warehouseRegNo)}>
                <Text
                  style={[
                    DefaultStyle.textSubmit,
                    DefaultStyle.textActiveSubmit,
                  ]}>
                  {getMsg(this.props.lang, 'ML0061', '답변 완료')}
                </Text>
              </TouchableOpacity>
            </View>}
          </View>
          }
          {/* {(params && params.inquiryDetails && params.type === 'TENANT' && params.inquiryDetails.complete === false) && ""} */}
          {/* {(params && params.inquiryDetails && params.type === 'TENANT') &&
            <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
              {params.inquiryDetails.complete === true &&
                <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
                  <Text style={[S.status, S.statusComplete]}>답변 완료</Text>
                  <Text style={S.titleItem}>
                    {params?.inquiryDetails?.content ?? ''}
                  </Text>
                  <Text style={DefaultStyle.contentItem}>{dateStr ?? ''}</Text>
                  <View style={[S.answers, S.answerContents]}>
                    <Text style={[S.textAnswers, { marginBottom: 15 }]}>
                      {params?.inquiryDetails?.answer?.content ?? ''}
                    </Text>
                  </View>
                </View>
              }
            </View>
          } */}
          {/* {params && params.inquiryDetails && params.type === 'TENANT' ? (
            <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
              {params.inquiryDetails.complete === false ? (
                <Text style={[S.status]}>답변 대기 중</Text>
              ) : (
                  <Text style={[S.status, S.statusComplete]}>답변 완료</Text>
                )}
              <Text style={S.titleItem}>
                {params?.inquiryDetails?.content ?? ''}
              </Text>
              <Text style={DefaultStyle.contentItem}>{dateStr ?? ''}</Text>
              {params.inquiryDetails.complete === true && (
                <View style={[S.answers, S.answerContents]}>
                  <Text style={[S.textAnswers, { marginBottom: 15 }]}>
                    {params?.inquiryDetails?.answer?.content ?? ''}
                  </Text>
                </View>
              )}
            </View>
          ) : (
              <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
                {params.inquiryDetails.complete === true ? (
                  <Text style={S.status, S.statusComplete}>답변 완료</Text>
                ) : (
                    <Text style={S.status}>답변 대기 중</Text>
                  )}
                <Text style={S.titleItem}>
                  {params?.inquiryDetails?.content ?? ''}
                </Text>
                <Text style={DefaultStyle.contentItem}>{dateStr ?? ''}</Text>
                {params.inquiryDetails.complete === true ? (
                  <View style={S.content}>
                    <Text style={S.textContent}>
                      {params?.inquiryDetails?.answer?.content ?? ''}
                    </Text>
                  </View>
                ) : (
                    <View style={S.answers}>
                      <TextField
                        placeholder=" 답변 내용을 입력해 주세요."
                        colorLabel="#000000"
                        valueProps={e => this.setState({ answer: e })}
                        numberOfLines={5}
                        multiline
                        textAlignVertical="top"
                      />
                      <TouchableOpacity
                        style={[
                          DefaultStyle.btnSubmit,
                          DefaultStyle.activeBtnSubmit,
                        ]}
                        onPress={() => this.onSubmit(upperQnaSeq, warehouseRegNo)}>
                        <Text
                          style={[
                            DefaultStyle.textSubmit,
                            DefaultStyle.textActiveSubmit,
                          ]}>
                          답변완료
                    </Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
            )} */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}


/** map state with store states redux store */
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {};
}

/** dispatch action to redux */
function mapDispatchToProps (dispatch) {
  return {
    showPopup: status => {
      dispatch(ActionCreator.show(status));
    },
    setProgress: status => {
      dispatch(ActionCreator.setProgress(status));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailInquiry);
