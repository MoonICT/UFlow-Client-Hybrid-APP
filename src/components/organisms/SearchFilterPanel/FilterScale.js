/**
 * @author [Deokin]
 * @modify date 2020-11-13
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

class FilterScale extends Component {
  constructor (props) {
    super(props);
    this.state = {
      areaUsable: 0,
      areaDedicated: 0,
      areaCommon: 0,
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

  render () {
    return (
      <View style={styles.filterContainer}>

        {/***** 가양면적  *****/}

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'가용면적 (계약면적)'}</Text>
          </View>
          <Text style={[styles.filterLabel, styles.filterLabelMain]}>
            {(this.state.areaUsable === 30000 || this.state.areaUsable === 0) ? '전체' : this.state.areaUsable.toLocaleString() + '㎡'}
          </Text>
        </View>

        {/** Slider */}
        <RangeSlider value={this.state.areaUsable}
                     step={100}
                     minimumValue={0}
                     maximumValue={30000}
                     LabelMiddle={'15,000㎡ (4,500평)'}
                     contentStyle={{ marginBottom: 24 }}
                     onValueChange={(value) => {
                       this.setState({ areaUsable: value });
                     }} />

        <View style={styles.filterDivider}></View>

        {/***** 전용면적 *****/}

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'전용면적'}</Text>
          </View>
          <Text style={[styles.filterLabel, styles.filterLabelMain]}>
            {(this.state.areaDedicated === 30000 || this.state.areaDedicated === 0) ? '전체' : this.state.areaDedicated.toLocaleString() + '㎡'}
          </Text>
        </View>
        {/** Slider */}
        <RangeSlider value={this.state.areaDedicated}
                     step={100}
                     minimumValue={0}
                     maximumValue={30000}
                     LabelMiddle={'15,000㎡ (4,500평)'}
                     contentStyle={{ marginBottom: 24 }}
                     onValueChange={(value) => {
                       this.setState({ areaDedicated: value });
                     }} />

        <View style={styles.filterDivider}></View>

        {/***** 공용면적 *****/}

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'공용면적 (계약면적)'}</Text>
          </View>
          <Text style={[styles.filterLabel, styles.filterLabelMain]}>
            {(this.state.areaCommon === 30000 || this.state.areaCommon === 0) ? '전체' : this.state.areaCommon.toLocaleString() + '㎡'}
          </Text>
        </View>
        {/** Slider */}
        <RangeSlider value={this.state.areaCommon}
                     step={100}
                     minimumValue={0}
                     maximumValue={30000}
                     LabelMiddle={'15,000㎡ (4,500평)'}
                     contentStyle={{ marginBottom: 24 }}
                     onValueChange={(value) => {
                       this.setState({ areaCommon: value });
                     }} />


        {/** Button Group */}
        <View style={styles.gridRow}>
          <View style={styles.gridColumn}>
            <Button mode="outlined"
                    style={[styles.btn, styles.btnPrimaryOutline]}
                    labelStyle={[styles.btnLabel]}
                    onPress={() => this._onClickCancel()}>취소하기</Button>
          </View>
          <View style={styles.gridColumn}>
            <Button mode="contained"
                    style={[styles.btn, styles.btnPrimary]}
                    labelStyle={[styles.btnLabel, styles.btnLabelPrimary]}
                    onPress={() => this._onClickApply()}>적용하기</Button>
          </View>
        </View>
      </View>
    );
  }

  componentWillUnmount () {
    console.log('::componentWillUnmount::');
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

// Check Props Type.
FilterScale.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterScale);
