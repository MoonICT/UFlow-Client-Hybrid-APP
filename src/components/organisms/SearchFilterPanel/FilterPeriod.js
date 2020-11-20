/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { withTheme, Text, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local Imports
import { styles } from './style';
import ActionCreator from "@Actions";
import RangeSlider from '@Components/atoms/RangeSlider';

class FilterPeriod extends Component {
  constructor (props) {
    super(props);
    this.state = {
      period: 6,
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

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'보관 기간'}</Text>
            {/*<Text style={[styles.filterLabel, styles.filterLabelSub]}>{'중복선택 가능합니다.'}</Text>*/}
          </View>
          <Text style={[styles.filterLabel, styles.filterLabelMain]}>
            {this.state.period === 0 ? '전체' : this.state.period + '개월'}
          </Text>
        </View>


        {/** Slider */}
        <RangeSlider value={this.state.period}
                     step={1}
                     contentStyle={{ marginBottom: 24 }}
                     minimumValue={0}
                     maximumValue={12}
                     LabelMiddle={'6개월'}
                     onValueChange={(value) => {
                       this.setState({ period: value });
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
FilterPeriod.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterPeriod);
