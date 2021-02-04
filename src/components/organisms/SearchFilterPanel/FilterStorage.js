/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:29:24
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
import Checkbox from '@Components/atoms/Checkbox';

class FilterStorage extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  /**
   *  필터 닫기.
   *  */
  _onClickCancel () {
    // 취소 시, 값 초기화.
    this.props.setSearchFilter({
      gdsKeepTypeCodes: '',
    });
    this.props.onClosed(); // Event emit
  }

  /**
   *  필터 적용.
   *  */
  _onClickApply () {
    this.props.onClosed(); // Event emit
  }

  /**
   * On change filter checkbox
   * */
  handleOnChangeFilterCheckbox = (value) => {
    let defaultValue = this.props.whFilter.gdsKeepTypeCodes ? this.props.whFilter.gdsKeepTypeCodes.split(',') : []
    let findIndex = defaultValue.indexOf(value)
    findIndex > -1 ? defaultValue.splice(findIndex, 1) : defaultValue.push(value)
    this.props.setSearchFilter({
      gdsKeepTypeCodes: defaultValue.length > 0 ? defaultValue.join(',') : '',
    });
  };

  render () {
    return (
      <View style={styles.filterContainer}>

        {/***** 창고 유형 *****/}

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{'창고 유형'}</Text>
            <Text style={[styles.filterLabel, styles.filterLabelSub]}>{'중복선택 가능합니다.'}</Text>
          </View>
        </View>

        {/** Checkbox */}
        <View style={styles.gridRow}>
          {this.props.filterCodes.listGdsTypeCode.map((item, index) =>
            <View style={[styles.filterCheckWrap, styles.gridColumn]} key={index}>
              <Checkbox
                checked={(this.props.whFilter.gdsKeepTypeCodes ? this.props.whFilter.gdsKeepTypeCodes.indexOf(item.stdDetailCode) > -1 : false)}
                label={item.stdDetailCodeName}
                value={item.stdDetailCode}
                onPress={() => this.handleOnChangeFilterCheckbox(item.stdDetailCode)} /></View>)}
        </View>

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
    //console.log('//::componentWillUnmount::');
  }

  componentDidMount () {
  }
}

// store의 state를 component에 필요한 state만 선별하여 제공하는 역할.
function mapStateToProps (state) {
  // console.log('++++++mapStateToProps: ', state.search.whFilter);
  return {
    whFilter: state.search.whFilter,
    filterCodes: state.search.filterCodes,
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
FilterStorage.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterStorage);
