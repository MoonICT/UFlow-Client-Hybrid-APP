/**
 * @author [Deokin]
 * @modify date 2020-12-30 11:03:34
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { withTheme, Text, Appbar, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Local Imports
import { styles } from './style';
import DefaultStyle from '@Styles/default';
import ActionCreator from "@Actions";
import Appbars from '@Components/organisms/AppBar';
import RangeSlider from '@Components/atoms/RangeSlider';
import Checkbox from '@Components/atoms/Checkbox';

/*TODO 임시 값 (추후 변경 필요)*/
let siteAreaMax = 13200; // 대지면적 최대
let bldgAreaMax = 13200; // 건축면적 최대
let totalAreaMax = 13200; // 연면적 최대
let flrHiMax = 10; // 층고 최대

class FilterOther extends Component {
  constructor (props) {
    super(props);
    this.state = {
      siteArea: this.props.whFilter.siteArea ? Number(this.props.whFilter.siteArea) : 0, // 대지면적
      bldgArea: this.props.whFilter.bldgArea ? Number(this.props.whFilter.bldgArea) : 0, // 건축면적
      totalArea: this.props.whFilter.prvtArea ? Number(this.props.whFilter.totalArea) : 0, // 연면적
      flrHi: this.props.whFilter.flrHi ? Number(this.props.whFilter.flrHi) : 0, // 층고
    };
  }

  /**
   *  필터 닫기.
   *  */
  _onClickCancel () {
    this.props.onClosed(); // Event emit
  }

  /**
   *  필터 적용.
   *  */
  _onClickApply () {
    // TODO 변경 필터는 스토어에 반영.
    this.props.onClosed(); // Event emit
  }

  /**
   * On change filter checkbox
   * */
  handleOnChangeFilterCheckbox = (value, fieldName) => {
    let defaultValue = this.props.whFilter[fieldName] ? this.props.whFilter[fieldName].split(',') : []
    let findIndex = defaultValue.indexOf(value)
    findIndex > -1 ? defaultValue.splice(findIndex, 1) : defaultValue.push(value)
    this.props.setSearchFilter({
      [fieldName]: defaultValue.length > 0 ? defaultValue.join(',') : '',
    });
  };

  /**
   * 추가 필터 초기화.
   * */
  handleResetAddFilter = () => {
    // Init store
    this.props.setSearchFilter({
      siteArea: '', // 대지면적
      bldgArea: '', // 건축면적
      totalArea: '', // 연면적
      flrDvCodes: '', // 층수
      flrHi: '',// 층고
      cmpltYmds: '', // 준공연차
      aprchMthdDvCodes: '', // 접안방식
      insrDvCodes: '', // 보험가입
      calUnitDvCodes: '', // 정산단위
      calStdDvCodes: '', // 산정기준
    });
  };

