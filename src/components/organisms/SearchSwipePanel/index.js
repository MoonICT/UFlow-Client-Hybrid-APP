/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { Avatar, withTheme, Card, Title, Paragraph, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modalize } from 'react-native-modalize';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import Alert from '@Components/atoms/Alert';
import ProductCard from '@Components/organisms/ProductCard';

const status = getStatusBarHeight(true);

class SearchSwipePanel extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    // Ref
    this.sheetRef = React.createRef();
  }

  _onChange = (position) => {
    // top | initial
    console.log('Change Bottom Sheet !!!', position);
    // TODO 목록 갱신.
  };

  render () {
    let arr = [
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
      { type: 'HORIZONTAL' },
    ];
    let height = Math.round(Dimensions.get('window').height)
    if (Platform.OS === 'ios') {
      const naviHeight = 54;
      const filterHeight = 48 * 2;
      if (isIphoneX()) {
        console.log('아이폰x')
        height = Dimensions.get("window").height - status - getBottomSpace() - naviHeight - filterHeight;
      } else {
        console.log('아이폰 일반')
        height = Dimensions.get("window").height - status - naviHeight - filterHeight;
      }
    }
    console.log('높이', height)
    return (
      <>
        <Modalize ref={this.sheetRef}
                  handlePosition={'inside'}
                  modalHeight={height}
                  alwaysOpen={30}
                  onPositionChange={(position) => {
                    this._onChange(position);
                  }}
                  handleStyle={styles.sheetHandleBar}
                  childrenStyle={styles.sheetContent}>

          {/** 목록 스크롤 뷰 */}
          <ScrollView style={{ paddingHorizontal: 16, }}>

            <Text style={styles.counterText}>{'창고 목록 총 1,400개'}</Text>

            <Alert
              type={'INFO'}
              buttonText={'확인'}
              content={'이 지역 UFLOW 추천 광고 보기'}
              onPress={() => {
                alert('추천광고 목록');
              }}
            />

            {/** 목록 */}
            <View style={styles.divider} />
            {arr.map((item, index) =>
              <View key={index}>
                <TouchableOpacity onPress={() => {
                  alert('Go detail.');
                }}>
                  <ProductCard type={item.type} isShadow={false} />
                </TouchableOpacity>
                <View style={styles.divider} />
              </View>
            )}
          </ScrollView>
        </Modalize>
      </>
    );
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  console.log('++++++mapStateToProps: ', state);
  return {};
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {};
}

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(SearchSwipePanel);
