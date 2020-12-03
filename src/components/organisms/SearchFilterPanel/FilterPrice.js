/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:29:38
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

class FilterPrice extends Component {
  constructor (props) {
    super(props);
    this.state = {
      priceStorage: 0,
      priceManagement: 0,
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

        {/***** 보관비 *****/}

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'보관비 (평당)'}</Text>
            {/*<Text style={[styles.filterLabel, styles.filterLabelSub]}>{'중복선택 가능합니다.'}</Text>*/}
          </View>
          <Text
            style={[styles.filterLabel, styles.filterLabelMain]}>
            {(this.state.priceStorage === 1000000 || this.state.priceStorage === 0) ? '전체' : this.state.priceStorage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'}
          </Text>
        </View>

        {/** Slider */}
        <RangeSlider value={this.state.priceStorage}
                     step={10000}
                     contentStyle={{ marginBottom: 24 }}
                     minimumValue={0}
                     maximumValue={1000000}
                     LabelMiddle={'500,000원'}
                     onValueChange={(value) => {
                       this.setState({ priceStorage: value });
                     }} />

        <View style={styles.filterDivider}></View>

        {/***** 관리비 *****/}

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'관리비 (평당)'}</Text>
            {/*<Text style={[styles.filterLabel, styles.filterLabelSub]}>{'중복선택 가능합니다.'}</Text>*/}
          </View>
          <Text
            style={[styles.filterLabel, styles.filterLabelMain]}>
            {(this.state.priceManagement === 1000000 || this.state.priceManagement === 0) ? '전체' : this.state.priceManagement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'}
          </Text>
        </View>
        {/** Slider */}
        <RangeSlider value={this.state.priceManagement}
                     step={10000}
                     contentStyle={{ marginBottom: 24 }}
                     minimumValue={0}
                     maximumValue={1000000}
                     LabelMiddle={'500,000원'}
                     onValueChange={(value) => {
                       this.setState({ priceManagement: value });
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
FilterPrice.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterPrice);