  render () {
    return (
      <View style={[styles.filterOtherContainer]}>

        {/** Header */}
        <Appbars style={styles.filterOtherHeader}>
          <TouchableOpacity onPress={() => this._onClickCancel()}>
            <Appbar.Action
              icon="close"
              color="rgba(0, 0, 0, 1)"
            />
          </TouchableOpacity>
          <Appbar.Content
            title="추가 필터"
            color="rgba(0, 0, 0, 0.76)"
            titleStyle={styles.filterOtherHeaderTitle}
            style={[DefaultStyle.headerTitle, styles.filterOtherHeaderContainer]}
          />
          <TouchableOpacity onPress={this.handleResetAddFilter}>
            <Text style={styles.filterOtherHeaderSubTitle}>초기화</Text>
          </TouchableOpacity>
        </Appbars>

        <ScrollView style={styles.filterOtherScroll}>

          {/***** 대지면적  *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'대지면적'}</Text>
            </View>
            <Text
              style={[styles.filterLabel, styles.filterLabelMain]}>
              {(Number(this.props.whFilter.siteArea) === siteAreaMax || Number(this.props.whFilter.siteArea) === 0) ?
                '전체' : this.props.whFilter.siteArea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '㎡'}
            </Text>
          </View>

          {/** Slider */}
          <RangeSlider value={this.props.whFilter.siteArea ? Number(this.props.whFilter.siteArea) : 0}
                       step={1000}
                       contentStyle={{ marginBottom: 24 }}
                       minimumValue={0}
                       maximumValue={siteAreaMax}
                       LabelMiddle={`${(siteAreaMax / 2).toLocaleString()}㎡`}
                       onValueChange={(value) => {
                         this.props.setSearchFilter({
                           siteArea: value,
                         });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 건축면적 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'건축면적'}</Text>
            </View>
            <Text
              style={[styles.filterLabel, styles.filterLabelMain]}>
              {(Number(this.props.whFilter.bldgArea) === bldgAreaMax || Number(this.props.whFilter.bldgArea) === 0) ?
                '전체' : this.props.whFilter.bldgArea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '㎡'}
            </Text>
          </View>

          {/** Slider */}
          <RangeSlider value={this.props.whFilter.bldgArea ? Number(this.props.whFilter.bldgArea) : 0}
                       step={1000}
                       contentStyle={{ marginBottom: 24 }}
                       minimumValue={0}
                       maximumValue={bldgAreaMax}
                       LabelMiddle={`${(bldgAreaMax / 2).toLocaleString()}㎡`}
                       onValueChange={(value) => {
                         this.props.setSearchFilter({
                           bldgArea: value,
                         });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 연면적 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'연면적'}</Text>
            </View>
            <Text
              style={[styles.filterLabel, styles.filterLabelMain]}>
              {(Number(this.props.whFilter.totalArea) === totalAreaMax || Number(this.props.whFilter.totalArea) === 0) ?
                '전체' : this.props.whFilter.totalArea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '㎡'}
            </Text>
          </View>

          {/** Slider */}
          <RangeSlider value={this.props.whFilter.totalArea ? Number(this.props.whFilter.totalArea) : 0}
                       step={1000}
                       contentStyle={{ marginBottom: 24 }}
                       minimumValue={0}
                       maximumValue={totalAreaMax}
                       LabelMiddle={`${(totalAreaMax / 2).toLocaleString()}㎡`}
                       onValueChange={(value) => {
                         this.props.setSearchFilter({
                           totalArea: value,
                         });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 층수 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'층수'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.props.listFlrDvCode.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox
                  checked={(this.props.whFilter.flrDvCodes ? this.props.whFilter.flrDvCodes.indexOf(item.stdDetailCode) > -1 : false)}
                  label={item.stdDetailCodeName}
                  value={item.stdDetailCode}
                  onPress={() => this.handleOnChangeFilterCheckbox(item.stdDetailCode, 'flrDvCodes')} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>


          {/***** 층고 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'층고'}</Text>
            </View>
            <Text
              style={[styles.filterLabel, styles.filterLabelMain]}>
              {(Number(this.props.whFilter.flrHi) === flrHiMax || Number(this.props.whFilter.flrHi) === 0) ?
                '전체' : this.props.whFilter.flrHi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'm'}
            </Text>
          </View>

          {/** Slider */}
          <RangeSlider value={this.props.whFilter.flrHi ? Number(this.props.whFilter.flrHi) : 0}
                       step={1}
                       contentStyle={{ marginBottom: 24 }}
                       minimumValue={0}
                       maximumValue={flrHiMax}
                       LabelMiddle={`${(flrHiMax / 2).toLocaleString()}m`}
                       onValueChange={(value) => {
                         this.props.setSearchFilter({
                           flrHi: value,
                         });
                       }} />

          <View style={styles.filterDivider}></View>

          {/***** 준공연차 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'준공연차'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.props.listCmpltTypes.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox
                  checked={(this.props.whFilter.cmpltYmds ? this.props.whFilter.cmpltYmds.indexOf(Object.keys(item)[1]) > -1 : false)}
                  label={item[Object.keys(item)[1]]}
                  value={Object.keys(item)[1]}
                  onPress={() => this.handleOnChangeFilterCheckbox(Object.keys(item)[1], 'cmpltYmds')} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>

          {/***** 접안방식 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'접안방식'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.props.listAprchMthdDvCode.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox
                  checked={(this.props.whFilter.aprchMthdDvCodes ? this.props.whFilter.aprchMthdDvCodes.indexOf(item.stdDetailCode) > -1 : false)}
                  label={item.stdDetailCodeName}
                  value={item.stdDetailCode}
                  onPress={() => this.handleOnChangeFilterCheckbox(item.stdDetailCode, 'aprchMthdDvCodes')} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>

          {/***** 보험가입 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'보험가입'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.props.listInsrDvCode.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox
                  checked={(this.props.whFilter.insrDvCodes ? this.props.whFilter.insrDvCodes.indexOf(item.stdDetailCode) > -1 : false)}
                  label={item.stdDetailCodeName}
                  value={item.stdDetailCode}
                  onPress={() => this.handleOnChangeFilterCheckbox(item.stdDetailCode, 'insrDvCodes')} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>

          {/***** 정산단위 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'정산단위'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.props.listCalUnitDvCode.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox
                  checked={(this.props.whFilter.calUnitDvCodes ? this.props.whFilter.calUnitDvCodes.indexOf(item.stdDetailCode) > -1 : false)}
                  label={item.stdDetailCodeName}
                  value={item.stdDetailCode}
                  onPress={() => this.handleOnChangeFilterCheckbox(item.stdDetailCode, 'calUnitDvCodes')} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>

          {/***** 산정기준 *****/}

          {/** Label */}
          <View style={styles.filterLabelWrap}>
            <View style={styles.filterLabelWrap}>
              <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'산정기준'}</Text>
            </View>
          </View>

          {/** Checkbox */}
          <View style={styles.gridRow}>
            {this.props.listCalStdDvCode.map((item, index) =>
              <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
                <Checkbox
                  checked={(this.props.whFilter.calStdDvCodes ? this.props.whFilter.calStdDvCodes.indexOf(item.stdDetailCode) > -1 : false)}
                  label={item.stdDetailCodeName}
                  value={item.stdDetailCode}
                  onPress={() => this.handleOnChangeFilterCheckbox(item.stdDetailCode, 'calStdDvCodes')} /></View>)}
          </View>

          <View style={styles.filterDivider}></View>

          <View style={{ marginBottom: 40, }}>
            <Button mode="contained"
                    style={[styles.btn, styles.btnPrimary]}
                    labelStyle={[styles.btnLabel, styles.btnLabelPrimary, styles.filterOtherBtn]}
                    onPress={() => this._onClickApply()}>적용하기</Button>
          </View>

        </ScrollView>
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
RangeSlider.protoType = {
  onClosed: PropTypes.func,
  listCalUnitDvCode: PropTypes.array, // 정산단위
  listCalStdDvCode: PropTypes.array, // 산정기준
  listFlrDvCode: PropTypes.array, // 층수
  listAprchMthdDvCode: PropTypes.array, // 접안방식
  listInsrDvCode: PropTypes.array, // 보험 가입
  listCmpltTypes: PropTypes.array, // 준공연차
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterOther);
