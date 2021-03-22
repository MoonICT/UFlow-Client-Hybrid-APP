/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:29:32
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { withTheme, Text, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import RangeSlider from '@Components/atoms/RangeSlider';
import { numberComma } from '@Services/utils/StringUtils';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

/*TODO 임시 값 (추후 변경 필요)*/
let prvtAreaMax = 13200; // 전용면적 최대
let cmnAreaMax = 13200; // 공용면적 최대
let usblValueKeepMax = 13200; // 가용면적 최대
let usblValueTrustMax = 1000; // 가용수량 최대

class FilterScale extends Component {
  constructor (props) {
    super(props);
    this.state = {
      prvtArea: this.props.whFilter.prvtArea ? Number(this.props.whFilter.prvtArea) : 0, // 전용면적
      cmnArea: this.props.whFilter.cmnArea ? Number(this.props.whFilter.cmnArea) : 0, // 공용면적

      usblValueKeep: this.props.whFilter.usblValueKeep ? Number(this.props.whFilter.usblValueKeep) : 0, // 임대 가용면적
      usblValueTrust: this.props.whFilter.usblValueTrust ? Number(this.props.whFilter.usblValueTrust) : 0, // 수탁 가용수치
    };
  }

  /**
   *  필터 닫기.
   *  */
  _onClickCancel () {
    // 취소 시, 값 초기화.
    this.props.setSearchFilter({
      prvtArea: '',
      cmnArea: '',
      usblValueKeep: '',
      usblValueTrust: '',
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
      <View style={styles.filterContainer}>

        {/* TODO 가용 수치/면적 으로 필드 변경 필요.*/}

        {/***** 임대 가용면 *****/}

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>
              {getMsg(this.props.lang, 'ML0128', '임대 가용면적')}
            </Text>
          </View>
          <Text
            style={[styles.filterLabel, styles.filterLabelMain]}>
            {(Number(this.props.whFilter.usblValueKeep) === usblValueKeepMax || Number(this.props.whFilter.usblValueKeep) === 0) ?
              getMsg(this.props.lang, 'ML0119', '전체') : this.props.whFilter.usblValueKeep.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '㎡'}
          </Text>
        </View>

        {/** Slider */}
        <RangeSlider value={this.props.whFilter.usblValueKeep ? Number(this.props.whFilter.usblValueKeep) : 0}
                     step={1000}
                     contentStyle={{ marginBottom: 24 }}
                     minimumValue={0}
                     maximumValue={usblValueKeepMax}
                     LabelMiddle={`${numberComma((usblValueKeepMax / 2))}㎡`}
                     onValueChange={(value) => {
                       this.props.setSearchFilter({
                         usblValueKeep: value,
                       });
                     }} />

        {/***** 공용면적  *****/}

        {/** Label */}
        {/*<View style={styles.filterLabelWrap}>*/}
          {/*<View style={styles.filterLabelWrap}>*/}
            {/*<Text style={[styles.filterLabel, styles.filterLabelMain]}>{'전용면적'}</Text>*/}
          {/*</View>*/}
          {/*<Text*/}
            {/*style={[styles.filterLabel, styles.filterLabelMain]}>*/}
            {/*{(Number(this.props.whFilter.prvtArea) === prvtAreaMax || Number(this.props.whFilter.prvtArea) === 0) ?*/}
              {/*'전체' : this.props.whFilter.prvtArea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '㎡'}*/}
          {/*</Text>*/}
        {/*</View>*/}

        {/** Slider */}
        {/*<RangeSlider value={this.props.whFilter.prvtArea ? Number(this.props.whFilter.prvtArea) : 0}*/}
                     {/*step={1000}*/}
                     {/*contentStyle={{ marginBottom: 24 }}*/}
                     {/*minimumValue={0}*/}
                     {/*maximumValue={prvtAreaMax}*/}
                     {/*LabelMiddle={`${numberComma((prvtAreaMax / 2))}㎡`}*/}
                     {/*onValueChange={(value) => {*/}
                       {/*this.props.setSearchFilter({*/}
                         {/*prvtArea: value,*/}
                       {/*});*/}
                     {/*}} />*/}

        <View style={styles.filterDivider}></View>

        {/***** 수탁 가용수량 *****/}

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>
              {getMsg(this.props.lang, 'ML0127', '수탁 가용수량')}
            </Text>
          </View>
          <Text
            style={[styles.filterLabel, styles.filterLabelMain]}>
            {(Number(this.props.whFilter.usblValueTrust) === usblValueTrustMax || Number(this.props.whFilter.usblValueTrust) === 0) ?
              getMsg(this.props.lang, 'ML0119', '전체') : this.props.whFilter.usblValueTrust.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </View>

        {/** Slider */}
        <RangeSlider value={this.props.whFilter.usblValueTrust ? Number(this.props.whFilter.usblValueTrust) : 0}
                     step={10}
                     contentStyle={{ marginBottom: 24 }}
                     minimumValue={0}
                     maximumValue={usblValueTrustMax}
                     LabelMiddle={`${numberComma((usblValueTrustMax / 2))}`}
                     onValueChange={(value) => {
                       this.props.setSearchFilter({
                         usblValueTrust: value,
                       });
                     }} />

        {/***** 전용면적 *****/}

        {/** Label */}
        {/*<View style={styles.filterLabelWrap}>*/}
          {/*<View style={styles.filterLabelWrap}>*/}
            {/*<Text style={[styles.filterLabel, styles.filterLabelMain]}>{'공용면적'}</Text>*/}
          {/*</View>*/}
          {/*<Text*/}
            {/*style={[styles.filterLabel, styles.filterLabelMain]}>*/}
            {/*{(Number(this.props.whFilter.cmnArea) === cmnAreaMax || Number(this.props.whFilter.cmnArea) === 0) ?*/}
              {/*'전체' : this.props.whFilter.cmnArea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '㎡'}*/}
          {/*</Text>*/}
        {/*</View>*/}

        {/** Slider */}
        {/*<RangeSlider value={this.props.whFilter.cmnArea ? Number(this.props.whFilter.cmnArea) : 0}*/}
                     {/*step={1000}*/}
                     {/*contentStyle={{ marginBottom: 24 }}*/}
                     {/*minimumValue={0}*/}
                     {/*maximumValue={cmnAreaMax}*/}
                     {/*LabelMiddle={`${numberComma((cmnAreaMax / 2))}㎡`}*/}
                     {/*onValueChange={(value) => {*/}
                       {/*this.props.setSearchFilter({*/}
                         {/*cmnArea: value,*/}
                       {/*});*/}
                     {/*}} />*/}


        {/** Button Group */}
        <View style={styles.gridRow}>
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
FilterScale.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterScale);
