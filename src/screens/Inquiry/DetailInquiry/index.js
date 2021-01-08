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

// Local Imports
import DefaultStyle from '@Styles/default';
import TextField from '@Components/organisms/TextField';
import Appbars from '@Components/organisms/AppBar';
import { styles as S } from '../style';
import { InquiryAPI } from '@Services/apis';

class DetailInquiry extends Component {
  constructor(props) {
    super(props);
    this.webView = null;
    this.state = {
      isSwitchOn: false,
      answer: '',
    };

    this.navigation = props.navigation;
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

  /** listener when change props */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  /** when exits screen */
  componentWillUnmount() {
    //console.log('//::componentWillUnmount::');
  }

  createAnswer(params) {
    let defaultParams = {
      content: this.state.answer,
      ...params,
    };

    InquiryAPI.createAnswer(defaultParams)
      .then(res => {
        console.log('::::: createAnswer :::::', res);
        if (res.status === 200) {
          alert('Create Answer Successful')
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  onSubmit = (upperQnaSeq, warehouseRegNo) => {
    this.createAnswer({
      upperQnaSeq: upperQnaSeq,
      warehouseRegNo: warehouseRegNo,
    });
  };


  render() {

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
        <Appbars>
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
        </Appbars>
        <ScrollView>
          {(params && params.inquiryDetails && params.inquiryDetails.complete === true)
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
          }
          {(params && params.inquiryDetails && params.type === 'OWNER' && params.inquiryDetails.complete === false) &&
            <View style={[DefaultStyle._cards, DefaultStyle._border0]}>
              <Text style={[S.status]}>답변 대기 중</Text>
              <Text style={S.titleItem}>
                {params?.inquiryDetails?.content ?? ''}
              </Text>
              <Text style={DefaultStyle.contentItem}>{dateStr ?? ''}</Text>
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
            </View>
          }
          {(params && params.inquiryDetails && params.type === 'TENANT' && params.inquiryDetails.complete === false) && ""}
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

export default DetailInquiry;
