/**
 * @author [Deokin]
 * @modify date 2020-11-24 18:29:26
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
import Checkbox from '@Components/atoms/Checkbox';
import { getMsg } from '@Utils/langUtils'; // TODO Require Lang

class FilterWarehouse extends Component {
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
      typeCodes: '',
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
    let defaultValue = this.props.whFilter.typeCodes ? this.props.whFilter.typeCodes.split(',') : []
    let findIndex = defaultValue.indexOf(value)
    findIndex > -1 ? defaultValue.splice(findIndex, 1) : defaultValue.push(value)
    this.props.setSearchFilter({
      typeCodes: defaultValue.length > 0 ? defaultValue.join(',') : '',
    });
  };

  render () {
    return (
      <View style={styles.filterContainer}>

        {/** Label */}
        <View style={styles.filterLabelWrap}>
          <View style={styles.filterLabelWrap}>
            <Text style={[styles.filterLabel, styles.filterLabelMain]}>{getMsg(this.props.lang, 'ML0109', '계약 유형')}</Text>
            <Text style={[styles.filterLabel, styles.filterLabelSub]}>{getMsg(this.props.lang, 'ML0110', '중복선택 가능합니다.')}</Text>
          </View>
        </View>

        {/** Checkbox */}
        {this.props.filterCodes.listTypeCodes.map((item, index) =>
          <View style={styles.filterCheckWrap} key={index}>
            <Checkbox
              checked={(this.props.whFilter.typeCodes ? this.props.whFilter.typeCodes.indexOf(item.value) > -1 : false)}
              label={item.name}
              value={item.value}
              onPress={() => this.handleOnChangeFilterCheckbox(item.value)} /></View>)}

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
    // console.log('::componentDidMount:: 검색 필터 창고 유형');
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
FilterWarehouse.protoType = {
  onClosed: PropTypes.func,
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
), withTheme)(FilterWarehouse);
