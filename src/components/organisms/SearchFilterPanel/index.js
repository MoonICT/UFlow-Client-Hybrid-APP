/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:29:29
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { Warehouse, WhrgSearch } from '@Services/apis';

class SearchFilter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      panelAnimation: new Animated.Value(0), // 필터 패널 애니메이션.
      // 필터 데이터
      listGdsTypeCode: null, // 보관유형
      listCalUnitDvCode: null, // 정산단위
      listCalStdDvCode: null, // 산정기준
      listFlrDvCode: null, // 층수
      listAprchMthdDvCode: null, // 접안방식
      listInsrDvCode: null, // 보험 가입
      listCmpltTypes: null, // 준공연차
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
              (item.type === 'WAREHOUSE' &&
                <FilterWarehouse key={index} filter={this.state.listGdsTypeCode} onClosed={() => {
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
    //console.log('//::componentWillUnmount::');
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

  async componentDidMount () {
    // 필터 데이터들 호출.
    const listGdsTypeCode = await Warehouse.listGdsTypeCode(); // 보관유형
₩    const listCalUnitDvCode = await Warehouse.listCalUnitDvCode(); // 정산단위
    const listCalStdDvCode = await Warehouse.listCalStdDvCode(); // 산정기준
    const listFlrDvCode = await Warehouse.listFlrDvCode(); // 층수
    const listAprchMthdDvCode = await Warehouse.listAprchMthdDvCode(); // 접안방식
    const listInsrDvCode = await Warehouse.listInsrDvCode(); // 보험 가입
    const listCmpltTypes = await WhrgSearch.getCmpltTypes(); // 준공 연차
    this.setState({
      getCmpltTypes: listGdsTypeCode && listGdsTypeCode._embedded ? listGdsTypeCode._embedded.detailCodes : [], // 보관유형
      listCalUnitDvCode: listCalUnitDvCode && listCalUnitDvCode._embedded ? listCalUnitDvCode._embedded.detailCodes : [], // 정산단위
      listCalStdDvCode: listCalStdDvCode && listCalStdDvCode._embedded ? listCalStdDvCode._embedded.detailCodes : [], // 산정기준
      listFlrDvCode: listFlrDvCode && listFlrDvCode._embedded ? listFlrDvCode._embedded.detailCodes : [], // 층수
      listAprchMthdDvCode: listAprchMthdDvCode && listAprchMthdDvCode._embedded ? listAprchMthdDvCode._embedded.detailCodes : [], // 접안방식
      listInsrDvCode: listInsrDvCode && listInsrDvCode._embedded ? listInsrDvCode._embedded.detailCodes : [], // 보험 가입
      listCmpltTypes: listCmpltTypes && listCmpltTypes._embedded ? listCmpltTypes._embedded.hashMaps : [], // 준공연차
    });
    console.log('현재 스테이트', this.state);
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

// Check Props Type.
SearchFilter.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(SearchFilter);
