/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Avatar, withTheme, Card, Title, Paragraph, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SwipeablePanel } from 'rn-swipeable-panel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import Alert from '@Components/atoms/Alert';
import ProductCard from '@Components/organisms/ProductCard';

class SearchSwipePanel extends Component {
  constructor (props) {
    super(props);
    this.swipeUpDownRef = null
    this.state = {
      isPanelActive: true
    };
  }

  _open () {
    console.log('1111')
    console.log(this.swipeUpDownRef)
    this.swipeUpDownRef.showFull();
  }

  _openPanel = () => {
    this.setState({ isPanelActive: true });
  };

  _closePanel = () => {
    this.setState({ isPanelActive: false });
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
    return (
      <>
        <TouchableOpacity style={styles.swipeBar} onPress={() => this._openPanel()}>
          <View style={styles.bar}></View>
        </TouchableOpacity>
        <SwipeablePanel
          style={{
            // marginTop: -100,
          }}
          isActive={this.state.isPanelActive}
          noBackgroundOpacity={true}
          fullWidth={true}
          onlyLarge={true}
          onClose={this._closePanel}
          barStyle={styles.bar}
        >

          {/** 창고 목록 영역 */}
          <ScrollView style={{
            paddingHorizontal: 16,
          }}>

            <View style={{ marginTop: 50, }}></View>

            <Text style={{
              fontSize: 12,
              color: 'rgba(0, 0, 0, 0.87)',
              lineHeight: 20,
            }}>{'창고 목록 총 1,400개'}</Text>

            {[
              { type: 'ERROR' },
              { type: 'WARNING' },
              { type: 'INFO' },
              { type: 'SUCCESS' },
            ].map((item) => <Alert type={item.type} />)}

            {/** 목록 */}
            <View style={styles.divider} />
            {arr.map((item, index) =>
              <>
                <TouchableOpacity onPress={() => {
                  alert('Go detail.');
                }}>
                  <ProductCard type={item.type} isShadow={false} />
                </TouchableOpacity>
                <View style={styles.divider} />
              </>
            )}
          </ScrollView>
        </SwipeablePanel>

        {/*<TouchableOpacity style={styles.swipeBar} onPress={() => this._open()}>*/}
        {/*<View style={styles.bar}></View>*/}
        {/*</TouchableOpacity>*/}
        {/*<SwipeUpDown*/}
        {/*hasRef={ref => (this.swipeUpDownRef = ref)}*/}
        {/*itemFull={*/}
        {/*<Text>*/}
        {/*Welcome to component {'\n'} Swipe Up Down on React Native*/}
        {/*</Text>*/}
        {/*}*/}
        {/*onShowMini={() => console.log('mini')}*/}
        {/*onShowFull={() => console.log('full')}*/}
        {/*disablePressToShow={false}*/}
        {/*swipeHeight={40}*/}
        {/*animation="easeInEaseOut"*/}
        {/*style={{*/}
        {/*height: '90%',*/}
        {/*}}*/}
        {/*/>*/}
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
