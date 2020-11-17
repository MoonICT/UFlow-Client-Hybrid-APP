/**
 * @author [Life]
 * @desc [description]
 * */
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View, SafeAreaView} from 'react-native';
import {List, Button} from 'react-native-paper';
import DefaultStyle from '@Styles/default';
import Lists from '@Components/organisms/List';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data} = this.props;
    console.log('data', data);
    return (
      <SafeAreaView style={DefaultStyle._wrapperFooter}>
        <View style={DefaultStyle._menuFooter}>
          <Lists
            customWrapper={DefaultStyle._menu}
            customTitle={DefaultStyle._menuTitle}
            customItem={DefaultStyle._menuItem}
            listItems={data}
          />
        </View>
        <View style={DefaultStyle._mainFooter}>
          <Text style={DefaultStyle._copyrightFooter}>
            Copyright © 2020 Uflow Inc. 모든 권리 보유.
          </Text>
          <View style={DefaultStyle._titleFooter}>
            <Text style={DefaultStyle._textTitleFooter}>개인정보 처리방침</Text>
            <Text style={DefaultStyle._textTitleFooter}>
              웹 사이트 이용 약관
            </Text>
            <Text style={DefaultStyle._textTitleFooter}>판매 및 환불</Text>
            <Text style={DefaultStyle._textTitleFooter}>법적 고지</Text>
            <Text style={DefaultStyle._textTitleFooter}>사이트 맵</Text>
          </View>
          <View style={DefaultStyle._contentFooter}>
            <Text style={DefaultStyle._textContentFooter}>
              사업자등록번호 : 000-00-00000 |
            </Text>
            <Text style={DefaultStyle._textContentFooter}>
              통신판매업신고번호 : 제 0000-서울강남-00000호 |
            </Text>
            <Text style={DefaultStyle._textContentFooter}>
              대표이사 : 서병륜 | 주소 : 울특별시 마포구 마포대로 63-8 (도화동,
              삼창프라자 6층) | 대표전화 : 1588-1333 |
            </Text>
            <Text style={DefaultStyle._textContentFooter}>
              팩스 : 02-0000-0000
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Footer;
