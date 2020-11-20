/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { withTheme, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import FilterWarehouse from './FilterWarehouse';
import FilterStorage from './FilterStorage';
import FilterPeriod from './FilterPeriod';
import FilterPrice from './FilterPrice';
import FilterScale from './FilterScale';
import FilterOther from './FilterOther';

class SearchFilter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      panelAnimation: new Animated.Value(0), // 필터 패널 애니메이션.
    };
  }

  /** Backdrop 클릭 */
  _onClickClose () {
    this.props.onClosed(); // Event emit
  }

  render () {
    return (
      <View style={[styles.container, {
        height: this.props.isFilterToggle ? '100%' : 0,
      }]}>

        {/** 기본 필터 (드롭다운) */}
        <Animated.View style={[styles.animatedView, { top: this.state.panelAnimation, }]}>

          {this.props.filterList.map((item, index) => (item.toggle && (
              (item.type === 'WAREHOUSE' && <FilterWarehouse key={index} onClosed={() => {
                this._onClickClose();
              }} />) ||
              (item.type === 'STORAGE' && <FilterStorage key={index} onClosed={() => {
                this._onClickClose();
              }} />) ||
              (item.type === 'PERIOD' && <FilterPeriod key={index} onClosed={() => {
                this._onClickClose();
              }} />) ||
              (item.type === 'PRICE' && <FilterPrice key={index} onClosed={() => {
                this._onClickClose();
              }} />) ||
              (item.type === 'SCALE' && <FilterScale key={index} onClosed={() => {
                this._onClickClose();
              }} />))
          ))}

        </Animated.View>

        {/** 추가 필터 (풀스크린) */}
        {this.props.filterList.map((item, index) => (item.toggle && (
            (item.type === 'OTHER' && <FilterOther key={index} onClosed={() => {
              this._onClickClose();
            }} />))
        ))}

        {/** Filter panel backdrop */}
        {this.props.isFilterToggle && <TouchableOpacity
          onPress={() => this._onClickClose()}
          style={styles.btnFilter} />}
      </View>
    );
  }

  componentWillUnmount () {
    console.log('::componentWillUnmount::');
  }

  // 컴포넌트 업데이트 직후 호출.
  componentDidUpdate (prevProps, prevState) {
    console.log('::componentDidUpdate::');
    Animated.timing(
      this.state.panelAnimation,
      {
        toValue: this.props.isFilterToggle ? 0 : -200,
        duration: 150
      }
    ).start();
  }

  componentDidMount () {
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  console.log('++++++mapStateToProps: ', state);
  return {
    isFilterToggle: state.search.isFilterToggle,
    filterList: state.search.filterList,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {};
}

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(SearchFilter);
