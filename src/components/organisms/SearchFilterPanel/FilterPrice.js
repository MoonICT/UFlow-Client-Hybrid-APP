/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:29:38
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { withTheme, Text, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import RangeSlider from '@Components/atoms/RangeSlider';
import moment from "./FilterPeriod";
import { money, numberComma } from '@Services/utils/StringUtils';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

/*TODO 임시 값 (추후 변경 필요)*/
const splyAmountMax = 100000; // 임대비 최대
const mgmtChrgMax = 100000; // 관리비 최대
const whinChrgMax = 100000; // 입고비 최대
const whoutChrgMax = 100000; // 출고비 최대

class FilterPrice extends Component {
  constructor (props) {
    super(props);
    this.state = {
      splyAmount: this.props.whFilter.splyAmount ? Number(this.props.whFilter.splyAmount) : 0, // 임대단가
      mgmtChrg: this.props.whFilter.mgmtChrg ? Number(this.props.whFilter.mgmtChrg) : 0, // 관리단가
      whinChrg: this.props.whFilter.whinChrg ? Number(this.props.whFilter.whinChrg) : 0, // 입고비
      whoutChrg: this.props.whFilter.whoutChrg ? Number(this.props.whFilter.whinChrg) : 0, // 출고비
    };
  }

  /**
   *  필터 닫기.
   *  */
  _onClickCancel () {
    // 취소 시, 값 초기화.
    this.props.setSearchFilter({
      splyAmount: '',
      mgmtChrg: '',
      whinChrg: '',
      whoutChrg: '',
    });
    this.props.onClosed(); // Event emit
  }

  /**
   *  필터 적용.
   *  */
  _onClickApply () {
    // TODO 변경 필터는 스토어에 반영.
    this.props.onClosed(); // Event emit
  }

  render () {
    return (
      <View style={[styles.filterContainer]}>

        <ScrollView style={{ height: 380, }}>
          {/***** 임대비 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>
                {getMsg(this.props.lang, 'ML0122', '임대비')}
              </Text>
            </View>
            <Text
              style={[styles.filterLabel, styles.filterLabelMain]}>
              {(Number(this.props.whFilter.splyAmount) === splyAmountMax || Number(this.props.whFilter.splyAmount) === 0) ?
                getMsg(this.props.lang, 'ML0119', '전체') : this.props.whFilter.splyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + getMsg(this.props.lang, 'ML0126', '원')}
            </Text>
          </View>

          {/** Slider */}
          <RangeSlider value={this.props.whFilter.splyAmount ? Number(this.props.whFilter.splyAmount) : 0}
                       step={1000}
                       contentStyle={{ marginBottom: 24 }}
                       minimumValue={0}
                       maximumValue={splyAmountMax}
                       LabelMiddle={`${money((splyAmountMax / 2))}`}
                       onValueChange={(value) => {
                         this.props.setSearchFilter({
                           splyAmount: value,
                         });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 관리비 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>
                {getMsg(this.props.lang, 'ML0123', '관리비')}
              </Text>
            </View>
            <Text
              style={[styles.filterLabel, styles.filterLabelMain]}>
              {(Number(this.props.whFilter.mgmtChrg) === mgmtChrgMax || Number(this.props.whFilter.mgmtChrg) === 0) ?
                getMsg(this.props.lang, 'ML0119', '전체') : this.props.whFilter.mgmtChrg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + getMsg(this.props.lang, 'ML0126', '원')}
            </Text>
          </View>
          {/** Slider */}
          <RangeSlider value={this.props.whFilter.mgmtChrg ? Number(this.props.whFilter.mgmtChrg) : 0}
                       step={1000}
                       contentStyle={{ marginBottom: 24 }}
                       minimumValue={0}
                       maximumValue={mgmtChrgMax}
                       LabelMiddle={`${money((mgmtChrgMax / 2))}`}
                       onValueChange={(value) => {
                         this.props.setSearchFilter({
                           mgmtChrg: value,
                         });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 입고비 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>
                {getMsg(this.props.lang, 'ML0124', '입고비')}
              </Text>
            </View>
            <Text
              style={[styles.filterLabel, styles.filterLabelMain]}>
              {(Number(this.props.whFilter.whinChrg) === whinChrgMax || Number(this.props.whFilter.whinChrg) === 0) ?
                getMsg(this.props.lang, 'ML0119', '전체') : this.props.whFilter.whinChrg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + getMsg(this.props.lang, 'ML0126', '원')}
            </Text>
          </View>
          {/** Slider */}
          <RangeSlider value={this.props.whFilter.whinChrg ? Number(this.props.whFilter.whinChrg) : 0}
                       step={1000}
                       contentStyle={{ marginBottom: 24 }}
                       minimumValue={0}
                       maximumValue={whinChrgMax}
                       LabelMiddle={`${money((whinChrgMax / 2))}`}
                       onValueChange={(value) => {
                         this.props.setSearchFilter({
                           whinChrg: value,
                         });
                       }} />


          <View style={styles.filterDivider}></View>

          {/***** 출고비 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>
                {getMsg(this.props.lang, 'ML0125', '출고비')}
              </Text>
            </View>
            <Text
              style={[styles.filterLabel, styles.filterLabelMain]}>
              {(Number(this.props.whFilter.whoutChrg) === whoutChrgMax || Number(this.props.whFilter.whoutChrg) === 0) ?
                getMsg(this.props.lang, 'ML0119', '전체') : this.props.whFilter.whoutChrg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + getMsg(this.props.lang, 'ML0126', '원')}
            </Text>
          </View>
          {/** Slider */}
          <RangeSlider value={this.props.whFilter.whoutChrg ? Number(this.props.whFilter.whoutChrg) : 0}
                       step={1000}
                       contentStyle={{ marginBottom: 24 }}
                       minimumValue={0}
                       maximumValue={whoutChrgMax}
                       LabelMiddle={`${money((whoutChrgMax / 2))}`}
                       onValueChange={(value) => {
                         this.props.setSearchFilter({
                           whoutChrg: value,
                         });
                       }} />
        </ScrollView>

        {/** Button Group */}
        <View style={[styles.gridRow, { paddingTop: 10, }]}>
          <View style={styles.gridColumn}>
            <Button mode="outlined"
                    style={[styles.btn, styles.btnPrimaryOutline]}
                    labelStyle={[styles.btnLabel]}
                    onPress={() => this._onClickCancel()}>
              {getMsg(this.props.lang, 'ML0111', '취소하기')}
            </Button>
          </View>
          <View style={styles.gridColumn}>
            <Button mode="contained"
                    style={[styles.btn, styles.btnPrimary]}
                    labelStyle={[styles.btnLabel, styles.btnLabelPrimary]}
                    onPress={() => this._onClickApply()}>
              {getMsg(this.props.lang, 'ML0112', '적용하기')}
            </Button>
          </View>
        </View>

      </View>
    );
  }

  componentWillUnmount () {
    //console.log('//::componentWillUnmount::');
  }

  componentDidMount () {
  }
}


// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state);
  return {
    whFilter: state.search.whFilter,
  };
}

// store에 action을 dispatch 하는 역할.
function mapDispatchToProps (dispatch) {
  return {
    setSearchFilter: status => {
      dispatch(ActionCreator.setSearchFilter(status));
    },
  };
}

// Check Props Type.
FilterPrice.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterPrice);
